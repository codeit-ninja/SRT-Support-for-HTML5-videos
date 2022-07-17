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
export default class Cue {
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