
const productosData = {
  remeras: [
    { nombre: "Remera Oversize Negra", precio: 15000, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab" },
    { nombre: "Remera Blanca Básica", precio: 12000, img: "https://images.unsplash.com/photo-1520975918318-3fb6223d7e0c" },
    { nombre: "Remera Estampada", precio: 18500, img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f" },
    { nombre: "Remera Manga Larga", precio: 22000, img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c" },
    { nombre: "Remera Deportiva", precio: 19900, img: "https://images.unsplash.com/photo-1576564639720-4271ce1f5bfd" },
    { nombre: "Remera Slim Fit", precio: 21000, img: "https://images.unsplash.com/photo-1618354691373-d851c5c3f1cb" }
  ],
  camperas: [
    { nombre: "Campera de Cuero", precio: 68000, img: "https://images.unsplash.com/photo-1706765779494-2705542ebe74?q=80" },
    { nombre: "Campera Puffer", precio: 55000, img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f" },
    { nombre: "Campera de Jean", precio: 48000, img: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543" },
    { nombre: "Campera Rompeviento", precio: 35000, img: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c4" },
    { nombre: "Campera Negra Clásica", precio: 51000, img: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531" },
    { nombre: "Campera Deportiva", precio: 43000, img: "https://images.unsplash.com/photo-1536532184021-da5392b55da1" }
  ],
  zapatillas: [
    { nombre: "Zapatillas Urbanas", precio: 45000, img: "https://images.unsplash.com/photo-1549298916-b41d501d3772" },
    { nombre: "Zapatillas Running", precio: 62000, img: "https://images.unsplash.com/photo-1543165796-5426273eaab3" },
    { nombre: "Zapatillas Skate", precio: 38000, img: "https://images.unsplash.com/photo-1519741497674-611481863552" },
    { nombre: "Zapatillas Blancas", precio: 50000, img: "https://images.unsplash.com/photo-1552346154-21d32810aba3" },
    { nombre: "Zapatillas Negras", precio: 49000, img: "https://images.unsplash.com/photo-1517638851339-4c0bfd0c0182" },
    { nombre: "Zapatillas Running Pro", precio: 75000, img: "https://images.unsplash.com/photo-1547483238-2cbf88a203de" }
  ],
  pantalones: [
    { nombre: "Pantalón Cargo", precio: 26000, img: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80" },
    { nombre: "Pantalón Jogger", precio: 23000, img: "https://images.unsplash.com/photo-1542060748-10c28b62716b" },
    { nombre: "Pantalón Jean Slim", precio: 32000, img: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb" },
    { nombre: "Pantalón Recto", precio: 31000, img: "https://images.unsplash.com/photo-1521572163467-48dc4e4bbeda" },
    { nombre: "Pantalón Chino Beige", precio: 29000, img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea" },
    { nombre: "Pantalón Oversize", precio: 28000, img: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60" }
  ],
  camisas: [
    { nombre: "Camisa Blanca Formal", precio: 27000, img: "https://images.unsplash.com/photo-1613591674239-216f556d9ba9?q=80" },
    { nombre: "Camisa Cuadros", precio: 25000, img: "https://images.unsplash.com/photo-1584036561584-b03c19da874c" },
    { nombre: "Camisa Negra", precio: 30000, img: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad" },
    { nombre: "Camisa Celeste", precio: 29000, img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c" },
    { nombre: "Camisa Oversize", precio: 31000, img: "https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f" },
    { nombre: "Camisa Relaxed Fit", precio: 26500, img: "https://images.unsplash.com/photo-1583778175077-66a18d50d84c" }
  ]
};


document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);
  let categoria = params.get("categoria") || "remeras";

  if (!productosData[categoria]) categoria = "remeras";

  document.getElementById("categoria-title").textContent =
    categoria.charAt(0).toUpperCase() + categoria.slice(1);

  const contenedor = document.getElementById("productosContainer");
  contenedor.innerHTML = productosData[categoria].map((prod, i) => `
    <div class="producto-card">
      <img src="${prod.img}">
      <p>${prod.nombre}</p>
      <h3>$${prod.precio.toLocaleString()}</h3>
      <button class="btn-carrito" data-index="${i}">🛒 Agregar</button>
    </div>
  `).join("");

  contenedor.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-carrito")) {
      const idx = e.target.dataset.index;
      const item = productosData[categoria][idx];

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));

      actualizarCarrito();
      e.target.textContent = "✓ Agregado";

      setTimeout(() => {
        e.target.textContent = "🛒 Agregar";
      }, 900);
    }
  });

  actualizarCarrito();
});



function actualizarCarrito() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("carritoCount").textContent = cart.length;
}


document.querySelector(".carrito-icon").addEventListener("click", () => {
  const panel = document.getElementById("carritoPanel");
  panel.style.display = panel.style.display === "block" ? "none" : "block";
  cargarCarrito();
});



function cargarCarrito() {
  let carrito = JSON.parse(localStorage.getItem("cart")) || [];
  let lista = document.getElementById("carritoLista");
  let total = 0;

  lista.innerHTML = "";

  carrito.forEach(item => {
    total += item.precio;

    lista.innerHTML += `
      <div class="carrito-item">
        <img src="${item.img}">
        <p>${item.nombre}</p>
        <span>$${item.precio.toLocaleString()}</span>
      </div>
    `;
  });

  document.getElementById("carritoTotal").textContent =
    carrito.length > 0 ? `Total: $${total.toLocaleString()}` : "Carrito vacío";
}

document.getElementById("btnComprar").addEventListener("click", () => {
  window.location.href = "checkout.html";
});
