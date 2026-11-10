// Interactive pond — ripples follow cursor + ambient
// Renders into a <canvas id="pond-canvas"> full-viewport.

(function () {
  const canvas = document.getElementById('pond-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W = 0, H = 0, DPR = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  // ripple objects
  const ripples = [];
  function spawn(x, y, strength = 1) {
    ripples.push({
      x, y,
      r: 0,
      maxR: 140 + Math.random() * 80,
      life: 0,
      maxLife: 2400 + Math.random() * 600,
      strength,
      born: performance.now(),
    });
    if (ripples.length > 60) ripples.shift();
  }

  // ambient ripples
  setInterval(() => {
    if (document.hidden) return;
    spawn(Math.random() * W, Math.random() * H, 0.35 + Math.random() * 0.3);
  }, 1800);

  let lastMove = 0;
  window.addEventListener('pointermove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (x < 0 || y < 0 || x > W || y > H) return;
    const now = performance.now();
    if (now - lastMove > 110) {
      lastMove = now;
      spawn(x, y, 0.7);
    }
  });

  window.addEventListener('pointerdown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (x < 0 || y < 0 || x > W || y > H) return;
    spawn(x, y, 1.4);
    spawn(x, y, 1.1);
  });

  // floating lily pads / stones (geometric)
  const pads = [];
  for (let i = 0; i < 6; i++) {
    pads.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 18 + Math.random() * 40,
      vx: (Math.random() - 0.5) * 0.06,
      vy: (Math.random() - 0.5) * 0.04,
      phase: Math.random() * Math.PI * 2,
      type: Math.random() > 0.5 ? 'triangle' : 'circle',
    });
  }

  function drawPad(p, t) {
    const wobble = Math.sin(t * 0.0008 + p.phase) * 3;
    ctx.save();
    ctx.translate(p.x, p.y + wobble);
    ctx.globalAlpha = 0.16;
    ctx.fillStyle = '#2A3A3A';
    if (p.type === 'triangle') {
      ctx.beginPath();
      const r = p.r;
      ctx.moveTo(0, -r);
      ctx.lineTo(r * 0.866, r * 0.5);
      ctx.lineTo(-r * 0.866, r * 0.5);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawRipple(rp, t) {
    const elapsed = t - rp.born;
    const k = elapsed / rp.maxLife;
    if (k >= 1) return false;
    const ease = 1 - Math.pow(1 - k, 3);
    const radius = rp.maxR * ease;
    const alpha = (1 - k) * 0.32 * rp.strength;

    ctx.save();
    // outer ring
    ctx.strokeStyle = `rgba(42, 58, 58, ${alpha})`;
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.arc(rp.x, rp.y, radius, 0, Math.PI * 2);
    ctx.stroke();

    // inner softer ring
    if (radius > 20) {
      ctx.strokeStyle = `rgba(107, 135, 132, ${alpha * 0.6})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.arc(rp.x, rp.y, radius * 0.7, 0, Math.PI * 2);
      ctx.stroke();
    }

    // innermost highlight
    if (radius > 40) {
      ctx.strokeStyle = `rgba(180, 196, 188, ${alpha * 0.4})`;
      ctx.lineWidth = 0.4;
      ctx.beginPath();
      ctx.arc(rp.x, rp.y, radius * 0.4, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
    return true;
  }

  // subtle caustic noise
  const noiseCanvas = document.createElement('canvas');
  noiseCanvas.width = 220;
  noiseCanvas.height = 220;
  const nctx = noiseCanvas.getContext('2d');
  const imgData = nctx.createImageData(220, 220);
  for (let i = 0; i < imgData.data.length; i += 4) {
    const v = Math.random() * 255;
    imgData.data[i] = imgData.data[i+1] = imgData.data[i+2] = v;
    imgData.data[i+3] = 6;
  }
  nctx.putImageData(imgData, 0, 0);

  function tick() {
    const t = performance.now();
    // gentle fade — leaves trails of ripples
    ctx.fillStyle = 'rgba(242, 244, 241, 0.08)';
    ctx.fillRect(0, 0, W, H);

    // full repaint base
    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#F2F4F1';
    ctx.globalAlpha = 0.5;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();

    // caustics tile
    ctx.save();
    ctx.globalAlpha = 0.35;
    const offset = (t * 0.01) % 220;
    for (let x = -220; x < W + 220; x += 220) {
      for (let y = -220; y < H + 220; y += 220) {
        ctx.drawImage(noiseCanvas, x + offset * 0.3, y + offset * 0.2);
      }
    }
    ctx.restore();

    // pads
    pads.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -80) p.x = W + 80;
      if (p.x > W + 80) p.x = -80;
      if (p.y < -80) p.y = H + 80;
      if (p.y > H + 80) p.y = -80;
      drawPad(p, t);
    });

    // ripples
    for (let i = ripples.length - 1; i >= 0; i--) {
      const alive = drawRipple(ripples[i], t);
      if (!alive) ripples.splice(i, 1);
    }

    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
