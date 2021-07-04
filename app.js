
const DIFFUSION_TIME_IN_BLOOD = 4;

let divAgreement = document.querySelector('.agreement');
let divCalcTox = document.querySelector('.calc_tox');
let divMsgError = document.querySelector('.alertBadData');
let submitBtn = document.querySelector('.calc_data');
let checkBoxAgreement = document.querySelector('input[id="accept_agreement"]');
let ingestionTimeInput = document.querySelector('.time_after_ingestion');
let paracetamolConcentrationInput = document.querySelector('.paracetamol_concentration');
let context = document.querySelector('.graph');

let timeAfterIngestion;
let paracetamolConcentration;

// TESSSSSSSSSSSSSSSSST
// TESSSSSSSSSSSSSSSSSSSSST



let graph = new Chart(context, {
    data: 
    {
        datasets: 
        [
            {
            type: 'line',
            label: 'Ligne de toxicité (ligne 200)',
            data: [,200,100,50,25,12.5,6.25]
            },

            {
            type: 'line',
            label: 'Ligne de traitement (NAC)',
            data: [,150,75,37.5,18.75,9.375,4.6875],
            },

            {
            type: 'bubble',
            label: 'Concentration du patient saisie',
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
                text: 'Nomogramme de Rumack et Matthew'
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

submitBtn.addEventListener("click", () => {
    paracetamolConcentration = parseFloat(paracetamolConcentrationInput.value);
    timeAfterIngestion = checkValidity(parseFloat(ingestionTimeInput.value)); 

    displayResult(timeAfterIngestion, paracetamolConcentration );
    addData(graph, timeAfterIngestion, paracetamolConcentration );
})

checkBoxAgreement.addEventListener("click", () => {
    if (checkBoxAgreement.value) {
        divAgreement.setAttribute("class", "invisible");
        divCalcTox.setAttribute("class", "visible");
    }
})

function addData(chart, time, concentration) {
    chart.data.datasets[2].data[0]= {x:time,y:concentration,r:10};
    chart.update();
}

function checkValidity(number) {
    if(number < DIFFUSION_TIME_IN_BLOOD) {
        divMsgError.setAttribute("class", "visible");
        return null;
    } else {
        divMsgError.setAttribute("class", "invisible");
        return number;
    }
}

function displayResult(time, concentration) {
    let result = Math.pow(0.840897, time);
    let resultPossible = result * 300;
    let resultProbable = result * 400;

    if(concentration > resultProbable) {
        console.log("Toxicité hépatique probable. Envisager la mise en place de NAC");
    } else if (concentration > resultPossible) {
        console.log("Toxicité hépatique possible");
    } else {
        console.log("Pas d'hépatotoxicité");
    }
}
