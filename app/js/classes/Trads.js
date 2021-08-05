import french from "../../lang/french.js";
import english from "../../lang/english.js";
let languages = {"french": french, "english": english};

export default {

    "changeLanguage": function changeLanguage(language) {
        let regexForResultText = /result/;
        document.querySelectorAll(".i18n").forEach( element => {
            let textID = element.dataset.text;
            if(regexForResultText.test(element.className)) {
                element.innerText = "";
            } else if(element.placeholder != null && element.dataset.text != null) {
                element.placeholder = languages[language][textID];
            } else if(element.dataset.text != null) {
                element.innerText = languages[language][textID];
            } 
        })        
    },
    "changeGraphLanguage": function changeGraphLanguage(graph, currentLanguage) {
        graph.data.datasets.forEach( dataset => {
            if(dataset.labelName !== null && dataset.labelName !== undefined) {
                dataset.label = languages[currentLanguage][dataset.labelName];
            }
        });
        graph.options.plugins.title.text = languages[currentLanguage][graph.options.plugins.title.textName];
        graph.update();
    }
}

