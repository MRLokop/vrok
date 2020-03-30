const

    port = 9090,

    { VRok } = require("../../build/index"),
    { NginxUpdater } = require("../../build/api/server/updaters/NginxUpdater"),
    server = new VRok().createNewServer(port);

console.log("Starting server on: " + port);
server.setServerConfigurer().setConfigUpdater(new NginxUpdater());
