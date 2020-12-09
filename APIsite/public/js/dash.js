let canvasGrafSemanal = document.getElementById('canvasGrafSemanal').getContext('2d');
let chart = new Chart(canvasGrafSemanal, {
    type: 'line',

    data: {
        labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],

        datasets: [{
            label: 'Relatório da semana',
            data: [3, 1, 5, 12, 7, 3],
            backgroundColor: "#10284200",
            borderColor: "#e84118"
        }]
    }
});

let grafStatusCPU = document.getElementById('canvasStatusCPU').getContext('2d');
let grafStatusDisco = document.getElementById('canvasStatusDisco').getContext('2d');
let grafStatusMemoria = document.getElementById('canvasStatusMemoria').getContext('2d');
// let grafStatusGPU = document.getElementById('canvasStatusGPU').getContext('2d');

function exibirGraficos() {
    var maquinasCriticas = [];
    var contadorCpu = 0;
    var contadorMemoria = 0;
    var contadorDisco = 0;
    var contadorGpu = 0;
    document.getElementById('canvasGrafSemanal').style.display = "none";
    document.getElementById('divStatusPC').style.display = 'block';
    document.getElementById('btnVoltar').style.display = "block";
    fetch('/dash', { cache: 'no-store' }).then(function (response) {
        if (response.ok) {

            response.json().then(function (resposta) {
                for (var i = 0; i < resposta.recordset.length; i++) {
                    var registro = resposta.recordset[i];
                    if (registro.DESCRICAO == "Uso da CPU") {
                        console.log(registro.DESCRICAO);
                        if (contadorCpu < 5) {

                            canvasStatusCPU.data.labels.push(registro.DATA_HORA);
                            canvasStatusCPU.data.datasets[0].data.push(parseInt(registro.VALOR));
                            contadorCpu++;
                        }
                    } else if (registro.DESCRICAO == "Uso de memória RAM") {
                        if (contadorMemoria == 0) {
                            // canvasStatusMemoria.data.labels.push(registro.DATA_HORA);
                            canvasStatusMemoria.data.datasets[0].data.push(parseInt(registro.VALOR));
                            contadorMemoria++;
                        }
                    } else if (registro.DESCRICAO == "Uso de disco") {
                        if (contadorDisco == 0) {
                            var calcResto = (100 - parseInt(registro.VALOR)).toFixed(2);
                            canvasStatusDisco.data.datasets[0].data.push(parseInt(calcResto));
                            canvasStatusDisco.data.datasets[0].data.push(parseInt(registro.VALOR));
                            contadorDisco++;
                        }
                    } else {
                        if (contadorGpu < 5) {
                            canvasStatusGPU.data.labels.push(registro.DATA_HORA);
                            canvasStatusGPU.data.datasets[0].data.push(parseInt(registro.VALOR));
                            contadorCpu++;
                        }
                    }
                }
                canvasStatusCPU.update();
                canvasStatusMemoria.update();
                canvasStatusDisco.update();
                console.log(maquinasCriticas);
                localStorage.setItem("maquinasCriticas", maquinasCriticas);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });



    function x() {
        
    }
    let canvasStatusCPU = new Chart(grafStatusCPU, {
        type: 'line',

        data: {
            labels: [],

            datasets: [{
                label: 'Status da CPU (%)',
                data: [],
                backgroundColor: "#10284200",
                borderColor: "#2e86de"
            }]
        }
    });

    let canvasStatusDisco = new Chart(grafStatusDisco, {
        type: 'pie',

        data: {
            labels: ['Livre', 'Em uso'],

            datasets: [{
                label: 'DISCO (%)',
                data: [],
                backgroundColor: ['#43B581', '#eb4d4b'],
            }]
        }
    });

    let canvasStatusMemoria = new Chart(grafStatusMemoria, {
        type: 'bar',

        data: {
            labels: ['Em uso'],

            datasets: [{
                label: 'Status memória',
                data: [],
                backgroundColor: ['#eb4d4b'],
                borderWidth: 1,
                innerWidth: 70,
                bodyFontSize: 12
            }]
        }
    });

    let canvasStatusGPU = new Chart(grafStatusGPU, {
        type: 'line',

        data: {
            labels: [],

            datasets: [{
                label: 'Status GPU (%)',
                data: [],
                backgroundColor: "#10284200",
                borderColor: "#10ac84"

            }]
        }
    });
    // setTimeout(() => {
    //     exibirGraficos();
    //    }, 5000);
}