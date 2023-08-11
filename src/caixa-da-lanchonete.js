class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {

        let valorTotalEmCentavos = 0;
        let itensAdicionados = {};

        const cardapio = [
            { codigo: "cafe", valor: 300 },
            { codigo: "chantily", valor: 150 },
            { codigo: "suco", valor: 620 },
            { codigo: "sanduiche", valor: 650 },
            { codigo: "queijo", valor: 200 },
            { codigo: "salgado", valor: 725 },
            { codigo: "combo1", valor: 950 },
            { codigo: "combo2", valor: 750 }
        ];

        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!'
        }

        for (const item of itens) {
            var [codigo, unidades] = item.split(',');
            var quantidadeDoItem = parseInt(unidades);

            if (quantidadeDoItem === 0) {
                return "Quantidade inválida!";
            };

            var produto = cardapio.find(i => i.codigo === codigo);

            if (!produto) {
                return "Item inválido!";
            };

            if (codigo === 'chantily' && !itensAdicionados['cafe']) {
                return "Item extra não pode ser pedido sem o principal";
            };

            if (codigo === 'queijo' && !itensAdicionados['sanduiche']) {
                return "Item extra não pode ser pedido sem o principal";
            };

            var valorEmCentavos = produto.valor;
            valorTotalEmCentavos += valorEmCentavos * quantidadeDoItem;
            itensAdicionados[codigo] = true;

        }

        if (metodoDePagamento === "credito") {
            valorTotalEmCentavos += valorTotalEmCentavos * 0.03;
        } else if (metodoDePagamento === "dinheiro") {
            valorTotalEmCentavos -= valorTotalEmCentavos * 0.05;
        } else if (metodoDePagamento !== "debito") {
            return "Forma de pagamento inválida!";
        }

        let valorEmReais = valorTotalEmCentavos / 100;
        let total = valorEmReais.toFixed(2);
        let totalFormatado = total.replace('.', ',');

        console.log(`R$ ${totalFormatado}`);
        return `R$ ${totalFormatado}`;
    }
}


export { CaixaDaLanchonete };
