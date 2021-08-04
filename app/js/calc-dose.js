import * as Calculs from '../js/classes/Calculs.js';
import * as Dom from '../js/classes/Dom.js';
import french from "../lang/french.js";
import english from "../lang/english.js";
import Trads from "../js/classes/Trads.js";

let currentLanguage = "french";
let btnTranslation = document.querySelectorAll('.btn_translation');

let languages = {"french": french, "english": english};
Trads.changeLanguage("french");

const DOSE_VALUE_MAX = 150;

let inputHypotheticDose = document.querySelector('.subject_hypothetic_dosis');
let inputSubjectWeight = document.querySelector('.subject_weight');

let btnCalcDose = document.querySelector('.calc_dose_paracetamol');
let pResultDose = document.querySelector('.result_calc_dose_paracetamol');

let resultOfCalcDose;
let styleResult;


btnTranslation.forEach(btn => {
    btn.addEventListener('click', () => {
        currentLanguage = btn.dataset.language;
        Trads.changeLanguage(currentLanguage);
    })
})



btnCalcDose.addEventListener("click", () => {
   calcParacetamolDose();
   defineStyleResult();
   Dom.addStyleResult(pResultDose, styleResult);
   Dom.displayDiv(pResultDose);
   displayDoseResult(pResultDose);
  })
  

function calcParacetamolDose() {
    resultOfCalcDose = Calculs.calcDoseParacetamol(inputSubjectWeight.value , inputHypotheticDose.value);
}

function displayDoseResult(htmlElement) {
    htmlElement.textContent = languages[currentLanguage].calc_dose_result.replace("result", resultOfCalcDose);
}

function defineStyleResult() {
    styleResult = (resultOfCalcDose < DOSE_VALUE_MAX ? 'good' : 'bad');
}

