import {VRokServerPocket} from "../VRokServerPocket";

export class VRokServerGetTokenPocket extends VRokServerPocket {

    constructor() {
        super();
    }

    getClientPocketName(): string {
        return "GetTokenRequest";
    }

    getSendData(): any {
    }

}