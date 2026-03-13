function imprimirAcg(){

    let tamanho = document.getElementById("tamanho").value
    let largura = "210mm"
    let altura = "297mm"

    if (tamanho == "A3") {
        largura = "297mm"
        altura = "420mm"
    }

    if (tamanho == "A5") {
        largura = "148mm"
        altura = "210mm"
    }

    let produto = document.getElementById("produto").value
    let descricao = document.getElementById("descricao").value
    let preco = document.getElementById("preco").value
    let unidade = document.getElementById("unidade").value

    if (!preco) {
        alert("Digite o preço")
        return
    }

    // LÓGICA DE AJUSTE DE FONTE DINÂMICA
    // Se o nome do produto for muito grande, a gente diminui a fonte para não encavalar
    let fontSizeProduto = "13vw"; // Tamanho padrão
    let limiteCaracteres = produto.length;

    if (limiteCaracteres > 25) {
        fontSizeProduto = "7vw"; // Texto muito longo
    } else if (limiteCaracteres > 15) {
        fontSizeProduto = "10vw"; // Texto médio
    }

    preco = preco.replace(",", ".")
    preco = parseFloat(preco).toFixed(2).replace(".", ",")

    let janela = window.open("", "", "width=900,height=1200")

    janela.document.write(`
<html>
<head>
    <title>Cartaz</title>
    <style>
        body { margin: 0; padding: 0; }
        
        .cartaz {
            width: ${largura};
            height: ${altura};
            background-image: url("acougue1.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            position: relative;
            font-family: Arial, sans-serif;
            overflow: hidden;
        }

        /* PRODUTO - Ajustado com altura fixa e flexbox */
        .produto {
            position: absolute;
            top: 32%;
            left: 5%;
            width: 90%;
            height: 18%; /* Limita a área do nome para não empurrar o preço */
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-size: ${fontSizeProduto};
            font-weight: bold;
            line-height: 0.85; /* Deixa as linhas mais próximas se quebrar */
            white-space: pre-line;
            word-break: break-word;
            text-transform: uppercase;
        }

        /* DESCRIÇÃO */
        .descricao {
            position: absolute;
            top: 50%;
            right: 12%;
            width: 70%;
            text-align: right;
            font-size: 5vw;
        }

        /* PREÇO */
        .preco {
            position: absolute;
            top: 51%;
            width: 100%;
            text-align: center;
            font-size: 19vw;
            font-weight: bold;
            color: red;
            letter-spacing: -1vw;
        }

        /* UNIDADE */
        .unidade {
            position: absolute;
            top: 70%;
            right: 17%;
            width: 70%;
            text-align: right;
            color: black;
            font-weight: bold;
            font-size: 10vw;
            text-transform: uppercase;
        }

        @page {
            size: ${tamanho};
            margin: 0;
        }
    </style>
</head>
<body>
    <div class="cartaz">
        <div class="produto">${produto}</div>
        <div class="descricao">${descricao}</div>
        <div class="preco">R$ ${preco}</div>
        <div class="unidade">${unidade}</div>
    </div>
    <script>
        window.onload = function() {
            window.print();
            setTimeout(() => { window.close(); }, 500);
        }
    <\/script>
</body>
</html>
    `)

    janela.document.close()
}