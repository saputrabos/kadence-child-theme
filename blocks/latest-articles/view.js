(function () {
    document.addEventListener('click', function (event) {
        var button = event.target.closest('.annur-articles__next');

        if (!button) {
            return;
        }

        var trackId = button.getAttribute('aria-controls');
        var track = trackId ? document.getElementById(trackId) : null;

        if (!track) {
            return;
        }

        track.scrollBy({
            left: track.clientWidth * 0.85,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        });
    });
}());
