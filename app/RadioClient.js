'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _icy = require('icy');

var _icy2 = _interopRequireDefault(_icy);

var _lame = require('lame');

var _lame2 = _interopRequireDefault(_lame);

var _speaker = require('speaker');

var _speaker2 = _interopRequireDefault(_speaker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RadioClient = function () {
    function RadioClient() {
        _classCallCheck(this, RadioClient);

        this.currentlyPlaying = null;
        this.isPlaying = false;
        this.speaker = new _speaker2.default();
    }

    _createClass(RadioClient, [{
        key: 'stream',
        value: function stream(url) {
            var _this = this;

            if (this.isPlaying === true) {
                this.stop();
            }

            _icy2.default.get(url, function (res) {

                // log any "metadata" events that happen
                // TODO: Would be nice if this information could be displayed in
                // the menubar or the application menu.
                res.on('metadata', function (metadata) {
                    var parsed = _icy2.default.parse(metadata);
                    console.error(parsed.StreamTitle);
                });

                _this.currentlyPlaying = res;
                res.pipe(new _lame2.default.Decoder()).pipe(_this.speaker);
                _this.isPlaying = true;
            });
        }

        /**
         * Stop current playback.
         * It currently takes 1-2 seconds to acutally stop the music.
         * @return {void}
         */

    }, {
        key: 'stop',
        value: function stop() {
            if (this.isPlaying === true) {
                this.speaker.close(); // Mute Sound
                this.currentlyPlaying.res.client.destroy(); // Close Connection

                this.isPlaying = false;
                this.speaker = new _speaker2.default();
            }
        }
    }]);

    return RadioClient;
}();

exports.default = RadioClient;