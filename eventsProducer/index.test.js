const producer = require('./index');

const channelStub = {
    publish: jest.fn(() => true)
}

describe('Random events producer', () => {
    it('should publish random event through given channel to given topic', () => {
        producer.sendRandomEvent(channelStub, 'dummy');
        expect(channelStub.publish).toHaveBeenCalledWith('dummy', expect.any(String), expect.any(Buffer));
    });

    it('should send events with default interval', () => {
        jest.useFakeTimers();

        producer.sendEventsWithInterval(channelStub);
        expect(channelStub.publish).toHaveBeenCalledTimes(1);
        jest.advanceTimersByTime(100);
        expect(channelStub.publish).toHaveBeenCalledTimes(1);
        jest.advanceTimersByTime(1000);
        expect(channelStub.publish).toHaveBeenCalledTimes(2);
        jest.advanceTimersByTime(1000);
        expect(channelStub.publish).toHaveBeenCalledTimes(3);

        jest.clearAllTimers();
    });
});