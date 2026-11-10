class Turma {
    #nomeCurso;
    #professor;
    #alunos;
  
    constructor(nomeCurso, professor) {
      this.#nomeCurso = nomeCurso;
      this.#professor = professor;
      this.#alunos = [];
    }
  
    // Getters e Setters privados
    getNomeCurso() {return this.#nomeCurso;}
    setNomeCurso(nomeCurso) {this.#nomeCurso = nomeCurso;}
  
    getProfessor() {return this.#professor;}
    setProfessor(professor) {this.#professor = professor;}
  
    getAlunos() {return this.#alunos;}
    setAlunos(alunos) {this.#alunos = alunos;}
  
    adicionarAluno(aluno) {this.#alunos.push(aluno);}
  }