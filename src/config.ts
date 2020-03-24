
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

console.log($args);
if ($args.domain) {
    console.log("Setting domain to: " + $args.domain)
    $config.domain = $args.domain;
}
// TODO: Add target.[port/host] setting
saveConfig()
