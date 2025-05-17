
// Menu de navegación

const menu = document.getElementById('menu');

let openMenu = false;

function toggleMenu() {
    if (openMenu == false) {
        openMenu = true;
        menu.classList.toggle("show");
    } else {
        openMenu = false;
        menu.classList.toggle("show");
    }
}