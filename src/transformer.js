import SRT from "./srt.js";

/**
 * Converts all SRT files into WebVTT files.
 * 
 * @param {HTMLVideoElement} video 
 */
export function transformSrtTracks(video) {
    [...video.querySelectorAll('track')].forEach(async track => track.src = (await SRT.from(track.src)).toWebVTT().createUrl());
}