import { toVttCue, fetchTrack } from './helpers.js';
import Cue from './cue.js';

/**
 * @property {string}   src
 * @property {string}   encoding
 * @property {string}   lang
 * @property {string}   kind
 * @property {string}   label
 * @property {string}   default
 * @property {string}   body
 * @property {Cue[]}    cues
 */
export default class Track {
    /**
     * @readonly
     * @type {string|undefined}
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
     * @type {Cue[]}
     */
    cues = [];

    /**
     * @param {Track} track
     * @constructor
     */
    constructor(track) {
        this.src = track.src;
        this.encoding = track.encoding || 'UTF-8';
        this.lang = track.lang;
        this.kind = track.kind;
        this.label = track.label;
        this.default = track.default || false;
        this.body = track.body;
        this.cues = track.cues;
    }

    /**
     * Parses a `HTMLTrackElement`
     *
     * @param {HTMLTrackElement} track
     */
    static async fromHTML(track) {
        let t = {
            src: track.src,
            encoding: track.dataset.encoding,
            lang: track.srclang,
            kind: track.kind,
            label: track.label,
            default: track.default
        }

        return new Track(t);
    }
}