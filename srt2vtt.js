document.addEventListener("DOMContentLoaded", function () {
    /**
     * Get all videos
     */
    var videoElements = document.getElementsByTagName('video');
    
    /**
     * This function converts all srt's to vtt files
     */
    function convertSrtToVtt() 
    {
        /**
         * Generate an unique identifier
         */
        this.id = '_' + Math.random().toString(36).substr(2, 9);
        
        /**
         * All tracks assigned to current video element
         */
        var tracks = document.querySelectorAll("#" + this.id + " track");
        
        var subtitle = {
            data: 
            {
                track: {}
            },
            /**
             * Load the file from url
             *
             * @param {object}    track   - DOM <track /> object
             */
            load: function(track) 
            {
                subtitle.track = track;
                
                if(subtitle.isSrt(subtitle.track.src)) 
                {
                    var client = new XMLHttpRequest();
                    client.open('GET', subtitle.track.src);
                    client.onreadystatechange = function() 
                    {
                        subtitle.convert(client.responseText).then(
                            function (file) 
                            {
                                /**
                                 * Replace the srt file with the generated vtt file
                                 */
                                subtitle.track.src = file   
                            }
                        );
                    }
                    client.send();
                }
            },
            /**
             * Converts the SRT string to a VTT formatted string
             *
             * @param   {string}    content     - SRT string
             * @return  {object}    promise     - Returns a promise with the generated file as the return value
             */
            convert: function(content) 
            {
                var promise = new Promise( 
                    function (resolve, reject) 
                    {
                        /**
                         * Replace all (,) commas with (.) dots. Eg: 00:00:01,144 -> 00:00:01.144
                         */
                        content = content.replace(/(\d+:\d+:\d+)+,(\d+)/g, '$1.$2');
                        content = "WEBVTT - Generated using SRT2VTT\r\n\r\n" + content;
                        
                        /**
                         * Convert content to a file
                         */
                        var blob = new Blob([content], {type: 'text/vtt'});
                        var file = window.URL.createObjectURL(blob);
                        
                        resolve(file);
                    }
                );
                
                return promise;
            },
            isSrt: function(filename) 
            {
                return filename.split('.').pop().toLowerCase() === 'srt' ? true : false;
            },
            isVTT: function(filename) 
            {
                return filename.split('.').pop().toLowerCase() === 'vtt' ? true : false;
            }
        }
        
        for(var i = 0;i < tracks.length;i++) 
        {
            subtitle.load(tracks[i]);
        }
    }
    
    for(var i = 0;i < videoElements.length;i++) 
    {
        videoElements[i].addEventListener('canplay', convertSrtToVtt);
    }
});