function fazer_login() {
    const login = user_cadastrado.value == "teste";
    const senha = senha_cadastrado.value == "teste";



    if (login && senha) {
        window.location.href = '../Pages/pagSuporte.html';
    } else if (!login && senha) {
        alerta_login_id.style.display = 'block';
        alerta_senha_id.style.display = 'none';
        alerta_login_senha_id.style.display = 'none';
    } else if (login && !senha) {
        alerta_login_id.style.display = 'none';
        alerta_senha_id.style.display = 'block';
        alerta_login_senha_id.style.display = 'none';
    } else if (!login && !senha) {
        alerta_login_id.style.display = 'none';
        alerta_senha_id.style.display = 'none';
        alerta_login_senha_id.style.display = 'block';
    }

}