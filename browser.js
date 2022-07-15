import { transform } from './src/transformer';

document.addEventListener('DOMContentLoaded', () => [...document.querySelectorAll('video')].forEach(transform));