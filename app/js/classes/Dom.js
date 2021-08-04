let styleResults = ['good', 'bad'];

export function addStyleResult(htmlElement, style) {
    removeStyleResult(htmlElement)
    htmlElement.classList.add(style)
}

export function hideDiv(htmlElement) {
    htmlElement.classList.remove("visible");
    htmlElement.classList.add("invisible");
}

export function  displayDiv(htmlElement) {
    htmlElement.classList.remove("invisible");
    htmlElement.classList.add("visible");
}

function removeStyleResult(htmlElement) {
    styleResults.forEach(element => {
        htmlElement.classList.remove(element);
    });
}
