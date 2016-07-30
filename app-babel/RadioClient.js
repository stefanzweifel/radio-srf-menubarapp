import icy from 'icy';
import lame from 'lame';
import Speaker from 'speaker';

export default class RadioClient {

    constructor() {
        this.currentlyPlaying = null;
        this.isPlaying        = false;
        this.speaker          = new Speaker();
    }

    stream(url) {

        if (this.isPlaying === true) {
            this.stop();
        }

        icy.get(url, (res) => {

            // log any "metadata" events that happen
            // TODO: Would be nice if this information could be displayed in
            // the menubar or the application menu.
            res.on('metadata', function (metadata) {
                var parsed = icy.parse(metadata);
                console.error(
                    parsed.StreamTitle
                );
            });

            this.currentlyPlaying = res;
            res.pipe(new lame.Decoder()).pipe(this.speaker);
            this.isPlaying = true;
        });
    }

    /**
     * Stop current playback.
     * It currently takes 1-2 seconds to acutally stop the music.
     * @return {void}
     */
    stop() {
        if (this.isPlaying === true) {
            this.speaker.close(); // Mute Sound
            this.currentlyPlaying.res.client.destroy(); // Close Connection

            this.isPlaying = false;
            this.speaker = new Speaker();
        }
    }

}