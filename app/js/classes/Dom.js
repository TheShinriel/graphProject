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

export function  toggleClassNames(htmlElement, classes) {
    Object.entries(classes).forEach(([className, toggleValue]) => {
        htmlElement.classList.toggle(className, toggleValue);
    })
}

function removeClasses(htmlElement) {
    resultClassNames.forEach(resultClassName => {
        htmlElement.classList.remove(resultClassName);
    });
}
