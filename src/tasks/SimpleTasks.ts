///  
///  VROK PROJECT
///    Open source ngrok alternative,
///    for self-hosting
///  
///    >> File: src/tasks/SimpleTasks.ts
///  
///    License: MIT
///    Repository: https://github.com/TheMRLokopOff/vrok
///  
///    >> Created: 26.03.2020, 07:07:40
///  
///    (c) 2020 «Venity» and «MFSoftware»
///  

import {$config, $args, saveConfig} from "../launcher";
import * as chalk from 'chalk';
import {VRokServer} from "../api/VRokServer";

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
            new VRokServer(options.port || "2419")
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
            } else {
                console.log("Configuration: ", $config)
            }

            saveConfig()
        }
    }
]