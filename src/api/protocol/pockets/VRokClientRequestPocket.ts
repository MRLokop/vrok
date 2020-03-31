import {VRokPocket} from "./VRokPocket";

/**
 * Pocket receive from server to client pocket
 *
 * SERVER -> CLIENT [GET]
 */
export abstract class VRokClientRequestPocket extends VRokPocket {
    protected constructor(protected __data: any) {
        super()
    }

    public abstract getData() : any;
}