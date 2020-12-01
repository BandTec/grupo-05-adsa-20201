package ArquivosLog;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;

public class ArquivoLog {

    private Boolean cpu, memoria, disco;

    public ArquivoLog() {
        this.cpu = false;
        this.memoria = false;
        this.disco = false;
    }

    public void setCpu(Boolean cpu) {
        this.cpu = cpu;
    }

    public void setMemoria(Boolean memoria) {
        this.memoria = memoria;
    }

    public void setDisco(Boolean disco) {
        this.disco = disco;
    }

    public void criar() {
        try {

            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/yyyy|HH:mm:ss | ");
            LocalDateTime now = LocalDateTime.now();

            File arquivo = new File("LogSupervisor.txt");

            String dataFormatada = LocalDateTime.now().format(DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM));

            if (!arquivo.exists()) {
                arquivo.createNewFile();
            }

            FileWriter escrita = new FileWriter(arquivo, true);
            BufferedWriter write = new BufferedWriter(escrita);

            if (cpu) {
                write.write(String.format("[%s] ERRO: Não foi possivel inserir os dados de CPU. \r\n", dataFormatada));
            } else if (memoria) {
                write.write(String.format("[%s] ERRO: Não foi possivel inserir os dados de Memória. \r\n", dataFormatada));
            } else if (disco) {
                write.write(String.format("[%s] ERRO: Não foi possivel inserir os dados de Disco. \r\n", dataFormatada));
            }

            write.close();

            FileReader ler = new FileReader(arquivo.getName());
            BufferedReader reader = new BufferedReader(ler);

//            String leitura;
//            while((leitura = reader.readLine()) != null){
//                System.out.println(leitura);
//            }
        } catch (Exception e) {
        }
    }
}
