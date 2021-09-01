import * as Calculs from './utils/Calculs.js';
import {toggleClassNames, showHtmlElement, getSuccessOrErrorClass} from '../js/utils/Dom.js';
import { languages } from './available-languages.js'

const DOSE_VALUE_MAX = 150;

const inputHypotheticDose = document.querySelector('.subject_hypothetic_dosis');
const inputSubjectWeight = document.querySelector('.subject_weight');

const btnCalcDose = document.querySelector('.calc_dose_paracetamol');
const pResultDose = document.querySelector('.result_calc_dose_paracetamol');

const inputs = [inputHypotheticDose, inputSubjectWeight]

inputs.forEach(input => input.addEventListener('input', () => {
    const disabled = inputs.some(({value}) => value === '')
    btnCalcDose.disabled = disabled
}
  
))

btnCalcDose.disabled = true
btnCalcDose.addEventListener("click", () => {
    const result = calcParacetamolDose();
    const isToxicDose = checkDoseToxicity(result);
    const classNameResult = getSuccessOrErrorClass(isToxicDose);

    toggleClassNames(pResultDose, classNameResult);
    showHtmlElement(pResultDose);
    displayDoseResult(result);
})

function calcParacetamolDose() {
    return Calculs.calcDoseParacetamol(inputSubjectWeight.value , inputHypotheticDose.value);
}

function displayDoseResult(result) {
    pResultDose.textContent = languages[currentLanguage].calc_dose_result.replace("resultToReplace", result);
}

function checkDoseToxicity(result) {
    return result > DOSE_VALUE_MAX;
}

