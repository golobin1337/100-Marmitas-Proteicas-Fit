// Carrosséis automáticos (amostra do material, depoimentos, etc.)
(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initCarousel(trackId, dotsId) {
    var track = document.getElementById(trackId);
    var dotsWrap = document.getElementById(dotsId);
    if (!track || !dotsWrap) return;

    var cards = Array.prototype.slice.call(track.children);
    var dots = Array.prototype.slice.call(dotsWrap.children);
    if (cards.length < 2) return;

    var index = 0;
    var timer = null;
    var isPointerDown = false;

    function setActiveDot(i) {
      dots.forEach(function (dot, di) {
        dot.classList.toggle('is-active', di === i);
      });
    }

    function goTo(i, behavior) {
      index = (i + cards.length) % cards.length;
      track.scrollTo({ left: cards[index].offsetLeft - track.offsetLeft, behavior: behavior || 'smooth' });
      setActiveDot(index);
    }

    function next() {
      goTo(index + 1);
    }

    function start() {
      if (reduceMotion) return;
      stop();
      timer = setInterval(next, 4000);
    }

    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        stop();
        goTo(i);
        start();
      });
    });

    track.addEventListener('mouseenter', stop);
    track.addEventListener('mouseleave', start);
    track.addEventListener('touchstart', function () { isPointerDown = true; stop(); }, { passive: true });
    track.addEventListener('touchend', function () {
      isPointerDown = false;
      setTimeout(function () { if (!isPointerDown) start(); }, 2500);
    }, { passive: true });

    setActiveDot(0);
    start();
  }

  initCarousel('sampleTrack', 'sampleDots');
  initCarousel('testimonialTrack', 'testimonialDots');
})();
