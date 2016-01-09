//
//  ViewController.swift
//  ScoutingApp
//
//  Created by Luca on 1/9/16.
//  Copyright (c) 2016 HMFRC. All rights reserved.
//

import UIKit
import MultipeerConnectivity

class ViewController: UIViewController {
    
    var peerID: MCPeerID!
    var mcSession: MCSession!
    var mcAdvertiserAssistant: MCAdvertiserAssistant!

    // MARK: Properties
    @IBOutlet weak var autonomousField: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        peerID = MCPeerID(displayName: UIDevice.currentDevice().name)
        mcSession = MCSession(peer: peerID, securityIdentity: nil, encryptionPreference: .Required)
        mcSession.delegate = self
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // MARK: Actions
    @IBAction func setAutonomous(sender: UIButton) {
    }
    
}