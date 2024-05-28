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
export function toVttCue(srtCue: string): false | Cue;
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
export function hmsToSeconds(str: string): number;
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
export function fetchTrack(src: string, encoding?: string): Promise<string>;
/**
 * Converts SRT formatted string into a WebVTT formated string
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
 * @param {string} srtBody
 * @returns string
 */
export function srt2vtt(srtBody: string): string;
import Cue from "./cue.js";
