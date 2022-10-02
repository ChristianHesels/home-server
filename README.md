<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">HOME SERVER</h3>

  <p align="center">
    Project to access RasAP and change NordVPN Connections, Activate/Deactivate IP-Tables and more to come..
    <br />
    <a href="https://github.com/ChristianHesels/Home-Server"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/ChristianHesels/Home-Server/">View Demo</a>
    ·
    <a href="https://github.com/ChristianHesels/Home-Server/issues">Report Bug</a>
    ·
    <a href="https://github.com/ChristianHesels/Home-Server/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#deployment">Deployment</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Using NordVPN on a Raspberry Pi configured as an Access Point (RaspAP) is a nice way to
  * Connect multiple devices to it and therefore only using one of the six available NordVPN devices
  * Connect devices without NordVPN support like Smart TVs

One disadvantage is the management of this VPN connection. If you want to change the country from one to another it has to be done on the Raspberry Pi directly - either via ssh or directly on the device. To make this more simple this project came to life.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To configure a Raspberry Pi as RaspAP and using NordVPN on it follow this steps:
https://vpn-expert.info/vpn-router-raspberry-pi-raspap-and-nordvpn-wi-fi-hotspot-access-point/



### Prerequisites

The repository can be executed directly on the device. So if you only want to execute the existing project, feel free to move on to <a href="#installation">Installation</a>. But if you want to fork the project to add your own functionality take a look at the full deployment pipeline I am using: <a href="#deployment">Deployment</a><

### Installation


1. Clone the repo
   ```sh
   git clone https://github.com/ChristianHesels/Home-Server.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Build the Next.JS app
   ```sh
   npm run build
   ```
4. Start the Server _this will start the application on http://localhost:3000_
   ```sh
   npm run start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Deployment

For Deployment I used git Hooks, pm2 and NGINX on the Raspberry Pi.

1. Install Node.js
   ```sh
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install nodejs
   ```

2. Install pm2 on the device (globally)
   ```sh
   npm install pm2 -g
   ```
   
3. Install NGINX
   ```sh
   sudo apt install nginx
   ```

4. Make sure git is installed as well
   ```sh
   git --version
   ```

### PM2
First create the initial service by cloning the repository inside the /srv/deploy/ folder, build and execute it with pm2
   ```sh
  git clone git@github.com:ChristianHesels/Home-Server.git /srv/deploy/homeserver
  cd app
  npm run build
  pm2 start npm --name "homeserver" -- start
   ```
   
Afterwards create a service to run this with pm2 when the pi restarts
   ```sh
  pm2 startup # copy output
  pm2 save # saves the current services as default
   ```

### Git Hook and Folders
Create multiple folders and set permissions
   ```sh
  sudo mkdir -p /srv/tmp/
  sudo mkdir -p /srv/deploy/
  sudo chgrp -R users /srv
  sudo chmod -R g+w /srv
   ```

Create a new Git Repository and set permissions
   ```sh
  sudo mkdir -p /srv/git/homeserver.git
  cd /srv/git/homeserver.git
  sudo git init --bare
  sudo chgrp -R users .
  sudo chmod -R g+rwX .
  sudo find . -type d -exec chmod g+s '{}' +
  
  sudo git config core.sharedRepository group
  ```
  
Create a Git Hook for deployment
   ```sh
   cd /srv/git/homeserver.git/hooks
   sudo touch post-receive
   sudo chmod +x post-receive
  ```
  
Add the following content to the post-receive file
   ```
   #!/bin/sh

   TARGET="/srv/deploy/homeserver"
   
   TMP="/srv/tmp/homeserver"
   
   REPO="/srv/git/homeserver.git"
   
   mkdir -p $TMP
   git --work-tree=$TMP --git-dir=$REPO checkout -f
   
   cd $TMP/app
   ls
   # Deploy code comes here
   npm install
   npm run build
   
   # Replace production directory with temporary directory
   cd /
   rm -rf $TARGET
   mv $TMP $TARGET
   cd $TARGET/app
   pm2 restart homeserver
   ```
### NGINX
Edit the default NGINX settings
   ```sh
  sudo vi /etc/nginx/sites-available/default
  ```
 
Add the following content:
   ```
   server {
        server_name www.homeserver.com homeserver.com;

        index index.html index.htm;
        root /srv/deploy/homeserver/app; #Make sure your using the full path

        # Serve any static assets with NGINX
        location /_next/static {
            alias /srv/deploy/homeserver/app/.next/static;
            add_header Cache-Control "public, max-age=3600, immutable";
        }

        location / {
            try_files $uri.html $uri/index.html # only serve html files from this dir
            @public
            @nextjs;
            add_header Cache-Control "public, max-age=3600";
        }

        location @public {
            add_header Cache-Control "public, max-age=3600";
        }

        location @nextjs {
            # reverse proxy for next server
            proxy_pass http://localhost:3000; #Don't forget to update your port number
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

        listen 80 default_server;
        listen [::]:80;
}
  ```
Restart NGINX server
   ```sh
  sudo systemctl restart nginx
  ```
### Using deployment
On your developing device add the repository created on the Raspberry Pi as a remote branch 'deploy'
   ```sh
  git remote add deploy ssh://<your-name>@<your-ip>/srv/git/<your-app>.git/
  ```
  
Push and deploy:
   ```sh
  git add . 
  git commit -m "<commit message>"
  git push deploy master
  ```
  
Sources: 
https://francoisromain.medium.com/vps-deploy-with-git-fea605f1303b


<!-- ROADMAP -->
## Roadmap

- [x] Add VPN Server change
- [x] Add Deployment
- [ ] Add IP-Table change
- [ ] Add more ideas

See the [open issues](https://github.com/ChristianHesels/Home-Server/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Christian Hesels - christianhesels@gmail.com

Project Link: [https://github.com/ChristianHesels/Home-Server](https://github.com/ChristianHesels/Home-Server)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


