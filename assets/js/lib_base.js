/* ==========================================================================
   BIBLIOTECA · íconos SVG, piezas gráficas y componentes de "juego"
   ========================================================================== */
(() => {
  const I = FD.icons = {};

  /* lente frontal con escala de distancias y diafragma */
  I.lens = (o = {}) => {
    const N = 9, r0 = o.ap ?? 120;
    let s = `<svg viewBox="-420 -420 840 840"><defs><clipPath id="lensclip${o.id || ''}"><circle r="250"/></clipPath>
      <radialGradient id="glass${o.id || ''}" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#3b3b38"/><stop offset=".6" stop-color="#111"/><stop offset="1" stop-color="#000"/></radialGradient></defs>`;
    s += `<circle class="ring" r="404" fill="none" stroke="currentColor" stroke-width="4"/>`;
    s += `<circle class="ring" r="378" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".55"/>`;
    s += `<g class="knurl">`;
    for (let i = 0; i < 120; i++) { const a = i * 3 * Math.PI / 180; s += `<line x1="${(Math.cos(a) * 338).toFixed(1)}" y1="${(Math.sin(a) * 338).toFixed(1)}" x2="${(Math.cos(a) * 366).toFixed(1)}" y2="${(Math.sin(a) * 366).toFixed(1)}" stroke="currentColor" stroke-width="2.4" opacity=".4"/>`; }
    s += `</g><circle class="ring" r="326" fill="none" stroke="currentColor" stroke-width="2" opacity=".8"/>`;
    s += `<g class="scale" font-family="IBM Plex Mono" font-size="21" fill="currentColor" text-anchor="middle" dominant-baseline="middle" opacity=".85">`;
    ['∞', '10', '5', '3', '2', '1.5', '1', '0.7'].forEach((m, i) => { const a = (-160 + i * 20) * Math.PI / 180; s += `<text x="${(Math.cos(a) * 296).toFixed(1)}" y="${(Math.sin(a) * 296).toFixed(1)}">${m}</text>`; });
    ['f/2', '2.8', '4', '5.6', '8', '11', '16', '22', '32', '64'].forEach((m, i) => { const a = (20 + i * 15) * Math.PI / 180; s += `<text x="${(Math.cos(a) * 296).toFixed(1)}" y="${(Math.sin(a) * 296).toFixed(1)}" ${m === '64' ? 'fill="#d42a1f" font-weight="700"' : ''}>${m}</text>`; });
    s += `</g><circle class="ring" r="262" fill="url(#glass${o.id || ''})" stroke="currentColor" stroke-width="3"/>`;
    s += `<g clip-path="url(#lensclip${o.id || ''})"><g class="iris">`;
    for (let i = 0; i < N; i++) {
      const th = (i * 360 / N) * Math.PI / 180, nx = Math.cos(th), ny = Math.sin(th), dx = -ny, dy = nx, a = r0 * Math.tan(Math.PI / N) * 1.02, L = 600;
      const T = [nx * r0, ny * r0], P1 = [T[0] - dx * a, T[1] - dy * a], P2 = [T[0] + dx * L, T[1] + dy * L], P3 = [P2[0] + nx * L, P2[1] + ny * L], P4 = [P1[0] + nx * L, P1[1] + ny * L];
      s += `<polygon points="${[P1, P2, P3, P4].map(v => v[0].toFixed(1) + ',' + v[1].toFixed(1)).join(' ')}" fill="#1c1c1a" stroke="#55534f" stroke-width="2"/>`;
    }
    s += `</g></g><path d="M -190 -120 A 230 230 0 0 1 -60 -218" stroke="#fff" stroke-width="10" fill="none" opacity=".18" stroke-linecap="round"/>`;
    s += `<path d="M 150 170 A 230 230 0 0 1 80 212" stroke="#fff" stroke-width="6" fill="none" opacity=".12" stroke-linecap="round"/></svg>`;
    return s;
  };
  I.crosshair = () => `<svg viewBox="0 0 150 150"><circle cx="75" cy="75" r="40" fill="none" stroke="#0c0c0b" stroke-width="5"/><line x1="75" y1="10" x2="75" y2="45" stroke="#0c0c0b" stroke-width="5"/><line x1="75" y1="105" x2="75" y2="140" stroke="#0c0c0b" stroke-width="5"/><line x1="10" y1="75" x2="45" y2="75" stroke="#0c0c0b" stroke-width="5"/><line x1="105" y1="75" x2="140" y2="75" stroke="#0c0c0b" stroke-width="5"/><circle cx="75" cy="75" r="7" fill="#d42a1f"/>
    <g class="brk" stroke="#d42a1f" stroke-width="6" fill="none"><path d="M5 30 V5 H30"/><path d="M120 5 H145 V30"/><path d="M5 120 V145 H30"/><path d="M120 145 H145 V120"/></g></svg>`;
  I.loupe = () => `<svg viewBox="0 0 150 150"><defs><clipPath id="lpc"><circle cx="62" cy="62" r="44"/></clipPath></defs><g clip-path="url(#lpc)" stroke="#0c0c0b" stroke-width="1.6" opacity=".55">${[...Array(12)].map((_, i) => `<line x1="${18 + i * 8}" y1="10" x2="${18 + i * 8}" y2="120"/><line x1="10" y1="${18 + i * 8}" x2="120" y2="${18 + i * 8}"/>`).join('')}</g><circle cx="62" cy="62" r="46" fill="none" stroke="#0c0c0b" stroke-width="8"/><line x1="96" y1="96" x2="138" y2="138" stroke="#0c0c0b" stroke-width="16" stroke-linecap="round"/><circle cx="62" cy="62" r="9" fill="#d42a1f"/></svg>`;
  I.zones = (w = 150, h = 60) => { let s = `<svg viewBox="0 0 ${w} ${h}">`; for (let i = 0; i < 11; i++) { const v = Math.round(255 * Math.pow(i / 10, 1.15)); s += `<rect class="zr" x="${(i * w / 11).toFixed(2)}" y="0" width="${(w / 11 + .6).toFixed(2)}" height="${h}" fill="rgb(${v},${v},${v})"/>`; } return s + `<rect x="0" y="0" width="${w}" height="${h}" fill="none" stroke="#0c0c0b" stroke-width="2"/></svg>`; };
  I.eye = () => `<svg viewBox="0 0 200 120"><path class="lid" d="M10 60 Q100 -20 190 60 Q100 140 10 60 Z" fill="none" stroke="currentColor" stroke-width="7" stroke-linejoin="round"/><circle class="iris" cx="100" cy="60" r="30" fill="none" stroke="currentColor" stroke-width="7"/><circle class="pupil" cx="100" cy="60" r="12" fill="#d42a1f"/></svg>`;
  /* cámara de campo de gran formato (dibujo técnico) */
  I.viewcam = () => `<svg viewBox="0 0 640 620" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">
    <path class="d" d="M80 120 H230 V400 H80 Z"/><path class="d" d="M95 135 H215 V385 H95 Z" stroke-width="2.5" opacity=".7"/>
    <path class="d" d="M230 150 L420 190 V330 L230 370"/><path class="d" d="M260 156 V364 M290 162 V358 M320 168 V352 M350 175 V345 M380 181 V339" stroke-width="2.5" opacity=".6"/>
    <path class="d" d="M420 170 H470 V350 H420 Z"/><circle class="d" cx="510" cy="260" r="46"/><circle class="d" cx="510" cy="260" r="26" stroke-width="3"/><path class="d" d="M470 230 H492 M470 290 H492"/>
    <path class="d" d="M60 420 H500"/><path class="d" d="M120 420 V440 H460 V420" stroke-width="3"/>
    <path class="d" d="M290 440 L200 610 M290 440 L290 610 M290 440 L380 610"/><path class="d" d="M250 520 H330" stroke-width="3"/>
    <path class="d" d="M95 260 H215 M155 135 V385" stroke-width="1.5" opacity=".6"/></svg>`;
  I.phone = () => `<svg viewBox="0 0 240 440" fill="none" stroke="currentColor" stroke-width="7"><rect x="10" y="10" width="220" height="420" rx="36"/><rect x="28" y="40" width="184" height="330" rx="10" stroke-width="3" opacity=".5"/><circle cx="120" cy="400" r="12" stroke-width="4"/><text x="120" y="230" text-anchor="middle" font-family="Anton" font-size="120" fill="currentColor" stroke="none">M</text><text x="120" y="290" text-anchor="middle" font-family="IBM Plex Mono" font-size="20" fill="currentColor" stroke="none" letter-spacing="3">MANUAL</text></svg>`;

  /* diafragma redibujable */
  I.irisSVG = (id, size = 700, ring = true) => {
    let s = `<svg viewBox="-360 -360 720 720" width="${size}" height="${size}"><defs><clipPath id="ic${id}"><circle r="300"/></clipPath></defs>`;
    if (ring) s += `<circle r="350" fill="#141413"/><circle r="330" fill="none" stroke="#3a3936" stroke-width="3"/><circle r="306" fill="#0c0c0b" stroke="#6c6a65" stroke-width="3"/>`;
    s += `<circle r="300" fill="#f4f1e9"/><g clip-path="url(#ic${id})"><g class="irisg">`;
    for (let i = 0; i < 9; i++) s += `<polygon fill="#1e1e1c" stroke="#5c5a55" stroke-width="2"/>`;
    return s + `</g></g></svg>`;
  };
  I.setIris = (svg, r, rot = 0) => {
    const N = 9, L = 700, a = r * Math.tan(Math.PI / N) * 1.02;
    svg.querySelectorAll('.irisg polygon').forEach((p, i) => {
      const th = (rot + i * 360 / N) * Math.PI / 180, nx = Math.cos(th), ny = Math.sin(th), dx = -ny, dy = nx;
      const T = [nx * r, ny * r], P1 = [T[0] - dx * a, T[1] - dy * a], P2 = [T[0] + dx * L, T[1] + dy * L], P3 = [P2[0] + nx * L, P2[1] + ny * L], P4 = [P1[0] + nx * L, P1[1] + ny * L];
      p.setAttribute('points', [P1, P2, P3, P4].map(v => v[0].toFixed(1) + ',' + v[1].toFixed(1)).join(' '));
    });
  };

  /* tira vertical con fotogramas */
  FD.vstrip = (imgs, n = 8) => {
    let s = '<div class="holes l"></div><div class="holes r"></div>';
    for (let i = 0; i < n * 2; i++) {
      const im = imgs[i % imgs.length];
      s += `<div class="fr" style="top:${30 + i * 290}px"><img src="${FD.img(im)}"></div><div class="en" style="top:${120 + i * 290}px">▸ ${String(i % n + 12).padStart(2, '0')}A</div>`;
    }
    return s;
  };
})();
