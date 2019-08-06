const utils = require('../src/utils');

describe('Random events util', () => {
    it('should generate event with type chosen from given array', () => {
        const types = ['a', 'b', 'c'];
        const event = utils.createRandomEvent(types);
        expect(types).toContain(event.type);
    });

    it('should generate event matching schema', () => {
        const types = ['a', 'b', 'c'];
        const event = utils.createRandomEvent(types);
        expect(event).toHaveProperty('type');
        expect(event).toHaveProperty('data');
    });
});