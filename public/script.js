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

  // Pricing tiers: 1 @ $27, 2 @ $24 each + $2.49 shipping each, 3 @ $24 each + free shipping.
  const tierNote = document.getElementById('tier-note');
  const tierRadios = document.querySelectorAll('#pricing-tiers input[name="tier"]');
  const tierSummaries = {
    '1': '1 Bundle &mdash; $27 plus shipping at checkout.',
    '2': '2 Bundles &mdash; $24 each, plus $2.49 shipping per bundle, plus a free folding camp grill.',
    '3': '3 Bundles &mdash; $24 each, free shipping, plus a free folding camp grill with each bundle.',
  };
  tierRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      if (tierNote && tierSummaries[radio.value]) {
        tierNote.innerHTML = tierSummaries[radio.value];
      }
    });
  });

  // Reveal the real-photo gallery only once the images actually exist in public/images/ —
  // keeps the site looking intentional (no broken-image icons) until those files are uploaded.
  var gallery = document.getElementById('gallery-section');
  if (gallery) {
    var probe = new Image();
    probe.onload = function () { gallery.hidden = false; };
    probe.src = 'images/fan-product-shot.jpg';
  }

  // TODO: point this at the live ClickBank hoplink/pay link for the selected tier once the
  // products are set up in ClickBank. Each tier (1/2/3 bundles) will likely need its own
  // hoplink or a cart-quantity parameter — example format:
  // https://pay.clickbank.net/?vendor=YOURVENDORID&item=1&qty=2
  const buyButtons = document.querySelectorAll('#buy-button, .btn-primary[href="#offer"]');
  buyButtons.forEach((btn) => {
    if (btn.id === 'buy-button') {
      btn.addEventListener('click', (e) => {
        if (btn.getAttribute('href') === '#') {
          e.preventDefault();
          const selected = document.querySelector('#pricing-tiers input[name="tier"]:checked');
          console.warn(
            'SunBreeze: buy-button href is a placeholder. Set it to the ClickBank pay link for tier '
            + (selected ? selected.value : '1') + '.'
          );
          document.getElementById('offer').scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  });
});
