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
        gif_aqui.innerHTML += `<div style="width:70%;height:0;padding-bottom:57%;position:relative;"><iframe src="https://giphy.com/embed/jPAdK8Nfzzwt2" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>`
    }
}