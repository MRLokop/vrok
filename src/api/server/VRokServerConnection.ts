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

import {VRokServer} from "../VRokServer";

/**
 * Connection to server instance
 */
export class VRokServerConnection {

    // TODO: Implement Connection Class

    constructor(
        public readonly server: VRokServer,
        public readonly wsConnection: any,
    ) {

    }

}