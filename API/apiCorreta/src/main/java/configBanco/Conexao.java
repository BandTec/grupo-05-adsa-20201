package configBanco;

public class Conexao {

    // Conexão com o banco
    // Mude o server name, username, e password com as suas credenciais
    public String connectionUrl
            = "jdbc:sqlserver://supervisor-servidor.database.windows.net;"
            + "database=BD-SuperVisor;"
            + "user=supervisor;"
            + "password=Grupo5super;"
            + "encrypt=true;"
            + "trustServerCertificate=false;"
            + "loginTimeout=30;";
}
