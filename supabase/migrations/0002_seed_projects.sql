-- =============================================================================
--  Smartech Group — seed the initial software case studies.
--  Idempotent: re-running does nothing for slugs that already exist, so it is
--  safe to apply on top of an existing database.  These are the real projects
--  that previously lived as bundled static content; they are seeded here so the
--  portfolio is fully CMS-controlled from the admin dashboard.
-- =============================================================================

insert into public.projects
  (slug, title_ar, title_en, category, short_description, problem, solution, impact,
   technologies, cover_image, status, featured, project_date)
values
  (
    'tmco', 'TMCO', 'TMCO', 'systems',
    'تطبيق إدارة عمليات لشركة تجارية',
    'كان الفريق يعتمد على ملفات يدوية متفرّقة لإدارة الطلبات والعملاء مما أبطأ العمليات.',
    'بنينا تطبيق جوال متكامل مع داشبورد إدارية تربط الطلبات، الموظفين، والمخزون في مكان واحد.',
    'تقليل الوقت التشغيلي بأكثر من 60% وتوحيد البيانات.',
    array['Flutter','Node.js','PostgreSQL','Next.js Dashboard'],
    '/portfolio/tmco-cover.jpg', 'published', true, date '2024-01-01'
  ),
  (
    'gird', 'Gird', 'Gird', 'systems',
    'منصّة خدمات رقمية بتجربة استخدام نظيفة',
    'حاجة العميل لمنصّة سريعة تربط مزوّدي الخدمة بالعملاء بشكل مباشر.',
    'صمّمنا وبرمجنا منصّة ويب وتطبيق جوال مع نظام حجوزات ودفع إلكتروني.',
    'إطلاق ناجح مع نمو متسارع في عدد الحجوزات الشهرية.',
    array['Next.js','React Native','Stripe','Supabase'],
    '/portfolio/gird-cover.jpg', 'published', true, date '2024-01-01'
  ),
  (
    'myfile', 'Myfile', 'Myfile', 'systems',
    'نظام أرشفة ومستندات ذكي',
    'تشتّت الملفات والمستندات داخل الشركة وعدم وجود نظام مركزي للأرشفة.',
    'أطلقنا نظام إدارة مستندات سحابي بصلاحيات متقدّمة، بحث ذكي، ومشاركة آمنة.',
    'تسريع الوصول للمعلومة بنسبة تتجاوز 70% وزيادة الأمان.',
    array['Next.js','AWS S3','Postgres','AI Search'],
    '/portfolio/myfile-cover.jpg', 'published', true, date '2024-01-01'
  ),
  (
    'padel-booking', 'نظام حجز ملاعب', 'Padel Booking', 'systems',
    'حلول حجز رياضية احترافية',
    'صعوبة إدارة الحجوزات والمواعيد لملاعب البادل وكرة القدم.',
    'نظام حجز ذكي مع تقويم لحظي، دفع إلكتروني، وإشعارات تلقائية.',
    'تقليل الحجوزات اليدوية ورفع نسبة الإشغال.',
    array['Next.js','Stripe','PWA'],
    '/portfolio/padel-cover.jpg', 'published', true, date '2025-01-01'
  )
on conflict (slug) do nothing;
