import {VRokPocket} from "./VRokPocket";

/**
 * Pocket send from client to server pocket
 *
 * CLIENT -> SERVER [SEND]
 */
export abstract class VRokClientPocket extends VRokPocket {

    public abstract getServerPocketName() : string;
    public abstract getSendData() : any;

}