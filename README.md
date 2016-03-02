# ScoutingApp

Team 5806's scouting app. Used to coordinate scouting information at competitions using Bluetooth.

## Installation
First install node.js 4 (very important it is not node.js 5).  
Then, install ionic and cordova using `npm install --global ionic cordova`. You may have to use `sudo`.  
Next, navigate to the `/app` directory, and run `npm install`. This will install all the dependencies.  

## Developement
_All commands from here on are assumed to be in the `/app` directory._  

To run the server on localhost, use `ionic serve`  

The gulp script will automatically recompile the css when you use `ionic serve`, and also warn you of any javascript errors in the terminal window.  
__Don't forget about this because it will save you.__

To build the app for iOS (Mac only), first make sure you have the platform added with `ionic platform add ios`,  
If using an emulated, run `ionic emulate ios`.  
If using a plugged in device use `ionic run ios`. This may have issues.  
For control over the device model, use `ionic build ios` and go to the folder `app/platforms/ios/`. Open `app.xcodeproj` in xcode, and click the run button to run.
