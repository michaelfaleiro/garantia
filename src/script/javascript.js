let selectedRow = null;

//Show Alerts
const showAlert = (message, className) => {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const main = document.querySelector(".main");
  container.before(div, main);

  setTimeout(() => document.querySelector(".alert").remove(), 3000);
};

//Clear All Fields
const clearFields = () => {
  document.querySelector("#sku").value = "";
  document.querySelector("#produtoName").value = "";
  document.querySelector("#quantidade").value = 1;
  document.querySelector("#defeito").value = "";
};

//Add Data

document.querySelector("#formGarantia").addEventListener("submit", (e) => {
  e.preventDefault();

  //Get Form Values
  const sku = document.querySelector("#sku").value;
  const produtoName = document.querySelector("#produtoName").value;
  const quantidade = document.querySelector("#quantidade").value;
  const defeito = document.querySelector("#defeito").value;

  //Validate
  if (sku == "" || produtoName == "" || defeito == "") {
    showAlert("Todos os campos são Obrigatórios", "danger");
  } else {
    if (selectedRow == null) {
      const list = document.querySelector("#garantia-list");
      const row = document.createElement("tr");
      row.innerHTML = `
            <td>${sku}</td>
            <td>${produtoName}</td>
            <td>${quantidade}</td>
            <td>${defeito}</td>
            <td>
            <i  class="fa-solid fa-file-pen icon edit"></i>
            <i  class="fa-sharp fa-solid fa-trash icon delete"></i>
            </td>
        `;
      list.appendChild(row);
      selectedRow = null;
      showAlert("Adicionado com Sucesso", "success");
    } else {
      selectedRow.children[0].textContent = sku;
      selectedRow.children[1].textContent = produtoName;
      selectedRow.children[2].textContent = quantidade;
      selectedRow.children[3].textContent = defeito;
      selectedRow = null;
      showAlert("Atualizado", "info");
    }
    clearFields();
  }
});

//Edit Data

document.querySelector("#garantia-list").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("edit")) {
    selectedRow = target.parentElement.parentElement;
    document.querySelector("#sku").value = selectedRow.children[0].textContent;
    document.querySelector("#produtoName").value =
      selectedRow.children[1].textContent;
    document.querySelector("#quantidade").value =
      selectedRow.children[2].textContent;
    document.querySelector("#defeito").value =
      selectedRow.children[3].textContent;
  }
});

//Delete Data
document.querySelector("#garantia-list").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();
    showAlert("Excluído com Sucesso", "danger");
  }
});
