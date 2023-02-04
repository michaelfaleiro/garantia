document.querySelector("#btnLogin").addEventListener("click", (e) => {
  e.preventDefault();
  logar();
});

function logar() {
  var email = document.querySelector("#email").value;
  var password = document.querySelector("#password").value;

  if (email == "michaelfaleiro@gmail.com" || password == "123456") {
    showAlert("Logando", "success");
    location.href = "./src/pages/home.html";
  } else {
    alert("Verificar email e senha");
  }
}

//Alertas
function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const main = document.querySelector(".main");
  container.before(div, main);

  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}
