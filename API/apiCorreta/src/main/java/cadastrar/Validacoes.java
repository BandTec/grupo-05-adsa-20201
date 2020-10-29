package cadastrar;

import javax.swing.JOptionPane;


public class Validacoes {
    
    Cadastrar telaCadastro = new Cadastrar();
    
    public void validarCampos() {
        if(telaCadastro.lblNome.getText().equals("") || telaCadastro.lblSobrenome.getText().equals("")
            || lblDataNasc.getText().equals("") || telaCadastro.lblEmail.getText().equals("")
            || telaCadastro.lblConfiEmail.getText().equals("") || telaCadastro.lblSenha.getText().equals(" ")){
            JOptionPane.showMessageDialog(null, "Preencha todos os campos");
        }
    }
    
}
