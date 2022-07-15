import Cue from "./src/cue.js"

/**
 * Converts a SRT cue into a VTT compatible cue
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
 *     text: 'Here\'s what I love most\nabout food and diet.'
 * }
 * ```
 * 
 * @param {string} srtCue
 * @returns Cue
 */
export function toVttCue(srtCue) {
    const convertedCue = {
        number: parseInt(srtCue.match(/^\d+/g)[0]),
        timing: {
            start: srtCue.match(/(\d+:){2}\d+,\d+/g)[0].replace(',', '.'),
            end: srtCue.match(/(\d+:){2}\d+,\d+/g)[1].replace(',', '.')
        },
        text: srtCue.split(/\r?\n/g).slice(2, srtCue.split(/\r?\n/g).length).join('\n')
    }

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
export function hmsToSeconds(str) {
    var p = str.split(':'),
        s = 0, m = 1;

    while (p.length > 0) {
        s += m * parseFloat(p.pop(), 10);
        m *= 60;
    }

    return s;
}
