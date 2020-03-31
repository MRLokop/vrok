import {VRokPocket} from "./VRokPocket";

/**
 * Pocket receive from client to server pocket
 *
 * CLIENT -> SERVER [GET]
 */
export abstract class VRokServerRequestPocket extends VRokPocket {
    public abstract getData() : any;
}