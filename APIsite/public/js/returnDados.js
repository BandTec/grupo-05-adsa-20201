//VALIDAÇÃO CADASTRO
function validaCadastro() {
    // let form1 = document.querySelector("#form_user");
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
            body: JSON.stringify({ nome1, email1, senha1, cargo1, userName, faculdade })
        }).then(respostaDoServidor => {
            if (respostaDoServidor.status === 200) {
                alert("Cadastro realizado com sucesso!");
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
    let maquina = document.querySelector("#nomeMaq_cadastro").value;
    // let cpu = document.querySelector("#cpu_check");
    // let memoria = document.querySelector("#memoria_check");
    // let disco = document.querySelector("#disco_check");
    // let gpu = document.querySelector("#gpu_check");

    if (maquina.length < 5) {
        alert("Preencha o hostName corretamente!")
    } else {
        fetch("/addMaquina", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ maquina })
        }).then(respostaDoServidor => {
            if (respostaDoServidor.status === 200) {
                alert("Cadastro realizado com sucesso!");
            }
        })
    }
}

//----------------------------------------------------------------------//