

package dashboard;

import configBanco.Conexao;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import javax.swing.JLabel;



public class Gerenciador {
    
    configBanco.Conexao config = new Conexao();
    
    public void recuperarDados(Integer categoria, JLabel lblLocal) {
    
         try (Connection connection = DriverManager.getConnection(config.connectionUrl);
                Statement statement = connection.createStatement();) {

            // Cria e depois executa uma query feita por colunas, 
            // mas * funciona da mesma forma e poupa tempo.
            String selectSql = String.format("SELECT COUNT(CATEGORIA) FROM Maquina" 
                  + " WHERE CATEGORIA = '%d'", categoria);

            ResultSet resultSet = statement.executeQuery(selectSql);
            
            while (resultSet.next()) {
                lblLocal.setText(resultSet.getString(1));
            }
            

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    
}