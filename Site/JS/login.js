function fazer_login() {
    const login = user_cadastrado.value == "teste";
    const senha = senha_cadastrado.value == "teste";
    const login2 = user_cadastrado.value == "teste2";
    const senha2 = senha_cadastrado.value == "teste2";




    if (login && senha) {
        window.location.href = '../Pages/pagSuporte.html';
    } else if (login2 && senha2) {
        window.location.href = '../Pages/dashboard/dashboard.html';
    } else if ((!login && senha) || (!login2 && senha2)) {
        alerta_login_id.style.display = 'block';
        alerta_senha_id.style.display = 'none';
        alerta_login_senha_id.style.display = 'none';
    } else if ((login && !senha) || (login2 && !senha2)) {
        alerta_login_id.style.display = 'none';
        alerta_senha_id.style.display = 'block';
        alerta_login_senha_id.style.display = 'none';
    } else if ((!login && !senha) || (!login2 && !senha2)) {
        alerta_login_id.style.display = 'none';
        alerta_senha_id.style.display = 'none';
        alerta_login_senha_id.style.display = 'block';
    }

}