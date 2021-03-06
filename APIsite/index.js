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
// console.log(__dirname);

//LOGIN USER - é chamado após a validação de campos na returnDados;
app.post('/user', function(req, res) {
    console.log("index.js está ok")

    request.query(`SELECT * FROM 
                    CadastroFuncionario where usuario='${req.body.usuario1}' 
                    and senha='${req.body.senha1}' and cargo= ${req.body.cargo}`,
        function(err, result) {
            if (err) throw err;
            if (result.recordsets[0].length) {
                res.json({
                    msg: result.recordsets[0]
                });
            } else {
                res.send(401) // não autorizado, QUANDO NAO ENCONTRAR USUARIO NO SELECT ACIMA 
            }
        })
});

app.get('/cpu', function(req, res, next) {

    const instrucaoSql = `SELECT TOP 1 VALOR, DATA_HORA FROM Registro WHERE fkComponentes = 1 ORDER BY idRegistro DESC`;

    request.query(instrucaoSql)
        .then(resultado => {
            
            res.json(resultado.recordsets[0][0]);

        }).catch(erro => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
});


app.get('/memoria', function(req, res, next) {

    const instrucaoSql = `SELECT TOP 1 VALOR, DATA_HORA FROM Registro WHERE fkComponentes = 2 ORDER BY idRegistro DESC`;

    request.query(instrucaoSql)
        .then(resultado => {
            
            res.json(resultado.recordsets[0][0]);

        }).catch(erro => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
});


app.get('/disco', function(req, res, next) {

    const instrucaoSql = `SELECT TOP 1 VALOR, DATA_HORA FROM Registro WHERE fkComponentes = 3 ORDER BY idRegistro DESC`;

    request.query(instrucaoSql)
        .then(resultado => {
            
            res.json(resultado.recordsets[0][0]);

        }).catch(erro => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
});

app.get('/maquina', function(req, res) {

    const instrucaoSql = `SELECT COUNT(idMaquina) FROM Maquina`;

    request.query(instrucaoSql)
        .then(resultado => {
            // console.log(`Encontrados: ${resultado}`);
            res.json(resultado); 

        }).catch(erro => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
});

app.get('/registro', function(req, res) {

    const instrucaoSql = `SELECT * FROM Registro WHERE fkMaquina = 2`;

    request.query(instrucaoSql)
        .then(resultado => {

            res.json(resultado.recordsets[0]);

        }).catch(erro => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
});

//CADASTRO ADDUSER - é chamado após a validação de campos na returnDados;
app.post('/addUser', (req, res) => {

    let data = [req.body.nome1, req.body.email1, req.body.senha1, req.body.cargo1, req.body.userName, req.body.faculdade];
    let sql = `INSERT INTO CadastroFuncionario VALUES ('${data[0]}', '${data[1]}', '${data[2]}', '${data[5]}', '${data[3]}', '${data[4]}')`;

    request.query(sql, data, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
})

//CADASTRO ADDUSER - é chamado após a validação de campos na returnDados;
app.post('/addMaquina', (req, res) => {

    let data1 = [req.body.maquina];

    let sql = `INSERT INTO Maquina VALUES ('${data1[0]}', 1)`;

    request.query(sql, data1, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
})


//PORTA
app.listen(process.env.PORT || port, function() {
    console.log('Servidor rodando na porta ' + port);
});