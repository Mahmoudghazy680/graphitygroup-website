for (const group of document.querySelectorAll('[data-tabs]')) {
  const tabs = [...group.querySelectorAll('[data-tab]')];
  const panels = [...group.querySelectorAll('[data-panel]')];
  const controls = group.querySelector('.sol-tab-controls');
  const tabList = group.querySelector('.sol-tab-list');
  const interval = Number(group.dataset.rotation);
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const rtl = document.documentElement.dir === 'rtl';
  let index = 0;
  let timer;
  let paused = false;
  let rotationButton;

  function select(next, focus = false) {
    if (next !== index) group.classList.add('is-changing');
    index = next;
    tabs.forEach((tab, position) => {
      const selected = index === position;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[position].hidden = !selected;
      panels[position].tabIndex = selected ? 0 : -1;
    });
    if (focus) tabs[index].focus();
  }

  function rotation() {
    clearTimeout(timer);
    if (!rotationButton) return;
    const stopped = paused || motion.matches;
    rotationButton.hidden = motion.matches;
    rotationButton.setAttribute('aria-pressed', String(stopped));
    rotationButton.textContent = stopped ? group.dataset.play : group.dataset.pause;
    if (!stopped && !document.hidden) {
      timer = setTimeout(() => {
        select((index + 1) % tabs.length);
        rotation();
      }, interval);
    }
  }

  function activate(next, keyboard = false) {
    if (rotationButton) paused = true;
    select(next, keyboard);
    rotation();
  }

  tabList.setAttribute('role', 'tablist');
  tabs.forEach((tab, position) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panels[position].id);
    panels[position].setAttribute('role', 'tabpanel');
    panels[position].setAttribute('aria-labelledby', tab.id);
    tab.addEventListener('click', () => activate(position));
    tab.addEventListener('keydown', event => {
      const visible = tabs.map((item, i) => item.hidden ? -1 : i).filter(i => i >= 0);
      const current = visible.indexOf(position);
      const last = visible.length;
      const next = {
        ArrowLeft: visible[(current + (rtl ? 1 : last - 1)) % last],
        ArrowRight: visible[(current + (rtl ? last - 1 : 1)) % last],
        Home: visible[0],
        End: visible[last - 1],
      }[event.key];
      if (next === undefined) return;
      event.preventDefault();
      activate(next, true);
    });
  });

  if (interval > 0) {
    rotationButton = document.createElement('button');
    rotationButton.type = 'button';
    rotationButton.className = 'sol-rotation';
    rotationButton.addEventListener('click', () => {
      paused = !paused;
      rotation();
    });
    controls.append(rotationButton);
    document.addEventListener('visibilitychange', rotation);
    motion.addEventListener('change', rotation);
    group.addEventListener('focusin', event => {
      if (event.target === rotationButton || paused) return;
      paused = true;
      rotation();
    });
  }

  select(0);
  controls.hidden = false;
  rotation();

  const filters = group.parentElement.querySelector('.demo-filters');
  if (filters) {
    filters.hidden = false;
    const options = [...filters.querySelectorAll('button')];
    options.forEach((button, filter) => {
      button.addEventListener('click', () => {
        options.forEach(option => option.setAttribute('aria-pressed', String(option === button)));
        tabs.forEach((tab, position) => {
          tab.hidden = (filter === 1 && position >= 6) || (filter === 2 && position < 6);
        });
        if (tabs[index].hidden) activate(tabs.findIndex(tab => !tab.hidden));
      });
    });
  }
}

const menu = document.querySelector('.sol-menu');
const opener = menu.querySelector('summary');
document.addEventListener('pointerdown', event => {
  if (menu.open && !menu.contains(event.target)) menu.open = false;
});
menu.addEventListener('keydown', event => {
  if (menu.open && event.key === 'Escape') {
    menu.open = false;
    opener.focus();
  }
});
menu.addEventListener('click', event => {
  if (event.target.closest('a')) menu.open = false;
});
