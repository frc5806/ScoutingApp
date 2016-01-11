//
//  ViewController.swift
//  ScoutingApp
//
//  Created by Luca on 1/9/16.
//  Copyright (c) 2016 HMFRC. All rights reserved.
//

import UIKit
import MultipeerConnectivity

class ViewController: UIViewController{
    
    let colorService = ColorServiceManager()
    
    // MARK: Properties
    @IBOutlet weak var autonomousField: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // MARK: Actions
    @IBAction func setAutonomous(sender: UIButton) {
        
    }
}