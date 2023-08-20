let btnAdicionar = document.getElementById("btnAdicionar");
let btnLimpar = document.getElementById("btnLimpar");

let audio = new Audio('./assets/somdedinheiro.mp3');

let inputValorDeEntrada = document.getElementById("inputValorDeEntrada");
let inputValorDeSaida = document.getElementById("inputValorDeSaida");

let textValorDeEntrada = document.getElementById("textValorDeEntrada");
let textValorDeSaida = document.getElementById("textValorDeSaida");
let textValorTotal = document.getElementById("textValorTotal");

let dataHoraAtual = document.getElementById("dataHoraAtual");

// Verifica se há valores no localStorage e os carrega
let entradaGuardada = JSON.parse(localStorage.getItem('entradas')) || [];
let saidaGuardada = JSON.parse(localStorage.getItem('saidas')) || [];

function atualizarValores() {
    let totalEntrada = entradaGuardada.reduce((acc, valor) => acc + valor, 0);
    let totalSaida = saidaGuardada.reduce((acc, valor) => acc + valor, 0);
    let total = totalEntrada - totalSaida;

    textValorDeEntrada.innerText = `R$ ${totalEntrada.toFixed(2)}`;
    textValorDeSaida.innerText = `R$ ${totalSaida.toFixed(2)}`;
    textValorTotal.innerText = `R$ ${total.toFixed(2)}`;
}

btnAdicionar.addEventListener('click', () => {
    let valorEntrada = parseFloat(inputValorDeEntrada.value.replace("R$ ", ""));
    let valorSaida = parseFloat(inputValorDeSaida.value.replace("R$ ", ""));

    if (!isNaN(valorEntrada)) {
        entradaGuardada.push(valorEntrada);
        localStorage.setItem('entradas', JSON.stringify(entradaGuardada));
    }

    if (!isNaN(valorSaida)) {
        saidaGuardada.push(valorSaida);
        localStorage.setItem('saidas', JSON.stringify(saidaGuardada));
    }

    inputValorDeEntrada.value = "";
    inputValorDeSaida.value = "";
    atualizarValores();

    audio.loop = false;
    audio.oncanplaythrough = function () {
        audio.play();
    };
    audio.play();
});

btnLimpar.addEventListener('click', () => {
    entradaGuardada = [];
    saidaGuardada = [];
    localStorage.removeItem('entradas');
    localStorage.removeItem('saidas');
    atualizarValores();
});

atualizarValores();

function atualizarDataHora() {
    let data = new Date();
    let dia = data.getDate();
    let mes = data.getMonth() + 1; // Os meses começam em 0
    let ano = data.getFullYear();
    let horas = data.getHours();
    let minutos = data.getMinutes();
    let segundos = data.getSeconds();

    dataHoraAtual.innerText = `Data: ${dia}/${mes}/${ano} Hora: ${horas}:${minutos}:${segundos}`;
}

setInterval(atualizarDataHora, 1000); // Atualiza a cada segundo