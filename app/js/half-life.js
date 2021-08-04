import * as Dom from '../js/classes/Dom.js';
import * as Calculs from '../js/classes/Calculs.js';
import french from "../lang/french.js";
import english from "../lang/english.js";
import Trads from "../js/classes/Trads.js";


let currentLanguage = "french";
let btnTranslation = document.querySelectorAll('.btn_translation');
let pResult = document.querySelector('.result_calc_half_life');

let languages = {"french": french, "english": english};
Trads.changeLanguage("french");


let inputParacetamolFirstSample = document.querySelector('.first_paracetamol_concentration');
let inputParacetamolSecondSample = document.querySelector('.second_paracetamol_concentration');

let datePickerFirstSample = document.querySelector('.first_sampling_time');
let datePickerSecondSample = document.querySelector('.second_sampling_time');

let btnCalcHalfLife = document.querySelector('.calc_half_life');
let duree;
let halflife;


btnTranslation.forEach(btn => {
    btn.addEventListener('click', () => {
        currentLanguage = btn.dataset.language;
        Trads.changeLanguage(currentLanguage);
    })
})

btnCalcHalfLife.addEventListener('click', () => {
    duree = Calculs.calcTimeBetweenTwoDatesInHour(datePickerSecondSample.value, datePickerFirstSample.value)
    halflife = Calculs.calcHalfLife(inputParacetamolFirstSample.value, inputParacetamolSecondSample.value, duree );
    Dom.displayDiv(pResult);
    if(dataIsOk()) {
        Dom.addStyleResult(pResult, 'good')
        displayHalfLifeResult(pResult);
    } else {
        Dom.addStyleResult(pResult,'bad')
        displayErrorResult(pResult);
    }
})


function displayHalfLifeResult(htmlElement) {
    htmlElement.textContent = languages[currentLanguage].result_calc_half_life.replace("result", halflife);
}

function displayErrorResult(htmlElement) {
    htmlElement.textContent = languages[currentLanguage].badCalcul;
}

function dataIsOk() {
    console.log(duree > 0 && halflife > 0);
    return duree > 0 && halflife > 0;
}




