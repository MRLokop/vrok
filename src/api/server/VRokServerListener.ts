/**
 * Listener
 */
export interface VRokServerListener {
    onHttpCreated(http: any)
    onWSCreated(ws: any)

    onConnection(connection: any)
}