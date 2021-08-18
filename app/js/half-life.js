import * as Dom from '../js/classes/Dom.js';
import * as Calculs from '../js/classes/Calculs.js';
import { languages } from './available-languages.js';

const pResult = document.querySelector('.result_calc_half_life');

const inputParacetamolFirstSample = document.querySelector('.first_paracetamol_concentration');
const inputParacetamolSecondSample = document.querySelector('.second_paracetamol_concentration');

const datePickerFirstSample = document.querySelector('.first_sampling_time');
const datePickerSecondSample = document.querySelector('.second_sampling_time');

const btnCalcHalfLife = document.querySelector('.calc_half_life');

btnCalcHalfLife.addEventListener('click', () => {
    const duree = Calculs.calcTimeBetweenTwoDatesInHour(datePickerSecondSample.value, datePickerFirstSample.value)
    const halflife = Calculs.calcHalfLife(inputParacetamolFirstSample.value, inputParacetamolSecondSample.value, duree );
    const isValidData = checkData(duree, halflife)

    if (!isValidData) {
        Dom.addClass(pResult,'error')
        displayErrorResult(pResult);
        Dom.showHtmlElement(pResult);
        return
    }

    const isToxic = checkToxicity(halflife)
    const classNames = getAppropriateClasses(isToxic)
    Dom.toggleClassNames(pResult, classNames)
    displayHalfLifeResult(pResult, halflife);
    Dom.showHtmlElement(pResult);
})


function displayHalfLifeResult(htmlElement, halflife) {
    htmlElement.textContent = languages[currentLanguage].result_calc_half_life.replace("resultToReplace", halflife);
}

function displayErrorResult(htmlElement) {
    htmlElement.textContent = languages[currentLanguage].badCalcul;
}

function checkData(duree, halflife) {
    return duree > 0 && halflife > 0;
}

function checkToxicity(halflife) {
    return halflife > 4
}

function getAppropriateClasses (isToxic) {
    return {
        success: !isToxic,
        error: isToxic,
    }
}




