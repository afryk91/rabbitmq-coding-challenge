const { createTopicChannel } = require('amqp-wrapper');
const topicName = 'event_stream';

const logMessage = msg => console.log(`${new Date().toISOString()} [${msg.fields.routingKey}] | ${msg.content.toString()}`);

const assertGeneratedQueue = channel => channel.assertQueue('').then(q => ({channel, queue: q.queue}));

const startConsumingWithCallback = callback => ({channel, queue}) => {
    channel.bindQueue(queue, topicName, 'log.#');
    channel.consume(queue, callback);
}

const init = () => createTopicChannel(process.env.RABBIT_MQ_IP || '172.17.0.2', process.env.RABBIT_MQ_PORT || 5672, topicName)
    .then(assertGeneratedQueue)
    .then(startConsumingWithCallback(logMessage))
    .catch(console.error);

if (require.main === module) {
    init();
} else {
    module.exports = init;
}