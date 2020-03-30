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
 * Provider to register domain to port
 */
export interface VRokServerUpdater {
    update(vRokServer: VRokServer)
}
