import Cue from "./cue.js";
import { toVttCue } from '../helpers.js';

export default class Track {
    /**
     * @type {string}
     */
    src;
    /**
     * @type {string}
     */
    encoding;
    /**
     * @type {string}
     */
    lang;
    /**
     * @type {string}
     */
    kind;
    /**
     * @type {string}
     */
    label;
    /**
     * @type {boolean}
     */
    default;
    /**
     * @type {string}
     */
    content;
    /**
     * @type {boolean}
     */
    needsTransform;
    /**
     * @type {Cue[]}
     */
    cues = [];

    /**
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
        this.needsTransform = true;

        if ( this.src.endsWith('.vtt') ) {
            this.needsTransform = false;
        }
    }

    async parse() {
        const decoder = new TextDecoder(this.encoding);
        const doFetch = await fetch(this.src);
        const arrayBuffer = await doFetch.arrayBuffer();

        this.content = decoder.decode(arrayBuffer);
        this.cues = this.content.split(/\r?\n\r?\n/g).map(toVttCue);
    }
}
