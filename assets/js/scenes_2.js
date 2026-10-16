/* ==========================================================================
   ESCENAS 04–12 · Nivel 1 (¿qué es?) y Nivel 2 (¿cómo nació?)
   ========================================================================== */
(() => {
  const I = FD.icons, img = FD.img;
  const L1 = { level: 1, act: 'Nivel 1 · ¿Qué es?' }, L2 = { level: 2, act: 'Nivel 2 · ¿Cómo nació?' };
  const circ = (cls, x, y, size, svg, color = '#0c0c0b', bg = '#fff') => `<div class="abs ${cls}" style="left:${x}px;top:${y}px;width:${size}px;height:${size}px;border-radius:50%;background:${bg};color:${color};box-shadow:0 20px 40px rgba(0,0,0,.18);display:flex;align-items:center;justify-content:center"><div style="width:58%;height:58%">${svg}</div></div>`;

  /* ============================== S04 · NIVEL 1 ============================== */
  FD.level('s04', 1, '¿Qué es?', I.eye(), { tr: 'iris' });

  /* ============================== S05 · DEFINICIÓN FÁCIL ============================== */
  FD.scene({
    id: 's05', theme: 'light', tr: 'push', bg: 'grid', ...L1, hudExp: 'Definición',
    html: `
      <div class="abs dfb" style="left:0;width:1920px;top:110px;text-align:center"><span class="badge" style="font-size:34px">Definición fácil</span></div>
      <div class="abs df1 bigq center" style="left:0;width:1920px;top:220px;font-size:130px">Tomar una foto</div>
      <div class="abs df2 title2 center" style="left:0;width:1920px;top:360px;font-size:150px">tal como se ve</div>
      <div class="abs df3 bigq center" style="left:0;width:1920px;top:530px;font-size:110px">en la <span class="red">realidad</span></div>
      ${circ('e1', 560, 680, 170, I.eye())}
      <div class="abs bigq eq" style="left:830px;top:700px;font-size:130px">=</div>
      ${circ('e2', 1000, 680, 170, I.cam())}
      <div class="abs mono el1" style="left:520px;top:860px;width:250px;text-align:center;font-size:20px;font-weight:700;letter-spacing:.12em">lo que ves</div>
      <div class="abs mono el2" style="left:950px;top:860px;width:270px;text-align:center;font-size:20px;font-weight:700;letter-spacing:.12em">lo que sale</div>
      ${['mask', 'wand', 'filt'].map((k, i) => `${circ('sn' + i, 330 + i * 470, 240, 260, I[k]())}<div class="abs noc nx${i}" style="left:${330 + i * 470 + 170}px;top:220px">✕</div><div class="abs bigq st${i} center" style="left:${330 + i * 470 - 70}px;width:400px;top:540px;font-size:70px">${['Sin disfraz', 'Sin trucos', 'Sin filtros'][i]}</div>`).join('')}
      <div class="abs bigq sp center" style="left:0;width:1920px;top:160px;font-size:250px;color:var(--red)">Straight</div>
      <svg class="ov arw" width="1920" height="1080"><path class="a1" d="M560 520 H1340" stroke="#0c0c0b" stroke-width="14" stroke-linecap="round"/><path class="a2" d="M1300 480 L1350 520 L1300 560" fill="none" stroke="#0c0c0b" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <div class="abs spc" style="left:0;width:1920px;top:620px;display:flex;justify-content:center;gap:26px">
        <span class="badge k s1" style="font-size:40px">directo</span><span class="badge k s2" style="font-size:40px">derecho</span><span class="badge s3" style="font-size:40px">sin rodeos</span>
      </div>
      <div class="cite" style="right:120px;top:92px">(Tate, s. f.; Art Institute of Chicago, 2016d)</div>`,
    steps: [
      { anim(c) { c.pop('.dfb', 0, { scale: .4 }); } },
      {
        anim(c) {
          c.slam('.df1', c.t('tomar') - .1, { scale: 1.4, vol: .5 });
          c.words('.df2', c.t('tal') - .1, { stagger: .08 });
          c.words('.df3', c.t('realidad') - .4, { stagger: .08 });
          c.pop('.e1', c.t('realidad') + .3, { scale: .3 });
          c.pop('.eq', c.t('realidad') + .6, { scale: .3, sfx: false });
          c.pop('.e2', c.t('realidad') + .9, { scale: .3 });
          c.fadeIn(['.el1', '.el2'], c.t('realidad') + 1.1);
        }
      },
      {
        anim(c) {
          c.out(['.dfb', '.df1', '.df2', '.df3', '.e1', '.eq', '.e2', '.el1', '.el2'], 0, { y: -40, dur: .4, stagger: .02 });
          [['disfrazarla', 0], ['trucos', 1], ['filtros', 2]].forEach(([w, i]) => {
            const T = c.t(w) - .3;
            c.pop('.sn' + i, T, { scale: .3 });
            c.fadeUp('.st' + i, T + .1, { y: 20 });
            FD.ok(c, '.nx' + i, T + .45, false);
          });
        }
      },
      {
        anim(c) {
          c.out([0, 1, 2].flatMap(i => ['.sn' + i, '.nx' + i, '.st' + i]), 0, { y: -40, dur: .4, stagger: .02 });
          c.slam('.sp', c.t('estréit') - .1, { scale: 1.6 });
          c.draw(['.arw .a1', '.arw .a2'], c.t('Estréit', 2) - .2, .6, { stagger: .4, sfx: 'swish' });
          c.pop('.s1', c.t('directo') - .1, { scale: .4 });
          c.pop('.s2', c.t('derecho') - .1, { scale: .4 });
          c.pop('.s3', c.t('rodeos') - .2, { scale: .4 });
          c.fadeIn('.cite', c.end - .3);
        }
      }
    ]
  });

  /* ============================== S06 · LAS 3 REGLAS ============================== */
  const RX = [150, 725, 1300];
  const ruleIll = [
    `<img src="${img('wallstreet.jpg')}" class="r1img" style="width:100%;height:100%;object-fit:cover;filter:blur(10px)">`,
    `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:24px;color:#fff"><div style="width:110px;height:70px">${I.eye()}</div><div class="bigq" style="font-size:80px">=</div><div style="width:110px;height:84px">${I.cam()}</div></div>`,
    `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:40px;color:#fff"><div style="width:90px;height:90px">${I.brush()}</div><div style="width:90px;height:90px">${I.eraser()}</div><div class="bigq" style="font-size:110px;color:#ff3b2c;position:absolute">✕</div></div>`
  ];
  const ruleT = [['Nítida', 'Todo clarito, enfocado y con detalles.'], ['Real', 'Lo que ves es lo que había frente a la cámara.'], ['Sin trucos', 'No se pinta, no se borra, no se agrega nada.']];
  FD.scene({
    id: 's06', theme: 'dark', tr: 'blinds', bg: 'gridW', ...L1, hudExp: 'Las 3 reglas',
    html: `
      <div class="abs bigq rt center" style="left:0;width:1920px;top:105px;font-size:96px;color:#fff">Las <span class="red">3</span> reglas</div>
      ${RX.map((x, i) => `<div class="rulecard rc${i}" style="left:${x}px;top:250px">
          <div class="no">${i + 1}</div><div class="ill">${ruleIll[i]}</div><div class="tt">${ruleT[i][0]}</div><div class="ds">${ruleT[i][1]}</div>
          <div class="back abs" style="inset:0;background:radial-gradient(rgba(255,255,255,.12) 2.4px, transparent 2.8px) 0 0/26px 26px, linear-gradient(160deg,#e8402f,#9e1810);display:flex;align-items:center;justify-content:center"><div class="bigq" style="font-size:260px;color:#fff">?</div></div>
        </div>`).join('')}`,
    steps: [
      {
        anim(c) {
          c.slam('.rt', c.t('tres') - .2, { scale: 1.5 });
          RX.forEach((_, i) => c.fromTo('.rc' + i, { opacity: 0, y: 120, rotate: (i - 1) * 6 }, { opacity: 1, y: 0, rotate: 0, duration: .7, ease: 'back.out(1.6)' }, c.t('reglas') + i * .15));
          RX.forEach((_, i) => c.sfx('card', c.t('reglas') + i * .15, .6));
          c.tl.to(c.$$('.rulecard .back .bigq'), { scale: 1.12, duration: .4, yoyo: true, repeat: 3, ease: 'sine.inOut' }, c.t('repetir') - .5);
        }
      },
      ...[['nítida', 'clarito'], ['real', 'cámara'], ['trucos', 'pinta']].map(([w, w2], i) => ({
        anim(c) {
          const T = c.t(w) - .3;
          c.fromTo(c.$('.rc' + i + ' .back'), { rotateY: 0, opacity: 1 }, { rotateY: 90, opacity: 0, duration: .45, ease: 'power2.in' }, T);
          c.tl.fromTo(c.$('.rc' + i), { scale: 1 }, { scale: 1.06, duration: .3, yoyo: true, repeat: 1, ease: 'sine.inOut', immediateRender: false }, T + .3);
          c.sfx('card', T, .7);
          if (i === 0) { c.to('.rc0 .r1img', { filter: 'blur(0px)', duration: 1.2, ease: 'power2.inOut' }, c.t(w2) - .3); c.sfx('focus', c.t(w2) - .3, .6); }
          if (i === 2) c.sfx('wrong', c.t(w2), .4);
          c.sfx('ding', T + .5, .5);
        }
      }))
    ]
  });

  /* ============================== S07 · COMO EL CELULAR ============================== */
  FD.scene({
    id: 's07', theme: 'light', tr: 'flash', bg: 'dotsK', ...L1, hudExp: '#SinFiltro',
    html: `
      ${FD.phone('ph', 1180, 60, 'weston_pepper.jpg', `
        <div class="ui chips" style="top:72px;text-align:center"><span class="chipw c0 on">Original</span> <span class="chipw c1">Vintage</span> <span class="chipw c2">Suave</span></div>
        <div class="ui" style="top:600px;left:40px;right:40px"><div class="mono" style="font-size:16px;letter-spacing:.2em;margin-bottom:14px">SUAVIZAR</div><div class="slider sl"><i class="knob"></i></div></div>
        <div class="abs patch" style="left:120px;top:290px;width:160px;height:160px;border-radius:50%;background:radial-gradient(#d9d0c2 40%, rgba(217,208,194,0) 70%);opacity:0"></div>
        <div class="abs er" style="left:150px;top:300px;width:80px;height:80px;color:#fff;opacity:0">${I.eraser()}</div>
        <div class="shut"></div>`, { imgStyle: 'filter:none' })}
      <div class="abs b1" style="left:300px;top:230px"><span class="badge r" style="font-size:38px">Filtro</span></div>
      <div class="abs b2" style="left:380px;top:400px"><span class="badge r" style="font-size:38px">Suavizar</span></div>
      <div class="abs b3" style="left:460px;top:570px"><span class="badge r" style="font-size:38px">Borrar cosas</span></div>
      <div class="abs stampx sf" style="left:250px;top:300px;color:var(--red);font-size:96px;transform:rotate(-8deg)">#SinFiltro</div>
      <div class="abs sf2" style="left:300px;top:480px"><span class="badge k" style="font-size:32px">¡desde hace +100 años!</span></div>`,
    steps: [
      {
        anim(c) {
          c.fromTo('.ph', { y: 300, opacity: 0, rotate: 8 }, { y: 0, opacity: 1, rotate: 0, duration: .9, ease: 'back.out(1.4)' }, 0);
          c.sfx('whoosh', 0, .6);
          const F = c.t('filtro') - .1, S = c.t('suavizarla') - .1, B = c.t('borrar') - .1;
          c.pop('.b1', F, { scale: .4 });
          c.to('.ph .c0', { backgroundColor: 'rgba(0,0,0,.6)', color: '#ffffff', duration: .2 }, F);
          c.to('.ph .c1', { backgroundColor: '#ffc93c', color: '#111111', duration: .2 }, F);
          c.to('.ph .ph-img', { filter: 'sepia(1) saturate(2.2) hue-rotate(-12deg) contrast(.85) brightness(1.1) blur(0px)', duration: .5 }, F);
          c.sfx('tap', F, .7);
          c.pop('.b2', S, { scale: .4 });
          c.to('.ph .knob', { left: '85%', duration: .8, ease: 'power2.inOut' }, S);
          c.to('.ph .ph-img', { filter: 'sepia(1) saturate(2.2) hue-rotate(-12deg) contrast(.85) brightness(1.1) blur(7px)', duration: .8 }, S);
          c.pop('.b3', B, { scale: .4 });
          c.fromTo('.ph .er', { opacity: 0, x: -60, y: 60 }, { opacity: 1, x: 0, y: 0, duration: .4 }, B);
          c.to('.ph .er', { x: 40, y: 30, duration: .6, ease: 'sine.inOut' }, B + .4);
          c.to('.ph .patch', { opacity: 1, duration: .6 }, B + .4);
          c.sfx('marker', B + .4, .5);
        }
      },
      {
        anim(c) {
          const T = c.t('contrario') - .3;
          c.out(['.b1', '.b2', '.b3'], 0, { x: -60, y: 0, dur: .4, stagger: .05 });
          c.to('.ph .ph-img', { filter: 'sepia(0) saturate(1) hue-rotate(0deg) contrast(1) brightness(1) blur(0px)', duration: .9, ease: 'power2.inOut' }, T);
          c.to('.ph .knob', { left: '0%', duration: .6 }, T);
          c.to(['.ph .patch', '.ph .er'], { opacity: 0, duration: .5 }, T);
          c.to('.ph .c1', { backgroundColor: 'rgba(0,0,0,.6)', color: '#ffffff', duration: .2 }, T);
          c.to('.ph .c0', { backgroundColor: '#ffc93c', color: '#111111', duration: .2 }, T);
          c.sfx('whoosh2', T, .5);
          c.stamp('.sf', c.t('filtro') - .2, { rot: -8, amp: 10 });
          c.pop('.sf2', c.t('cien') - .2, { scale: .4, sfx: 'ding' });
        }
      }
    ]
  });

  /* ============================== S08 · ¡RECUERDA! (NIVEL 1) ============================== */
  const eqItem = (cls, x, label, svg) => `<div class="abs ${cls}" style="left:${x}px;top:250px;width:300px;text-align:center"><div style="width:170px;height:170px;margin:0 auto;border-radius:50%;background:#111;color:#fff;display:flex;align-items:center;justify-content:center"><div style="width:58%;height:58%">${svg}</div></div><div class="bigq" style="font-size:64px;margin-top:16px">${label}</div></div>`;
  FD.scene({
    id: 's08', theme: 'yellow', tr: 'paper', bg: 'dotsK', ...L1, hudExp: '¡Recuerda!',
    html: FD.recuerdaHTML(`
      <div class="abs title2 eqa" style="left:60px;top:160px;font-size:76px">Fotografía directa =</div>
      ${eqItem('q1', 80, 'Nítida', I.check())}
      <div class="abs bigq p1" style="left:410px;top:300px;font-size:120px">+</div>
      ${eqItem('q2', 520, 'Real', I.eye())}
      <div class="abs bigq p2" style="left:850px;top:300px;font-size:120px">+</div>
      ${eqItem('q3', 960, 'Sin trucos', I.cross())}`, { x: 220, y: 150, w: 1480, h: 650 }),
    steps: [{
      anim(c) {
        FD.recuerdaIn(c, 0);
        c.words('.eqa', c.t('fotografía') - .2, { stagger: .08 });
        c.pop('.q1', c.t('nítida') - .1, { scale: .3 });
        c.pop('.p1', c.t('nítida') + .2, { scale: .3, sfx: false });
        c.pop('.q2', c.t('real') - .1, { scale: .3 });
        c.pop('.p2', c.t('real') + .2, { scale: .3, sfx: false });
        c.pop('.q3', c.t('trucos') - .2, { scale: .3 });
        c.sfx('ding', c.end, .6);
      }
    }]
  });

  /* ============================== S09 · NIVEL 2 ============================== */
  FD.level('s09', 2, '¿Cómo nació?', I.clock(), { tr: 'zones' });

  /* ============================== S10 · EL PROBLEMA ============================== */
  const strokes = () => { let s = ''; const r = FD.rng(7); for (let i = 0; i < 14; i++) { const x = 40 + r() * 520, y = 40 + r() * 330; s += `<path class="bs" d="M${x.toFixed(1)} ${y.toFixed(1)} q ${(40 + r() * 60).toFixed(1)} ${(-30 + r() * 60).toFixed(1)} ${(110 + r() * 80).toFixed(1)} ${(-20 + r() * 40).toFixed(1)}" stroke="rgba(150,96,40,.55)" stroke-width="${(16 + r() * 18).toFixed(1)}" stroke-linecap="round" fill="none"/>`; } return s; };
  FD.scene({
    id: 's10', theme: 'paper', tr: 'develop', bg: 'grid paperTex', ...L2, hudExp: 'Hace ~120 años',
    html: `
      <div class="abs icon clk" style="left:300px;top:250px;width:300px;height:300px">${I.clock()}</div>
      <div class="abs bigq yr" style="left:700px;top:240px;font-size:300px">2026</div>
      <div class="abs ya" style="left:720px;top:600px"><span class="badge" style="font-size:40px">hace unos 120 años</span></div>
      <div class="abs icon pp1" style="left:250px;top:480px;width:220px;height:220px;color:#2a2927">${I.person()}</div>
      <div class="abs icon pp2" style="left:1450px;top:480px;width:220px;height:220px;color:#2a2927">${I.person()}</div>
      <div class="bubble bb1" style="left:160px;top:200px;width:620px">¡La fotografía <span class="red">no es arte</span>!</div>
      <div class="bubble r bb2" style="left:1080px;top:200px;width:680px">¡Es solo una <span class="red">máquina copiando</span>!</div>
      <div class="abs icon gr" style="left:820px;top:430px;width:280px;height:240px;color:#2a2927">${I.gears()}</div>
      <div class="abs fp" style="left:620px;top:150px;width:680px;height:520px">
        <div class="abs frm" style="left:-46px;top:-46px;right:-46px;bottom:-46px"><svg viewBox="0 0 100 80" preserveAspectRatio="none" style="width:100%;height:100%"><rect x="2" y="2" width="96" height="76" fill="none" stroke="#b8902f" stroke-width="5"/><rect x="5" y="5" width="90" height="70" fill="none" stroke="#e6c46c" stroke-width="1.6"/></svg></div>
        <img class="abs fimg" src="${img('whitefence.jpg')}" style="left:0;top:0;width:680px;height:520px;object-fit:cover">
        <svg class="ov bst" width="680" height="520" viewBox="0 0 600 420" preserveAspectRatio="none" style="mix-blend-mode:multiply;overflow:hidden">${strokes()}</svg>
        <div class="abs fpatch" style="left:380px;top:120px;width:200px;height:200px;border-radius:50%;background:radial-gradient(#e8dfcd 45%, rgba(232,223,205,0) 70%);opacity:0"></div>
      </div>
      <div class="abs mk" style="left:330px;top:300px;width:200px;height:120px;color:#2a2927">${I.mask()}</div>
      <div class="abs dl" style="left:640px;top:740px"><span class="badge k" style="font-size:34px">Disfrazada de pintura</span></div>
      <div class="abs tl1" style="left:1400px;top:200px"><span class="badge r" style="font-size:32px">1 · Borrosas</span></div>
      <div class="abs tl2" style="left:1400px;top:310px"><span class="badge r" style="font-size:32px">2 · Pintadas a mano</span></div>
      <div class="abs tl3" style="left:1400px;top:420px"><span class="badge r" style="font-size:32px">3 · Con cosas borradas</span></div>
      <div class="abs tl4" style="left:1400px;top:560px"><span class="badge" style="font-size:34px">= filtro hecho a mano</span></div>
      <div class="cite" style="right:120px;top:92px">(Art Institute of Chicago, 2016d)</div>`,
    steps: [
      {
        anim(c) {
          c.pop('.clk', 0, { scale: .4 });
          c.tl.fromTo(c.$('.clk svg'), { rotate: 0 }, { rotate: -720, duration: 3, ease: 'power2.inOut' }, .2);
          c.fadeIn('.yr', .1, { dur: .3 });
          c.count('.yr', 2026, 1904, .2, 2.8, v => Math.round(v));
          c.sfx('riser', .2, .6);
          c.pop('.ya', c.t('años') - .3, { scale: .4 });
        }
      },
      {
        anim(c) {
          c.out(['.clk', '.yr', '.ya'], 0, { y: -40, dur: .4 });
          c.pop('.pp1', .2, { scale: .5 });
          c.pop('.bb1', c.t('arte') - .5, { scale: .4, rot: -4 });
          c.pop('.pp2', c.t('máquina') - .7, { scale: .5 });
          c.pop('.bb2', c.t('máquina') - .3, { scale: .4, rot: 4 });
          c.pop('.gr', c.t('copiando') - .2, { scale: .4 });
        }
      },
      {
        anim(c) {
          c.out(['.pp1', '.pp2', '.bb1', '.bb2', '.gr'], 0, { y: -40, dur: .4, stagger: .03 });
          c.fromTo('.fp', { opacity: 0, scale: .9 }, { opacity: 1, scale: 1, duration: .6 }, .3);
          c.fromTo('.fp .frm', { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, duration: .6, ease: 'back.out(1.6)' }, c.t('disfrazar') - .2);
          c.sfx('stamp', c.t('disfrazar') + .2, .6);
          c.pop('.mk', c.t('disfrazar'), { scale: .3, rot: -20 });
          c.pop('.dl', c.t('pinturas') - .2, { scale: .4 });
        }
      },
      {
        anim(c) {
          const A = c.t('borrosas') - .2, B = c.t('pintaban') - .2, C2 = c.t('borraban') - .2;
          c.pop('.tl1', A, { scale: .4 }); c.to('.fp .fimg', { filter: 'blur(6px) sepia(.5)', duration: .7 }, A);
          c.pop('.tl2', B, { scale: .4 }); c.draw(c.$$('.fp .bs'), B, .5, { stagger: .06, sfx: 'marker' });
          c.pop('.tl3', C2, { scale: .4 }); c.to('.fp .fpatch', { opacity: 1, duration: .6 }, C2 + .2); c.sfx('marker', C2 + .2, .4);
          c.pop('.tl4', c.t('filtro') - .2, { scale: .4, sfx: 'ding' });
          c.fadeIn('.cite', c.end - .3);
        }
      }
    ]
  });

  /* ============================== S11 · HARTMANN, 1904 ============================== */
  const adv = (cls, y, svg, txt, ok = true) => `<div class="abs ${cls}" style="left:820px;top:${y}px;display:flex;align-items:center;gap:26px"><div style="width:110px;height:110px;border-radius:50%;background:${ok ? '#111' : 'var(--red)'};color:#fff;display:flex;align-items:center;justify-content:center"><div style="width:58%;height:58%">${svg}</div></div><div class="sans" style="font-size:46px;font-weight:800">${txt}</div><div class="${ok ? 'okc' : 'noc'}" style="position:relative;width:80px;height:80px;font-size:48px">${ok ? '✓' : '✕'}</div></div>`;
  FD.scene({
    id: 's11', theme: 'paper', tr: 'paper', bg: 'grid paperTex', ...L2, hudExp: '1904 · Hartmann',
    html: `
      ${FD.print('hc', 'hartmann.jpg', 170, 150, 460, 580, 'Sadakichi Hartmann, crítico de arte', { style: 'transform:rotate(-3deg)' })}
      <div class="abs bigq y4" style="left:740px;top:140px;font-size:200px">1904</div>
      <div class="bubble bs" style="left:740px;top:400px;width:900px;font-size:66px">¡Basta de <span class="red">disfraces</span>!</div>
      <div class="doc mag" style="left:740px;top:150px;width:980px;height:420px;padding:44px 56px">
        <div class="mono" style="font-size:16px;letter-spacing:.3em;color:#5a5650">American Amateur Photographer · 1904</div>
        <div class="tw t1" style="font-size:52px;font-weight:700;line-height:1.1;margin-top:26px;text-transform:uppercase">A Plea for Straight Photography</div>
        <div class="title2 t2" style="font-size:58px;margin-top:26px;color:#d42a1f">«Un alegato por la fotografía directa»</div>
      </div>
      <div class="note dic" style="left:1120px;top:600px;width:560px;padding:30px 36px;transform:rotate(2deg)"><div class="mono" style="font-size:18px;letter-spacing:.25em">Diccionario</div><div class="sans" style="font-size:44px;font-weight:800;margin-top:10px">alegato = <span class="red">defensa</span></div></div>
      ${adv('a1', 170, I.cam(), 'Confía en tu cámara')}
      ${adv('a2', 320, I.eye(), 'y en tu ojo')}
      ${adv('a3', 470, I.grid3(), 'Compón bien la foto')}
      ${adv('a4', 620, I.eraser(), 'Arreglarla después', false)}
      <div class="doc acta" style="left:560px;top:120px;width:800px;height:640px;padding:56px 64px;background:#f6f0de;transform:rotate(-1.5deg)">
        <div class="mono center" style="font-size:20px;letter-spacing:.4em;color:#8b887f">Acta de nacimiento</div>
        <div class="title2 center" style="font-size:84px;margin-top:20px">Fotografía directa</div>
        <div class="sans" style="font-size:32px;line-height:1.6;margin-top:40px"><b>Nombre en inglés:</b> Straight photography<br><b>Año:</b> 1904<br><b>Le dio voz:</b> Sadakichi Hartmann</div>
        <div class="abs stampx sello" style="right:50px;bottom:50px;color:var(--red);transform:rotate(-12deg);font-size:46px">¡Nació!</div>
      </div>
      <div class="cite" style="right:120px;top:92px">(Hartmann, 1904)</div>`,
    steps: [
      {
        anim(c) {
          c.drop('.hc', c.t('crítico') - .3, { rot: -3 });
          c.slam('.y4', c.t('1904') - .1, { scale: 1.5 });
          c.pop('.bs', c.t('basta') - .2, { scale: .4, rot: -3, sfx: 'hit' });
          c.shake(c.cam, c.t('basta'), 10);
        }
      },
      {
        anim(c) {
          c.out(['.y4', '.bs'], 0, { y: -40, dur: .4 });
          c.drop('.mag', .2, { rot: -1, scale: 1.1 });
          c.type('.mag .t1', c.t('texto') - .2, { cps: 32 });
          c.words('.mag .t2', c.t('alegato') - .2, { stagger: .05 });
          c.drop('.dic', c.t('Alegato', 2) - .2, { rot: 2 });
          c.sfx('ding', c.t('defensa'), .5);
        }
      },
      {
        anim(c) {
          c.out(['.mag', '.dic'], 0, { y: -40, dur: .4 });
          [['.a1', 'cámara'], ['.a2', 'ojo'], ['.a3', 'Compón'], ['.a4', 'arreglarla']].forEach(([k, w], i) => {
            c.fromTo(k, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: .5, ease: 'power3.out' }, c.t(w) - .3);
            c.sfx(i < 3 ? 'ding' : 'wrong', c.t(w) + .1, .45);
          });
        }
      },
      {
        anim(c) {
          c.out(['.a1', '.a2', '.a3', '.a4', '.hc'], 0, { y: -40, dur: .4, stagger: .03 });
          c.drop('.acta', .3, { rot: -1.5, scale: 1.2 });
          c.stamp('.acta .sello', c.t('nombre') - .1, { rot: -12, amp: 8 });
          c.sfx('levelup', c.t('nombre') + .3, .5);
          c.fadeIn('.cite', c.end - .3);
        }
      }
    ]
  });

  /* ============================== S12 · ¡RECUERDA! (NIVEL 2) ============================== */
  FD.scene({
    id: 's12', theme: 'yellow', tr: 'paper', bg: 'dotsK', ...L2, hudExp: '¡Recuerda!',
    html: FD.recuerdaHTML(`
      <div class="abs r1" style="left:70px;top:190px;display:flex;align-items:center;gap:30px"><div class="bigq" style="font-size:150px;color:#111">+100</div><div class="sans" style="font-size:52px;font-weight:800;line-height:1.1">años de historia<br><span class="mono" style="font-size:24px;letter-spacing:.2em;color:#8b887f">nació en 1904</span></div></div>
      <div class="abs r2" style="left:70px;top:420px;display:flex;align-items:center;gap:30px">
        <div style="width:150px;height:110px;color:#111;position:relative">${I.mask()}<div class="bigq" style="position:absolute;left:30px;top:-20px;font-size:150px;color:var(--red)">✕</div></div>
        <div class="bigq" style="font-size:90px">→</div>
        <div style="width:150px;height:110px;color:#111">${I.cam()}</div>
        <div class="sans" style="font-size:46px;font-weight:800;line-height:1.15">Una reacción contra las fotos<br>${FD.hl('disfrazadas de pintura')}</div>
      </div>`, { x: 220, y: 150, w: 1480, h: 650 }),
    steps: [{
      anim(c) {
        FD.recuerdaIn(c, 0);
        c.fadeUp('.r1', c.t('nació') - .2, { y: 30, sfx: 'pop' });
        c.fadeUp('.r2', c.t('reacción') - .3, { y: 30, sfx: 'pop' });
        c.sfx('ding', c.end, .6);
      }
    }]
  });
})();
