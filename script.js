let totalSegundos = 0;
let tempoAlerta = 0;
let intervalo;
let piscando = false;
let intervaloPiscar; // controle do intervalo do piscar

function iniciarContador() {
  clearInterval(intervalo);
  clearInterval(intervaloPiscar); // limpa qualquer piscar ativo

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
    totalSegundos = 0; // evita valor negativo
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

  timer.textContent = `${String(horas).padStart(2, '0')}:` +
                       `${String(minutos).padStart(2, '0')}:` +
                       `${String(segundos).padStart(2, '0')}`;

  if (totalSegundos <= tempoAlerta && totalSegundos > 0) {
    // Tempo em alerta: cor vermelha com flash
    if (!timer.classList.contains("glow-vermelho") && timer.style.color !== "red") {
      timer.style.color = "red";
      timer.classList.add("glow-vermelho");
      setTimeout(() => {
        timer.classList.remove("glow-vermelho");
      }, 500);
    } else {
      timer.style.color = "red";
    }
  } else if (totalSegundos > 0) {
    // Tempo normal: cor branca
    timer.style.color = "white";
    timer.classList.remove("glow-vermelho");
  }
  // Quando totalSegundos === 0, não reseta a cor (fica vermelho fixo)
}

function iniciarPiscar() {
  const timer = document.getElementById("timer");
  piscando = true;

  timer.style.color = "red"; // mantém vermelho fixo ao terminar

  intervaloPiscar = setInterval(() => {
    if (!piscando) return;
    timer.style.visibility = (timer.style.visibility === "hidden") ? "visible" : "hidden";
  }, 500);
}

function voltarParaConfiguracao() {
  clearInterval(intervalo);
  clearInterval(intervaloPiscar);
  piscando = false;

  const timer = document.getElementById("timer");
  timer.style.visibility = "visible"; // garante visível ao voltar
  timer.style.color = "white";        // reseta cor ao voltar

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
