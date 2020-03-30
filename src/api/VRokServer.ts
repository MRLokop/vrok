///  
///  VROK PROJECT
///    Open source ngrok alternative,
///    for self-hosting
///  
///    >> File: src/api/server.ts
///  
///    License: MIT
///    Repository: https://github.com/TheMRLokopOff/vrok
///  
///    >> Created: 26.03.2020, 07:07:35
///  
///    (c) 2020 «Venity» and «MFSoftware»
///  

import * as http from 'http';
import { Server } from 'ws';
import chalk = require('chalk');
import {VRokServerConfig} from "./server/VRokServerConfig";

export class VRokServer {
    private port: number;
    private __serverConfig: VRokServerConfig;

    constructor(port: number) {
        this.__serverConfig = new VRokServerConfig(this);
        this.port = port;
    }

    setServerConfigurer() : VRokServerConfig {
        return this.__serverConfig;
    }

    run() {

    }
}

export interface VRokServerListner {
    onHttpCreated(http: any)
    onWSCreated(ws: any)

    onConnection(connection: any)
}