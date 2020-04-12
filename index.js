const WebSocket = require('ws');
const amqp = require('amqplib/callback_api');

console.log('== Humidity Module Initiation ==');

function initWebsocketAndRabbit() {

    amqp.connect('amqp://localhost', function(error0, connection) {
        console.log('== RabbitMQ Initiation ==');
        if (error0) {
            console.error(error0);
            return setTimeout(initWebsocketAndRabbit, 1000);
        }

        const wss = new WebSocket.Server({ port: 8080 });

        wss.on('connection', ws => {
            console.log('== Websocket Initiation ==');
            ws.on('message', message => {
                console.log('==== Websocket Message Received ==');
                connection.createChannel(function(error1, channel) {
                    console.log('Buffer', message);
                    if (error1) {
                        throw error1;
                    }
                    var queue = 'humidity';
                    var msg = message;

                    channel.assertQueue(queue, {
                        durable: false
                    });

                    channel.sendToQueue(queue, Buffer.from(msg));
                    console.log(" [x] Sent %s", msg);
                });
            });
        }, err => console.log(err));
    });
}

function main() {
    initWebsocketAndRabbit();
}

main();
