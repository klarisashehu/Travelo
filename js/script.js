// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HERO SLIDER =====
const heroSlides   = document.querySelectorAll('.hero-slide');
const heroDots     = document.querySelectorAll('.hero-dot');
const heroProgress = document.getElementById('heroProgressBar');
const heroPrev     = document.getElementById('heroPrev');
const heroNext     = document.getElementById('heroNext');

let currentSlide = 0;
let heroTimer;
const SLIDE_DURATION = 5000; // 5 sekonda

function goToSlide(index) {
  // Hiq active nga i gjithë
  heroSlides[currentSlide].classList.remove('active');
  heroDots[currentSlide].classList.remove('active');

  // Vendos indexin e ri
  currentSlide = (index + heroSlides.length) % heroSlides.length;

  heroSlides[currentSlide].classList.add('active');
  heroDots[currentSlide].classList.add('active');

  // Reset progress bar
  heroProgress.style.transition = 'none';
  heroProgress.style.width = '0%';
  setTimeout(() => {
    heroProgress.style.transition = `width ${SLIDE_DURATION}ms linear`;
    heroProgress.style.width = '100%';
  }, 50);
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

function startAutoPlay() {
  heroTimer = setInterval(nextSlide, SLIDE_DURATION);
}

function resetAutoPlay() {
  clearInterval(heroTimer);
  startAutoPlay();
}

// Butonat e shigjetave
heroNext.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
heroPrev.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });

// Dots
heroDots.forEach(dot => {
  dot.addEventListener('click', () => {
    goToSlide(+dot.dataset.index);
    resetAutoPlay();
  });
});

// Pauzo kur miu është mbi hero
document.querySelector('.hero').addEventListener('mouseenter', () => clearInterval(heroTimer));
document.querySelector('.hero').addEventListener('mouseleave', startAutoPlay);

// Fillo
goToSlide(0);
startAutoPlay();


/// ===== MODAL DESTINACIONIT =====
const modalOverlay = document.getElementById('modalOverlay');
const modalClose   = document.getElementById('modalClose');
const modalImg     = document.getElementById('modalImg');
const modalTitle   = document.getElementById('modalTitle');
const modalPrice   = document.getElementById('modalPrice');
const modalDesc    = document.getElementById('modalDesc');
const modalRezervo = document.getElementById('modalRezervo');

document.querySelectorAll('.open-modal').forEach(btn => {
  btn.addEventListener('click', () => {

    const modalMore = document.getElementById('modalMore');
    const card = btn.closest('.dest-card');

    const title = card.dataset.title;
    const price = card.dataset.price;
    const desc  = card.dataset.desc;
    const img = card.querySelector('img').src;
    const more = card.dataset.more;

    modalImg.style.backgroundImage = `url(${img})`;
    modalTitle.textContent = title;
    modalPrice.textContent = 'Nga ' + price;
    modalDesc.textContent = desc;
    modalMore.textContent = more;

    modalRezervo.href = '#contact';

    modalOverlay.classList.add('active');

    document.body.style.overflow = 'hidden';
  });
});

// ===== Mbyll modalin =====
function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

modalRezervo.addEventListener('click', closeModal);

// ===== FILTER DESTINATIONS =====

const filterButtons = document.querySelectorAll('.filter-btn');
const destinationCards = document.querySelectorAll('.dest-card');

filterButtons.forEach(button => {

  button.addEventListener('click', () => {

    // ACTIVE BUTTON
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;

    destinationCards.forEach(card => {

      const category = card.dataset.category;

      if (filter === 'all' || category === filter) {

        card.style.display = 'block';

      } else {

        card.style.display = 'none';

      }

    });

  });

});
// ===== FORM SUBMISSION =====

const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');

form.addEventListener('submit', (e) => {

  e.preventDefault();

  const name  = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const msg   = document.getElementById('fmsg').value.trim();

  // reset messages
  formError.classList.remove('show');
  formSuccess.classList.remove('show');

  // validation
  if (!name || !email || !msg) {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailPattern.test(email)) {

  formError.textContent = 'Ju lutem shkruani një email të vlefshëm!';
  formError.classList.add('show');

  return;
}

    formError.textContent = 'Ju lutem plotësoni të gjitha të dhënat!';
    formError.classList.add('show');

    return;
  }

  const btn = form.querySelector('button[type="submit"]');

  btn.disabled = true;
  btn.textContent = 'Duke dërguar...';

  setTimeout(() => {

    form.reset();

    btn.disabled = false;
    btn.textContent = 'Dërgo Kërkesën';

    formSuccess.classList.add('show');

    setTimeout(() => {
      formSuccess.classList.remove('show');
    }, 5000);

  }, 1200);

});