require("./apiIsa/config/connection");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;
const mssql = require('mssql');
const request = new mssql.Request();


app.use(cors());
app.use(express.static('public'));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));


//LOGIN USER - é chamado após a validação de campos na returnDados;
app.post('/user', function (req, res) {
    console.log("index.js está ok")

    console.log(req.body)

    request.query(`SELECT * FROM 
                    CadastroFuncionario where usuario='${req.body.usuario}' 
                    and senha='${req.body.senha}' and cargo= '${req.body.cargo}'`,
        function (err, result) {
            if (err) throw err;
            console.log(result);
            if (result.recordsets[0].length) {
                 res.json({
                    msg: result.recordsets[0]
                });
            } else {
                res.send(401)// não autorizado, QUANDO NAO ENCONTRAR USUARIO NO SELECT ACIMA 
            }
        })
});

app.get('/dash', function (req, res, next) {

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

    let data = [req.nomeFuncionario, req.body.email, req.body.senha, req.body.cargo];
    let sql = "INSERT INTO dbo.CadastroFuncionario (nomeFuncionario, email, senha, cargo) values (?,?,?,?)";

    connection.query(sql, data, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
})


//PORTA
app.listen(port, function () {
    console.log('Servidor rodando na porta ' + port);
});
