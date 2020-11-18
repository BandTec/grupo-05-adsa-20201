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

// variáveis que regataram o corpo dos inputs na tela cadastro
let form = document.querySelector("form_cadastro");
let nome = document.querySelector('#nome_cadastro');
let email = document.querySelector('#email_cadastro');
let senha = document.querySelector('#senha_cadastro');
let cargo = document.querySelector('#Select_cargo');
let foto = document.querySelector('#Input_fotoPerfil');

// variáveis que regataram o corpo dos inputs na tela login
let form1 = document.querySelector("form_user");
let usuario1 = document.querySelector('#user_login');
let senha1 = document.querySelector('#senha_login');
let func = document.querySelector('#funcionarios');


//----------------------------------------------------------------------//

// VALIDAÇÃO CADASTRO
// function fazer_login(evento){
//   evento.preventDefault();
//   let nome = document.querySelector('#user_login').value;
//   let senha1 = document.querySelector('#senha_login').value;
//   if(usuario1.indexOf('@') == -1 || usuario1.indexOf('.') == -1 || usuario1.length < 10 || senha1.length <= 5) {
//       alert('Email ou senha inválidos!')
//   }else{
//       addUser();
//   }
// }



// VALIDAÇÃO LOGIN
function validaLogin(){
  event.preventDefault();
  let usuario1 = document.querySelector('#user_login').value;
  let senha1 = document.querySelector('#senha_login').value;
  console.log(senha1);
  if(usuario1 == "" || senha1 == "" || senha1 == ""){
      alert('Verifique se todos os campos foram preenchidos!')
  }
  else{
      UserLogin();
  }
}

//----------------------------------------------------------------------//
/* aqui estará adicionando eventos quando o input type submit for clicado 
no caso as funções disparadas serão addUser e UserLogin, cada uma com seu proprio evento. */
form.addEventListener("submit",validaCadastro);
form1.addEventListener("submit",validaLogin);
