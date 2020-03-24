# VRok
Open-Source and free ngrok alternative

## What is it?
VRok get access for fast share your local server to public, like game servers, web server, ssh

## Install
```bash
git clone https://github.com/TheMRLokopOff/vrok.git
cd vrok
npm i -g # or with yarn: yarn install -g
```

## Start
1. ```bash
   vrok config --target.host "venity.site" --target.port 4021 # Configure server connection
   ```
2. ```bash
   vrok client --tunnel "test" # Change tunnel to change host
   ```

> Tunnel is name of host.
> 
> For example, if tunnel equals test
>
> host: test.tunnel.venity.site
> 
> Template: [tunnel].[domain]

## License
MIT
