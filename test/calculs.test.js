//import * as Calcs from '../app/js/classes/calculs.js';
const Calculs = require('../app/js/classes/Calculs');

test("l'exposant de 4 est -0.30102999566398125", () => {
    expect(Calculs.default.defineExposant(4)).toBe(-0.30102999566398125);
});

test("la toxicité pour un exposant de 5 est de 0.4204482076268572", () => {
    let exposant = Calculs.default.defineExposant(5);
    expect(Calculs.default.defineToxicity(exposant)).toBe(0.4204482076268572);
});

test("la toxicité possible pour 1 est de 300", () => {
    expect(Calculs.default.calcToxicityPossible(1)).toBe(300);
});

test("la toxicité probable pour 1 est de 400", () => {
    expect(Calculs.default.calcToxicityProbable(1)).toBe(400);
});

test("la toxicité pour 5 est de 0.4204482076268572", () => {
    expect(Calculs.default.calcToxicity(5)).toBe(0.4204482076268572);
});

test("la demi-vie pour un prélèvement à 150mg/L puis 130mg/L à 4H d'intervalle est de 19,4H", () => {
    expect(Calculs.default.calcHalfLife(150, 130, 4)).toBe("19.4");
});

test("la dose en mg/kg pour un patient de 50kg prélevé à 20g est de 400mg/kg", () => {
    expect(Calculs.default.calcDoseMgKg(50, 20)).toBe("400");
});

