import * as Calculs from '../js/classes/Calculs.js';
import { Modal } from "./classes/Modal.js";
import french from "../lang/french.js";
import english from "../lang/english.js";
import Trads from "../js/classes/Trads.js";

let currentLanguage = "french";
let languages = {"french": french, "english": english};
Trads.changeLanguage("french");

const DOSE_VALUE_MAX = 150;

let inputHypotheticDose = document.querySelector('.subject_hypothetic_dosis');
let inputSubjectWeight = document.querySelector('.subject_weight');

let btnCalcDose = document.querySelector('.calc_dose_paracetamol');

let pResultDose = document.querySelector('.result_calc_dose_paracetamol');

let resultOfCalcDose;
let styleResult;

btnCalcDose.addEventListener("click", () => {
   calcParacetamolDose();
   removeStyleResult(pResultDose);
   defineStyleResult();
   addStyleResult(pResultDose)
   displayDoseResult(pResultDose);
  })
  

function calcParacetamolDose() {
    resultOfCalcDose = Calculs.calcDoseParacetamol(inputSubjectWeight.value , inputHypotheticDose.value);
}

function displayDoseResult(htmlElement) {
    console.log(currentLanguage);
    htmlElement.textContent = languages[currentLanguage].calc_dose_result.replace("result", resultOfCalcDose);
}

function defineStyleResult() {
    styleResult = (resultOfCalcDose < DOSE_VALUE_MAX ? 'good' : 'bad');
}

function removeStyleResult(htmlElement) {
    htmlElement.classList.remove(styleResult);
}

function addStyleResult(htmlElement) {
    htmlElement.classList.add(styleResult)
}
