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
import { VRokServer } from "./api/VRokServer";

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
     * @param eventListener callback
     */
    createNewServer(port: number): VRokServer {
        return new VRokServer(port);
    }
}
