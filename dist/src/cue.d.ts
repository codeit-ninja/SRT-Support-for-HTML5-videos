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
     *
     * @param {number} number
     * @param {number} startTime
     * @param {number} endTime
     * @param {string} text
     */
    constructor(number: number, startTime: number, endTime: number, text: string);
    /**
     * @readonly
     * @type {number}
     */
    readonly number: number;
    /**
     * @readonly
     * @type {number}
     */
    readonly startTime: number;
    /**
     * @readonly
     * @type {number}
     */
    readonly endTime: number;
    /**
     * @readonly
     * @type {string}
     */
    readonly text: string;
}
//# sourceMappingURL=cue.d.ts.map