
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