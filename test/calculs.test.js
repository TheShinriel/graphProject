//import * as Calcs from '../app/js/classes/calculs.js';
const Calculs = require('../app/js/classes/calculs');


test('addNumbers ', () => {
    expect(Calculs.defineExposant(4)).toBe(3);
});
