let turma = [];

function listarAluno() {
  Interface.listar(turma);
}

function btnSalvar() {
  Interface.salvar(turma);
}

function cadastroAluno() {
  Interface.cadastrar();
}

function editarAluno(index) {
  Interface.editar(index, turma);
}