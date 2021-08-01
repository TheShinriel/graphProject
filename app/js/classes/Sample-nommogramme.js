export function addSample(divToAppend) {
    let div = document.createElement("div");
    let inputInterval = document.createElement("input");
    let inputConcentration = document.createElement("input");

    div.classList.add("sample_interval_container");
    inputInterval.classList.add("interval_after_ingestion");
    inputInterval.type = "number";
    inputConcentration.classList.add("interval_paracetamol_concentration");

    div.appendChild(inputInterval);
    div.appendChild(inputConcentration);

    divToAppend.appendChild(div);
}