//
//  FirstViewController.swift
//  ScoutingApp
//
//  Created by Henry on 1/25/16.
//  Copyright © 2016 Henry. All rights reserved.
//

import UIKit

class FirstViewController: UIViewController {

	@IBOutlet weak var buttonSend: UIButton!
	@IBOutlet weak var info: UITextField!
	
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

