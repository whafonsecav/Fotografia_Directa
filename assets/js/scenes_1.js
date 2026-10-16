/* ==========================================================================
   ESCENAS 01–03 · Gancho (reto), portada y mapa de niveles
   ========================================================================== */
(() => {
  const I = FD.icons, img = FD.img;

  /* ============================== S01 · GANCHO: ¿CUÁL ES LA REAL? ============================== */
  const PA = { x: 170, y: 250, w: 720, h: 600 }, PB = { x: 1030, y: 250, w: 720, h: 600 };
  FD.scene({
    id: 's01', theme: 'black', hud: false, bg: 'spot',
    html: `
      <div class="abs bigq q center" style="left:0;width:1920px;top:70px;font-size:128px;color:#fff">¿Cuál es la foto <span class="red">real</span>?</div>
      ${FD.print('pa', 'tetons_filtro.jpg', PA.x, PA.y, PA.w, PA.h, '', { np: true, style: 'transform:rotate(-2deg)' })}
      ${FD.print('pb', 'tetons.jpg', PB.x, PB.y, PB.w, PB.h, '', { np: true, style: 'transform:rotate(2deg)' })}
      <div class="abs bigq la" style="left:${PA.x - 30}px;top:${PA.y - 40}px;width:120px;height:120px;border-radius:50%;background:#fff;color:#111;font-size:84px;display:flex;align-items:center;justify-content:center">A</div>
      <div class="abs bigq lb" style="left:${PB.x - 30}px;top:${PB.y - 40}px;width:120px;height:120px;border-radius:50%;background:#fff;color:#111;font-size:84px;display:flex;align-items:center;justify-content:center">B</div>
      ${FD.cdownHTML('cd', 810, 400)}
      <div class="abs stampx same" style="left:640px;top:90px;color:#ffc93c;transform:rotate(-4deg);font-size:80px">¡Misma foto!</div>
      <div class="abs sa" style="left:${PA.x + 120}px;top:${PA.y + PA.h + 10}px"><span class="badge r" style="font-size:34px">✕ &nbsp;Con filtro</span></div>
      <div class="abs sb" style="left:${PB.x + 80}px;top:${PB.y + PB.h + 10}px"><span class="badge" style="font-size:34px;background:#1f9d55;color:#fff">✓ &nbsp;Fotografía directa</span></div>
      <div class="abs lv5" style="left:0;width:1920px;top:250px;display:flex;justify-content:center;gap:40px">
        ${[1, 2, 3, 4, 5].map(k => `<div class="mapnode m${k}" style="position:relative;margin:0;left:auto;top:auto;width:170px;height:170px;font-size:96px">${k}</div>`).join('')}
      </div>
      <div class="abs mono l5t center" style="left:0;width:1920px;top:470px;font-size:34px;letter-spacing:.5em;color:#fff;font-weight:700">5 niveles</div>
      <div class="abs bigq listo center" style="left:0;width:1920px;top:560px;font-size:220px;color:var(--red2)">¿Listo?</div>`,
    steps: [
      {
        lead: .15,
        anim(c) {
          c.flash(0, { max: .9, flashSfx: false });
          c.slam('.q', c.t('Rápido') - .05, { scale: 1.8, sfx: 'hit', vol: .7 });
          c.drop('.pa', c.t('Cuál') - .1, { rot: -2, scale: 1.3 });
          c.drop('.pb', c.t('Cuál') + .15, { rot: 2, scale: 1.3 });
          c.pop(['.la', '.lb'], c.t('fotos') - .1, { scale: .2, stagger: .2 });
        }
      },
      {
        lead: .1, min: 5,
        anim(c) {
          FD.countdown(c, '.cd', c.end + .1);
          c.tl.to(['.pa', '.pb'], { scale: 1.03, duration: .5, yoyo: true, repeat: 5, ease: 'sine.inOut' }, c.end + .1);
        }
      },
      {
        anim(c) {
          c.out('.q', 0, { y: -60, dur: .4 });
          const T = c.t('misma') - .6;
          c.to('.pa', { x: 430, rotate: 0, duration: .8, ease: 'power3.inOut' }, T);
          c.to('.pb', { x: -430, rotate: 0, duration: .8, ease: 'power3.inOut' }, T);
          c.to(['.la', '.lb'], { opacity: 0, duration: .3 }, T);
          c.sfx('whoosh', T, .6);
          c.stamp('.same', c.t('foto') - .1, { rot: -4, amp: 10 });
        }
      },
      {
        anim(c) {
          c.out('.same', 0, { dur: .3 });
          c.to('.pa', { x: 0, rotate: -2, duration: .7, ease: 'power3.inOut' }, 0);
          c.to('.pb', { x: 0, rotate: 2, duration: .7, ease: 'power3.inOut' }, 0);
          c.sfx('whoosh2', 0, .5);
          c.pop('.sa', c.t('filtro') - .1, { scale: .4, sfx: false }); c.sfx('wrong', c.t('filtro'), .5);
          c.to('.pa', { opacity: .55, duration: .5 }, c.t('filtro') + .1);
          c.pop('.sb', c.t('fotografía') - .1, { scale: .4, sfx: false }); c.sfx('ding', c.t('directa'), .7);
          c.to('.pb', { scale: 1.06, duration: .6, ease: 'back.out(2)' }, c.t('directa'));
        }
      },
      {
        anim(c) {
          c.out(['.pa', '.pb', '.sa', '.sb'], 0, { y: 80, dur: .5, stagger: .04 });
          c.$$('.lv5 .mapnode').forEach((n, i) => c.fromTo(n, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: .45, ease: 'back.out(2.5)' }, c.t('cinco') - .2 + i * .12));
          c.$$('.lv5 .mapnode').forEach((n, i) => c.sfx('tick', c.t('cinco') - .2 + i * .12, .4));
          c.fadeIn('.l5t', c.t('niveles'));
          c.slam('.listo', c.t('Listo') - .05, { scale: 2, sfx: 'levelup', vol: .8, shake: true });
        }
      }
    ]
  });

  /* ============================== S02 · PORTADA ============================== */
  const COVER_IMGS = ['steerage.jpg', 'blindwoman.jpg', 'tetons.jpg', 'weston_pepper.jpg', 'wallstreet.jpg', 'porch.jpg', 'cunningham_magnolia.jpg', 'weston_shell.jpg'];
  FD.scene({
    id: 's02', theme: 'dark', hud: false, tr: 'iris', bg: 'gridW',
    html: `
      <div class="vstrip" style="left:1400px;top:0;height:4700px;transform:rotate(4deg);transform-origin:50% 0">${FD.vstrip(COVER_IMGS, 8)}</div>
      <img class="abs logo" src="${img('logo_poli_w.png')}" style="left:150px;top:100px;width:230px">
      <div class="abs kicker k1" style="left:154px;top:285px;color:#b8b5ad">Taller de Fotografía &nbsp;·&nbsp; Exposición</div>
      <div class="abs block t1" style="left:140px;top:320px;font-size:236px;color:#f4f2ec;letter-spacing:.012em">FOTOGRAFÍA</div>
      <div class="abs disp t2" style="left:170px;top:505px;font-size:290px;color:#fff">directa<span class="red">.</span></div>
      <div class="abs sub" style="left:156px;top:790px"><span class="badge" style="font-size:30px">La foto tal como es</span></div>
      <div class="abs cred" style="left:156px;top:870px;width:1150px;color:#e9e6df">
        <div style="position:absolute;left:0;top:0;width:290px"><div class="mono c1" style="font-size:15px;color:#ff5a4c;letter-spacing:.24em">Docente</div><div class="sans c2" style="font-size:24px;font-weight:600;margin-top:6px">Cristian Fuentes</div></div>
        <div style="position:absolute;left:290px;top:0;width:470px"><div class="mono c1" style="font-size:15px;color:#ff5a4c;letter-spacing:.24em">Presentan</div><div class="sans c2" style="font-size:24px;font-weight:600;margin-top:6px;line-height:1.3"><span class="nm">William Fonseca</span> · <span class="nm">Mariana Silva</span><br><span class="nm">Karen Montoya</span> · <span class="nm">Paula Gutiérrez</span></div></div>
        <div style="position:absolute;left:790px;top:0;width:360px"><div class="mono c1" style="font-size:15px;color:#ff5a4c;letter-spacing:.24em">Sede Bogotá</div><div class="sans c2" style="font-size:20px;font-weight:500;margin-top:6px;line-height:1.35;color:#cfccc4">Nocturna presencial · Sábados AM<br>Politécnico Grancolombiano</div></div>
      </div>`,
    ambient(t, sc) { gsap.set(sc.root.querySelector('.vstrip'), { y: -((t * 26) % (290 * 8)) - 40 }); },
    steps: [
      {
        anim(c) {
          c.fromTo('.vstrip', { xPercent: 120 }, { xPercent: 0, duration: 1.6, ease: 'expo.out' }, 0);
          c.sfx('film', .1, .8);
          c.fadeIn('.logo', .2, { dur: 1 });
          c.type('.k1', .4, { cps: 40 });
          c.chars('.t1', .2, { from: { opacity: 0, filter: 'blur(18px)', yPercent: 0, rotateX: 0, scale: 1.3 }, to: { filter: 'blur(0px)', scale: 1 }, stagger: .045, dur: .9, ease: 'power3.out', sfx: 'swish' });
          c.focus('.t2', c.t('directa') - .2, { blur: 45, dur: 1.6, scale: 1.1, vol: .9 });
          c.pop('.sub', c.t('foto') - .2, { scale: .5 });
        }
      },
      {
        captions: false,
        anim(c) {
          c.fadeUp(c.$$('.cred .c1'), 0, { y: 14, stagger: .12 });
          const nm = c.$$('.cred .nm');
          ['William', 'Mariana', 'Karen', 'Paula'].forEach((n, i) => c.fromTo(nm[i], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .6, ease: 'power3.out' }, c.t(n) - .1));
          const c2 = c.$$('.cred .c2');
          c.fromTo(c2[0], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .6 }, c.t('Cristian') - .1);
          c.fromTo(c2[2], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .6 }, c.t('Politécnico') - .1);
          c.sfx('click', c.t('Cristian'), .5);
        }
      }
    ]
  });

  /* ============================== S03 · MAPA DE NIVELES ============================== */
  const NODES = [[260, 680, '¿Qué es?', 'uno'], [620, 470, '¿Cómo nació?', 'dos'], [980, 680, 'Los protagonistas', 'tres'], [1340, 470, '¿Cómo se hace?', 'cuatro'], [1680, 680, '¿Cómo reconocerla?', 'cinco']];
  const pathD = 'M120 790 C 200 790, 200 680, 260 680 S 520 470, 620 470 S 880 680, 980 680 S 1240 470, 1340 470 S 1600 680, 1680 680 S 1820 600, 1840 560';
  FD.scene({
    id: 's03', theme: 'light', tr: 'paper', bg: 'grid', hud: false,
    html: `
      <div class="abs title2 mt center" style="left:0;width:1920px;top:110px;font-size:120px">Nuestro mapa</div>
      <svg class="ov mp" width="1920" height="1080"><path class="road" d="${pathD}" fill="none" stroke="#0c0c0b" stroke-width="10" stroke-dasharray="2 26" stroke-linecap="round"/></svg>
      ${NODES.map(([x, y, t], i) => `<div class="mapnode n${i}" style="left:${x}px;top:${y}px">${i + 1}</div><div class="maplab ml${i}" style="left:${x}px;top:${y > 560 ? y + 90 : y - 150}px">${t}</div>`).join('')}
      <div class="icon flag" style="left:1790px;top:460px;width:90px;height:110px;color:var(--red)">${FD.icons.check()}</div>`,
    steps: [
      { anim(c) { c.words('.mt', 0, { stagger: .1 }); c.draw('.mp .road', .3, 1.8); c.sfx('whoosh2', .3, .5); } },
      {
        anim(c) {
          NODES.forEach(([, , , w], i) => {
            const T = c.t(w) - .15;
            c.fromTo('.n' + i, { scale: 0 }, { scale: 1, duration: .5, ease: 'back.out(2.5)' }, T);
            c.fromTo('.ml' + i, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .5, ease: 'power3.out' }, T + .15);
            c.sfx('pop', T, .5);
          });
          c.pop('.flag', c.end - .3, { scale: .3, sfx: 'ding' });
        }
      }
    ]
  });
})();
