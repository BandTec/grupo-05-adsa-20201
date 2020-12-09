const mssql = require('mssql');

const config = {
    user: 'supervisor',
    password: 'Grupo5super',
    server: 'supervisor-servidor.database.windows.net',
    database: 'BD-SuperVisor',
    port: 1433,
    dialectOptions: {
        options: {
            encrypt: true,
            "enableArithAbort": true 
        }
    }
};
mssql.connect(config, err => {
    if (err) throw err;
    console.log("CONECTADO");
})