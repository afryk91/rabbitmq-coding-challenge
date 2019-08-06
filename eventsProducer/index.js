const { createTopicChannel } = require('amqp-wrapper');
const utils = require('./src/utils');

const topicName = 'event_stream';

const productionInterval = process.env.PRODUCTION_INTERVAL || 1000;
const isRunningFromCli = require.main === module;
const eventTypes = ['temperature', 'pressure', 'humidity', 'speed'];


const sendRandomEvent = (channel, topic) => {
    const {type, data} = utils.createRandomEvent(eventTypes);
    return channel.publish(topic, `log.${type}`, Buffer.from(data));
}

const sendEventsWithInterval = channel => setInterval(() => sendRandomEvent(channel, topicName), productionInterval);

if (isRunningFromCli) {
    createTopicChannel(process.env.RABBIT_MQ_IP || '172.17.0.2', process.env.RABBIT_MQ_PORT || 5672, topicName)
        .then(sendEventsWithInterval)
        .catch(console.error);
} else {
    module.exports = {
        sendRandomEvent,
        sendEventsWithInterval
    }
}