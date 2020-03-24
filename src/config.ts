import { $config, $args, saveConfig } from "./launcher";

console.log($args);
if ($args.domain) {
    console.log("Setting domain to: " + $args.domain)
    $config.domain = $args.domain;
}

saveConfig()