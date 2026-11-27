import { mkdir, writeFile } from 'node:fs/promises';
import { serviceIds, slideIds, solutionsCopy } from './solutions-content.mjs';
import { demoExperience } from './solutions-demo.mjs';

const origin = 'https://graphitygroup.com';
const serviceArt = [0, 1, 2, 2, 0];

function image(t, index, priority = false) {
  return `<img src="/assets/graphity-${slideIds[index]}-hero.webp" alt="${t.slides[index][1]}" width="1440" height="810" ${priority ? 'fetchpriority="high"' : 'loading="lazy"'}>`;
}

function list(items) {
  return `<ul class="sol-checklist">${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
}

function detailLink(context, index) {
  return context.base + serviceIds[index] + '/';
}

function link(text, url, className = 'sol-link') {
  return `<a class="${className}" href="${url}">${text}</a>`;
}

function pageShell(context, title, description, body) {
  const { t, language, arabic, base, current } = context;
  const other = arabic ? 'en' : 'ar';
  const otherRoute = '/solutions/' + other + '/' + current;
  return `<!doctype html>
<html lang="${language}" dir="${arabic ? 'rtl' : 'ltr'}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <meta name="description" content="${description}">
  <meta name="theme-color" content="#0a1827">
  <title>${title}</title>
  <link rel="icon" href="/assets/graphity-mark.png">
  <link rel="stylesheet" href="/assets/site.css">
  <link rel="stylesheet" href="/assets/solutions.css">
  <script defer src="/assets/solutions.js"></script>
</head>
<body class="solutions-page">
  <a href="#main" class="skip-link">${t.skip}</a>
  <header class="sol-header">
    <div class="shell sol-nav-row">
      <a class="wordmark" href="${base}"><img src="/assets/graphity-logo.jpg" width="36" height="36" alt=""><span>${t.brand}</span></a>
      <nav class="sol-nav" aria-label="${t.nav}">
        <details class="sol-menu">
          <summary>${t.services}</summary>
          <div class="sol-menu-panel">
            ${t.service.map(([name, summary], index) => `<a href="${detailLink(context, index)}"><strong>${name}</strong><span>${summary}</span></a>`).join('')}
            <div class="sol-menu-shortcuts">
              ${link(t.industries, base + '#industries')} ${link(t.approach, base + '#approach')}
              ${link(t.work, base + '#capabilities')} ${link(t.insights, base + '#insights')}
            </div>
          </div>
        </details>
        ${link(t.industries, base + '#industries', 'sol-nav-secondary')}
        ${link(t.approach, base + '#approach', 'sol-nav-secondary')}
        ${link(t.work, base + '#capabilities', 'sol-nav-secondary')}
        ${link(t.insights, base + '#insights', 'sol-nav-secondary')}
        <a class="sol-language" href="${otherRoute}" lang="${other}" hreflang="${other}">${t.language}</a>
        ${link(t.contact, context.contact, 'sol-button header-cta')}
      </nav>
    </div>
  </header>
  <main id="main" tabindex="-1">${body}</main>
  <footer class="sol-footer">
    <div class="shell sol-footer-row">
      ${link(t.group, arabic ? '/ar/' : '/')}
      <div>${link(t.all, base + '#solutions')} ${link(t.contact, context.contact)} ${link('info@graphitygroup.com', 'mailto:info@graphitygroup.com')}</div>
    </div>
  </footer>
</body>
</html>`;
}

function tabs(id, label, items, render, options = '', buttonLabel = ([name]) => name) {
  return `<div class="sol-tabs" data-tabs ${options}>
    <div class="sol-tab-controls" hidden>
      <div class="sol-tab-list" aria-label="${label}">
        ${items.map((item, index) => `<button type="button" id="${id}-tab-${index}" data-tab>${buttonLabel(item, index)}</button>`).join('')}
      </div>
    </div>
    <div class="sol-panels">
      ${items.map((item, index) => `<section class="sol-panel" id="${id}-panel-${index}" data-panel>${render(item, index)}</section>`).join('')}
    </div>
  </div>`;
}

function feature(t, heading, description, items, index, action = '', photo = '') {
  return `<div class="sol-feature">
    <div class="sol-feature-content">
      <h3>${heading}</h3><p>${description}</p>
      ${list(items)}
      ${action}
    </div>
    <figure class="sol-feature-media">${photo ? `<img class="sol-service-art" src="/assets/demo/${photo}.webp" alt="" width="360" height="440" loading="lazy">` : image(t, index)}</figure>
  </div>`;
}

function section(id, heading, body, tone = '') {
  return `<section class="sol-section ${tone}" id="${id}">
    <div class="shell"><h2>${heading}</h2>${body}</div>
  </section>`;
}

function faq(items) {
  return `<div class="sol-disclosures">${items.map(([question, answer]) => `<details><summary>${question}</summary><p>${answer}</p></details>`).join('')}</div>`;
}

function closing(context) {
  const { t, contact } = context;
  return `<section class="sol-closing"><div class="shell sol-closing-inner"><div><h2>${t.close}</h2><p>${t.closeText}</p></div>${link(t.contact, contact, 'sol-button')}</div></section>`;
}

function home(context) {
  const { t, base, contact, language } = context;
  const demo = demoExperience(t, language);
  const showcase = tabs('showcase', t.slideTitle, t.slides, ([, , caption], index) => `
    <figure class="sol-slide">
      ${demo.hero(index)}
      <figcaption>${caption}</figcaption>
    </figure>`, `data-rotation="7000" data-pause="${t.pause}" data-play="${t.play}"`);
  const services = tabs('services', t.explorer, t.service, ([title, summary, problem, items], index) => feature(t, title, summary + ' ' + problem, items, serviceArt[index], link(t.serviceDetail, detailLink(context, index), 'sol-button'), demo.servicePhotos[index]));
  const journey = tabs('journey', t.journeyTitle, t.journey, (item, index) => demo.journey(item, index, index === t.journey.length - 1 ? link(t.contact, contact, 'sol-button') : ''), '', ([name], index) => `<time>${demo.d.times[index]}</time><span data-demo-journey-label="${index}">${name}</span>`);
  const filters = `<div class="demo-filters" hidden role="group" aria-label="${demo.d.apps}">${demo.d.filters.map((name,index)=>`<button type="button" data-module-filter="${index}" aria-pressed="${index===0}">${name}</button>`).join('')}</div>`;
  const modules = tabs('modules', demo.d.apps, demo.modules.map(name=>[name]), (item,index)=>demo.module(item,index,link(index<6?t.moduleCta:t.serviceDetail,detailLink(context,index<6?0:2))), '', ([name],index)=>`<span class="sol-icon" aria-hidden="true">${demo.glyphs[index]}</span><span>${name}</span>`);
  const industries = `<p class="sol-section-note">${t.industryNote}</p><div class="sol-industries">${t.sectors.map(([name, challenge, value, index],position) => `<article>${demo.photo(demo.industryPhotos[position])}<h3>${name}</h3><p><strong>${challenge}</strong></p><p>${value}</p>${link(t.service[index][0], detailLink(context, index))}</article>`).join('')}</div>`;
  const delivery = `<ol class="sol-timeline">${t.delivery.map(([title, step, output],index) => `<li><details name="delivery" ${index===0?'open':''}><summary><span class="sol-icon" aria-hidden="true">${demo.glyphs[index]}</span>${title}</summary><p>${step}</p><p><strong>${t.output}</strong> ${output}</p><span class="demo-deliverable">${demo.d.plans[index]}</span></details></li>`).join('')}</ol>`;
  return pageShell(context, t.brand + ' | ' + t.headline.join(' '), t.intro, `
    <section class="sol-hero">
      <div class="shell sol-hero-layout">
        <div class="sol-hero-copy">
          <p class="sol-eyebrow">${t.brand}</p>
          <h1>${t.headline[0]} <strong>${t.headline[1]}</strong></h1>
          <p>${t.intro}</p>
          <div class="sol-actions">${link(t.contact, contact, 'sol-button')} ${link(t.explore, '#solutions', 'sol-button sol-secondary')}</div>
        </div>
        <div class="sol-showcase sol-device-showcase"><p class="sol-demo-badge">${demo.d.demo}</p>${showcase}</div>
      </div>
      <ul class="shell sol-value">${t.value.map(item => `<li>${item}</li>`).join('')}</ul>
    </section>
    ${section('journey', t.journeyTitle, `<p class="sol-section-note">${t.sample}</p>${journey}`, 'sol-tinted')}
    ${section('modules', demo.d.apps, filters + modules)}
    ${section('solutions', demo.d.serviceTitle, demo.cards(base) + services)}
    ${section('industries', t.industryTitle, industries, 'sol-tinted')}
    ${section('approach', t.approachTitle, `<p class="sol-approach">${t.approachText}</p>`, 'sol-dark')}
    ${section('delivery', t.deliveryTitle, delivery)}
    ${section('capabilities', t.proof, `<p class="sol-section-note">${t.proofText}</p><div class="sol-actions">${link(t.journeyTitle, '#journey')} ${link(t.modulesTitle, '#modules')}</div>`, 'sol-tinted')}
    ${section('insights', t.insights, `${faq(t.guides)}<h3 class="sol-faq-title">${t.faq}</h3>${faq(t.common)}`)}
    ${closing(context)}`);
}

function detail(context, index) {
  const { t, base, contact } = context;
  const [title, summary, problem, items, note, approach] = t.service[index];
  return pageShell(context, title + ' | ' + t.brand, summary, `
    <section class="sol-hero sol-detail-hero">
      <div class="shell sol-hero-layout">
        <div class="sol-hero-copy">
          ${link(t.all, base + '#solutions', 'sol-eyebrow')}
          <h1>${title}</h1><p>${summary}</p>
          <div class="sol-actions">${link(t.next, contact, 'sol-button')}</div>
        </div>
        <figure class="sol-showcase sol-detail-art">${image(t, serviceArt[index], true)}<figcaption>${t.media}</figcaption></figure>
      </div>
    </section>
    ${section('challenge', t.challenge, `<p class="sol-approach">${problem}</p>`)}
    ${section('deliverables', t.deliverables, list(items), 'sol-tinted')}
    ${section('approach', t.design, `<p class="sol-approach">${approach}</p>`)}
    ${section('scope', t.detailFaq, `<p class="sol-approach">${note}</p>${faq(t.common)}`, 'sol-tinted')}
    ${closing(context)}`);
}

async function writePage(path, html) {
  await mkdir(path, { recursive: true });
  await writeFile(path + 'index.html', html.replace(/[ \t]+$/gm, ''));
}

for (const language of ['en', 'ar']) {
  const base = '/solutions/' + language + '/';
  const context = {
    base, language, t: solutionsCopy[language], arabic: language === 'ar',
    current: '', contact: origin + '/' + language + '/contact/'
  };
  await writePage('dist' + base, home(context));
  for (const [index, id] of serviceIds.entries()) {
    const current = id + '/';
    await writePage('dist' + base + current, detail({ ...context, current }, index));
  }
}
