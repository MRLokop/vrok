///  
///  VROK PROJECT
///    Open source ngrok alternative,
///    for self-hosting
///  
///    >> File: src/utils/task.ts
///  
///    License: MIT
///    Repository: https://github.com/TheMRLokopOff/vrok
///  
///    >> Created: 26.03.2020, 07:08:08
///  
///    (c) 2020 «Venity» and «MFSoftware»
///  

import path = require('path');
import chalk = require('chalk');
import { fstatSync, statSync, readdirSync } from 'fs';
import { $config, $data } from '../launcher';
import { $tasks } from '../tasks/SimpleTasks';

export const tasksLocations = [
    path.join(__dirname, "..", "tasks")
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
export function runTask(taskID, options = {}) {
    // TODO Implement methods
    const task = regTasks[taskID];
    if (task !== undefined) {
        console.info("Task: " + chalk.blue(taskID) + "...")
        task.handle(options);
    } else {
        console.error("Task '" + chalk.yellow(taskID) + "' not found")
    }
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
console.debug("Loading tasks...");
for (const location of tasksLocations) {
    console.debug("  -> Loading '" + chalk.green(location) + "'...");
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
    console.warn("  To see more about error:");
    console.warn("     " + chalk.yellow("run with flag ") + chalk.yellowBright("--debug"))
}