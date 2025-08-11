let products = JSON.parse(localStorage.getItem("products")) || [];
let editingIndex = null;

const form = document.getElementById("product-form");
const productList = document.getElementById("product-list");

function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.status}</td>
      <td>
        <button class="edit-btn" onclick="editProduct(${index})">Editar</button>
        <button class="delete-btn" onclick="deleteProduct(${index})">Borrar</button>
      </td>
    `;
    productList.appendChild(row);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const status = document.getElementById("status").value;

  if (editingIndex === null) {
    products.push({ name, price, status });
  } else {
    products[editingIndex] = { name, price, status };
    editingIndex = null;
  }

  localStorage.setItem("products", JSON.stringify(products));
  form.reset();
  renderProducts();
});

function editProduct(index) {
  const product = products[index];
  document.getElementById("name").value = product.name;
  document.getElementById("price").value = product.price;
  document.getElementById("status").value = product.status;
  editingIndex = index;
}

function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
}

renderProducts();
