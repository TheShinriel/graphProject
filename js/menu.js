import { hideHtmlElement, showHtmlElement } from "./utils/Dom";

window.addEventListener("DOMContentLoaded", () => {
    const btnBurger = document.getElementById("btn-burger");

    btnBurger.addEventListener('click',function() {
        const menu = document.getElementById("myNav");

        (menu.classList.contains('hidden')) ? showHtmlElement(menu) : hideHtmlElement(menu);
    });
});

window.onload = function() {
    getStyleMenu();
};

window.onresize = function() {
    getStyleMenu()
};

function getScreenSize() {
    const windowWidth = window.innerWidth;
    return windowWidth > 960;
};

function toggleItem(elementToShow, elementTohide) {
    showHtmlElement(elementToShow);
    hideHtmlElement(elementTohide);
};

function getMenuElements() {
    const menu = {
        isBigScreen: getScreenSize(),
        navButtons: document.getElementById("myNav"),
        btnBurger: document.getElementById("btn-burger")
    }
    return menu;
};

function getStyleMenu() {
    const menu = getMenuElements();
 
    (menu.isBigScreen)  ?  toggleItem(menu.navButtons, menu.btnBurger) : toggleItem(menu.btnBurger, menu.navButtons);   
    
}