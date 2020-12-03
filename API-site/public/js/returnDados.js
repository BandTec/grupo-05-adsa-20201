// variáveis que regataram o corpo dos inputs na tela cadastro
let form = document.querySelector("#form_cadastro");
let nome = document.querySelector('#nome_cadastro');
let email = document.querySelector('#email_cadastro');
let senha = document.querySelector('#senha_cadastro');
let cargo = document.querySelector('#Select_cargo');
let foto = document.querySelector('#Input_fotoPerfil');

// variáveis que regataram o corpo dos inputs na tela login
let form1 = document.querySelector("#form_user");
let usuario1 = document.querySelector('#user_login');
let senha1 = document.querySelector('#senha_login');
let func = document.querySelector('#funcionarios');


// variáveis que regataram o corpo dos inputs na tela cadastro de máquin
let form2 = document.querySelector("#form_cadastro");
let maquina = document.querySelector("#nomeMaq_cadastro");
let cpu = document.querySelector("#cpu_check");
let memoria = document.querySelector("#memoria_check");
let disco = document.querySelector("#disco_check");
let gpu = document.querySelector("#gpu_check");

//----------------------------------------------------------------------//

//VALIDAÇÃO CADASTRO
function validaCadastro(evento){
  evento.preventDefault();
  let nome = document.querySelector('#user_login').value;
  let senha1 = document.querySelector('#senha_login').value;
  if(usuario1.indexOf('@') == -1 || usuario1.indexOf('.') == -1 || usuario1.length < 10 || senha1.length <= 5) {
      alert('Email ou senha inválidos!')
  }else{
      addUser();
  }
}

//----------------------------------------------------------------------//

function UserLogin(evento){
    let ajax =  new XMLHttpRequest();
    let params = "user_login=" + usuario1.value + "&senha_login=" + senha1.value /*+ "&funcionarios" + func.value*/;
    console.log('chegou');
    ajax.open("POST","http://localhost:3000/user");
    ajax.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    ajax.onreadystatechange=function(){
        
    }
    ajax.send(params);
}

//----------------------------------------------------------------------//

// VALIDAÇÃO LOGIN
function validaLogin(){
    event.preventDefault();
    let usuario1 = document.querySelector('#user_login').value;
    let senha1 = document.querySelector('#senha_login').value;
    if(usuario1 == "" || senha1 == ""){
        alert('Verifique se todos os campos foram preenchidos!')
    }
    else{
        pegarusuario();
    }
  }

  //----------------------------------------------------------------------//

  let teste = [];
  function pegarusuario(){
    let usuario1 = document.querySelector('#user_login').value;
    let senha1 = document.querySelector('#senha_login').value;
    fetch("http://localhost:3000/user",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({email:usuario1,senha:senha1})
    }).then(res=> {
        res.json().then(console.log)
    })

} 
  
  //----------------------------------------------------------------------//

  //VALIDAÇÃO CADASTRO DE MÁQUINA
  function validaCadastroMaq(){

    let nome2 = document.querySelector('#nomeMaq_cadastro').value;
   
    if(!nome2.value){
        alert("Não esqueça de preencher o hostname!")
    } else {
        addMaquina();
    }
       
  }

   //----------------------------------------------------------------------//


   function addMaquina(){
    let ajax1 =  new XMLHttpRequest();
    let params1 = "nomeMaq_cadastro=" + maquina.value + "cpu_check= 1" + cpu.value + "memoria_check= 2" + memoria.value + 
    "disco_check= 3" + disco.value + "gpu_check= 4" + gpu.value;
    console.log('OK');
    ajax1.open("POST","http://localhost:3000/user");
    ajax1.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    ajax1.onreadystatechange=function(){
        
    }
    ajax1.send(params1);
};
  

//----------------------------------------------------------------------//
/* aqui estará adicionando eventos quando o input type submit for clicado 
no caso as funções disparadas serão addUser e UserLogin, cada uma com seu proprio evento. */

////////////////////////////////////////////////////||
// form.addEventListener("submit",validaCadastro);  ||
// form1.addEventListener("submit",validaLogin);    ||
////////////////////////////////////////////////////||