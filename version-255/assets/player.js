import { H as Hls } from './hls-vendor.js';

export function mountPlayer(videoUrl, videoId, coverId) {
    const video = document.getElementById(videoId);
    const cover = document.getElementById(coverId);

    if (!video || !cover || !videoUrl) {
        return;
    }

    let ready = false;
    let hls = null;

    const load = () => {
        if (!ready) {
            ready = true;
            if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = videoUrl;
            } else if (Hls.isSupported()) {
                hls = new Hls({
                    enableWorker: true,
                    lowLatencyMode: true,
                    backBufferLength: 90
                });
                hls.loadSource(videoUrl);
                hls.attachMedia(video);
            } else {
                video.src = videoUrl;
            }
        }

        cover.classList.add('is-hidden');
        video.play().catch(() => {});
    };

    cover.addEventListener('click', load);
    video.addEventListener('click', () => {
        if (video.paused) {
            load();
        }
    });
    video.addEventListener('play', () => cover.classList.add('is-hidden'));
    video.addEventListener('ended', () => cover.classList.remove('is-hidden'));
    window.addEventListener('pagehide', () => {
        if (hls) {
            hls.destroy();
        }
    });
}
