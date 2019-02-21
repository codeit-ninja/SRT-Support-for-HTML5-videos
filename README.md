# Add SRT files to the HTML5 track element
Officialy only VTT files are supported by the HTML5 track element. When using this script, you don't have to convert your SRT files into VTT files.
This will be done directly by this script.

### Usage
Nothing different than the usual way, only now `.srt` files are allowed as well :)

````html
<video width="320" height="240" controls>
	<source src="/path/to/your/video.mp4" type="video/mp4">
	<source src="/path/to/your/video.ogg" type="video/ogg">

	<track label="English" kind="subtitles" srclang="en" src="path/to/your/subtitle-en.srt" default />
	<track label="Deutsch" kind="subtitles" srclang="de" src="path/to/your/subtitle-de.srt" />
	<track label="Español" kind="subtitles" srclang="es" src="path/to/your/subtitle-es.srt" />
</video>
````

The *file* given in the `src` of the `track` element will be converted to a `blob` *vtt* file. Eg:
````html
<track label="English" kind="subtitles" srclang="en" src="blob:https://example.com/1114ad19-4df0-4817-9517-cf1b1878bc5e" default />
````