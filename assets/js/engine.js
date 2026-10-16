/* ==========================================================================
   FOTOGRAFÍA DIRECTA — Motor de animación
   Un solo timeline GSAP alimenta las dos salidas:
     · Presentación (flechas → paso a paso, a tu ritmo)
     · Video (render cuadro a cuadro con ?render=1, mismas animaciones)
   ========================================================================== */
(() => {
  'use strict';
  const W = 1920, H = 1080;
  const Q = new URLSearchParams(location.search);
  const RENDER = Q.has('render');
  const FD = window.FD = { W, H, RENDER, scenes: [], tr: {}, steps: [], cues: [], total: 0 };
  if (RENDER) document.body.classList.add('render');

  /* ---------------- utilidades ---------------- */
  const el = FD.el = (tag, cls, html, parent) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    if (parent) parent.appendChild(e);
    return e;
  };
  const NS = 'http://www.w3.org/2000/svg';
  FD.svg = (tag, attrs, parent) => {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs || {}) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  };
  FD.img = n => 'assets/img/' + n;
  FD.scene = d => FD.scenes.push(d);
  function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  FD.rng = s => mulberry32(s);
  const norm = s => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
  FD.norm = norm;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, k) => a + (b - a) * k;
  FD.clamp = clamp; FD.lerp = lerp;

  /* ---------------- partir texto ---------------- */
  FD.split = (root, mode = 'words') => {
    if (root._split && root._split.mode === mode) return root._split.items;
    const out = [];
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const parts = n.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach(p => {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return; }
            if (mode === 'chars') {
              const wsp = document.createElement('span');
              wsp.style.display = 'inline-block'; wsp.style.whiteSpace = 'nowrap';
              [...p].forEach(c => { const s = document.createElement('span'); s.className = 'ch'; s.textContent = c; wsp.appendChild(s); out.push(s); });
              frag.appendChild(wsp);
            } else {
              const w = document.createElement('span'); w.className = 'w';
              const i = document.createElement('i'); i.textContent = p; w.appendChild(i);
              frag.appendChild(w); out.push(i);
            }
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && !n.classList.contains('nosplit') && n.tagName !== 'BR') walk(n);
      });
    };
    walk(root);
    root._split = { mode, items: out };
    return out;
  };

  /* ---------------- contexto de cada paso ---------------- */
  function makeCtx(tl, sc, narr, lead, cues, holds) {
    const root = sc.root;
    const words = (narr.words || []).map(w => ({ t: lead + w.o, d: w.d, n: norm(w.w), w: w.w }));
    // los selectores siempre se resuelven dentro de la escena (nunca globalmente)
    const q = s => {
      if (typeof s === 'string') return [...root.querySelectorAll(s)];
      if (Array.isArray(s) || s instanceof NodeList) return [...s].flatMap(x => typeof x === 'string' ? [...root.querySelectorAll(x)] : (x ? [x] : []));
      return s ? [s] : [];
    };
    const one = s => q(s)[0];
    const c = {
      tl, sc, root, cam: sc.cam, words, lead,
      dur: narr.dur || 0,
      end: lead + (narr.dur || 0),
      $: one, $$: q,
      /* tiempo (s) en que el narrador dice una palabra (n-ésima aparición, desde un índice) */
      t(word, nth = 1, fallback) {
        if (typeof word === 'number') return words[word] ? words[word].t : (fallback ?? 0);
        const nq = norm(word); let k = 0;
        for (const w of words) { if (w.n === nq || (nq.length > 3 && w.n.startsWith(nq))) { if (++k === nth) return w.t; } }
        if (words.length) console.warn('[FD] palabra no encontrada:', word, 'en', sc.id);
        return fallback ?? (words.length ? lead : 0.4);
      },
      sfx(name, at, vol = 1) { cues.push({ name, t: at, vol }); },
      /* tramo que en la presentación sin voz se reproduce a velocidad real (p. ej. cuenta 3-2-1) */
      hold(a, b) { holds.push([a, b]); return c; },
      set(s, v, at = 0) { tl.set(q(s), v, at); return c; },
      to(s, v, at = 0) { tl.to(q(s), v, at); return c; },
      from(s, v, at = 0) { tl.from(q(s), v, at); return c; },
      fromTo(s, a, b, at = 0) { tl.fromTo(q(s), a, b, at); return c; },
      /* revelado de palabras con máscara */
      words(s, at = 0, o = {}) {
        q(s).forEach((e, ix) => {
          const items = FD.split(e, 'words');
          const t0 = at + ix * (o.each ?? 0);
          tl.fromTo(items, { yPercent: o.y ?? 145, rotate: o.rot ?? 0, opacity: o.fade ? 0 : 1 },
            { yPercent: 0, rotate: 0, opacity: 1, duration: o.dur ?? .75, ease: o.ease ?? 'power4.out', stagger: o.stagger ?? .055 }, t0);
          tl.set(items.map(i => i.parentNode), { overflow: 'visible' }, t0 + (o.dur ?? .75) + (o.stagger ?? .055) * items.length);
          if (o.sfx !== false) c.sfx(o.sfx || 'swish', at + ix * (o.each ?? 0), o.vol ?? .45);
        });
        return c;
      },
      /* palabras sincronizadas con la voz del narrador */
      sync(s, o = {}) {
        q(s).forEach(e => {
          const items = FD.split(e, 'words');
          let wi = o.from ?? 0, last = (o.at ?? (words[wi] ? words[wi].t : lead)) - .15;
          items.forEach((it, k) => {
            const nt = norm(it.textContent);
            let tt = null;
            for (let j = wi; j < Math.min(words.length, wi + 6); j++) if (words[j].n === nt || (nt.length > 3 && words[j].n.startsWith(nt.slice(0, 4)))) { tt = words[j].t; wi = j + 1; break; }
            if (tt == null) tt = last + .14;
            last = tt;
            tl.fromTo(it, { yPercent: o.y ?? 145, opacity: o.fade ? 0 : 1 }, { yPercent: 0, opacity: 1, duration: o.dur ?? .55, ease: o.ease ?? 'power3.out' }, Math.max(0, tt + (o.offset ?? -.08)));
          });
        });
        return c;
      },
      chars(s, at = 0, o = {}) {
        q(s).forEach(e => {
          const items = FD.split(e, 'chars');
          tl.fromTo(items, o.from || { opacity: 0, yPercent: 60, rotateX: -80 },
            Object.assign({ opacity: 1, yPercent: 0, rotateX: 0, duration: o.dur ?? .6, ease: o.ease ?? 'back.out(1.6)', stagger: o.stagger ?? .03 }, o.to || {}), at);
          if (o.sfx !== false) c.sfx(o.sfx || 'swish', at, o.vol ?? .4);
        });
        return c;
      },
      /* máquina de escribir */
      type(s, at = 0, o = {}) {
        const cps = o.cps ?? 30;
        q(s).forEach(e => {
          const items = FD.split(e, 'chars');
          const st = 1 / cps;
          tl.fromTo(items, { opacity: 0 }, { opacity: 1, duration: .01, stagger: st, ease: 'none' }, at);
          if (o.sfx !== false) for (let k = 0; k < items.length; k += 3) c.sfx('type', at + k * st, .35);
          at += items.length * st;
        });
        return c;
      },
      fadeUp(s, at = 0, o = {}) {
        tl.fromTo(q(s), { opacity: 0, y: o.y ?? 40 }, { opacity: 1, y: 0, duration: o.dur ?? .8, ease: o.ease ?? 'power3.out', stagger: o.stagger ?? .08 }, at);
        if (o.sfx) c.sfx(o.sfx, at, o.vol ?? .5);
        return c;
      },
      fadeIn(s, at = 0, o = {}) {
        tl.fromTo(q(s), { opacity: 0 }, { opacity: 1, duration: o.dur ?? .8, ease: o.ease ?? 'power2.out', stagger: o.stagger ?? 0 }, at);
        if (o.sfx) c.sfx(o.sfx, at, o.vol ?? .5);
        return c;
      },
      pop(s, at = 0, o = {}) {
        tl.fromTo(q(s), { opacity: 0, scale: o.scale ?? .35, rotate: o.rot ?? -6, y: o.y ?? 30 },
          { opacity: 1, scale: 1, rotate: o.rotTo ?? 0, y: 0, duration: o.dur ?? .75, ease: o.ease ?? 'back.out(1.9)', stagger: o.stagger ?? .09 }, at);
        if (o.sfx !== false) { const n = q(s).length; for (let k = 0; k < Math.min(n, 8); k++) c.sfx(o.sfx || 'pop', at + k * (o.stagger ?? .09), o.vol ?? .55); }
        return c;
      },
      /* copia que cae sobre la mesa */
      drop(s, at = 0, o = {}) {
        q(s).forEach((e, k) => {
          const r = o.rot ?? ((k % 2 ? 1 : -1) * (2 + k));
          tl.fromTo(e, { opacity: 0, scale: o.scale ?? 1.25, rotate: r * 2.2, y: o.y ?? -60 },
            { opacity: 1, scale: 1, rotate: o.rotTo ?? r, y: 0, duration: o.dur ?? .8, ease: o.ease ?? 'power3.out' }, at + k * (o.stagger ?? .14));
          if (o.sfx !== false) c.sfx(o.sfx || 'paper', at + k * (o.stagger ?? .14) + .25, o.vol ?? .7);
        });
        return c;
      },
      /* imagen que "se revela" en la cubeta */
      develop(s, at = 0, dur = 1.8, o = {}) {
        tl.fromTo(q(s), { filter: 'brightness(3.2) contrast(.25) blur(3px)', opacity: o.fade === false ? 1 : .0 },
          { filter: 'brightness(1) contrast(1) blur(0px)', opacity: 1, duration: dur, ease: 'power2.inOut' }, at);
        if (o.sfx !== false) c.sfx('liquid', at, o.vol ?? .45);
        return c;
      },
      /* foco: de borroso a nítido */
      focus(s, at = 0, o = {}) {
        tl.fromTo(q(s), { filter: `blur(${o.blur ?? 22}px)`, opacity: o.fade === false ? 1 : 0, scale: o.scale ?? 1.06 },
          { filter: 'blur(0px)', opacity: 1, scale: 1, duration: o.dur ?? 1.2, ease: o.ease ?? 'power3.out', stagger: o.stagger ?? 0 }, at);
        if (o.sfx !== false) c.sfx(o.sfx || 'focus', at, o.vol ?? .6);
        return c;
      },
      /* trazo svg que se dibuja */
      draw(s, at = 0, dur = .8, o = {}) {
        q(s).forEach((p, k) => {
          let L = 1000; try { L = p.getTotalLength(); } catch (e) { }
          p.style.strokeDasharray = L + ' ' + (L + 2);
          tl.fromTo(p, { opacity: 0 }, { opacity: 1, duration: .01 }, at + k * (o.stagger ?? 0));
          tl.fromTo(p, { strokeDashoffset: L }, { strokeDashoffset: 0, duration: dur, ease: o.ease ?? 'power2.inOut' }, at + k * (o.stagger ?? 0));
          if (o.sfx && k < 6) c.sfx(o.sfx, at + k * (o.stagger ?? 0), o.vol ?? .55);
        });
        return c;
      },
      slam(s, at = 0, o = {}) {
        tl.fromTo(q(s), { opacity: 0, scale: o.scale ?? 1.9, filter: 'blur(14px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', duration: o.dur ?? .45, ease: o.ease ?? 'expo.out', stagger: o.stagger ?? .12 }, at);
        if (o.sfx !== false) { const n = q(s).length; for (let k = 0; k < Math.min(n, 6); k++) c.sfx(o.sfx || 'hit', at + k * (o.stagger ?? .12), o.vol ?? .8); }
        if (o.shake) c.shake(o.shake === true ? c.cam : o.shake, at + .05, o.amp ?? 14);
        return c;
      },
      stamp(s, at = 0, o = {}) {
        tl.fromTo(q(s), { opacity: 0, scale: 2.6, rotate: (o.rot ?? -8) - 10 },
          { opacity: 1, scale: 1, rotate: o.rot ?? -8, duration: .38, ease: 'power4.in' }, at);
        c.sfx('stamp', at + .33, o.vol ?? .9);
        c.shake(o.shake || c.cam, at + .38, o.amp ?? 10);
        return c;
      },
      shake(s, at = 0, amp = 12, dur = .45) {
        const tg = q(s);
        tl.fromTo(tg, { x: 0, y: 0 }, {
          duration: dur, ease: 'none', keyframes: [
            { x: amp, y: -amp * .6 }, { x: -amp * .8, y: amp * .5 }, { x: amp * .5, y: amp * .3 }, { x: -amp * .3, y: -amp * .2 }, { x: 0, y: 0 }]
        , immediateRender: false }, at);
        return c;
      },
      count(s, from, to, at = 0, dur = 1.2, fmt = v => Math.round(v)) {
        q(s).forEach(e => {
          const p = { v: from };
          tl.fromTo(p, { v: from }, { v: to, duration: dur, ease: 'power3.out', onUpdate: () => { e.textContent = fmt(p.v); } }, at);
        });
        c.sfx('tick', at, .4); c.sfx('tick', at + dur * .5, .3);
        return c;
      },
      out(s, at = 0, o = {}) {
        tl.to(q(s), { opacity: 0, y: o.y ?? -30, x: o.x ?? 0, scale: o.scale ?? 1, filter: o.blur ? `blur(${o.blur}px)` : undefined, duration: o.dur ?? .5, ease: o.ease ?? 'power2.in', stagger: o.stagger ?? .03 }, at);
        if (o.sfx) c.sfx(o.sfx, at, o.vol ?? .4);
        return c;
      },
      camTo(v, at = 0, dur = 1.2, ease = 'power3.inOut', sfx = 'whoosh2') {
        tl.to(c.cam, Object.assign({ duration: dur, ease }, v), at);
        if (sfx) c.sfx(sfx, at, .35);
        return c;
      },
      /* destello de cámara dentro de la escena */
      flash(at = 0, o = {}) {
        let f = sc.root.querySelector(':scope > .sflash');
        if (!f) { f = el('div', 'sflash', null, sc.root); Object.assign(f.style, { position: 'absolute', inset: 0, background: '#fff', opacity: 0, pointerEvents: 'none', zIndex: 40 }); }
        tl.fromTo(f, { opacity: 0 }, { opacity: o.max ?? 1, duration: .05, ease: 'none', immediateRender: false }, at);
        tl.to(f, { opacity: 0, duration: o.dur ?? .7, ease: 'power2.out' }, at + .07);
        c.sfx('shutter', at, .9);
        if (o.flashSfx !== false) c.sfx('flash', at - .22, .6);
        return c;
      },
      wait(sec) { tl.set({}, {}, sec); return c; }
    };
    return c;
  }

  /* ---------------- construcción del timeline maestro ---------------- */
  const estimate = txt => txt ? Math.max(1.6, txt.split(/\s+/).length / 2.6) : 0;

  /* subtítulos animados palabra por palabra (sincronizados con la voz) */
  function buildCaptions(master, say, tm, t0) {
    const layer = document.getElementById('cap');
    if (!layer) return;
    const disp = say.replace(/[«»]/g, '').split(/\s+/).filter(Boolean);
    const ws = tm.words || [];
    if (!ws.length) return;
    const nT = ws.length, nD = disp.length;
    const tw = disp.map((_, i) => ws[nT === nD ? i : Math.min(nT - 1, Math.round(i * (nT - 1) / Math.max(1, nD - 1)))].o);
    const chunks = []; let cur = [], len = 0;
    disp.forEach((w, i) => {
      if (cur.length && len + w.length + 1 > 46) { chunks.push(cur); cur = []; len = 0; }
      cur.push(i); len += w.length + 1;
      if (/[.?!…:]$/.test(w) && len > 18 && i < nD - 1) { chunks.push(cur); cur = []; len = 0; }
    });
    if (cur.length) chunks.push(cur);
    const tEndAll = t0 + tm.dur + .3;
    chunks.forEach((ch, k) => {
      const line = el('div', 'capline', null, layer);
      const spans = ch.map(i => { const s = el('span', 'cw', disp[i], line); return s; });
      const a = t0 + tw[ch[0]] - .1, b = k < chunks.length - 1 ? t0 + tw[chunks[k + 1][0]] - .1 : tEndAll;
      master.set(line, { visibility: 'visible' }, Math.max(0, a));
      master.set(line, { visibility: 'hidden' }, b);
      ch.forEach((i, j) => {
        const tt = t0 + tw[i];
        master.set(spans[j], { color: '#ffc93c' }, tt);
        master.set(spans[j], { color: '#ffffff' }, j < ch.length - 1 ? t0 + tw[ch[j + 1]] : Math.min(b, tt + .5));
      });
    });
  }

  FD.build = () => {
    const holder = document.getElementById('scenes');
    FD.scenes.forEach((sc, si) => {
      const root = el('section', 'scene ' + (sc.theme || 'dark'), null, holder);
      root.id = 'sc-' + sc.id;
      root.style.zIndex = si + 1;
      const drift = el('div', 'drift', null, root);
      (sc.bg || '').split(' ').filter(Boolean).forEach(b => el('div', 'bg ' + b, null, drift));
      const cam = el('div', 'cam', null, drift);
      cam.innerHTML = sc.html || '';
      sc.root = root; sc.drift = drift; sc.cam = cam; sc.index = si;
      if (sc.setup) sc.setup(root, cam);
      gsap.set(root, { autoAlpha: 0 });
    });

    const master = FD.master = gsap.timeline({ paused: true });
    const cue = (name, t, vol = 1) => FD.cues.push({ type: 'sfx', name, t, vol });
    let t = 0.4;
    let frameNo = 0;
    FD.scenes.forEach((sc, si) => {
      const tStart = t;
      let trDur = 0;
      if (si === 0) master.set(sc.root, { autoAlpha: 1 }, 0);
      else {
        const fn = FD.tr[sc.tr || 'focus'] || FD.tr.focus;
        trDur = fn(master, FD.scenes[si - 1].root, sc.root, t, cue, sc.trOpt || {}, sc, FD.scenes[si - 1]) || 0;
      }
      sc.tStart = tStart; sc.trDur = trDur;
      if (sc.hud !== false) sc.frameNo = ++frameNo;
      let st = t + trDur * (sc.trOverlap ?? .62);
      const lines = (window.GUION && GUION[sc.id]) || [];
      sc.steps.forEach((step, sj) => {
        const tm = (window.TIMING && TIMING[sc.id] && TIMING[sc.id][sj]) || null;
        const narr = tm || { dur: estimate(lines[sj] && lines[sj].say), words: [] };
        const lead = step.lead ?? .35;
        const tl = gsap.timeline();
        const cues = [], holds = [];
        const c = makeCtx(tl, sc, narr, lead, cues, holds);
        if (step.anim) step.anim(c);
        // si alguna animación quedó antes del inicio del paso, se desplaza todo hacia adelante
        let minStart = 0;
        tl.getChildren(false, true, true).forEach(ch => { if (ch.startTime() < minStart) minStart = ch.startTime(); });
        if (minStart < 0) { tl.getChildren(false, true, true).forEach(ch => ch.startTime(ch.startTime() - minStart)); cues.forEach(k => { k.t -= minStart; }); holds.forEach(h => { h[0] -= minStart; h[1] -= minStart; }); }
        const animDur = tl.duration();
        const slot = Math.max(animDur + (step.after ?? .35), (narr.dur ? lead + narr.dur : 0) + (step.gap ?? (FD.gap ?? .8)), step.min ?? 0);
        master.add(tl, st);
        cues.forEach(k => FD.cues.push({ type: 'sfx', name: k.name, t: st + k.t, vol: k.vol }));
        if (tm && tm.file) FD.cues.push({ type: 'narr', src: tm.file, t: st + lead, dur: tm.dur, text: lines[sj] ? lines[sj].say : '', scene: sc.id, step: sj });
        if (tm && tm.file && lines[sj] && lines[sj].say && sc.captions !== false && step.captions !== false) buildCaptions(master, lines[sj].say, tm, st + lead);
        const say = lines[sj] && lines[sj].say;
        FD.steps.push({ si, sj, from: sj === 0 ? tStart : st, start: st, animEnd: st + animDur, end: st + slot,
          holds: holds.map(h => [st + h[0], st + h[1]]), say: say && sc.captions !== false && step.captions !== false ? say : '' });
        st += slot;
      });
      t = st + (sc.tail ?? .1);
      sc.tEnd = t;
    });
    FD.total = t + (FD.endPad ?? 1.0);
    master.set({}, {}, FD.total);
    FD.frames = frameNo;
    FD.cues.sort((a, b) => a.t - b.t);
    // inicializa todos los tweens en orden cronológico
    master.seek(FD.total, false);
    master.seek(0, false);
    FD.acts = collectActs(master);
  };

  /* ---------------- ritmo de la presentación sin voz ----------------
     En el video, las animaciones esperan a la voz. Al presentar sin voz esa espera deja la lámina
     vacía, así que cada paso se reproduce con el tiempo "comprimido":
       · movimiento principal de cada animación → 1,15×
       · transición entre escenas (decorativa) → 1,7×
       · cola de la animación (el final suave) y animaciones largas → 2,5×
       · tiempo sin ninguna animación → se salta (máx. 0,12 s)
       · tramos marcados con c.hold() (cuenta 3-2-1) → velocidad real
     El timeline es el mismo: el video no cambia. */
  const FAST = { rate: 1.15, tr: 1.7, soft: 2.5, idle: .12, core: .5, long: 2 };
  FD.FAST = FAST;
  function collectActs(master) {
    const acts = [];
    // los tweens sueltos en el maestro son las transiciones; los de cada paso están en sub-timelines
    const walk = (tl, off) => tl.getChildren(false, true, true).forEach(ch => {
      const s = off + ch.startTime();
      if (ch instanceof gsap.core.Timeline) return walk(ch, s);
      const d = ch.totalDuration();
      if (d > 0 && d < 1e3) acts.push([s, s + d, d > FAST.long ? s : s + d * FAST.core, tl === master]);
    });
    walk(master, 0);
    return acts;
  }
  function warpFor(s) {
    if (s._warp) return s._warp;
    const a = s.from, b = s.animEnd + .02;
    const A = FD.acts.filter(x => x[1] > a && x[0] < b), H = s.holds || [];
    const pts = [...new Set([a, b, ...A.flatMap(x => x.slice(0, 3)), ...H.flat()].map(v => clamp(v, a, b)))].sort((x, y) => x - y);
    const seg = [];
    let r = 0, idle0 = null;
    const flushIdle = to => {
      if (idle0 == null) return;
      const rd = Math.min((to - idle0) / FAST.rate, FAST.idle);
      seg.push([idle0, to, r, r + rd]); r += rd; idle0 = null;
    };
    for (let i = 0; i < pts.length - 1; i++) {
      const x = pts[i], y = pts[i + 1];
      if (y - x < 1e-6) continue;
      const m = (x + y) / 2;
      let rate;
      if (H.some(h => h[0] <= m && m < h[1])) rate = 1;
      else if (A.some(t => !t[3] && t[0] <= m && m < t[2])) rate = FAST.rate;
      else if (A.some(t => t[3] && t[0] <= m && m < t[1])) rate = FAST.tr;
      else if (A.some(t => t[0] <= m && m < t[1])) rate = FAST.soft;
      else { if (idle0 == null) idle0 = x; continue; }
      flushIdle(x);
      const rd = (y - x) / rate;
      seg.push([x, y, r, r + rd]); r += rd;
    }
    flushIdle(b);
    return (s._warp = { seg, total: r, to: b });
  }
  function warpTime(w, r) {
    for (const [m0, m1, r0, r1] of w.seg) if (r <= r1) return r1 > r0 ? m0 + (m1 - m0) * clamp((r - r0) / (r1 - r0), 0, 1) : m1;
    return w.to;
  }
  FD.warpFor = warpFor;

  /* ---------------- transiciones temáticas ---------------- */
  const fxRoot = () => document.getElementById('fx');
  const fxDiv = (cls, parent) => { const d = el('div', 'fxlayer ' + (cls || ''), null, parent || fxRoot()); return d; };
  const swap = (tl, a, b, at) => { tl.set(a, { autoAlpha: 0 }, at); tl.set(b, { autoAlpha: 1 }, at); };
  const IR = { immediateRender: false };

  FD.tr.cut = (tl, a, b, t, cue) => { swap(tl, a, b, t); cue('hit', t, .6); return .05; };

  // Enfoque: lo viejo se desenfoca, lo nuevo entra a foco (pictorialismo → directa)
  FD.tr.focus = (tl, a, b, t, cue) => {
    tl.set(b, { visibility: 'visible', opacity: 0 }, t);
    tl.fromTo(a, { filter: 'blur(0px)', scale: 1 }, Object.assign({ filter: 'blur(28px)', scale: 1.07, duration: .75, ease: 'power2.in' }, IR), t);
    tl.fromTo(b, { opacity: 0, filter: 'blur(30px)', scale: 1.14 }, Object.assign({ opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1.05, ease: 'power3.out' }, IR), t + .35);
    tl.set(a, { autoAlpha: 0, filter: 'none', scale: 1 }, t + 1.42);
    tl.set(b, { filter: 'none' }, t + 1.42);
    cue('focus', t + .05, .7); cue('whoosh2', t + .3, .45);
    return 1.42;
  };

  // Diafragma: láminas que cierran y abren
  function irisSVG() {
    const s = FD.svg('svg', { viewBox: '0 0 1920 1080', width: 1920, height: 1080, class: 'fxlayer' }, fxRoot());
    s.style.position = 'absolute'; s.style.left = 0; s.style.top = 0;
    const defs = FD.svg('defs', {}, s);
    const g = FD.svg('linearGradient', { id: 'irisg' + Math.random().toString(36).slice(2, 7), x1: 0, y1: 0, x2: 1, y2: 1 }, defs);
    FD.svg('stop', { offset: '0', 'stop-color': '#2a2a28' }, g);
    FD.svg('stop', { offset: '1', 'stop-color': '#0b0b0a' }, g);
    const polys = [];
    for (let i = 0; i < 9; i++) polys.push(FD.svg('polygon', { fill: `url(#${g.id})`, stroke: '#4a4946', 'stroke-width': 2 }, s));
    s._polys = polys;
    return s;
  }
  function drawIris(s, r, rot) {
    const N = 9, cx = 960, cy = 540, L = 3000, a = r * Math.tan(Math.PI / N) * 1.02;
    s._polys.forEach((p, i) => {
      const th = (rot + i * 360 / N) * Math.PI / 180;
      const nx = Math.cos(th), ny = Math.sin(th), dx = -ny, dy = nx;
      const Tx = cx + nx * r, Ty = cy + ny * r;
      const P1 = [Tx - dx * a, Ty - dy * a], P2 = [Tx + dx * L, Ty + dy * L];
      const P3 = [P2[0] + nx * L, P2[1] + ny * L], P4 = [P1[0] + nx * L, P1[1] + ny * L];
      p.setAttribute('points', [P1, P2, P3, P4].map(v => v[0].toFixed(1) + ',' + v[1].toFixed(1)).join(' '));
    });
  }
  FD.tr.iris = (tl, a, b, t, cue) => {
    const s = irisSVG();
    const p = { r: 1400, rot: 0 };
    const draw = () => drawIris(s, p.r, p.rot);
    tl.set(s, { visibility: 'visible' }, t);
    tl.fromTo(p, { r: 1400, rot: 0 }, Object.assign({ r: 0, rot: 50, duration: .6, ease: 'power3.in', onUpdate: draw }, IR), t);
    swap(tl, a, b, t + .62);
    tl.fromTo(p, { r: 0, rot: 50 }, Object.assign({ r: 1400, rot: 100, duration: .8, ease: 'power3.out', onUpdate: draw }, IR), t + .78);
    tl.set(s, { visibility: 'hidden' }, t + 1.6);
    cue('iris', t, .9); cue('shutter', t + .6, .6);
    return 1.6;
  };

  // Flash de cámara
  FD.tr.flash = (tl, a, b, t, cue) => {
    const f = fxDiv('fx-flash');
    tl.set(f, { visibility: 'visible', opacity: 0 }, t);
    tl.to(f, { opacity: 1, duration: .06, ease: 'none' }, t);
    swap(tl, a, b, t + .1);
    tl.fromTo(b, { filter: 'brightness(2.3) contrast(.8)' }, Object.assign({ filter: 'brightness(1) contrast(1)', duration: 1.0, ease: 'power2.out' }, IR), t + .1);
    tl.to(f, { opacity: 0, duration: .85, ease: 'power2.out' }, t + .14);
    tl.set(f, { visibility: 'hidden' }, t + 1.05);
    tl.set(b, { filter: 'none' }, t + 1.12);
    cue('flash', t - .3, .6); cue('shutter', t, 1);
    return 1.12;
  };

  // Empuje editorial
  FD.tr.push = (tl, a, b, t, cue, o = {}) => {
    const d = o.dir ?? 1;
    tl.set(b, { visibility: 'visible', opacity: 1 }, t);
    tl.fromTo(b, { x: 1920 * d, boxShadow: '0 0 0 rgba(0,0,0,0)' }, Object.assign({ x: 0, boxShadow: `${-60 * d}px 0 90px rgba(0,0,0,.55)`, duration: .95, ease: 'expo.inOut' }, IR), t);
    tl.fromTo(a, { x: 0, filter: 'brightness(1)' }, Object.assign({ x: -650 * d, filter: 'brightness(.45)', duration: .95, ease: 'expo.inOut' }, IR), t);
    tl.set(a, { autoAlpha: 0, x: 0, filter: 'none' }, t + 1.0);
    tl.set(b, { boxShadow: 'none' }, t + 1.0);
    cue('whoosh', t + .12, .8);
    return 1.0;
  };

  // Tira de película: las escenas avanzan como fotogramas
  FD.tr.film = (tl, a, b, t, cue) => {
    const s = .6, fw = 1920 * s, gap = 70, top = (1080 - 1080 * s) / 2;
    const wrap = fxDiv('');
    const mk = y => {
      const band = el('div', '', null, wrap);
      Object.assign(band.style, { position: 'absolute', left: '-200px', width: '2400px', top: y + 'px', height: '64px', background: '#0b0b0a' });
      const holes = el('div', '', null, band);
      Object.assign(holes.style, { position: 'absolute', inset: '16px 0', backgroundImage: 'radial-gradient(ellipse 12px 9px at 50% 50%, #e9e6df 97%, transparent 100%)', backgroundSize: '58px 32px' });
      const tx = el('div', '', 'FOTOGRAFÍA DIRECTA &nbsp;&nbsp;▸ 24 &nbsp;&nbsp;&nbsp; SAFETY FILM 400 &nbsp;&nbsp;&nbsp;▸ 25 &nbsp;&nbsp;&nbsp; FOTOGRAFÍA DIRECTA &nbsp;&nbsp;▸ 26 &nbsp;&nbsp;&nbsp; SAFETY FILM 400 &nbsp;&nbsp;▸ 27', band);
      Object.assign(tx.style, { position: 'absolute', left: '0', top: y < 540 ? '46px' : '2px', font: '600 13px IBM Plex Mono', letterSpacing: '.3em', color: '#ff9b2b', whiteSpace: 'nowrap' });
      return band;
    };
    const b1 = mk(top - 82), b2 = mk(top + 1080 * s + 18);
    const bands = [b1, b2];
    tl.set(wrap, { visibility: 'visible', opacity: 0 }, t);
    tl.fromTo(a, { scale: 1, x: 0 }, Object.assign({ scale: s, duration: .55, ease: 'power3.inOut' }, IR), t);
    tl.to(wrap, { opacity: 1, duration: .3 }, t + .25);
    tl.set(b, { visibility: 'visible', opacity: 1, scale: s, x: fw + gap }, t + .5);
    tl.to(a, { x: -(fw + gap), duration: .75, ease: 'power3.inOut' }, t + .55);
    tl.to(b, { x: 0, duration: .75, ease: 'power3.inOut' }, t + .55);
    tl.fromTo(bands, { x: 0 }, Object.assign({ x: -(fw + gap), duration: .75, ease: 'power3.inOut' }, IR), t + .55);
    tl.to(b, { scale: 1, duration: .6, ease: 'power3.inOut' }, t + 1.32);
    tl.to(wrap, { opacity: 0, duration: .3 }, t + 1.32);
    tl.set(a, { autoAlpha: 0, scale: 1, x: 0 }, t + 1.35);
    tl.set(wrap, { visibility: 'hidden' }, t + 1.95);
    cue('film', t + .5, .9); cue('whoosh2', t + 1.3, .35);
    return 1.95;
  };

  // Escala de zonas (0 → X) que barre la pantalla
  const ROM = ['0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  FD.tr.zones = (tl, a, b, t, cue) => {
    const wrap = fxDiv('');
    const bw = 1920 / 11;
    const bars = ROM.map((r, i) => {
      const v = Math.round(255 * Math.pow(i / 10, 1.15));
      const d = el('div', 'zbar', `<b>${r}</b>`, wrap);
      Object.assign(d.style, { left: (i * bw - .5) + 'px', width: (bw + 1.5) + 'px', background: `rgb(${v},${v},${v - (i < 10 ? 2 : 0)})`, color: i < 6 ? '#e9e6df' : '#111' });
      return d;
    });
    tl.set(wrap, { visibility: 'visible' }, t);
    tl.fromTo(bars, { yPercent: -101 }, Object.assign({ yPercent: 0, duration: .42, ease: 'power3.in', stagger: .035 }, IR), t);
    swap(tl, a, b, t + .8);
    tl.to(bars, { yPercent: 101, duration: .5, ease: 'power3.out', stagger: .035 }, t + .9);
    tl.set(wrap, { visibility: 'hidden' }, t + 1.8);
    ROM.forEach((r, i) => cue('tick', t + .38 + i * .035, .35));
    cue('whoosh2', t + .9, .4);
    return 1.8;
  };

  // Persianas (sombra de ventana)
  FD.tr.blinds = (tl, a, b, t, cue) => {
    const wrap = fxDiv('');
    const n = 9, hh = 1080 / n;
    const sl = [...Array(n)].map((_, i) => {
      const d = el('div', 'blind', null, wrap);
      Object.assign(d.style, { top: (i * hh - .5) + 'px', height: (hh + 1.5) + 'px', background: `linear-gradient(#141413, #070707)` });
      return d;
    });
    tl.set(wrap, { visibility: 'visible' }, t);
    tl.fromTo(sl, { scaleY: 0, transformOrigin: '50% 0%' }, Object.assign({ scaleY: 1, duration: .38, ease: 'power3.in', stagger: .045 }, IR), t);
    swap(tl, a, b, t + .78);
    tl.fromTo(sl, { scaleY: 1, transformOrigin: '50% 100%' }, Object.assign({ scaleY: 0, duration: .45, ease: 'power3.out', stagger: .045 }, IR), t + .82);
    tl.set(wrap, { visibility: 'hidden' }, t + 1.7);
    cue('blinds', t, .8);
    return 1.7;
  };

  // Lupa: círculo de lente que revela
  FD.tr.loupe = (tl, a, b, t, cue, o = {}) => {
    const x = o.x ?? 960, y = o.y ?? 540;
    const ring = el('div', 'lensring fxlayer', null, fxRoot());
    tl.set(b, { visibility: 'visible', opacity: 1, clipPath: `circle(0px at ${x}px ${y}px)` }, t);
    tl.to(b, { clipPath: `circle(1250px at ${x}px ${y}px)`, duration: 1.05, ease: 'power3.inOut' }, t);
    tl.set(ring, { visibility: 'visible', left: x, top: y, width: 0, height: 0, xPercent: -50, yPercent: -50, opacity: 1 }, t);
    tl.to(ring, { width: 2500, height: 2500, duration: 1.05, ease: 'power3.inOut' }, t);
    tl.set(a, { autoAlpha: 0 }, t + 1.06);
    tl.set(b, { clipPath: 'none' }, t + 1.06);
    tl.set(ring, { visibility: 'hidden' }, t + 1.06);
    cue('whoosh', t + .1, .7); cue('click', t, .5);
    return 1.06;
  };

  // Negativo → positivo
  FD.tr.negative = (tl, a, b, t, cue) => {
    tl.fromTo(a, { filter: 'invert(0) contrast(1)' }, Object.assign({ filter: 'invert(1) contrast(1.25)', duration: .14, ease: 'none' }, IR), t);
    swap(tl, a, b, t + .32);
    tl.fromTo(b, { filter: 'invert(1) contrast(1.25) brightness(1)' }, Object.assign({ filter: 'invert(0) contrast(1) brightness(1)', duration: .75, ease: 'power2.inOut' }, IR), t + .32);
    tl.set(a, { filter: 'none' }, t + .33);
    tl.set(b, { filter: 'none' }, t + 1.08);
    cue('zap', t, .7); cue('shutter', t + .3, .5);
    return 1.08;
  };

  // Revelado: todo se vuelve papel blanco y la imagen emerge
  FD.tr.develop = (tl, a, b, t, cue) => {
    const f = fxDiv('fx-white');
    tl.set(f, { visibility: 'visible', opacity: 0 }, t);
    tl.to(f, { opacity: 1, duration: .55, ease: 'power2.in' }, t);
    swap(tl, a, b, t + .56);
    tl.fromTo(b, { filter: 'brightness(2.6) contrast(.3) blur(2px)' }, Object.assign({ filter: 'brightness(1) contrast(1) blur(0px)', duration: 1.5, ease: 'power2.inOut' }, IR), t + .56);
    tl.to(f, { opacity: 0, duration: .5, ease: 'power1.out' }, t + .58);
    tl.set(f, { visibility: 'hidden' }, t + 1.1);
    tl.set(b, { filter: 'none' }, t + 2.07);
    cue('liquid', t, .7);
    return 2.07;
  };

  // Vidrio esmerilado: la imagen llega invertida y gira (cámara de gran formato)
  FD.tr.ground = (tl, a, b, t, cue) => {
    const g = fxDiv('');
    g.innerHTML = '<div class="bg groundglass" style="inset:0"></div><div style="position:absolute;left:50%;top:50%;width:90px;height:90px;margin:-45px 0 0 -45px;border:2px solid rgba(255,255,255,.6);border-radius:50%"></div>';
    tl.set(b, { visibility: 'visible', opacity: 0 }, t);
    tl.to(a, { opacity: 0, scale: .94, duration: .5, ease: 'power2.in' }, t);
    tl.fromTo(b, { opacity: 0, rotate: 180, scale: .82, filter: 'blur(16px) brightness(.8)' }, Object.assign({ opacity: 1, duration: .45, ease: 'power1.out' }, IR), t + .3);
    tl.set(g, { visibility: 'visible', opacity: 0 }, t + .3);
    tl.to(g, { opacity: 1, duration: .3 }, t + .3);
    tl.to(b, { rotate: 0, scale: 1, duration: 1.15, ease: 'power3.inOut' }, t + .8);
    tl.to(b, { filter: 'blur(0px) brightness(1)', duration: .6, ease: 'power2.out' }, t + 1.45);
    tl.to(g, { opacity: 0, duration: .4 }, t + 1.65);
    tl.set(g, { visibility: 'hidden' }, t + 2.05);
    tl.set(a, { autoAlpha: 0, scale: 1, opacity: 0 }, t + .55);
    tl.set(b, { filter: 'none' }, t + 2.06);
    cue('whoosh2', t + .8, .6); cue('focus', t + 1.4, .7);
    return 2.06;
  };

  // Hoja de papel que se desliza sobre la mesa
  FD.tr.paper = (tl, a, b, t, cue) => {
    tl.set(b, { visibility: 'visible', opacity: 1 }, t);
    tl.fromTo(b, { y: 1150, rotate: 5, boxShadow: '0 -30px 80px rgba(0,0,0,.0)' }, Object.assign({ y: 0, rotate: 0, boxShadow: '0 -30px 80px rgba(0,0,0,.45)', duration: 1.0, ease: 'expo.out' }, IR), t);
    tl.fromTo(a, { filter: 'brightness(1)', scale: 1 }, Object.assign({ filter: 'brightness(.55)', scale: .96, duration: .9, ease: 'power2.out' }, IR), t);
    tl.set(a, { autoAlpha: 0, filter: 'none', scale: 1 }, t + 1.0);
    tl.set(b, { boxShadow: 'none' }, t + 1.05);
    cue('paper', t, .9); cue('whoosh', t, .4);
    return 1.05;
  };

  // Barrido rojo de luz de seguridad, con título de acto
  FD.tr.act = (tl, a, b, t, cue, o = {}) => {
    const p = fxDiv('fx-red');
    p.innerHTML = `<div style="position:absolute;left:150px;top:300px;font:400 360px/0.85 Anton;color:#fff;letter-spacing:-.01em">${o.num || ''}</div>
      <div style="position:absolute;left:156px;top:640px;font:600 26px 'IBM Plex Mono';letter-spacing:.35em;color:#fff">${o.kicker || ''}</div>
      <div style="position:absolute;left:150px;top:690px;font:italic 900 128px/0.95 'Bodoni Moda';color:#fff;letter-spacing:-.02em">${o.title || ''}</div>
      <div style="position:absolute;right:140px;bottom:120px;font:600 18px 'IBM Plex Mono';letter-spacing:.3em;color:rgba(255,255,255,.8)">FOTOGRAFÍA DIRECTA</div>`;
    const kids = [...p.children];
    tl.set(p, { visibility: 'visible' }, t);
    tl.fromTo(p, { xPercent: -100 }, Object.assign({ xPercent: 0, duration: .55, ease: 'expo.inOut' }, IR), t);
    tl.fromTo(kids, { x: -160, opacity: 0 }, Object.assign({ x: 0, opacity: 1, duration: .7, ease: 'power4.out', stagger: .07 }, IR), t + .35);
    swap(tl, a, b, t + .56);
    tl.to(kids, { x: 140, opacity: 0, duration: .4, ease: 'power2.in', stagger: .03 }, t + 1.85);
    tl.to(p, { xPercent: 100, duration: .6, ease: 'expo.inOut' }, t + 2.0);
    tl.set(p, { visibility: 'hidden' }, t + 2.62);
    cue('whoosh', t, .9); cue('boom', t + .5, .8); cue('whoosh', t + 2.0, .6);
    return 2.62;
  };

  // Hoja de contactos: alejarse, marcar el cuadro con lápiz rojo, entrar
  FD.tr.contact = (tl, a, b, t, cue, o = {}) => {
    const cols = 5, rows = 4, cw = 316, ch = cw * 9 / 16, gx = 46, gy = 64;
    const sw = cols * cw + (cols - 1) * gx, sh = rows * ch + (rows - 1) * gy;
    const ox = (1920 - sw) / 2, oy = (1080 - sh) / 2;
    const cell = (cx, cy) => ({ x: ox + cx * (cw + gx), y: oy + cy * (ch + gy), w: cw, h: ch });
    const A = cell(o.a?.[0] ?? 1, o.a?.[1] ?? 1), B = cell(o.b?.[0] ?? 2, o.b?.[1] ?? 2);
    const sheet = el('div', 'fxlayer', null, document.getElementById('under'));
    Object.assign(sheet.style, { background: '#0d0d0c', transformOrigin: '0 0' });
    const imgs = o.imgs || [];
    let k = 0;
    for (let r = 0; r < rows; r++) for (let cc = 0; cc < cols; cc++) {
      const C = cell(cc, r);
      const d = el('div', '', null, sheet);
      Object.assign(d.style, { position: 'absolute', left: C.x + 'px', top: C.y + 'px', width: cw + 'px', height: ch + 'px', background: '#1b1b1a', overflow: 'hidden' });
      const isA = C.x === A.x && C.y === A.y, isB = C.x === B.x && C.y === B.y;
      if (!isA && !isB && imgs.length) { const im = el('img', '', null, d); im.src = FD.img(imgs[k++ % imgs.length]); Object.assign(im.style, { width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1) contrast(1.05)' }); }
      const n = el('div', '', `${String(r * cols + cc + 1).padStart(2, '0')} ▸ ${r * cols + cc + 1}A`, sheet);
      Object.assign(n.style, { position: 'absolute', left: C.x + 'px', top: (C.y + ch + 10) + 'px', font: '600 13px IBM Plex Mono', color: '#ff9b2b', letterSpacing: '.18em' });
    }
    const svg = FD.svg('svg', { width: 1920, height: 1080, viewBox: '0 0 1920 1080' }, sheet);
    svg.style.position = 'absolute'; svg.style.left = 0; svg.style.top = 0; svg.style.overflow = 'visible';
    const cx0 = B.x + cw / 2, cy0 = B.y + ch / 2, rx = cw * .66, ry = ch * .78;
    let dpath = '';
    for (let i = 0; i <= 64; i++) { const an = -2.2 + i / 64 * (Math.PI * 2 + .5); const wob = 1 + .04 * Math.sin(i * .7); dpath += (i ? 'L' : 'M') + (cx0 + Math.cos(an) * rx * wob).toFixed(1) + ',' + (cy0 + Math.sin(an) * ry * wob).toFixed(1); }
    const circ = FD.svg('path', { d: dpath, class: 'stroke-red', 'stroke-width': 7 }, svg);
    const L = 2300; circ.style.strokeDasharray = L + ' ' + L;
    const V = { k: 0 };
    const views = [A, { x: 0, y: 0, w: 1920, h: 1080 }, B];
    const apply = () => {
      const k = V.k, seg = k < 1 ? 0 : 1, f = k < 1 ? k : k - 1;
      const P = views[seg], N = views[seg + 1];
      const e = f < .5 ? 4 * f * f * f : 1 - Math.pow(-2 * f + 2, 3) / 2;
      const w = Math.exp(lerp(Math.log(P.w), Math.log(N.w), e));
      const ee = (P.w === N.w) ? e : (P.w - w) / (P.w - N.w);
      const x = lerp(P.x, N.x, ee), y = lerp(P.y, N.y, ee);
      const z = 1920 / w;
      sheet.style.transform = `translate(${-x * z}px,${-y * z}px) scale(${z})`;
      const place = (node, C) => { node.style.transformOrigin = '0 0'; node.style.transform = `translate(${(C.x - x) * z}px,${(C.y - y) * z}px) scale(${C.w / 1920 * z})`; };
      place(a, A); place(b, B);
    };
    tl.set(sheet, { visibility: 'visible' }, t);
    tl.set(b, { visibility: 'visible', opacity: 1 }, t);
    tl.fromTo(V, { k: 0 }, Object.assign({ k: 1, duration: .95, ease: 'none', onUpdate: apply }, IR), t);
    tl.fromTo(circ, { strokeDashoffset: L }, Object.assign({ strokeDashoffset: 0, duration: .55, ease: 'power2.inOut' }, IR), t + 1.0);
    tl.fromTo(V, { k: 1 }, Object.assign({ k: 2, duration: 1.0, ease: 'none', onUpdate: apply }, IR), t + 1.6);
    tl.set(a, { autoAlpha: 0, transform: 'none' }, t + 2.62);
    tl.set(b, { transform: 'none' }, t + 2.62);
    tl.set(sheet, { visibility: 'hidden' }, t + 2.62);
    cue('whoosh2', t, .6); cue('marker', t + 1.0, .8); cue('whoosh', t + 1.6, .7);
    return 2.62;
  };

  /* ---------------- HUD de visor ---------------- */
  let hud;
  function buildHUD() {
    hud = document.getElementById('hud');
    hud.innerHTML = `<div class="corner c1"></div><div class="corner c2"></div><div class="corner c3"></div><div class="corner c4"></div>
      <div class="t tl"><span class="dot"></span><span class="act"></span></div>
      <div class="t tr"><span class="fr"></span></div>
      <div class="lv"><span class="lvt">Nivel</span><i></i><i></i><i></i><i></i><i></i></div>
      <div class="t bl"><span class="exp"></span></div>
      <div class="t br">Taller de Fotografía · Poli</div>
      <div class="meter"><div class="ticks"></div><div class="scale"><span>-2</span><span>-1</span><span>0</span><span>+1</span><span>+2</span></div><div class="needle"></div></div>`;
    hud._act = hud.querySelector('.act'); hud._fr = hud.querySelector('.fr'); hud._exp = hud.querySelector('.exp'); hud._needle = hud.querySelector('.needle');
    hud._last = -1; hud._lv = hud.querySelector('.lv'); hud._pips = [...hud._lv.querySelectorAll('i')];
  }
  function activeScene(t) {
    let k = 0;
    for (let i = 0; i < FD.scenes.length; i++) if (FD.scenes[i].tStart <= t) k = i;
    return k;
  }
  FD.hudAt = t => {
    if (!hud) return;
    const i = activeScene(t), sc = FD.scenes[i], prev = FD.scenes[Math.max(0, i - 1)];
    const k = clamp((t - sc.tStart) / Math.max(.3, sc.trDur || .3), 0, 1);
    const op = lerp(prev.hud === false ? 0 : 1, sc.hud === false ? 0 : 1, i === 0 ? 1 : k);
    hud.style.opacity = op.toFixed(3);
    const evp = (prev.hudEv ?? 0), evc = (sc.hudEv ?? 0);
    const ev = lerp(evp, evc, i === 0 ? 1 : k) + Math.sin(t * 1.7) * .06;
    hud._needle.style.left = (50 + clamp(ev, -2, 2) * 25) + '%';
    if (hud._last !== i) {
      hud._last = i;
      hud._act.textContent = sc.act || 'Fotografía directa';
      hud._fr.textContent = sc.frameNo ? `Fotograma ${String(sc.frameNo).padStart(2, '0')} / ${String(FD.frames).padStart(2, '0')}` : '';
      hud._exp.textContent = sc.hudExp || 'f/64 · 1/125 s · ISO 100';
      const lv = sc.level || 0;
      hud._lv.style.visibility = lv ? 'visible' : 'hidden';
      hud._pips.forEach((p, j) => p.classList.toggle('on', j < lv));
    }
  };

  /* ---------------- grano de película (determinista) ---------------- */
  let gctx, gframes = [], gcan;
  function buildGrain() {
    gcan = document.getElementById('grain');
    gcan.width = 960; gcan.height = 540;
    gcan.style.width = '1920px'; gcan.style.height = '1080px';
    gctx = gcan.getContext('2d');
    const r = FD.rng(1839);
    for (let f = 0; f < 8; f++) {
      const id = gctx.createImageData(960, 540), d = id.data;
      for (let i = 0; i < d.length; i += 4) { const v = (r() * 255 + r() * 255) / 2 | 0; d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255; }
      gframes.push(id);
    }
  }
  let lastG = -1;
  FD.grainAt = frame => { const g = Math.floor(frame / 1.25) % 8; if (g !== lastG && gctx) { gctx.putImageData(gframes[g], 0, 0); lastG = g; } };

  /* ---------------- ambiente (movimiento continuo y determinista) ---------------- */
  FD.ambientAt = (getLocal) => {
    FD.scenes.forEach((sc, i) => {
      if (sc.root.style.visibility === 'hidden') return;
      const lt = getLocal(sc, i);
      if (sc.drift && sc.drift !== false && sc.noDrift !== true) {
        const s = 1.012 + .012 * Math.sin(lt * .11 + i);
        gsap.set(sc.drift, { scale: s, x: Math.sin(lt * .07 + i * 2) * 10, y: Math.cos(lt * .06 + i) * 6 });
      }
      if (sc.ambient) sc.ambient(lt, sc);
    });
  };

  FD.renderAt = t => {
    FD.master.seek(t, false);
    FD.ambientAt(sc => t - sc.tStart);
    FD.hudAt(t);
    FD.grainAt(Math.round(t * 30));
  };

  /* ---------------- audio (presentación) ---------------- */
  const AUD = FD.aud = { sfx: true, narr: false, cache: {}, live: [], narrEl: null };
  AUD.play = (src, vol = 1) => {
    if (RENDER) return null;
    let base = AUD.cache[src];
    if (!base) { base = AUD.cache[src] = new Audio(src); base.preload = 'auto'; }
    const a = base.cloneNode();
    a.volume = clamp(vol, 0, 1);
    a.play().catch(() => { });
    AUD.live.push(a);
    a.onended = () => { AUD.live = AUD.live.filter(x => x !== a); };
    return a;
  };
  AUD.stopNarr = () => { if (AUD.narrEl) { AUD.narrEl.pause(); AUD.narrEl = null; } };
  AUD.fire = (t0, t1) => {
    if (t1 <= t0) return;
    for (const q of FD.cues) {
      if (q.t <= t0 || q.t > t1) continue;
      if (q.type === 'sfx' && AUD.sfx) AUD.play('assets/audio/sfx/' + q.name + '.mp3', q.vol * .8);
      if (q.type === 'narr' && AUD.narr) { AUD.stopNarr(); AUD.narrEl = AUD.play(q.src, 1); if (AUD.narrEl && P.mode !== 'video') AUD.narrEl.playbackRate = FAST.rate; }
    }
  };

  /* ---------------- presentación interactiva ---------------- */
  const P = FD.P = { k: -1, mode: 'idle', tween: null, enter: {}, lastScene: -1 };
  let lastT = 0;
  function playStep(s) {
    if (P.tween) P.tween.kill();
    const from = s.from, to = s.animEnd + .02;
    FD.master.seek(from, false);
    lastT = from;
    const tick = () => { const ct = FD.master.time(); AUD.fire(lastT, ct); lastT = ct; };
    if (AUD.narr) {
      // con la voz del narrador: el mismo ritmo del video, a 1,15×
      P.tween = gsap.to(FD.master, { time: to, duration: Math.max(.01, (to - from) / FAST.rate), ease: 'none', onUpdate: tick, onComplete: () => { P.tween = null; } });
    } else {
      // sin voz: tiempo comprimido (ver FAST)
      const w = warpFor(s), pr = { r: 0 };
      P.tween = gsap.to(pr, { r: w.total, duration: Math.max(.01, w.total), ease: 'none', onUpdate: () => { FD.master.time(warpTime(w, pr.r)); tick(); }, onComplete: () => { P.tween = null; } });
    }
  }
  P.next = () => {
    if (P.mode === 'video') { const n = FD.steps.findIndex(s => s.from > FD.master.time() + .05); if (n >= 0) seekVideo(FD.steps[n].from); return; }
    if (P.tween && P.tween.isActive()) { P.tween.progress(1); return; }
    if (P.k >= FD.steps.length - 1) return;
    P.k++;
    const s = FD.steps[P.k];
    AUD.stopNarr();
    playStep(s);
    ui();
  };
  P.prev = () => {
    if (P.mode === 'video') { const t = FD.master.time(); let n = -1; FD.steps.forEach((s, i) => { if (s.from < t - 1) n = i; }); seekVideo(n >= 0 ? FD.steps[n].from : 0); return; }
    if (P.tween) { P.tween.kill(); P.tween = null; }
    AUD.stopNarr();
    P.k = Math.max(-1, P.k - 1);
    FD.master.seek(P.k < 0 ? 0 : FD.steps[P.k].animEnd + .02, false);
    ui();
  };
  P.go = k => {
    if (P.tween) { P.tween.kill(); P.tween = null; }
    AUD.stopNarr();
    P.k = clamp(k, -1, FD.steps.length - 1);
    FD.master.seek(P.k < 0 ? 0 : FD.steps[P.k].animEnd + .02, false);
    ui();
  };

  /* modo video dentro del HTML: el audio mezclado es el reloj */
  let mix, vclock = null;
  function seekVideo(t) {
    if (mix && !mix.error && mix.readyState > 0) mix.currentTime = t; else if (vclock) vclock.t0 = performance.now() / 1000 - t;
    FD.master.seek(t, false); lastT = t;
  }
  P.startVideo = () => {
    P.mode = 'video';
    if (P.tween) { P.tween.kill(); P.tween = null; }
    mix = document.getElementById('mix');
    const startT = Math.max(0, P.k >= 0 ? FD.steps[P.k].from : 0);
    const useClock = () => { vclock = { t0: performance.now() / 1000 - startT, paused: false }; };
    if (mix && mix.getAttribute('src')) {
      mix.currentTime = startT;
      mix.play().catch(() => useClock());
      mix.onerror = () => useClock();
    } else useClock();
    staticCap();
    toast('Modo video · Espacio: pausa · ← → saltar · Esc: salir');
  };
  P.stopVideo = () => {
    if (mix) mix.pause();
    vclock = null;
    P.mode = 'present';
    const t = FD.master.time();
    let n = -1; FD.steps.forEach((s, i) => { if (s.from <= t) n = i; });
    P.go(n);
    toast('Modo presentación');
  };
  P.togglePause = () => {
    if (P.mode !== 'video') return;
    if (vclock) { if (vclock.paused) { vclock.t0 = performance.now() / 1000 - vclock.pt; vclock.paused = false; } else { vclock.pt = FD.master.time(); vclock.paused = true; } return; }
    if (mix.paused) mix.play(); else mix.pause();
  };

  function loop() {
    const now = performance.now() / 1000;
    if (P.mode === 'video') {
      let t;
      if (vclock) { t = vclock.paused ? vclock.pt : now - vclock.t0; const pt = FD.master.time(); FD.master.seek(t, false); AUD.fire(pt, t); }
      else { t = mix.currentTime; FD.master.seek(t, false); }
      if (t >= FD.total - .05) P.stopVideo();
    }
    const mt = FD.master.time();
    const ai = activeScene(mt);
    if (ai !== P.lastScene) { P.enter[ai] = now - (mt - FD.scenes[ai].tStart); P.lastScene = ai; }
    if (P.mode === 'video') FD.ambientAt(sc => mt - sc.tStart);
    else FD.ambientAt((sc, i) => (i === ai ? now - P.enter[ai] : mt - sc.tStart));
    FD.hudAt(mt);
    FD.grainAt(Math.round(now * 30));
    uiBar(mt);
    requestAnimationFrame(loop);
  }

  /* ---------------- UI ---------------- */
  let uiEl, toastT;
  function toast(msg) { const t = uiEl.querySelector('.toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 2200); }
  FD.toast = toast;
  function ui() { if (!uiEl) return; uiEl.querySelector('.pos').textContent = `${Math.max(0, P.k + 1)} / ${FD.steps.length}`; staticCap(); }
  /* sin voz, los subtítulos palabra a palabra se adelantarían: se muestra la frase completa del paso */
  function staticCap() {
    const fast = P.mode === 'present' && !AUD.narr;
    document.body.classList.toggle('fastcap', fast);
    const box = FD.capS;
    if (!box) return;
    const s = FD.steps[P.k], txt = fast && s ? s.say : '';
    if (box.textContent === txt) return;
    box.textContent = txt;
    box.classList.remove('on');
    if (txt) { void box.offsetWidth; box.classList.add('on'); }
  }
  function uiBar(t) { if (uiEl) uiEl.querySelector('.bar i').style.width = (100 * t / FD.total).toFixed(2) + '%'; }
  function fit() {
    const s = Math.min(innerWidth / W, innerHeight / H);
    document.getElementById('stage').style.transform = `translate(${(innerWidth - W * s) / 2}px,${(innerHeight - H * s) / 2}px) scale(${s})`;
  }

  function setupUI() {
    uiEl = document.getElementById('ui');
    uiEl.innerHTML = '<div class="bar"><i></i></div><div class="pos"></div><div class="toast"></div>';
    FD.capS = el('div', 'caps', null, document.getElementById('cap'));
    const st = document.getElementById('start');
    const cbN = st.querySelector('#optNarr'), cbS = st.querySelector('#optSfx');
    const begin = (video) => {
      AUD.narr = cbN.checked; AUD.sfx = cbS.checked;
      const cbC = st.querySelector('#optCap'); if (cbC && !cbC.checked) document.getElementById('cap').classList.add('off');
      st.style.display = 'none';
      try { if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => { }); } catch (e) { }
      P.mode = 'present';
      if (video) { P.k = -1; P.startVideo(); }
      else setTimeout(() => P.next(), 350);
    };
    st.querySelector('.b1').onclick = () => begin(true);
    st.querySelector('.b2').onclick = () => begin(false);
    addEventListener('keydown', e => {
      if (st.style.display !== 'none') { if (e.key === 'Enter') begin(false); return; }
      const k = e.key;
      if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(k)) { e.preventDefault(); if (k === ' ' && P.mode === 'video') P.togglePause(); else P.next(); }
      else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(k)) { e.preventDefault(); P.prev(); }
      else if (k === 'Home') P.go(-1);
      else if (k === 'End') P.go(FD.steps.length - 1);
      else if (k === 'n' || k === 'N') { AUD.narr = !AUD.narr; if (!AUD.narr) AUD.stopNarr(); staticCap(); toast('Narración: ' + (AUD.narr ? 'activada (ritmo de la voz, 1,15×)' : 'desactivada (animaciones rápidas)')); }
      else if (k === 's' || k === 'S') { AUD.sfx = !AUD.sfx; toast('Efectos de sonido: ' + (AUD.sfx ? 'activados' : 'desactivados')); }
      else if (k === 'c' || k === 'C') { const cp = document.getElementById('cap'); cp.classList.toggle('off'); toast('Subtítulos: ' + (cp.classList.contains('off') ? 'ocultos' : 'visibles')); }
      else if (k === 'v' || k === 'V') { if (P.mode === 'video') P.stopVideo(); else P.startVideo(); }
      else if (k === 'Escape' && P.mode === 'video') P.stopVideo();
      else if (k === 'f' || k === 'F') { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen().catch(() => { }); }
      else if (k === 'h' || k === 'H' || k === '?') document.getElementById('help').classList.toggle('on');
      else if (k === 'r' || k === 'R') { const sc = FD.scenes[activeScene(FD.master.time())]; const first = FD.steps.findIndex(s => s.si === sc.index); P.go(first - 1); P.next(); }
    });
    document.getElementById('stage').addEventListener('click', () => { if (st.style.display === 'none') P.next(); });
    addEventListener('contextmenu', e => { if (st.style.display === 'none') { e.preventDefault(); P.prev(); } });
    let mt; addEventListener('mousemove', () => { document.body.classList.remove('hidecursor'); clearTimeout(mt); mt = setTimeout(() => document.body.classList.add('hidecursor'), 1800); });
  }

  /* ---------------- arranque ---------------- */
  FD.boot = async () => {
    buildHUD();
    buildGrain();
    FD.build();
    const imgs = [...document.querySelectorAll('#stage img')];
    // fuerza la carga de todas las variantes tipográficas (incluidos acentos) antes de mostrar/renderizar
    const probe = 'ÁÉÍÓÚÑáéíóúñü¿¡«»—–·…“”0123456789 Aa';
    try {
      await Promise.all([
        'italic 900 80px "Bodoni Moda"', 'italic 500 80px "Bodoni Moda"', 'normal 800 80px "Bodoni Moda"', 'italic 600 80px "Bodoni Moda"',
        '400 80px "Anton"', '300 40px "Inter"', '400 40px "Inter"', '600 40px "Inter"', '700 40px "Inter"',
        '500 20px "IBM Plex Mono"', '700 20px "IBM Plex Mono"', '400 20px "IBM Plex Mono"', '600 20px "IBM Plex Mono"'
      ].map(f => document.fonts.load(f, probe)));
      await document.fonts.ready;
    } catch (e) { }
    await Promise.all(imgs.map(i => i.decode ? i.decode().catch(() => { }) : Promise.resolve()));
    // segundo build de cachés de fuentes: re-inicializar timeline tras cargar fuentes
    FD.master.seek(FD.total, false); FD.master.seek(0, false);
    if (RENDER) {
      W && (document.getElementById('stage').style.transform = 'none');
      FD.renderAt(0);
      window.FD_API = {
        total: FD.total,
        cues: FD.cues,
        steps: FD.steps,
        scenes: FD.scenes.map(s => ({ id: s.id, tStart: s.tStart, tEnd: s.tEnd, title: s.title || '' })),
        seek: t => FD.renderAt(t)
      };
      window.FD_READY = true;
      return;
    }
    fit(); addEventListener('resize', fit);
    setupUI();
    FD.renderAt(0);
    ui();
    requestAnimationFrame(loop);
  };
})();
