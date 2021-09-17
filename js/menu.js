import { hideHtmlElement, showHtmlElement } from "./utils/Dom";

window.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("myNav");
    const btnBurger = document.getElementById("btn-burger");

    btnBurger.addEventListener('click',function(){
        menu.style.display = (menu.style.display == 'none')? '':'none';
    });

    window.onload = function(){
        const isBigScreen = getScreenSize();
        toggleMenu(isBigScreen)   
    };
    
    window.onresize = function(){
        const isBigScreen = getScreenSize();
        toggleMenu(isBigScreen)
    };
});

function getScreenSize() {
    const windowWidth = window.innerWidth;
    return windowWidth > 960;
}

function toggleMenu(screen) {
    (screen) ? showHtmlElement(menu) : hideHtmlElement(menu);
    (screen) ? hideHtmlElement(btnBurger) : showHtmlElement(btnBurger);
}