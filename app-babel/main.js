// import "babel-register";
import {Menu, MenuItem, dialog, app, globalShortcut} from 'electron';
import menubar from 'menubar';
import RadioClient from './RadioClient';

let mb = menubar({
    icon: __dirname + '/radio-icon.png'
});

mb.on('ready', function ready () {

    let radioMenu = new Menu();
    let radioClient = new RadioClient();

    radioMenu.append(new MenuItem(    {
        label: 'Radio SRF1',
        click() {
            radioClient.stream('http://stream.srg-ssr.ch/m/drs1/mp3_128');
        }
    }));

    radioMenu.append(new MenuItem(    {
        label: 'Radio SRF2',
        click() {
            radioClient.stream('http://stream.srg-ssr.ch/m/drs2/mp3_128');
        }
    }));
    radioMenu.append(new MenuItem(    {
        label: 'Radio SRF3',
        click() {
            radioClient.stream('http://stream.srg-ssr.ch/m/drs3/mp3_128');
        }
    }));
    radioMenu.append(new MenuItem(    {
        label: 'Radio SRF4 News',
        click() {
            radioClient.stream('http://stream.srg-ssr.ch/m/drs4news/mp3_128');
        }
    }));

    radioMenu.append(new MenuItem(    {
        label: 'Radio SRF Virus',
        click() {
            radioClient.stream('http://stream.srg-ssr.ch/m/drsvirus/mp3_128');
        }
    }));

    radioMenu.append(new MenuItem({
        type: 'separator'
    }));

    radioMenu.append(new MenuItem(    {
        label: 'Stop',
        click() {
            radioClient.stop();
        }
    }));

    radioMenu.append(new MenuItem({
        type: 'separator'
    }));

    radioMenu.append(new MenuItem({
        label: 'Github Repository',
        click() {
            require('electron').shell.openExternal('https://github.com/stefanzweifel/radio-srf-menubarapp');
        }
    }));

    radioMenu.append(new MenuItem({
        label: 'About',
        click() {
            dialog.showMessageBox({
                title: 'Über',
                message: 'Radio SRF v0.0.2 ALPHA - Created by Stefan Zweifel.',
                detail: `Danke dass du diese kleine App nutzt! 🙌🏼`,
                buttons: ["OK"]
            });
        }
    }));

    radioMenu.append(new MenuItem({
        label: 'Schliessen',
        click() {
            app.quit();
        }
    }));


    // Stop Radio Client when hitting Play/Pause Button
    // Crashed application or throws errors :(
    // globalShortcut.register('MediaPlayPause', () => {
    //     radioClient.stop();
    // })


    mb.tray.setContextMenu(radioMenu);
})