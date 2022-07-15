import { hmsToSeconds, toVttCue } from './helpers';
import { transformSrtTracks } from './src/transformer';

document.addEventListener('DOMContentLoaded', () => [...document.querySelectorAll('video')].forEach(transformSrtTracks));

export {
    hmsToSeconds,
    toVttCue,
    transformSrtTracks
}