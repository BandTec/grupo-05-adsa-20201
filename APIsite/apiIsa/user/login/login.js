function UserLogin(evento){
    evento.preventDefault();
    let ajax =  new XMLHttpRequest();
    let params = "user_login=" + usuario1.value + "&senha_login=" + senha1.value /*+ "&funcionarios" + func.value*/;
    ajax.open("POST","http://localhost:3000/user");
    ajax.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    ajax.onreadystatechange=function(){
        //status==200 (não houveram problemas ao acessar o recurso)
        //status==404 (houveram problemas ao acessar o recurso)
        if(ajax.status==200 & ajax.readyState==4){
            console.log(ajax.responseText);
            let Json_string = JSON.parse(ajax.responseText);
            if(Json_string[0].id > 0){
                
                if(func.value == 1){
                    window.location.assign('./../../public/Pages/pagSuporte.html')
                }if(func.value == 2){
                    window.location.assign('./../../public/Pages/pag-Dashboard/pag-dashboard.html')
                }            
            }else{
                alert('Email ou senha incorretos!')
            }
        }
    }
    ajax.send(params);
}
