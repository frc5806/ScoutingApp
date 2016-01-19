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
    
}

extension ColorSwitchViewController : ColorServiceManagerDelegate {
    
    func connectedDevicesChanged(manager: ColorServiceManager, connectedDevices: [String]) {
        NSOperationQueue.mainQueue().addOperationWithBlock { () -> Void in
            self.connectionsLabel.text = "Connections: \(connectedDevices)"
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