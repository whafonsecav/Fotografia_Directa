/* ==========================================================================
   ESCENAS 13–26 · Nivel 3 · Los protagonistas (como personajes de un juego)
   ========================================================================== */
(() => {
  const I = FD.icons, img = FD.img;
  const L3 = { level: 3, act: 'Nivel 3 · Los protagonistas' };
  const powerText = (cls, x, y, w, txt) => `<div class="abs ${cls}" style="left:${x}px;top:${y}px;width:${w}px"><div class="mono" style="font-size:22px;letter-spacing:.3em;font-weight:700;color:var(--red)">Superpoder</div><div class="title2" style="font-size:96px;margin-top:14px">${txt}</div></div>`;
  /* lupa que amplía un punto de una imagen */
  const loupe = (cls, cx, cy, r, src, iw, ih, fx, fy, z) => `<div class="abs ${cls}" style="left:${cx - r}px;top:${cy - r}px;width:${2 * r}px;height:${2 * r}px;border-radius:50%;overflow:hidden;border:12px solid #fff;box-shadow:0 30px 60px rgba(0,0,0,.5)"><img src="${img(src)}" style="position:absolute;width:${iw * z}px;height:${ih * z}px;left:${r - 12 - iw * z * fx}px;top:${r - 12 - ih * z * fy}px"></div>`;

  /* ============================== S13 · NIVEL 3 ============================== */
  FD.level('s13', 3, 'Los protagonistas', I.person(), { tr: 'zones' });

  /* ============================== S14 · STIEGLITZ ============================== */
  FD.scene({
    id: 's14', theme: 'dark', tr: 'push', bg: 'dots', ...L3, hudExp: 'Personaje 1',
    html: `
      ${FD.pcard('pc', 200, 100, { n: '01', years: '1864–1946', cut: 'cut_stieglitz.png', name: 'Alfred Stieglitz', power: 'Lograr que la gente respetara la fotografía' })}
      <div style="color:#fff">${powerText('pw', 820, 220, 960, 'Hacer que respetaran la fotografía')}</div>
      ${FD.print('cw', 'camerawork1903.jpg', 840, 150, 330, 480, '', { np: true, style: 'transform:rotate(-4deg)' })}
      <div class="abs cwl" style="left:880px;top:660px"><span class="badge" style="font-size:32px">Revista: Camera Work</span></div>
      <div class="abs gal" style="left:1260px;top:170px;width:480px;height:420px;background:#f1eee6;color:#111;border-radius:18px;box-shadow:0 30px 60px rgba(0,0,0,.45);padding:34px">
        <div class="mono" style="font-size:18px;letter-spacing:.3em;color:#8b887f">Galería · Nueva York</div>
        <div class="bigq" style="font-size:190px;line-height:.9;margin-top:10px">291</div>
        <div style="display:flex;gap:16px;margin-top:20px">${[0, 1, 2].map(k => `<div style="width:120px;height:90px;background:#ddd;border:6px solid #c9a24a"><img src="${img(['steerage.jpg', 'porch.jpg', 'equivalent.jpg'][k])}" style="width:100%;height:100%;object-fit:cover"></div>`).join('')}</div>
      </div>
      <div class="abs gl" style="left:1290px;top:620px"><span class="badge" style="font-size:32px">Fotos como obras de arte</span></div>
      <div class="cite" style="right:120px;top:92px">(Hostetler, 2004a; Art Institute of Chicago, 2016a, 2016b)</div>`,
    steps: [
      { anim(c) { FD.flipCard(c, '.pc', c.t('personaje') - .3); c.words('.pw .title2', c.t('superpoder') - .1, { stagger: .07 }); c.fadeIn('.pw .mono', c.t('superpoder') - .2); } },
      {
        anim(c) {
          c.out('.pw', 0, { y: -40, dur: .4 });
          c.drop('.cw', c.t('revista') - .2, { rot: -4 });
          c.pop('.cwl', c.t('Cámera') - .1, { scale: .4 });
          c.drop('.gal', c.t('galería') - .2, { rot: 2 });
          c.pop('.gl', c.t('arte') - .3, { scale: .4, sfx: 'ding' });
          c.fadeIn('.cite', c.end - .3);
        }
      }
    ]
  });

  /* ============================== S15 · LA TERCERA CLASE ============================== */
  const SW = 600, SH = Math.round(600 * 3009 / 2400), SX = 1140, SY = 90;
  const P = (fx, fy) => [(fx * SW).toFixed(1), (fy * SH).toFixed(1)];
  const ln = (a, b) => `M${P(...a).join(' ')} L${P(...b).join(' ')}`;
  const ship = `<svg viewBox="0 0 200 120" fill="none" stroke="currentColor" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"><path d="M10 70 H190 L160 108 H40 Z"/><path d="M50 70 V44 H130 V70"/><path d="M80 44 V16 H104 V44"/><path d="M6 116 Q30 106 54 116 T102 116 T150 116 T198 116"/></svg>`;
  FD.scene({
    id: 's15', theme: 'dark', tr: 'develop', bg: 'spot', ...L3, hudExp: '1907 · 1 placa',
    html: `
      <div class="print stg" style="left:${SX - 16}px;top:${SY - 16}px;width:${SW + 32}px;height:${SH + 32}px;padding:16px">
        <div class="ph"><img src="${img('steerage.jpg')}"></div>
        <svg class="ov an" width="${SW}" height="${SH}" style="left:16px;top:16px">
          <circle class="a1" cx="${P(.51, .214)[0]}" cy="${P(.51, .214)[1]}" r="36" fill="none" stroke="#ffc93c" stroke-width="8"/>
          <path class="a2" d="${ln([.865, .76], [.985, .31])}" stroke="#ffc93c" stroke-width="10" stroke-linecap="round"/>
          <path class="a3" d="${ln([.02, .61], [.82, .445])}" stroke="#ffc93c" stroke-width="10" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="abs bigq y7" style="left:150px;top:150px;font-size:220px;color:#fff">1907</div>
      <div class="abs icon sh" style="left:170px;top:420px;width:330px;height:200px;color:#fff">${ship}</div>
      <div class="abs sha" style="left:560px;top:470px;color:#fff"><span class="badge" style="font-size:34px">↓ miró hacia abajo</span></div>
      <div class="abs f1" style="left:${SX - 330}px;top:${SY + 90}px"><span class="badge" style="font-size:34px">● Sombrero redondo</span></div>
      <div class="abs f2" style="left:${SX - 250}px;top:${SY + 520}px"><span class="badge" style="font-size:34px">／ Escalera</span></div>
      <div class="abs f3" style="left:${SX - 390}px;top:${SY + 330}px"><span class="badge" style="font-size:34px">⟋ Puente en diagonal</span></div>
      <div class="abs dc" style="left:150px;top:160px"><span class="badge r" style="font-size:34px">★ Dato curioso</span></div>
      <div class="abs plate" style="left:170px;top:280px;width:230px;height:300px;border-radius:10px;background:linear-gradient(160deg,#5b5a56,#2b2a28);box-shadow:0 20px 40px rgba(0,0,0,.6);border:6px solid #8d8b85"></div>
      <div class="abs bigq pl1" style="left:450px;top:270px;font-size:120px;color:#fff;line-height:1">1 placa</div>
      <div class="abs bigq pl2" style="left:450px;top:410px;font-size:72px;color:#ffc93c;line-height:1">= 1 oportunidad</div>
      <div class="abs ok1" style="left:450px;top:540px"><span class="badge" style="font-size:36px;background:#1f9d55;color:#fff">¡Y la aprovechó!</span></div>
      <div class="abs tit" style="left:150px;top:230px;width:900px;color:#fff">
        <div class="mono" style="font-size:22px;letter-spacing:.3em;color:#ff5a4c">Alfred Stieglitz · 1907</div>
        <div class="title2" style="font-size:130px;margin-top:10px">La tercera clase</div>
        <div class="stars" style="font-size:70px;color:#ffc93c;margin-top:20px;letter-spacing:.1em">★★★★★</div>
        <div class="sans" style="font-size:40px;font-weight:700;margin-top:10px">de las más famosas de la fotografía directa</div>
      </div>
      <div class="cite" style="right:120px;top:92px">(Stieglitz, 1907; Stieglitz, 1942/2000)</div>`,
    steps: [
      {
        anim(c) {
          c.slam('.y7', c.t('1907') - .1, { scale: 1.5 });
          c.pop('.sh', c.t('barco') - .3, { scale: .4 });
          c.tl.to(c.$('.sh'), { y: 10, rotate: 2, duration: .8, yoyo: true, repeat: 5, ease: 'sine.inOut' }, c.t('barco'));
          c.pop('.sha', c.t('abajo') - .3, { scale: .4 });
          c.develop('.stg img', c.t('escena') - .8, 1.8);
          c.fromTo('.stg', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .7 }, c.t('escena') - .9);
        }
      },
      {
        anim(c) {
          c.out(['.y7', '.sh', '.sha'], 0, { y: -40, dur: .4 });
          const H = c.t('sombrero') - .2, E = c.t('escalera') - .2, Pt = c.t('puente') - .2;
          c.fromTo('.stg .a1', { scale: 0, transformOrigin: `${P(.51, .214)[0]}px ${P(.51, .214)[1]}px` }, { scale: 1, duration: .5, ease: 'back.out(3)' }, H);
          c.pop('.f1', H + .2, { scale: .4, sfx: 'pop' });
          c.draw('.stg .a2', E, .6, { sfx: 'marker' }); c.pop('.f2', E + .2, { scale: .4, sfx: false });
          c.draw('.stg .a3', Pt, .6, { sfx: 'marker' }); c.pop('.f3', Pt + .2, { scale: .4, sfx: false });
        }
      },
      {
        anim(c) {
          c.out(['.f1', '.f2', '.f3'], 0, { dur: .3 });
          c.pop('.dc', 0, { scale: .4, sfx: 'sparkle' });
          c.fromTo('.plate', { opacity: 0, rotateY: 80 }, { opacity: 1, rotateY: 0, duration: .7, ease: 'back.out(1.5)' }, c.t('placa') - .3);
          c.slam('.pl1', c.t('placa') - .1, { scale: 1.4, vol: .5 });
          c.words('.pl2', c.t('oportunidad') - .4, { stagger: .06 });
          c.flash(c.t('aprovechó') - .3, { max: .8 });
          c.pop('.ok1', c.t('aprovechó'), { scale: .4, sfx: 'ding' });
        }
      },
      {
        anim(c) {
          c.out(['.dc', '.plate', '.pl1', '.pl2', '.ok1'], 0, { y: -40, dur: .4, stagger: .03 });
          c.to(c.$$('.stg .an > *'), { opacity: 0, duration: .4 }, .1);
          c.fadeUp('.tit .mono', .3, { y: 20 });
          c.words('.tit .title2', c.t('tercera') - .4, { stagger: .07 });
          c.fromTo('.tit .stars', { opacity: 0, scale: .5 }, { opacity: 1, scale: 1, duration: .6, ease: 'back.out(2)' }, c.t('famosas') - .4);
          c.sfx('sparkle', c.t('famosas') - .4, .6);
          c.fadeUp('.tit .sans', c.t('famosas'), { y: 20 });
          c.fadeIn('.cite', c.end - .3);
        }
      }
    ]
  });

  /* ============================== S16 · STRAND ============================== */
  const WW = 1060, WH = Math.round(1060 * 1704 / 2200);
  FD.scene({
    id: 's16', theme: 'light', tr: 'flash', bg: 'grid', ...L3, hudExp: 'Personaje 2',
    html: `
      ${FD.pcard('pc', 200, 100, { n: '02', years: '1890–1976', cut: 'cut_strand.png', name: 'Paul Strand', power: 'Ser el más atrevido', dark: true })}
      ${powerText('pw', 820, 220, 960, 'Ser el más atrevido')}
      <div class="abs icon bolt" style="left:1500px;top:480px;width:200px;height:200px;color:var(--red)">${I.bolt()}</div>
      ${FD.print('ws', 'wallstreet.jpg', 150, 100, WW + 36, WH + 36, '', { np: true })}
      ${loupe('lp', 1440, 560, 190, 'wallstreet.jpg', WW, WH, .5, .9, 2.6)}
      <div class="abs pq" style="left:1310px;top:790px"><span class="badge" style="font-size:32px">personas pequeñitas</span></div>
      <svg class="ov brk" width="1920" height="1080"><path d="M1260 130 H1290 V700 H1260" stroke="var(--red)" stroke-width="8" fill="none"/></svg>
      <div class="abs eg" style="left:1320px;top:150px"><span class="badge r" style="font-size:32px">edificio gigante</span></div>
      <div class="abs ny" style="left:1320px;top:250px;font-family:var(--block);font-size:90px;line-height:.9">1915<br><span style="font-size:40px">Nueva York</span></div>
      <div class="cite" style="right:120px;top:92px">(Strand, 1915; Art Institute of Chicago, 2016c)</div>`,
    steps: [
      { anim(c) { FD.flipCard(c, '.pc', c.t('personaje') - .3); c.fadeIn('.pw .mono', c.t('superpoder') - .2); c.words('.pw .title2', c.t('superpoder') - .1, { stagger: .07 }); c.pop('.bolt', c.t('atrevido') - .2, { scale: .3, sfx: 'hit' }); } },
      {
        anim(c) {
          c.out(['.pc', '.pw', '.bolt'], 0, { x: -80, y: 0, dur: .45, stagger: .04 });
          c.drop('.ws', c.t('foto') - .3, { rot: -1 });
          c.fromTo('.ny', { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: .6 }, c.t('1915') - .1);
          c.to('.ny', { opacity: 0, duration: .3 }, c.t('Mira') - .2);
          const T = c.t('pequeñitas') - .5;
          c.fromTo('.lp', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: .7, ease: 'back.out(1.6)' }, T);
          c.fromTo('.lp img', { scale: .45 }, { scale: 1, duration: 1.2, ease: 'power3.out' }, T);
          c.sfx('whoosh2', T, .5);
          c.pop('.pq', T + .4, { scale: .4, sfx: false });
          c.draw('.brk path', c.t('gigante') - .4, .6, { sfx: 'marker' });
          c.pop('.eg', c.t('gigante') - .2, { scale: .4, sfx: false });
          c.fadeIn('.cite', c.end - .3);
        }
      }
    ]
  });

  /* ============================== S17 · EL LENTE FALSO ============================== */
  FD.scene({
    id: 's17', theme: 'light', tr: 'push', bg: 'dotsK', ...L3, hudExp: 'Dato curioso',
    html: `
      <div class="abs dc" style="left:150px;top:110px"><span class="badge r" style="font-size:36px">★ Dato curioso</span></div>
      <div class="abs icon pers" style="left:170px;top:400px;width:240px;height:240px;color:#2a2927">${I.person()}</div>
      <div class="abs camx" style="left:720px;top:330px;width:520px;height:360px">
        <svg width="520" height="360" viewBox="0 0 520 360" fill="none" stroke="#0c0c0b" stroke-width="7" stroke-linejoin="round">
          <rect x="120" y="70" width="300" height="200" rx="18" fill="#fff"/>
          <rect x="420" y="120" width="60" height="100" rx="8" fill="#fff"/><circle cx="500" cy="170" r="42" fill="#fff"/>
          <rect class="real" x="40" y="130" width="80" height="80" rx="8" fill="#fff" stroke="#d42a1f"/><circle class="real" cx="30" cy="170" r="34" fill="#fff" stroke="#d42a1f"/>
        </svg>
      </div>
      <svg class="ov sl" width="1920" height="1080">
        <path class="s1" d="M1240 500 H1760" stroke="#0c0c0b" stroke-width="6" stroke-dasharray="14 14"/>
        <path class="s2" d="M740 500 H420" stroke="#d42a1f" stroke-width="8" stroke-dasharray="14 14"/>
      </svg>
      <div class="abs lf" style="left:1250px;top:400px"><span class="badge k" style="font-size:32px">Lente falso → apunta aquí</span></div>
      <div class="abs lr" style="left:420px;top:590px"><span class="badge r" style="font-size:32px">← Lente real: ¡toma la foto!</span></div>
      ${FD.print('bw', 'blindwoman.jpg', 1260, 140, 500, 680, 'Paul Strand, Blind Woman, 1916', {})}
      <div class="abs rn" style="left:1300px;top:842px"><span class="badge" style="font-size:30px">retrato natural</span></div>
      <div class="cite" style="right:120px;top:92px">(Department of Photographs, 2004; Strand, 1916)</div>`,
    steps: [
      {
        anim(c) {
          c.pop('.dc', 0, { scale: .4, sfx: 'sparkle' });
          c.pop('.pers', c.t('gente') - .3, { scale: .4 });
          c.fromTo('.camx', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.6)' }, c.t('cámara') - .4);
          c.set(c.$$('.camx .real'), { opacity: 0 }, 0);
          c.draw('.sl .s1', c.t('falso') - .3, .6);
          c.pop('.lf', c.t('falso'), { scale: .4 });
        }
      },
      {
        anim(c) {
          c.to(c.$$('.camx .real'), { opacity: 1, duration: .4 }, c.t('verdadero') - .3);
          c.tl.fromTo(c.$('.camx'), { scale: 1 }, { scale: 1.08, duration: .3, yoyo: true, repeat: 1, immediateRender: false }, c.t('verdadero') - .2);
          c.draw('.sl .s2', c.t('verdadero') - .1, .6);
          c.pop('.lr', c.t('otro') - .2, { scale: .4 });
          c.flash(c.t('otro') + .4, { max: .7 });
          c.out(['.pers', '.camx', '.sl', '.lf', '.lr'], c.t('retratos') - .7, { dur: .4 });
          c.drop('.bw', c.t('retratos') - .4, { rot: 2 });
          c.pop('.rn', c.t('naturales') - .2, { scale: .4, sfx: 'ding' });
          c.fadeIn('.cite', c.end - .3);
        }
      }
    ]
  });

  /* ============================== S18 · BRUTALMENTE DIRECTO ============================== */
  FD.scene({
    id: 's18', theme: 'black', tr: 'negative', ...L3, hudExp: 'Cero trucos',
    html: `
      ${FD.cut('stc', 'cut_stieglitz.png', 140, 300, 420)}
      <div class="bubble bq" style="left:520px;top:150px;width:1200px;font-size:84px;line-height:1">¡Es <span class="red">brutalmente directo</span>!</div>
      <div class="abs bigq ct" style="left:600px;top:470px;font-size:170px;color:#fff">¡Cero trucos!</div>
      ${FD.print('ps', 'porch.jpg', 160, 110, 560, 750, 'Paul Strand, Porch Shadows, 1916', {})}
      <svg class="ov geo" width="1920" height="1080"><path d="M176 126 L704 845 M704 126 L176 845" stroke="#ffc93c" stroke-width="5"/></svg>
      <div class="abs eqg" style="left:820px;top:280px;color:#fff">
        <div class="bigq" style="font-size:110px">Sombras <span style="color:#ffc93c">+</span> formas</div>
        <div class="bigq" style="font-size:140px;color:var(--red2);margin-top:10px">= geometría</div>
      </div>
      <div class="cite" style="right:120px;top:92px">(Stieglitz, 1917, p. 36)</div>`,
    steps: [
      {
        anim(c) {
          c.pop('.stc', 0, { scale: .5 });
          c.pop('.bq', c.t('brutalmente') - .4, { scale: .4, rot: -3, sfx: 'hit' });
          c.shake(c.cam, c.t('brutalmente'), 14);
          c.slam('.ct', c.t('Cero') - .1, { scale: 1.8, sfx: 'boom', vol: .6 });
          c.fadeIn('.cite', c.end - .3);
        }
      },
      {
        anim(c) {
          c.out(['.stc', '.bq', '.ct'], 0, { y: -40, dur: .4 });
          c.fromTo('.ps', { opacity: 0, rotate: 90, scale: .7 }, { opacity: 1, rotate: 0, scale: 1, duration: 1.1, ease: 'power3.inOut' }, .2);
          c.sfx('whoosh2', .2, .6);
          c.draw('.geo path', c.t('formas') - .3, .9);
          c.fadeUp('.eqg', c.t('sombras') - .3, { y: 30 });
          c.sfx('ding', c.t('geométricos'), .5);
        }
      }
    ]
  });

  /* ============================== S19 · WESTON ============================== */
  const torso = `<svg viewBox="0 0 120 200" fill="#cfccc4"><path d="M60 10 C78 10 82 30 74 44 C96 50 106 80 100 110 C96 140 84 160 86 190 H34 C36 160 24 140 20 110 C14 80 24 50 46 44 C38 30 42 10 60 10 Z"/></svg>`;
  FD.scene({
    id: 's19', theme: 'light', tr: 'film', bg: 'grid', ...L3, hudExp: 'Personaje 3',
    html: `
      ${FD.pcard('pc', 200, 100, { n: '03', years: '1886–1958', cut: 'cut_weston.png', name: 'Edward Weston', power: 'Hacer que lo simple se vea increíble' })}
      ${powerText('pw', 820, 200, 980, 'Hacer que lo simple se vea increíble')}
      ${FD.print('o1', 'weston_shell.jpg', 150, 120, 470, 620, 'Concha, 1927', {})}
      ${FD.print('o2', 'weston_cabbage.jpg', 720, 230, 520, 450, 'Hoja de col, 1931', {})}
      ${FD.print('o3', 'weston_pepper.jpg', 1320, 110, 470, 640, 'Pimiento n.º 30, 1930', {})}
      <div class="abs icon tor" style="left:330px;top:220px;width:280px;height:460px;opacity:.9">${torso}</div>
      <div class="abs tq" style="left:300px;top:700px"><span class="badge k" style="font-size:34px">¿una escultura?</span></div>
      <div class="abs tq2" style="left:1460px;top:700px"><span class="badge r" style="font-size:36px">¡Es solo un pimiento!</span></div>
      <div class="abs pn" style="left:1470px;top:200px;font-family:var(--block);font-size:100px;line-height:.9">N.º 30<br><span style="font-size:56px">1930</span></div>
      ${FD.cut('wc', 'cut_weston.png', 140, 330, 520)}
      <div class="note wq" style="left:760px;top:220px;width:980px;padding:50px 60px;transform:rotate(-1.5deg)"><div class="mono" style="font-size:20px;letter-spacing:.3em">Weston decía</div><div class="title2" style="font-size:78px;margin-top:16px">«La cámara debe mostrar la <span class="red">esencia</span> de las cosas»</div></div>
      <div class="cite" style="right:120px;top:92px">(Weston, 1958)</div>`,
    steps: [
      { anim(c) { FD.flipCard(c, '.pc', c.t('personaje') - .3); c.fadeIn('.pw .mono', c.t('superpoder') - .2); c.words('.pw .title2', c.t('superpoder') - .1, { stagger: .06 }); } },
      {
        anim(c) {
          c.out(['.pc', '.pw'], 0, { x: -80, y: 0, dur: .45 });
          c.drop('.o1', c.t('conchas') - .3, { rot: -3 });
          c.drop('.o2', c.t('col') - .3, { rot: 2 });
          c.drop('.o3', c.t('pimientos') - .3, { rot: 3 });
        }
      },
      {
        anim(c) {
          c.out(['.o1', '.o2'], 0, { y: 80, dur: .45 });
          c.to('.o3', { x: -380, y: 0, rotate: 0, scale: 1.12, duration: .9, ease: 'power3.inOut' }, .1);
          c.sfx('whoosh2', .1, .5);
          c.fromTo('.pn', { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: .6 }, c.t('número') - .2);
          c.sfx('pop', c.t('número'), .5);
          c.pop('.tor', c.t('escultura') - .4, { scale: .4 });
          c.pop('.tq', c.t('escultura') - .2, { scale: .4, sfx: false });
          c.to(['.tor', '.tq'], { opacity: 0, x: -60, duration: .4 }, c.t('pimiento', 2) - .5);
          c.pop('.tq2', c.t('pimiento', 2) - .3, { scale: .4, sfx: 'ding' });
        }
      },
      {
        anim(c) {
          c.out(['.o3', '.pn', '.tq2'], 0, { y: 60, dur: .4 });
          c.pop('.wc', .2, { scale: .5 });
          c.drop('.wq', .4, { rot: -1.5 });
          c.fadeIn('.cite', c.end - .3);
        }
      }
    ]
  });

  /* ============================== S20 · GRUPO f/64 (LA BANDA) ============================== */
  const notes = `<svg viewBox="0 0 120 120" fill="currentColor"><path d="M40 20 L100 8 V80 A14 12 0 1 1 90 70 V30 L50 38 V92 A14 12 0 1 1 40 82 Z"/></svg>`;
  FD.scene({
    id: 's20', theme: 'black', tr: 'iris', bg: 'rays', ...L3, hudExp: 'La banda',
    html: `
      <div class="abs poster" style="left:460px;top:100px;width:1000px;height:760px;background:#f1e7cf;color:#161513;box-shadow:0 40px 80px rgba(0,0,0,.6);transform:rotate(-1.5deg);padding:46px 56px;overflow:hidden">
        <div class="mono center" style="font-size:22px;letter-spacing:.5em">San Francisco · 1932</div>
        <div class="bigq center" style="font-size:150px;margin-top:6px;text-transform:none;color:#c2241a">Grupo f/64</div>
        <div class="mono center" style="font-size:22px;letter-spacing:.35em;margin-top:6px">¡En vivo! · Fotografía pura</div>
        <div style="display:flex;justify-content:center;gap:10px;margin-top:22px;height:250px;align-items:flex-end">
          <img src="${img('cut_adams.png')}" style="height:240px"><img src="${img('cut_cunningham.png')}" style="height:230px"><img src="${img('cut_weston.png')}" style="height:240px">
        </div>
        <div class="sans center" style="font-size:30px;font-weight:800;margin-top:14px;line-height:1.35">Ansel Adams · Imogen Cunningham · Edward Weston<br>Willard Van Dyke · Sonya Noskowiak · John Paul Edwards · Henry Swift</div>
      </div>
      <div class="abs icon nt1" style="left:220px;top:240px;width:150px;height:150px;color:#ffc93c">${notes}</div>
      <div class="abs icon nt2" style="left:1560px;top:520px;width:130px;height:130px;color:#ffc93c">${notes}</div>
      <div class="abs bigq f64 center" style="left:0;width:1920px;top:180px;font-size:380px;color:#fff;text-transform:none">f/64</div>
      <div class="abs bigq qm1" style="left:330px;top:200px;font-size:260px;color:var(--red2)">?</div>
      <div class="abs bigq qm2" style="left:1480px;top:280px;font-size:200px;color:#ffc93c">?</div>
      <div class="abs ya" style="left:0;width:1920px;top:640px;text-align:center"><span class="badge" style="font-size:40px">Ya vas a ver por qué…</span></div>
      <div class="cite" style="right:120px;top:92px">(Hostetler, 2004b; Heyman, 1992)</div>`,
    steps: [
      {
        anim(c) {
          c.drop('.poster', c.t('1932') - .1, { rot: -1.5, scale: 1.2, y: -200 });
          c.pop(['.nt1', '.nt2'], c.t('banda') - .3, { scale: .3, stagger: .2 });
          c.tl.to(c.$$('.nt1, .nt2'), { y: -20, rotate: 8, duration: .5, yoyo: true, repeat: 5, ease: 'sine.inOut' }, c.t('banda'));
          c.sfx('sparkle', c.t('banda') - .2, .5);
          c.fadeIn('.cite', c.end - .3);
        }
      },
      {
        anim(c) {
          c.out(['.poster', '.nt1', '.nt2'], 0, { y: -60, dur: .4 });
          c.slam('.f64', c.t('sesenta') - .5, { scale: 2, sfx: 'boom', vol: .6, shake: true });
          c.pop('.qm1', c.t('Raro') - .1, { scale: .3, rot: -30 });
          c.pop('.qm2', c.t('Raro') + .1, { scale: .3, rot: 30 });
          c.tl.to(c.$$('.qm1, .qm2'), { rotate: 10, duration: .3, yoyo: true, repeat: 5, ease: 'sine.inOut' }, c.t('Raro') + .4);
          c.pop('.ya', c.t('vas') - .2, { scale: .4 });
        }
      }
    ]
  });

  /* ============================== S21 · ¿QUÉ ES f/64? (PUPILA) ============================== */
  const eyeBig = `<svg viewBox="0 0 400 240"><path d="M10 120 Q200 -40 390 120 Q200 280 10 120 Z" fill="#fff" stroke="#0c0c0b" stroke-width="10"/><circle cx="200" cy="120" r="78" fill="#6d8fa6" stroke="#0c0c0b" stroke-width="8"/><circle class="pup" cx="200" cy="120" r="40" fill="#0c0c0b"/><circle cx="224" cy="96" r="12" fill="#fff"/></svg>`;
  const scene3 = (cls) => `<svg class="${cls}" viewBox="0 0 900 360" width="900" height="360">
      <rect x="0" y="0" width="900" height="360" rx="24" fill="#2b2a27"/>
      <g class="far"><path d="M520 300 L680 90 L760 190 L820 120 L900 300 Z" fill="#9b9891"/><path d="M680 90 L712 132 L690 142 L664 112 Z" fill="#fff"/></g>
      <g class="mid"><rect x="420" y="190" width="18" height="110" fill="#6b6a65"/><circle cx="429" cy="170" r="56" fill="#55534f"/></g>
      <g class="near"><circle cx="160" cy="250" r="44" fill="#e8402f"/><circle cx="160" cy="250" r="16" fill="#ffc93c"/><rect x="156" y="290" width="8" height="70" fill="#3f7d4a"/></g>
      <rect x="0" y="300" width="900" height="60" fill="#3a3936"/>
    </svg>`;
  FD.scene({
    id: 's21', theme: 'dark', tr: 'ground', bg: 'gridW', ...L3, hudExp: 'f/64 = huequito pequeñito',
    html: `
      <div class="abs eyeb" style="left:170px;top:200px;width:620px;height:372px">${eyeBig}</div>
      <div class="abs ir" style="left:1180px;top:170px;width:440px;height:440px">${I.irisSVG('pp', 440)}</div>
      <div class="abs le1" style="left:300px;top:620px"><span class="badge" style="font-size:36px">Tu ojo: la pupila</span></div>
      <div class="abs le2" style="left:1200px;top:640px"><span class="badge" style="font-size:36px">La cámara: el diafragma</span></div>
      <svg class="ov rays" width="1920" height="1080"><path d="M1000 220 L1360 380 M1000 390 L1360 390 M1000 560 L1360 400" stroke="#ffc93c" stroke-width="6" stroke-dasharray="10 12"/></svg>
      <div class="abs fs" style="left:150px;top:160px;width:1620px;display:flex;justify-content:space-around">
        ${[['f/2', 230], ['f/8', 120], ['f/16', 60]].map(([f, r], i) => `<div class="fsi fi${i}" style="text-align:center"><div style="width:300px;height:300px;margin:0 auto;border-radius:50%;background:#141413;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 12px #3a3936"><div style="width:${r}px;height:${r}px;border-radius:50%;background:#f4f1e9"></div></div><div class="bigq" style="font-size:96px;color:#fff;margin-top:20px;text-transform:none">${f}</div></div>`).join('')}
      </div>
      <div class="abs fsn" style="left:0;width:1920px;top:690px;text-align:center"><span class="badge k" style="font-size:32px;background:#fff;color:#111">Número más grande = huequito más pequeño</span></div>
      <div class="abs dof1" style="left:510px;top:150px">${scene3('s3a')}</div>
      <div class="abs dlab1" style="left:0;width:1920px;top:560px;text-align:center"><span class="badge r" style="font-size:36px">Huequito grande → solo una parte enfocada</span></div>
      <div class="abs ir2" style="left:200px;top:180px;width:260px;height:260px">${I.irisSVG('pp2', 260, false)}</div>
      <div class="abs bigq irl" style="left:240px;top:460px;font-size:80px;color:#fff;text-transform:none">f/2</div>
      <div class="abs dlab2" style="left:0;width:1920px;top:640px;text-align:center"><span class="badge" style="font-size:40px;background:#1f9d55;color:#fff">Huequito pequeñito (f/64) → ¡todo nítido!</span></div>
      <div class="abs stampx st64" style="left:560px;top:280px;color:#ffc93c;font-size:120px;transform:rotate(-5deg)">f/64 = todo nítido</div>
      <div class="abs sub64" style="left:0;width:1920px;top:560px;text-align:center"><span class="badge" style="font-size:36px">De principio a fin: cerca y lejos</span></div>
      <div class="cite" style="right:120px;top:92px">(Hostetler, 2004b)</div>`,
    setup(root) { I.setIris(root.querySelector('.ir svg'), 200, 0); I.setIris(root.querySelector('.ir2 svg'), 240, 0); },
    steps: [
      {
        anim(c) {
          c.fromTo('.ir', { opacity: 0, scale: .6, rotate: -40 }, { opacity: 1, scale: 1, rotate: 0, duration: .8, ease: 'back.out(1.6)' }, c.t('cámara') - .2);
          c.draw(c.$$('.rays path'), c.t('luz') - .3, .7);
          c.sfx('swish', c.t('luz') - .3, .4);
          c.pop('.le2', c.t('luz') + .2, { scale: .4 });
          c.fromTo('.eyeb', { opacity: 0, scale: .6 }, { opacity: 1, scale: 1, duration: .7, ease: 'back.out(1.6)' }, c.t('pupila') - .4);
          c.pop('.le1', c.t('pupila') - .1, { scale: .4 });
          c.tl.fromTo(c.$('.eyeb .pup'), { attr: { r: 40 } }, { attr: { r: 20 }, duration: .6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, c.t('ojo') - .2);
          const svg = c.$('.ir svg'), p = { r: 200 };
          c.tl.fromTo(p, { r: 200 }, { r: 90, duration: .6, yoyo: true, repeat: 1, ease: 'sine.inOut', onUpdate: () => I.setIris(svg, p.r, 0) }, c.t('ojo') - .2);
        }
      },
      {
        anim(c) {
          c.out(['.eyeb', '.ir', '.le1', '.le2', '.rays'], 0, { y: -40, dur: .4 });
          [['dos', 0], ['ocho', 1], ['dieciséis', 2]].forEach(([w, i]) => c.pop('.fi' + i, c.t(w, 1, c.end - 1 + i * .3) - .3, { scale: .3 }));
          c.pop('.fsn', c.end - .2, { scale: .4, sfx: 'ding' });
        }
      },
      {
        anim(c) {
          c.out(['.fs', '.fsn'], 0, { y: -40, dur: .4 });
          c.fromTo('.dof1', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .6 }, .3);
          c.fromTo('.ir2', { opacity: 0, scale: .6 }, { opacity: 1, scale: 1, duration: .5 }, .4);
          c.fadeIn('.irl', .5);
          c.fromTo(c.$$('.dof1 .near, .dof1 .far'), { filter: 'blur(0px)' }, { filter: 'blur(10px)', duration: .9 }, c.t('grande') - .2);
          c.sfx('focus', c.t('grande') - .2, .6);
          c.pop('.dlab1', c.t('enfocada') - .4, { scale: .4 });
        }
      },
      {
        anim(c) {
          c.out('.dlab1', 0, { dur: .3 });
          const svg = c.$('.ir2 svg'), lab = c.$('.irl'), p = { k: 0 };
          const F = ['2', '2.8', '4', '5.6', '8', '11', '16', '22', '32', '45', '64'];
          c.tl.fromTo(p, { k: 0 }, { k: 10, duration: 1.8, ease: 'power2.inOut', onUpdate: () => { I.setIris(svg, 240 * Math.pow(2, -p.k / 2) + 6, p.k * 6); lab.textContent = 'f/' + F[Math.round(p.k)]; } }, c.t('pequeñito') - .3);
          c.sfx('iris', c.t('pequeñito') - .3, .6);
          c.to(c.$$('.dof1 .near, .dof1 .far'), { filter: 'blur(0px)', duration: 1.4, ease: 'power2.inOut' }, c.t('sesenta') - .2);
          c.pop('.dlab2', c.t('nítido') - .3, { scale: .4, sfx: 'ding' });
        }
      },
      {
        anim(c) {
          c.out(['.dof1', '.ir2', '.irl', '.dlab2'], 0, { y: -40, dur: .4 });
          c.stamp('.st64', c.t('llamaron') - .2, { rot: -5, amp: 10 });
          c.pop('.sub64', c.t('principio') - .3, { scale: .4 });
          c.fadeIn('.cite', c.end - .3);
        }
      }
    ]
  });

  /* ============================== S22 · ADAMS ============================== */
  const SL = [['adams2.jpg', 'montañas', 'Montañas'], ['tetons.jpg', 'ríos', 'Ríos'], ['adams3.jpg', 'bosques', 'Bosques']];
  FD.scene({
    id: 's22', theme: 'dark', tr: 'push', bg: 'dots', ...L3, hudExp: 'Personaje 4',
    html: `
      ${SL.map(([s], i) => `<div class="abs sl${i}" style="left:0;top:0;width:1920px;height:1080px"><img src="${img(s)}" style="width:100%;height:100%;object-fit:cover"></div>`).join('')}
      ${SL.map(([, , t], i) => `<div class="abs slt${i}" style="left:150px;top:640px"><span class="badge" style="font-size:52px">${t}</span></div>`).join('')}
      <div class="abs tok" style="left:1360px;top:640px"><span class="badge" style="font-size:44px;background:#1f9d55;color:#fff">✓ Todo enfocado</span></div>
      ${FD.pcard('pc', 200, 100, { n: '04', years: '1902–1984', cut: 'cut_adams.png', name: 'Ansel Adams', power: 'Los paisajes gigantes', dark: true })}
      <div style="color:#fff">${powerText('pw', 820, 240, 960, 'Los paisajes gigantes')}</div>
      <div class="abs mg" style="left:830px;top:560px"><span class="badge k" style="font-size:30px;background:#fff;color:#111">Miembro del grupo f/64</span></div>
      <div class="cite" style="right:120px;top:92px">(National Archives and Records Administration, s. f.)</div>`,
    setup(root) { root.querySelectorAll('.sl0,.sl1,.sl2').forEach(e => e.style.opacity = 0); },
    steps: [
      { anim(c) { FD.flipCard(c, '.pc', c.t('personaje') - .3); c.pop('.mg', c.t('miembro') - .2, { scale: .4 }); c.fadeIn('.pw .mono', c.t('superpoder') - .2); c.words('.pw .title2', c.t('superpoder') - .1, { stagger: .07 }); } },
      {
        anim(c) {
          c.out(['.pc', '.pw', '.mg'], 0, { y: -40, dur: .4 });
          SL.forEach(([, w], i) => {
            const T = c.t(w) - .4;
            c.fromTo('.sl' + i, { opacity: 0, scale: 1.12 }, { opacity: 1, scale: 1, duration: .8, ease: 'power2.out' }, T);
            c.pop('.slt' + i, T + .2, { scale: .4 });
            if (i) c.to('.slt' + (i - 1), { opacity: 0, duration: .2 }, T);
          });
          c.pop('.tok', c.t('enfocado') - .3, { scale: .4, sfx: 'ding' });
          c.fadeIn('.cite', c.end - .3);
        }
      }
    ]
  });

  /* ============================== S23 · LA ESCALERA DE GRISES ============================== */
  const stairs = () => { let s = ''; for (let i = 0; i < 11; i++) { const v = Math.round(255 * Math.pow(i / 10, 1.15)); const x = 150 + i * 146, h = 120 + i * 40; s += `<div class="abs stp st${i}" style="left:${x}px;top:${840 - h}px;width:146px;height:${h}px;background:rgb(${v},${v},${v});border:2px solid rgba(0,0,0,.25)"><div class="bigq" style="position:absolute;left:0;right:0;top:12px;text-align:center;font-size:44px;color:${i < 6 ? '#fff' : '#111'}">${['0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][i]}</div></div>`; } return s; };
  FD.scene({
    id: 's23', theme: 'light', tr: 'zones', bg: 'grid', ...L3, hudExp: 'Sistema de Zonas',
    html: `
      <div class="abs title2 zt center" style="left:0;width:1920px;top:170px;font-size:140px">Sistema de Zonas</div>
      <div class="abs zs center" style="left:0;width:1920px;top:400px"><span class="badge k" style="font-size:40px">Suena difícil…</span></div>
      <div class="abs zs2 center" style="left:0;width:1920px;top:500px"><span class="badge" style="font-size:46px">¡pero es fácil!</span></div>
      <div class="abs stw" style="left:0;top:0;width:1920px;height:1080px">${stairs()}</div>
      <div class="abs sk1" style="left:150px;top:200px"><span class="badge k" style="font-size:32px">Negro</span></div>
      <div class="abs sk2" style="left:1520px;top:200px"><span class="badge k" style="font-size:32px;background:#fff;color:#111">Blanco</span></div>
      ${FD.print('tt', 'tetons.jpg', 200, 140, 620, 500, '', { np: true })}
      <svg class="ov za" width="1920" height="1080"><path class="z1" d="M300 470 C 500 720, 900 780, 1072 728" stroke="#d42a1f" stroke-width="8" fill="none"/><path class="z2" d="M560 292 C 900 150, 1400 300, 1556 592" stroke="#d42a1f" stroke-width="8" fill="none"/></svg>
      <div class="abs zl1" style="left:820px;top:640px"><span class="badge r" style="font-size:30px">Sombras con detalle ✓</span></div>
      <div class="abs zl2" style="left:1220px;top:200px"><span class="badge r" style="font-size:30px">Luces con detalle ✓</span></div>
      <div class="cite" style="right:120px;top:92px">(Adams &amp; Baker, 1981)</div>`,
    steps: [
      {
        anim(c) {
          c.words('.zt', c.t('Sistema') - .3, { stagger: .08 });
          c.pop('.zs', c.t('difícil') - .3, { scale: .4 });
          c.pop('.zs2', c.t('fácil') - .2, { scale: .4, sfx: 'ding' });
        }
      },
      {
        anim(c) {
          c.out(['.zt', '.zs', '.zs2'], 0, { y: -60, dur: .4 });
          for (let i = 0; i < 11; i++) { c.fromTo('.st' + i, { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: .35, ease: 'back.out(2)' }, c.t('escalera') - .2 + i * .1); c.sfx('tick', c.t('escalera') - .2 + i * .1, .35); }
          c.pop('.sk1', c.t('negro') - .2, { scale: .4 });
          c.pop('.sk2', c.t('blanco') - .2, { scale: .4 });
        }
      },
      {
        anim(c) {
          c.to('.stw', { scale: .55, transformOrigin: '1770px 840px', duration: .8, ease: 'power3.inOut' }, 0);
          c.out(['.sk1', '.sk2'], 0, { dur: .3 });
          c.drop('.tt', .3, { rot: -1 });
          c.draw('.za .z1', c.t('sombras') - .4, .6, { sfx: 'marker' });
          c.to('.st2', { y: -30, duration: .4, ease: 'back.out(2)' }, c.t('sombras') - .2);
          c.pop('.zl1', c.t('sombras'), { scale: .4, sfx: 'ding' });
          c.draw('.za .z2', c.t('luces') - .4, .6, { sfx: 'marker' });
          c.to('.st8', { y: -30, duration: .4, ease: 'back.out(2)' }, c.t('luces') - .2);
          c.pop('.zl2', c.t('luces'), { scale: .4, sfx: 'ding' });
          c.fadeIn('.cite', c.end - .3);
        }
      }
    ]
  });

  /* ============================== S24 · PREVISUALIZAR ============================== */
  const cloud = `<svg viewBox="0 0 900 600" preserveAspectRatio="none"><path d="M150 440 C40 440 40 300 150 300 C130 170 300 110 380 190 C430 70 640 80 660 210 C800 180 880 300 800 380 C880 460 780 560 660 500 C600 590 420 590 380 510 C300 580 160 560 150 440 Z" fill="#fff"/><circle cx="130" cy="560" r="34" fill="#fff"/><circle cx="70" cy="600" r="18" fill="#fff"/></svg>`;
  FD.scene({
    id: 's24', theme: 'dark', tr: 'focus', bg: 'spot', ...L3, hudExp: 'Previsualizar',
    html: `
      ${FD.cut('ac', 'cut_adams.png', 110, 360, 470)}
      <div class="abs cl" style="left:560px;top:90px;width:900px;height:600px">${cloud}</div>
      <div class="abs clp" style="left:760px;top:230px;width:520px;height:330px;border-radius:30px;overflow:hidden"><img src="${img('tetons.jpg')}" style="width:100%;height:100%;object-fit:cover;filter:blur(18px)"></div>
      <div class="abs bigq pv" style="left:620px;top:690px;font-size:120px;color:#fff">Previsualizar</div>
      <div class="abs pvs" style="left:1440px;top:700px"><span class="badge" style="font-size:32px">= imaginar la foto antes</span></div>
      <div class="cite" style="right:120px;top:92px">(Adams &amp; Alinder, 1985)</div>`,
    steps: [{
      anim(c) {
        c.pop('.ac', 0, { scale: .5 });
        c.fromTo('.cl', { opacity: 0, scale: .3, transformOrigin: '10% 100%' }, { opacity: 1, scale: 1, duration: .8, ease: 'back.out(1.6)' }, c.t('mental') - .3);
        c.sfx('pop', c.t('mental') - .3, .5);
        c.fromTo('.clp', { opacity: 0 }, { opacity: 1, duration: .5 }, c.t('imaginar') - .2);
        c.to('.clp img', { filter: 'blur(0px)', duration: 1.6, ease: 'power2.inOut' }, c.t('terminada') - .3);
        c.sfx('focus', c.t('terminada') - .3, .6);
        c.slam('.pv', c.t('previsualizar') - .3, { scale: 1.5 });
        c.pop('.pvs', c.t('previsualizar') + .3, { scale: .4, sfx: 'ding' });
        c.fadeIn('.cite', c.end - .3);
      }
    }]
  });

  /* ============================== S25 · CUNNINGHAM ============================== */
  const MW = 960, MH = Math.round(960 * 1427 / 1800);
  FD.scene({
    id: 's25', theme: 'light', tr: 'develop', bg: 'grid', ...L3, hudExp: 'Personaje 5',
    html: `
      ${FD.pcard('pc', 200, 100, { n: '05', years: '1883–1976', cut: 'cut_cunningham.png', name: 'Imogen Cunningham', power: 'Las plantas y las flores' })}
      ${powerText('pw', 820, 240, 960, 'Las plantas y las flores')}
      <div class="abs wm" style="left:830px;top:520px"><span class="badge r" style="font-size:30px">Fotógrafa · la única mujer de los 5</span></div>
      <div class="abs mg" style="left:830px;top:610px"><span class="badge k" style="font-size:30px">También del grupo f/64</span></div>
      ${FD.print('mag', 'cunningham_magnolia.jpg', 150, 80, MW + 36, MH + 36, '', { np: true })}
      ${loupe('lp', 1440, 480, 210, 'cunningham_magnolia.jpg', MW, MH, .52, .46, 3)}
      <div class="abs y25" style="left:1680px;top:160px;font-family:var(--block);font-size:80px;line-height:.9">1925</div>
      <div class="abs tx" style="left:1300px;top:720px"><span class="badge" style="font-size:32px">formas y texturas ✓</span></div>
      <div class="cite" style="right:120px;top:92px">(Cunningham, 1925; The Editors of Encyclopaedia Britannica, s. f.)</div>`,
    steps: [
      { anim(c) { FD.flipCard(c, '.pc', c.t('personaje') - .3); c.pop('.wm', c.t('mujer') - .2, { scale: .4 }); c.pop('.mg', c.t('también') - .2, { scale: .4 }); c.fadeIn('.pw .mono', c.t('superpoder') - .2); c.words('.pw .title2', c.t('superpoder') - .1, { stagger: .07 }); } },
      {
        anim(c) {
          c.out(['.pc', '.pw', '.wm', '.mg'], 0, { x: -80, y: 0, dur: .45 });
          c.develop('.mag img', c.t('magnolia') - .5, 1.6);
          c.fromTo('.mag', { opacity: 0 }, { opacity: 1, duration: .5 }, c.t('magnolia') - .6);
          c.fromTo('.y25', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .5 }, c.t('1925') - .1);
          const T = c.t('formas') - .5;
          c.fromTo('.lp', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: .7, ease: 'back.out(1.6)' }, T);
          c.fromTo('.lp img', { scale: .45 }, { scale: 1, duration: 1.2, ease: 'power3.out' }, T);
          c.sfx('whoosh2', T, .5);
          c.pop('.tx', c.t('texturas') - .2, { scale: .4, sfx: 'ding' });
          c.fadeIn('.cite', c.end - .3);
        }
      }
    ]
  });

  /* ============================== S26 · ¡COLECCIÓN COMPLETA! ============================== */
  const MINI = [['cut_stieglitz.png', 'Stieglitz', 'Stíglitz'], ['cut_strand.png', 'Strand', 'Strand'], ['cut_weston.png', 'Weston', 'Uéston'], ['cut_adams.png', 'Adams', 'Ádams'], ['cut_cunningham.png', 'Cunningham', 'Cániñam']];
  FD.scene({
    id: 's26', theme: 'yellow', tr: 'paper', bg: 'dotsK', ...L3, hudExp: '¡Colección completa!',
    html: `
      <div class="abs bigq cc center" style="left:0;width:1920px;top:100px;font-size:110px;color:var(--red)">¡Colección completa!</div>
      ${MINI.map(([s, n], i) => `<div class="abs mc mc${i}" style="left:${150 + i * 330}px;top:260px;width:300px;height:400px;border-radius:22px;background:#fff;border:8px solid #111;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,.2)">
        <div style="position:absolute;left:0;right:0;top:0;height:250px;background:linear-gradient(160deg,#e8402f,#9e1810);display:flex;justify-content:center;align-items:flex-end;overflow:hidden"><img src="${img(s)}" style="height:240px"></div>
        <div class="bigq" style="position:absolute;left:0;right:0;top:268px;text-align:center;font-size:52px">${n}</div>
        <div class="okc ck${i}" style="left:196px;top:14px;width:84px;height:84px;font-size:50px">✓</div></div>`).join('')}
      <div class="abs rr" style="left:0;width:1920px;top:720px;display:flex;justify-content:center;gap:24px">
        <span class="badge k r1" style="font-size:44px">Nítida</span><span class="badge k r2" style="font-size:44px">Real</span><span class="badge k r3" style="font-size:44px">Sin trucos</span>
      </div>`,
    steps: [
      {
        anim(c) {
          c.slam('.cc', c.t('Colección') - .1, { scale: 1.5, sfx: 'levelup', vol: .6 });
          MINI.forEach(([, , w], i) => { c.fromTo('.mc' + i, { opacity: 0, rotateY: -90, y: 60 }, { opacity: 1, rotateY: 0, y: 0, duration: .6, ease: 'back.out(1.5)' }, c.t(w) - .3); c.sfx('card', c.t(w) - .3, .6); });
          c.set(c.$$('.mc .okc'), { opacity: 0 }, 0);
        }
      },
      {
        anim(c) {
          c.pop('.r1', c.t('nítida') - .2, { scale: .4 });
          c.pop('.r2', c.t('real') - .2, { scale: .4 });
          c.pop('.r3', c.t('trucos') - .3, { scale: .4 });
          MINI.forEach((_, i) => c.fromTo('.ck' + i, { opacity: 0, scale: .2 }, { opacity: 1, scale: 1, duration: .4, ease: 'back.out(3)', immediateRender: false }, c.t('trucos') + .1 + i * .12));
          c.sfx('ding', c.t('trucos') + .1, .6); c.sfx('sparkle', c.t('trucos') + .4, .5);
        }
      }
    ]
  });
})();
