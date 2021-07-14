//import * as Calcs from '../app/js/classes/calculs.js';
import Calculs from "./classes/calculs.js";



test('addNumbers ', () => {
    expect(Calculs.calcHalfLife(2,1)).toBe(3);
});
