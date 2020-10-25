let canvasGrafSemanal = document.getElementById('canvasGrafSemanal').getContext('2d');
let chart = new Chart(canvasGrafSemanal, {
    type: 'line',

    data: {
        labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
                    
        datasets: [
            {
                label: 'Relatório da semana',
                data: [3, 1, 5, 12, 7, 3],
                backgroundColor: "#10284200",
                borderColor: "#102842"
            }
        ]
    }
});

