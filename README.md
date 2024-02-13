# 💐 Add support for SRT subtitles in HTML5 video elements

> ✅ This package uses **0** external dependencies!

**Why is zero external dependencies important?**

Using external dependencies not only make you code base very large, but can and will pose a security risks over time.

Officially only VTT files are supported by the HTML5 track element. 
This package will convert your SRT subtitles on the fly to VTT subtitles.

### 👉 What's new in v2?
- Updated code base to modern JavaScript
- Added [TextDecoder](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder?retiredLocale=nl) to support all kinds of encodings
    - SRT can be encoded in [multiple formats](https://en.wikipedia.org/wiki/SubRip#Text_encoding), while WebVTT should only be [encoded in UTF-8](https://www.w3.org/TR/webvtt1/#file-structure) format.
- Does not break the TextTrack selection in video elements
  - The previous version broke the TextTrack selection in the captions' menu. So when you had multiple captions you could not switch between them.
- Is available as a package (ES module) or as a ready to use script
- No external dependencies
- More functionality included
- TypeScript support

### Installation

As a NPM package, works both in the browser and NodeJS

```text
npm install srt-support-for-html5-videos
```

**CDN**
- Ready to use script, just include it, and it will parse all video elements to convert the tracks
```text
https://cdn.jsdelivr.net/npm/srt-support-for-html5-videos/dist/main.iife.js
```

**ES Module**
- Use as ES Module, see usage section
```text
https://cdn.jsdelivr.net/npm/srt-support-for-html5-videos/dist/main.es.js
```

### Usage
If you installed it as a package using NPM or as an ES Module using the CDN, you have to call the `transformSrtTracks()` manually in order to transform the tracks.

```javascript
// If using NPM
import { transformSrtTracks } from 'srt-support-for-html5-videos';
// If using CDN
import { transformSrtTracks } from 'https://cdn.jsdelivr.net/npm/srt-support-for-html5-videos/dist/main.es.js';

// Single video element
const video = document.getElementById('video');

transformSrtTracks(video);

// All video elements
const videos = document.querySelectorAll('video');

[...videos].forEach(transformSrtTracks);
```

If your SRT file is encoded in a different format than *UTF-8* you must specify the encoding format in the `track` element using the `data-encoding` *attribute*.

```html
<video src="/path/to/video.mp4">
  <track src="/path/to/subtitle_en.srt" label="English" srclang="en" data-encoding="iso-8859-2" kind="subtitles" default>
  <track src="/path/to/subtitle_nl.srt" label="Nederlands" srclang="nl" data-encoding="iso-8859-2" kind="subtitles">
</video>
```

### Other functions
Some more functions are exported, these are just helper functions, you can import and use them if you have any use for them.

#### toVttCue
Function is internally used to covert a srt cue into a WebVTT compatible cue.

```javascript
/**
 * Converts a SRT cue into a VTT compatible cue
 * 
 * For example
 *
 * 1
 * 00:00:00,498 --> 00:00:02,827
 * Here's what I love most
 * about food and diet.
 *
 * Will be converted into
 *
 * Cue {
 *     number: 1,
 *     startTime: 0.498
 *     endTime: 2.827,
 *     text: 'Here\'s what I love most\nabout food and diet.'
 * }
 *
 */
import { toVttCue } from 'srt-support-for-html5-videos';
```
#### hmsToSeconds
Converts a `HH:MM:SS.MS` string into a *number in seconds*

```javascript
/**
 * Converts a VTT or SRT timing `string` 
 * to a `number` in seconds + milliseconds
 */
import { hmsToSeconds } from 'srt-support-for-html5-videos';

const seconds = hmsToSeconds('00:00:02.827'); // 2.827
```
#### fetchTrack
Fetches the contents of a track and returns the body.

```javascript
/**
 * Fetches the contents of a track source
 */
import { fetchTrack } from 'srt-support-for-html5-videos';

const content = await fetchTrack('https://example.com/path/my-subtitle.srt');
```

#### srt2vtt
Convert SRT to VTT.

There is no advanced API returning to add extra *VTT* sections like a header, comment or styles.

```javascript
/**
 * Converts SRT formatted string into a WebVTT formated string
 */
import { srt2vtt } from 'srt-support-for-html5-videos';

const vtt = srt2vtt(srt);
```

### Support me
[<img src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-1.svg">](https://www.buymeacoffee.com/codeit)