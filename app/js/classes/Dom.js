const resultClassNames = ['success', 'error'];

export function addClass(htmlElement, className) {
    removeClasses(htmlElement)
    htmlElement.classList.add(className)
}

export function hideHtmlElement(htmlElement) {
    htmlElement.classList.add("hidden");
}

export function  showHtmlElement(htmlElement) {
    htmlElement.classList.remove("hidden");
}

function removeClasses(htmlElement) {
    resultClassNames.forEach(resultClassName => {
        htmlElement.classList.remove(resultClassName);
    });
}
