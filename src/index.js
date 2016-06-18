import menubar from 'menubar';
import {Menu} from 'electron';
import template from './MenuTemplate';

let mb = menubar({
    dir: __dirname,
    icon: 'src/images/pause-icon@2x.png'
});

mb.on('ready', function ready () {
    mb.tray.setContextMenu(
        Menu.buildFromTemplate(template)
    );
})

// Accelerator - Media Keys