///  
///  VROK PROJECT
///    Open source ngrok alternative,
///    for self-hosting
///  
///    >> File: src/tasks/cli.ts
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
import {VRokServer} from "../api/server";

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
            new VRokServer(options.port || "2419", options.domain, (event, data) => {

                if (event === 'http-request') {
                    const {request, response} = data;
                    console.log("  " + chalk.green(request.method) + " " + chalk.blue(request.url) + "             " + chalk.gray(request.connection.remoteAddress))
                    response.write("TODO: Implement client panel")
                    // TODO: Implement client panel
                    response.end()
                } else if (event === 'http-server-listen') {
                    console.log(" " + chalk.blue("VRok server running on port " + chalk.green(data.port)))
                } else if (event === 'http-request') {
                } else {
                    console.log(event, data);
                }

            })
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