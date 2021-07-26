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

let resultText = document.querySelector('.result_text');

let divCalcToxParacetamol = document.querySelector('#calculate_toxicity_div');
let divMsgError = document.querySelector('.alertBadData');
let divResult = document.querySelector('#container_result');

let btnTranslation = document.querySelectorAll('.btn_translation');
let btnCalcToxicity = document.querySelector('.calculate_toxicity_btn');

let inputIngestionTime = document.querySelector('.time_after_ingestion');
let inputParacetamolConcentration = document.querySelector('.paracetamol_concentration');

let checkBoxAgreement = document.querySelector('input[type="checkbox"]');

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
                borderColor: 'rgb(128, 128, 128)',
                backgroundColor: 'rgb(128, 128, 128,0.3)',
                data: [{x:0, y:620}, {x:4, y:620}]
                },    
            {
            type: 'line',
            label: languages[currentLanguage].graph_toxicity_line,
            labelName: "toxLine",
            backgroundColor: 'white',
            borderDash: [5,5],
            borderColor: 'rgb(75, 192, 192)',
            data: [{x:4, y:200}, {x:24, y:6.25}]
            },
            {
            type: 'line',
            label: languages[currentLanguage].graph_second_line,
            labelName: "secondLine",
            backgroundColor: 'white',
            borderColor: 'brown',
            borderDash: [5,5],
            data: [{x:4, y:150}, {x:24, y:4.6875}],

        },
        {
            type: 'line',
            label: languages[currentLanguage].graph_riskFactor_line,
            backgroundColor: 'white',
            labelName: "riskFactor",
            borderDash: [5,5],
            borderColor: 'green',
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
    timeAfterIngestion = parseFloat(inputIngestionTime.value); 

    isValidTimeAfterIngestion(timeAfterIngestion);
    //   styleResult = (resultOfCalcDose < DOSE_VALUE_MAX ? 'good' : 'bad');


    displayResult(timeAfterIngestion, paracetamolConcentration );
    addData(graph, timeAfterIngestion, paracetamolConcentration );
    resultText.scrollIntoView(true);
})

checkBoxAgreement.addEventListener("click", (event) => {
    if(event.target.checked == true) {
        divCalcToxParacetamol.classList.remove("invisible");
        divCalcToxParacetamol.classList.add("visible");
    } else {
        divCalcToxParacetamol.classList.remove("visible");
        divCalcToxParacetamol.classList.add("invisible");
    }
})


// FUNCTIONS
function addData(chart, time, concentration) {
    chart.data.datasets[4].data[0]= {x:time,y:concentration};
    //chart.data.datasets[4].data[1]= {x:9,y:125};
    chart.update();
}

function isValidTimeAfterIngestion(number) {
    if(number < DIFFUSION_TIME_IN_BLOOD) {
        divMsgError.classList.remove("invisible");
        divMsgError.classList.add("visible");
        divResult.classList.remove("visible");
        divResult.classList.add("invisible");
        return null;
    } else {
        divMsgError.classList.remove("visible");
        divMsgError.classList.add("invisible");
        return number;
    }
}

function displayResult(time, concentration) {
    let toxicity =  Calculs.calcToxicity(time);
    let toxicityPossible = Calculs.calcToxicityPossible(toxicity);
    let toxicityProbable = Calculs.calcToxicityProbable(toxicity);

    if(concentration > toxicityProbable) {
        resultText.textContent = languages[currentLanguage].toxicity_result_probable;
    } else if (concentration > toxicityPossible) {
        resultText.textContent = languages[currentLanguage].toxicity_result_possible;
    } else if (timeAfterIngestion != null) {
        resultText.textContent = languages[currentLanguage].toxicity_result_ok;
    } 
    divResult.classList.remove("invisible");
    divResult.classList.add("visible");
}