const filterButtons = document.querySelectorAll('[data-filter]');
const productCards = document.querySelectorAll('[data-cat]');

if (filterButtons.length && productCards.length) {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selected = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.remove('is-active'));
      button.classList.add('is-active');

      productCards.forEach((card) => {
        const shouldShow = selected === 'all' || card.dataset.cat === selected;
        card.style.display = shouldShow ? 'block' : 'none';
      });
    });
  });
}

const revealTargets = document.querySelectorAll('.reveal');
if (revealTargets.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((el) => revealObserver.observe(el));
}

const capsuleCountdown = document.getElementById('capsule-countdown');
if (capsuleCountdown) {
  const endDate = new Date('2026-08-31T23:59:00+03:00').getTime();

  const renderCountdown = () => {
    const diff = endDate - Date.now();

    if (diff <= 0) {
      capsuleCountdown.textContent = 'распродажа завершена';
      return;
    }

    const dayMs = 1000 * 60 * 60 * 24;
    const hourMs = 1000 * 60 * 60;
    const minuteMs = 1000 * 60;

    const days = Math.floor(diff / dayMs);
    const hours = Math.floor((diff % dayMs) / hourMs);
    const minutes = Math.floor((diff % hourMs) / minuteMs);

    capsuleCountdown.textContent = `${days}д ${hours}ч ${minutes}м`;
  };

  renderCountdown();
  setInterval(renderCountdown, 60000);
}
