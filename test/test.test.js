const tests = require('../app/js/decouverte.js');

test('addNumbers ', () => {
    expect(tests.addNumbers(2,1)).toBe(3);
});

test('Un patient prévelé avec a +4h et avec une concentration de 250 doit avoir une valeur de 1', () => {
    expect(tests.substractNumbers(2,1)).toBe(1);
})