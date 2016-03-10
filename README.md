# ScoutingApp

**5806 Horace Mann Basement Lions**  
![alt text](https://avatars3.githubusercontent.com/u/15164506?v=3&s=200 "Basement Lions")

Team 5806's scouting app. Used to coordinate scouting information at competitions using Bluetooth.

## Installation

First install node.js 4 (very important it is not node.js 5). For mac, if you have homebrew, run `brew tap homebrew/versions; brew install nodenv`. Linux users look [here](https://nodejs.org/en/download/package-manager/ "Linux NodeJS install") (follow instructions for node.js 4). Otherwise, follow [this](https://nodejs.org/en/download/ "NodeJS install") link and select the correct download.  

Then, install ionic and cordova using `npm install --global ionic cordova`. You may have to use `sudo`.  
Next, navigate to the `/app` directory, and run `npm install`. This will install all the dependencies.  

## Development

See the [ionic framework's instructions](http://ionicframework.com/docs/guide/testing.html) on running an application.

## Backend
Our app queries a backend located on a Digital Ocean droplet which uses Flask and MongoDB to return and submit scouting data.
