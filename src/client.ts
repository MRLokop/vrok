import { $config, $args, makeid } from "./launcher";
import { disconnect } from 'cluster';
import * as chalk from 'chalk';

const port = $config.remoteServerPort || 3000;
const host = $config.remoteServerHost || '127.0.0.1';
const targetHost = $args.target || "127.0.0.1";
const targetPort = $args.targetPort || "3030";
console.log('   Connecting to ' + host + ":" + port);
var WebSocketClient = require('websocket').client;

let reconnectEnabled: Boolean;

var client = new WebSocketClient;

const disconnected = error => {
    if (!reconnectEnabled) {
        console.log();
        console.log(chalk`{red Woopse. Your connection is lost.}`);
        console.log('Trying to reconnect..');
        
        reconnectEnabled = true;
    }
    
    setTimeout(() => {
        client.connect(`ws://${host}:${port}/`, 'tunnel');
    }, 1500);
};

client.on('connectFailed', disconnected);
client.on('connect', (connection) => {
    console.log(chalk`   {red VRok} {green connected!}`);
    connection.on('error', disconnected);
    connection.on('close', disconnected);

    connection.on('message', (message) => {
        const data = JSON.parse(message.type === 'utf8' ? message.utf8Data : console.error("Binary data", message) as any || "{}");
        switch (data['type']) {
            case "set-tunnel-id":
                console.log(chalk`     Using tunnel id: {yellow ${data['tunnel']}}`)
                console.log(chalk`     {yellow ${data['tunnel']}.${data['domain']}}  -- > {yellow ${targetHost}:${targetPort}} `/*"     " + data['tunnel'] + "." + data['domain'] + "  -- >  " + targetHost + ":" + targetPort*/)
                break;
            case "set-tunnel-fail":
                console.log("     Failed to reserve tunnel '" + data['tunnel'] + "'")
                console.log("       Already in use!")
                process.exit(1)
                break;
        }
    });
    
    connection.sendUTF(JSON.stringify({
        type: 'get-tunnel-id',
        tunnel: $args['tunnel'] || makeid(10)
    }));
});

client.connect(`ws://${host}:${port}/`, 'tunnel');
