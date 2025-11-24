document.addEventListener("DOMContentLoaded", () => {
  renderCheckout();
});

function renderCheckout() {
  let carrito = JSON.parse(localStorage.getItem("cart")) || [];
  let contenedor = document.getElementById("listaCheckout");
  let total = 0;

  contenedor.innerHTML = "";

  carrito.forEach((item, index) => {
    total += item.precio;

    contenedor.innerHTML += `
      <div class="item">
        <img src="${item.img}">
        <div>
          <p>${item.nombre}</p>
          <strong>$${item.precio.toLocaleString()}</strong>
        </div>
        <button class="btn-eliminar" onclick="eliminarItem(${index})">
          X
        </button>
      </div>
    `;
  });

  document.getElementById("totalGeneral").textContent =
    `Total a pagar: $${total.toLocaleString()}`;
}

function eliminarItem(i) {
  let carrito = JSON.parse(localStorage.getItem("cart")) || [];
  carrito.splice(i, 1);
  localStorage.setItem("cart", JSON.stringify(carrito));
  renderCheckout();
}

document.getElementById("btnPagar").addEventListener("click", async () => {
  let carrito = JSON.parse(localStorage.getItem("cart")) || [];

  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  const response = await fetch("https://fakestoreapi.com/carts", {
    method: "POST",
    body: JSON.stringify({
      userId: 1,
      date: new Date(),
      products: carrito.map((p, i) => ({
        productId: i + 1,
        quantity: 1
      }))
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  const data = await response.json();
  console.log("Respuesta del pago:", data);

  alert("Compra realizada con éxito!");
  localStorage.removeItem("cart");
  window.location.href = "gracias.html";
});
