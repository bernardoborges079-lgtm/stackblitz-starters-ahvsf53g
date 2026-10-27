let turma = [];

// Variáveis para cada disciplina para receber as médias
let matematica = null;
let portugues = null;
let ciencia = null;
let historia = null;
let geografia = null;

// Objeto para guardar temporariamente as notas individuais (n1, n2, n3) de cada matéria
let notasPorDisciplina = {
  matematica: { n1: '', n2: '', n3: '' },
  portugues: { n1: '', n2: '', n3: '' },
  ciencia: { n1: '', n2: '', n3: '' },
  historia: { n1: '', n2: '', n3: '' },
  geografia: { n1: '', n2: '', n3: '' }
};

// Carrega as notas já salvas ao mudar a opção do seletor de disciplinas
function carregarNotasDisciplina() {
  const disc = document.getElementById('disciplina').value;
  if (!disc) {
    document.getElementById('n1').value = '';
    document.getElementById('n2').value = '';
    document.getElementById('n3').value = '';
    return;
  }

  document.getElementById('n1').value = notasPorDisciplina[disc].n1;
  document.getElementById('n2').value = notasPorDisciplina[disc].n2;
  document.getElementById('n3').value = notasPorDisciplina[disc].n3;
}

// Registra as notas da matéria atual e calcula sua média
function registrarNotas() {
  const disc = document.getElementById('disciplina').value;
  if (!disc) return;

  const v1 = document.getElementById('n1').value;
  const v2 = document.getElementById('n2').value;
  const v3 = document.getElementById('n3').value;

  notasPorDisciplina[disc].n1 = v1;
  notasPorDisciplina[disc].n2 = v2;
  notasPorDisciplina[disc].n3 = v3;

  // Se as 3 notas da disciplina forem preenchidas, calcula a média
  if (v1 !== '' && v2 !== '' && v3 !== '') {
    const temp = new Aluno();
    const mediaCalculada = temp.gerarMedia(Number(v1), Number(v2), Number(v3));

    if (disc === 'matematica') matematica = mediaCalculada;
    if (disc === 'portugues') portugues = mediaCalculada;
    if (disc === 'ciencia') ciencia = mediaCalculada;
    if (disc === 'historia') historia = mediaCalculada;
    if (disc === 'geografia') geografia = mediaCalculada;
  } else {
    // Caso alguma nota seja apaga/incompleta
    if (disc === 'matematica') matematica = null;
    if (disc === 'portugues') portugues = null;
    if (disc === 'ciencia') ciencia = null;
    if (disc === 'historia') historia = null;
    if (disc === 'geografia') geografia = null;
  }

  atualizarStatusUI();
  validarPreenchimento();
}

// Atualiza a lista visual de status das matérias
function atualizarStatusUI() {
  const lista = [
    { id: 'st-matematica', nome: 'Matemática', val: matematica },
    { id: 'st-portugues', nome: 'Português', val: portugues },
    { id: 'st-ciencia', nome: 'Ciência', val: ciencia },
    { id: 'st-historia', nome: 'História', val: historia },
    { id: 'st-geografia', nome: 'Geografia', val: geografia }
  ];

  lista.forEach(item => {
    const el = document.getElementById(item.id);
    if (item.val !== null) {
      el.textContent = `${item.nome}: ✔️ (Média: ${item.val})`;
      el.classList.add('ok');
    } else {
      el.textContent = `${item.nome}: ❌ Pendente`;
      el.classList.remove('ok');
    }
  });
}

// Libera o botão "Salvar Aluno" somente se o Nome e as 5 médias estiverem preenchidos
function validarPreenchimento() {
  const nome = document.getElementById('nome').value.trim();
  const btnSalvar = document.getElementById('btn-salvar');

  const todasCompletas =
    matematica !== null &&
    portugues !== null &&
    ciencia !== null &&
    historia !== null &&
    geografia !== null;

  if (nome !== '' && todasCompletas) {
    btnSalvar.disabled = false;
  } else {
    btnSalvar.disabled = true;
  }
}

function salvar() {
  let nome = document.getElementById('nome').value;

  // Cria o aluno com o nome e as variáveis das médias registradas
  let a1 = new Aluno(nome, matematica, portugues, ciencia, historia, geografia);
  turma[turma.length] = a1;

  alert('Aluno cadastrado com sucesso!');

  // Reinicia os campos para o próximo cadastro
  resetarFormulario();
}

function resetarFormulario() {
  document.getElementById('nome').value = '';
  document.getElementById('disciplina').value = '';
  document.getElementById('n1').value = '';
  document.getElementById('n2').value = '';
  document.getElementById('n3').value = '';

  matematica = null;
  portugues = null;
  ciencia = null;
  historia = null;
  geografia = null;

  notasPorDisciplina = {
    matematica: { n1: '', n2: '', n3: '' },
    portugues: { n1: '', n2: '', n3: '' },
    ciencia: { n1: '', n2: '', n3: '' },
    historia: { n1: '', n2: '', n3: '' },
    geografia: { n1: '', n2: '', n3: '' }
  };

  atualizarStatusUI();
  document.getElementById('btn-salvar').disabled = true;
}

function listar() {
  const btnCadastrar = document.getElementById('btn-cadastrar');
  const tabCadastrar = document.getElementById('tab-cadastrar');
  const btnListar = document.getElementById('btn-listar');
  const tabListar = document.getElementById('tab-listar');

  btnListar.classList.add('active');
  btnCadastrar.classList.remove('active');

  tabListar.classList.add('active');
  tabCadastrar.classList.remove('active');

  const listaAlunosEl = document.getElementById('alunos');

  if (turma.length === 0) {
    listaAlunosEl.innerHTML = '<li>Nenhum aluno cadastrado ainda.</li>';
    return;
  }

  let htmlList = '';
  for (let i = 0; i < turma.length; i++) {
    let al = turma[i];
    htmlList += `
      <li class="card-aluno">
        <h4>Aluno: ${al.nome}</h4>
        <table class="tabela-notas">
          <thead>
            <tr>
              <th>Disciplina</th>
              <th>Média</th>
              <th>Situação</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Matemática</td>
              <td>${al.matematica}</td>
              <td>${al.gerarEstado(al.matematica)}</td>
            </tr>
            <tr>
              <td>Português</td>
              <td>${al.portugues}</td>
              <td>${al.gerarEstado(al.portugues)}</td>
            </tr>
            <tr>
              <td>Ciência</td>
              <td>${al.ciencia}</td>
              <td>${al.gerarEstado(al.ciencia)}</td>
            </tr>
            <tr>
              <td>História</td>
              <td>${al.historia}</td>
              <td>${al.gerarEstado(al.historia)}</td>
            </tr>
            <tr>
              <td>Geografia</td>
              <td>${al.geografia}</td>
              <td>${al.gerarEstado(al.geografia)}</td>
            </tr>
          </tbody>
        </table>
      </li>
    `;
  }
  listaAlunosEl.innerHTML = htmlList;
}

function cadastrar() {
  const btnCadastrar = document.getElementById('btn-cadastrar');
  const tabCadastrar = document.getElementById('tab-cadastrar');
  const btnListar = document.getElementById('btn-listar');
  const tabListar = document.getElementById('tab-listar');

  btnListar.classList.remove('active');
  btnCadastrar.classList.add('active');

  tabListar.classList.remove('active');
  tabCadastrar.classList.add('active');
}