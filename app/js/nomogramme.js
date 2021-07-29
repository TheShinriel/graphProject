import * as Calculs from '../js/classes/Calculs.js';
import Trads from "../js/classes/Trads.js";
import french from "../lang/french.js";
import english from "../lang/english.js";

let languages = {"french": french, "english": english};
Trads.changeLanguage("french");
let currentLanguage = "french";

const DIFFUSION_TIME_IN_BLOOD = 4; // time in hour
const OPTIMAL_ELIMINATION_TIME = 4; //time in hour

let timeAfterIngestion = 0;
let paracetamolConcentration = 0;
let timeAfterIngestion2 = 0;
let paracetamolConcentration2 = 0;

let patientGotRisks = false;
let gotDateSample = false;
let toxicity;
let toxicityPossible;
let toxicityProbable;
let toxicityWithRisk;
let duration;
let resultText = document.querySelector('.result_text');

let divCalcToxParacetamol = document.querySelector('#calculate_toxicity_div');
let divMsgError = document.querySelector('.alertBadData');
let divResult = document.querySelector('#container_result');
let divNocalcNeeded = document.querySelector('.no_calc_container')
let divCalcNeeded = document.querySelector('.calc_container')

let btnTranslation = document.querySelectorAll('.btn_translation');
let btnCalcToxicity = document.querySelector('.calculate_toxicity_btn');
// interval
let inputIngestionTime = document.querySelector('.first_interval_after_ingestion');
let inputIngestionTime2 = document.querySelector('.second_interval_after_ingestion');
let inputParacetamolConcentration = document.querySelector('.first_interval_paracetamol_concentration');
let inputParacetamolConcentration2 = document.querySelector('.second_interval_paracetamol_concentration');
// datePickers
let inputParacetamolFirstSample = document.querySelector('.paracetamol_concentration_1');
let inputParacetamolSecondSample = document.querySelector('.paracetamol_concentration_2');

let datePickerFirstSample = document.querySelector('.first_sampling_time');
let datePickerSecondSample = document.querySelector('.second_sampling_time');

let checkBoxAgreement = document.querySelector('input[type="checkbox"]');
let checkBoxPatientGotRisk = document.querySelector('#patient_got_risk');
let toggleSingleOrMultipleSamples = document.querySelector('#got_multiple_sampling_date');

let graphCanvas = document.querySelector('.graph');
let graph = new Chart(graphCanvas, {
    data: 
    {
        datasets: 
        [
            {
                type: 'line',
                label: 'resultat non interpretable',
                fill: true,
                backgroundColor: 'rgb(128, 128, 128,0.3)',
                data: [{x:0, y:620}, {x:4, y:620}]
                },    
            {
            type: 'line',
            label: languages[currentLanguage].graph_toxicity_line,
            labelName: "toxLine",
            backgroundColor: 'white',
            borderDash: [15,10],
            borderColor: 'rgb(243, 17, 41)',
            data: [{x:4, y:200}, {x:24, y:6.25}]
            },
            {
            type: 'line',
            label: languages[currentLanguage].graph_second_line,
            labelName: "secondLine",
            backgroundColor: 'white',
            borderColor: 'rgb(140,56,197)',
            borderDash: [15,10],
            data: [{x:4, y:150}, {x:24, y:4.6875}],

        },
        {
            type: 'line',
            label: languages[currentLanguage].graph_riskFactor_line,
            backgroundColor: 'white',
            labelName: "riskFactor",
            borderDash: [15,10],
            borderColor: 'rgb(53,197,154)',
            data: [{x:4, y:100}, {x:24, y:3.125}],
        },
        {
            type: 'line',
            label: languages[currentLanguage].graph_patient_saisi,
            labelName: "patientSaisi",
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
                textName: "title"
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
        let language = btn.dataset.language;
        Trads.changeLanguage(language);
    })
})

btnCalcToxicity.addEventListener("click", () => {
    paracetamolConcentration = parseFloat(inputParacetamolConcentration.value);
    paracetamolConcentration2 = parseFloat(inputParacetamolConcentration2.value);
    timeAfterIngestion = parseFloat(inputIngestionTime.value); 
    timeAfterIngestion2 = parseFloat(inputIngestionTime2.value); 

    if(isValidTimeAfterIngestion(timeAfterIngestion) && isValidTimeAfterIngestion(timeAfterIngestion2)) {
        gotDateSample ? calcWithDateSample() : calcWithIntervalSample();
    }
    
    if(!isValidTimeAfterIngestion(timeAfterIngestion) || !isValidTimeAfterIngestion(timeAfterIngestion2)) {
        displayDiv(divMsgError);
        hideDiv(divResult);
        // ajoute une donnée vide pour désafficher le précédent résultat valide
        addDataToGraph(graph, {x: 0, y: 0});
    }

})

checkBoxAgreement.addEventListener("click", (event) => {
    if(event.target.checked == true) {
        displayDiv(divCalcToxParacetamol);
    } else {
        hideDiv(divCalcToxParacetamol);
    }
})

toggleSingleOrMultipleSamples.addEventListener("click", () => {
    gotDateSample = toggleSingleOrMultipleSamples.checked
    if(toggleSingleOrMultipleSamples.checked) {
        displayDiv(divCalcNeeded);
        hideDiv(divNocalcNeeded);
    } else {
        displayDiv(divNocalcNeeded);
        hideDiv(divCalcNeeded);
    }
})

checkBoxPatientGotRisk.addEventListener("click", () => {
    patientGotRisks = checkBoxPatientGotRisk.checked;
})

// FUNCTIONS
function addDataToGraph(chart, coordonates) {
    
    for (let index = 0; index < coordonates.length; index++) {
        chart.data.datasets[4].data[index] = coordonates[index];
    }
    chart.update();
}

function isValidTimeAfterIngestion(number) {
     return (number < DIFFUSION_TIME_IN_BLOOD) ? false : true; 
}

function calcToxicities() {
    toxicity =  Calculs.calcToxicity(timeAfterIngestion);
    toxicityPossible = Calculs.calcToxicityPossible(toxicity);
    toxicityProbable = Calculs.calcToxicityProbable(toxicity);
    toxicityWithRisk = Calculs.calcToxicityProbableWithRisk(toxicity);
}

function compareToxicitiesWithNoRisk() {
    if(paracetamolConcentration > toxicityProbable) {
        resultText.textContent = languages[currentLanguage].toxicity_result_probable;
    } else if (paracetamolConcentration > toxicityPossible) {
        resultText.textContent = languages[currentLanguage].toxicity_result_possible;
    } else if (timeAfterIngestion != false) {
        resultText.textContent = languages[currentLanguage].toxicity_result_ok;
    } 
}

function compareToxicitiesWithRisk() {
    // TODO phrases de resultats avec des risques associés 
    alert("Y A DES RISQUES");
}

function hideDiv(htmlElement) {
    htmlElement.classList.remove("visible");
    htmlElement.classList.add("invisible");
}

function  displayDiv(htmlElement) {
    htmlElement.classList.remove("invisible");
    htmlElement.classList.add("visible");
}

function calcWithIntervalSample() {
    hideDiv(divMsgError);
    calcToxicities();
    patientGotRisks ? compareToxicitiesWithRisk() : compareToxicitiesWithNoRisk();
    displayDiv(divResult);
    addDataToGraph(graph, [{x: timeAfterIngestion, y: paracetamolConcentration}, {x: timeAfterIngestion2, y: paracetamolConcentration2}]);
    resultText.scrollIntoView(true);

}

function calcWithDateSample() {
    //TODO ajout des multiples samples dans le graph
    alert("j'ai pas encore fait");
}
