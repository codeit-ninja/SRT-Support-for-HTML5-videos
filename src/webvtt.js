import {CalledItWrongError} from "./errors/CalledItWrongError.js";

export default class WebVtt {
    /**
     * @type {string|File|Blob} input
     * @readonly
     */
    input;

    /**
     * @param {string|File|Blob} input
     * @constructor
     */
    constructor(input) {
        this.input = input;
    }

    /**
     * Create object url from output
     *
     * @return {string}
     * @throws {CalledItWrongError}
     */
    createUrl() {
        if ( 'String' === this.input.constructor.name ) {
            return URL.createObjectURL(new Blob([this.input], { type: 'text/vtt' }));
        }

        return URL.createObjectURL(this.input);
    }

    /**
     * Create file from input
     *
     * @return {File}
     * @throws {CalledItWrongError}
     */
    createFile() {
        return new File([this.input], this.input.name.replace('.srt', '.vtt'), { type: 'text/vtt' });
    }

    /**
     * Create blob from input
     *
     * @return {Blob}
     * @throws {CalledItWrongError}
     */
    createBlob() {
        return new Blob([this.input], { type: 'text/vtt' });
    }

    /**
     * Create ReadableStream from input
     *
     * @return {ReadableStream<Uint8Array>}
     * @throws {CalledItWrongError}
     */
    createStream() {
        return this.createBlob().stream();
    }
}