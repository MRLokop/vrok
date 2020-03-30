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

/**
 * Listener
 */
export interface VRokServerListener {
    onHttpCreated(http: any)
    onWSCreated(ws: any)

    onConnection(connection: any)
}