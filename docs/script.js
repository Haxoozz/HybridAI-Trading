// Terminal animation
document.addEventListener('DOMContentLoaded', () => {
  const terminal = document.getElementById('terminal');
  const lines = [
    { text: 'Loading 8 backends...', cls: 'term-info', delay: 600 },
    { text: '  ✓ NIM meta/llama-3.3-70b        OK  (1.2s)', cls: 'term-success', delay: 400 },
    { text: '  ✓ NIM deepseek-r1-distill-70b    OK  (0.9s)', cls: 'term-success', delay: 300 },
    { text: '  ✓ NIM qwen2.5-72b-instruct       OK  (1.1s)', cls: 'term-success', delay: 300 },
    { text: '  ✓ NIM mistral-large-2-instruct    OK  (0.8s)', cls: 'term-success', delay: 300 },
    { text: '  ✓ NIM llama-3.1-nemotron-70b      OK  (1.0s)', cls: 'term-success', delay: 300 },
    { text: '  ✓ NIM gemma-2-27b-it              OK  (0.7s)', cls: 'term-success', delay: 300 },
    { text: '  ✓ HF  Qwen/Qwen3-32B             OK  (1.4s)', cls: 'term-success', delay: 300 },
    { text: '  ✓ HF  mistralai/Mistral-Small     OK  (0.6s)', cls: 'term-success', delay: 300 },
    { text: '', cls: '', delay: 200 },
    { text: 'Swarm vote: 6 approve, 2 abstain → CONSENSUS REACHED', cls: 'term-success', delay: 500 },
    { text: 'Oracle confidence: 0.78 (floor=0.60) → PASS', cls: 'term-info', delay: 400 },
    { text: 'ROLock: R:R=2.41, risk=1.8% → PASS', cls: 'term-info', delay: 300 },
    { text: 'OOM-RL: drawdown=3.2% (limit=10%) → PASS', cls: 'term-info', delay: 300 },
    { text: '', cls: '', delay: 200 },
    { text: '8/8 backends healthy. Smoke test PASSED.', cls: 'term-success', delay: 400 },
  ];

  let i = 0;
  function addLine() {
    if (i >= lines.length) return;
    const l = lines[i];
    const div = document.createElement('div');
    div.className = 'term-line ' + l.cls;
    div.textContent = l.text;
    terminal.appendChild(div);
    terminal.scrollTop = terminal.scrollHeight;
    i++;
    setTimeout(addLine, l.delay);
  }
  setTimeout(addLine, 1200);

  // Scroll-reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, idx) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), idx * 60);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.arch-card,.module-card,.safety-card,.result-card,.pipeline-step,.roadmap-item,.api-card,.stack-item').forEach(el => observer.observe(el));

  // Nav scroll effect
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 50 ? 'rgba(10,10,15,.95)' : 'rgba(10,10,15,.8)';
  });

  // Mobile nav toggle
  const toggle = document.getElementById('navToggle');
  const links = document.querySelector('.nav-links');
  if (toggle) {
    toggle.addEventListener('click', () => {
      links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
      links.style.flexDirection = 'column';
      links.style.position = 'absolute';
      links.style.top = '64px';
      links.style.right = '24px';
      links.style.background = 'var(--bg2)';
      links.style.padding = '16px';
      links.style.borderRadius = '12px';
      links.style.border = '1px solid var(--border)';
    });
  }

  // Smooth counter animation for hero stats
  document.querySelectorAll('.stat-value').forEach(el => {
    const target = el.textContent;
    if (/^\d/.test(target) && !target.includes('/')) {
      const num = parseFloat(target);
      const decimals = (target.split('.')[1] || '').length;
      let start = 0;
      const duration = 1500;
      const startTime = performance.now();
      function animate(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = (num * eased).toFixed(decimals);
        if (progress < 1) requestAnimationFrame(animate);
        else el.textContent = target;
      }
      const statObs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          requestAnimationFrame(animate);
          statObs.disconnect();
        }
      });
      statObs.observe(el);
    }
  });
});
