import icy from 'icy';
import lame from 'lame';
import Speaker from 'speaker';

export default class RadioClient {

    constructor(url) {
        this.url = url;
    }

    stream() {
        icy.get(this.url, function (res) {

            console.error(res.headers);

            // log any "metadata" events that happen
            res.on('metadata', function (metadata) {
                var parsed = icy.parse(metadata);
                console.error(parsed);
            });

            res.pipe(new lame.Decoder()).pipe(new Speaker());
        });
    }
}