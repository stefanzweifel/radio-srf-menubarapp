'use strict';

var _electron = require('electron');

var _menubar = require('menubar');

var _menubar2 = _interopRequireDefault(_menubar);

var _RadioClient = require('./RadioClient');

var _RadioClient2 = _interopRequireDefault(_RadioClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mb = (0, _menubar2.default)({
    icon: __dirname + '/radio-icon.png'
}); // import "babel-register";


mb.on('ready', function ready() {

    var radioMenu = new _electron.Menu();
    var radioClient = new _RadioClient2.default();

    radioMenu.append(new _electron.MenuItem({
        label: 'Radio SRF1',
        click: function click() {
            radioClient.stream('http://stream.srg-ssr.ch/m/drs1/mp3_128');
        }
    }));

    radioMenu.append(new _electron.MenuItem({
        label: 'Radio SRF2',
        click: function click() {
            radioClient.stream('http://stream.srg-ssr.ch/m/drs2/mp3_128');
        }
    }));
    radioMenu.append(new _electron.MenuItem({
        label: 'Radio SRF3',
        click: function click() {
            radioClient.stream('http://stream.srg-ssr.ch/m/drs3/mp3_128');
        }
    }));
    radioMenu.append(new _electron.MenuItem({
        label: 'Radio SRF4 News',
        click: function click() {
            radioClient.stream('http://stream.srg-ssr.ch/m/drs4news/mp3_128');
        }
    }));

    radioMenu.append(new _electron.MenuItem({
        label: 'Radio SRF Virus',
        click: function click() {
            radioClient.stream('http://stream.srg-ssr.ch/m/drsvirus/mp3_128');
        }
    }));

    radioMenu.append(new _electron.MenuItem({
        type: 'separator'
    }));

    radioMenu.append(new _electron.MenuItem({
        label: 'Stop',
        click: function click() {
            radioClient.stop();
        }
    }));

    radioMenu.append(new _electron.MenuItem({
        type: 'separator'
    }));

    radioMenu.append(new _electron.MenuItem({
        label: 'Github Repository',
        click: function click() {
            require('electron').shell.openExternal('https://github.com/stefanzweifel/radio-srf-menubarapp');
        }
    }));

    radioMenu.append(new _electron.MenuItem({
        label: 'About',
        click: function click() {
            _electron.dialog.showMessageBox({
                title: 'Über',
                message: 'Radio SRF v0.0.2 ALPHA - Created by Stefan Zweifel.',
                detail: 'Danke dass du diese kleine App nutzt! 🙌🏼',
                buttons: ["OK"]
            });
        }
    }));

    radioMenu.append(new _electron.MenuItem({
        label: 'Schliessen',
        click: function click() {
            _electron.app.quit();
        }
    }));

    mb.tray.setContextMenu(radioMenu);
});