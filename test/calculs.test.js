//import * as Calcs from '../app/js/classes/calculs.js';
 const Calculs = require('../app/js/classes/Calculs');


test('defineExposant ', () => {
    expect(Calculs.defineExposant(4)).toBe(-0.30102999566398125);
});
