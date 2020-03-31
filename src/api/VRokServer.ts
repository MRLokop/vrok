///  
///  VROK PROJECT
///    Open source ngrok alternative,
///    for self-hosting
///
///    License: MIT
///    Repository: https://github.com/TheMRLokopOff/vrok
///
///    (c) 2020 «Venity» and «MFSoftware»
///

import {createServer, Server as httpServer} from 'http';
import {Server as wsServer} from 'ws';
import chalk = require('chalk');
import {VRokServerConfig} from "./server/VRokServerConfig";
import {VRokServerListener} from "./server/VRokServerListener";
import {VRokServerRouter} from "./server/VRokServerRouter";

export class VRokServer {
    private __serverConfig: VRokServerConfig;
    private __listener: VRokServerListener;

    private __wsServer: wsServer;
    private __httpServer: httpServer;
    private __router: VRokServerRouter;

    constructor(public port: number) {
        this.__serverConfig = new VRokServerConfig(this);
    }

    getServerConfigurer(): VRokServerConfig {
        return this.__serverConfig;
    }


    getListener(): VRokServerListener {
        return this.__listener;
    }

    setListener(listener: VRokServerListener): VRokServerListener {
        return this.__listener = listener;
    }


    getRouter(): VRokServerRouter {
        return this.__router;
    }

    setRouter(router: VRokServerRouter): VRokServerRouter {
        return this.__router = router;
    }

    run() {
        this.__httpServer = createServer(this.ro);
        this.getListener().onHttpCreated(this.__httpServer);

        this.__wsServer = new wsServer({
            server: this.__httpServer
        });
    }

}