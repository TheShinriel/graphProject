import * as Calculs from '../js/classes/Calculs.js';
import Trads from "../js/classes/Trads.js";
import french from "../lang/french.js";
import english from "../lang/english.js";
import * as Samples from "../js/classes/Sample-nommogramme.js";

let currentLanguage = "french";
let languages = {"french": french, "english": english};

const DIFFUSION_TIME_IN_BLOOD = 4; // time in hour
const OPTIMAL_ELIMINATION_TIME = 4; // time in hour

// variables
let timeAfterIngestion = 0;
let paracetamolConcentration = 0;
let ingestionTimes = [];
let paracetamolConcentrations = [];
let coordonates = [{}];
let patientGotRisks = false;
let toxicity;
let toxicityPossible;
let toxicityProbable;
let toxicityWithRisk;
let resultText = document.querySelector('.result_text');
// divs
let divCalcToxParacetamol = document.querySelector('#calculate_toxicity_div');
let divMsgError = document.querySelector('.alertBadData');
let divResult = document.querySelector('#container_result');
let divNoCalc = document.querySelector('.no_calc_container')
// buttons
let btnTranslation = document.querySelectorAll('.btn_translation');
let btnCalcToxicity = document.querySelector('.calculate_toxicity_btn');
let btnAddSample = document.querySelector('.add_sample');
// interval inputs
let ingestionIntervals = document.querySelectorAll('.interval_after_ingestion');
let paracetamolConcentrationIntervals = document.querySelectorAll('.interval_paracetamol_concentration');
// checkboxs
console.log(ingestionIntervals);
let checkBoxPatientGotRisk = document.querySelector('#patient_got_risk');

let inputIngestionTime = document.querySelector('.time_after_ingestion');
let inputParacetamolConcentration = document.querySelector('.paracetamol_concentration');

let checkBoxAgreement = document.querySelector('#accept_agreement');

let graphCanvas = document.querySelector('#nomogramGraph');
let graph = new Chart(graphCanvas, {
    data: 
    {
        datasets: 
        [
            {
                type: 'line',
                label: "",
                fill: true,
                backgroundColor: 'rgb(128, 128, 128,0.3)',
                data: [{x:0, y:620}, {x:4, y:620}]
            },    
            {
                type: 'line',
                label: languages[currentLanguage].graph_toxicity_line,
                labelName: "graph_toxicity_line",
                backgroundColor: 'white',
                borderDash: [15,10],
                borderColor: 'rgb(243, 17, 41)',
                data: [{x:4, y:200}, {x:24, y:6.25}]
            },
            {
                type: 'line',
                label: languages[currentLanguage].graph_second_line,
                labelName: "graph_second_line",
                backgroundColor: 'white',
                borderColor: 'rgb(140,56,197)',
                borderDash: [15,10],
                data: [{x:4, y:150}, {x:24, y:4.6875}],
            },
            {
                type: 'line',
                label: languages[currentLanguage].graph_riskFactor_line,
                labelName: "graph_riskFactor_line",
                backgroundColor: 'white',
                borderDash: [15,10],
                borderColor: 'rgb(53,197,154)',
                data: [{x:4, y:100}, {x:24, y:3.125}],
            },
            {
                type: 'line',
                label: languages[currentLanguage].graph_patient_saisi,
                labelName: "graph_patient_saisi",
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgb(255, 99, 132)',
                data: []
            }
        ],
        labels: [0,4,8,12,16,20,24]
    },
    options: 
    {
        responsive: true,
        plugins: 
        {
            title: 
            {
                display: true,
                text: languages[currentLanguage].graph_title,
                textName: "graph_title"
            }
        },
        scales: 
        {
            x: 
            {
                display: true,
                min:0,
                max:25,
                type: 'linear'
            },
            y: 
            {
                min:0,
                max:600,
                display: true,
                type: 'logarithmic'
            }
        }
    }
});

btnTranslation.forEach(btn => {
    btn.addEventListener('click', () => {
        currentLanguage = btn.dataset.language;
        Trads.changeLanguage(currentLanguage);
        Trads.changeGraphLanguage(graph, currentLanguage);
    })
})

btnAddSample.addEventListener("click", () => {
    Samples.addSample(divNoCalc);
    ingestionIntervals = document.querySelectorAll('.interval_after_ingestion');
    paracetamolConcentrationIntervals = document.querySelectorAll('.interval_paracetamol_concentration');
});

btnCalcToxicity.addEventListener("click", () => {
    
    prepareDataForGraph()
    selectDataToAnalize()
    
    if(isValidTimeAfterIngestion(ingestionTimes)) {
        hideDiv(divMsgError);
        calcToxicities();
        patientGotRisks ? compareToxicitiesWithRisk() : compareToxicitiesWithNoRisk();
        displayDiv(divResult);
        resultText.scrollIntoView(true);
        addDataToGraph(graph, coordonates);
    }
    
    if(!isValidTimeAfterIngestion(ingestionTimes)) {
        hideDiv(divResult);
        displayDiv(divMsgError);
        // ajoute une donnée vide pour désafficher le précédent résultat valide
        addDataToGraph(graph, [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}]);
    }

})

checkBoxAgreement.addEventListener("click", (event) => {
    if(event.target.checked == true) {
        displayDiv(divCalcToxParacetamol);
    } else {
        hideDiv(divCalcToxParacetamol);
    }
})

checkBoxPatientGotRisk.addEventListener("click", () => {
    patientGotRisks = checkBoxPatientGotRisk.checked;
});

Trads.changeLanguage(currentLanguage);


// FUNCTIONS
function addDataToGraph(chart, coordonates) {
    for (let index = 0; index < coordonates.length; index++) {
        chart.data.datasets[4].data[index] = coordonates[index];
    }
    chart.update();
}

function isValidTimeAfterIngestion(array) {
     return array.every(num => num >= DIFFUSION_TIME_IN_BLOOD); 
}

function calcToxicities() {
    toxicity =  Calculs.calcToxicity(timeAfterIngestion);
    toxicityPossible = Calculs.calcToxicityPossible(toxicity);
    toxicityProbable = Calculs.calcToxicityProbable(toxicity);
    toxicityWithRisk = Calculs.calcToxicityProbableWithRisk(toxicity);
}

function compareToxicitiesWithNoRisk() {
    if(paracetamolConcentration > toxicityProbable) {
        resultText.innerText = languages[currentLanguage].toxicity_result_probable;
    } else if (paracetamolConcentration > toxicityPossible) {
        resultText.innerText = languages[currentLanguage].toxicity_result_possible;
    } else if (timeAfterIngestion != false) {
        resultText.innerText = languages[currentLanguage].toxicity_result_ok;
    } 
}

function compareToxicitiesWithRisk() {
    if(paracetamolConcentration > toxicityProbable) {
        resultText.textContent = languages[currentLanguage].toxicity_result_probable;
    } else if (paracetamolConcentration > toxicityWithRisk) {
        resultText.textContent = languages[currentLanguage].toxicity_result_possible;
    } else if (timeAfterIngestion != false) {
        resultText.textContent = languages[currentLanguage].toxicity_result_ok;
    } 
}

function hideDiv(htmlElement) {
    htmlElement.classList.remove("visible");
    htmlElement.classList.add("invisible");
}

function  displayDiv(htmlElement) {
    htmlElement.classList.remove("invisible");
    htmlElement.classList.add("visible");
}

function createCoordonates(array1, array2) {
    coordonates = [];
    for (let index = 0; index < array1.length; index++) {
        coordonates.push({x:array1[index], y: array2[index]});
    }
}

function prepareDataForGraph() {
    ingestionTimes = setNodeModuleInArrayWithoutBlankValue(ingestionIntervals)
    paracetamolConcentrations = setNodeModuleInArrayWithoutBlankValue(paracetamolConcentrationIntervals)
    console.log(paracetamolConcentrations);
        createCoordonates(ingestionTimes, paracetamolConcentrations);
}

function setNodeModuleInArrayWithoutBlankValue(nodeModule) {
    let array = [];
    nodeModule.forEach(concentration => {
        if (concentration.value !== "") array.push(+concentration.value);
    });
    return array;
}

function selectDataToAnalize() {
    coordonates = coordonates.sort(compare)
    paracetamolConcentration = coordonates[coordonates.length-1].y;
    timeAfterIngestion = coordonates[coordonates.length-1].x;
}

function compare(a, b) {
    if (a.x < b.x) {
        return -1
    }
    if (a.x > b.x) {
        return 1
    }
    return 0;
}