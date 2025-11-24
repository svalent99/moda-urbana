const form = document.querySelector('#contacto form');
const popup = document.getElementById('popup');
const cerrarPopup = document.getElementById('cerrar-popup');

form.addEventListener('submit', (e) => {
  e.preventDefault(); 
  popup.classList.add('active'); 
  form.reset(); 
});

cerrarPopup.addEventListener('click', () => {
  popup.classList.remove('active'); 
});
document.querySelectorAll('.categoria-card').forEach(card => {
  card.addEventListener('click', () => {
    const category = card.dataset.category;
    window.location.href = `productos.html?categoria=${category}`;
  });
});
