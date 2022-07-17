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
     * Parses a `HTMLTrackElement`
     *
     * @param {HTMLTrackElement} track
     */
    constructor(track: HTMLTrackElement);
    /**
     * @readonly
     * @type {string}
     */
    readonly src: string;
    /**
     * @readonly
     * @type {string}
     */
    readonly encoding: string;
    /**
     * @readonly
     * @type {string}
     */
    readonly lang: string;
    /**
     * @readonly
     * @type {string}
     */
    readonly kind: string;
    /**
     * @readonly
     * @type {string}
     */
    readonly label: string;
    /**
     * @readonly
     * @type {boolean}
     */
    readonly default: boolean;
    /**
     * @readonly
     * @type {string}
     */
    readonly body: string;
    /**
     * @readonly
     * @type {boolean}
     */
    readonly needsTransform: boolean;
    /**
     * @readonly
     * @type {Cue[]}
     */
    readonly cues: Cue[];
    parse(): Promise<void>;
}
import Cue from "./cue.js";
//# sourceMappingURL=track.d.ts.map