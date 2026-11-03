class Aluno {
  #nome;
  #matematica;
  #portugues;
  #ciencia;
  #historia;
  #geografia;

  constructor(nome, matematica, portugues, ciencia, historia, geografia) {
    this.#nome = nome;
    this.#matematica = matematica;
    this.#portugues = portugues;
    this.#ciencia = ciencia;
    this.#historia = historia;
    this.#geografia = geografia;
  }

  // Método utilitário para gerar a média e situação da matéria
  static calcularDisciplina(n1, n2, n3) {
    let media = (n1 + n2 + n3) / 3;
    let estado;
    if (media >= 6) {
      estado = 'Aprovado';
    } else if (media >= 3) {
      estado = 'Recuperação';
    } else {
      estado = 'Reprovado';
    }
    return {
      n1: n1,
      n2: n2,
      n3: n3,
      media: Number(media.toFixed(2)),
      estado: estado
    };
  }

  // Getters e Setters privados
  getNome() {
    return this.#nome;
  }
  setNome(nome) {
    this.#nome = nome;
  }

  getMatematica() {
    return this.#matematica;
  }
  setMatematica(matematica) {
    this.#matematica = matematica;
  }

  getPortugues() {
    return this.#portugues;
  }
  setPortugues(portugues) {
    this.#portugues = portugues;
  }

  getCiencia() {
    return this.#ciencia;
  }
  setCiencia(ciencia) {
    this.#ciencia = ciencia;
  }

  getHistoria() {
    return this.#historia;
  }
  setHistoria(historia) {
    this.#historia = historia;
  }

  getGeografia() {
    return this.#geografia;
  }
  setGeografia(geografia) {
    this.#geografia = geografia;
  }
} // fim da classe