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
let grafStatusGPU = document.getElementById('canvasStatusGPU').getContext('2d');


function exibirGraficos() {
    document.getElementById('canvasGrafSemanal').style.display = "none";
    document.getElementById('divStatusPC').style.display = 'block';


    let canvasStatusCPU = new Chart(grafStatusCPU, {
        type: 'line',

        data: {
            labels: ['20:00', '20:05', '20:10', '20:15', '20:20', '20:25'],

            datasets: [{
                label: 'Status da CPU (%)',
                data: [80, 100, 100, 95, 90, 100],
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
                data: [30, 70],
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
                data: [80],
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
            labels: ['20:00', '20:05', '20:10', '20:15', '20:20', '20:25'],

            datasets: [{
                label: 'Status GPU (%)',
                data: [70, 60, 70, 80, 60, 50],
                backgroundColor: "#10284200",
                borderColor: "#10ac84"

            }]
        }
    });
}