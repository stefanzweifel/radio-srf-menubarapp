//
//  Radio_SRFApp.swift
//  Radio SRF
//
//  Created by Stefan on 05.07.23.
//

import SwiftUI
import AVFoundation

@main
struct Radio_SRFApp: App {
    
    @State var avPlayer: AVPlayer!
    
    @State var currentStation: String! = nil;
    

    struct RadioStation: Identifiable {
        var id = UUID()
        var name: String
        var url: String
        var index: Int8
    }

    var radioStations: [RadioStation] = [
        RadioStation(name: "Radio SRF 1", url: "https://stream.srg-ssr.ch/m/drs1/mp3_128", index: 1),
        RadioStation(name: "Radio SRF 2", url: "https://stream.srg-ssr.ch/m/drs2/mp3_128", index: 2),
        RadioStation(name: "Radio SRF 3", url: "https://stream.srg-ssr.ch/m/drs3/mp3_128", index: 3),
        RadioStation(name: "Radio SRF 4 News", url: "https://stream.srg-ssr.ch/m/drs4news/mp3_128", index: 4),
        RadioStation(name: "Radio SRF Virus", url: "https://stream.srg-ssr.ch/m/drsvirus/mp3_128", index: 5),
        RadioStation(name: "Radio SRF Musikwelle", url: "https://stream.srg-ssr.ch/m/drsvirus/mp3_128", index: 6),
        RadioStation(name: "Radio Swiss Pop", url: "https://stream.srg-ssr.ch/m/rsp/mp3_128", index: 7),
        RadioStation(name: "Radio Swiss Jazz", url: "https://stream.srg-ssr.ch/m/rsj/mp3_128", index: 8),
        RadioStation(name: "Radio Swiss Classic", url: "https://stream.srg-ssr.ch/m/rsc_de/mp3_128", index: 5),
        
    ]
    
    func playRadioStation(stationName: String, radioUrl: String) -> Void {
        avPlayer = AVPlayer.init(url: NSURL(string: radioUrl)! as URL)
        avPlayer.play()
        currentStation = stationName;
    }
    
    func stopPlayback() -> Void {
        if avPlayer != nil {
            avPlayer.pause();

            // "Destroy" the AVPlayer instance to preserve memory
            avPlayer = nil;
        }
        
        currentStation = nil;
    }
    
    
    var body: some Scene {
        MenuBarExtra("Radio SRF Player", systemImage: "radio") {
            if (currentStation != nil) {
                Text("Now Playing: \(currentStation)")
            }
        
            /* ForEach(radioStations) { station in
                Button(station.name) {
                    playRadioStation(stationName: station.name, radioUrl: "https://stream.srg-ssr.ch/m/drs1/mp3_128")
                }.keyboardShortcut(station.index)
                
            } */

            Group {
                Button("Radio SRF 1") {
                    playRadioStation(stationName: "Radio SRF 1", radioUrl: "https://stream.srg-ssr.ch/m/drs1/mp3_128")
                }.keyboardShortcut("1")
                Button("Radio SRF 2") {
                    playRadioStation(stationName: "Radio SRF 2", radioUrl: "https://stream.srg-ssr.ch/m/drs2/mp3_128")
                }.keyboardShortcut("2")
                Button("Radio SRF 3") {
                    playRadioStation(stationName: "Radio SRF 3", radioUrl: "https://stream.srg-ssr.ch/m/drs3/mp3_128")
                }.keyboardShortcut("3")
                Button("Radio SRF 4 News") {
                    playRadioStation(stationName: "Radio SRF 4 News", radioUrl: "https://stream.srg-ssr.ch/m/drs4news/mp3_128")
                }.keyboardShortcut("4")
                Button("Radio SRF Virus") {
                    playRadioStation(stationName: "Radio SRF Virus", radioUrl: "https://stream.srg-ssr.ch/m/drsvirus/mp3_128")
                }.keyboardShortcut("5")
                Button("Radio SRF Musikwelle") {
                    playRadioStation(stationName: "Radio SRF Musikwelle", radioUrl: "https://stream.srg-ssr.ch/m/drsmw/mp3_128")
                }.keyboardShortcut("6")
            }

            Group {
                Button("Radio Swiss Pop") {
                    playRadioStation(stationName: "Radio Swiss Pop", radioUrl: "https://stream.srg-ssr.ch/m/rsp/mp3_128")
                }.keyboardShortcut("7")
                Button("Radio Swiss Jazz") {
                    playRadioStation(stationName: "Radio Swiss Jazz", radioUrl: "https://stream.srg-ssr.ch/m/rsj/mp3_128")
                }.keyboardShortcut("8")
                Button("Radio Swiss Classic") {
                    playRadioStation(stationName: "Radio Swiss Classic", radioUrl: "https://stream.srg-ssr.ch/m/rsc_de/mp3_128")
                }.keyboardShortcut("9")
            }
        
            Group {
                Divider()
                Button("Stop") {
                    stopPlayback()
                }
                Divider()
                Link("GitHub Repository", destination: URL(string: "https://github.com/stefanzweifel/radio-srf-menubarapp")!)
                Button("Quit Radio SRF") {
                    NSApplication.shared.terminate(nil)
                }.keyboardShortcut("q")
            }
        }
    }
}
