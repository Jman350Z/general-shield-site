/* General Shield — microsite behavior.
   All behavior lives in this file so the page can run under a strict
   Content-Security-Policy (script-src 'self'): no inline scripts,
   no inline event handlers. */
(function () {
  'use strict';

  /* Flag that JavaScript is running, so styles.css may apply the
     reveal-on-scroll starting state without hiding content from
     visitors who have JavaScript off. */
  document.documentElement.classList.add('js');

  /* Keep the footer year current. */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* Reveal cards as they scroll into view. */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* Highlight the nav link for the section currently on screen. */
  var navLinks = document.querySelectorAll('header nav a[href^="#"]');
  var sections = [];
  navLinks.forEach(function (link) {
    var target = document.querySelector(link.getAttribute('href'));
    if (target) {
      sections.push({ link: link, target: target });
    }
  });
  if ('IntersectionObserver' in window && sections.length) {
    var spyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        sections.forEach(function (item) {
          item.link.classList.toggle('active', item.target === entry.target);
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (item) { spyObserver.observe(item.target); });
  }
})();
