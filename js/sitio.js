/* ═══════════════════════════════════════════
   DATOS DE CONTACTO — editar SÓLO aquí.
   Se inyectan solos en las 22 páginas del sitio.
   ═══════════════════════════════════════════ */

const DATOS = {
  whatsapp:  '524498905064',
  telefono:  '+52 449 890 5064',
  correo:    'hello@casatauro.com',

  instagram:   'https://www.instagram.com/casatauro_/',
  facebook:    'https://www.facebook.com/casataurocostalegre',
  tripadvisor: 'https://www.tripadvisor.cl/Hotel_Review-g150788-d1862692-Reviews-Playas_Paraiso-Careyes_Costalegre.html',

  mensaje: {
    es: 'Hola, me gustaría consultar disponibilidad en Casa Tauro.',
    en: 'Hello, I would like to ask about staying at Casa Tauro.'
  }
};

/* ── De aquí para abajo no hay nada que editar ── */

(function () {
  const idioma = document.documentElement.lang === 'en' ? 'en' : 'es';
  const wa = 'https://wa.me/' + DATOS.whatsapp +
             '?text=' + encodeURIComponent(DATOS.mensaje[idioma]);

  const valores = {
    'wa':          wa,
    'correo':      'mailto:' + DATOS.correo,
    'instagram':   DATOS.instagram,
    'facebook':    DATOS.facebook,
    'tripadvisor': DATOS.tripadvisor
  };

  document.querySelectorAll('[data-link]').forEach(function (a) {
    const destino = valores[a.dataset.link];
    if (destino) a.href = destino;
  });

  document.querySelectorAll('[data-texto]').forEach(function (el) {
    const clave = el.dataset.texto;
    if (clave === 'telefono') el.textContent = DATOS.telefono;
    if (clave === 'correo')   el.textContent = DATOS.correo;
    if (clave === 'anio')     el.textContent = new Date().getFullYear();
  });
})();

/* ── Menú y comportamiento del header ── */

(function () {
  const btn   = document.querySelector('[data-abrir]');
  const panel = document.querySelector('[data-panel]');
  const cab   = document.querySelector('[data-cab]');

  if (btn && panel) {
    btn.addEventListener('click', function () {
      const abierto = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!abierto));
      panel.hidden = abierto;
      if (cab && cab.classList.contains('cab-sobre')) {
        cab.classList.toggle('fijo', !abierto);
      }
    });
  }

  /* En páginas con hero a sangre, el header recupera fondo al hacer scroll. */
  if (cab && cab.classList.contains('cab-sobre')) {
    const centinela = document.createElement('div');
    centinela.style.cssText = 'position:absolute;top:80vh;height:1px;width:1px;';
    document.body.prepend(centinela);
    new IntersectionObserver(function (entradas) {
      cab.classList.toggle('fijo', !entradas[0].isIntersecting);
    }).observe(centinela);
  }
})();
