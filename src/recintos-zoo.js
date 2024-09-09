import { Zoologico } from './classes/zoo.js';
import { AnimaisZoo } from './classes/animais-zoo.js';

class RecintosZoo{
    constructor() {
      this.zoologico = new Zoologico();
      this.animaisPossiveis = {
        'LEAO': new AnimaisZoo('LEAO', 3, ['savana'], true),
        'LEOPARDO': new AnimaisZoo('LEOPARDO', 2, ['savana'], true),
        'CROCODILO': new AnimaisZoo('CROCODILO', 3, ['rio'], true),
        'MACACO': new AnimaisZoo('MACACO', 1, ['savana', 'floresta'], false),
        'GAZELA': new AnimaisZoo('GAZELA', 2, ['savana'], false),
        'HIPOPOTAMO': new AnimaisZoo('HIPOPOTAMO', 4, ['savana', 'rio'], false),
      };
    }
  
    // Analisa os recintos viáveis para o tipo e quantidade de animal
    analisaRecintos(tipoAnimal, quantidade) {
      const animal = this.animaisPossiveis[tipoAnimal];
      
      // Validação
      if (!animal) {
        return { erro: 'Animal inválido' };
      }
      if (quantidade <= 0 || !Number.isInteger(quantidade)) {
        return { erro: 'Quantidade inválida' };
      }
  
      const recintosViaveis = this.zoologico.encontrarRecintosViaveis(animal, quantidade);
  
      // Retorna o resultado
      return Array.isArray(recintosViaveis)
        ? { recintosViaveis }
        : { erro: recintosViaveis };
    }
  }
export { RecintosZoo as RecintosZoo };