/* ==========================================================================
   BIBLIOTECA · componentes de "juego" para la versión fácil y dinámica
   (tarjetas de personaje, celular, cuenta regresiva, niveles, recuerda…)
   ========================================================================== */
(() => {
  const I = FD.icons, img = FD.img;
  const S = (vb, inner, sw = 7) => `<svg viewBox="${vb}" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;

  /* ---------- íconos simples (trazo) ---------- */
  I.mask = () => S('0 0 120 70', `<path d="M6 18 Q60 -2 114 18 Q118 52 92 60 Q74 64 60 48 Q46 64 28 60 Q2 52 6 18 Z"/><ellipse cx="34" cy="32" rx="12" ry="8"/><ellipse cx="86" cy="32" rx="12" ry="8"/>`);
  I.wand = () => S('0 0 100 100', `<path d="M14 88 L66 36"/><path d="M60 30 L72 42"/><path d="M76 8 L80 20 M90 24 L78 26 M88 6 L80 16 M62 10 L72 18"/>`);
  I.filt = () => S('0 0 100 100', `<circle cx="38" cy="38" r="26"/><circle cx="62" cy="38" r="26"/><circle cx="50" cy="60" r="26"/>`);
  I.eraser = () => S('0 0 100 100', `<path d="M20 70 L58 32 L82 56 L56 82 L32 82 Z"/><path d="M40 50 L64 74"/><path d="M14 90 H86"/>`);
  I.brush = () => S('0 0 100 100', `<path d="M70 10 L90 30 L52 68 L32 48 Z"/><path d="M32 48 Q14 50 12 88 Q48 86 52 68"/>`);
  I.cam = () => S('0 0 120 90', `<rect x="6" y="20" width="108" height="64" rx="12"/><path d="M38 20 L46 6 H74 L82 20"/><circle cx="60" cy="52" r="20"/><circle cx="60" cy="52" r="8"/><circle cx="98" cy="34" r="3"/>`);
  I.tripod = () => S('0 0 100 120', `<rect x="26" y="6" width="48" height="32" rx="6"/><path d="M50 38 V60 M50 60 L20 114 M50 60 L80 114 M50 60 V114"/>`);
  I.sun = () => S('0 0 100 100', `<circle cx="50" cy="50" r="18"/>${[...Array(8)].map((_, i) => { const a = i * Math.PI / 4; return `<path d="M${50 + Math.cos(a) * 30} ${50 + Math.sin(a) * 30} L${50 + Math.cos(a) * 44} ${50 + Math.sin(a) * 44}"/>`; }).join('')}`);
  I.bolt = () => S('0 0 100 100', `<path d="M58 6 L22 56 H48 L40 94 L78 40 H52 Z"/>`);
  I.grid3 = () => S('0 0 100 100', `<rect x="6" y="6" width="88" height="88" rx="6"/><path d="M36 6 V94 M64 6 V94 M6 36 H94 M6 64 H94"/>`, 5);
  I.sliders = () => S('0 0 100 100', `<path d="M10 24 H90 M10 50 H90 M10 76 H90"/><circle cx="34" cy="24" r="8" fill="currentColor"/><circle cx="66" cy="50" r="8" fill="currentColor"/><circle cx="44" cy="76" r="8" fill="currentColor"/>`);
  I.crop = () => S('0 0 100 100', `<path d="M24 6 V76 H94 M6 24 H76 V94"/>`);
  I.person = () => S('0 0 100 100', `<circle cx="50" cy="32" r="16"/><path d="M18 92 Q20 58 50 58 Q80 58 82 92"/>`);
  I.check = () => S('0 0 100 100', `<path d="M18 52 L40 74 L84 26"/>`, 12);
  I.cross = () => S('0 0 100 100', `<path d="M24 24 L76 76 M76 24 L24 76"/>`, 12);
  I.clock = () => S('0 0 100 100', `<circle cx="50" cy="54" r="38"/><path d="M50 54 V30 M50 54 L66 64"/><path d="M40 8 H60"/>`);
  I.gears = () => S('0 0 120 100', `<circle cx="42" cy="54" r="22"/><circle cx="42" cy="54" r="8"/>${[...Array(8)].map((_, i) => { const a = i * Math.PI / 4; return `<path d="M${42 + Math.cos(a) * 22} ${54 + Math.sin(a) * 22} L${42 + Math.cos(a) * 32} ${54 + Math.sin(a) * 32}"/>`; }).join('')}<circle cx="90" cy="28" r="12"/>${[...Array(6)].map((_, i) => { const a = i * Math.PI / 3; return `<path d="M${90 + Math.cos(a) * 12} ${28 + Math.sin(a) * 12} L${90 + Math.cos(a) * 19} ${28 + Math.sin(a) * 19}"/>`; }).join('')}`, 6);
  I.frame = () => `<svg viewBox="0 0 100 80"><rect x="2" y="2" width="96" height="76" rx="4" fill="none" stroke="#c9a24a" stroke-width="7"/><rect x="10" y="10" width="80" height="60" fill="none" stroke="#e6c46c" stroke-width="2"/></svg>`;

  /* ---------- copias y recortes ---------- */
  FD.print = (cls, src, x, y, w, h, cap, o = {}) => `<div class="print ${cls} ${o.np ? 'np' : ''}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;${o.style || ''}"><div class="ph"><img src="${img(src)}" style="${o.imgStyle || ''}"></div>${cap ? `<div class="cap">${cap}</div>` : ''}${o.inner || ''}</div>`;
  FD.cut = (cls, src, x, y, w, o = {}) => `<div class="cut ${cls}" style="left:${x}px;top:${y}px;width:${w}px;${o.style || ''}"><img src="${img(src)}"></div>`;

  /* ---------- tarjeta de personaje ---------- */
  FD.pcard = (cls, x, y, o) => `
    <div class="pcard ${cls}" style="left:${x}px;top:${y}px">
      <div class="in">
        <div class="top ${o.dark ? 'k' : ''}"></div>
        <div class="nn">Personaje ${o.n}</div><div class="yy">${o.years}</div>
        <div class="pic"><img src="${img(o.cut)}" style="${o.picStyle || ''}"></div>
        <div class="name">${o.name}</div>
        <div class="pow"><b>Superpoder</b><span>${o.power}</span></div>
        <div class="shine"></div>
      </div>
    </div>`;
  FD.flipCard = (c, sel, at, o = {}) => {
    const card = c.$(sel);
    c.tl.fromTo(card, { opacity: 0, rotateY: -100, scale: .7, y: 60 }, { opacity: 1, rotateY: 0, scale: 1, y: 0, duration: 1.0, ease: 'back.out(1.3)' }, at);
    c.tl.fromTo(card.querySelector('.shine'), { left: '-60%' }, { left: '130%', duration: .9, ease: 'power2.inOut' }, at + .7);
    c.tl.fromTo(card.querySelector('.pic img'), { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: .7, ease: 'power3.out' }, at + .45);
    c.sfx('card', at, .8); c.sfx('sparkle', at + .7, .5);
  };

  /* ---------- celular ---------- */
  FD.phone = (cls, x, y, src, ui = '', o = {}) => `
    <div class="phone ${cls}" style="left:${x}px;top:${y}px;${o.style || ''}">
      <div class="scr"><img class="ph-img" src="${img(src)}" style="${o.imgStyle || ''}">${ui}</div>
      <div class="notch"></div>
    </div>`;

  /* ---------- cuenta regresiva 3-2-1 ---------- */
  FD.cdownHTML = (cls, x, y, color = '#ffc93c') => `
    <div class="cdown ${cls}" style="left:${x}px;top:${y}px">
      <svg viewBox="0 0 300 300"><circle cx="150" cy="150" r="130" fill="rgba(0,0,0,.65)" stroke="rgba(255,255,255,.2)" stroke-width="16"/><circle class="ring" cx="150" cy="150" r="130" fill="none" stroke="${color}" stroke-width="16" stroke-linecap="round" stroke-dasharray="817 817" stroke-dashoffset="817"/></svg>
      <div class="num"><span class="n3" style="position:absolute">3</span><span class="n2" style="position:absolute">2</span><span class="n1" style="position:absolute">1</span></div>
    </div>`;
  FD.countdown = (c, sel, at) => {
    const box = c.$(sel), ring = box.querySelector('.ring');
    const nums = ['.n3', '.n2', '.n1'].map(k => box.querySelector(k));
    c.tl.fromTo(box, { opacity: 0, scale: .5 }, { opacity: 1, scale: 1, duration: .35, ease: 'back.out(2)' }, at);
    c.tl.fromTo(ring, { strokeDashoffset: 817 }, { strokeDashoffset: 0, duration: 3, ease: 'none' }, at);
    nums.forEach((nEl, i) => {
      c.tl.fromTo(nEl, { scale: 1.6, opacity: 0 }, { scale: 1, opacity: 1, duration: .35, ease: 'back.out(2)' }, at + i);
      if (i < 2) c.tl.to(nEl, { opacity: 0, duration: .12 }, at + i + .88);
      c.sfx('beep', at + i, .55);
    });
    c.tl.to(box, { opacity: 0, scale: 1.3, duration: .3 }, at + 3);
    c.hold(at, at + 3.3); // la cuenta siempre va a velocidad real
  };

  /* ---------- sellos ✓ / ✗ ---------- */
  FD.okHTML = (cls, x, y) => `<div class="okc ${cls}" style="left:${x}px;top:${y}px">✓</div>`;
  FD.noHTML = (cls, x, y) => `<div class="noc ${cls}" style="left:${x}px;top:${y}px">✕</div>`;
  FD.ok = (c, sel, at, good = true) => { c.pop(sel, at, { scale: .2, rot: -20, sfx: false, ease: 'back.out(3)' }); c.sfx(good ? 'ding' : 'wrong', at, good ? .7 : .55); };

  /* ---------- escena de NIVEL (tipo videojuego) ---------- */
  FD.level = (id, n, title, iconSVG, o = {}) => FD.scene({
    id, theme: 'lvl', bg: 'rays dots', level: n, act: `Nivel ${n} de 5`, hudExp: `Nivel ${n} · ${title}`, tr: o.tr || 'zones', hudEv: 0,
    html: `
      <div class="abs mono lk center" style="left:0;width:1920px;top:150px;font-size:34px;letter-spacing:.6em;font-weight:700">NIVEL</div>
      <div class="abs lvn" style="left:0;width:1920px;top:205px">${n}</div>
      <div class="abs title2 lt center" style="left:0;width:1920px;top:560px;font-size:130px;color:#fff">${title}</div>
      <div class="abs lvpips" style="left:0;width:1920px;top:760px">${[1, 2, 3, 4, 5].map(k => `<i class="${k <= n ? 'on' : ''} p${k}"></i>`).join('')}</div>
      <div class="icon li" style="left:1420px;top:230px;width:260px;height:260px;color:#fff;opacity:.9">${iconSVG}</div>
      <div class="icon li2" style="left:240px;top:280px;width:200px;height:200px;color:#fff;opacity:.35">${I.cam()}</div>`,
    steps: [{
      lead: .5,
      anim(c) {
        c.fadeIn('.lk', 0, { dur: .4 });
        c.tl.fromTo(c.$('.lvn'), { scale: 3, opacity: 0, rotate: -12 }, { scale: 1, opacity: 1, rotate: 0, duration: .7, ease: 'back.out(1.8)' }, .1);
        c.sfx('levelup', .1, .8);
        c.shake(c.cam, .5, 14);
        c.words('.lt', .6, { stagger: .08 });
        c.fromTo(c.$$('.lvpips i'), { scale: 0 }, { scale: 1, duration: .35, ease: 'back.out(3)', stagger: .08 }, .9);
        c.pop('.li', 1.0, { scale: .3, rot: 20 });
        c.pop('.li2', 1.2, { scale: .3, rot: -20, sfx: false });
        if (o.extra) o.extra(c);
      }, ...(o.step || {})
    }]
  });

  /* ---------- nota "RECUERDA" ---------- */
  FD.recuerdaHTML = (inner, o = {}) => `
    <div class="note rn" style="left:${o.x ?? 260}px;top:${o.y ?? 150}px;width:${o.w ?? 1400}px;height:${o.h ?? 620}px;transform:rotate(${o.rot ?? -1.5}deg)">
      <div class="abs bigq rk" style="left:60px;top:40px;font-size:90px;color:var(--red)">¡Recuerda!</div>
      ${inner}
    </div>`;
  FD.recuerdaIn = (c, at = 0) => {
    c.drop('.rn', at, { rot: -1.5, scale: 1.15, y: -120 });
    c.slam('.rk', at + .35, { scale: 1.6, sfx: 'pop', vol: .6 });
  };

  /* ---------- texto con resaltador amarillo ---------- */
  FD.hl = t => `<span class="hl2" style="background:linear-gradient(transparent 55%, #ffc93c 55%);padding:0 .08em">${t}</span>`;
})();
