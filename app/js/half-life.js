import * as Dom from '../js/classes/Dom.js';
import * as Calculs from '../js/classes/Calculs.js';
import french from "../lang/french.js";
import english from "../lang/english.js";
import Trads from "../js/classes/Trads.js";
import { languages, defaultLanguage } from './available-languages.js'

let currentLanguage = defaultLanguage;
let btnTranslation = document.querySelectorAll('.btn_translation');
let pResult = document.querySelector('.result_calc_half_life');

Trads.changeLanguage(currentLanguage)


let inputParacetamolFirstSample = document.querySelector('.first_paracetamol_concentration');
let inputParacetamolSecondSample = document.querySelector('.second_paracetamol_concentration');

let datePickerFirstSample = document.querySelector('.first_sampling_time');
let datePickerSecondSample = document.querySelector('.second_sampling_time');

let btnCalcHalfLife = document.querySelector('.calc_half_life');
let duree;
let halflife;

btnCalcHalfLife.addEventListener('click', () => {
    duree = Calculs.calcTimeBetweenTwoDatesInHour(datePickerSecondSample.value, datePickerFirstSample.value)
    halflife = Calculs.calcHalfLife(inputParacetamolFirstSample.value, inputParacetamolSecondSample.value, duree );
    if(dataIsOk()) {
        Dom.addClass(pResult, 'success')
        displayHalfLifeResult(pResult);
    } else {
        Dom.addClass(pResult,'error')
        displayErrorResult(pResult);
    }
    Dom.showHtmlElement(pResult);
})


function displayHalfLifeResult(htmlElement) {
    htmlElement.textContent = languages[currentLanguage].result_calc_half_life.replace("resultToReplace", halflife);
}

function displayErrorResult(htmlElement) {
    htmlElement.textContent = languages[currentLanguage].badCalcul;
}

function dataIsOk() {
    return duree > 0 && halflife > 0;
}




