import {Menu, MenuItem, dialog, app} from 'electron';
import menubar from 'menubar';
import RadioClient from './app/RadioClient';

let mb = menubar({
    dir: __dirname,
    icon: 'src/resources/radio-icon@2x.png'
});

mb.on('ready', function ready () {

    const radioMenu = new Menu();
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

    mb.tray.setContextMenu(radioMenu);
})