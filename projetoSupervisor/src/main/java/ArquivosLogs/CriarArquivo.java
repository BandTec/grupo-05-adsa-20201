package ArquivosLogs;

import java.io.IOException;
import java.util.logging.Level;

public class CriarArquivo {
            
            
            public void logsWarning(){
                try {
                Log supervisorErros = new Log("log.txt");
                
                supervisorErros.logger.setLevel(Level.WARNING);
                
                supervisorErros.logger.info("info msg");
                supervisorErros.logger.warning("aviso msg");
                supervisorErros.logger.severe("severe msg");
                
            } catch (IOException | SecurityException e) {
                
            }
            }
}
            
            

     
