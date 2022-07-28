import Cue from "./cue.js";
import { SrtValidationError } from "./errors/SrtValidationError.js";

/**
 * Check if given string is in a valid SRT format
 *
 * @param {string} str
 * @return {boolean}
 */
export function isValid(str) {
    const startsWithNumber = /^\d+/.test(str);
    const hasSrtTimingFormat = /\d+:\d+:\d+,\d+\s+-->\s+\d+:\d+:\d+,\d+/.test(str);

    return ! ( !startsWithNumber || !hasSrtTimingFormat );
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
 *
 * @throws SrtValidationError
 */
export function toVttCue(srtCue) {
    if( ! isValid(srtCue) ) {
        throw new SrtValidationError('Not a valid SRT cue');
    }

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
export async function fetchTrack(src, encoding = 'utf-8') {
    return fetch(src).then(r => r.arrayBuffer()).then(r => new TextDecoder(encoding).decode(r));
}
/**
 * Converts SRT formatted string into a WebVTT formatted string
 * 
 * *Example*
 * 
 * Converts
 * ```text
 * 1
 * 00:00:00,498 --> 00:00:02,827
 * - Here's what I love most
 * about food and diet.
 * 
 * 2
 * 00:00:02,827 --> 00:00:06,383
 * We all eat several times a day,
 * and we're totally in charge
 * ```
 * 
 * Into
 * ```text
 * WEBVTT
 * 
 * 1
 * 00:00:00.498 --> 00:00:02.827
 * - Here's what I love most
 * about food and diet.
 * 
 * 2
 * 00:00:02.827 --> 00:00:06.383
 * We all eat several times a day,
 * and we're totally in charge
 * ```
 * 
 * @param {string} srt
 * @returns string
 */
export function srt2vtt(srt) {
    return 'WEBVTT\n\n' + srt.split(/\n/g).map(line => line.replace(/((\d+:){0,2}\d+),(\d+)/g, '$1.$3')).join('\n');
}