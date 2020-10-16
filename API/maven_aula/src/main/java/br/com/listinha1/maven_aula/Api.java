package br.com.listinha1.maven_aula;

import java.lang.management.MemoryUsage;
import static java.nio.file.Files.list;
import static java.rmi.Naming.list;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import static java.util.Collections.list;
import java.util.List;
import oshi.SystemInfo;
import oshi.driver.linux.proc.DiskStats;

import oshi.hardware.CentralProcessor;
import oshi.hardware.CentralProcessor.TickType;
import oshi.hardware.ComputerSystem;
import oshi.hardware.Display;
import oshi.hardware.GlobalMemory;
import oshi.hardware.GraphicsCard;
import oshi.hardware.HWDiskStore;
import oshi.hardware.HWPartition;
import oshi.hardware.HardwareAbstractionLayer;
import oshi.hardware.NetworkIF;
import oshi.hardware.PhysicalMemory;
import oshi.hardware.PowerSource;
import oshi.hardware.Sensors;
import oshi.hardware.SoundCard;
import oshi.hardware.UsbDevice;
import oshi.hardware.VirtualMemory;
import oshi.software.os.FileSystem;
import oshi.software.os.InternetProtocolStats;
import oshi.software.os.NetworkParams;
import oshi.software.os.OSFileStore;
import oshi.software.os.OSProcess;
import oshi.software.os.OSService;
import oshi.software.os.OSSession;
import oshi.software.os.OperatingSystem;
import oshi.software.os.OperatingSystem.ProcessSort;
import oshi.util.FormatUtil;
import oshi.util.Util;
import oshi.hardware.UsbDevice;

public class Api {

    public static void main(String[] args) {

        SystemInfo infoS = new SystemInfo();

        HardwareAbstractionLayer hal = infoS.getHardware();

        // Pegando o sistema operacional
        OperatingSystem os = infoS.getOperatingSystem();
        String sistemaOperacional = os.toString();

        // Pegando o processador
        CentralProcessor cpu = hal.getProcessor();
        String cpuString = cpu.toString();

        // Pegando o uso da memória
        GlobalMemory memoria = hal.getMemory();
        String usoMemorias = memoria.toString();

        // Pegando o uso do discos
        List<HWDiskStore> disco = hal.getDiskStores();
        String usoDisco = disco.toString();

        // Pegando o monitor
        List<Display> display = hal.getDisplays();
        String tipoMonitor = display.toString();

        // Pegando o processo que mais "pesado"
        OSProcess processos = os.getProcess(os.getProcessId());
        String primeiroProcesso = processos.toString();

        // Pegando os dispositivos USB
        List<UsbDevice> usbs = hal.getUsbDevices(true);
        String listaUsbs = usbs.toString();
        
        
        

        System.out.println(String.format("-- \nSistema operacional:\n %s\n--",
                sistemaOperacional));
        System.out.println(String.format("-- \nCPU:\n %s\n--", cpuString));
        System.out.println(String.format("-- \nUso do disco:\n %s\n--", 
                usoDisco));
        System.out.println(String.format("-- \nUso de memória:\n %s\n--", 
                usoMemorias));
        System.out.println(String.format("-- \nMonitor:\n %s\n--", 
                tipoMonitor));
        System.out.println(String.format("-- \nProcesso primário:\n %s\n--", 
                primeiroProcesso));
        System.out.println(String.format("-- \nLista de dispositivos USB:\n %s\n--", 
                listaUsbs));
    }
}
