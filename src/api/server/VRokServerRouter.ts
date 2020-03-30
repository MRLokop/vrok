import {VRokServerListener} from "./VRokServerListener";
import {IncomingMessage, ServerResponse} from 'http';

export abstract class VRokServerRouter {
    protected constructor(protected server: VRokServerListener) { }
    abstract route(req: IncomingMessage, res: ServerResponse)
}