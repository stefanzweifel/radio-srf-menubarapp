import {app, dialog} from 'electron';
import RadioClient from './app/RadioClient';

export default [
    {
        label: 'Currently Playing',
        enabled: false
    }, 
    {
        type: 'separator'
    },
    {
        label: 'Radio SRF1',
        accelerator: 'MediaPlayPause',
        click() {
            let streamUrl = 'http://stream.srg-ssr.ch/m/drs1/mp3_128';
            let client = new RadioClient(streamUrl);
            client.stream();
        }
    },
    {
        type: 'separator'
    },
    {
        label: 'Hilfe',
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click() { require('electron').shell.openExternal('http://electron.atom.io'); }
            },
            {
                label: 'About',
                click: function() {
                    dialog.showMessageBox({
                        title: 'About',
                        message: 'SoundCast v1.7. Created by Stefan Zweifel.',
                        detail: 'https://www.github.com/stefanzweifel',
                        buttons: ["OK"]
                    });
                }
            }
        ]
    },
    {
        label: 'Schliessen',
        click() {
            app.quit();
        }
    },
];