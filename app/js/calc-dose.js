import Calculs from "./classes/Calculs.js";
import { Modal } from "./classes/Modal.js";

const DOSE_VALUE_MAX = 150;

let inputHypotheticDose = document.querySelector('.subject_hypothetic_dosis');
let inputSubjectWeight = document.querySelector('.subject_weight');

let btnCalcDose = document.querySelector('.calc_dose_paracetamol');

let pResultDose = document.querySelector('.result_calc_dose_paracetamol');

let resultOfCalcDose;
let styleResult;

let modal = new Modal("test", "non", "non");
modal.log;
console.log(modal.log)


btnCalcDose.addEventListener("click", () => {
   calcParacetamolDose();
   removeStyleResult(pResultDose);
   defineStyleResult();
   addStyleResult(pResultDose)
   displayDoseResult(pResultDose);
  })
  

function calcParacetamolDose() {
    resultOfCalcDose = Calculs.calcDoseMgKg(inputSubjectWeight.value , inputHypotheticDose.value);
}

function displayDoseResult(htmlElement) {
    htmlElement.textContent = `La dose ingérée est donc ${resultOfCalcDose} mg/kg.`;
}

function defineStyleResult() {
    styleResult = (resultOfCalcDose < DOSE_VALUE_MAX ? 'good' : 'bad');
}

function removeStyleResult(htmlElement) {
    htmlElement.classList.remove(styleResult);
}

function addStyleResult(htmlElement) {
    pResultDose.classList.add(styleResult)
}
