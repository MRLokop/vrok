import {VRokServer} from "../VRokServer";

/**
 * Provider to register domain to port
 */
export interface VRokServerUpdater {
    update(vRokServer: VRokServer)
}
