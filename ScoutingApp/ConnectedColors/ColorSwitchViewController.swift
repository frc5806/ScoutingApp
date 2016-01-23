//
//  ViewController.swift
//  ConnectedColors
//

import UIKit

class ColorSwitchViewController: UIViewController, UITextFieldDelegate {

    //@IBOutlet weak var connectionsLabel: UILabel!
	@IBOutlet weak var connectionsLabel: UILabel!
    @IBOutlet weak var autonomousLabel: UILabel!
    @IBOutlet weak var autonomousField: UITextField!
    @IBOutlet weak var LowGoal: UISwitch!
    @IBOutlet weak var HighGoal: UILabel!
    
    let colorService = ColorServiceManager()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        colorService.delegate = self
        self.autonomousField.delegate = self
    }
	
    @IBAction func autonomousButton(sender: AnyObject) {
        autonomousLabel.text = autonomousField.text;
        colorService.sendColor(autonomousField.text!);
    }
	
    func textFieldShouldReturn(textField: UITextField) -> Bool {
        self.view.endEditing(true)
		//autonomousLabel.text = autonomousField.text;
		colorService.sendColor(autonomousField.text!);
        return false
    }
    
	@IBAction func switchOne(sender: UIButton) {
		performSegueWithIdentifier("switchToTwo", sender: self)
	}
}

extension ColorSwitchViewController : ColorServiceManagerDelegate {
    
    func connectedDevicesChanged(manager: ColorServiceManager, connectedDevices: [String]) {
        NSOperationQueue.mainQueue().addOperationWithBlock { () -> Void in
			//NSLog("%@", "This device connected: \(connectedDevices)")
            self.connectionsLabel.text = "Connections: \(connectedDevices)"
			//NSLog("%@", "Connections: \(connectedDevices)")
        }
    }
    
    func colorChanged(manager: ColorServiceManager, colorString: String) {
        NSOperationQueue.mainQueue().addOperationWithBlock { () -> Void in
            switch colorString {
            default:
                //NSLog("%@", "Unknown color value received: \(colorString)")
                self.autonomousLabel.text = colorString;
            }
        }
    }
    
}