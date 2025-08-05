let totalSegundos = 0;
let tempoAlerta = 0;
let intervalo;
let piscando = false;

function iniciarContador() {
  clearInterval(intervalo);

  const horas = parseInt(document.getElementById("horas").value) || 0;
  const minutos = parseInt(document.getElementById("minutos").value) || 0;
  const aviso = parseInt(document.getElementById("aviso").value) || 0;

  totalSegundos = (horas * 60 + minutos) * 60;
  tempoAlerta = aviso * 60;

  if (totalSegundos <= 0) {
    alert("Insira um tempo válido.");
    return;
  }

  document.activeElement.blur(); // remove foco no botão no mobile

  piscando = false;

  alternarTelas("tela-config", "tela-contador");

  const timer = document.getElementById("timer");
  timer.style.color = "white";
  timer.style.visibility = "visible";

  atualizarTela();
  intervalo = setInterval(atualizarContador, 1000);
}

function atualizarContador() {
  totalSegundos--;

  if (totalSegundos < 0) {
    clearInterval(intervalo);
    iniciarPiscar();
    return;
  }

  atualizarTela();
}

function atualizarTela() {
  const horas = Math.floor(totalSegundos / 3600);
  const minutos = Math.floor((totalSegundos % 3600) / 60);
  const segundos = totalSegundos % 60;
  const timer = document.getElementById("timer");

  timer.textContent = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;

  if (totalSegundos <= tempoAlerta) {
    timer.style.color = "red";
  } else {
    timer.style.color = "white";
  }
}

function iniciarPiscar() {
  const timer = document.getElementById("timer");
  piscando = true;
  setInterval(() => {
    if (!piscando) return;
    timer.style.visibility = (timer.style.visibility === "hidden") ? "visible" : "hidden";
  }, 500);
}

function voltarParaConfiguracao() {
  clearInterval(intervalo);
  piscando = false;
  alternarTelas("tela-contador", "tela-config");
}

function alternarTelas(idSaindo, idEntrando) {
  const telaSaindo = document.getElementById(idSaindo);
  const telaEntrando = document.getElementById(idEntrando);

  telaSaindo.classList.remove("visivel");
  setTimeout(() => {
    telaEntrando.classList.add("visivel");
  }, 100);
}
