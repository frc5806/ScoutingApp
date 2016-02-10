//
//  TeamViewController.swift
//  ScoutingApp
//
//  Created by  on 1/25/16.
//  Copyright (c) 2016 Henry. All rights reserved.
//

import UIKit

class TeamTableViewController : UIViewController,UITableViewDelegate {
    let teamData = ["Name", "1234"]
    let tableView = UITableView();
    
    
    func tableView(tableView: UITableView!, numberOfRowsInSection section: Int) -> Int {
        return teamData.count
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        tableView.delegate = self
        NSLog("Finished Loading")
        
    }
    
    @IBAction func addData(sender: AnyObject) {
        
        //add your data into tables array from textField
        /*table1Data.append(table1Text.text)
        table2Data.append(table2Text.text)
        
        
        table1Text.resignFirstResponder()
        table2Text.resignFirstResponder()*/
    }
    
    func tableView(tableView: UITableView!, cellForRowAtIndexPath indexPath: NSIndexPath!) -> UITableViewCell! {
        
        let cell = tableView.dequeueReusableCellWithIdentifier("Cell") as! Cell
        
        cell.teamInfo.text = teamData[indexPath.row]
        cell.data = teamData;
        
        return cell
    }
    
}
class Cell : UITableViewCell, UITableViewDelegate {
    @IBOutlet weak var teamInfo: UILabel!
    var data :[AnyObject]!
    
    func tableView(tableView: UITableView!, numberOfRowsInSection section: Int) -> Int {
        
        return data.count
    }
    
    func tableView(tableView: UITableView!, cellForRowAtIndexPath indexPath: NSIndexPath!) -> UITableViewCell! {
        
        let cell = tableView.dequeueReusableCellWithIdentifier("innerCell")! as UITableViewCell;
        cell.textLabel!.text = "\(data[indexPath.row])"
        return cell
    }
}