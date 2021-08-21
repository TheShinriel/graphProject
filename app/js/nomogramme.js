import * as Calculs from './classes/Calculs.js';
import Trads from "../js/classes/Trads.js";
import * as Samples from "../js/classes/Sample-nommogramme.js";
import * as Dom from '../js/classes/Dom.js';
import { languages } from './available-languages.js'

const DIFFUSION_TIME_IN_BLOOD = 4; // time in hour

// variables
let timeAfterIngestion = 0;
let paracetamolConcentration = 0;
let toxicityPossible;
let toxicityProbable;
let toxicityWithRisk;

let resultText = document.querySelector('.result_text');
// divs
const divCalcToxParacetamol = document.querySelector('#calculate_toxicity_div');
const divMsgError = document.querySelector('.alertBadData');
const divResult = document.querySelector('#container_result');
const divNoCalc = document.querySelector('.no_calc_container')
// buttons
const btnTranslation = document.querySelectorAll('.btn_translation');
const btnCalcToxicity = document.querySelector('.calculate_toxicity_btn');
const btnAddSample = document.querySelector('.add_sample');
// interval inputs
let ingestionIntervals = document.querySelectorAll('.interval_after_ingestion');
let paracetamolConcentrationIntervals = document.querySelectorAll('.interval_paracetamol_concentration');
// checkboxs
const checkBoxPatientGotRisk = document.querySelector('#patient_got_risk');
const checkBoxAgreement = document.querySelector('#accept_agreement');

const graphCanvas = document.querySelector('#nomogramGraph');
const graph = new Chart(graphCanvas, {
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
        maintainAspectRatio: false,
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
        Trads.changeGraphLanguage(graph, currentLanguage);
    })
})

btnAddSample.addEventListener("click", () => {
    Samples.addSample(divNoCalc);
    ingestionIntervals = document.querySelectorAll('.interval_after_ingestion');
    paracetamolConcentrationIntervals = document.querySelectorAll('.interval_paracetamol_concentration');
});

btnCalcToxicity.addEventListener("click", () => {
    const ingestionTimes = setNodeModuleInArrayWithoutBlankValue(ingestionIntervals);
    const paracetamolConcentrations = setNodeModuleInArrayWithoutBlankValue(paracetamolConcentrationIntervals);
    const dataForGraph = createCoordonates(ingestionTimes, paracetamolConcentrations);

    selectDataToAnalize(dataForGraph)
    
    if(isValidTimeAfterIngestion(ingestionTimes)) {
        Dom.hideHtmlElement(divMsgError);
        calcToxicities();
        compareToxicities();
        Dom.showHtmlElement(divResult);
        resultText.scrollIntoView(true);
        addDataToGraph(graph, dataForGraph);
    }
    
    if(!isValidTimeAfterIngestion(ingestionTimes)) {
        Dom.hideHtmlElement(divResult);
        Dom.showHtmlElement(divMsgError);
        clearDataGraph()
    }

})

checkBoxAgreement.addEventListener("click", (event) => {
    if(event.target.checked == true) {
        Dom.showHtmlElement(divCalcToxParacetamol);
    } else {
        Dom.hideHtmlElement(divCalcToxParacetamol);
    }
})

// FUNCTIONS
function addDataToGraph(chart, coordonates) {
    for (let index = 0; index < coordonates.length; index++) {
        chart.data.datasets[4].data[index] = coordonates[index];
    }
    chart.update();
}

function clearDataGraph() {
    graph.data.datasets[4].data = [];
    graph.update();
}

function isValidTimeAfterIngestion(array) {
     return array.every(num => num >= DIFFUSION_TIME_IN_BLOOD); 
}

function calcToxicities() {
    const toxicity = Calculs.calcToxicity(timeAfterIngestion);
    toxicityPossible = Calculs.calcToxicityPossible(toxicity);
    toxicityProbable = Calculs.calcToxicityProbable(toxicity);
    toxicityWithRisk = Calculs.calcToxicityProbableWithRisk(toxicity);
}


function compareToxicities() {
    const patientGotRisk = checkBoxPatientGotRisk.checked;
    const toxicityValue = patientGotRisk ? toxicityWithRisk : toxicityPossible;

    if(paracetamolConcentration > toxicityProbable) {
        resultText.textContent = languages[currentLanguage].toxicity_result_probable.replace('resultToReplace', timeAfterIngestion);
    } else if (paracetamolConcentration > toxicityValue) {
        resultText.textContent = languages[currentLanguage].toxicity_result_possible.replace('resultToReplace', timeAfterIngestion);
    } else if (timeAfterIngestion != false) {
        resultText.textContent = languages[currentLanguage].toxicity_result_ok.replace('resultToReplace', timeAfterIngestion);
    } 
}

function createCoordonates(array1, array2) {
    const coordonates = [];
    for (let index = 0; index < array1.length; index++) {
        coordonates.push({x:array1[index], y: array2[index]});
    }
    return coordonates;
}


function setNodeModuleInArrayWithoutBlankValue(nodeModule) {
    const array = [];
    nodeModule.forEach(concentration => {
        if (concentration.value !== "") array.push(+concentration.value);
    });
    return array;
}

function selectDataToAnalize(dataForGraph) {
    dataForGraph = dataForGraph.sort(compare);
    paracetamolConcentration = dataForGraph[dataForGraph.length-1].y;
    timeAfterIngestion = dataForGraph[dataForGraph.length-1].x;
}

function compare(a, b) {
    if (a.x < b.x) {
        return -1;
    }
    if (a.x > b.x) {
        return 1;
    }
    return 0;
}

