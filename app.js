const menu = document.querySelector('.menu');
const nav = document.querySelector('#navigation');
menu?.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open', !expanded);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav?.classList.contains('open')) {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.focus();
  }
});
const lightbox = document.querySelector('#lightbox');
document.querySelectorAll('[data-lightbox]').forEach(button => {
  button.addEventListener('click', () => {
    const original = button.querySelector('img');
    const enlarged = lightbox.querySelector('img');
    enlarged.src = original.src;
    enlarged.alt = original.alt;
    lightbox.querySelector('p').textContent = original.alt;
    lightbox.showModal();
  });
});
lightbox?.querySelector('.close').addEventListener('click', () => lightbox.close());
lightbox?.addEventListener('click', event => {
  if (event.target === lightbox) {
    const rect = lightbox.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) lightbox.close();
  }
});
document.querySelector('#contact-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const body = `Navn og adresse: ${data.get('name')}\nE-post: ${data.get('email')}\nØnsket tidspunkt: ${data.get('when') || 'Ikke oppgitt'}\n\nProsjekt:\n${data.get('message')}`;
  window.location.href = `mailto:firmapost@tomlangen.no?subject=${encodeURIComponent('Forespørsel om befaring')}&body=${encodeURIComponent(body)}`;
  document.querySelector('#form-status').textContent = 'Forespørselen er klargjort i e-postprogrammet ditt. Trykk Send der for å sende den. Hvis programmet ikke åpnes, ring 48 45 58 59 eller skriv til firmapost@tomlangen.no.';
});
