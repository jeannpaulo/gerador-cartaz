function imprimir() {
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
            background-image: url("fundo.png");
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
            top: 55%;
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
            top: 73%;
            right: 12%;
            width: 70%;
            text-align: right;
            font-size: 4vw;
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

function trocarModelo(){

let modelo = document.getElementById("modelo").value;
let cartaz = document.querySelector(".cartaz");

if(modelo === "0"){
    cartaz.style.backgroundImage = "url('fundo.png')";
}

if(modelo === "1"){
    cartaz.style.backgroundImage = "url('hortifruti.png')";
}

if(modelo === "2"){
    cartaz.style.backgroundImage = "url('acougue1.png')";
}

}

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const selectModelo = document.getElementById('modelo');

function mostrarSlide(index) {
    // Valida os limites do index
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    // Remove classe active de todos e adiciona no atual
    slides.forEach(slide => slide.classList.remove('active'));
    slides[currentSlide].classList.add('active');

    // Sincroniza o Select (o valor do select deve ser o index 0, 1, 2...)
    selectModelo.value = currentSlide;
    
    // Chama sua função original de troca de lógica (se houver)
    // trocarModelo(); 
}

// Chamada pelas setas
function mudarSlide(direcao) {
    mostrarSlide(currentSlide + direcao);
}

// Chamada pelo Select
function sincronizarSlider() {
    const paimelValue = parseInt(selectModelo.value);
    mostrarSlide(paimelValue);
}