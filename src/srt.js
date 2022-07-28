import WebVtt from "./webvtt.js";

import {fetchTrack, srt2vtt, toVttCue} from "./helpers.js";
import {SrtValidationError} from "./errors/SrtValidationError.js";

class Srt {
    /**
     * @type {string|File|Blob}
     * @readonly
     */
    input;
    /**
     * Instance type of input
     *
     * @type {string}
     * @readonly
     */
    type;
    /**
     * Current input encoding format
     *
     * @type {string}
     * @readonly
     */
    encoding;
    /**
     * Raw body of the input
     *
     * @type {string}
     * @readonly
     */
    body;
    /**
     * List of cues parsed from input
     *
     * @type {Cue[]}
     * @readonly
     */
    cues;
    /**
     * @type {TextTrack}
     * @readonly
     */
    track;
    /**
     * List of supported instances you can
     * pass to the constructor
     *
     * If input is not in the list we throw an error
     *
     * @type {string[]}
     * @readonly
     */
    supported = ['String', 'Blob', 'File'];
    /**
     * Generated output file
     *
     * @type {string|File|Blob}
     * @readonly
     */
    output;

    /**
     * @param {string|File|Blob} input
     * @param {string} body
     * @param {?string} encoding
     */
    constructor(input, body, encoding = 'UTF-8') {
        this.input = input;
        this.encoding = encoding;
        this.body = body;
        this.type = input.constructor.name;

        if ( ! this.supported.includes(this.type) ) {
            throw new SrtValidationError(`Input is not supported, only instances of ${this.supported.join(', ')} are supported`);
        }

        try {
            this.cues = this.body.split(/\r?\n\r?\n/g).map(toVttCue);
        } catch (e) {
            throw new SrtValidationError('This file does not appear to be in a valid SRT format.');
        }
    }

    /**
     * Append as an `TextTrack` to an `video` *element*.
     *
     * @param {HTMLVideoElement} video
     * @param {string} label
     * @param {string} lang
     * @param {'caption'|'subtitles'} kind
     */
    appendTo(video, label, lang = '', kind = 'subtitles') {
        this.track = video.addTextTrack(kind, label, lang);

        this.cues.forEach(cue => this.track.addCue(new VTTCue(cue.startTime, cue.endTime, cue.text)));

        return this.track;
    }

    /**
     * Returns input
     *
     * @return {string|File|Blob}
     */
    getInput() {
        return this.input;
    }

    /**
     * Returns output.
     *
     * If called before conversion, output will be undefined.
     *
     * @return {string|File|Blob|undefined}
     */
    getOutput() {
        return this.output;
    }

    /**
     * Returns input raw body data
     *
     * @return {string}
     */
    getBody() {
        return this.body;
    }

    /**
     * Returns list of Cues
     *
     * @return {Cue[]}
     */
    getCues() {
        return this.cues;
    }

    /**
     * Converts input to WebVTT
     *
     * @return {WebVtt}
     */
    toWebVTT() {
        if ( 'File' === this.input.constructor.name ) {
            this.output = new File([srt2vtt(this.body)], this.input.name.replace('.srt', '.vtt'), { type: 'text/vtt' });
        }

        if ( 'Blob' === this.input.constructor.name ) {
            this.output = new Blob([srt2vtt(this.body)], { type: 'text/vtt' });
        }

        if ( 'String' === this.input.constructor.name ) {
            this.output = srt2vtt(this.body);
        }

        return this.output = new WebVtt(this.output);
    }

    /**
     * Returns text contents of the input
     *
     * @return {Promise<string>}
     */
    async text() {
        return await this.getOriginal().text();
    }

    /**
     * Returns input as a file
     *
     * @return {Blob}
     */
    getOriginal() {
        return new Blob([this.input]);
    }

    /**
     * @param {string|File|Blob} input
     * @param {?string} encoding
     */
    static async from(input, encoding = 'UTF-8') {
        try {
            const url = new URL(input);

            input = await fetchTrack(url);
        } catch(e) {}

        if ( 'File' === input.constructor.name || 'Blob' === input.constructor.name ) {
            return new Srt(input, await input.text(), encoding);
        }

        return new Srt(input, input, encoding);
    }
}

export default Srt;