require("./apiIsa/config/connection");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3333;
const mssql = require('mssql');
const request = new mssql.Request();


app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
console.log(__dirname);

//LOGIN USER - é chamado após a validação de campos na returnDados;
app.post('/user', function(req, res) {
    console.log("index.js está ok")

    console.log(req.body)

    request.query(`SELECT * FROM 
                    CadastroFuncionario where usuario='${req.body.usuario1}' 
                    and senha='${req.body.senha1}' and cargo= ${req.body.cargo}`,
        function(err, result) {
            if (err) throw err;
            console.log("teste", result);
            if (result.recordsets[0].length) {
                res.json({
                    msg: result.recordsets[0]
                });
            } else {
                res.send(401) // não autorizado, QUANDO NAO ENCONTRAR USUARIO NO SELECT ACIMA 
            }
        })
});

app.get('/dash', function(req, res, next) {

    // for (var i = 1; i <= 3; i++) {

    //     const instrucaoSql = `select top 200 VALOR, DATA_HORA from Registro where fkComponentes=${i} order by idRegistro asc`;
    // }

    const instrucaoSql = `select top 200 * from Registro order by idRegistro asc`;

    request.query(instrucaoSql)
        .then(resultado => {
            console.log(`Encontrados: ${resultado.length}`);

            res.json(resultado);
        }).catch(erro => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
});


//CADASTRO ADDUSER - é chamado após a validação de campos na returnDados;
app.post('/addUser', (req, res) => {

    let data = [req.body.nome, req.body.email1, req.body.senha1, req.body.cargo1];
    console.log("TESTE", data);
    console.log(req.body);
    // let sql = "INSERT INTO CadastroFuncionario (nomeFuncionario, email, senha, cargo) values (?,?,?,?)";
    let sql = `INSERT INTO CadastroFuncionario VALUES ('${data[0]}', '${data[1]}', '${data[2]}', 1, ${data[3]}, 'Lu')`;

    request.query(sql, data, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
})


//PORTA
app.listen(process.env.PORT || port, function() {
    console.log('Servidor rodando na porta ' + port);
});