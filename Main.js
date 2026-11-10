let turmas = [];

function cadastroTurma() {
  Interface.cadastrarTurma();
}

function btnSalvarTurma() {
  Interface.salvarTurma(turmas);
}

function cadastroAluno() {
  Interface.cadastrarAluno(turmas);
}

function btnSalvar() {
  Interface.salvar(turmas);
}

function listarAluno() {
  Interface.listar(turmas);
}

function editarAluno(turmaIndex, alunoIndex) {
  Interface.editar(turmaIndex, alunoIndex, turmas);
}