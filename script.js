const CHAVE = "registros";

const form = document.getElementById("form");
const lista = document.getElementById("lista");
const vazio = document.getElementById("vazio");
const botaoLimpar = document.getElementById("limpar");

// 3. Recuperar lista: getItem + JSON.parse (ou [] se estiver vazio)
function obterRegistros() {
  return JSON.parse(localStorage.getItem(CHAVE)) || [];
}

// 5. Mostrar: percorrer com for...of e desenhar no DOM
function mostrar() {
  const registros = obterRegistros();
  lista.innerHTML = "";

  for (const registro of registros) {
    const li = document.createElement("li");
    li.textContent = `${registro.nome} (${registro.idade} anos)`;
    lista.appendChild(li);
  }

  vazio.hidden = registros.length > 0;
}

// 1. Formulário: capturar valores no submit (com preventDefault)
form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  // 2. Criar objeto: juntar os valores
  const registro = {
    nome: document.getElementById("nome").value.trim(),
    idade: Number(document.getElementById("idade").value),
  };

  // 3. Recuperar lista
  const registros = obterRegistros();

  // 4. Adicionar e salvar: push() e depois JSON.stringify + setItem
  registros.push(registro);
  localStorage.setItem(CHAVE, JSON.stringify(registros));

  mostrar();
  form.reset();
  document.getElementById("nome").focus();
});

// Botão para limpar os registros
botaoLimpar.addEventListener("click", () => {
  localStorage.removeItem(CHAVE);
  mostrar();
});

// 6. Persistir: chamar a exibição ao carregar a página
mostrar();
