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