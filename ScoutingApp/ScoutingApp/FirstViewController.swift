//
//  FirstViewController.swift
//  ScoutingApp
//
//  Created by Henry on 1/25/16.
//  Copyright © 2016 Henry. All rights reserved.
//

import UIKit

class FirstViewController: UIViewController {

<<<<<<< Updated upstream
	@IBOutlet weak var buttonSend: UIButton!
	@IBOutlet weak var info: UITextField!
	
=======
    @IBOutlet weak var teamName: UITextField!
    
    @IBOutlet weak var buttonLowGoal: UISwitch!
    
    @IBOutlet weak var buttonHighGoal: UISwitch!
    
    @IBOutlet weak var buttonDefenses: UISwitch!
    
    @IBOutlet weak var buttonTowerCapture: UISwitch!
    
    @IBOutlet weak var textAuto: UITextView!
    
    @IBOutlet weak var textTeleOp: UITextView!
    
    @IBAction func submitForm(sender: AnyObject) {
    }
>>>>>>> Stashed changes
	override func viewDidLoad() {
		super.viewDidLoad()
		// Do any additional setup after loading the view, typically from a nib.
	}

	override func didReceiveMemoryWarning() {
		super.didReceiveMemoryWarning()
		// Dispose of any resources that can be recreated.
	}

	let appDelegate = UIApplication.sharedApplication().delegate as! AppDelegate
	
	@IBAction func buttonPress(sender: AnyObject) {
		appDelegate.sendDatatoSync(info.text!)
	}
}

