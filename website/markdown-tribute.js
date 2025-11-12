/* Markdown Supremacy interactions — no libraries */

// Mobile menu
afterDOM(() => {
  const burger = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  if (burger && links) {
    burger.addEventListener('click', () => links.classList.toggle('active'));
    document.querySelectorAll('.nav-link').forEach(a => a.addEventListener('click', () => links.classList.remove('active')));
  }
});

// Typing effect
afterDOM(() => {
  const el = document.querySelector('.type');
  if (!el) return;
  const text = el.dataset.type || el.textContent.trim();
  el.textContent = '';
  let i = 0;
  const speed = 50; // ms
  const typer = setInterval(() => {
    el.textContent = text.slice(0, i++);
    if (i > text.length) clearInterval(typer);
  }, speed);
});

// Scroll progress
window.addEventListener('scroll', () => {
  const d = document.documentElement;
  const scrolled = (d.scrollTop) / (d.scrollHeight - d.clientHeight) * 100;
  const bar = document.getElementById('scrollProgress');
  if (bar) bar.style.width = scrolled + '%';
});

// Reveal on scroll
afterDOM(() => {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
});

// Tiny Markdown parser (subset)
afterDOM(() => {
  const input = document.getElementById('mdInput');
  const preview = document.getElementById('mdPreview');
  if (!input || !preview) return;

  const escapeHtml = (s) => s.replace(/[&<>\"]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  const md = (txt) => {
    // normalize newlines
    txt = txt.replace(/\r\n?/g, '\n');

    // escape html early
    txt = escapeHtml(txt);

    // code blocks ```
    txt = txt.replace(/```([\s\S]*?)```/g, (m, code) => `<pre class="code"><code>${code}</code></pre>`);

    // headings ###### to #
    txt = txt.replace(/^######\s+(.+)$/gm, '<h6>$1</h6>')
             .replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>')
             .replace(/^####\s+(.+)$/gm, '<h4>$1</h4>')
             .replace(/^###\s+(.+)$/gm, '<h3>$1</h3>')
             .replace(/^##\s+(.+)$/gm, '<h2>$1</h2>')
             .replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');

    // blockquote
    txt = txt.replace(/^>\s?(.+)$/gm, '<blockquote>$1</blockquote>');

    // lists (unordered)
    // group consecutive list items into a single ul
    txt = txt.replace(/(?:^|\n)([-*+]\s.+(?:\n[-*+]\s.+)*)/g, (m) => {
      const items = m.trim().split(/\n/).map(li => li.replace(/^[-*+]\s+/, '').trim());
      return `\n<ul>` + items.map(i => `<li>${i}</li>`).join('') + `</ul>`;
    });

    // links [text](url)
    txt = txt.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

    // inline code `code`
    txt = txt.replace(/`([^`]+)`/g, '<code>$1</code>');

    // bold / italics
    txt = txt.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
             .replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // paragraphs (wrap loose lines)
    txt = txt.split(/\n{2,}/).map(block => {
      if (/^\s*<\/?(h\d|ul|pre|blockquote)/.test(block)) return block; // already block-level
      return '<p>' + block.replace(/\n/g, '<br>') + '</p>';
    }).join('\n');

    return txt;
  };

  const render = () => { preview.innerHTML = md(input.value); };
  input.addEventListener('input', render);
  render();
});

// Minimal helper
function afterDOM(fn){ if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }

// Form mock
afterDOM(() => {
  const form = document.getElementById('miniForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Your Markdown confession has been logged. Welcome to the plaintext party.');
    form.reset();
  });
});
