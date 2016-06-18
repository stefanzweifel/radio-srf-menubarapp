import {Menu, MenuItem, dialog, app} from 'electron';
import menubar from 'menubar';
import RadioClient from './app/RadioClient';

let mb = menubar({
    dir: __dirname,
    icon: 'src/images/radio-icon@2x.png'
});

mb.on('ready', function ready () {

    const radioMenu = new Menu();
    let radioClient = new RadioClient();

    radioMenu.append(new MenuItem(    {
        label: 'Radio SRF1',
        click() {
            radioClient.stream('http://stream.srg-ssr.ch/m/drs1/mp3_128');
            radioMenu.items[0].enabled = false;
        }
    }));

    radioMenu.append(new MenuItem(    {
        label: 'Radio SRF2',
        click() {
            radioClient.stream('http://stream.srg-ssr.ch/m/drs2/mp3_128');
            radioMenu.items[1].enabled = false;
        }
    }));
    radioMenu.append(new MenuItem(    {
        label: 'Radio SRF3',
        click() {
            radioClient.stream('http://stream.srg-ssr.ch/m/drs3/mp3_128');
            radioMenu.items[2].enabled = false;
        }
    }));
    radioMenu.append(new MenuItem(    {
        label: 'Radio SRF4 News',
        click() {
            radioClient.stream('http://stream.srg-ssr.ch/m/drs4news/mp3_128');
            radioMenu.items[3].enabled = false;
        }
    }));

    radioMenu.append(new MenuItem(    {
        label: 'Radio SRF Virus',
        click() {
            radioClient.stream('http://stream.srg-ssr.ch/m/drsvirus/mp3_128');
            radioMenu.items[4].enabled = false;
        }
    }));

    radioMenu.append(new MenuItem({
        type: 'separator'
    }));

    radioMenu.append(new MenuItem(    {
        label: 'Stop playback (currently has delay)',
        click() {
            radioClient.stop();
        }
    }));

    radioMenu.append(new MenuItem({
        type: 'separator'
    }));

    radioMenu.append(new MenuItem({
        label: 'Learn More',
        click() {
            require('electron').shell.openExternal('http://electron.atom.io');
        }
    }));

    radioMenu.append(new MenuItem({
        label: 'About',
        click() {
            dialog.showMessageBox({
                title: 'About',
                message: 'Radio SRF v0.0.1 ALPHA - Created by Stefan Zweifel.',
                detail: 'https://www.github.com/stefanzweifel',
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




// Accelerator - Media Keys