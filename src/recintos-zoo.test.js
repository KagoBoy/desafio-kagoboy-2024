import { RecintosZoo } from "./recintos-zoo.js";

describe('Recintos do Zoologico', () => {

    test('Deve rejeitar animal inválido', () => {
            const resultado = new RecintosZoo().analisaRecintos('UNICORNIO', 1);
            expect(resultado.erro).toBe("Animal inválido");
            expect(resultado.recintosViaveis).toBeFalsy();
        });

    test('Deve rejeitar quantidade inválida', () => {
            const resultado = new RecintosZoo().analisaRecintos('MACACO', 0);
            expect(resultado.erro).toBe("Quantidade inválida");
            expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Não deve encontrar recintos para 10 macacos', () => {
            const resultado = new RecintosZoo().analisaRecintos('MACACO', 10);
            expect(resultado.erro).toBe("Não há recinto viável");
            expect(resultado.recintosViaveis).toBeFalsy();
        });

    test('Deve encontrar recinto para 1 crocodilo', () => {
        const resultado = new RecintosZoo().analisaRecintos('CROCODILO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 4 (espaço livre: 5 total: 8)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    test('Deve encontrar recintos para 2 macacos', () => {

        const resultado = new RecintosZoo().analisaRecintos('MACACO', 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 5 total: 10)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 2 (espaço livre: 3 total: 5)');
        expect(resultado.recintosViaveis[2]).toBe('Recinto 3 (espaço livre: 2 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(3);
    });

    //Testando a Regra 5: Um macaco não se sente confortável sem outro animal no recinto, seja da mesma ou outra espécie
    test('Deve encontrar recintos para 1 macaco', () => {

    const resultado = new RecintosZoo().analisaRecintos('MACACO', 1);
    expect(resultado.erro).toBeFalsy();
    expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 6 total: 10)');
    expect(resultado.recintosViaveis[1]).toBe('Recinto 3 (espaço livre: 3 total: 7)');
    expect(resultado.recintosViaveis.length).toBe(2);
    });

    //Testando a Regra 4: Hipopótamo(s) só tolera(m) outras espécies estando num recinto com savana e rio
    test('Deve encontrar recintos para 1 hipopotamo', () => {

    const resultado = new RecintosZoo().analisaRecintos('HIPOPOTAMO', 1);
    expect(resultado.erro).toBeFalsy();
    expect(resultado.recintosViaveis[0]).toBe('Recinto 3 (espaço livre: 0 total: 7)');
    expect(resultado.recintosViaveis[1]).toBe('Recinto 4 (espaço livre: 4 total: 8)');
    expect(resultado.recintosViaveis.length).toBe(2);
    });

    //Testando a regra 2: Animais carnívoros devem habitar somente com a própria espécie
    test('Deve encontrar recinto para 2 leões', () => {

        const resultado = new RecintosZoo().analisaRecintos('LEAO', 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 5 (espaço livre: 0 total: 9)');
        expect(resultado.recintosViaveis.length).toBe(1);
        });


        //Testando a regra 1 e 3: Um animal se sente confortável se está num bioma adequado e com espaço suficiente para cada indivíduo
        //Animais já presentes no recinto devem continuar confortáveis com a inclusão do(s) novo(s)
        test('Deve encontrar recintos para 5 macacos', () => {

            const resultado = new RecintosZoo().analisaRecintos('MACACO', 5);
            expect(resultado.erro).toBeFalsy();
            expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 2 total: 10)');
            expect(resultado.recintosViaveis[1]).toBe('Recinto 2 (espaço livre: 0 total: 5)');
            expect(resultado.recintosViaveis.length).toBe(2);
            });

});

