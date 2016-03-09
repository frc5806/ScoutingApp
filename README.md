# ScoutingApp

**5806 Horace Mann Basement Lions**  
![alt text](https://avatars3.githubusercontent.com/u/15164506?v=3&s=200 "Basement Lions")

Team 5806's scouting app. Used to coordinate scouting information at competitions using Bluetooth.

## Installation
First install node.js 4 (very important it is not node.js 5). For mac, if you have homebrew, run `brew tap homebrew/versions; brew install nodenv`. Linux users look [here](https://nodejs.org/en/download/package-manager/ "Linux NodeJS install") (follow instructions for node.js 4). Otherwise, follow [this](https://nodejs.org/en/download/ "NodeJS install") link and select the correct download.  
Then, install ionic and cordova using `npm install --global ionic cordova`. You may have to use `sudo`.  
Next, navigate to the `/app` directory, and run `npm install`. This will install all the dependencies.  

## Development
_All commands from here on are assumed to be in the `/app` directory._  

To run the server on localhost, use `ionic serve`. If you make changes while it is serving (which you should), it will automatically reload the page with the new version.  

The gulp script will automatically recompile the css when you use `ionic serve`, and also warn you of any javascript errors in the terminal window, even if you make changes while serving.  

## Emulation

#### Easy way
Run the command `ionic serve --lab` instead of usual `ionic serve` to see a side by side interactive view of an iOS and android device running your app.  

#### iOS (Mac only)
First make sure you have the platform added with `ionic platform add ios`,  
If using an emulator, run `ionic emulate ios`.  
For control over the device model in emulation, or to run on a real device, use `ionic build ios` and go to the folder `app/platforms/ios/`. Open `app.xcodeproj` in xcode, and click the run button after selecting the device you want to run on.

#### Android
To emulate for android, first make sure you have the platform added with `ionic platform add android`. Also make sure you have android studio. Then, run `ionic emulate android`.

## App Installation on a Device
Make sure you have added the platform and used `ionic serve` at least once (to compile sass), and added the platform using either `ionic platform add ios` for iOS, or `ionic platform add android` for android.

#### iOS (Mac Only)
To run on iOS, use `ionic build ios` and go to the folder `app/platforms/ios/`. Open `ScoutingApp.xcodeproj` in xcode, and click the run button after selecting the device you want to run on.
#### Android
Make sure you have the platform added, and use `ionic run android`.
