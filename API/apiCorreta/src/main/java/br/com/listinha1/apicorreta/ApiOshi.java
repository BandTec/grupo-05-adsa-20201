package br.com.listinha1.apicorreta;

import java.util.Arrays;
import java.util.List;
import oshi.SystemInfo;
import oshi.hardware.CentralProcessor;
import oshi.hardware.GlobalMemory;
import oshi.hardware.HWDiskStore;
import oshi.hardware.HardwareAbstractionLayer;
import oshi.software.os.OSProcess;
import oshi.software.os.OperatingSystem;
import oshi.software.os.OperatingSystem.ProcessSort;

public class ApiOshi {

    public static void main(String[] args) {

        SystemInfo si = new SystemInfo(); // Instanciando objeto SystemInfo

        HardwareAbstractionLayer hal = si.getHardware(); //Criando o objeto hal para adquirir mais facilmente os dados do hardware

        mostrarSistemaOperacional(si.getOperatingSystem(), hal.getMemory()); // Passando os dados de hardware e SO
        mostrarCpu(hal.getProcessor()); // Passando os dados do processador
        mostrarMemoria(hal.getMemory()); // Passando os dados da(s) memória(s)
        mostrarDisco(hal.getDiskStores()); // Passando os dados do(s) disco(s)
        mostrarProcessos(si.getOperatingSystem(), hal.getMemory()); // Passando os dados de SO e memória(s)

    }

    public static void mostrarSistemaOperacional(OperatingSystem os, GlobalMemory memory) { // Este método exibe os dados do Sistema Operacional
        System.out.println("-----------------");
        System.out.println(String.format("\nSISTEMA OPERACIONAL:\n %S\n", os)); // Tipo de sistema operacional
        System.out.println("-----------------\n"); // Espaçamento
    }

    public static void mostrarCpu(CentralProcessor processor) { // Este método exibe os dados da CPU
        System.out.println(String.format("PROCESSADOR:\n %S\n", processor)); // Dados gerais
        System.out.println("Frequência atual por processador: " +  
                Arrays.toString(processor.getCurrentFreq()) + "GHz\n"); // Frequência recente de cada processador
        System.out.println("Frequência máxima: " + processor.getMaxFreq() + "GHz\n"); // Frequência máxima
        System.out.println("-----------------\n"); // Espaçamento
    }

    public static void mostrarMemoria(GlobalMemory memoria) { // Este método exibe os dados da(s) memória(s)
        System.out.println(String.format("MEMÓRIA:\n %S\n", memoria)); // Dados da(s) memória(s)
        System.out.println("Memórias físicas: " + memoria.getPhysicalMemory() + "\n"); // Dados da(s) memória(s) física(S)
        System.out.println("Memórias virtuais: " + memoria.getVirtualMemory() + "\n"); // Dados da(s) memória(s) virutal(S)
        System.out.println("-----------------\n"); // Espaçamento
    }

    public static void mostrarDisco(List<HWDiskStore> disco) { // Este método exibe os dados do(s) disco(s)
        System.out.println(String.format("DISCOS:\n %S\n", disco)); // Dados gerais do(s) disco(s)
        System.out.println("-----------------\n"); // Espaçamento
    }

    public static void mostrarProcessos(OperatingSystem os, GlobalMemory memoria) { // Este método exibe os 5 processos que estão utilizando mais CPU
        List<OSProcess> procs = os.getProcesses(5, ProcessSort.CPU); 
        System.out.println(String.format("PROCESSOS:\n %S\n", procs)); // 5 processos que estão utilizando mais CPU
        System.out.println("-----------------\n"); // Espaçamento
    }

}
