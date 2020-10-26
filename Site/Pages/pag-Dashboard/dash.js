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




function exibirGraficos(){
    document.getElementById('canvasGrafSemanal').style.display = "none";
    document.getElementsByClassName('divGraficos').innerHTML = '';

    
    
    let grafStatusCPU = document.getElementById('canvasStatusCPU').getContext('2d');
    let canvasStatusCPU = new Chart(grafStatusCPU, {
    type: 'line',
                        
    data: {
        labels: ['20:00', '20:05', '20:10', '20:15', '20:20', '20:25'],
                    
        datasets: [
            {
                label: 'Status da CPU (%)',
                data: [80, 100, 100, 95, 90, 100],
                backgroundColor: "#10284200",
                borderColor: "#102842"
            }
        ]
    }
});

let grafStatusDisco = document.getElementById('canvasStatusDisco').getContext('2d');
let canvasStatusDisco = new Chart(grafStatusDisco, {
type: 'pie',
                    
data: {
    labels: ['Livre', 'Em uso'],
                
    datasets: [
        {
            label: 'Status da CPU (%)',
            data: [20, 80],
            backgroundColor: ['#F45B47', 'green'],
        }
    ]
}
});


let grafStatusMemoria = document.getElementById('canvasStatusMemoria').getContext('2d');
let canvasStatusMemoria = new Chart(grafStatusMemoria, {
type: 'bar',
                    
data: {
    labels: ['Em uso'],
                
    datasets: [
        {
            label: 'Status memória',
            data: [80],
            backgroundColor: ['#F45B47'],
            borderWidth: 1,
            innerWidth: 70,
            bodyFontSize: 12
        }
    ]
}
});





{/* <p class="pFiltrarComputadores"> Filtrar computadores </p>
<p class="pStatusMaquina"> Status: <span class="spanStatus" style="yellow"> Instavel </span> </p>
<center>
<button class="idMaquina" id="idGraficos" onclick="exibirGraficos()" >ID 001</button>
<button class="idMaquina">ID 003</button>
<button class="idMaquina">ID 012</button>
<button class="idMaquina">ID 003</button>
<button class="idMaquina">ID 012</button>
<button class="idMaquina">ID 003</button>
<button class="idMaquina">ID 012</button>
<button class="idMaquina">ID 003</button>
<button class="idMaquina">ID 012</button>
<button class="idMaquina">ID 003</button>
<button class="idMaquina">ID 012</button>
<button class="idMaquina">ID 012</button>
</center>  */}



}


 








