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
    

//    public static void main(String[] args) {
    
            private String erroCpu = "ERRO: Não foi possivel inserir os dados de CPU.";
            private String erroMemoria = "ERRO: Não foi possivel inserir os dados de Memória.";
            private String erroDisco = "ERRO: Não foi possivel inserir os dados de Disco.";
           
            private Boolean cpu = false;
            private Boolean memoria = false;
            private Boolean disco = false;

    public void setCpu(Boolean cpu) {
        this.cpu = cpu;
    }

    public void setMemoria(Boolean memoria) {
        this.memoria = memoria;
    }

    public void setDisco(Boolean disco) {
        this.disco = disco;
    }
            
            
    
        public static void criar(){
        try {
            
            File arquivo = new File("log.txt");
            
            if (!arquivo.exists()) {
                arquivo.createNewFile();
            }
            
            FileWriter escrita = new FileWriter(arquivo, true);
            BufferedWriter write = new BufferedWriter(escrita);
            
//            if(this.cpu.equals(true)){
//                String dataFormatada = LocalDateTime.now().format(DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM));
//                write.write(String.format("[%s] %s \r\n", dataFormatada, erroCpu));
//            } else if(this.memoria.equals(true)){
//                String dataFormatada = LocalDateTime.now().format(DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM));
//                write.write(String.format("[%s] %s \r\n", dataFormatada, erroMemoria));
//            } else if(this.disco.equals(true)){
//                String dataFormatada = LocalDateTime.now().format(DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM));
//                write.write(String.format("[%s] %s \r\n", dataFormatada, erroDisco));
//            }
            
            write.close();
            
            FileReader ler = new FileReader("log.txt");
            BufferedReader reader = new BufferedReader(ler);
            
//            String leitura;
            
//            while((leitura = reader.readLine()) != null){
//                System.out.println(leitura);
//            }
            
        } catch (Exception e) {        
        }
//    }
    }   
}
