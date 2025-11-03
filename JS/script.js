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
