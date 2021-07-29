export function calcHalfLife(nbre1, nbre2, duree) 
{
    let Ke = (Math.log(nbre1) - Math.log(nbre2)) / duree;
    let halfLife =  Math.log(2) / Ke;
    
    return halfLife.toFixed(1);
}

export function calcToxicity(time) {
    let exposant = defineExposant(time);
    let toxicity = defineToxicity(exposant); 
    return toxicity;
}

export function calcToxicityPossible (toxicity) {
    return toxicity * 300;
}

export function calcToxicityProbable (toxicity) {
    return toxicity * 400;
}

export function calcToxicityProbableWithRisk (toxicity) {
    return toxicity * 200;
}

export function defineExposant(time) {
    return (Math.log10(50) - Math.log10(200)) / 8 * time;
}

export function defineToxicity(exposant) {
    return Math.pow(10,exposant);
}

export function calcDoseParacetamol(weight,dose){
    return (dose * 1000 / weight).toFixed(0);
}