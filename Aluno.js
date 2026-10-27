class Aluno {
  nome;
  matematica;
  portugues;
  ciencia;
  historia;
  geografia;
  media;
  estado;

  constructor(nome, matematica, portugues, ciencia, historia, geografia) {
    this.nome = nome;
    this.matematica = matematica;
    this.portugues = portugues;
    this.ciencia = ciencia;
    this.historia = historia;
    this.geografia = geografia;
  }

  // Gera a média a partir de 3 notas
  gerarMedia(nota1, nota2, nota3) {
    let m = (nota1 + nota2 + nota3) / 3;
    this.media = m;
    return Number(m.toFixed(1)); // Retorna a média arredondada com 1 casa decimal
  }

  // Gera o estado de aprovação com base na média da matéria
  gerarEstado(media) {
    let est;
    if (media >= 6) {
      est = 'Aprovado';
    } else if (media >= 3) {
      est = 'Recuperação';
    } else {
      est = 'Reprovado';
    }
    this.estado = est;
    return est;
  }
} // fim da classe