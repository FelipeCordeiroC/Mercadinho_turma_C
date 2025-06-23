 
function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  if (user === 'cliente' && pass === '1234') {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('main-screen').style.display = 'block';
    carregarProdutos();
    carregarCarrinho();
  } else {
    alert('Usuário ou senha incorretos!');
  }
}


async function carregarProdutos() {
  const resposta = await fetch('https://fakestoreapi.com/products');
  const produtos = await resposta.json();

  const catalogo = document.getElementById('catalogo');
  catalogo.innerHTML = '';

  produtos.forEach(produto => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${produto.image}" alt="${produto.title}">
      <h4>${produto.title}</h4>
      <p>R$ ${produto.price.toFixed(2)}</p>
      <button onclick='adicionarAoCarrinho(${JSON.stringify(produto)})'>Adicionar</button>
    `;
    catalogo.appendChild(card);
  });
}


function adicionarAoCarrinho(produto) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.push(produto);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  carregarCarrinho();
}


function carregarCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const carrinhoDiv = document.getElementById('carrinho');
  carrinhoDiv.innerHTML = '';
  let total = 0;

  carrinho.forEach((item, index) => {
    const div = document.createElement('div');
    div.innerHTML = `
      ${item.title} - R$ ${item.price.toFixed(2)}
      <button onclick="removerDoCarrinho(${index})">Remover</button>
    `;
    carrinhoDiv.appendChild(div);
    total += item.price;
  });

  document.getElementById('total').innerText = total.toFixed(2);
}


function removerDoCarrinho(index) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.splice(index, 1);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  carregarCarrinho();
}


function finalizarCompra() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }

  const nome = prompt('Digite seu nome:');
  const endereco = prompt('Digite seu endereço:');
  const pagamento = prompt('Método de pagamento (PIX, Cartão, Boleto):');

  alert(`Compra finalizada!\n\nCliente: ${nome}\nEndereço: ${endereco}\nPagamento: ${pagamento}`);
  localStorage.removeItem('carrinho');
  carregarCarrinho();
}
