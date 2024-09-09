import { RecintosPossiveis } from './recintos-possiveis.js';
import { AnimaisZoo } from './animais-zoo.js';

class Zoologico{
    constructor() {
        this.recintos = [];
    
        // Preencher com os recintos existentes
        this.recintos.push(new RecintosPossiveis(1, ['savana'], 10));
        this.recintos.push(new RecintosPossiveis(2, ['floresta'], 5));
        this.recintos.push(new RecintosPossiveis(3, ['savana', 'rio'], 7));
        this.recintos.push(new RecintosPossiveis(4, ['rio'], 8));
        this.recintos.push(new RecintosPossiveis(5, ['savana'], 9));
    
        // Preencher animais nos recintos
        this.recintos[0].adicionarAnimais(new AnimaisZoo('MACACO', 1, ['savana', 'floresta'], false), 3);
        this.recintos[2].adicionarAnimais(new AnimaisZoo('GAZELA', 2, ['savana'], false), 1);
        this.recintos[4].adicionarAnimais(new AnimaisZoo('LEAO', 3, ['savana'], true), 1);
      }
    
      // Encontra recintos viáveis para um determinado animal e quantidade
      encontrarRecintosViaveis(animal, quantidade) {
        const recintosViaveis = [];
        this.recintos.forEach(function(recinto) {
          if (recinto.podeAcomodar(animal, quantidade)) {
            recinto.adicionarAnimais(animal, quantidade);
            recintosViaveis.push(recinto.descricaoEspaco());
          }
        });
    
        if (recintosViaveis.length > 0) {
          console.log(recintosViaveis);
          return recintosViaveis;
        } else {
          return 'Não há recinto viável';
        }
  }
}


export { Zoologico as Zoologico };