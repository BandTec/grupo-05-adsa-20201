
let qtdComputadorOk = 0;
let qtdComputadorAlert = 0;
let qtdComputadorCrit = 0;

let idMaquinaFormat;
var contadorCpu = 0;

nameFunc.innerHTML = localStorage.getItem("nome");

//CPU
var configGraficoCPU = {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Uso de CPU (%)',
            backgroundColor: "blue",
            borderColor: "blue",
            data: [],
            fill: false,
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Horário da Leitura'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                }
            }]
        }
    }
};

//MEMÓRIA
var configGraficoMemoria = {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Uso em (%)',
            backgroundColor: "red",
            borderColor: "red",
            borderWidth: 1,
            data: [80]
        }],
    },

    options: {
        responsive: true,
        legend: {
            position: 'top',
        },
        title: {
            display: true,
        }
    },
};

//DISCO
var configGraficoDisco = {
    type: 'pie',
    data: {
        datasets: [{
            data: [],
            backgroundColor: [
                "green",
                "red",
            ],
            label: 'Disco'
        }],
        labels: [
            'Disponível',
            'Em uso'
        ]
    },
    options: {
        responsive: true
    }
};


//CPU
function receberLeiturasGrafCPU() {
    setTimeout(() => {

        fetch('/cpu').then(response => {
            response.json().then(resposta => {


                if (configGraficoCPU.data.labels.length > 6 || configGraficoCPU.data.datasets[0].data.length > 6) {

                    configGraficoCPU.data.labels.shift()
                    configGraficoCPU.data.labels.push(resposta.DATA_HORA)
                    configGraficoCPU.data.datasets[0].data.shift()
                    configGraficoCPU.data.datasets[0].data.push(resposta.VALOR)

                } else {
                    configGraficoCPU.data.labels.push(resposta.DATA_HORA)
                    configGraficoCPU.data.datasets[0].data.push(resposta.VALOR)

                }
                window.grafStatusCPU.update();

            })
        })

        receberLeiturasGrafCPU();
    }, 2000)

}

//DISCO
function receberLeiturasGrafDISCO() {
    setTimeout(() => {

        fetch('/disco').then(response => {
            response.json().then(resposta => {

                let disponivel = (100 - (parseInt(resposta.VALOR)))
                // if (grafStatusDisco.data.labels.length >= 1 || grafStatusDisco.data.datasets[0].data.length >= 1) {
                    
                    grafStatusDisco.data.labels.shift()
                    grafStatusDisco.data.labels.shift()
                    // grafStatusDisco.data.labels.push(disponivel,resposta.VALOR)
                    grafStatusDisco.data.labels.push("Disponível", "Em uso")
                    grafStatusDisco.data.datasets[0].data.shift()
                    grafStatusDisco.data.datasets[0].data.shift()
                    grafStatusDisco.data.datasets[0].data.push(disponivel,resposta.VALOR)

                // } else {
                //     grafStatusDisco.data.labels.push(disponivel,resposta.VALOR)
                //     grafStatusDisco.data.datasets[0].data.push(disponivel,resposta.VALOR)

                // }
                window.grafStatusDisco.update();

            })
        })
        receberLeiturasGrafDISCO();
    }, 5000)

}

//MEMÓRIA
function receberLeiturasGrafMEMORIA() {
    setTimeout(() => {

        fetch('/memoria').then(response => {
            response.json().then(resposta => {

                    grafStatusMemoria.data.labels.shift()
                    grafStatusMemoria.data.labels.shift()
                    grafStatusMemoria.data.labels.push(resposta.DATA_HORA)
                    grafStatusMemoria.data.datasets[0].data.shift()
                    grafStatusMemoria.data.datasets[0].data.shift()
                    grafStatusMemoria.data.datasets[0].data.push(resposta.VALOR)

                window.grafStatusMemoria.update();

            })
        })

        receberLeiturasGrafMEMORIA();
    }, 5000)

}


function receberRegistros() {
    fetch('/registro').then(resposta => {
        resposta.json().then (response =>  {
            console.log("res", response)

            for (let i = 0; i < response.length; i++) {
                if ((response[i].DESCRICAO == "Uso da CPU" && response[i].VALOR < 50) && (response[i].DESCRICAO == "Uso de memória RAM" && response[i].VALOR < 40) && (response[i].DESCRICAO == "Uso de disco" && response[i].VALOR <= 40)) {
                    // console.log("um")
                    // idQtdOk.innerHTML = "1";
                    // idQtdAlerta.innerHTML = "1";
                    // idQtdCrit.innerHTML = "1";
                }else if((response[i].DESCRICAO == "Uso da CPU" && (response[i].VALOR >= 50 && response[i].VALOR <75)) || (response[i].DESCRICAO == "Uso de memória RAM" && (response[i].VALOR >= 41 && response[i].VALOR < 80 )) || (response[i].DESCRICAO == "Uso de disco" && (response[i].VALOR >= 50 && response[i].VALOR < 80))){
                    // console.log("dois")
                    // idQtdAlerta.innerHTML = "0";
                    // idQtdOk.innerHTML = "0";
                    // idQtdCrit.innerHTML = "0";
                }else if((response[i].DESCRICAO == "Uso da CPU" && response[i].VALOR >= 75) || (response[i].DESCRICAO == "Uso de memória RAM" && response[i].VALOR >= 80) || (response[i].DESCRICAO == "Uso de disco" && response[i].VALOR >= 80)){
                    // console.log("tres")
                    // idQtdCrit.innerHTML = "0";
                    // idQtdOk.innerHTML = "0";
                    // idQtdAlerta.innerHTML = "0";
                }
            }
        })
    })
}


function plotarGrafico() {

    let grafStatusCPU = document.getElementById('canvasStatusCPU').getContext('2d');
    let grafStatusDisco = document.getElementById('canvasStatusDisco').getContext('2d');
    let grafStatusMemoria = document.getElementById('canvasStatusMemoria').getContext('2d');

    console.log(configGraficoCPU);
    window.grafStatusCPU = new Chart(grafStatusCPU, configGraficoCPU);
    window.grafStatusDisco = new Chart(grafStatusDisco, configGraficoDisco);
    window.grafStatusMemoria = new Chart(grafStatusMemoria, configGraficoMemoria);
    receberLeiturasGrafCPU();
    receberLeiturasGrafDISCO()
    receberLeiturasGrafMEMORIA()
    receberRegistros();

}
window.onload = plotarGrafico;



// function exibirGraficos() {

//     //variáveis
//     var maquinasCriticas = [];
//     var contadorCpu = 0;
//     var contadorMemoria = 0;
//     var contadorDisco = 0;

//     //exibindo e ocultando divs.
//     document.getElementById('canvasGrafSemanal').style.display = "none";
//     document.getElementById('divStatusPC').style.display = 'block';
//     document.getElementById('btnVoltar').style.display = "block";

//     //fetch e validação de uso.
//     fetch('/dash', {
//             cache: 'no-store'
//         }).then(function (response) {
//             console.log("Chegou aqui na dash", response)
//             if (response.ok) {

//                 response.json().then(function (resposta) {


//                     let qtdComputador = 1;
//                     let qtdComputadorOk = 0;
//                     let qtdComputadorAlerta = 0;
//                     let qtdComputadorCrit = 0;

//                     let idComputadorCrit = [];
//                     let idComputadorAlerta = [];
//                     let idComputadorOk = [];

//                     var contadorRam = 0;

//                     for (var i = 0; i < resposta.recordset.length; i++) {
//                         var registro = resposta.recordset[i];
//                         //começa os gráficos 
//                         //CPU
//                         if (registro.DESCRICAO == "Uso da CPU") {

//                             console.log("CHEGOUU")
//                             console.log("Desc", contadorCpu)

//                             if (contadorCpu >= 5) { //se a quantidade de vezes que essa cpu pegou dados for <5 ela repete
//                                 console.log("Chegou o disco voadorr", contadorCpu)
//                                 canvasStatusCPU.data.labels.push(registro.DATA_HORA);
//                                 canvasStatusCPU.data.datasets[0].data.push(parseInt(registro.VALOR));
//                                 contadorCpu++;
//                             }
//                         } else if (registro.DESCRICAO == "Uso de memória RAM") {
//                             if (contadorMemoria == 0) {
//                                 // canvasStatusMemoria.data.labels.push(registro.DATA_HORA);
//                                 canvasStatusMemoria.data.datasets[0].data.push(parseInt(registro.VALOR));
//                                 contadorMemoria++;
//                             }
//                         } else if (registro.DESCRICAO == "Uso de disco") {
//                             if (contadorDisco == 0) {
//                                 var calcResto = (100 - parseInt(registro.VALOR)).toFixed(2);
//                                 canvasStatusDisco.data.datasets[0].data.push(parseInt(calcResto));
//                                 canvasStatusDisco.data.datasets[0].data.push(parseInt(registro.VALOR));
//                                 contadorDisco++;
//                             }
//                         }
//                         // console.log(resposta.recordset[i])

//                         //validação status máquina
//                         if (contadorCpu < 5) {
//                             console.log("chegou no if")

//                             if ((registro.DESCRICAO == "Uso da CPU" && registro.VALOR < 50) && (registro.DESCRICAO == "Uso de memória RAM" && registro.VALOR < 40) && (registro.DESCRICAO == "Uso de disco" && registro.VALOR < 40)) {
//                                 qtdComputadorOk++
//                                 idComputadorOk.push(registro.fkMaquina);
//                                 exibirInfoCrit();
//                             } else if ((registro.DESCRICAO == "Uso da CPU" && registro.VALOR >= 50) || (registro.DESCRICAO == "Uso de memória RAM" && registro.VALOR >= 60) || (registro.DESCRICAO == "Uso de disco" && registro.VALOR >= 60)) {
//                                 qtdComputadorAlerta++
//                                 idComputadorAlerta.push(registro.fkMaquina);
//                                 exibirInfoAlerta()
//                             } else if ((registro.DESCRICAO == "Uso da CPU" && registro.VALOR >= 75) || (registro.DESCRICAO == "Uso de memória RAM" && registro.VALOR >= 80) || (registro.DESCRICAO == "Uso de disco" && registro.VALOR >= 80)) {
//                                 qtdComputadorCrit++
//                                 idComputadorCrit.push(registro.fkMaquina);
//                                 exibirInfoOk();
//                             }
//                             contadorCpu++;
//                             console.log(qtdComputadorCrit);
//                         }
//                         exibirInfoCrit();
//                         idQtdCrit.innerHTML = `${qtdComputadorCrit}<i class="fa fa-exclamation-triangle fa-4x" aria-hidden="true"></i>`;
//                         idQtdAlerta.innerHTML = `${qtdComputadorCrit}<i class="fa fa-exclamation-triangle fa-4x" aria-hidden="true"></i>`;
//                         idQtdOk.innerHTML = `${qtdComputadorCrit}<i class="fa fa-exclamation-triangle fa-4x" aria-hidden="true"></i>`;
//                     }

//                     canvasStatusCPU.update();
//                     canvasStatusMemoria.update();
//                     canvasStatusDisco.update();
//                     console.log(maquinasCriticas);
//                     localStorage.setItem("maquinasCriticas", maquinasCriticas);
//                 });
//             } else {
//                 console.error('Nenhum dado encontrado ou erro na API');
//             }
//         })
//         .catch(function (error) {
//             console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
//         });

function exibirInfoCrit() {

    document.getElementById('computadoresOk').style.display = "none";
    document.getElementById('computadoresAlerta').style.display = "none";
    document.getElementById('computadoresCrits').style.display = "block";

    computadoresCrits.innerHTML = '';

    document.getElementById('idSpanStatus').style.color = "#eb4d4b"
    document.getElementById('idSpanStatus').innerHTML = "Crítico"

    computadoresCrits.innerHTML = `<button style = " margin-left: 15px;" class="idMaquina" id="idGraficos" onclick="exibirGraficos()">ID 456.418.810/00 </button> <br>`;

}

function exibirInfoAlerta() {

    document.getElementById('computadoresOk').style.display = "none";
    document.getElementById('computadoresCrits').style.display = "none";
    document.getElementById('computadoresAlerta').style.display = "block";


    computadoresAlerta.innerHTML = '';

    document.getElementById('idSpanStatus').style.color = "#f9ca24"
    document.getElementById('idSpanStatus').innerHTML = "Em Alerta"

    for (let i = 0; i < qtdComputadorAlerta; i++) {

        computadoresAlerta.innerHTML += `<button style = " margin-left: 15px;" class="idMaquina" id="idGraficos" onclick="exibirGraficos()">ID 456.418.810/00 </button> <br>`;
    }

}

function exibirInfoOk() {

    document.getElementById('computadoresOk').style.display = "block";
    document.getElementById('computadoresCrits').style.display = "none";
    document.getElementById('computadoresAlerta').style.display = "none";

    computadoresOk.innerHTML = '';

    document.getElementById('idSpanStatus').style.color = "#43B581"
    document.getElementById('idSpanStatus').innerHTML = "Estável"


    for (let i = 0; i < qtdComputadorOk; i++) {

        computadoresOk.innerHTML += `<button style = " margin-left: 15px;" class="idMaquina" id="idGraficos" onclick="exibirGraficos()">ID 456.418.810/00 </button> <br>`;

    }

}



//     let canvasStatusCPU = new Chart(grafStatusCPU, {
//         type: 'line',

//         data: {
//             labels: [],

//             datasets: [{
//                 label: 'Status da CPU (%)',
//                 data: [],
//                 backgroundColor: "#10284200",
//                 borderColor: "#2e86de"
//             }]
//         }
//     });

//     let canvasStatusDisco = new Chart(grafStatusDisco, {
//         type: 'pie',

//         data: {
//             labels: ['Livre', 'Em uso'],

//             datasets: [{
//                 label: 'DISCO (%)',
//                 data: [],
//                 backgroundColor: ['#43B581', '#eb4d4b'],
//             }]
//         }
//     });

//     let canvasStatusMemoria = new Chart(grafStatusMemoria, {
//         type: 'bar',

//         data: {
//             labels: ['Em uso'],

//             datasets: [{
//                 label: 'Status memória (%)',
//                 data: [],
//                 backgroundColor: ['#eb4d4b'],
//                 borderWidth: 1,
//                 innerWidth: 70,
//                 bodyFontSize: 12
//             }]
//         }
//     });

//     setTimeout(() => {
//         exibirGraficos();
//     }, 3000);
//}