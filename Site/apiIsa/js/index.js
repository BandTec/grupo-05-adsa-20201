const express = require('express');
const app = express();
const connection = require('./connection');
const bodyParser = require('body-parser');
const cors = require ('cors');
const port = 3000;


app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.get('/',(req,res)=>{
    res.send('Alo');
});



//LOGIN
app.get('/user',(req,res)=>{
    connection.query("SELECT email, senha, cargo FROM dbo.CadastroFuncionario",function(err,result){
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
    console.log('Servidor rodando na porta '+port);
});
