const amqp = require('amqplib');

function createTopicChannel(rabbitMqIp, rabbitMqPort, topicName) {
    return amqp.connect(`amqp://${rabbitMqIp}:${rabbitMqPort}`)
        .then(connection => connection.createChannel())
        .then(channel => {
            channel.assertExchange(topicName, 'topic');
            return channel;
        });
}

module.exports = {
    createTopicChannel
}