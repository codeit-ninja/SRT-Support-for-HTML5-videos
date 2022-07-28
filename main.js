/**
 *         _       _       
 *        (_)     (_)      
 *   _ __  _ _ __  _  __ _     
 *  | '_ \| | '_ \| |/ _` |    
 *  | | | | | | | | | (_| |    
 *  |_| |_|_|_| |_| |\__,_|    
 *               _/ |    
 *              |__/    
 */
import { hmsToSeconds, toVttCue, srt2vtt, fetchTrack } from './src/helpers.js';
import { transformSrtTracks } from './src/transformer.js';
import SRT from './src/srt.js';

export {
    hmsToSeconds,
    toVttCue,
    transformSrtTracks,
    srt2vtt,
    fetchTrack
}

const file = document.getElementById('file');
const video = document.getElementById('video');

file.addEventListener('change', async event => {
    const srt = await SRT.from(file.files[0]);

    const url = srt
        .getCues()

    console.log(await url);
});

// const videos = document.querySelectorAll('video');
//
// [...videos].forEach(transformSrtTracks);