
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

import { $config, $args, saveConfig } from "../launcher";
import * as chalk from 'chalk';

export const $tasks = [
    {
        "id": "client",
        "description": "Launch Client task",
        "handle": function (options) {

        }
    },
    {
        "id": "server",
        "description": "Launch Server task",
        "handle": function (options) {

        }
    },
    {
        "id": "config",
        "description": "Configure task",
        "handle": function (options) {

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

            saveConfig()
        }
    }
]