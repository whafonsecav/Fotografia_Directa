/* ==========================================================================
   ESCENAS 36–43 · Nivel 5 (¿cómo reconocerla?), resumen, tu turno, gracias, referencias
   ========================================================================== */
(() => {
  const I = FD.icons, img = FD.img;
  const L5 = { level: 5, act: 'Nivel 5 · ¿Cómo reconocerla?' };
  const STRAIGHT = ['steerage.jpg', 'wallstreet.jpg', 'blindwoman.jpg', 'porch.jpg', 'whitefence.jpg', 'weston_pepper.jpg', 'weston_shell.jpg', 'tetons.jpg', 'adams2.jpg', 'cunningham_magnolia.jpg', 'equivalent.jpg'];
  const smooth = pts => { let d = `M${pts[0][0]} ${pts[0][1]}`; for (let i = 0; i < pts.length - 1; i++) { const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)]; const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]; d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(1)} ${c2[1].toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`; } return d; };

  /* ============================== S36 · NIVEL 5 ============================== */
  FD.level('s36', 5, '¿Cómo reconocerla?', I.loupe(), { tr: 'zones' });

  /* ============================== S37 · LAS 4 PREGUNTAS ============================== */
  const QS = [['¿Está nítida?', 'nítida'], ['¿Se ven las texturas?', 'texturas'], ['¿Tiene muchos grises?', 'grises'], ['¿Parece real, sin trucos?', 'real']];
  FD.scene({
    id: 's37', theme: 'light', tr: 'push', bg: 'grid', ...L5, hudExp: '4 preguntas',
    html: `
      <div class="abs title2 qt center" style="left:0;width:1920px;top:105px;font-size:110px">Hazte <span class="red" style="font-family:var(--block);font-style:normal">4</span> preguntas</div>
      ${QS.map(([q], i) => `<div class="qcard q${i}" style="left:${i % 2 ? 1000 : 230}px;top:${270 + Math.floor(i / 2) * 220}px;width:690px;height:170px;display:flex;align-items:center"><span class="qtx">${q}</span><div class="qq">?</div></div>
        <div class="okc qk${i}" style="left:${(i % 2 ? 1000 : 230) + 640}px;top:${270 + Math.floor(i / 2) * 220 - 30}px;width:100px;height:100px;font-size:60px">✓</div>`).join('')}
      <div class="abs stampx yes" style="left:420px;top:720px;color:#1f9d55;font-size:84px;transform:rotate(-3deg)">¡Es fotografía directa!</div>`,
    steps: [
      { anim(c) { c.words('.qt', 0, { stagger: .1 }); QS.forEach((_, i) => { c.fromTo('.q' + i, { opacity: 0, y: 40, scale: .9 }, { opacity: 1, y: 0, scale: 1, duration: .5, ease: 'back.out(1.8)' }, .6 + i * .12); c.fromTo(c.$('.q' + i + ' .qtx'), { opacity: 0 }, { opacity: 0, duration: .01 }, 0); }); c.sfx('card', .6, .5); } },
      {
        anim(c) {
          QS.forEach(([, w], i) => {
            const T = c.t(w, 1, .5 + i * 2) - .5;
            c.to(c.$('.q' + i + ' .qtx'), { opacity: 1, duration: .4 }, T);
            c.tl.fromTo(c.$('.q' + i), { scale: 1 }, { scale: 1.05, duration: .25, yoyo: true, repeat: 1, immediateRender: false }, T);
            c.sfx('pop', T, .5);
          });
        }
      },
      {
        anim(c) {
          QS.forEach((_, i) => FD.ok(c, '.qk' + i, c.t('respuesta') + i * .15));
          c.to(c.$$('.qcard .qq'), { opacity: 0, duration: .2 }, c.t('respuesta'));
          c.stamp('.yes', c.t('fotografía') - .1, { rot: -3, amp: 10 });
          c.sfx('levelup', c.t('directa'), .5);
        }
      }
    ]
  });

  /* ============================== S38 · PROBEMOS CON ADAMS ============================== */
  const TW = 940, TH = Math.round(940 * 1537 / 1920), TX = 150, TY = (1080 - TH - 60) / 2 - 10;
  const tp = (fx, fy) => [fx * TW, fy * TH];
  const RIVER = smooth([[.95, .93], [.62, .91], [.37, .865], [.29, .775], [.33, .70], [.45, .655], [.58, .612], [.70, .566], [.765, .55]].map(p => tp(...p)));
  const zc = (cls, f, txt, fill, col) => { const [x, y] = tp(...f); return `<g class="${cls}"><circle cx="${x}" cy="${y}" r="46" fill="${fill}" stroke="${col === '#fff' ? '#fff' : '#0c0c0b'}" stroke-width="5"/><text x="${x}" y="${y + 16}" text-anchor="middle" font-family="Anton" font-size="44" fill="${col}">${txt}</text></g>`; };
  const brk = (cls, f, w, h) => { const [x, y] = tp(...f); return `<g class="${cls}" stroke="#ffc93c" stroke-width="7" fill="none"><path d="M${x - w / 2} ${y - h / 2 + 30} V${y - h / 2} H${x - w / 2 + 30}"/><path d="M${x + w / 2 - 30} ${y - h / 2} H${x + w / 2} V${y - h / 2 + 30}"/><path d="M${x - w / 2} ${y + h / 2 - 30} V${y + h / 2} H${x - w / 2 + 30}"/><path d="M${x + w / 2 - 30} ${y + h / 2} H${x + w / 2} V${y + h / 2 - 30}"/></g>`; };
  const CK = [['¿Nítida?', 'Sí: del agua a las montañas'], ['¿Muchos grises?', 'Sí: sombras y blancos'], ['¿Trucos?', 'No, ninguno'], ['¿Composición?', 'El río en S guía la mirada']];
  FD.scene({
    id: 's38', theme: 'dark', tr: 'contact', trOpt: { a: [1, 1], b: [2, 2], imgs: STRAIGHT }, bg: 'gridW', ...L5, hudExp: 'Probemos',
    html: `
      <div class="print tet" style="left:${TX}px;top:${TY}px;width:${TW + 32}px;height:${TH + 32}px;padding:16px">
        <div class="ph"><img src="${img('tetons.jpg')}"></div>
        <svg class="ov an" width="${TW}" height="${TH}" style="left:16px;top:16px">
          ${brk('b1', [.62, .88], 240, 120)}${brk('b2', [.6, .3], 300, 160)}
          ${zc('z2', [.12, .64], 'II', '#1b1b1a', '#fff')}${zc('z8', [.57, .29], 'VIII', '#ecebe6', '#0c0c0b')}
          <path class="riv" d="${RIVER}" fill="none" stroke="#ff3b2c" stroke-width="9" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="abs mono tc" style="left:${TX}px;top:${TY + TH + 44}px;font-size:16px;color:#a9a69e;text-transform:none;letter-spacing:.04em">Ansel Adams, The Tetons and the Snake River, 1942 · National Archives (dominio público)</div>
      <div class="abs side" style="left:1170px;top:150px;width:620px;color:#fff">
        <div class="title2 k2" style="font-size:72px">Probemos</div>
        ${CK.map(([q, a], i) => `<div class="row r${i}" style="display:flex;gap:20px;align-items:center;margin-top:${i ? 26 : 34}px"><div class="okc ok${i}" style="position:relative;width:76px;height:76px;font-size:44px;flex:none;${i === 2 ? 'background:#1f9d55' : ''}">✓</div><div><div class="sans" style="font-size:38px;font-weight:800">${q}</div><div class="sans" style="font-size:28px;color:#cfccc4">${a}</div></div></div>`).join('')}
        <div class="stampx fin" style="position:relative;display:inline-block;margin-top:40px;color:#ffc93c;font-size:56px;transform:rotate(-3deg)">¡Fotografía directa!</div>
      </div>
      <div class="cite" style="right:120px;top:92px">(Adams, 1942)</div>`,
    steps: [
      {
        anim(c) {
          c.develop('.tet img', .2, 1.6);
          c.fromTo('.tet', { opacity: 0 }, { opacity: 1, duration: .5 }, 0);
          c.fadeIn('.tc', .6);
          c.words('.side .k2', .3, { stagger: .1 });
          c.set(c.$$('.side .row'), { opacity: 0 }, 0);
          c.fadeIn('.cite', c.end - .3);
        }
      },
      {
        anim(c) {
          c.fadeUp('.side .r0', 0, { y: 20 });
          c.draw(c.$$('.tet .b1 path'), c.t('agua') - .2, .4, { sfx: 'click' });
          c.draw(c.$$('.tet .b2 path'), c.t('montañas') - .2, .4, { sfx: 'click' });
          FD.ok(c, '.ok0', c.t('Sí') - .1);
        }
      },
      {
        anim(c) {
          c.fadeUp('.side .r1', 0, { y: 20 });
          c.pop('.tet .z2', c.t('bosque') - .2, { scale: .3 });
          c.pop('.tet .z8', c.t('nieve') - .2, { scale: .3 });
          FD.ok(c, '.ok1', c.t('Sí') - .1);
        }
      },
      {
        anim(c) {
          c.fadeUp('.side .r2', 0, { y: 20 });
          FD.ok(c, '.ok2', c.t('No') - .1);
          c.fadeUp('.side .r3', c.t('fíjate') - .2, { y: 20 });
          c.draw('.tet .riv', c.t('río') - .2, 2.0, { sfx: 'marker' });
          FD.ok(c, '.ok3', c.t('fondo') - .1);
          c.stamp('.fin', c.t('Es') - .1, { rot: -3, amp: 8 });
        }
      }
    ]
  });

  /* ============================== S39 · RETO FINAL (QUIZ) ============================== */
  const QX = [150, 710, 1270], QSRC = ['weston_pepper.jpg', 'wallstreet_filtro.jpg', 'tetons.jpg'];
  FD.scene({
    id: 's39', theme: 'black', tr: 'flash', bg: 'rays', ...L5, hudExp: 'Último reto',
    html: `
      <div class="abs bigq rq center" style="left:0;width:1920px;top:100px;font-size:96px;color:#fff">¿Cuáles son <span class="red">fotografía directa</span>?</div>
      ${QX.map((x, i) => `${FD.print('qp' + i, QSRC[i], x, 270, 500, 480, '', { np: true, style: `transform:rotate(${[-2, 1.5, -1][i]}deg)` })}
        <div class="abs bigq ql${i}" style="left:${x - 30}px;top:240px;width:100px;height:100px;border-radius:50%;background:#fff;color:#111;font-size:70px;display:flex;align-items:center;justify-content:center">${'ABC'[i]}</div>
        ${i === 1 ? FD.noHTML('rv' + i, x + 190, 440) : FD.okHTML('rv' + i, x + 190, 440)}`).join('')}
      ${FD.cdownHTML('cd', 810, 350)}
      <div class="abs bigq mb center" style="left:0;width:1920px;top:770px;font-size:110px;color:#ffc93c">¡Muy bien!</div>`,
    steps: [
      {
        anim(c) {
          c.slam('.rq', c.t('reto') - .1, { scale: 1.5, sfx: 'hit', vol: .6 });
          QX.forEach((_, i) => { c.drop('.qp' + i, c.t('Cuáles') + i * .2, { rot: [-2, 1.5, -1][i], scale: 1.2 }); c.pop('.ql' + i, c.t('Cuáles') + .3 + i * .2, { scale: .3, sfx: false }); });
        }
      },
      {
        lead: .1, min: 3.5,
        anim(c) {
          const box = c.$('.cd'), ring = box.querySelector('.ring');
          const nums = ['.n3', '.n2', '.n1'].map(k => box.querySelector(k));
          const T = [c.t('Tres'), c.t('dos'), c.t('uno')];
          c.tl.fromTo(box, { opacity: 0, scale: .5 }, { opacity: 1, scale: 1, duration: .3, ease: 'back.out(2)' }, T[0] - .2);
          c.tl.fromTo(ring, { strokeDashoffset: 817 }, { strokeDashoffset: 0, duration: T[2] - T[0] + .8, ease: 'none' }, T[0]);
          nums.forEach((n, i) => { c.tl.fromTo(n, { scale: 1.6, opacity: 0 }, { scale: 1, opacity: 1, duration: .3, ease: 'back.out(2)' }, T[i]); if (i < 2) c.tl.to(n, { opacity: 0, duration: .1 }, T[i + 1] - .05); c.sfx('beep', T[i], .55); });
          c.tl.to(box, { opacity: 0, scale: 1.3, duration: .3 }, T[2] + .9);
          c.hold(T[0] - .2, T[2] + 1.2); // la cuenta siempre va a velocidad real
        }
      },
      {
        anim(c) {
          FD.ok(c, '.rv0', c.t('pimiento') - .1);
          FD.ok(c, '.rv2', c.t('montañas') - .1);
          FD.ok(c, '.rv1', c.t('filtro') - .1, false);
          c.to('.qp1', { opacity: .4, scale: .94, duration: .4 }, c.t('filtro'));
          c.slam('.mb', c.t('Muy') - .1, { scale: 1.6, sfx: 'sparkle' });
          c.sfx('levelup', c.t('bien'), .5);
        }
      }
    ]
  });

  /* ============================== S40 · RESUMEN EN 10 SEGUNDOS ============================== */
  const FACES = [['cut_stieglitz.png', 'Stíglitz'], ['cut_strand.png', 'Strand'], ['cut_weston.png', 'Uéston'], ['cut_adams.png', 'Ádams'], ['cut_cunningham.png', 'Cániñam']];
  FD.scene({
    id: 's40', theme: 'dark', tr: 'iris', bg: 'dots', hudExp: 'Resumen', act: 'Resumen',
    html: `
      <div class="abs sw" style="left:1560px;top:90px;width:230px;height:230px">
        <svg viewBox="0 0 230 230"><circle cx="115" cy="125" r="96" fill="#141413" stroke="#fff" stroke-width="10"/><rect x="95" y="8" width="40" height="22" rx="6" fill="#fff"/><path class="swr" d="M115 125 L115 45" stroke="#ffc93c" stroke-width="10" stroke-linecap="round" style="transform-origin:115px 125px"/></svg>
        <div class="bigq swn" style="position:absolute;left:0;right:0;top:95px;text-align:center;font-size:76px;color:#fff">10</div>
      </div>
      <div class="abs title2 rt" style="left:150px;top:110px;font-size:110px;color:#fff">Resumen en 10 segundos</div>
      <div class="abs rw1" style="left:150px;top:300px;display:flex;align-items:center;gap:30px;color:#fff"><span class="badge" style="font-size:34px">Nació</span><span class="bigq" style="font-size:96px">hace +100 años</span><span class="mono" style="font-size:26px;letter-spacing:.2em;color:#ff5a4c">· 1904</span></div>
      <div class="abs rw2" style="left:150px;top:470px;display:flex;align-items:center;gap:22px;color:#fff"><span class="badge" style="font-size:34px">Protagonistas</span>
        ${FACES.map(([s], i) => `<div class="fc fc${i}" style="width:150px;height:150px;border-radius:50%;background:linear-gradient(160deg,#e8402f,#9e1810);overflow:hidden;border:6px solid #fff;display:flex;justify-content:center;align-items:flex-end"><img src="${img(s)}" style="height:140px"></div>`).join('')}</div>
      <div class="abs rw3" style="left:150px;top:690px;display:flex;align-items:center;gap:22px;color:#fff"><span class="badge" style="font-size:34px">Regla</span>
        <span class="badge k g1" style="font-size:46px;background:#fff;color:#111">Nítida</span><span class="badge k g2" style="font-size:46px;background:#fff;color:#111">Real</span><span class="badge k g3" style="font-size:46px;background:#fff;color:#111">Sin trucos</span></div>`,
    steps: [
      { anim(c) { c.words('.rt', 0, { stagger: .07 }); c.pop('.sw', .3, { scale: .4 }); } },
      {
        anim(c) {
          const swn = c.$('.swn'), p = { v: 10 };
          c.tl.fromTo(p, { v: 10 }, { v: 0, duration: Math.max(6, c.end - .3), ease: 'none', onUpdate: () => { swn.textContent = Math.ceil(p.v); } }, .2);
          c.tl.fromTo(c.$('.swr'), { rotate: 0 }, { rotate: 360, duration: Math.max(6, c.end - .3), ease: 'none' }, .2);
          c.fadeUp('.rw1', c.t('nació') - .3, { y: 30, sfx: 'pop' });
          c.fadeIn('.rw2 > .badge', c.t('protagonistas') - .3);
          FACES.forEach(([, w], i) => c.pop('.fc' + i, c.t(w) - .2, { scale: .3 }));
          c.fadeIn('.rw3 > .badge:first-child', c.t('regla') - .3);
          [['nítida', 'g1'], ['real', 'g2'], ['trucos', 'g3']].forEach(([w, k]) => c.pop('.' + k, c.t(w) - .2, { scale: .3 }));
          c.sfx('ding', c.end, .6);
        }
      }
    ]
  });

  /* ============================== S41 · ¡TU TURNO! ============================== */
  FD.scene({
    id: 's41', theme: 'lvl', tr: 'zones', bg: 'rays dots', hudExp: '¡Tu turno!', act: 'Tu turno',
    html: `
      <div class="abs bigq tt" style="left:150px;top:130px;font-size:170px;color:#fff">¡Te toca!</div>
      <div class="abs hoy" style="left:156px;top:340px"><span class="badge k" style="font-size:44px">Hoy: 1 foto #SinFiltro</span></div>
      <div class="abs ch1" style="left:156px;top:470px"><span class="bigq" style="font-size:110px;color:#fff">1. Mira</span></div>
      <div class="abs ch2" style="left:156px;top:590px"><span class="bigq" style="font-size:110px;color:#fff">2. Enfoca</span></div>
      <div class="abs ch3" style="left:156px;top:710px"><span class="bigq" style="font-size:110px;color:#ffc93c">3. ¡Dispara!</span></div>
      ${FD.phone('ph', 1250, 50, 'tetons.jpg', `<div class="focsq fq" style="left:184px;top:380px"></div><div class="shut sh"></div>`, { imgStyle: 'filter:blur(8px)' })}`,
    steps: [{
      anim(c) {
        c.slam('.tt', c.t('toca') - .2, { scale: 1.6, sfx: 'hit', vol: .6 });
        c.fromTo('.ph', { y: 260, opacity: 0, rotate: 6 }, { y: 0, opacity: 1, rotate: 0, duration: .8, ease: 'back.out(1.4)' }, .3);
        c.pop('.hoy', c.t('filtro') - .4, { scale: .4 });
        c.slam('.ch1', c.t('Mira') - .1, { scale: 1.5, sfx: 'pop' });
        c.slam('.ch2', c.t('enfoca') - .1, { scale: 1.5, sfx: 'pop' });
        c.fromTo('.ph .fq', { scale: 1.6, opacity: 0 }, { scale: 1, opacity: 1, duration: .35, ease: 'back.out(2)' }, c.t('enfoca'));
        c.to('.ph .ph-img', { filter: 'blur(0px)', duration: .6 }, c.t('enfoca') + .1);
        c.sfx('beep', c.t('enfoca') + .5, .5);
        c.slam('.ch3', c.t('dispara') - .1, { scale: 1.5, sfx: 'shutter' });
        c.tl.fromTo(c.$('.ph .sh'), { scale: 1 }, { scale: .8, duration: .1, yoyo: true, repeat: 1, immediateRender: false }, c.t('dispara'));
        c.flash(c.t('dispara') + .15, { max: 1 });
        c.shake(c.cam, c.t('dispara') + .1, 14);
      }
    }]
  });

  /* ============================== S42 · GRACIAS ============================== */
  const hstrip = () => { let s = ''; for (let i = 0; i < 24; i++) s += `<div style="position:absolute;left:${i * 330}px;top:34px;width:300px;height:200px;overflow:hidden;background:#1a1a19"><img src="${img(STRAIGHT[i % STRAIGHT.length])}" style="width:100%;height:100%;object-fit:cover;filter:grayscale(1)"></div>`; return s; };
  FD.scene({
    id: 's42', theme: 'dark', tr: 'flash', hud: false, bg: 'gridW',
    html: `
      <img class="abs logo" src="${img('logo_poli_w.png')}" style="left:150px;top:100px;width:220px">
      <div class="abs disp g1" style="left:140px;top:230px;font-size:320px;color:#fff">Gracias<span class="red">.</span></div>
      <div class="abs gcred" style="left:156px;top:590px;width:1640px;color:#e9e6df;display:flex;gap:80px">
        <div><div class="mono" style="font-size:16px;color:#ff5a4c;letter-spacing:.24em">Presentan</div><div class="sans" style="font-size:29px;font-weight:600;margin-top:10px;line-height:1.35">William Fonseca<br>Mariana Silva<br>Karen Montoya<br>Paula Gutiérrez</div></div>
        <div><div class="mono" style="font-size:16px;color:#ff5a4c;letter-spacing:.24em">Docente</div><div class="sans" style="font-size:29px;font-weight:600;margin-top:10px">Cristian Fuentes</div>
             <div class="mono" style="font-size:16px;color:#ff5a4c;letter-spacing:.24em;margin-top:30px">Asignatura</div><div class="sans" style="font-size:29px;font-weight:600;margin-top:10px">Taller de Fotografía</div></div>
        <div><div class="mono" style="font-size:16px;color:#ff5a4c;letter-spacing:.24em">Institución</div><div class="sans" style="font-size:29px;font-weight:600;margin-top:10px;line-height:1.35">Politécnico Grancolombiano<br><span style="font-weight:400;color:#bdbab2;font-size:25px">Sede Bogotá · Nocturna presencial<br>Sábados AM</span></div></div>
        <div><div class="mono" style="font-size:16px;color:#ff5a4c;letter-spacing:.24em">Tema</div><div class="disp" style="font-size:54px;margin-top:6px;line-height:.95">Fotografía<br>directa</div></div>
      </div>
      <div class="abs hs" style="left:0;top:880px;width:8000px;height:270px;background:#0a0a09">
        <div style="position:absolute;left:0;right:0;top:8px;height:20px;background-image:radial-gradient(ellipse 9px 7px at 50% 50%, #d9d5cc 96%, transparent 100%);background-size:40px 20px"></div>
        ${hstrip()}
      </div>`,
    ambient(t, sc) { gsap.set(sc.root.querySelector('.hs'), { x: -((t * 40) % (330 * STRAIGHT.length)) }); },
    steps: [{
      lead: .6, min: 7, captions: false,
      anim(c) {
        c.fadeIn('.logo', 0, { dur: 1 });
        c.focus('.g1', .2, { blur: 40, dur: 1.6, vol: .8 });
        c.fromTo('.hs', { y: 260 }, { y: 0, duration: 1.2, ease: 'expo.out' }, .4);
        c.sfx('film', .5, .7);
        c.fadeUp(c.$$('.gcred > div'), .9, { stagger: .15, y: 30 });
      }
    }]
  });

  /* ============================== S43 · REFERENCIAS ============================== */
  const R = window.REFS || [], RI = window.REFS_IMG || [];
  const half = Math.ceil(R.length / 2);
  const pg = (cls, title, list, sub, cols = 2, fs = 17.5) => `
    <div class="abs ${cls}" style="left:0;top:0;width:1920px;height:1080px">
      <div class="abs mono" style="left:150px;top:96px;font-size:19px;letter-spacing:.3em;color:#8b887f">${sub}</div>
      <div class="abs disp" style="left:146px;top:140px;font-size:72px">${title}</div>
      <div class="refs" style="top:240px;column-count:${cols}"><style>.${cls} .refs p{font-size:${fs}px}</style>${list.map(r => `<p>${r}</p>`).join('')}</div>
    </div>`;
  FD.scene({
    id: 's43', theme: 'paper', tr: 'paper', bg: 'grid', hud: false,
    html: pg('rp1', 'Referencias', R.slice(0, half), 'Normas APA, 7.ª edición · 1/3') + pg('rp2', 'Referencias', R.slice(half), 'Normas APA, 7.ª edición · 2/3') + pg('rp3', 'Créditos de imágenes', RI, 'Normas APA, 7.ª edición · 3/3', 3, 13.5),
    steps: [
      { min: 12, anim(c) { c.fadeIn('.rp1', 0, { dur: .4 }); c.words('.rp1 .disp', 0); c.fadeUp(c.$$('.rp1 .refs p'), .3, { stagger: .03, y: 12 }); } },
      { min: 12, anim(c) { c.out('.rp1', 0, { y: -30, dur: .4 }); c.fadeIn('.rp2', .2, { dur: .3 }); c.words('.rp2 .disp', .3); c.fadeUp(c.$$('.rp2 .refs p'), .5, { stagger: .03, y: 12 }); c.sfx('paper', 0, .6); } },
      { min: 12, anim(c) { c.out('.rp2', 0, { y: -30, dur: .4 }); c.fadeIn('.rp3', .2, { dur: .3 }); c.words('.rp3 .disp', .3); c.fadeUp(c.$$('.rp3 .refs p'), .5, { stagger: .02, y: 12 }); c.sfx('paper', 0, .6); } }
    ]
  });
})();
