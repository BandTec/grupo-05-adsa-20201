function addUser(evento){
    // evento.preventDefault();
    let ajax =  new XMLHttpRequest();
    let params = "nome=" + nome.value + "&email=" + email.value + "&senha=" + senha.value + "&cargo=" + cargo.value + "&foto=" + foto.value;

    ajax.open("POST","http://localhost:3000/addUser");//perguntar se aqui muda o host para o nosso
    ajax.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    ajax.onreadystatechange=function(){
        if(ajax.status==200 & ajax.readyState==4){
            console.log(ajax.responseText);
        }
    }
    
    ajax.send(params);

}