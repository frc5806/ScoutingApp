# ScoutingApp

**5806 Horace Mann Basement Lions**  
![alt text](https://avatars3.githubusercontent.com/u/15164506?v=3&s=200 "Basement Lions")

Team 5806's scouting app. Used to coordinate scouting information at competitions using Bluetooth.

## Installation
First install node.js 4 (very important it is not node.js 5). For mac, if you have homebrew, run `brew tap homebrew/versions; brew install nodenv`. Otherwise, follow [this](https://nodejs.org/en/download/ "NodeJS install") link and select the correct download.  
Then, install ionic and cordova using `npm install --global ionic cordova`. You may have to use `sudo`.  
Next, navigate to the `/app` directory, and run `npm install`. This will install all the dependencies.  

## Development
_All commands from here on are assumed to be in the `/app` directory._  

To run the server on localhost, use `ionic serve`. If you make changes while it is serving (which you should), it will automatically reload the page.  

The gulp script will automatically recompile the css when you use `ionic serve`, and also warn you of any javascript errors in the terminal window, even if you make changes while serving.  

#### Emulation
To build the app for iOS (Mac only), first make sure you have the platform added with `ionic platform add ios`,  
If using an emulator, run `ionic emulate ios`.  
For control over the device model in emulation, or to run on a real device, use `ionic build ios` and go to the folder `app/platforms/ios/`. Open `app.xcodeproj` in xcode, and click the run button after selecting the device you want to run on.

## App Installation
Make sure you have added the platform and used `ionic serve` at least once (to compile sass).  

#### iOS (Mac Only)
To run on iOS, use `ionic build ios` and go to the folder `app/platforms/ios/`. Open `ScoutingApp.xcodeproj` in xcode, and click the run button after selecting the device you want to run on.
#### Android
Make sure you have the platform added, and use `ionic build android` to build the android studio project. Then, using android studio, open the project in `app/platforms/android/`, and install the app onto the android device.
