

module.exports = {
    development: {
        dialect: "sqlite",
        storage: "./db.development.sqlite"
    },
    test: {
        dialect: "sqlite",
        storage: ":memory:"
    },
    production: {
        username: 'supervisor',
        password: 'Grupo5super',
        database: 'BD-SuperVisor',
        host: 'supervisor-servidor.database.windows.net',
        dialect: 'mssql',
        xuse_env_variable: 'DATABASE_URL',
        dialectOptions: {
            options: {
                encrypt: true
            }
        },
        pool: {
            max: 5,
            min: 1,
            acquire: 5000,
            idle: 30000,
            connectTimeout: 5000
        }
    }
};

// const mysql = require('mssql');



// const connection = mysql.createConnection({
//     host:"localhost",
//     port:"3306",
//     user:"root",
//     password:"bandtec",
//     database:"bdJordan"
// });

// connection.connect(function(err){
//     if(err) return console.log(err);
//     console.log("Conectado com sucessor")
// });

// module.exports=connection;
