import { changeLanguage } from "./utils/Trads"
import { defaultLanguage } from "./available-languages"

window.currentLanguage = defaultLanguage
const btnTranslation =
  document.querySelectorAll<HTMLButtonElement>(".translation__btn")

changeLanguage(window.currentLanguage)

btnTranslation.forEach((btn) => {
  btn.addEventListener("click", () => {
    window.currentLanguage = btn.dataset.language || defaultLanguage
    changeLanguage(window.currentLanguage)
  })
})
