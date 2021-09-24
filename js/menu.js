import { hideHtmlElement, showHtmlElement } from "./utils/Dom";

const btnBurger = document.getElementById("btn-burger");

btnBurger.addEventListener('click',function() {
    const menu = document.getElementById("myNav");

    menu.classList.toggle('hidden');
});

window.onload = function() {
    adaptMenuToScreen();
};

window.onresize = function() {
    adaptMenuToScreen()
};

function adaptMenuToScreen() {
    const menu = getMenuElements();

    menu.btnBurger.classList.toggle('hidden', menu.isBigScreen)
    menu.navButtons.classList.toggle('hidden', !menu.isBigScreen)
}

function isBigScreen() {
    const windowWidth = window.innerWidth;
    return windowWidth > 960;
};

function getMenuElements() {
    const menu = {
        isBigScreen: isBigScreen(),
        navButtons: document.getElementById("myNav"),
        btnBurger: document.getElementById("btn-burger")
    }
    return menu;
};


