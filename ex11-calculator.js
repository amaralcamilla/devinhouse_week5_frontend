//Leia em ordem os 16 passos para tornar a calculadora responsiva:

class Calculadora {
    //1. Não há necessidade de constructor. Colocaremos get porque será uma propriedade (e não um método). Desta forma sempre retornará o valor atualizado. 
    get #tela(){ //4. Colocamos como privado porque só a própria classe mexerá na tela.
        return document.querySelector('#result')
    }

    preencherTela(valor){ //5. Para pegar o valor dos botões e concatenar texto recebido para jogar na tela de resultado (valor). Lembrando que #tela é um input. Como são botões, teremos que capturar o valor de cada botão como uma String, para poder concatenar os números. Esta função será executada em todos os botões e, para isto, precisamos pegar o valor do botão que está sendo clicado e jogar aqui --> criar variável let botoes (lá embaixo).
        if(valor == '='){ //9. Quando apertar '=', a execução é diferente dos números. Ele vai executar calcular.
            this.calcular()
            return
        }
        this.#tela.value += valor //5. 
    }
    resetar() { //5. Para o botão 'C' limpar a tela.
        this.#tela.value = '' //12. Para limpar a tela.
    } 

    //5. somar() {}; subtrair() {}; multiplicar() {}; dividir() {} --> Estes métodos foram retirados porque a calculadora pode receber mais do que dois números para fazer as operações. Em vez disso, usaremos o método geral 'calcular()'.
    calcular() {
        try { //15. Coloca o que será executado.
            let resultado = eval(this.#tela.value) //10. Este comando calculará qualquer tipo de operação dentro destes parênteses. Neste caso, executará o que estiver na tela, ou seja, os botões que foram clicados para fazer a operação.
            this.resetar() //13. Chamar o método aqui para limpar a tela antes de executar a próxima operação.
            this.preencherTela(resultado) //11. Chamar o preencherTela dentro dele mesmo. Mas para evitar que uma operação concatene com as próximas operações, é necessário limpar a tela --> ajustar método resetar(). 
        } catch (error) { //16. Try é tentativa. Catch pegará um possível erro que acontecerá. A função 'eval' pode dar em erro, decorrente de alguma exceção. Se ao executar o que está dentro de try ocorrer algum erro, já colocamos o catch para saber o que fazer em decorrência destes casos. É possível colocar um alert, ou error.message, ou encaminhar para outra página. Mas neste exemplo queremos que apenas a tela de resultado fique limpa. Onde está escrito 'error' pode ser qualquer nome.
            this.resetar()
            this.preencherTela('Valor inválido')

            setTimeout(() => //17. Declaração de função anônima, vai executar o que está logo abaixo.
            this.resetar()
            , 3000);
        }
    }
}
//2. Instanciar objeto
let calculadora = new Calculadora()
//3. calculadora.tela    --> Quando digitar isto, retornará o que está lá em cima --> 'return document.querySelector('#result')'. Como é uma propriedade (e não um método), não colocamos () ao lado. Este comando só funcionaria se o get tela não fosse privado.

let botoes = document.querySelectorAll('input[type=button]') //6. Para pegar apenas os inputs que são button (não pegará o input da tela/resultado, porque é input do tipo texto).
for (let botao of botoes) {
    botao.addEventListener('click', function(evento){  //7. Não é possível chamar a função direto pelo nome, tem que instanciar o objeto que foi instanciado ali em cima 'let calculadora = new Calculadora()'.
        let elemento = evento.target 
        calculadora.preencherTela(elemento.value) //8. Para pegar o valor dentro destes parênteses, é necessário ter um evento 'function(evento){'. Todos os inputs têm value.
    })
}
document.querySelector('#clear').addEventListener('click', function() {
    calculadora.resetar() //14. Não é possível chamar o nome da função direto. Se isto acontecesse, perderíamos o 'this.resetar()' e o 'this.preencherTela(resultado)'.
})