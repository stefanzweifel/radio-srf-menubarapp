//
//  StatusMenuController.swift
//  Radio SRF Player
//
//  Created by Stefan Zweifel on 23.10.16.
//  Copyright © 2016 Stefan Zweifel. All rights reserved.
//

import Cocoa
import AVFoundation

class StatusMenuController: NSObject {
    
    @IBOutlet weak var statusMenu: NSMenu!
    
    let statusItem = NSStatusBar.system.statusItem(withLength: NSStatusItem.variableLength)
    
    var avPlayer: AVPlayer!
    
    override func awakeFromNib() {
        let icon = NSImage(named: NSImage.Name(rawValue: "statusIcon"))
        
        icon?.isTemplate = true // best for dark mode
        statusItem.image = icon
        statusItem.menu = statusMenu
 
    }
    
    @IBAction func quitClicked(sender: NSMenuItem) {
        NSApplication.shared.terminate(self)
    }
    
    @IBAction func playRadioSRF1(_ sender: NSMenuItem) {
        playRadio(radioUrl: "http://stream.srg-ssr.ch/m/drs1/mp3_128")
    }
    
    @IBAction func playRadioSrf2(_ sender: NSMenuItem) {
        playRadio(radioUrl: "http://stream.srg-ssr.ch/m/drs2/mp3_128")
    }
    
    @IBAction func playRadioSrf3(_ sender: NSMenuItem) {
        playRadio(radioUrl: "http://stream.srg-ssr.ch/m/drs3/mp3_128")
    }
    
    @IBAction func playRadioSrf4(_ sender: NSMenuItem) {
        playRadio(radioUrl: "http://stream.srg-ssr.ch/m/drs4news/mp3_128")
    }
    
    @IBAction func playRadioSrfVirus(_ sender: NSMenuItem) {
        playRadio(radioUrl: "http://stream.srg-ssr.ch/m/drsvirus/mp3_128")
    }
    
    @IBAction func playRadioSrfMusikwelle(_ sender: NSMenuItem) {
        playRadio(radioUrl: "http://stream.srg-ssr.ch/drsmw/mp3_128.m3u")
    }
    
    func playRadio(radioUrl: String)
    {
        avPlayer = AVPlayer.init(url: NSURL(string: radioUrl)! as URL)
        avPlayer.play()
    }
    
    @IBAction func stopPlayback(_ sender: NSMenuItem) {
        if avPlayer != nil {
            avPlayer.pause();
        }
    }
    
}
