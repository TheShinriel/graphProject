import french from "../../lang/french.js";
import english from "../../lang/english.js";
let languages = {"french": french, "english": english};

export default {

    "changeLanguage": function changeLanguage(language) {
        document.querySelectorAll(".i18n").forEach( element => {
            let textID = element.dataset.text;
            if(element.placeholder != null && element.dataset.text != null) {
                element.placeholder = languages[language][textID];
            } else if(element.dataset.text != null) {
                element.innerText = languages[language][textID];
            } 
        })
    }
}

