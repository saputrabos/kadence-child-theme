(function () {
    function getYoutubeId(value) {
        var url;

        try {
            url = new URL(value, window.location.href);
        } catch (error) {
            return '';
        }

        if (url.protocol !== 'https:' && url.protocol !== 'http:') {
            return '';
        }

        var host = url.hostname.toLowerCase();
        var id = '';

        if (host === 'youtu.be') {
            id = url.pathname.split('/').filter(Boolean)[0] || '';
        } else if (
            host === 'youtube.com' ||
            host === 'www.youtube.com' ||
            host === 'm.youtube.com' ||
            host === 'youtube-nocookie.com' ||
            host === 'www.youtube-nocookie.com'
        ) {
            id = url.searchParams.get('v') || '';

            if (!id) {
                var match = url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/);
                id = match ? match[1] : '';
            }
        }

        return /^[A-Za-z0-9_-]{11}$/.test(id) ? id : '';
    }

    function clearVideo(dialog) {
        var frame = dialog.querySelector('.kadence-hero__video-frame');
        frame.replaceChildren();
    }

    document.addEventListener('click', function (event) {
        var playButton = event.target.closest('.kadence-hero__play[data-video-url]');

        if (playButton) {
            var videoId = getYoutubeId(playButton.getAttribute('data-video-url'));
            var dialogId = playButton.getAttribute('aria-controls');
            var dialog = dialogId ? document.getElementById(dialogId) : null;

            if (videoId && dialog && typeof dialog.showModal === 'function') {
                event.preventDefault();

                var frame = dialog.querySelector('.kadence-hero__video-frame');
                var iframe = document.createElement('iframe');
                iframe.src = 'https://www.youtube-nocookie.com/embed/' + videoId + '?autoplay=1&rel=0';
                iframe.title = 'Video Pondok Pesantren An-Nur II';
                iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
                iframe.allowFullscreen = true;
                frame.appendChild(iframe);
                dialog.showModal();
            }

            return;
        }

        var closeButton = event.target.closest('.kadence-hero__video-close');

        if (closeButton) {
            var closeDialog = closeButton.closest('.kadence-hero__video');

            if (closeDialog) {
                closeDialog.close();
                clearVideo(closeDialog);
            }
        }
    });

    document.addEventListener('close', function (event) {
        if (event.target.matches('.kadence-hero__video')) {
            clearVideo(event.target);
        }
    }, true);

    document.addEventListener('click', function (event) {
        if (event.target.matches('.kadence-hero__video')) {
            event.target.close();
        }
    });
}());
