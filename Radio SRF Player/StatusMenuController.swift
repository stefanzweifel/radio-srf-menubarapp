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
    
    let statusItem = NSStatusBar.system.statusItem(withLength: 120)
    
    var avPlayer: AVPlayer!
    var avPlayerItem: AVPlayerItem!
    var timerTrackDisplay: Timer?
    
    override func awakeFromNib() {
        let icon = NSImage(named: NSImage.Name(rawValue: "statusIcon"))
        
        icon?.isTemplate = true // best for dark mode
        statusItem.image = icon
        statusItem.menu = statusMenu
        statusItem.title = "Radio App"
 
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
    
    func playRadio(radioUrl: String) {
        stopPlayerItemAndTimer()
        
        avPlayerItem = AVPlayerItem(url: NSURL(string: radioUrl)! as URL)
        avPlayerItem.addObserver(self, forKeyPath: "timedMetadata", options: NSKeyValueObservingOptions(), context: nil)
        
        avPlayer = AVPlayer(playerItem: avPlayerItem)
        avPlayer.play()
    }
    
    override func observeValue(forKeyPath: String?, of: Any?, change: [NSKeyValueChangeKey : Any]?, context: UnsafeMutableRawPointer?) {
        if forKeyPath != "timedMetadata" { return }
        
        let data: AVPlayerItem = of as! AVPlayerItem
        
        var track: String = ""
        
        for item in data.timedMetadata! as [AVMetadataItem] {
            
            if item.commonKey == AVMetadataKey.commonKeyTitle {
                if timerTrackDisplay != nil {
                    timerTrackDisplay?.invalidate()
                    timerTrackDisplay = nil
                }
                
                track = item.value as! String
                
                var startCharacterIndex = 0
                
                let filler = "  ***  " // string that is displayed before the track repeats
                let displayTrackLength = track.count + filler.count // after this count of chars we have to repeat the track title
                let displayTrack = track + filler + track // attaching the track string to simplify code
                
                timerTrackDisplay = Timer.scheduledTimer(withTimeInterval: 0.2, repeats: true) {
                    _ in DispatchQueue.main.async {
                        
                        if startCharacterIndex >= displayTrackLength {
                            startCharacterIndex = 0
                        }
                        
                        let endCharacterIndex = startCharacterIndex + 9 // display 9 chars at once
                        let range = startCharacterIndex..<endCharacterIndex
                        let shortenedTrack = String(displayTrack[range])
                        
                        self.statusItem.title = shortenedTrack
                        
                        startCharacterIndex = startCharacterIndex + 1
                        
                    }
                }
                
            }
            
        }
    }

    
    @IBAction func stopPlayback(_ sender: NSMenuItem) {
        stopPlayerItemAndTimer()
        stopPlayer()
        
        statusItem.title = "Radio App"
    }
    
    func stopPlayer() {
        if avPlayer != nil {
            avPlayer.pause();
        }
    }
    
    func stopPlayerItemAndTimer() {
        if avPlayerItem != nil {
            avPlayerItem.removeObserver(self, forKeyPath: "timedMetadata")
            avPlayerItem = nil
            
            if timerTrackDisplay != nil {
                timerTrackDisplay?.invalidate()
                timerTrackDisplay = nil
            }
        }
    }
}

extension String {
    subscript (bounds: CountableClosedRange<Int>) -> String {
        let start = index(startIndex, offsetBy: bounds.lowerBound)
        let end = index(startIndex, offsetBy: bounds.upperBound)
        return String(self[start...end])
    }
    
    subscript (bounds: CountableRange<Int>) -> String {
        let start = index(startIndex, offsetBy: bounds.lowerBound)
        let end = index(startIndex, offsetBy: bounds.upperBound)
        return String(self[start..<end])
    }
}
