class Interface {
  static #notasTemporarias = {
    matematica: null,
    portugues: null,
    ciencia: null,
    historia: null,
    geografia: null
  };

  static #alunoEditandoInfo = null; // { turmaIndex, alunoIndex }

  constructor() {}

  static obterClasseEstado(estado) {
    if (estado === 'Aprovado') return 'status-aprovado';
    if (estado === 'Recuperação') return 'status-recuperacao';
    if (estado === 'Reprovado') return 'status-reprovado';
    return '';
  }

  // --- MÉTODOS DE TURMA ---
  static salvarTurma(turmas) {
    const nomeCurso = document.getElementById('nomeCurso').value.trim();
    const professor = document.getElementById('professor').value.trim();

    if (nomeCurso === '' || professor === '') {
      alert('Preencha o nome do curso e o nome do professor!');
      return;
    }

    let novaTurma = new Turma(nomeCurso, professor);
    turmas.push(novaTurma);
    alert('Turma cadastrada com sucesso!');

    document.getElementById('nomeCurso').value = '';
    document.getElementById('professor').value = '';
    Interface.atualizarSelectTurmas(turmas);
  }

  static atualizarSelectTurmas(turmas) {
    const selectTurma = document.getElementById('select-turma');
    selectTurma.innerHTML = '<option value="">Selecione uma turma</option>';

    for (let i = 0; i < turmas.length; i++) {
      selectTurma.innerHTML += `<option value="${i}">${turmas[i].getNomeCurso()} - Prof. ${turmas[i].getProfessor()}</option>`;
    }
  }

  // --- MÉTODOS DE ALUNO ---
  static carregarNotasDisciplina() {
    const disc = document.getElementById('disciplina').value;
    const n1 = document.getElementById('n1');
    const n2 = document.getElementById('n2');
    const n3 = document.getElementById('n3');

    if (!disc) {
      n1.value = '';
      n2.value = '';
      n3.value = '';
      n1.disabled = true;
      n2.disabled = true;
      n3.disabled = true;
      return;
    }

    n1.disabled = false;
    n2.disabled = false;
    n3.disabled = false;

    const dadosDisc = Interface.#notasTemporarias[disc];
    if (dadosDisc) {
      n1.value = dadosDisc.n1;
      n2.value = dadosDisc.n2;
      n3.value = dadosDisc.n3;
    } else {
      n1.value = '';
      n2.value = '';
      n3.value = '';
    }
  }

  static registrarNotas() {
    const disc = document.getElementById('disciplina').value;
    if (!disc) return;

    const v1 = document.getElementById('n1').value;
    const v2 = document.getElementById('n2').value;
    const v3 = document.getElementById('n3').value;

    if (v1 !== '' && v2 !== '' && v3 !== '') {
      Interface.#notasTemporarias[disc] = Aluno.calcularDisciplina(
        Number(v1),
        Number(v2),
        Number(v3)
      );
    } else {
      Interface.#notasTemporarias[disc] = null;
    }

    Interface.validarPreenchimento();
  }

  static validarPreenchimento() {
    const turmaSelecionada = document.getElementById('select-turma').value;
    const nome = document.getElementById('nome').value.trim();
    const btnSalvar = document.getElementById('btn-salvar-aluno');

    const todasDisciplinasPreenchidas =
      Interface.#notasTemporarias.matematica !== null &&
      Interface.#notasTemporarias.portugues !== null &&
      Interface.#notasTemporarias.ciencia !== null &&
      Interface.#notasTemporarias.historia !== null &&
      Interface.#notasTemporarias.geografia !== null;

    if (turmaSelecionada !== '' && nome !== '' && todasDisciplinasPreenchidas) {
      btnSalvar.disabled = false;
    } else {
      btnSalvar.disabled = true;
    }
  }

  static salvar(turmas) {
    if (turmas.length === 0) {
      alert('É necessário cadastrar uma Turma antes de salvar um Aluno!');
      return;
    }

    const turmaIdx = document.getElementById('select-turma').value;
    const nome = document.getElementById('nome').value;

    let a1 = new Aluno(
      nome,
      Interface.#notasTemporarias.matematica,
      Interface.#notasTemporarias.portugues,
      Interface.#notasTemporarias.ciencia,
      Interface.#notasTemporarias.historia,
      Interface.#notasTemporarias.geografia
    );

    if (Interface.#alunoEditandoInfo) {
      const { turmaIndex, alunoIndex } = Interface.#alunoEditandoInfo;
      turmas[turmaIndex].getAlunos()[alunoIndex] = a1;
      alert('Aluno atualizado com sucesso!');
    } else {
      turmas[turmaIdx].adicionarAluno(a1);
      alert('Aluno cadastrado com sucesso!');
    }

    Interface.resetarFormulario();
  }

  static resetarFormulario() {
    document.getElementById('nome').value = '';
    document.getElementById('disciplina').value = '';
    document.getElementById('n1').value = '';
    document.getElementById('n2').value = '';
    document.getElementById('n3').value = '';

    Interface.#notasTemporarias = {
      matematica: null,
      portugues: null,
      ciencia: null,
      historia: null,
      geografia: null
    };

    Interface.#alunoEditandoInfo = null;

    document.getElementById('n1').disabled = true;
    document.getElementById('n2').disabled = true;
    document.getElementById('n3').disabled = true;

    const btnSalvar = document.getElementById('btn-salvar-aluno');
    btnSalvar.textContent = 'Salvar Aluno';
    btnSalvar.disabled = true;
  }

  static editar(turmaIndex, alunoIndex, turmas) {
    const aluno = turmas[turmaIndex].getAlunos()[alunoIndex];
    if (!aluno) return;

    Interface.#alunoEditandoInfo = { turmaIndex, alunoIndex };

    Interface.cadastrarAluno(turmas);

    document.getElementById('select-turma').value = turmaIndex;
    document.getElementById('nome').value = aluno.getNome();

    Interface.#notasTemporarias = {
      matematica: { ...aluno.getMatematica() },
      portugues: { ...aluno.getPortugues() },
      ciencia: { ...aluno.getCiencia() },
      historia: { ...aluno.getHistoria() },
      geografia: { ...aluno.getGeografia() }
    };

    const btnSalvar = document.getElementById('btn-salvar-aluno');
    btnSalvar.textContent = 'Atualizar Aluno';

    document.getElementById('disciplina').value = '';
    Interface.carregarNotasDisciplina();
    Interface.validarPreenchimento();
  }

  // --- NAVEGAÇÃO ENTRE ABAS ---
  static cadastrarTurma() {
    Interface.ativarAba('btn-cadastrar-turma', 'tab-cadastrar-turma');
  }

  static cadastrarAluno(turmas) {
    if (turmas.length === 0) {
      alert('Atenção: Cadastre pelo menos uma Turma antes de cadastrar um Aluno!');
      Interface.cadastrarTurma();
      return;
    }
    Interface.atualizarSelectTurmas(turmas);
    Interface.ativarAba('btn-cadastrar-aluno', 'tab-cadastrar-aluno');
  }

  static listar(turmas) {
    Interface.ativarAba('btn-listar', 'tab-listar');
    const conteinerAlunos = document.getElementById('alunos');

    if (turmas.length === 0) {
      conteinerAlunos.innerHTML = '<p>Nenhuma turma cadastrada ainda.</p>';
      return;
    }

    let html = '';

    for (let t = 0; t < turmas.length; t++) {
      let turma = turmas[t];
      let alunos = turma.getAlunos();

      html += `<div class="info-turma">
        <h3>Curso: ${turma.getNomeCurso()} | Professor: ${turma.getProfessor()}</h3>
      </div>`;

      if (alunos.length === 0) {
        html += '<p>Nenhum aluno cadastrado nesta turma.</p><br>';
        continue;
      }

      for (let i = 0; i < alunos.length; i++) {
        let al = alunos[i];
        let mat = al.getMatematica();
        let port = al.getPortugues();
        let cie = al.getCiencia();
        let hist = al.getHistoria();
        let geo = al.getGeografia();

        html += `<div class="card-aluno">
          <div class="card-header">
            <h4>Aluno: ${al.getNome()}</h4>
            <button class="btn-editar" onclick="editarAluno(${t}, ${i})">✏️ Editar</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Disciplina</th>
                <th>Nota 1</th>
                <th>Nota 2</th>
                <th>Nota 3</th>
                <th>Média</th>
                <th>Situação</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Matemática</td><td>${mat.n1}</td><td>${mat.n2}</td><td>${mat.n3}</td><td>${mat.media.toFixed(2)}</td><td class="${Interface.obterClasseEstado(mat.estado)}">${mat.estado}</td></tr>
              <tr><td>Português</td><td>${port.n1}</td><td>${port.n2}</td><td>${port.n3}</td><td>${port.media.toFixed(2)}</td><td class="${Interface.obterClasseEstado(port.estado)}">${port.estado}</td></tr>
              <tr><td>Ciência</td><td>${cie.n1}</td><td>${cie.n2}</td><td>${cie.n3}</td><td>${cie.media.toFixed(2)}</td><td class="${Interface.obterClasseEstado(cie.estado)}">${cie.estado}</td></tr>
              <tr><td>História</td><td>${hist.n1}</td><td>${hist.n2}</td><td>${hist.n3}</td><td>${hist.media.toFixed(2)}</td><td class="${Interface.obterClasseEstado(hist.estado)}">${hist.estado}</td></tr>
              <tr><td>Geografia</td><td>${geo.n1}</td><td>${geo.n2}</td><td>${geo.n3}</td><td>${geo.media.toFixed(2)}</td><td class="${Interface.obterClasseEstado(geo.estado)}">${geo.estado}</td></tr>
            </tbody>
          </table>
        </div><br>`;
      }
    }

    conteinerAlunos.innerHTML = html;
  }

  static ativarAba(btnId, tabId) {
    const botoes = document.querySelectorAll('.tab-button');
    const conteudos = document.querySelectorAll('.tab-content');

    botoes.forEach(b => b.classList.remove('active'));
    conteudos.forEach(c => c.classList.remove('active'));

    document.getElementById(btnId).classList.add('active');
    document.getElementById(tabId).classList.add('active');
  }
}