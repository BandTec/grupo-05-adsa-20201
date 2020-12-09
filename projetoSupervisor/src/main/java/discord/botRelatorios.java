//package discord;
//
//import configBanco.Conexao;
//import discord4j.core.DiscordClient;
//import discord4j.core.GatewayDiscordClient;
//import discord4j.core.event.domain.message.MessageCreateEvent;
//import discord4j.core.object.entity.Message;
//import discord4j.core.object.entity.channel.MessageChannel;
//import java.sql.Connection;
//import java.sql.DriverManager;
//import java.sql.ResultSet;
//import java.sql.SQLException;
//import java.sql.Statement;
//import java.util.ArrayList;
//import java.util.List;
//
//public class botRelatorios {
//
//    static Conexao config = new Conexao();
//
//    public static void  main(String[] args) {
//        final String token = "NzgxNjQ3OTg1Mzc2NjI0NjUx.X8Asag.vgTsUjoNnahLkzzGtBoJ2-VCJBo";
//        final DiscordClient client = DiscordClient.create(token);
//        final GatewayDiscordClient gateway = client.login().block();
//        final List<String> relatorio = new ArrayList<>();
//        final List<String> componentes = new ArrayList<>();
//        final Integer maquinasAtivas = contagemMaquinas();
//
//        gateway.on(MessageCreateEvent.class).subscribe(event -> {
//            final Message message = event.getMessage();
//            // Relatório
//            if ("Relatorio".toUpperCase().equalsIgnoreCase(message.getContent())) {
//                relatorio.clear();
//                for (Integer i = 1; i <= 3; i++) {
//
//                    relatorio.add(criarRelatorio(i.toString()));
//                }
//
//                final MessageChannel channel = message.getChannel().block();
//                channel.createMessage("```\n"
//                        + "• INFORMAÇÕES DOS COMPONENTES: \n"
//                        + relatorio.toString() + "```").block();
//            }
//            // Componentes
//            else if ("Componentes".toUpperCase().equalsIgnoreCase(message.getContent())) {
//                for (Integer i = 1; i <= 3; i++) {
//
//                    componentes.add(exibirComponentes(i));
//                }
//
//                final MessageChannel channel = message.getChannel().block();
//                channel.createMessage("```\n"
//                        + "• COMPONENTES: \n"
//                        + componentes.toString() + "```").block();
//            }
//            // Elogio
//            else if ("Elogios".toUpperCase().equalsIgnoreCase(message.getContent())) {
//
//                final MessageChannel channel = message.getChannel().block();
//                channel.createMessage("```diff\n"
//                        + "• SEMPRE QUIS TER FILHOS ASSIM!!```").block();
//            }
//            // Maquinas ativas
//            else if ("Maquinas".toUpperCase().equalsIgnoreCase(message.getContent())) {
//                final MessageChannel channel = message.getChannel().block();
//                channel.createMessage("```\n"
//                        + "• MÁQUINAS ATIVAS: \n" + 
//                        maquinasAtivas.toString() + "```").block();
//            }
//            // ajuda
//            else if ("Ajuda".toUpperCase().equalsIgnoreCase(message.getContent())) {
//                final MessageChannel channel = message.getChannel().block();
//                channel.createMessage("```\n"
//                        + "COMANDOS ACEITOS: \n"
//                        + "• 'Relatorio' - Retornará um relatório com os últimos dados de CPU, memória e disco.\n"
//                        + "• 'Componentes' - Retornará uma lista dos componentes que estão sendo monitorados.\n"
//                        + "• 'Maquinas' - Retornará a quantidade de máquinas sendo monitoradas.\n"
//                        + "• 'Ajuda' - Retornará uma lista com os comandos aceitos.\n"
//                        + "• 'Elogios' - A nossa supervisora elogiará o grupo.\n```").block();
//            }
//        });
//
//        gateway.onDisconnect().block();
//    }
//
//    // Recebe o id do componente, gerado pelo for (linha 31), passa dentro do 
//    // select no lugar da fk do componente para poder pegar o componente e seu 
//    // respectivo valor
//    public static String criarRelatorio(String idComponente) {
//        String descricao = null;
//        String valor = null;
//
//        try (Connection connection = DriverManager.getConnection(config.connectionUrl);
//                Statement statement = connection.createStatement();) {
//
//            // Faz uma busca na tabela pegando o valor e descrição do primeiro 
//            // registro inserido de cada componente, porém, é ordenado pelo ID 
//            // em ordem decrescente, portanto, pegará o último valor e descrição
//            // inseridos para cada componente
//            String selectSql = String.format("SELECT TOP 1 VALOR, DESCRICAO FROM Registro"
//                    + " WHERE fkComponentes = '%s' ORDER BY idRegistro DESC",
//                    idComponente);
//
//            ResultSet resultSet = statement.executeQuery(selectSql);
//
//            // Pega o valor contido na coluna "VALOR" e "DESCRICAO" e armazena 
//            // em uma variável
//            while (resultSet.next()) {
//                valor = resultSet.getString("VALOR");
//                descricao = resultSet.getString("DESCRICAO");
//            }
//
//        } catch (SQLException e) {
//            e.printStackTrace();
//        }
//
//        // Retorna os dados concatenados
//        return "\n" + descricao + " - " + valor + "%\n";
//    }
//    
//    public static Integer contagemMaquinas() {
//
//        Integer qtdMaquina = 0;
//
//        try (Connection connection = DriverManager.getConnection(config.connectionUrl);
//                Statement statement = connection.createStatement();) {
//
//            // Cria e depois executa uma query feita por colunas, 
//            // mas * funciona da mesma forma e poupa tempo.
//            String selectSql = "SELECT COUNT(idMaquina) FROM Maquina";
//
//            ResultSet resultSet = statement.executeQuery(selectSql);
//
//            while (resultSet.next()) {
//                qtdMaquina = resultSet.getInt(1);
//            }
//
//        } catch (SQLException e) {
//            e.printStackTrace();
//        }
//
//        return qtdMaquina;
//    }
//    
//    public static String exibirComponentes(Integer i) {
//        String descricao = null;
//        
//        try (Connection connection = DriverManager.getConnection(config.connectionUrl);
//                Statement statement = connection.createStatement();) {
//
//            // Cria e depois executa uma query feita por colunas, 
//            // mas * funciona da mesma forma e poupa tempo.
//            String selectSql = String.format("SELECT descricao FROM Componentes "
//                    + "WHERE idComponentes = %d", i);
//
//            ResultSet resultSet = statement.executeQuery(selectSql);
//
//            while (resultSet.next()) {
//                descricao = resultSet.getString("descricao");
//            }
//
//        } catch (SQLException e) {
//            e.printStackTrace();
//        }
//
//        return "\n" + descricao + "\n";
//    }
//
//}
