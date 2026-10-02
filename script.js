let produtos = [];

async function carregarProdutos() {

    const resposta = await fetch("produtos.json");

    produtos = await resposta.json();

    mostrarProdutos();

}

function mostrarProdutos() {

    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    let pesquisa =
    document.getElementById("pesquisa").value.toLowerCase();

    let descontoMinimo =
    Number(document.getElementById("desconto").value);

    let amazon =
    document.getElementById("amazon").checked;

    let mercadolivre =
    document.getElementById("mercadolivre").checked;

    let shopee =
    document.getElementById("shopee").checked;

    let eletrodomestico =
    document.getElementById("eletrodomestico").checked;

    let cozinha =
    document.getElementById("cozinha").checked;

    let organizacao =
    document.getElementById("organizacao").checked;

    let produtosFiltrados = [];

    for (let produto of produtos) {

        if (produto.desconto < descontoMinimo) {
            continue;
        }

        if (!produto.nome.toLowerCase().includes(pesquisa)) {
            continue;
        }

        if (produto.loja == "Amazon" && !amazon) {
            continue;
        }

        if (produto.loja == "Mercado Livre" && !mercadolivre) {
            continue;
        }

        if (produto.loja == "Shopee" && !shopee) {
            continue;
        }

        if (produto.categoria == "Eletrodoméstico" && !eletrodomestico) {
            continue;
        }

        if (produto.categoria == "Cozinha" && !cozinha) {
            continue;
        }

        if (produto.categoria == "Organização" && !organizacao) {
            continue;
        }

        produtosFiltrados.push(produto);

    }

    let tipo =
    document.getElementById("ordenacao").value;

    if (tipo == "desconto") {

        produtosFiltrados.sort((a, b) => b.desconto - a.desconto);

    }

    if (tipo == "preco") {

        produtosFiltrados.sort((a, b) => a.preco - b.preco);

    }

    if (tipo == "nome") {

        produtosFiltrados.sort((a, b) => a.nome.localeCompare(b.nome));

    }

    document.getElementById("contador").innerHTML =
        "Produtos encontrados: " + produtosFiltrados.length;

    for (let produto of produtosFiltrados) {

        lista.innerHTML += `
        <div class="card">

            <img src="${produto.imagem}" alt="${produto.nome}">

            <h3>${produto.nome}</h3>

            <p><strong>Preço:</strong> R$ ${produto.preco.toFixed(2)}</p>

            <p><strong>Desconto:</strong> ${produto.desconto}% OFF</p>

            <p><strong>Categoria:</strong> ${produto.categoria}</p>

            <p><strong>Loja:</strong> ${produto.loja}</p>

            <button onclick="window.open('${produto.link}')">
                Abrir Produto
            </button>

            <button onclick="copiarTexto('${produto.nome}','${produto.preco}','${produto.desconto}','${produto.loja}')">
                Copiar Texto
            </button>

        </div>
        `;

    }

}

function copiarTexto(nome, preco, desconto, loja) {

    let texto =
`${nome}
Preço: R$ ${preco}
${desconto}% OFF
Loja: ${loja}`;

    navigator.clipboard.writeText(texto);

    alert("Texto copiado!");

}

document.getElementById("buscar").onclick = mostrarProdutos;

carregarProdutos();