class Aluno {
  #nome;
  matematica;
  portugues;
  ciencia;
  historia;
  geografia;

  constructor(nome, matematica, portugues, ciencia, historia, geografia) {
    this.#nome = nome;
    this.matematica = matematica;
    this.portugues = portugues;
    this.ciencia = ciencia;
    this.historia = historia;
    this.geografia = geografia;
  }

  gerarMedia(nota1, nota2, nota3) {
    let m = (nota1 + nota2 + nota3) / 3;
    return Number(m.toFixed(1));
  }

  gerarEstado(media) {
    let est;
    if (media >= 6) {
      est = 'Aprovado';
    } else if (media >= 3) {
      est = 'Recuperação';
    } else {
      est = 'Reprovado';
    }
    return est;
  }

  getNome() {
    return this.#nome;
  }

  setNome(nome) {
    this.#nome = nome;
  }
}