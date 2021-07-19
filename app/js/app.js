let hrefChoicesMenu = document.querySelectorAll('.choice');



hrefChoicesMenu.forEach(choice => {
    choice.addEventListener('click', (event) => {
        console.log(choice);
        console.log(location);
    })
});