import { transformSrtTracks } from './src/transformer';

document.addEventListener('DOMContentLoaded', () => [...document.querySelectorAll('video')].forEach(transformSrtTracks));