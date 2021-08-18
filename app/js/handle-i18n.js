import Trads from "../js/classes/Trads.js";
import { defaultLanguage } from './available-languages.js'

window.currentLanguage = defaultLanguage;
const btnTranslation = document.querySelectorAll('.btn_translation');

Trads.changeLanguage(currentLanguage);

btnTranslation.forEach(btn => {
  btn.addEventListener('click', () => {
      window.currentLanguage = btn.dataset.language;
      Trads.changeLanguage(currentLanguage);
  })
})