document.querySelectorAll('a.scroll').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 600; // em ms
        let start = null;

        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const easeInOutQuad = (t) =>
                t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // função de aceleração suave
            const time = Math.min(progress / duration, 1);
            const run = startPosition + distance * easeInOutQuad(time);
            window.scrollTo(0, run);
            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        }

        window.requestAnimationFrame(step);
    });
});