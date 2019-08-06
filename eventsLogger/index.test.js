const amqp = require('amqp-wrapper');
const initConsumer = require('./index');

jest.mock('amqp-wrapper');

const channelStub = {
    assertQueue: jest.fn(() => Promise.resolve({queue: 'queue-id'})),
    bindQueue: jest.fn(() => {}),
    consume: jest.fn(() => {})
}

describe('Queue logger', () => {
    it('should connect to given host and start consuming from given topic', () => {
        amqp.createTopicChannel.mockResolvedValue(channelStub);
        return initConsumer().then(() => {
            expect(channelStub.assertQueue).toBeCalled();
            expect(channelStub.bindQueue).toHaveBeenCalledWith('queue-id', 'event_stream', 'log.#');
            expect(channelStub.consume).toHaveBeenCalledWith('queue-id', expect.any(Function));
        });
    });
});