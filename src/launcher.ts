#!/usr/bin/env node

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

import * as chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import * as deepmerge from 'deepmerge';
export const $args = require('minimist')(process.argv.slice(2));

export let $config: any = {};
if (fs.existsSync(path.join(process.env.HOME, ".vrok.json"))) {
    $config = JSON.parse(fs.readFileSync(path.join(process.env.HOME, ".vrok.json")).toString());
} else {
    if ($args.auth !== undefined) {

        fs.writeFileSync(path.join(process.env.HOME, ".vrok.json"), JSON.stringify({
            token: $args.auth
        }));

        $config = JSON.parse(fs.readFileSync(path.join(process.env.HOME, ".vrok.json")).toString());
    }
}


/// Data/settings
export const $data: any = deepmerge($config, $args);

if ($data.debug === undefined && $data.trace) {
    $data.debug = true;
}

if ($config.color === undefined || $config.color) {
    const backup = { ...console }; // Copy methods of console
    console.log = (...data) => {
        backup.log(" ", ...data);
    }
    console.info = (...data) => {
        backup.info(chalk.blue("I"), ...data);
    }
    console.error = (...data) => {
        backup.error(chalk.red("E"), ...data);
    }
    console.warn = (...data) => {
        backup.warn(chalk.yellow("W"), ...data);
    }
    console.trace = (...data) => {
        if ($data.trace) {
            backup.log(chalk.gray("T"), ...data);
        }
    }
    console.debug = (...data) => {
        if ($data.debug) {
            backup.debug("D", ...data);
        }
    }
}

if ($args.auth !== undefined) {

    $config.token = $args.auth;
    fs.writeFileSync(path.join(process.env.HOME, ".vrok.json"), JSON.stringify($config));
    console.log("--> Auth-Token updated")

}

export function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

/**
 * Save config to filesystem
 */
export function saveConfig() {
    fs.writeFileSync(path.join(process.cwd(), ".vrok.json"), JSON.stringify($config), {
        encoding: 'utf-8'
    });
}

console.info("Entering CLI mode...")
if ($args._[0] !== undefined) {
    require("./task").runTask($args._[0], $args)
} else {
    const taskManager = require("./task");
    console.log(chalk.blue("All tasks:"));
    console.log();

    const allTasks = taskManager.getTasks();
    for (const taskID of Object.keys(allTasks)) {
        const task = allTasks[taskID];
        console.log(" - " + chalk.green(taskID))
    }
    
}