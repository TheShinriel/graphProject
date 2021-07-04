
let submitBtn = document.querySelector('.calc_data');
let divAgreement = document.querySelector('.agreement');
let divCalcTox = document.querySelector('.calc_tox') 
let checkBoxAgreement = document.querySelector('input[id="accept_agreement"]');
let ingestionTimeInput = document.querySelector('.time_after_ingestion');
let paracetamolConcentrationInput = document.querySelector('.paracetamol_concentration');
let timeAfterIngestion = 15;
let paracetamolConcentration = 180;

console.log(divCalcTox);

let context = document.querySelector('.graph');



let graph = new Chart(context, {
    data: 
    {
        datasets: 
        [
            {
            type: 'line',
            label: 'Ligne de tox',
            data: [,200,100,50,25,12.5,6.25]
            },

            {
            type: 'line',
            label: 'Ligne de traitement',
            data: [,150,75,37.5,18.75,9.375,4.6875],
            },

            {
            type: 'bubble',
            label: 'calcul',
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
                text: 'Zone d\'éfficacité de l\'antidote'
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
    paracetamolConcentration = parseInt(paracetamolConcentrationInput.value);
    timeAfterIngestion = parseInt(ingestionTimeInput.value); 
    addData(graph, timeAfterIngestion, paracetamolConcentration )
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

