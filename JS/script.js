/**
 * TANYM'S ENVISIONS - Futuristic Blog Interaction Controller
 * Handles article modal reader, category filtering, scroll spy, and FAB
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Back to Top Floating Action Button (FAB)
  const topBtn = document.getElementById('myBtn');

  const handleScroll = () => {
    if (window.scrollY > 280) {
      topBtn.classList.add('visible');
    } else {
      topBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  if (topBtn) {
    topBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 2. Active Navigation Spy
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-pill-link');

  const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // 3. Category Filter System
  const filterButtons = document.querySelectorAll('.filter-chip-btn');
  const galleryCards = document.querySelectorAll('.gallery-card-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Interactive Article Reader Modal
  const articleModalEl = document.getElementById('articleModal');
  const modalImg = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalReadTime = document.getElementById('modalReadTime');
  const modalExcerpt = document.getElementById('modalExcerpt');
  const modalDownloadBtn = document.getElementById('modalDownloadBtn');

  if (articleModalEl) {
    const bsModal = new bootstrap.Modal(articleModalEl);

    document.querySelectorAll('.btn-card-explore, .card-media-wrapper').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const card = trigger.closest('.futuristic-card');
        if (!card) return;

        const img = card.querySelector('.card-img-futuristic');
        const title = card.querySelector('.card-title-futuristic');
        const category = card.querySelector('.card-badge-category');
        const readTime = card.querySelector('.card-badge-readtime');
        const text = card.querySelector('.card-text-narrative');

        if (img && modalImg) {
          modalImg.src = img.src;
          modalImg.alt = title ? title.textContent : 'Article Visual';
        }
        if (title && modalTitle) {
          modalTitle.textContent = title.textContent;
        }
        if (category && modalCategory) {
          modalCategory.textContent = category.textContent;
        }
        if (readTime && modalReadTime) {
          modalReadTime.textContent = readTime.textContent;
        }
        if (text && modalExcerpt) {
          modalExcerpt.textContent = text.textContent;
        }
        if (modalDownloadBtn && img) {
          modalDownloadBtn.href = img.src;
        }

        bsModal.show();
      });
    });
  }

  // 5. Smooth Anchor Scrolling & Auto-close Mobile Offcanvas
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        const offcanvasEl = document.getElementById('mobileNavDrawer');
        if (offcanvasEl) {
          const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
          if (bsOffcanvas) {
            bsOffcanvas.hide();
          }
        }
      }
    });
  });

  // 6. Dynamic Year
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
