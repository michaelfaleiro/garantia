let id = 1;

//Validar Form
function validateForm() {
  let nfe = document.getElementById("nfe").value;
  let sku = document.getElementById("sku").value;
  let produtoName = document.getElementById("produtoName").value;
  let defeito = document.getElementById("defeito").value;

  if (nfe === "") {
    alert("Número da Nota Fiscal é obrigatório");
    return false;
  }
  if (sku === "" || produtoName === "" || defeito === "") {
    alert("O Campo Sku, Produto e Defeito são obrigatórios");
    return false;
  } else {
    return true;
  }
}

//Carregar Table
function showData() {
  let produtoList;
  if (localStorage.getItem("produtoList") == null) {
    produtoList = [];
  } else {
    produtoList = JSON.parse(localStorage.getItem("produtoList"));
  }
  let html = "";
  produtoList.forEach((produto, index) => {
    html += "<tr>";
    html += `<td> ${produto.sku} </td>`;
    html += `<td> ${produto.produtoName} </td>`;
    html += `<td> ${produto.quantidade} </td>`;
    html += `<td> ${produto.defeito} </td>`;
    html += `<td>
        <button class="btn btn-warning" type="button" onclick="updateData(${index})">Editar</button>
        <button class="btn btn-danger" type="button" onclick="deleteData(${index})">Remover</button>
        </td>`;
    html += "<td>";
    document.querySelector("#crudTable tbody").innerHTML = html;
  });
}

//Load Data when page initialized
document.onload = showData();

//Adicionar produtos na Lista
function addData() {
  if (validateForm() == true) {
    let nfe = document.getElementById("nfe").value;
    let sku = document.getElementById("sku").value;
    let produtoName = document.getElementById("produtoName").value;
    let quantidade = document.getElementById("quantidade").value;
    let defeito = document.getElementById("defeito").value;

    let produtoList;
    if (localStorage.getItem("produtoList") == null) {
      produtoList = [];
    } else {
      produtoList = JSON.parse(localStorage.getItem("produtoList"));
    }

    produtoList.push({
      id: id++,
      nfe: nfe,
      sku: sku,
      produtoName: produtoName,
      quantidade: quantidade,
      defeito: defeito,
    });

    localStorage.setItem("produtoList", JSON.stringify(produtoList));
    showData();
    clearFields();
  }
}

//Remover produto da lista
function deleteData(index) {
  let produtoList;
  if (localStorage.getItem("produtoList") == null) {
    produtoList = [];
  } else {
    produtoList = JSON.parse(localStorage.getItem("produtoList"));
  }

  produtoList.splice(index, 1);
  localStorage.setItem("produtoList", JSON.stringify(produtoList));
  showData();
}

//Atualizar Dados
function updateData(index) {
  document.querySelector("#submit").style.display = "none";
  document.querySelector("#update").style.display = "block";

  let produtoList;
  if (localStorage.getItem("produtoList") == null) {
    produtoList = [];
  } else {
    produtoList = JSON.parse(localStorage.getItem("produtoList"));
  }
  document.getElementById("nfe").value = produtoList[index].nfe;
  document.getElementById("sku").value = produtoList[index].sku;
  document.getElementById("produtoName").value = produtoList[index].produtoName;
  document.getElementById("quantidade").value = produtoList[index].quantidade;
  document.getElementById("defeito").value = produtoList[index].defeito;

  document.querySelector("#update").onclick = function () {
    if (validateForm() == true) {
      produtoList[index].nfe = document.getElementById("nfe").value;
      produtoList[index].sku = document.getElementById("sku").value;
      produtoList[index].produtoName =
        document.getElementById("produtoName").value;
      produtoList[index].quantidade =
        document.getElementById("quantidade").value;
      produtoList[index].defeito = document.getElementById("defeito").value;

      localStorage.setItem("produtoList", JSON.stringify(produtoList));
      showData();
      clearFields();

      document.querySelector("#submit").style.display = "block";
      document.querySelector("#update").style.display = "none";
    }
  };
}

const clearFields = () => {
  document.querySelector("#sku").value = "";
  document.querySelector("#produtoName").value = "";
  document.querySelector("#quantidade").value = 1;
  document.querySelector("#defeito").value = "";
};

//Enviar para o BackEnd
async function enviarDados() {
  let produtoList;
  if (localStorage.getItem("produtoList") == null) {
    produtoList = [];
  } else {
    produtoList = JSON.parse(localStorage.getItem("produtoList"));
  }

  const garantias = [{ ...produtoList }];

  const response = await fetch("http://localhost:3000/garantias", {
    method: "POST",
    headers: {
      "Content-Type": "application/jsonn",
    },
    body: JSON.stringify(garantias),
  });
  console.log(garantias);
}
