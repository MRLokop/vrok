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

/**
 * Listener
 */
export interface VRokServerListener {
    onHttpCreated(http: httpServer)
    onWSCreated(ws: any)

    onConnection(connection: any)

    onRequest();
}