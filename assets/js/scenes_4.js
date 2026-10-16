/* ==========================================================================
   ESCENAS 27–35 · Nivel 4 · ¿Cómo se hace? (con tu celular)
   ========================================================================== */
(() => {
  const I = FD.icons, img = FD.img;
  const L4 = { level: 4, act: 'Nivel 4 · ¿Cómo se hace?' };
  const PX = 1300, PY = 50;

  /* plantilla de paso: texto a la izquierda, celular a la derecha */
  const step = (id, n, title, sub, src, ui, extra, anim, o = {}) => FD.scene({
    id, theme: o.theme || (n % 2 ? 'light' : 'paper'), tr: o.tr || 'push', bg: o.bg || 'grid', ...L4, hudExp: `Paso ${n} de 7`,
    html: `
      <div class="steppill sp" style="left:150px;top:150px"><b>${n}</b>Paso ${n} de 7</div>
      <div class="abs title2 st" style="left:150px;top:260px;width:1000px;font-size:116px">${title}</div>
      <div class="abs sans sb" style="left:156px;top:${o.subTop || 540}px;width:860px;font-size:46px;font-weight:600;line-height:1.25">${sub}</div>
      ${FD.phone('ph', PX, PY, src, ui, { imgStyle: o.imgStyle || '' })}
      ${extra || ''}
      ${o.cite ? `<div class="cite" style="right:120px;top:92px">${o.cite}</div>` : ''}`,
    steps: [{
      anim(c) {
        c.pop('.sp', 0, { scale: .5, sfx: 'pop' });
        c.words('.st', .15, { stagger: .07 });
        c.fromTo('.ph', { y: 260, opacity: 0, rotate: 6 }, { y: 0, opacity: 1, rotate: 0, duration: .8, ease: 'back.out(1.4)' }, .1);
        c.sfx('whoosh', .1, .5);
        c.fadeUp('.sb', .6, { y: 24 });
        anim(c);
        if (o.cite) c.fadeIn('.cite', c.end - .3);
      }
    }]
  });

  /* ============================== S27 · NIVEL 4 ============================== */
  FD.level('s27', 4, '¿Cómo se hace?', I.phone(), {
    tr: 'iris', extra(c) {
      c.pop('.cel', c.t('celular') - .3, { scale: .4, sfx: 'ding' });
    }
  });
  // insignia "¡con tu celular!" dentro de la tarjeta de nivel 4
  (() => { const sc = FD.scenes[FD.scenes.length - 1]; sc.html += `<div class="abs cel" style="left:0;width:1920px;top:860px;text-align:center"><span class="badge k" style="font-size:40px">📱 ¡con tu celular!</span></div>`; })();

  /* ============================== S28 · PASO 1: MIRA ============================== */
  step('s28', 1, 'Mira antes de disparar', 'Imagina cómo quieres que se vea tu foto.', 'steerage.jpg',
    `<svg class="ui grid" style="top:0;bottom:0;width:100%;height:100%" viewBox="0 0 368 788" preserveAspectRatio="none"><path d="M123 0 V788 M245 0 V788 M0 263 H368 M0 525 H368" stroke="rgba(255,255,255,.6)" stroke-width="2"/></svg><div class="shut"></div>`,
    `<div class="icon ey" style="left:250px;top:690px;width:240px;height:144px;color:#0c0c0b">${I.eye()}</div>
     <div class="abs th" style="left:540px;top:690px"><span class="badge" style="font-size:36px">💭 primero, imagina</span></div>`,
    c => {
      c.fromTo('.ph .grid', { opacity: 0 }, { opacity: 1, duration: .5 }, c.t('mira') - .1);
      c.pop('.ey', c.t('mira'), { scale: .3 });
      c.tl.fromTo(c.$('.ey .lid'), { scaleY: 1, transformOrigin: '50% 50%' }, { scaleY: .1, duration: .12, yoyo: true, repeat: 1, immediateRender: false }, c.t('disparar'));
      c.pop('.th', c.t('Imagina') - .2, { scale: .4 });
      c.fromTo('.ph .ph-img', { filter: 'blur(10px) brightness(1.3)' }, { filter: 'blur(0px) brightness(1)', duration: 1.4 }, c.t('Imagina'));
    }, { cite: '(Adams &amp; Alinder, 1985)' });

  /* ============================== S29 · PASO 2: QUIETO ============================== */
  step('s29', 2, 'Cámara quieta', 'Usa un trípode… o apoya bien los codos.', 'tetons.jpg', `<div class="shut"></div>`,
    `<div class="icon tri" style="left:${PX + 110}px;top:760px;width:180px;height:220px;color:#0c0c0b;z-index:-1">${I.tripod()}</div>
     <div class="abs ok2" style="left:${PX - 90}px;top:640px"><span class="badge" style="font-size:34px;background:#1f9d55;color:#fff">✓ ¡quieta!</span></div>
     <div class="abs co" style="left:156px;top:700px;display:flex;gap:20px"><span class="badge k" style="font-size:34px">Trípode</span><span class="badge k" style="font-size:34px">Codos apoyados</span></div>`,
    c => {
      const T = c.t('trípode') - .3;
      c.tl.fromTo(c.$('.ph'), { x: 0 }, { keyframes: [{ x: -14, rotate: -2 }, { x: 12, rotate: 2 }, { x: -10, rotate: -1.5 }, { x: 8, rotate: 1 }, { x: -6 }, { x: 0, rotate: 0 }], duration: 1.6, ease: 'none', immediateRender: false }, .9);
      c.fromTo('.ph .ph-img', { filter: 'blur(8px)' }, { filter: 'blur(8px)', duration: .1 }, .9);
      c.pop('.tri', T, { scale: .4 });
      c.to('.ph .ph-img', { filter: 'blur(0px)', duration: .8 }, T + .4);
      c.pop('.ok2', T + .8, { scale: .4, sfx: 'ding' });
      c.fadeUp('.co', c.t('codos') - .3, { y: 20, sfx: 'pop' });
    });

  /* ============================== S30 · PASO 3: ENFOCA ============================== */
  step('s30', 3, 'Enfoca', 'Toca la pantalla justo donde está lo importante.', 'weston_shell.jpg',
    `<div class="tapring tr" style="left:184px;top:380px"></div><div class="focsq fq" style="left:184px;top:380px"></div><div class="shut"></div>`,
    `<div class="abs dd" style="left:${PX - 210}px;top:430px"><span class="badge" style="font-size:34px">👆 toca aquí</span></div>`,
    c => {
      const T = c.t('toca') - .1;
      c.fromTo('.ph .ph-img', { filter: 'blur(9px)' }, { filter: 'blur(9px)', duration: .1 }, .5);
      c.pop('.dd', T - .3, { scale: .4, sfx: false });
      c.fromTo('.ph .tr', { scale: .3, opacity: 1 }, { scale: 1.6, opacity: 0, duration: .6, ease: 'power2.out' }, T);
      c.sfx('tap', T, .8);
      c.fromTo('.ph .fq', { scale: 1.6, opacity: 0 }, { scale: 1, opacity: 1, duration: .35, ease: 'back.out(2)' }, T + .1);
      c.to('.ph .ph-img', { filter: 'blur(0px)', duration: .7 }, T + .2);
      c.sfx('beep', T + .6, .5);
      c.tl.to(c.$('.ph .fq'), { opacity: .3, duration: .2, yoyo: true, repeat: 3 }, T + .8);
    });

  /* ============================== S31 · PASO 4: TODO NÍTIDO ============================== */
  step('s31', 4, 'Que todo salga nítido', 'No uses el <b>modo retrato</b>: desenfoca el fondo.', 'adams3.jpg',
    `<img class="abs blurL" src="${img('adams3.jpg')}" style="left:0;top:0;width:100%;height:100%;object-fit:cover;filter:blur(12px);-webkit-mask-image:linear-gradient(#000 45%, transparent 70%);mask-image:linear-gradient(#000 45%, transparent 70%)">
     <div class="ui" style="top:80px;text-align:center"><span class="chipw pm on">◉ Retrato</span> <span class="chipw pf">Foto</span></div><div class="shut"></div>`,
    `<div class="abs nopm" style="left:${PX - 240}px;top:160px"><span class="badge r" style="font-size:34px">✕ modo retrato</span></div>
     <div class="abs allk" style="left:${PX - 250}px;top:560px"><span class="badge" style="font-size:34px;background:#1f9d55;color:#fff">✓ todo nítido</span></div>`,
    c => {
      const R = c.t('retrato') - .2;
      c.pop('.nopm', R, { scale: .4, sfx: 'wrong' });
      c.to('.ph .pm', { backgroundColor: 'rgba(0,0,0,.6)', color: '#ffffff', duration: .2 }, c.t('desenfoca') - .2);
      c.to('.ph .pf', { backgroundColor: '#ffc93c', color: '#111111', duration: .2 }, c.t('desenfoca') - .2);
      c.sfx('tap', c.t('desenfoca') - .2, .7);
      c.to('.ph .blurL', { opacity: 0, duration: .8 }, c.t('desenfoca'));
      c.pop('.allk', c.t('fondo') - .1, { scale: .4, sfx: 'ding' });
    });

  /* ============================== S32 · PASO 5: LUZ NATURAL ============================== */
  step('s32', 5, 'Usa la luz natural', 'Mejor sin flash.', 'whitefence.jpg',
    `<div class="abs glow" style="left:0;top:0;width:100%;height:100%;background:radial-gradient(circle at 80% 10%, rgba(255,230,150,.55), rgba(255,230,150,0) 55%);opacity:0"></div>
     <div class="ui" style="top:80px;left:30px;width:80px;height:80px;color:#fff;position:absolute"><div class="fl" style="position:relative;width:60px;height:60px">${I.bolt()}<div style="position:absolute;left:-6px;top:28px;width:72px;height:8px;background:#ff3b2c;transform:rotate(-45deg)" class="sl"></div></div></div><div class="shut"></div>`,
    `<div class="icon sun" style="left:${PX + 280}px;top:-10px;width:200px;height:200px;color:#ffb000">${I.sun()}</div>
     <div class="abs nf" style="left:156px;top:680px;display:flex;gap:20px"><span class="badge" style="font-size:36px">☀ luz natural</span><span class="badge r" style="font-size:36px">✕ flash</span></div>`,
    c => {
      c.pop('.sun', c.t('luz') - .3, { scale: .3 });
      c.tl.fromTo(c.$('.sun svg'), { rotate: 0 }, { rotate: 90, duration: 4, ease: 'none' }, c.t('luz'));
      c.to('.ph .glow', { opacity: 1, duration: .8 }, c.t('natural') - .2);
      c.fromTo('.ph .sl', { scaleX: 0 }, { scaleX: 1, duration: .3 }, c.t('flash') - .2);
      c.sfx('wrong', c.t('flash'), .4);
      c.fadeUp('.nf', c.t('flash') - .1, { y: 20, sfx: 'pop' });
    }, { theme: 'yellow', bg: 'dotsK' });

  /* ============================== S33 · PASO 6: ENCUADRA ============================== */
  step('s33', 6, 'Encuadra al tomar la foto', 'Decide qué entra y qué no… y no la recortes después.', 'wallstreet.jpg',
    `<svg class="ui brk" style="top:0;width:100%;height:100%" viewBox="0 0 368 788" preserveAspectRatio="none"><g stroke="#ffc93c" stroke-width="6" fill="none"><path d="M30 120 V90 H60"/><path d="M308 90 H338 V120"/><path d="M30 668 V698 H60"/><path d="M308 698 H338 V668"/></g></svg><div class="shut"></div>`,
    `<div class="abs cr" style="left:156px;top:690px;display:flex;gap:20px;align-items:center"><div style="width:90px;height:90px;color:#0c0c0b;position:relative">${I.crop()}<div class="bigq" style="position:absolute;left:8px;top:-14px;font-size:100px;color:var(--red)">✕</div></div><span class="badge r" style="font-size:36px">no recortes después</span></div>
     <div class="abs dq" style="left:${PX - 280}px;top:760px"><span class="badge" style="font-size:34px">¿qué entra?</span></div>`,
    c => {
      c.fromTo('.ph .brk', { scale: 1.3, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: .6, ease: 'back.out(2)' }, c.t('encuadra') - .1);
      c.sfx('click', c.t('encuadra'), .6);
      c.pop('.dq', c.t('entra') - .2, { scale: .4 });
      c.tl.fromTo(c.$('.ph .ph-img'), { scale: 1 }, { scale: 1.12, duration: 1.2, ease: 'power2.inOut', yoyo: true, repeat: 1, immediateRender: false }, c.t('entra'));
      c.fadeUp('.cr', c.t('recortes') - .3, { y: 20, sfx: 'wrong' });
    }, { cite: '(Art Institute of Chicago, 2016d)' });

  /* ============================== S34 · PASO 7: NO EDITES DE MÁS ============================== */
  FD.scene({
    id: 's34', theme: 'dark', tr: 'push', bg: 'gridW', ...L4, hudExp: 'Paso 7 de 7',
    html: `
      <div class="steppill sp" style="left:150px;top:150px"><b>7</b>Paso 7 de 7</div>
      <div class="abs title2 st" style="left:150px;top:260px;width:1020px;font-size:120px;color:#fff">No edites de más</div>
      <div class="abs no1" style="left:156px;top:520px;display:flex;gap:18px"><span class="badge r" style="font-size:36px">✕ filtros</span><span class="badge r" style="font-size:36px">✕ borrar</span><span class="badge r" style="font-size:36px">✕ agregar</span></div>
      <div class="abs ok1" style="left:156px;top:660px;display:flex;gap:18px"><span class="badge" style="font-size:36px;background:#1f9d55;color:#fff">✓ un poco de luz</span><span class="badge" style="font-size:36px;background:#1f9d55;color:#fff">✓ contraste</span><span class="badge" style="font-size:36px;background:#1f9d55;color:#fff">✓ blanco y negro</span></div>
      ${FD.phone('ph', PX, PY, 'weston_pepper.jpg', `
        <div class="ui" style="top:520px;left:34px;right:34px">
          <div class="mono" style="font-size:16px;letter-spacing:.2em;margin:0 0 12px">LUZ</div><div class="slider"><i class="k1" style="left:45%"></i></div>
          <div class="mono" style="font-size:16px;letter-spacing:.2em;margin:26px 0 12px">CONTRASTE</div><div class="slider"><i class="k2" style="left:45%"></i></div>
          <div style="margin-top:26px;text-align:center"><span class="chipw bn">B/N</span> <span class="chipw fx1">Filtros ✕</span></div>
        </div>`, { imgStyle: 'filter:sepia(1) hue-rotate(55deg) saturate(3.2) brightness(.95)' })}`,
    steps: [
      {
        anim(c) {
          c.pop('.sp', 0, { scale: .5, sfx: 'pop' });
          c.words('.st', .15, { stagger: .07 });
          c.fromTo('.ph', { y: 260, opacity: 0, rotate: 6 }, { y: 0, opacity: 1, rotate: 0, duration: .8, ease: 'back.out(1.4)' }, .1);
          c.sfx('whoosh', .1, .5);
          const B = c.$$('.no1 .badge');
          [['filtros', 0], ['borrar', 1], ['agregar', 2]].forEach(([w, i]) => { c.pop(B[i], c.t(w) - .2, { scale: .4, sfx: false }); c.sfx('wrong', c.t(w), .35); });
        }
      },
      {
        anim(c) {
          const G = c.$$('.ok1 .badge');
          c.pop(G[0], c.t('luz') - .2, { scale: .4, sfx: 'ding' });
          c.to('.ph .k1', { left: '58%', duration: .6, ease: 'power2.inOut' }, c.t('luz') - .1);
          c.pop(G[1], c.t('contraste') - .2, { scale: .4, sfx: 'ding' });
          c.to('.ph .k2', { left: '56%', duration: .6, ease: 'power2.inOut' }, c.t('contraste') - .1);
          c.pop(G[2], c.t('blanco') - .2, { scale: .4, sfx: 'ding' });
          c.to('.ph .bn', { backgroundColor: '#ffc93c', color: '#111111', duration: .2 }, c.t('blanco') - .1);
          c.sfx('tap', c.t('blanco') - .1, .7);
          c.to('.ph .ph-img', { filter: 'sepia(0) hue-rotate(0deg) saturate(0) brightness(1)', duration: .9 }, c.t('blanco'));
        }
      }
    ]
  });

  /* ============================== S35 · ¡RECUERDA! (NIVEL 4) ============================== */
  const P7 = [['Mira', 'mira'], ['Quieto', 'quieto'], ['Enfoca', 'enfoca'], ['Todo nítido', 'nítido'], ['Luz natural', 'natural'], ['Encuadra', 'encuadra'], ['No edites de más', 'edites']];
  FD.scene({
    id: 's35', theme: 'yellow', tr: 'paper', bg: 'dotsK', ...L4, hudExp: '¡Recuerda!',
    html: FD.recuerdaHTML(`
      ${P7.map(([t], i) => `<div class="steppill p7 p7_${i}" style="left:${i < 4 ? 70 : 760}px;top:${180 + (i % 4) * 110}px"><b>${i + 1}</b>${t}</div>`).join('')}`, { x: 220, y: 140, w: 1480, h: 690 }),
    steps: [{
      anim(c) {
        FD.recuerdaIn(c, 0);
        P7.forEach(([, w], i) => { c.fromTo('.p7_' + i, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: .4, ease: 'back.out(2)' }, c.t(w) - .15); c.sfx('tick', c.t(w) - .15, .4); });
        c.sfx('ding', c.end, .6);
      }
    }]
  });
})();
