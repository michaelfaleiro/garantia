let listaProduto = [];
let id = 1;
const objProduto = {
  id: "",
  sku: "",
  produto: "",
  quantidade: 0,
  defeito: "",
};

const formulario = document.querySelector("#formGarantia");
const skuInput = document.querySelector("#sku");
const produtoInput = document.querySelector("#produtoName");
const quantidadeInput = document.querySelector("#quantidade");
const defeitoInput = document.querySelector("#defeito");

let editItemList = false;

function validarForm() {
  if (skuInput.value === "" || produtoInput.value === "") {
    alert("Todos os campos precisam ser informados");
    return;
  }
  if (editItemList) {
    editItemList = false;
  } else {
    objProduto.id = id++;
    objProduto.sku = skuInput.value;
    objProduto.produto = produtoInput.value;
    objProduto.quantidade = quantidadeInput.value;
    objProduto.defeito = defeitoInput.value;

    adicionarItem();
  }
}
function adicionarItem() {
  listaProduto.push({ ...objProduto });
  carregarTable();
  formulario.reset();
  limparHtml();
}

function limparHtml() {
  objProduto.sku = "";
  objProduto.produto = "";
  objProduto.defeito = "";
}
function carregarTable() {
  let tableData = "";
  listaProduto.map((produtoItem) => {
    tableData += `<tr>
        <td>${produtoItem.id}</td>
        <td>${produtoItem.sku}</td>
        <td>${produtoItem.produto}</td>
        <td>${produtoItem.quantidade}</td>
        <td>
        <i onclick="editItem(${produtoItem.id})" class="fa-solid fa-file-pen icon"></i>
        <i onclick="deleteItem(${produtoItem.id})" class="fa-sharp fa-solid fa-trash icon"></i>
        </td>
        `;
  });
  document.getElementById("tbody").innerHTML = tableData;
}

function deleteItem(id) {
  listaProduto = listaProduto.filter((produto) => produto.id !== id);
  limparHtml();
  carregarTable();
}

const editItem = () => {
  alert("Edit");
};
