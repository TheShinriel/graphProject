
const DIFFUSION_TIME_IN_BLOOD = 4; // time in hour

let divAgreement = document.querySelector('#agreement');
let divCalcTox = document.querySelector('#calc_tox');
let divMsgError = document.querySelector('.alertBadData');
let divResult = document.querySelector('#container_result');
let labelAgreement = document.querySelector('.text_agreement');
let mainTitle = document.querySelector('.main_title');
let subTitle = document.querySelector('.sub_title');
let pResult = document.querySelector('.p_result');
let btnTranslation = document.querySelectorAll('.btn_translation');

let submitBtn = document.querySelector('.calc_data');
let checkBoxAgreement = document.querySelector('input[id="accept_agreement"]');
let ingestionTimeInput = document.querySelector('.time_after_ingestion');
let paracetamolConcentrationInput = document.querySelector('.paracetamol_concentration');
let context = document.querySelector('.graph');

let timeAfterIngestion;
let paracetamolConcentration;

let currentLangage = "french";

// ##################


let dataTranslation = {
    "french":
    {
        "title":
        {
        "page": "Evaluation de la toxicité du paracetamol",
        "main": "Toxicité hépatique du paracétamol",
        "subTitle": "en fonction du dosage sanguin et du délai post ingestion",
        "warningBadData": "Attention le nomogramme n'est utilisable que si le prélèvement est réalisé au moins 4 heures après ingestion. Reprélever le patient.",
        },
        "buttons":
        {
         "checkboxLabel": "L'ingestion a eu lieu en prise unique, le nomogramme est donc utilisable.",   
         "btnValidation": "Evaluer le risque",
         "ingestionTimePlaceholder": "Durée post-ingestion (h)",
         "paracetamolplaceholder": "Paracetamol conc. (mg/l)"
        },
        "results":
        {
            "resultProbable": "Concentration associée à un risque important de toxicité.",
            "resultPossible":  "Concentration associée à un possible risque de toxicité.",
            "resultOk": "Concentration associée à un risque faible de toxicité.",
        },
        "graph":
        {
            "title": "Nomogramme de Rumack et Matthew",
            "toxLine": "Ligne de toxicité (ligne 200)",
            "secondLine": "Ligne de traitement (NAC)",
            "patientSaisi": "Concentration du patient saisie"
        }
    },
    "english": 
    {
        "title":
        {
        "page": "English",
        "main": "English",
        "subTitle": "English",
        "warningBadData": "English"
        },
        "buttons":
        {
         "checkboxLabel": "English",   
         "btnValidation": "English",
         "ingestionTimePlaceholder": "English",
         "paracetamolplaceholder": "English"
        },
        "results":
        {
            "resultProbable": "English",
            "resultPossible":  "English",
            "resultOk": "English"
        },
        "graph":
        {
            "title": "English",
            "toxLine": "English",
            "secondLine": "English",
            "patientSaisi": "English"
        }

    }
}

let graph = new Chart(context, {
    data: 
    {
        datasets: 
        [
            {
            type: 'line',
            label: dataTranslation[currentLangage].graph.toxLine,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgb(75, 192, 192)',
            data: [,200,100,50,25,12.5,6.25]
            },

            {
            type: 'line',
            label: dataTranslation[currentLangage].graph.secondLine,
            borderColor: 'brown',
            backgroundColor: 'brown',
            data: [,150,75,37.5,18.75,9.375,4.6875],
        },
        
        {
            type: 'bubble',
            label: dataTranslation[currentLangage].graph.patientSaisi,
            fill: true,
            backgroundColor: 'rgb(255, 99, 132)',
            data: [{}]
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
                text: dataTranslation[currentLangage].graph.title
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


console.log(dataTranslation[currentLangage].buttons);
// Eventlistener definitions
submitBtn.addEventListener("click", () => {
    paracetamolConcentration = parseFloat(paracetamolConcentrationInput.value);
    timeAfterIngestion = checkValidity(parseFloat(ingestionTimeInput.value)); 

    displayResult(timeAfterIngestion, paracetamolConcentration );
    addData(graph, timeAfterIngestion, paracetamolConcentration );
})

checkBoxAgreement.addEventListener("click", () => {
    if (checkBoxAgreement.value) {
        setNewAttribute(divAgreement, "invisible");
        setNewAttribute(divCalcTox, "visible");
    }
})

btnTranslation.forEach( btn => {
    btn.addEventListener("click", () => {
        currentLangage = btn.dataset.langage;
        changeLangage(currentLangage);
    })
});


// function definitions
function changeLangage(langage) {
    labelAgreement.textContent = dataTranslation[currentLangage].buttons.checkboxLabel;
    ingestionTimeInput.placeholder = dataTranslation[currentLangage].buttons.ingestionTimePlaceholder;
    paracetamolConcentrationInput.placeholder = dataTranslation[currentLangage].buttons.paracetamolplaceholder;
    mainTitle.textContent = dataTranslation[currentLangage].title.main;
    subTitle.textContent = dataTranslation[currentLangage].title.subTitle;
    submitBtn.textContent = dataTranslation[currentLangage].buttons.btnValidation;
}

function addData(chart, time, concentration) {
    chart.data.datasets[2].data[0]= {x:time,y:concentration,r:10};
    chart.update();
}

function checkValidity(number) {
    if(number < DIFFUSION_TIME_IN_BLOOD) {
        setNewAttribute(divMsgError, "visible");
        setNewAttribute(divResult, "invisible");
        return null;
    } else {
        setNewAttribute(divMsgError, "invisible");
        return number;
    }
}

function setNewAttribute(htmlComponent, classAttribute) {
    htmlComponent.setAttribute("class", classAttribute);
}

function displayResult(time, concentration) {
    let exposant = (Math.log10(50) - Math.log10(200)) / 8 * time;
    let result = Math.pow(10,exposant);
    let resultPossible = result * 300;
    let resultProbable = result * 400;


    if(concentration > resultProbable) {
        setNewAttribute(divResult, "visible");
        pResult.textContent = dataTranslation[currentLangage].results.resultProbable;
    } else if (concentration > resultPossible) {
        setNewAttribute(divResult, "visible");
        pResult.textContent = dataTranslation[currentLangage].results.resultPossible ;
    } else if (timeAfterIngestion != null) {
        setNewAttribute(divResult, "visible");
        pResult.textContent = dataTranslation[currentLangage].results.resultOk;
    }
}



