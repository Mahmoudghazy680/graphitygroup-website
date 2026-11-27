import { published, publishedHero, safeText } from './published-content.mjs';

const texts = {
  en: {
    demo: 'Demo data', project: 'Northline Design Office', date: '18 November 2026',
    projectHours: 'Project hours', approvals: 'Pending approvals', stock: 'Stock alerts',
    schedule: 'Project schedule', table: 'Recent activity', activity: 'Activity', status: 'Status',
    planned: 'Planned', actual: 'Logged', inspect: 'Inspect sample record',
    sampleRecord: 'The project coordinator logged 8 hours against the detailed design stage. The entry is included in the hours shown above.',
    openQueue: 'Open sample approval queue',
    queue: 'Purchase request PR-024 · Survey equipment · Waiting for budget owner',
    apps: 'Applications & modules', filters: ['All', 'ERP modules', 'Connected apps'],
    connected: ['CRM', 'Helpdesk'],
    connectedDetails: ['Track opportunities and hand off qualified work to delivery.', 'Assign support requests and track resolution by owner.'],
    moduleDescriptions: ['Invoices, ledgers and reconciliation.', 'Attendance, leave and payroll inputs.', 'Stock, transfers and reorder alerts.', 'Tasks, time and cost visibility.', 'Trends and performance reporting.', 'Routing, approvals and audit history.'],
    serviceTitle: 'Technology built around your operations',
    plans: ['Process map', 'Solution blueprint', 'Configured application', 'Migration checklist', 'User acceptance plan', 'Support plan'],
    screen: [
      ['Operations overview', ['Project health', 'Open requests', 'Stock attention'], ['On track', 'In review', 'Low stock']],
      ['Project costing', ['Design development', 'Technical review', 'Site coordination'], ['64 h logged', '24 h logged', '8 h logged']],
      ['Timesheet review', ['Detailed design', 'Model coordination', 'Site visit'], ['Approved', 'Ready for review', 'Submitted']],
      ['Purchase approvals', ['Survey equipment', 'Site materials', 'Software renewal'], ['Budget review', 'Approved', 'Owner assigned']],
      ['Inventory exceptions', ['Safety supplies', 'Cable assemblies', 'Field kits'], ['Below reorder', 'Stock transfer', 'Available']],
      ['Finance workspace', ['Receivables', 'Supplier invoice', 'Bank reconciliation'], ['Due this week', 'Posted', 'Matched']],
      ['People operations', ['Attendance', 'Leave request', 'Payroll inputs'], ['Reviewed', 'Pending', 'Ready']],
      ['Workflow automation', ['Request intake', 'Budget validation', 'Assign follow-up'], ['Completed', 'In progress', 'Owner assigned']],
    ],
    times: ['08:30', '10:00', '12:15', '14:45', '16:00'],
  },
  ar: {
    demo: 'بيانات تجريبية', project: 'مكتب نورث لاين للتصميم', date: '18 نوفمبر 2026',
    projectHours: 'ساعات المشروع', approvals: 'موافقات معلّقة', stock: 'تنبيهات المخزون',
    schedule: 'جدول المشروع', table: 'أحدث الأنشطة', activity: 'النشاط', status: 'الحالة',
    planned: 'المخطط', actual: 'المسجل', inspect: 'افحص سجلاً تجريبياً',
    sampleRecord: 'سجّل منسق المشروع 8 ساعات على مرحلة التصميم التفصيلي. السجل محسوب ضمن الساعات المعروضة.',
    openQueue: 'افتح قائمة الموافقات التجريبية',
    queue: 'طلب شراء PR-024 · معدات المساحة · بانتظار مسؤول الميزانية',
    apps: 'التطبيقات والوحدات', filters: ['الكل', 'وحدات ERP', 'تطبيقات متصلة'],
    connected: ['إدارة علاقات العملاء', 'مكتب الدعم'],
    connectedDetails: ['تابع الفرص وسلّم الأعمال المعتمدة إلى فريق التنفيذ.', 'وزّع طلبات الدعم وتابع حالة الحل حسب المسؤول.'],
    moduleDescriptions: ['الفواتير والقيود والتسويات.', 'الحضور والإجازات ومدخلات الرواتب.', 'المخزون والتحويلات وتنبيهات إعادة الطلب.', 'المهام والوقت وتكلفة المشروعات.', 'الاتجاهات وتقارير الأداء.', 'التوجيه والموافقات وسجل الإجراءات.'],
    serviceTitle: 'تقنية تتناسب مع طريقة عملك',
    plans: ['خريطة الإجراءات', 'تصميم الحل', 'تطبيق مُهيأ', 'قائمة الترحيل', 'خطة قبول المستخدم', 'خطة الدعم'],
    screen: [
      ['نظرة عامة على العمليات', ['حالة المشروع', 'الطلبات المفتوحة', 'المخزون'], ['على المسار', 'قيد المراجعة', 'مخزون منخفض']],
      ['تكلفة المشروع', ['تطوير التصميم', 'المراجعة الفنية', 'تنسيق الموقع'], ['64 ساعة', '24 ساعة', '8 ساعات']],
      ['مراجعة سجلات الوقت', ['التصميم التفصيلي', 'تنسيق النموذج', 'زيارة الموقع'], ['معتمد', 'جاهز للمراجعة', 'مقدّم']],
      ['موافقات الشراء', ['معدات المساحة', 'مواد الموقع', 'تجديد البرمجيات'], ['مراجعة الميزانية', 'معتمد', 'تعيين المسؤول']],
      ['استثناءات المخزون', ['معدات السلامة', 'مجموعات الكابلات', 'أدوات الموقع'], ['دون حد الطلب', 'تحويل مخزني', 'متاح']],
      ['مساحة العمل المالية', ['الذمم المدينة', 'فاتورة المورد', 'التسوية المصرفية'], ['مستحق هذا الأسبوع', 'مرحّل', 'مطابق']],
      ['عمليات الموارد البشرية', ['الحضور', 'طلب إجازة', 'مدخلات الرواتب'], ['تمت المراجعة', 'معلّق', 'جاهز']],
      ['أتمتة الإجراءات', ['استلام الطلب', 'التحقق من الميزانية', 'تعيين المتابعة'], ['مكتمل', 'قيد التنفيذ', 'تم تعيين المسؤول']],
    ],
    times: ['08:30', '10:00', '12:15', '14:45', '16:00'],
  },
};

const glyphs = ['▤', '◈', '▦', '⤢', '▥', '✓', '◎', '◇'];

function screen(d, index, interactive = false) {
  const [title, items, status] = d.screen[index];
  return `<div class="demo-window demo-view-${index}">
    <div class="demo-window-bar"><span aria-hidden="true">● ● ●</span><span>${d.demo}</span></div>
    <div class="demo-workspace"><div class="demo-sidebar" aria-hidden="true">${[0,1,2,3].map(i=>`<i>${glyphs[(i+index)%glyphs.length]}</i>`).join('')}</div>
      <div class="demo-main"><div class="demo-screen-heading"><strong>${title}</strong><small>${d.project} · <span data-demo-project-date>${d.date}</span></small></div>
        <div class="demo-metrics">
          <div>${d.projectHours}<strong><span data-demo-logged>${d.metrics.logged}</span> / <span data-demo-planned>${d.metrics.planned}</span></strong></div>
          <div>${d.approvals}<strong data-demo-approvals>${d.metrics.approvals}</strong></div>
          <div>${d.stock}<strong data-demo-stock>${d.metrics.stock}</strong></div>
        </div>
        ${index < 2 || index === 5 ? `<div class="demo-chart" aria-hidden="true">${[34,58,46,77,63,89,73,98].map((value,i)=>`<i style="--bar:${(value+index*13+i*2)%88+12}%"></i>`).join('')}</div>` : ''}
        <div class="demo-list"><div><strong>${d.activity}</strong><strong>${d.status}</strong></div>${items.map((item,i)=>`<div><span>${item}</span><span class="demo-status">${status[i]}</span></div>`).join('')}</div>
        ${interactive ? `<details class="demo-record"><summary>${index === 3 ? d.openQueue : d.inspect}</summary><p>${index === 3 ? d.queue : d.sampleRecord}</p></details>` : ''}
      </div>
    </div>
  </div>`;
}

export function demoExperience(t, language) {
  const edit = published?.[language];
  const m = published?.metrics ?? { planned: 120, logged: 96, approvals: 2, stock: 3 };
  const d = {
    ...texts[language],
    ...Object.fromEntries(Object.entries(edit ?? {}).filter(([,value]) => typeof value === "string").map(([key, value]) => [key, safeText(value)])),
    metrics: m,
  };
  if (edit) {
    t.journey[0] = [d.overview, t.journey[0][1], d.overviewBody, ...t.journey[0].slice(3)];
    edit.otherSteps?.forEach((label, index) => { t.journey[index + 1][0] = safeText(label); });
  }
  const serviceIds = ['erp', 'custom-software', 'integrations', 'devops-cloud', 'it-infrastructure'];
  const servicePhotos = ['dashboard', 'software', 'cloud', 'cloud', 'infrastructure'];
  const industryPhotos = ['engineering', 'services', 'manufacturing', 'engineering', 'distribution'];
  const journeyViews = [0, 2, 3, 1, 7];
  const moduleViews = [5, 6, 4, 1, 0, 7, 0, 7];
  const modules = edit?.moduleLabels ? edit.moduleLabels.map(safeText) : [...t.modules.map(([name])=>name), ...d.connected];

  function hero(index) {
    const view = [0,1,7][index];
    return `<div class="demo-device-stage">
      <div class="demo-desktop">${index === 0 && publishedHero ? `<img class="demo-published-hero" src="${publishedHero}" width="1280" height="720" alt="">` : screen(d, view)}</div>
      <div class="demo-phone" aria-hidden="true"><i>◇</i><strong>${d.screen[index === 2 ? 7 : 3][0]}</strong><span>${d.approvals}</span><b data-demo-approvals>${d.metrics.approvals}</b><em>${d.demo}</em></div>
      <div class="demo-floats" aria-hidden="true">
        <div><span>▥</span><small>${d.projectHours}</small><b data-demo-logged>${d.metrics.logged}</b></div>
        <div><span>✓</span><small>${d.approvals}</small><b data-demo-approvals>${d.metrics.approvals}</b></div>
        <div><span>▦</span><small>${d.stock}</small><b data-demo-stock>${d.metrics.stock}</b></div>
      </div>
    </div>`;
  }

  function journey([,title,body,items], index, action) {
    return `<div class="journey-scene">
      <div class="journey-copy"><time>${d.times[index]}</time><h3>${title}</h3><p>${body}</p><ul class="sol-checklist">${items.map(item=>`<li>${item}</li>`).join('')}</ul>${action}</div>
      <div class="journey-screen">${screen(d,journeyViews[index],true)}</div>
    </div>`;
  }

  function module([name], index, action) {
    const item = t.modules[index];
    return `<div class="journey-scene">
      <div class="journey-copy"><h3>${item?.[1] ?? name}</h3><p>${item?.[2] ?? d.connectedDetails[index-6]}</p>${item ? `<ul class="sol-checklist">${item[3].map(x=>`<li>${x}</li>`).join('')}</ul>` : ''}${action}</div>
      <div class="journey-screen">${screen(d,moduleViews[index],index<6)}</div>
    </div>`;
  }

  function cards(base) {
    return `<div class="sol-service-cards">${t.service.map(([name,summary,,items],index)=>`
      <a href="${base}${serviceIds[index]}/" class="sol-photo-card">
        <img src="/assets/demo/${servicePhotos[index]}.webp" alt="" width="360" height="440" loading="lazy">
        <div><span class="sol-icon" aria-hidden="true">${glyphs[index]}</span><h3>${name}</h3><p>${summary}</p><small>${items[0]}</small></div>
      </a>`).join('')}</div>`;
  }

  function photo(name) {
    return `<img class="sol-industry-photo" src="/assets/demo/${name}.webp" alt="" width="360" height="440" loading="lazy">`;
  }
  return { d, glyphs, modules, servicePhotos, industryPhotos, hero, journey, module, cards, photo };
}
