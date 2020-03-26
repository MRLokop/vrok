
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

import { VRokServer } from "./api/server";

/**
 * Main class for work with VRok
 * 
 * @package vrok
 * @author Venity & MFSoftware
 * @copyright Venity & MFSoftware
 */
export class VRok {
    /**
     * Just constructor
     * Nothing interesting here
     */
    constructor() { /* SOME THING INTERESTING HERE */ }

    /**
     * 
     * @param port server port
     * @param domain server domain
     */
    createNewServer(port, domain): VRokServer {
        return new VRokServer(port, domain);
    }
}
