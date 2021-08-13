import * as Calcs from '../app/js/classes/Calculs.js';

test("l'exposant de 4 est -0.30102999566398125", () => {
    expect(Calcs.defineExposant(4)).toBe(-0.30102999566398125);
});

test("la toxicité pour un exposant de 5 est de 0.4204482076268572", () => {
    let exposant = Calcs.defineExposant(5);
    expect(Calcs.defineToxicity(exposant)).toBe(0.4204482076268572);
});

test("la toxicité possible pour 1 est de 300", () => {
    expect(Calcs.calcToxicityPossible(1)).toBe(300);
});

test("la toxicité probable pour 1 est de 400", () => {
    expect(Calcs.calcToxicityProbable(1)).toBe(400);
});

test("la toxicité pour 5 est de 0.4204482076268572", () => {
    expect(Calcs.calcToxicity(5)).toBe(0.4204482076268572);
});

test("la demi-vie pour un prélèvement à 150mg/L puis 130mg/L à 4H d'intervalle est de 19,4H", () => {
    expect(parseFloat(Calcs.calcHalfLife(150, 130, 4))).toBe(19.4);
});

test("la dose en mg/kg pour un patient de 50kg prélevé à 20g est de 400mg/kg", () => {
    expect(Calcs.calcDoseParacetamol(50, 20)).toBe("400");
});

test("1 µmol/l vaut 0.1131 mg/l", () => {
    expect(Calcs.convertMicromolesToMilligrames(1)).toBe(0.1131);
});

test("le calcul du nombre d'heures entre deux dates fonctionne", () => {
    let currentDate = new Date(), currentDatePlus1H = new Date()
    currentDatePlus1H.setHours(currentDatePlus1H.getHours() + 1);
    expect(Calcs.calcTimeBetweenTwoDatesInHour(currentDate, currentDatePlus1H)).toBe(-1);
});
