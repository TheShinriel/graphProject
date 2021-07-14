export default class Calculs {


    static calcHalfLife(nbre1, nbre2, duree) 
    {
        let Ke = (Math.log(nbre1) - Math.log(nbre2)) / duree;
        let halfLife =  Math.log(2) / Ke;
        
        return halfLife.toFixed(1);
    }

    static calcToxicity(time) {
       let exposant = Calculs.defineExposant(time);
       let toxicity = Calculs.defineToxicity(exposant); 
       return toxicity;
    }

    static calcToxicityPossible (toxicity) {
        return toxicity * 300;
    }

    static calcToxicityProbable (toxicity) {
        return toxicity * 400;
    }

    static defineExposant(time) {
        return (Math.log10(50) - Math.log10(200)) / 8 * time;
    }
    
    static defineToxicity(exposant) {
        return Math.pow(10,exposant);
    }
    
    
}
