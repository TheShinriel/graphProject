import * as Dom from '../js/classes/Dom.js';
import * as Calculs from './classes/Calculs.js';
import { languages } from './available-languages.js';

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
        Dom.addClass(pResult,'error')
        displayErrorResult(pResult);
        Dom.showHtmlElement(pResult);
        return
    }

    const isToxic = checkToxicity(halfLife)
    const classNames = getAppropriateClasses(isToxic)
    Dom.toggleClassNames(pResult, classNames)
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
    return halfLife > 4
}

function getAppropriateClasses (isToxic) {
    return {
        success: !isToxic,
        error: isToxic,
    }
}




