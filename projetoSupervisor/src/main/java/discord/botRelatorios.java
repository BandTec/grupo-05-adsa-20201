package discord;

import configBanco.Conexao;
import discord4j.core.DiscordClient;
import discord4j.core.GatewayDiscordClient;
import discord4j.core.event.domain.message.MessageCreateEvent;
import discord4j.core.object.entity.Message;
import discord4j.core.object.entity.channel.MessageChannel;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class botRelatorios {

    static Conexao config = new Conexao();

    public static void main(final String[] args) {
        final String token = "NzgxNjQ3OTg1Mzc2NjI0NjUx.X8Asag.mRBGFSJCusPxa_85qIHiHgx8oQA";
        final DiscordClient client = DiscordClient.create(token);
        final GatewayDiscordClient gateway = client.login().block();
        final List<String> relatorio = new ArrayList<>();

        gateway.on(MessageCreateEvent.class).subscribe(event -> {
            final Message message = event.getMessage();
            if ("Relatorio".equalsIgnoreCase(message.getContent())) {
                relatorio.clear();
                for (Integer i = 1; i <= 3; i++) {

                   relatorio.add(criarMensagem(i.toString()));
                }
                
                final MessageChannel channel = message.getChannel().block();
                channel.createMessage("**INFORMAÇÕES DOS COMPONENTES: **\n" 
                        + relatorio.toString()).block();
            }
        });

        gateway.onDisconnect().block();
    }

    // Recebe o id do componente, gerado pelo for (linha 31), passa dentro do 
    // select no lugar da fk do componente para poder pegar o componente e seu 
    // respectivo valor
    public static String criarMensagem(String idComponente) {
        String descricao = null;
        String valor = null;

        try (Connection connection = DriverManager.getConnection(config.connectionUrl);
                Statement statement = connection.createStatement();) {

            // Faz uma busca na tabela pegando o valor e descrição do primeiro 
            // registro inserido de cada componente, porém, é ordenado pelo ID 
            // em ordem decrescente, portanto, pegará o último valor e descrição
            // inseridos para cada componente
            String selectSql = String.format("SELECT TOP 1 VALOR, DESCRICAO FROM Registro"
                    + " WHERE fkComponentes = '%s' ORDER BY idRegistro DESC", 
                    idComponente);

            ResultSet resultSet = statement.executeQuery(selectSql);

            // Pega o valor contido na coluna "VALOR" e "DESCRICAO" e armazena 
            // em uma variável
            while (resultSet.next()) {
                valor = resultSet.getString("VALOR");
                descricao = resultSet.getString("DESCRICAO");
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        // Retorna os dados concatenados
        return "\n" + descricao + " - " + valor + "%\n";
    }
    
    
}
