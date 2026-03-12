function imprimir(){

let tamanho = document.getElementById("tamanho").value

let largura = "210mm"
let altura = "297mm"

if(tamanho == "A3"){
largura = "297mm"
altura = "420mm"
}

if(tamanho == "A5"){
largura = "148mm"
altura = "210mm"
}

let produto = document.getElementById("produto").value
let descricao = document.getElementById("descricao").value
let preco = document.getElementById("preco").value
let unidade = document.getElementById("unidade").value

if(!preco){
alert("Digite o preço")
return
}

preco = preco.replace(",", ".")
preco = parseFloat(preco).toFixed(2).replace(".", ",")

let janela = window.open("", "", "width=900,height=1200")

janela.document.write(`
<html>

<head>

<title>Cartaz</title>

<style>

body{
margin:0;
}

.cartaz{
width:${largura};
height:${altura};
background-image:url("fundo.png");
background-size:100% 100%;
background-repeat:no-repeat;
position:relative;
font-family:Arial;
}

/* PRODUTO */

.produto{
position:absolute;
top:34%;
width:100%;
text-align:center;
font-size:13vw;
font-weight:bold;
white-space:pre-line;
text-transform:uppercase;
}

/* DESCRIÇÃO */

.descricao{
position:absolute;
top:50%;
right:12%;
width:70%;
text-align:right;
font-size:5vw;
}

/* PREÇO */

.preco{
position:absolute;
top:55%;
width:100%;
text-align:center;
font-size:22vw;
font-weight:bold;
color:red;
}

/* UNIDADE */

.unidade{
position:absolute;
top:73%;
right:12%;
width:70%;
text-align:right;
font-size:4vw;
}

@page{
size:${tamanho};
margin:0;
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

window.onload = function(){
window.print();
window.close();
}

<\/script>

</body>

</html>
`)

janela.document.close()

}