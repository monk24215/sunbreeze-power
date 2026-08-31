document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  document.querySelectorAll('.faq-item').forEach((item) => {
    const q = item.querySelector('.faq-q');
    q.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach((open) => open.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // TODO: point this at the live ClickBank hoplink/pay link once the product is set up in ClickBank.
  // Example format: https://pay.clickbank.net/?vendor=YOURVENDORID&item=1
  const buyButtons = document.querySelectorAll('#buy-button, .btn-primary[href="#offer"]');
  buyButtons.forEach((btn) => {
    if (btn.id === 'buy-button') {
      btn.addEventListener('click', (e) => {
        if (btn.getAttribute('href') === '#') {
          e.preventDefault();
          console.warn('SunBreeze: buy-button href is a placeholder. Set it to the ClickBank pay link.');
          document.getElementById('offer').scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  });
});
