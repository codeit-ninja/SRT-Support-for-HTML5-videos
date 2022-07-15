import Track from './track.js';

/**
 * 
 * @param {HTMLVideoElement} video 
 */
export async function transformSrtTracks(video) {
    let tracks = [...video.querySelectorAll('track')].map(track => new Track(track));

    tracks.forEach(async track => {
        if ( ! track.needsTransform ) return;
        /**
         * Fetch track from URL and parse its content
         * We need to do before we can use it.
         */
        await track.parse();
        /**
         * Add new TextTrack to video
         * We later fill this with the transformed data
         */
        const t = video.addTextTrack(track.kind, track.label, track.lang);
        /**
         * Add all cue's we retrieved from the original
         * SRT file to the newly created track
         */
        track.cues.forEach(cue => t.addCue(new VTTCue(cue.startTime, cue.endTime, cue.text)));

        if ( track.default ) {
            t.mode = 'showing';
        }

        console.log(track);
    })
}
