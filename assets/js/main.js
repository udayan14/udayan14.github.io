/* ==========================================================================
   Udayan Joshi — Portfolio Interactive Behavior
   ========================================================================== */

(function () {
  'use strict';

  // 1. Theme Toggle
  const root = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('uj-theme', theme);
    } catch (_) {}
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // 2. Mobile Navigation Drawer
  const mobileBtn = document.getElementById('mobile-nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', function () {
      const expanded = navLinks.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', String(expanded));
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Copy Email Button
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    const originalLabel = copyEmailBtn.querySelector('.copy-label');
    copyEmailBtn.addEventListener('click', function () {
      const email = copyEmailBtn.getAttribute('data-email') || '14udayanjoshi@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function () {
          if (originalLabel) {
            const prev = originalLabel.textContent;
            originalLabel.textContent = 'Email Copied!';
            setTimeout(function () {
              originalLabel.textContent = prev;
            }, 1800);
          }
        });
      } else {
        window.location.href = 'mailto:' + email;
      }
    });
  }

  // 4. Patents Filter Tabs & Live Search
  const filterTabs = document.querySelectorAll('.filter-tab');
  const searchInput = document.getElementById('patent-search');
  const patentCards = document.querySelectorAll('.patent-card');
  const emptyState = document.getElementById('patent-empty');

  let activeFilter = 'all';
  let searchQuery = '';

  function updatePatents() {
    if (!patentCards.length) return;
    let visibleCount = 0;

    patentCards.forEach(function (card) {
      const status = card.getAttribute('data-status') || '';
      const text = (card.textContent || '').toLowerCase();
      const matchesTab = activeFilter === 'all' || status === activeFilter;
      const matchesQuery = !searchQuery || text.indexOf(searchQuery) !== -1;

      if (matchesTab && matchesQuery) {
        card.removeAttribute('hidden');
        visibleCount++;
      } else {
        card.setAttribute('hidden', '');
      }
    });

    if (emptyState) {
      if (visibleCount === 0) {
        emptyState.removeAttribute('hidden');
      } else {
        emptyState.setAttribute('hidden', '');
      }
    }
  }

  filterTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      filterTabs.forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      activeFilter = tab.getAttribute('data-filter') || 'all';
      updatePatents();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', function (e) {
      searchQuery = (e.target.value || '').trim().toLowerCase();
      updatePatents();
    });
  }

  // 5. Section Scroll-Spy for Header Nav
  const sectionAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
  if (sectionAnchors.length && 'IntersectionObserver' in window) {
    const sections = [];
    sectionAnchors.forEach(function (a) {
      const id = a.getAttribute('href').slice(1);
      const sec = document.getElementById(id);
      if (sec) sections.push({ id: id, el: sec, link: a });
    });

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            sectionAnchors.forEach(function (a) {
              a.classList.remove('active');
            });
            const match = sections.find(function (s) {
              return s.el === entry.target;
            });
            if (match) match.link.classList.add('active');
          }
        });
      },
      { rootMargin: '-25% 0px -65% 0px', threshold: 0 }
    );

    sections.forEach(function (s) {
      observer.observe(s.el);
    });
  }
})();
