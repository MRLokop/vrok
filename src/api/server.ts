
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

import * as http from 'http';
import { server as WebSocketServer } from 'websocket';
import chalk = require('chalk');

export class VRokServer {
    private server: any;
    private wsServer: any;
    private tunnels: any = {};
    private tunneler: VRokServerTunneler;
    private clientIds = 0;
    private domain: string;

    constructor(port: number, domain: string) {
        this.domain = domain;
        this.server = http.createServer((request, response) => {
            // On http connect (browser)
            response.write("<h1><b>VRok</b> - Free ngrok alternative</h1>")
            response.end();
        });

        this.server.listen(port, () => {
            console.log('   Server is listening on port ' + chalk.green(port));
        });

        this.wsServer = new WebSocketServer({
            httpServer: this.server,
            autoAcceptConnections: false
        });

        // On incoming request
        this.wsServer.on('request', (request) => {

            let cid = this.clientIds++;

            const
                connection = request.accept('tunnel', request.origin),
                client = new VRokClientConnection(this, connection, cid);

            console.log('    ' + client.getPrintableClientId() + ' Connection: ' + request.host);

            connection.on('message', (message) => {
                const data = JSON.parse(message.type === 'utf8' ? message.utf8Data : console.error("Binary data", message) as any || "{}");
                client.handleMessage(data);
            });

            connection.on('close', (reasonCode: number, description: string) => {
                client.handleClose(reasonCode, description);
            });
        });

    }

    /**
     * Check is tunnel registered
     * @param tunnel name
     */
    hasTunnel(tunnel: string): boolean {
        return this.tunnels[tunnel] !== undefined;
    }

    /**
     * Get Client Connection by tunnel name
     * @param tunnel name
     */
    getTunnel(tunnel: string): VRokClientConnection {
        return this.tunnels[tunnel];
    }

    /**
     * Return tunnels
     */
    getTunnels(): any {
        return this.tunnels
    }

    /**
     * Get server domain
     */
    getDomain() : string {
        return this.domain
    }

    /**
     * Get Tunneller
     */
    getTunneller() : VRokServerTunneler {
        return this.tunneler;
    }

    /**
     * Set tunneler
     */
    setTunneler(tunneler: VRokServerTunneler) {
        this.tunneler = tunneler;
        this.updateTunnels()
    }

    updateTunnels() {
        this.tunneler.update(this)
    }
}

/**
 * Server configuration updater
 */
export interface VRokServerTunneler {
    
    /**
     * Add tunnel
     * @param tunnel name
     * @param connection client connection
     * @param server vrok server
     */
    add(tunnel: string, connection: VRokClientConnection, server: VRokServer) : boolean;

    /**
     * Update all exists tunnels
     * @param server vrok server
     */
    update(server: VRokServer);

}

// TODO: Add nginx config template

export class VRokClientConnection {

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

    /**
     * VRok Server 
     */
    private server: VRokServer;

    constructor(server: VRokServer, connection: any, cid: number) {
        this.server = server;
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
                if (!this.server.hasTunnel[data.tunnel]) {
                    //// Registering new tunnel
                    this.tunnel = data["tunnel"];
                    this.server.getTunnels[this.tunnel] = this;

                    /** Send tunnel update */
                    this.send({
                        type: "set-tunnel-id",
                        tunnel: this.tunnel,
                        domain: this.server.getDomain()
                    })

                    console.log('    ' + this.getPrintableClientId() + ' Setup tunnel: ' + this.tunnel);


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
        console.log("    " + this.getPrintableClientId() + "  Connection closed: '" + description + "'  (" + reasonCode + ")")
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

    /**
     * Get printable client id
     */
    getPrintableClientId(color = "green") {
        return chalk.gray("[ " + chalk[color](this.client_id) + " ]")
    }
}