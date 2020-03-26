///  
///  VROK PROJECT
///    Open source ngrok alternative,
///    for self-hosting
///  
///    >> File: src/api/tunnelers/EmptyTunneler.ts
///  
///    License: MIT
///    Repository: https://github.com/TheMRLokopOff/vrok
///  
///    >> Created: 26.03.2020, 07:07:16
///  
///    (c) 2020 «Venity» and «MFSoftware»
///  

import { VRokServerTunneler, VRokClientConnection, VRokServer } from '../server';

export class EmptyTunneler implements VRokServerTunneler {
    private returnData: boolean;
    constructor(returnData: boolean) {
        this.returnData = returnData;
    }
    update(server: VRokServer) { }
    add(tunnel: string, connection: VRokClientConnection, server: VRokServer): boolean {
        return this.returnData;
    }
}