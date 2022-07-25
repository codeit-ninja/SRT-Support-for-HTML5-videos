/**
 * A valid VTT cue
 *
 * The properties of this class are compatible with `VTTCue`
 * and can be used to create a `new VTTCue` instance
 *
 * *Example*
 * ```js
 * new VTTCue(cue.startTime, cue.endTime, cue.text);
 * ```
 *
 * @property {number}   number
 * @property {number}   startTime
 * @property {number}   endTime
 * @property {string}   text
 */
class Cue {
    /**
     * @readonly
     * @type {number}
     */
    number;
    /**
     * @readonly
     * @type {number}
     */
    startTime;
    /**
     * @readonly
     * @type {number}
     */
    endTime;
    /**
     * @readonly
     * @type {string}
     */
    text;
    /**
     *
     * @param {number} number
     * @param {number} startTime
     * @param {number} endTime
     * @param {string} text
     */
    constructor(number, startTime, endTime, text) {
        this.number = number;
        this.startTime = startTime;
        this.endTime = endTime;
        this.text = text;
    }
}

/**
 * Converts an SRT cue into a VTT compatible cue
 *
 * For example
 *
 * ```txt
 * 1
 * 00:00:00,498 --> 00:00:02,827
 * Here's what I love most
 * about food and diet.
 * ```
 *
 * Will be converted into
 *
 * ```js
 * Cue {
 *     number: 1,
 *     startTime: 0.498
 *     endTime: 2.827,
 *     text: 'Here\'s what I love most\n about food and diet.'
 * }
 * ```
 *
 * @param {string} srtCue
 * @returns Cue
 */
function toVttCue(srtCue) {
    const convertedCue = {
        number: parseInt(srtCue.match(/^\d+/g)[0]),
        timing: {
            start: srtCue.match(/(\d+:){2}\d+,\d+/g)[0].replace(',', '.'),
            end: srtCue.match(/(\d+:){2}\d+,\d+/g)[1].replace(',', '.')
        },
        text: srtCue.split(/\r?\n/g).slice(2, srtCue.split(/\r?\n/g).length).join('\n')
    };
    return new Cue(convertedCue.number, hmsToSeconds(convertedCue.timing.start), hmsToSeconds(convertedCue.timing.end), convertedCue.text);
}
/**
 * Converts a VTT or SRT timing `string`
 * to a `number` in seconds + milliseconds
 *
 * *Example*
 * ```js
 * const seconds = hmsToSeconds('00:00:02.827'); // 2.827
 * ```
 *
 * @param {string} str
 * @returns number
 */
function hmsToSeconds(str) {
    let p = str.split(':'),
        s = 0,
        m = 1;
    while (p.length > 0) {
        s += m * parseFloat(p.pop(), 10);
        m *= 60;
    }
    return s;
}
/**
 * Fetches the contents of a track source
 *
 * *Example*
 * ```js
 * const content = await fetchTrack('https://example.com/path/my-subtitle.srt')
 * ```
 * @param {string} src          - url
 * @param {string} encoding     - file encoding format
 * @returns Promise<string>
 */
async function fetchTrack(src, encoding = 'utf-8') {
    return fetch(src).then(r => r.arrayBuffer()).then(r => new TextDecoder(encoding).decode(r));
}

/**
 * @property {string}   src
 * @property {string}   encoding
 * @property {string}   lang
 * @property {string}   kind
 * @property {string}   label
 * @property {string}   default
 * @property {string}   body
 * @property {boolean}     needsTransform
 * @property {Cue[]}    cues
 */
class Track {
    /**
     * @readonly
     * @type {string}
     */
    src;
    /**
     * @readonly
     * @type {string}
     */
    encoding;
    /**
     * @readonly
     * @type {string}
     */
    lang;
    /**
     * @readonly
     * @type {string}
     */
    kind;
    /**
     * @readonly
     * @type {string}
     */
    label;
    /**
     * @readonly
     * @type {boolean}
     */
    default;
    /**
     * @readonly
     * @type {string}
     */
    body;
    /**
     * @readonly
     * @type {boolean}
     */
    needsTransform;
    /**
     * @readonly
     * @type {Cue[]}
     */
    cues = [];
    /**
     * Parses a `HTMLTrackElement`
     *
     * @param {HTMLTrackElement} track
     */
    constructor(track) {
        this.src = track.src;
        this.encoding = track.dataset.encoding;
        this.lang = track.srclang;
        this.kind = track.kind;
        this.label = track.label;
        this.default = track.default;
        this.needsTransform = !this.src.endsWith('.vtt');
    }
    async parse() {
        this.body = await fetchTrack(this.src);
        this.cues = this.body.split(/\r?\n\r?\n/g).map(toVttCue);
    }
}

/**
 * Converts all SRT files into WebVTT files.
 *
 * @param {HTMLVideoElement} video
 */
async function transformSrtTracks(video) {
    const tracks = [...video.querySelectorAll('track')].map(track => new Track(track));
    for (const track of tracks) {
        if ( ! track.needsTransform ) continue;
        /**
         * Fetch track from URL and parse its content
         * We need to do before we can use it.
         */
        await track.parse();
        /**
         * Add new TextTrack to video
         * We later fill this with the transformed data
         */
        const t = video.addTextTrack(track.kind, track.label, track.lang);
        /**
         * Add all cue's we retrieved from the original
         * SRT file to the newly created track
         */
        track.cues.forEach(cue => t.addCue(new VTTCue(cue.startTime, cue.endTime, cue.text)));
        if ( track.default ) {
            t.mode = 'showing';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => [...document.querySelectorAll('video')].forEach(transformSrtTracks));
