const wrapper = require('./index');
const amqp = require('amqplib');
jest.mock('amqplib');

const channelStub = {
    assertExchange: jest.fn()
}

const connectionStub = {
    createChannel: jest.fn().mockResolvedValue(channelStub)
}

describe('amqp-wrapper', () => {
   it('should handle connection and topic creation', () => {
        amqp.connect.mockResolvedValue(connectionStub);
        return wrapper.createTopicChannel('127.0.0.1', 12345, 'dummy')
            .then((channel) => {
                expect(amqp.connect).toHaveBeenCalledWith('amqp://127.0.0.1:12345');
                expect(connectionStub.createChannel).toBeCalled();
                expect(channelStub.assertExchange).toHaveBeenCalledWith('dummy', 'topic');
                expect(channel).toEqual(channelStub);
            });
   });
});
