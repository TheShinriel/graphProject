export function createEl(tag, attrs) {
  const htmlElement = document.createElement(tag)
  Object.entries(attrs).forEach(([name, value]) => (htmlElement[name] = value))
  return htmlElement
}

export function hideHtmlElement(htmlElement) {
  htmlElement.classList.add("hidden")
}

export function showHtmlElement(htmlElement) {
  htmlElement.classList.remove("hidden")
}

export function toggleClassNames(htmlElement, classes) {
  Object.entries(classes).forEach(([className, toggleValue]) => {
    htmlElement.classList.toggle(className, toggleValue)
  })
}

export function getSuccessOrErrorClass(isToxic) {
  return {
    success: !isToxic,
    error: isToxic,
  }
}
