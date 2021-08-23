import * as Dom from './utils/Dom.js';
import * as Calculs from './utils/Calculs.js';
import { languages } from './available-languages.js';

const OPTIMAL_ELIMINATION_TIME = 4; // time in hour

const pResult = document.querySelector('.result_calc_half_life');

const inputParacetamolFirstSample = document.querySelector('.first_paracetamol_concentration');
const inputParacetamolSecondSample = document.querySelector('.second_paracetamol_concentration');

const datePickerFirstSample = document.querySelector('.first_sampling_time');
const datePickerSecondSample = document.querySelector('.second_sampling_time');

const btnCalcHalfLife = document.querySelector('.calc_half_life');

btnCalcHalfLife.addEventListener('click', () => {
    const duree = Calculs.calcTimeBetweenTwoDatesInHour(datePickerSecondSample.value, datePickerFirstSample.value)
    const halfLife = Calculs.calcHalfLife(inputParacetamolFirstSample.value, inputParacetamolSecondSample.value, duree );
    const isValidData = checkData(duree, halfLife)
    
    if (!isValidData) {
        const classNameResult = Dom.getSuccessOrErrorClass(!isValidData);
        Dom.toggleClassNames(pResult, classNameResult);
        displayErrorResult(pResult);
        Dom.showHtmlElement(pResult);
        return
    }
    
    const isToxic = checkToxicity(halfLife)
    const classNameResult = Dom.getSuccessOrErrorClass(isToxic)
    
    Dom.toggleClassNames(pResult, classNameResult)
    displayHalfLifeResult(pResult, halfLife);
    Dom.showHtmlElement(pResult);
})

function displayHalfLifeResult(htmlElement, halfLife) {
    htmlElement.textContent = languages[currentLanguage].result_calc_half_life.replace("resultToReplace", halfLife);
}

function displayErrorResult(htmlElement) {
    htmlElement.textContent = languages[currentLanguage].badCalcul;
}

function checkData(duree, halfLife) {
    return duree > 0 && halfLife > 0;
}

function checkToxicity(halfLife) {
    return halfLife > OPTIMAL_ELIMINATION_TIME
}