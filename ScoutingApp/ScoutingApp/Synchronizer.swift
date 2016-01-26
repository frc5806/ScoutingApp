//
//  Synchronizer.swift
//  ConnectedColors


import Foundation
import MultipeerConnectivity

protocol SynchronizerDelegate {
	
	func connectedDevicesChanged(manager : Synchronizer, connectedDevices: [String])
	func colorChanged(manager : Synchronizer, colorString: String)
	
}

class Synchronizer : NSObject {
	
	private let serviceType = "frc-scouting"
	private let myPeerId = MCPeerID(displayName: UIDevice.currentDevice().name)
	private let serviceAdvertiser : MCNearbyServiceAdvertiser
	private let serviceBrowser : MCNearbyServiceBrowser
	var delegate : SynchronizerDelegate?
	
	override init() {
		self.serviceAdvertiser = MCNearbyServiceAdvertiser(peer: myPeerId, discoveryInfo: [ "@HM": "@Lions"], serviceType: serviceType)
		
		NSLog("%@", "Started advertiser")
		
		self.serviceBrowser = MCNearbyServiceBrowser(peer: myPeerId, serviceType: serviceType)
		
		super.init()
		
		self.serviceAdvertiser.delegate = self
		self.serviceAdvertiser.startAdvertisingPeer()
		
		self.serviceBrowser.delegate = self
		self.serviceBrowser.startBrowsingForPeers()
	}
	
	deinit {
		self.serviceAdvertiser.stopAdvertisingPeer()
		self.serviceBrowser.stopBrowsingForPeers()
	}
	
	lazy var session: MCSession = {
		let session = MCSession(peer: self.myPeerId, securityIdentity: nil, encryptionPreference: MCEncryptionPreference.Required)
		session.delegate = self
		return session
	}()
	
	func sendData(textString : String) {
		NSLog("%@", "sendData: \(textString)")
		
		if session.connectedPeers.count > 0 {
			do {
				try self.session.sendData(textString.dataUsingEncoding(NSUTF8StringEncoding, allowLossyConversion: false)!, toPeers: session.connectedPeers, withMode: MCSessionSendDataMode.Reliable)
			} catch let error1 as NSError {
				NSLog("%@", "Error: \(error1)")
			}
		}
		
	}
	
}

extension Synchronizer : MCNearbyServiceAdvertiserDelegate {
	
	func advertiser(advertiser: MCNearbyServiceAdvertiser, didNotStartAdvertisingPeer error: NSError) {
		NSLog("%@", "didNotStartAdvertisingPeer: \(error)")
	}
	
	func advertiser(advertiser: MCNearbyServiceAdvertiser, didReceiveInvitationFromPeer peerID: MCPeerID, withContext context: NSData?, invitationHandler: ((Bool, MCSession) -> Void)) {
		
		NSLog("%@", "didReceiveInvitationFromPeer \(peerID.displayName)")
		invitationHandler(true, self.session)
	}
	
}

extension Synchronizer : MCNearbyServiceBrowserDelegate {
	
	func browser(browser: MCNearbyServiceBrowser, didNotStartBrowsingForPeers error: NSError) {
		NSLog("%@", "didNotStartBrowsingForPeers: \(error)")
	}
	
	func browser(browser: MCNearbyServiceBrowser, foundPeer peerID: MCPeerID, withDiscoveryInfo info: [String : String]?) {
		NSLog("%@", "foundPeer: \(peerID.displayName)")
		if (info == nil) { NSLog("%@", "Authentication failed: \(peerID.displayName)") }
		else if (info! == ["HM" : "Lions"]) {
			NSLog("%@", "Secret password authenticated!")
			NSLog("%@", "invitePeer: \(peerID.displayName)")
			browser.invitePeer(peerID, toSession: self.session, withContext: nil, timeout: 10)
		} else { NSLog("%@", "Authentication failed: \(peerID.displayName)") }
	}
	
	func browser(browser: MCNearbyServiceBrowser, lostPeer peerID: MCPeerID) {
		NSLog("%@", "lostPeer: \(peerID.displayName)")
	}
	
}

extension MCSessionState {
	
	// Returns current state
	func stringValue() -> String {
		switch(self) {
		case .NotConnected: return "NotConnected"
		case .Connecting: return "Connecting"
		case .Connected: return "Connected"
		default: return "Unknown"
		}
	}
	
}

extension Synchronizer : MCSessionDelegate {
	
	// When someone disconnects or connect
	func session(session: MCSession, peer peerID: MCPeerID, didChangeState state: MCSessionState) {
		NSLog("%@", "peer \(peerID.displayName) didChangeState: \(state.stringValue())")
		self.delegate?.connectedDevicesChanged(self, connectedDevices: session.connectedPeers.map({$0.displayName}))
	}
	
	// Defined data type recieved
	func session(session: MCSession, didReceiveData data: NSData, fromPeer peerID: MCPeerID) {
		let str = NSString(data: data, encoding: NSUTF8StringEncoding) as! String
		NSLog("%@", "didReceiveData: \(str)")
		self.delegate?.colorChanged(self, colorString: str)
	}
	
	// IGNORE THESE BOTTOM THREE
	// Recieve a stream
	func session(session: MCSession, didReceiveStream stream: NSInputStream, withName streamName: String, fromPeer peerID: MCPeerID) {
		NSLog("%@", "didReceiveStream")
	}
	
	// Start recieving a byte packet thing
	func session(session: MCSession, didFinishReceivingResourceWithName resourceName: String, fromPeer peerID: MCPeerID, atURL localURL: NSURL, withError error: NSError?) {
		NSLog("%@", "didFinishReceivingResourceWithName")
	}
	
	// end byte packets
	func session(session: MCSession, didStartReceivingResourceWithName resourceName: String, fromPeer peerID: MCPeerID, withProgress progress: NSProgress) {
		NSLog("%@", "didStartReceivingResourceWithName")
	}
	
}
