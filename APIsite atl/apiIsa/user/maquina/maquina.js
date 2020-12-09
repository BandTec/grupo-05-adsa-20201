function addMaquina(evento){
    // evento.preventDefault();
    let ajax =  new XMLHttpRequest();
    let params1 = "nomeMaq_cadastro=" + maquina.value + "cpu_check= 1" + cpu.value + "memoria_check= 2" + memoria.value + 
    "disco_check= 3" + disco.value + "gpu_check= 4" + gpu.value;

    ajax.open("POST","http://localhost:3000/addUser");
    ajax.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    ajax.onreadystatechange=function(){
        if(ajax.status==200 & ajax.readyState==4){
            console.log(ajax.responseText);
        }
    }
    ajax.send(params1);

}



  