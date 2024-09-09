class RecintosPossiveis {
  constructor(numero, biomas, tamanhoTotal) {
    this.numero = numero;
    this.biomas = biomas;
    this.tamanhoTotal = tamanhoTotal;
    this.animais = [];
  }

  // Adiciona animais ao recinto
  adicionarAnimais(animal, quantidade) {
    this.animais.push({ animal, quantidade });
  }

  // Calcula o espaço ocupado no recinto pelos animais presentes
  calcularEspacoOcupado() {
    let espacoOcupado = 0;
    const especies = new Set();

    this.animais.forEach(({ animal, quantidade }) => {
      espacoOcupado += animal.tamanho * quantidade;
      especies.add(animal.nome);
    });

    if (especies.size > 1) {
      espacoOcupado += 1;
    }

    return espacoOcupado;
  }

  // Calcula o espaço livre no recinto
  calcularEspacoLivre() {
    return this.tamanhoTotal - this.calcularEspacoOcupado();
  }

  // Verifica se o recinto é adequado para um novo animal
  podeAcomodar(animal, quantidade) {
    const espacoLivre = this.calcularEspacoLivre();
    const espacoNecessario = quantidade * animal.tamanho;

    // Verifica se já existe um animal carnívoro no recinto
    const existeCarnivoro = this.animais.some(({ animal }) => animal.carnivoro);

    //Verifica se o animal é um Macaco não permite ficar sozinho em um bioma
    if (animal.nome === 'MACACO' && this.animais.length === 0 && quantidade === 1) {
      return false;
    }

    //Verifica se o animal é um Hipopotamo não permite estar em um recinto com outro animal que não seja recinto de savana e rio
    if (animal.nome === 'HIPOPOTAMO' && this.animais.length > 0) {
        const biomasNecessarios = ['savana', 'rio'];
        const temBiomasNecessarios = biomasNecessarios.every(bioma => this.biomas.includes(bioma));

        if (!temBiomasNecessarios) {
          return false;
        }
    }

    // Se já existe um carnívoro e o novo animal não é o mesmo tipo, não pode acomodar
    if (existeCarnivoro  && !animal.carnivoro) {
      return false;
    }

    // Se o novo animal é carnívoro e já existem outros animais no recinto, verifica se são da mesma espécie
    if (animal.carnivoro && this.animais.length > 0) {
      const mesmaEspecie = this.animais.some(({ animal: a }) => a.nome === animal.nome);
      if (!mesmaEspecie) {
        return false;
      }
    }

    // Verifica se o novo animal é de uma espécie diferente e se há espaço suficiente
    const especies = new Set(this.animais.map(({ animal }) => animal.nome));
    if (especies.size > 0 && !especies.has(animal.nome)) {
      const espacoAdicional = 1; // Espaço adicional necessário para diferentes espécies
      if (espacoLivre < espacoNecessario + espacoAdicional) {
        return false;
      }
    } else if (espacoLivre < espacoNecessario) {
      return false;
    }

    // Verifica se o animal pode viver em pelo menos um dos biomas do recinto
    const podeViverEmAlgumBioma = this.biomas.some(bioma => animal.podeViverNoBioma(bioma));

    return podeViverEmAlgumBioma && espacoLivre >= espacoNecessario;   
  }

  // Exibe uma string com o espaço livre e total
  descricaoEspaco() {
    const espacoLivre = this.calcularEspacoLivre();
    return `Recinto ${this.numero} (espaço livre: ${espacoLivre} total: ${this.tamanhoTotal})`;
  }
}

export { RecintosPossiveis as RecintosPossiveis };