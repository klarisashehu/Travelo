// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== CAROUSEL =====
const track    = document.getElementById('destTrack');
const btnLeft  = document.getElementById('sliderLeft');
const btnRight = document.getElementById('sliderRight');

btnRight.addEventListener('click', () => {
  track.scrollBy({ left: 400, behavior: 'smooth' });
});

btnLeft.addEventListener('click', () => {
  track.scrollBy({ left: -400, behavior: 'smooth' });
});

// ===== MODAL DESTINACIONIT =====
const modalOverlay = document.getElementById('modalOverlay');
const modalClose   = document.getElementById('modalClose');
const modalImg     = document.getElementById('modalImg');
const modalTitle   = document.getElementById('modalTitle');
const modalPrice   = document.getElementById('modalPrice');
const modalDesc    = document.getElementById('modalDesc');
const modalRezervo = document.getElementById('modalRezervo');

// Hap modalin kur klikohet "Shiko më shumë"
document.querySelectorAll('.open-modal').forEach(btn => {
  btn.addEventListener('click', () => {
    const card  = btn.closest('.dest-card');
    const title = card.dataset.title;
    const price = card.dataset.price;
    const desc  = card.dataset.desc;
    const img   = card.style.backgroundImage;

    modalImg.style.backgroundImage = img;
    modalTitle.textContent          = title;
    modalPrice.textContent          = 'Nga ' + price;
    modalDesc.textContent           = desc;
    modalRezervo.href               = '#contact';

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

// Mbyll modalin
function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

modalRezervo.addEventListener('click', () => {
  closeModal();
});

// ===== FORM SUBMISSION =====
const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name  = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const msg   = document.getElementById('fmsg').value.trim();

  if (!name || !email || !msg) {
    alert('Ju lutem plotësoni të gjitha fushat e detyrueshme!');
    return;
  }

  const btn = form.querySelector('button[type="submit"]');
  btn.disabled    = true;
  btn.textContent = 'Duke dërguar...';

  setTimeout(() => {
    form.reset();
    btn.disabled    = false;
    btn.textContent = 'Dërgo Kërkesën';
    formSuccess.classList.add('show');
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1200);
});
