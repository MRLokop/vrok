import { $config } from "./launcher";
import * as pug from 'pug';
import * as chalk from '../node_modules/chalk';

const tunnels: any = {};
let id = 0;

const port = $config.serverPort || 3000;
const WebSocketServer = require('websocket').server;
const http = require('http');

const nginxTemplateFunction = pug.compile(`server {
    stream {
        upstream tunnel_#{tunnel} {
          least_conn;
          server 127.0.0.1:#{port};
        }
      }
      
      server {
          listen     80;
          server_name #{tunnel}.#{domain};
          proxy_pass tunnel_#{tunel};
      }
}
`);

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


export class ClientConnection {
    private connection: any;
    private step = "connection";
    private tunnel;
    private client_id: number;

    constructor(connection: any, cid: number) {
        this.connection = connection;
        this.client_id = cid;
    }

    send(data: any) {
        this.connection.sendUTF(JSON.stringify(data));
    }

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


    handleClose(reasonCode: number, description: string) {
        console.log("    [" + this.client_id + "]  Connection closed: '" + description + "'  (" + reasonCode + ")")
    }

    getConnection(): any {
        return this.connection;
    }

    getId(): number {
        return this.client_id;
    }
    
    getTunnel(): string {
        return this.tunnel;
    }
}


let template = (client: ClientConnection) => {
    return nginxTemplateFunction({
        tunnel: client.getTunnel(),
        domain: $config.domain,
        port: 2222
    });

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