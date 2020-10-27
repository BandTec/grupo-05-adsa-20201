

package br.com.listinha1.apicorreta;

import java.util.Random;



public class GeradorValor {
    
    Random gerador = new Random();

    private Integer numRandom = 0;

    public void alterarValor(Integer valor) {

        this.numRandom = gerador.nextInt(valor);
    }

    
    //GETTERS
    public Random getGerador() {
        return gerador;
    }

    public Integer getNumRandom() {
        return numRandom;
    }
    
}