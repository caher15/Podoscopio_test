// Función para abrir y cerrar el menú lateral
function toggleMenu() {
    var sideMenu = document.getElementById("sideMenu");
    sideMenu.classList.toggle("open");
}

// Función para verificar si un elemento está en el viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Añadir la clase 'visible' cuando la portada o las cartas sean visibles
function checkVisibility() {
    const portada = document.querySelector('.home-portada');
    const cards = document.querySelectorAll('.card');

    if (isElementInViewport(portada)) {
        portada.classList.add('visible');
    }

    cards.forEach(card => {
        if (isElementInViewport(card)) {
            card.classList.add('visible');
        }
    });
}

// Verificar la visibilidad al cargar y hacer scroll
window.addEventListener('load', checkVisibility);
window.addEventListener('scroll', checkVisibility);
