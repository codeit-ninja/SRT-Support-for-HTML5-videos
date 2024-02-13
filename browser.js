import { transformSrtTracks } from './src/transformer.js';

document.addEventListener('DOMContentLoaded', () => [...document.querySelectorAll('video')].forEach(transformSrtTracks));