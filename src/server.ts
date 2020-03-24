
////
////    VRok
////        Open-Source alternative for fast tunneling local network application
////        like as ssh, web server, game servers and many more
////
////    Repository: https://github.com/TheMRLokopOff/vrok
////        ( License: MIT )
////
////    (c) Venity and MFSoftware   2020
////
////        Coded with <3
////

import { $config } from "./launcher";
import * as chalk from '../node_modules/chalk';

const tunnels: any = {};
let id = 0;

const port = $config.serverPort || 3000;
const WebSocketServer = require('websocket').server;
const http = require('http');

const server = http.createServer((request, response) => {
    // On http connect (browser)
    response.send("VRok - Free ngrok alternative")
    response.end();
});

if (!$config.domain) {
    console.log("   Failed to start VRok!")
    console.log("   Please define domain")
    console.log("   Using:")
    console.log("    vrok config --domain \"[enter domain here]\"")

    throw new Error();
}

server.listen(port, () => {
    console.log('   Server is listening on port ' + port);
});

const wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

// On incoming request
wsServer.on('request', (request) => {

    let cid = id++;
    console.log('    [' + cid + '] Connection: ' + request.host);

    const
        connection = request.accept('tunnel', request.origin),
        client = new ClientConnection(connection, cid);

    connection.on('message', (message) => {
        const data = JSON.parse(message.type === 'utf8' ? message.utf8Data : console.error("Binary data", message) as any || "{}");
        client.handleMessage(data);
    });

    connection.on('close', (reasonCode: number, description: string) => {
        client.handleClose(reasonCode, description);
    });
});


// TODO: Add nginx config template

export class ClientConnection {
    /**
     * Websocket connection
     */
    private connection: any;
    /**
     * Client login step
     */
    private step = "connection";
    /**
     * Tunnel id
     */
    private tunnel: string;
    /**
     * uniqure client id
     */
    private client_id: number;

    constructor(connection: any, cid: number) {
        this.connection = connection;
        this.client_id = cid;
    }

    /**
     * Deserialize and send data to client
     */
    send(data: Object) {
        this.connection.sendUTF(JSON.stringify(data));
    }

    /**
     * handle message
     * @param data 
     */
    handleMessage(data: any) {
        switch (data['type']) {
            case "get-tunnel-id":
                /// Reserve tunnel
                if (tunnels[data["tunnel"]] === undefined) {
                    //// Registering new tunnel
                    this.tunnel = data["tunnel"];
                    tunnels[this.tunnel] = this;

                    this.send({
                        type: "set-tunnel-id",
                        tunnel: this.tunnel,
                        domain: $config.domain
                    })

                    // TODO: Add socket server (not websocket, just socket)
                } else {
                    //// Tunnel already in use
                    this.send({
                        type: "set-tunnel-fail",
                        tunnel: data["tunnel"]
                    })
                }
                break;
        }

    }

    /**
     * Handle close connection
     * @param reasonCode close code
     * @param description close descriotion
     */
    handleClose(reasonCode: number, description: string) {
        console.log("    [" + this.client_id + "]  Connection closed: '" + description + "'  (" + reasonCode + ")")
    }

    /**
     * Get websocket connection
     */
    getConnection(): any {
        return this.connection;
    }

    /**
     * Get client id
     */
    getId(): number {
        return this.client_id;
    }

    /**
     * Get tunnel
     */
    getTunnel(): string {
        return this.tunnel;
    }
}

/**
 * Create a template-str
 */
let template = (client: ClientConnection) => {
    let tunnel = client.getTunnel();
    return `server {
        stream {
            upstream tunnel_#{${tunnel}} {
              least_conn;
              server 127.0.0.1:${2222};
            }
          }
          
          server {
              listen     80;
              server_name ${tunnel}.${$config.domain};
              proxy_pass tunnel_${tunnel};
          }
    }`;

    ///
    /// -> server_name = test.tunnel.venity.site
    ///
    ///
}

function reloadConfiguration() {
    if (!$config.server_module) {
        console.log(chalk.yellow("W") + "  " + chalk.red("Failed to reload config: 'property server_module is undefined'"))
        return;
    }

    let config = "";
    for (const tunnel of Object.keys(tunnels)) {
        const client: ClientConnection = tunnels[tunnel];
        config += template(client) + "\n";
    }

    console.log(config)
}