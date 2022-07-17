import { toVttCue, fetchTrack } from './helpers.js';

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
export default class Track {
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