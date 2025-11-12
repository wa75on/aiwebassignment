/* Interactions for plea page */
(function(){
  const ready = (fn) => (document.readyState !== 'loading') ? fn() : document.addEventListener('DOMContentLoaded', fn);

  ready(() => {
    // mobile menu
    const burger = document.getElementById('menuToggle');
    const links = document.getElementById('navLinks');
    if (burger && links) {
      burger.addEventListener('click', () => links.classList.toggle('active'));
      links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('active')));
    }

    // reveal on scroll
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
    }, {threshold: 0.1});
    document.querySelectorAll('.fade-in').forEach(el=>obs.observe(el));

    // timeline v2 interactions (hover nodes + reveal image+desc below)
    const stageBtns = document.querySelectorAll('.timeline.v2 .node');
    const stageImg = document.getElementById('stageImg');
    const stageDesc = document.getElementById('stageDesc');

    const showStage = (btn) => {
      const img = btn.getAttribute('data-img');
      const cap = btn.getAttribute('data-caption') || '';
      if (img && stageImg) stageImg.src = img;
      if (stageDesc) stageDesc.textContent = cap;
    };

    stageBtns.forEach(btn => {
      btn.addEventListener('mouseenter', ()=> showStage(btn));
      btn.addEventListener('click', ()=> showStage(btn));
      btn.addEventListener('focus', ()=> showStage(btn));
    });

    // initialize with first stage
    if (stageBtns[0]) showStage(stageBtns[0]);
  });
})();
