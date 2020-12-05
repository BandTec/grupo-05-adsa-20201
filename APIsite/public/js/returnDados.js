// variáveis que regataram o corpo dos inputs na tela cadastro
let form = document.querySelector("#form_cadastro");
let foto = document.querySelector('#Input_fotoPerfil');

// variáveis que regataram o corpo dos inputs na tela login
let form1 = document.querySelector("#form_user");
let usuario1 = document.querySelector('#user_login');
let senha1 = document.querySelector('#senha_login');
let func = document.querySelector('#funcionarios');

// variáveis que regataram o corpo dos inputs na tela cadastro de máquina


//----------------------------------------------------------------------//

//VALIDAÇÃO CADASTRO
function validaCadastro() {

    let nome1 = document.querySelector('#nome_cadastro').value;
    let senha1 = document.querySelector('#senha_cadastro').value;
    let email1 = document.querySelector('#email_cadastro').value;
    let cargo1 = document.querySelector('#Select_cargo').value; 
    let faculdade = document.querySelector('#Select_faculdade').value;
    let userName = document.querySelector('#user_Name').value;

    if (email1.indexOf('@') == -1 || email1.indexOf('.') == -1 || email1.length < 10 || senha1.length < 5 || userName < 5) {
        alert('Campos inválidos!')
    } else {
        fetch("/addUser", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ nome1, email1, senha1, cargo1, userName, faculdade})
        }).then(respostaDoServidor => {
            if (respostaDoServidor.status === 200) {
            
            }
        })
    }
}

//----------------------------------------------------------------------//

function UserLogin(evento) {
    let ajax = new XMLHttpRequest();
    let params = "user_login=" + usuario1.value + "&senha_login=" + senha1.value;
    console.log('chegou');
    ajax.open("POST", "http://localhost:3000/user");
    ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    ajax.onreadystatechange = function() {

    }
    ajax.send(params);
}

//----------------------------------------------------------------------//

// VALIDAÇÃO LOGIN
function validaLogin() {
    // event.preventDefault();
    let usuario1 = document.querySelector('#user_login').value;
    let senha1 = document.querySelector('#senha_login').value;
    if (usuario1 == "" || senha1 == "") {
        alert('Verifique se todos os campos foram preenchidos!')
    } else {
        pegarusuario();
    }
}

//----------------------------------------------------------------------//

function pegarusuario() {
    let usuario1 = document.querySelector('#user_login').value;
    let senha1 = document.querySelector('#senha_login').value;
    let cargo = document.querySelector('#funcionarios').value;
    fetch("/user", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ usuario1, senha1, cargo })
    }).then(respostaDoServidor => {
        if (respostaDoServidor.status === 200) {
            respostaDoServidor.json().then(objetoDoBanco => {
                if (objetoDoBanco.msg[0].cargo === 1) {
                    window.location.assign('pagSuporte.html');
                } else if (objetoDoBanco.msg[0].cargo === 2) {
                    localStorage.setItem("idUsuario", objetoDoBanco.msg[0].idFuncionario);
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

//VALIDAÇÃO CADASTRO DE MÁQUINA
function validaCadastroMaq() {
    let cpu = document.querySelector("#cpu_check").value;
    let memoria = document.querySelector("#memoria_check").value;
    let disco = document.querySelector("#disco_check").value;
    let gpu = document.querySelector("#gpu_check").value;
    let maquina = document.querySelector("#nomeMaq_cadastro").value;

    if (nome2 == "") {
        alert("Não esqueça de preencher o hostname!")
    } else {
        fetch("/addMaquina", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({maquina})
        }).then(respostaDoServidor => {
            if (respostaDoServidor.status === 200) {
            
            }
        })
    }
}

//----------------------------------------------------------------------//