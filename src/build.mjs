import { mkdir, writeFile } from 'node:fs/promises';

const origin = 'https://graphitygroup.com';
const email = 'info@graphitygroup.com';
const copy = {
  en: {
    skip: 'Skip to content', contact: 'Contact', intro: 'Skip intro', replay: 'Replay intro', lang: 'العربية',
    title: 'Where creativity meets technology', titleLead: 'Where creativity', titleAccent: 'meets tech.', groupDescription: 'Two specialist divisions. Find the right team for your next project.',
    studio: 'Graphity Studio', solutions: 'Graphity Solutions', studioTag: 'Brand & design', solutionsTag: 'Business technology',
    studioOfferings: ['Brand identity', 'Graphic design', 'Digital campaigns'],
    solutionsOfferings: ['ERP & custom software', 'Integrations & DevOps', 'IT infrastructure'],
    topics: ['Brand identity', 'Campaigns', 'ERP', 'Integrations', 'DevOps'],
    topicLabel: 'Explore services',
    studioCta: 'Explore Studio', solutionsCta: 'Explore Solutions', group: 'Graphity Group',
    studioTitle: 'Design what people remember', studioIntro: 'Make your brand recognizable wherever people encounter it. We design visual identities, marketing materials and digital campaigns.',
    servicesTitle: 'What we design', processTitle: 'How we work', process: ['Discover', 'Concept', 'Refine', 'Deliver'],
    services: [
      ['Brand identity', 'Logo systems, typography, color and guidelines that keep your brand consistent.'],
      ['Graphic design', 'Presentations, brochures, packaging and print materials built around a clear brief.'],
      ['Digital creative', 'Campaign visuals, social templates and launch assets designed for your channels.'],
    ],
    portfolio: 'Portfolio coming soon', portfolioText: 'Selected projects will appear here after publication approval.',
    brief: 'Start a project', briefText: 'Tell us what you’re launching, which deliverables you need and when you need them.',
    emailCta: 'Email your brief', emailSubject: 'Graphity Studio project brief', whatsapp: 'Discuss on WhatsApp', whatsappText: 'Hello Graphity Studio, I’d like to discuss a design project.',
    concept: 'Studio visual concept',
  },
  ar: {
    skip: 'انتقل إلى المحتوى', contact: 'تواصل معنا', intro: 'تخطَّ المقدمة', replay: 'أعد تشغيل المقدمة', lang: 'English',
    title: 'حيث يلتقي الإبداع بالتقنية', titleLead: 'حيث يلتقي الإبداع', titleAccent: 'بالتقنية.', groupDescription: 'قسمان متخصصان. اختر الفريق المناسب لمشروعك القادم.',
    studio: 'جرافيتي ستوديو', solutions: 'جرافيتي سوليوشنز', studioTag: 'الهوية والتصميم', solutionsTag: 'تقنيات الأعمال',
    studioOfferings: ['الهوية البصرية', 'التصميم الجرافيكي', 'الحملات الرقمية'],
    solutionsOfferings: ['أنظمة ERP وبرمجيات مخصصة', 'تكامل الأنظمة وDevOps', 'البنية التحتية لتقنية المعلومات'],
    topics: ['الهوية البصرية', 'الحملات الرقمية', 'أنظمة ERP', 'تكامل الأنظمة', 'DevOps'],
    topicLabel: 'استكشف الخدمات',
    studioCta: 'استكشف الاستوديو', solutionsCta: 'استكشف الحلول', group: 'جرافيتي جروب',
    studioTitle: 'تصميم يبقى في الذاكرة', studioIntro: 'نصمّم هويات بصرية ومواد تسويقية وحملات رقمية تساعد جمهورك على التعرّف على علامتك أينما ظهرت.',
    servicesTitle: 'خدمات التصميم', processTitle: 'كيف نعمل', process: ['نفهم المشروع', 'نطوّر الأفكار', 'نراجع ونحسّن', 'نسلّم الملفات'],
    services: [
      ['الهوية البصرية', 'أنظمة شعارات وخطوط وألوان وأدلة استخدام تحافظ على اتساق هويتك.'],
      ['التصميم الجرافيكي', 'عروض تقديمية وكتيبات وتغليف ومطبوعات مصمّمة وفق أهداف مشروعك.'],
      ['التصميم الرقمي', 'مواد للحملات وقوالب للتواصل الاجتماعي وأصول بصرية ملائمة لقنواتك الرقمية.'],
    ],
    portfolio: 'أعمالنا قريباً', portfolioText: 'نعرض هنا نماذج من أعمالنا بعد الحصول على موافقة النشر.',
    brief: 'ابدأ مشروعك', briefText: 'أخبرنا عن مشروعك والمخرجات المطلوبة والموعد الذي تستهدفه.',
    emailCta: 'أرسل تفاصيل مشروعك', emailSubject: 'طلب مشروع من جرافيتي ستوديو', whatsapp: 'تواصل عبر واتساب', whatsappText: 'مرحباً جرافيتي ستوديو، أودّ مناقشة مشروع تصميم.',
    concept: 'تصوّر بصري للاستوديو',
  },
};

function artwork(division) {
  return `<img class="art-image" src="/assets/${division}-art.webp" width="768" height="1024" alt="" fetchpriority="high">`;
}

const studioServiceIds = ['brand-identity', 'graphic-design', 'digital-creative'];

function divisionCard({ division, link, title, offerings, action }) {
  return `<a class="division ${division}-card" href="${link}">
    <div class="division-copy">
      <h2>${title}</h2>
      <ul class="division-offerings">${offerings.map(item => `<li>${item}</li>`).join('')}</ul>
      <span class="division-cta">${action}</span>
    </div>
    <div class="division-art">${artwork(division)}</div>
  </a>`;
}

function serviceNavigation(t, studioPath, solutionsPath) {
  const routes = [
    ['studio', studioPath + '#brand-identity'],
    ['studio', studioPath + '#digital-creative'],
    ['solutions', solutionsPath + 'erp/'],
    ['solutions', solutionsPath + 'integrations/'],
    ['solutions', solutionsPath + 'devops-cloud/'],
  ];
  return `<nav class="service-topics" aria-label="${t.topicLabel}">
    ${routes.map(([division, url], i) => `<a data-division="${division}" href="${url}">${t.topics[i]}</a>`).join('')}
  </nav>`;
}

function page(language, studio) {
  const t = copy[language];
  const arabic = language === 'ar';
  const other = arabic ? 'en' : 'ar';
  const groupPath = arabic ? '/ar/' : '/';
  const studioPath = '/studio/' + language + '/';
  const otherPath = studio ? '/studio/' + other + '/' : arabic ? '/' : '/ar/';
  const consultation = origin + '/' + language + '/contact/';
  const solutionsPath = '/solutions/' + language + '/';
  const title = studio ? t.studio : t.group;
  return `<!doctype html>
<html lang="${language}" dir="${arabic ? 'rtl' : 'ltr'}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <meta name="description" content="${studio ? t.studioIntro : t.groupDescription}">
  <meta name="theme-color" content="#101015">
  <title>${title} | ${studio ? t.studioTag : t.title}</title>
  <link rel="icon" href="/assets/graphity-mark.png">
  <link rel="stylesheet" href="/assets/site.css">
  ${studio ? '' : '<link rel="stylesheet" href="/assets/gateway.css"><script src="/assets/gateway.js" defer></script>'}
</head>
<body class="${studio ? 'studio-page' : 'gateway'}">
  <a class="skip-link" href="#main">${t.skip}</a>
  <header class="shell site-header">
    <a class="wordmark" href="${groupPath}" aria-label="${t.group}"><img src="/assets/graphity-logo.jpg" width="36" height="36" alt=""><span>${t.group}</span></a>
    <nav class="header-nav" aria-label="${arabic ? 'التنقل الرئيسي' : 'Main navigation'}">
      <a class="language-link" lang="${other}" hreflang="${other}" href="${otherPath}">${t.lang}</a>
      <a class="header-contact" href="${studio ? '#brief' : consultation}">${t.contact}</a>
    </nav>
  </header>
  ${studio ? `<main class="shell studio-main" id="main" tabindex="-1">
    <section class="studio-hero">
      <div>
        <p class="kicker">${t.studio}</p>
        <h1>${t.studioTitle}</h1>
        <p class="section-lede">${t.studioIntro}</p>
        <a class="button" href="#brief">${t.brief}</a>
      </div>
      <figure class="studio-figure">${artwork('studio')}<figcaption>${t.concept}</figcaption></figure>
    </section>
    <section class="studio-section" aria-labelledby="services">
      <h2 id="services">${t.servicesTitle}</h2>
      <div class="service-grid">${t.services.map(([heading, detail], i) => `<article id="${studioServiceIds[i]}"><h3>${heading}</h3><p>${detail}</p></article>`).join('')}</div>
    </section>
    <section class="studio-section">
      <h2>${t.processTitle}</h2>
      <ol class="process">${t.process.map(step => `<li>${step}</li>`).join('')}</ol>
    </section>
    <section class="portfolio-note"><h2>${t.portfolio}</h2><p>${t.portfolioText}</p></section>
    <section class="brief" id="brief"><h2>${t.brief}</h2><p>${t.briefText}</p>
      <div class="brief-actions">
        <a class="button" href="mailto:${email}?subject=${encodeURIComponent(t.emailSubject)}">${t.emailCta}</a>
        <a href="https://wa.me/201065248248?text=${encodeURIComponent(t.whatsappText)}">${t.whatsapp}</a>
      </div>
    </section>
  </main>` : `<main class="shell gateway-main" id="main" tabindex="-1">
    <section class="gateway-heading">
      <h1><span>${t.titleLead}</span><span class="headline-accent">${t.titleAccent}</span></h1>
      <p>${t.groupDescription}</p>
      ${serviceNavigation(t, studioPath, solutionsPath)}
    </section>
    <div class="division-grid">
      ${divisionCard({ division: 'studio', link: studioPath, title: t.studio, offerings: t.studioOfferings, action: t.studioCta })}
      ${divisionCard({ division: 'solutions', link: solutionsPath, title: t.solutions, offerings: t.solutionsOfferings, action: t.solutionsCta })}
    </div>
  </main>
  <div class="intro" hidden>
    <div class="intro-curtain intro-violet" aria-hidden="true"></div>
    <div class="intro-curtain intro-jade" aria-hidden="true"></div>
    <div class="intro-brand" aria-hidden="true">
      <img src="/assets/graphity-logo.jpg" width="72" height="72" alt="">
      <span>${t.group}</span>
    </div>
    <button class="intro-skip" type="button">${t.intro}</button>
  </div>`}
  <footer class="shell site-footer">
    <span>© Graphity Group</span>
    <div class="footer-links">
      ${studio ? `<a href="${solutionsPath}">${t.solutions}</a>` : `<button class="replay" type="button" hidden>${t.replay}</button>`}
      <a href="mailto:${email}">${email}</a>
    </div>
  </footer>
</body>
</html>`;
}

for (const language of ['en', 'ar']) {
  const studioDir = 'dist/studio/' + language;
  await mkdir(studioDir, { recursive: true });
  await writeFile(studioDir + '/index.html', page(language, true));
  const groupDir = language === 'ar' ? 'dist/ar' : 'dist';
  await mkdir(groupDir, { recursive: true });
  await writeFile(groupDir + '/index.html', page(language, false));
}

await import('./solutions.mjs');
