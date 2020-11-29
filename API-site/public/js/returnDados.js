// variáveis que regataram o corpo dos inputs na tela cadastro
let form = document.querySelector("#form_cadastro");
let nome = document.querySelector('#nome_cadastro');
let email = document.querySelector('#email_cadastro');
let senha = document.querySelector('#senha_cadastro');
let foto = document.querySelector('#Input_fotoPerfil');

// variáveis que regataram o corpo dos inputs na tela login
let form1 = document.querySelector("#form_user");
let usuario1 = document.querySelector('#user_login');
let senha1 = document.querySelector('#senha_login');
let func = document.querySelector('#funcionarios');


//----------------------------------------------------------------------//

//VALIDAÇÃO CADASTRO
function validaCadastro(evento) {
    evento.preventDefault();
    let nome = document.querySelector('#user_login').value;
    let senha1 = document.querySelector('#senha_login').value;
    if (usuario1.indexOf('@') == -1 || usuario1.indexOf('.') == -1 || usuario1.length < 10 || senha1.length <= 5) {
        alert('Email ou senha inválidos!')
    } else {
        addUser();
    }
}

//----------------------------------------------------------------------//

function UserLogin(evento) {
    let ajax = new XMLHttpRequest();
    let params = "user_login=" + usuario1.value + "&senha_login=" + senha1.value /*+ "&funcionarios" + func.value*/;
    console.log('chegou');
    ajax.open("POST", "http://localhost:3000/user");
    ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    ajax.onreadystatechange = function () {

    }
    ajax.send(params);
}

//----------------------------------------------------------------------//

// VALIDAÇÃO LOGIN
function validaLogin() {
    event.preventDefault();
    let usuario1 = document.querySelector('#user_login').value;
    let senha1 = document.querySelector('#senha_login').value;
    if (usuario1 == "" || senha1 == "") {
        alert('Verifique se todos os campos foram preenchidos!')
    }
    else {
        pegarusuario();
    }
}

//----------------------------------------------------------------------//

let teste = [];
function pegarusuario() {
    console.log("CHEGOU");
    let usuario = document.querySelector('#user_login').value;
    let senha = document.querySelector('#senha_login').value;
    let cargo = document.querySelector('#funcionarios').value;
    fetch("http://localhost:3000/user",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ usuario, senha, cargo })
        }).then(respostaDoServidor => {
            if (respostaDoServidor.status === 200) {
                respostaDoServidor.json().then(objetoDoBanco=> {
                    if (objetoDoBanco.msg[0].cargo === 1) {
                        window.location.assign('pagSuporte.html');
                    }else if (objetoDoBanco.msg[0].cargo === 2){
                        window.location.assign('pag-Dashboard/pag-dashboard.html');
                    }
                })
            } else {
                alert("usuario/senha invalido")
            }
            // if (res.status === 200) {
            //     alert('Deu certo "loko" ')
            // } else {
            //     alert("Usuario/Senha 'invalido' ")
            // }
        })

}




//----------------------------------------------------------------------//
/* aqui estará adicionando eventos quando o input type submit for clicado
no caso as funções disparadas serão addUser e UserLogin, cada uma com seu proprio evento. */

////////////////////////////////////////////////////||
// form.addEventListener("submit",validaCadastro);  ||
// form1.addEventListener("submit",validaLogin);    ||
////////////////////////////////////////////////////||