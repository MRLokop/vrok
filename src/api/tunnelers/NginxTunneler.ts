///  
///  VROK PROJECT
///    Open source ngrok alternative,
///    for self-hosting
///  
///    >> File: src/api/tunnelers/NginxTunneler.ts
///  
///    License: MIT
///    Repository: https://github.com/TheMRLokopOff/vrok
///  
///    >> Created: 26.03.2020, 07:07:22
///  
///    (c) 2020 «Venity» and «MFSoftware»
///  

import { VRokServerTunneler, VRokClientConnection, VRokServer } from '../server';

export class NginxTunneler implements VRokServerTunneler {
    // TODO: Implement config updater
    update(server: VRokServer) {
        throw new Error("Method not implemented.");
    }
    add(tunnel: string, connection: VRokClientConnection, server: VRokServer): boolean {
        return false;
    }
}