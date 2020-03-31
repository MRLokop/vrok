import {VRokPocket} from "./VRokPocket";

/**
 * Pocket receive from server to client pocket
 *
 * SERVER -> CLIENT [SEND]
 */
export abstract class VRokServerPocket extends VRokPocket {

    public abstract getClientPocketName() : string;
    public abstract getSendData() : any;

}