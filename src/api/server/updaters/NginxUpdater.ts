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