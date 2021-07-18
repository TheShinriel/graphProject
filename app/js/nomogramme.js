let checkBoxAgreement = document.querySelector('input[type="checkbox"]');
let divCalcToxParacetamol = document.querySelector('#container_calc_tox_paracetamol');


checkBoxAgreement.addEventListener("click", (event) => {
    if(event.target.checked == true) {
        divCalcToxParacetamol.classList.remove("invisible");
        divCalcToxParacetamol.classList.add("visible");
    } else {
        divCalcToxParacetamol.classList.remove("visible");
        divCalcToxParacetamol.classList.add("invisible");
    }
})