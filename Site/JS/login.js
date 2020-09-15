function fazer_login() {
    const login = user_cadastrado.value == "teste";
    const senha = senha_cadastrado.value == "teste";

    if (login && senha) {
        alert("Login feito!")
    } else if (!login && senha) {
        alert("Login incorreto")
    } else if (login && !senha) {
        alert("Senha incorreta")
    } else if (!login && !senha) {
        alert("TA TUDO ERRADO!")
    }
}