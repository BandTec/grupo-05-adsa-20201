require("./apiIsa/config/connection");
const express = require('express');
const app = express();
// const connection = require('./connection');
const bodyParser = require('body-parser');
const cors = require ('cors');
const port = 3000;
const mssql = require('mssql');
const request = new mssql.Request();


app.use(cors());
app.use(express.static('public'));
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));


//LOGIN
app.post('/user', function (req,res){
    console.log(req.body)
    
    request.query(`SELECT nomeFuncionario, senha FROM CadastroFuncionario where nomeFuncionario='${req.body.usuario1}' and senha='${req.body.senha1}' `,function(err,result){
        if(err) throw err;        
        res.send(result);
    })
});


//CADASTRO
app.post('/addUser',(req,res)=>{
    let data=[req.nomeFuncionario, req.body.email, req.body.senha, req.body.cargo];

    let sql = "INSERT INTO dbo.CadastroFuncionario (nomeFuncionario, email, senha, cargo) values (?,?,?,?)";

    connection.query(sql,data,function(err,result){
        if(err) throw err;
        res.send(result);
    });
})


app.listen(port, function(){
    console.log('Servidor rodando na porta '+ port);
});
