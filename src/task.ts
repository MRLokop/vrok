
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

import path = require('path');
import chalk = require('chalk');
import { fstatSync, statSync, readdirSync } from 'fs';
import { $config, $data } from './launcher';
import { $tasks } from './tasks/cli';

export const tasksLocations = [
    path.join(__dirname, "tasks")
];

/**
 * Tasks by name
 * @var object [string, Task]
 */
const regTasks = {};

/**
 * Load tasks from file
 * @param location file
 */
export function loadTasksFromFile(location: string) {
    if (path.extname(location) !== ".js") return true;
    console.trace("   -> " + chalk.green(location));
    try {
        /// Require task file
        const tasks = require(location).$tasks;
        if (tasks !== undefined) {
            for (const task of tasks) {
                // Registering tasks
                console.trace("Registered task: " + chalk.green(task.id));
                regTasks[task.id] = task;
            }
        }
        return true;
    } catch (err) {
        console.error(chalk.red("Failed to load file: " + location), ...($data.debug ? [err] : []));
        return false;
    }

}

/**
 * Run task
 * @param task name
 * @param options data
 */
export function runTask(task, options = {}) {
    // TODO Implement methods
}

/**
 * Get all tasks
 */
export function getTasks() : any {
    return regTasks;
}

/**
 * Task interface
 */
export interface VRokTask {

}

let error = false;
console.debug("Loading tasks...")
for (const location of tasksLocations) {
    console.debug("  -> Loading '" + chalk.green(location) + "'...")
    if (statSync(location).isDirectory) {
        readdirSync(location).forEach(a => {
            const p = path.join(location, a);
            if (statSync(p).isFile) {
                if (!loadTasksFromFile(p))
                    error = true;
            }
        })
    } else {
        if (!loadTasksFromFile(location))
            error = true;
    }
}

if (error && !$data.debug) {
    console.warn("  To see more about error:")
    console.warn("     " + chalk.yellow("run with flag ") + chalk.yellowBright("--debug"))
}