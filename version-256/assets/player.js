function initMoviePlayer(videoSource) {
    var video = document.getElementById('movie-player');
    var cover = document.getElementById('player-cover');
    var hlsInstance = null;
    var started = false;

    if (!video || !cover || !videoSource) {
        return;
    }

    function beginPlayback() {
        if (started) {
            video.play().catch(function() {});
            return;
        }

        started = true;
        cover.classList.add('is-hidden');

        if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = videoSource;
            video.play().catch(function() {});
            return;
        }

        if (window.Hls && window.Hls.isSupported()) {
            hlsInstance = new window.Hls({
                enableWorker: true,
                lowLatencyMode: true,
                backBufferLength: 90
            });
            hlsInstance.loadSource(videoSource);
            hlsInstance.attachMedia(video);
            hlsInstance.on(window.Hls.Events.MANIFEST_PARSED, function() {
                video.play().catch(function() {});
            });
            hlsInstance.on(window.Hls.Events.ERROR, function(event, data) {
                if (data && data.fatal) {
                    if (data.type === window.Hls.ErrorTypes.NETWORK_ERROR) {
                        hlsInstance.startLoad();
                    } else if (data.type === window.Hls.ErrorTypes.MEDIA_ERROR) {
                        hlsInstance.recoverMediaError();
                    } else {
                        hlsInstance.destroy();
                        video.src = videoSource;
                        video.play().catch(function() {});
                    }
                }
            });
            return;
        }

        video.src = videoSource;
        video.play().catch(function() {});
    }

    cover.addEventListener('click', beginPlayback);
    video.addEventListener('click', function() {
        if (!started) {
            beginPlayback();
        }
    });
}
