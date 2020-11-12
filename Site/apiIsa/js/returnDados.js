
let teste = [];
function pegarusuario(){
    let div = document.querySelector("#msg")
    let ajax = new XMLHttpRequest();
    ajax.open("GET","http://localhost:3000/user",true);
    ajax.onreadystatechange =function(){
        if(ajax.readyState==XMLHttpRequest.DONE){
            let array = ajax.responseText;
            
                teste= JSON.parse(array);

            console.log(array);            

        }
    }
    ajax.send();
}
//- variáveis que regataram o corpo dos inputs na tela cadastro
let form = document.querySelector("#form_cadastro");
let nome = document.querySelector('#nome_cadastro');
let email = document.querySelector('#email_cadastro');
let senha = document.querySelector('#senha_cadastro');
let cargo = document.querySelector('#Select_cargo');
let foto = document.querySelector('#Input_fotoPerfil');

//- variáveis que regataram o corpo dos inputs na tela login
let usuario2 = document.querySelector('#user_login');
let senha2 = document.querySelector('#senha_login');
let func = document.querySelector('#funcionarios');


////LOGIN
function UserLogin(evento){
    // evento.preventDefault();
    let ajax =  new XMLHttpRequest();
    let params = "user_login=" + usuario2.value + "&senha_login=" + senha2.value + "&funcionarios" + func.value;
    ajax.open("POST","http://localhost:3000/UserLogin");
    ajax.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    ajax.onreadystatechange=function(){
        if(ajax.status==200 & ajax.readyState==4){
            console.log(ajax.responseText);
            let Json_string = JSON.parse(ajax.responseText);
            if(Json_string[0].id > 0){

                if(func.value == 1){
                    window.location.assign('home.html')
                }if(func.value == 2){
                    window.location.assign('/Pages/pag-Dashboard/pag-dashboard.html')
                }            

            }else{
                alert('Email ou senha incorretos!')

            }
        }
    }
    ajax.send(params);
}


////CADASTRO
function addUser(evento){
    // evento.preventDefault();
    let ajax =  new XMLHttpRequest();
    let params = "nome=" + nome.value + "&email=" + email.value + "&senha=" + senha.value + "&cargo=" + cargo.value + "&foto=" + foto.value;

    ajax.open("POST","http://localhost:3000/addUser");
    ajax.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    ajax.onreadystatechange=function(){
        if(ajax.status==200 & ajax.readyState==4){
            console.log(ajax.responseText);
        }
    }
    
    ajax.send(params);

}
/* aqui estará adicionando eventos quando o input type submit for clicado 
no caso as funções disparadas serão addUser e UserLogin, cada uma com seu proprio evento. */
form.addEventListener("submit",validaCadastro);
form_dois.addEventListener("submit",validaLogin);