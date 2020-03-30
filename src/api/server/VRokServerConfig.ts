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
import {VRokServerUpdater} from "./VRokServerUpdater";

export class VRokServerConfig {
    /// FIELDS
    private __configUpdater: VRokServerUpdater | undefined;
    private __server: VRokServer;

    /// CONSTRUCTOR
    constructor(server) {
        this.__server = server;
    }

    /// Server
    getServer(): VRokServer {
        return this.__server;
    }

    /// Config Updater
    getConfigUpdater(): VRokServerUpdater | undefined {
        return this.__configUpdater;
    }
    setConfigUpdater(configUpdater: VRokServerUpdater | undefined): VRokServerUpdater | undefined {
        return this.__configUpdater = configUpdater;
    }

    ///
}
