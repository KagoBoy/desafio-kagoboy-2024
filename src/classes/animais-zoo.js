class AnimaisZoo {

  constructor(nome, tamanho, biomas, carnivoro) {
    this.nome = nome;
    this.tamanho = tamanho;
    this.biomas = biomas;
    this.carnivoro = carnivoro;
  }
  
  // Verifica se o animal pode viver em um bioma específico
  podeViverNoBioma(bioma) {
    return this.biomas.includes(bioma);
  } 
}
export { AnimaisZoo as AnimaisZoo };  