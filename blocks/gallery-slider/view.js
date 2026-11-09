(function () {
    document.querySelectorAll('.gallery-slider__track').forEach(function (track) {
        var isDown = false;
        var startX = 0;
        var scrollStart = 0;

        track.addEventListener('mousedown', function (event) {
            if (event.button !== 0) {
                return;
            }

            isDown = true;
            startX = event.pageX;
            scrollStart = track.scrollLeft;
            track.classList.add('is-dragging');
        });

        track.addEventListener('mouseup', function () {
            isDown = false;
            track.classList.remove('is-dragging');
        });

        track.addEventListener('mouseleave', function () {
            isDown = false;
            track.classList.remove('is-dragging');
        });

        track.addEventListener('mousemove', function (event) {
            if (!isDown) {
                return;
            }

            event.preventDefault();
            track.scrollLeft = scrollStart - (event.pageX - startX);
        });
    });
}());
