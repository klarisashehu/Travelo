const track = document.getElementById('destTrack');
const btnLeft = document.getElementById('sliderLeft');
const btnRight = document.getElementById('sliderRight');

btnRight.addEventListener('click', () => {
  track.scrollBy({ left: 300, behavior: 'smooth' });
});

btnLeft.addEventListener('click', () => {
  track.scrollBy({ left: -300, behavior: 'smooth' });
});