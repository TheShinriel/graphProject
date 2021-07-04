
let submit = document.querySelector('.calc_data');
let ingestionTime = document.querySelector('.time_after_ingestion');
let paracetamolConcentration = document.querySelector('.paracetamol_concentration');

let testData1 = 11;
let testData2 = 21;

let context = document.querySelector('.graph');


let graph = new Chart(context, {
    data: {
        datasets: [{
            type: 'line',
            label: 'Ligne de tox',
            data: [,200,100,50,25,12.5,6.25]
        }, {
            type: 'line',
            label: 'Ligne de traitement',
            data: [,150,75,37.5,18.75,9.375,4.6875],
        }, {
            type: 'bubble',
            label: 'calcul',
            data: [{
                x: 11,
                y: 33,
                r: 5
            }]
        }
    ],
        labels: [0,4,8,12,16,20,24]
    
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Zone d\'éfficacité de l\'antidote'
            }
        },
        scales: {
            x: {
                display: true,
                min:0,
                max:25,
                type: 'linear'
            },
            y: {
                min:0,
                max:600,
                display: true,
                type: 'logarithmic'
            }
        }
    }
});


//submit.addEventListener("click", () => {
//    console.log(dataOne.value);
//    addData(myChart, "votes", dataOne.value)
//})




//function addData(chart, label, data) {
//    chart.data.labels.push(label);
//    chart.data.datasets.forEach((dataset) => {
//        dataset.data.push(data);
//    });
//    chart.update();
//}


