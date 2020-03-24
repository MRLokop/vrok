
////
////    VRok
////        Open-Source alternative for fast tunneling local network application
////        like as ssh, web server, game servers and many more
////
////    Repository: https://github.com/TheMRLokopOff/vrok
////        ( License: MIT )
////
////    (c) Venity and MFSoftware   2020
////
////        Coded with <3
////

import { $config, $args, saveConfig } from "./launcher";
import chalk = require('chalk');

if ($args.set !== undefined) {
    for (const prop of Object.keys($args.set)) {
        const value = $args.set[prop];
        $config[prop] = value;
        console.info("Setting property '" + chalk.green(prop) + "' to " + chalk.blue(JSON.stringify(value)))
    }

    console.log()
    console.info(" Changed " + chalk.blue(Object.keys($args.set).length) + " values")
    console.log()
}

// TODO: Add target.[port/host] setting
saveConfig()
