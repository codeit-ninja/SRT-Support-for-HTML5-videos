# 💐 Add support for SRT subtitles in HTML5 video elements

Officially only VTT files are supported by the HTML5 track element. 
This package will convert your SRT subtitles on the fly to VTT subtitles.

### What's new in v2?

- Add [TextDecoder](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder?retiredLocale=nl) to support all kinds of encodings
    - SRT can be encoded in [multiple formats](https://en.wikipedia.org/wiki/SubRip#Text_encoding), while WebVTT should only be [encoded in UTF-8](https://www.w3.org/TR/webvtt1/#file-structure) format.
- Does not break the TextTrack selection in video elements
  - The previous version broke the TextTrack selection in the captions' menu. So when you had multiple captions you could not switch between them.
- Is available as a package (ESM) or as a ready to use script

### Installation

As a NPM package, works both in the browser and NodeJS

```text
npm install ...
```

CDN
- Ready to use script, just include it, and it will parse all video elements to convert the tracks
```text
https://cdn.jsdelivr.net/gh/codeit-ninja/SRT-Support-for-HTML5-videos@master/dist/main.iife.js
```

ES Module
- Use as ES Module, see usage section
```text
https://cdn.jsdelivr.net/gh/codeit-ninja/SRT-Support-for-HTML5-videos@master/dist/main.es.js
```

### Usage
If you installed it as a package using NPM or as an ES Module using the CDN, you have to call the `transformSrtTracks()` manually in order to transform the tracks.

```javascript
import { transformSrtTracks } from 'srt-support-for-html5-videos'
```