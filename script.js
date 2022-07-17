// Variavéis
let tirosElement = document.querySelector("#tiros");
let acertosElement = document.querySelector("#acertos");
let cenario = document.querySelector("#cenario");
let alvo = document.querySelector("#alvo");
let iniciar = document.querySelector("#iniciar");
let pausar = document.querySelector("#pausar");
let historicoValores = document.querySelector("#historicoValores");
let tiros = 0;
let acertos = 0;
let mover;
let numTentativa = 0;


function contarTiros() {
  tiros++;
  tirosElement.innerHTML = tiros;
}
function contarAcertos() {
  acertos++;
  acertosElement.innerHTML = acertos;
}

function moverAlvo() {
  let randomLeft = 0;
  let randomTop = 0;
  mover = setInterval(() => {
    randomLeft = Math.floor(Math.random() * (730 - 0 + 1)) + 0;
    randomTop = Math.floor(Math.random() * (530 - 0 + 1)) + 0;
    alvo.style.left = randomLeft + "px";
    alvo.style.top = randomTop + "px";
  }, 1000);
}

//TEMPO
const timer = document.getElementById("cronometro");

var hora = 0;
var minuto = 0;
var segundo = 0;
var paraTempo = true;

function iniciarTempo() {
  if (paraTempo == true) {
    paraTempo = false;
    timerCycle();
  }
}
function pararTempo() {
  if (paraTempo == false) {
    paraTempo = true;
  }
}

function timerCycle() {
  if (paraTempo == false) {
    segundo = parseInt(segundo);
    minuto = parseInt(minuto);
    hora = parseInt(hora);

    segundo = segundo + 1;

    if (segundo == 60) {
      minuto = minuto + 1;
      segundo = 0;
    }
    if (minuto == 60) {
      hora = hora + 1;
      minuto = 0;
      segundo = 0;
    }

    if (segundo < 10 || segundo == 0) {
      segundo = "0" + segundo;
    }
    if (minuto < 10 || minuto == 0) {
      minuto = "0" + minuto;
    }
    if (hora < 10 || hora == 0) {
      hora = "0" + hora;
    }

    timer.innerHTML = minuto + ":" + segundo;
    if (timer.textContent == "01:00") {
      pararJogo();
    }
    setTimeout("timerCycle()", 1000);
  }
}

function reiniciarTempo() {
  timer.innerHTML = "00:00";
  paraTempo = true;
  hora = 0;
  segundo = 0;
  minuto = 0;
}
//FIM DO TEMPO

//BOTÔES
function iniciarJogo() {
  cenario.setAttribute("onclick", "contarTiros()");
  alvo.setAttribute("onclick", "contarAcertos()");
  iniciar.removeAttribute("onclick");
  iniciarTempo();
  moverAlvo();
}

function pausarJogo() {
  clearInterval(mover);
  pararTempo();
  cenario.removeAttribute("onclick");
  alvo.removeAttribute("onclick");
  iniciar.setAttribute("onclick", "iniciarJogo()");
}

function pararJogo() {
  clearInterval(mover);
  pararTempo();
  cenario.removeAttribute("onclick");
  alvo.removeAttribute("onclick");
  historico();
  iniciar.setAttribute("onclick", "iniciarJogo()");
}

//HISTÓRICO

function historico() {
  let nome = prompt("Digite o seu nome: ");
  let row = historicoValores.insertRow(numTentativa);
  let cell0 = row.insertCell(0);
  let cell1 = row.insertCell(1);
  let cell2 = row.insertCell(2);
  let cell3 = row.insertCell(3);

  cell0.innerHTML = nome;
  cell1.innerHTML = timer.textContent;
  cell2.innerHTML = tiros;
  cell3.innerHTML = acertos;

  reiniciarTempo();
  tiros = 0;
  tirosElement.innerHTML = tiros;
  acertos = 0;
  acertosElement.innerHTML = acertos;
  numTentativa++;
}
