
(function () {
  'use strict';

  // ---- Mobile sidebar toggle ----
  var toggle = document.getElementById('menuToggle');
  var overlay = document.getElementById('overlay');
  function closeNav() { document.body.classList.remove('nav-open'); }
  if (toggle) {
    toggle.addEventListener('click', function () {
      document.body.classList.toggle('nav-open');
    });
  }
  if (overlay) overlay.addEventListener('click', closeNav);

  // ---- Sidebar filter ----
  var search = document.getElementById('navSearch');
  if (search) {
    search.addEventListener('input', function () {
      var q = search.value.trim().toLowerCase();
      var items = document.querySelectorAll('.sidebar li');
      var sections = document.querySelectorAll('.nav-section');
      items.forEach(function (li) {
        var text = li.textContent.toLowerCase();
        li.style.display = !q || text.indexOf(q) !== -1 ? '' : 'none';
      });
      sections.forEach(function (sec) {
        var any = sec.querySelectorAll('li');
        var visible = false;
        any.forEach(function (li) { if (li.style.display !== 'none') visible = true; });
        sec.style.display = visible ? '' : 'none';
      });
    });
  }

  // ---- Keep active sidebar item in view ----
  var active = document.querySelector('.sidebar li.active');
  if (active && active.scrollIntoView) {
    active.scrollIntoView({ block: 'center' });
  }

  // ---- TOC scroll-spy ----
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll('.toc a'));
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    var headings = [];
    tocLinks.forEach(function (a) {
      var id = decodeURIComponent(a.getAttribute('href').slice(1));
      var el = document.getElementById(id);
      if (el) { map[id] = a; headings.push(el); }
    });
    var current = null;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          if (current) current.classList.remove('active');
          var link = map[entry.target.id];
          if (link) { link.classList.add('active'); current = link; }
        }
      });
    }, { rootMargin: '0px 0px -75% 0px', threshold: 0 });
    headings.forEach(function (h) { observer.observe(h); });
  }
})();
