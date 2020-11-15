let teste = [];
function pegarusuario(){
    fetch("http://localhost:3000/user",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({name:"ISA"})
    })


    // let ajax = new XMLHttpRequest();
    // ajax.open("GET","http://localhost:3000/user",true); //perguntar se aqui vai o host do banco no Azure
    // ajax.onreadystatechange =function(){
    //     if(ajax.readyState==XMLHttpRequest.DONE){
    //         let array = ajax.responseText;
            
    //             teste= JSON.parse(array);

    //         console.log(array);            
    //     }
    // }
    // ajax.send();
}
//- variáveis que regataram o corpo dos inputs na tela cadastro
// let form = document.querySelector("#form_cadastro");
// let nome = document.querySelector('#nome_cadastro');
// let email = document.querySelector('#email_cadastro');
// let senha = document.querySelector('#senha_cadastro');
// let cargo = document.querySelector('#Select_cargo');
// let foto = document.querySelector('#Input_fotoPerfil');

// //- variáveis que regataram o corpo dos inputs na tela login
// let usuario2 = document.querySelector('#user_login');
// let senha2 = document.querySelector('#senha_login');
// let func = document.querySelector('#funcionarios');


/* aqui estará adicionando eventos quando o input type submit for clicado 
no caso as funções disparadas serão addUser e UserLogin, cada uma com seu proprio evento. */
// form.addEventListener("submit",validaCadastro);
// form_dois.addEventListener("submit",validaLogin);
