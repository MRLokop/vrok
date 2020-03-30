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

import {VRokServerUpdater} from "../VRokServerUpdater";
import {VRokServer} from "../../VRokServer";

/**
 * Create NGINX server updater realisation
 * @internal
 */
export class NginxUpdater implements VRokServerUpdater {
    /**
     *
     * @param serverName
     */
    constructor(serverName) {

    }

    update(vRokServer: VRokServer) {
        console.log(vRokServer);
    }
}