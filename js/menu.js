window.addEventListener("DOMContentLoaded", (event) => {
    const menu = document.getElementById("myNav");
    const btnBurger = document.getElementById("btn-burger");
    btnBurger.addEventListener('click',function(){
        menu.style.display = (menu.style.display == 'none')? '':'none';
    });
    window.onload = function(){
        let ww = window.innerWidth;
        menu.style.display = ( ww > 960 ) ? '':'none';
        btnBurger.style.display = ( ww > 960 ) ? 'none':'';
    };
    window.onresize = function(){
        let ww = window.innerWidth;
        menu.style.display = ( ww > 960 ) ? '':'none';
        btnBurger.style.display = ( ww > 960 ) ? 'none':'';
    };
});