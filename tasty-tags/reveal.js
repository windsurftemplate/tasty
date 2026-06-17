// scroll reveal + nav scroll state + onset bar trigger
(function () {
  const head = document.getElementById('siteHead');
  const onScroll = () => {
    if (window.scrollY > 24) head.classList.add('scrolled');
    else head.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // theme toggle (persists in localStorage; no-flash init runs in <head>)
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme') === 'midnight' ? 'midnight' : 'light';
      const next = cur === 'midnight' ? 'light' : 'midnight';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('tt-theme', next); } catch (e) {}
    });
  }

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('.reveal');
  // Arm the hidden state only when motion is allowed. If we never arm (reduced
  // motion / JS error), content stays visible by default — safe for exports.
  if (reduce) {
    document.querySelectorAll('.onset').forEach((el) => el.classList.add('in'));
  } else {
    document.documentElement.classList.add('reveal-on');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    reveals.forEach((el) => io.observe(el));

    // trigger onset bar fills when band enters
    const onset = document.querySelector('.onset');
    if (onset) {
      const bo = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in');
              bo.unobserve(e.target);
            }
          });
        },
        { threshold: 0.35 }
      );
      bo.observe(onset);
    }
  }

  // mobile menu — simple smooth jump to nav targets / toggle
  const menuBtn = document.getElementById('menuBtn');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      window.location.hash = '#licensing';
    });
  }
})();
