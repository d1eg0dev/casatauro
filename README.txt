CASA TAURO — sitio en HTML plano
================================

NO NECESITA INSTALAR NADA.
Haz doble clic en index.html y se abre en tu navegador.


QUÉ HAY AQUÍ
------------
index.html        Home en español
css/estilo.css    TODOS los estilos del sitio (colores, tipografía, componentes)
js/sitio.js       Datos de contacto + menú. Se carga en todas las páginas.
img/              Fotos, logo, favicon
video/            Video del home
en/               Versiones en inglés


PARA CAMBIAR TELÉFONO, CORREO O REDES
-------------------------------------
Abre js/sitio.js y edita el bloque DATOS de arriba.
Cambia ahí y se actualiza en TODO el sitio, incluido el botón de WhatsApp.
No busques el teléfono dentro de los HTML: no está escrito ahí.


PARA CAMBIAR COLORES O TIPOGRAFÍA
---------------------------------
Abre css/estilo.css. Arriba está el bloque :root con todo:

  --anil: #22407D    ← color de los botones. Cámbialo y cambian todos.
  --cal:  #FBFAF8    ← fondo
  --tinta:#14161C    ← texto


FOTOS QUE FALTAN
----------------
Ponlas en img/ con estos nombres exactos:

  hero-aerea.jpg     foto grande del inicio (2400px lado largo)
  casa-aerea.jpg     foto a sangre completa
  poster-video.jpg   miniatura del video
  og.jpg             1200x630, la que sale al compartir el enlace
  logo.svg           tu logo real (hay uno provisional puesto)

Mientras no estén, verás cuadros vacíos. Es normal.


CÓMO PUBLICARLO
---------------
Subes esta carpeta a GitHub y la conectas a Cloudflare Pages.
NO hay comando de build: se publican los archivos tal cual.
