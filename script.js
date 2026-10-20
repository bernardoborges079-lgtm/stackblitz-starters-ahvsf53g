let nome;
let nota1;
let nota2;
let nota3;
let estado;
let media;
function gerarMedia(nota1,nota2,nota3){
  let m = (nota1+nota2+nota3)/3;
  return m;
}
function gerarEstado(media){
  let est;
  if(media>=6){
    est="Aprovado";
  }
  else if(media>=3){
    est="Recuperação"
  }
  else{
    est="Reprovado"
  }
  return est;
}
function calcular(){
  let n1 = Number(document.getElementById("n1").value);
  let n2 = Number(document.getElementById("n2").value);
  let n3 = Number(document.getElementById("n3").value);
  let m = gerarMedia(n1,n2,n3);
  alert(m);
}