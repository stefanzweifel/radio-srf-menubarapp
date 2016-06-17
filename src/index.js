const electron   = require('electron');
const menubar    = require('menubar');
const dialog     = electron.dialog;
const Menu       = electron.Menu;
const MenuItem   = electron.MenuItem;
const icy        = require('icy');

/**
 * Have to Wait, till Lame and Speaker are fixed
 * @type {[type]}
 */
// const lame    = require('lame');
const Speaker = require('speaker');





var mb = menubar({
    dir: __dirname,
    icon: 'src/icon.png'
});

mb.on('ready', function ready () {

    menu = new Menu();
    menu.append(new MenuItem({
        label: 'Radio SRF1',
        click() {

            let streamUrl = 'http://stream.srg-ssr.ch/drs1/mp3_128.m3u';

            // connect to the remote stream
            icy.get(streamUrl, function (res) {

                // log the HTTP response headers
                console.error(res.headers);

                // log any "metadata" events that happen
                res.on('metadata', function (metadata) {
                    var parsed = icy.parse(metadata);
                    console.error(parsed);
                });

                console.log(res);

                // Let's play the music (assuming MP3 data).
                // lame decodes and Speaker sends to speakers!
                // res.pipe(new lame.Decoder()).pipe(new Speaker());

            });

        }
    }));
    menu.append(new MenuItem({type: 'separator'}));
    menu.append(new MenuItem({
        label: 'About',
        click: function() {
            dialog.showMessageBox({
                title: 'About',
                message: 'SoundCast v1.7. Created by Stefan Zweifel.',
                detail: 'https://www.github.com/stefanzweifel',
                buttons: ["OK"]
            });
        }
    }));

    mb.tray.setToolTip('This is my application.');
    mb.tray.setContextMenu(menu);

})

// Accelerator - Media Keys