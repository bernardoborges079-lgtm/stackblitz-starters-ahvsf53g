class Interface {
    // Armazenamento temporário das 3 notas de cada matéria durante o preenchimento
    static #notasTemporarias = {
      matematica: null,
      portugues: null,
      ciencia: null,
      historia: null,
      geografia: null
    };
  
    static #alunoEditandoIndex = -1;
  
    constructor() {}
  
    // Retorna a classe CSS correspondente à cor do estado
    static obterClasseEstado(estado) {
      if (estado === 'Aprovado') return 'status-aprovado';
      if (estado === 'Recuperação') return 'status-recuperacao';
      if (estado === 'Reprovado') return 'status-reprovado';
      return '';
    }
  
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
      const nome = document.getElementById('nome').value.trim();
      const btnSalvar = document.querySelector('.btn-salvar');
  
      const todasDisciplinasPreenchidas =
        Interface.#notasTemporarias.matematica !== null &&
        Interface.#notasTemporarias.portugues !== null &&
        Interface.#notasTemporarias.ciencia !== null &&
        Interface.#notasTemporarias.historia !== null &&
        Interface.#notasTemporarias.geografia !== null;
  
      if (nome !== '' && todasDisciplinasPreenchidas) {
        btnSalvar.disabled = false;
      } else {
        btnSalvar.disabled = true;
      }
    }
  
    static salvar(turma) {
      let nome = document.getElementById('nome').value;
  
      let a1 = new Aluno(
        nome,
        Interface.#notasTemporarias.matematica,
        Interface.#notasTemporarias.portugues,
        Interface.#notasTemporarias.ciencia,
        Interface.#notasTemporarias.historia,
        Interface.#notasTemporarias.geografia
      );
  
      if (Interface.#alunoEditandoIndex >= 0) {
        turma[Interface.#alunoEditandoIndex] = a1;
        alert('Aluno atualizado com sucesso!');
      } else {
        turma.push(a1);
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
  
      Interface.#alunoEditandoIndex = -1;
  
      document.getElementById('n1').disabled = true;
      document.getElementById('n2').disabled = true;
      document.getElementById('n3').disabled = true;
  
      const btnSalvar = document.querySelector('.btn-salvar');
      btnSalvar.textContent = 'Salvar Aluno';
      btnSalvar.disabled = true;
    }
  
    static editar(index, turma) {
      const aluno = turma[index];
      if (!aluno) return;
  
      Interface.#alunoEditandoIndex = index;
      document.getElementById('nome').value = aluno.getNome();
  
      Interface.#notasTemporarias = {
        matematica: { ...aluno.getMatematica() },
        portugues: { ...aluno.getPortugues() },
        ciencia: { ...aluno.getCiencia() },
        historia: { ...aluno.getHistoria() },
        geografia: { ...aluno.getGeografia() }
      };
  
      const btnSalvar = document.querySelector('.btn-salvar');
      btnSalvar.textContent = 'Atualizar Aluno';
  
      Interface.cadastrar();
      document.getElementById('disciplina').value = '';
      Interface.carregarNotasDisciplina();
      Interface.validarPreenchimento();
    }
  
    static listar(turma) {
      const btnCadastrar = document.getElementById('btn-cadastrar');
      const tabCadastrar = document.getElementById('tab-cadastrar');
      const btnListar = document.getElementById('btn-listar');
      const tabListar = document.getElementById('tab-listar');
  
      btnListar.classList.add('active');
      btnCadastrar.classList.remove('active');
  
      tabListar.classList.add('active');
      tabCadastrar.classList.remove('active');
  
      const conteinerAlunos = document.getElementById('alunos');
  
      if (turma.length === 0) {
        conteinerAlunos.innerHTML = '<p>Nenhum aluno cadastrado ainda.</p>';
        return;
      }
  
      let html = '';
  
      for (let i = 0; i < turma.length; i++) {
        let al = turma[i];
        let mat = al.getMatematica();
        let port = al.getPortugues();
        let cie = al.getCiencia();
        let hist = al.getHistoria();
        let geo = al.getGeografia();
  
        html += `<div class="card-aluno">
          <div class="card-header">
            <h4>Aluno: ${al.getNome()}</h4>
            <button class="btn-editar" onclick="editarAluno(${i})">✏️ Editar</button>
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
  
      conteinerAlunos.innerHTML = html;
    }
  
    static cadastrar() {
      const btnCadastrar = document.getElementById('btn-cadastrar');
      const tabCadastrar = document.getElementById('tab-cadastrar');
      const btnListar = document.getElementById('btn-listar');
      const tabListar = document.getElementById('tab-listar');
  
      btnListar.classList.remove('active');
      btnCadastrar.classList.add('active');
  
      tabListar.classList.remove('active');
      tabCadastrar.classList.add('active');
    }
  }