import React, { useEffect, useMemo, useState } from 'react';
import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom';
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown,
  Menu, MessageCircle, Search, Sparkles, X, Aperture
} from 'lucide-react';
import { products } from './data/products.js';
import { asset, categoryMeta, copy, productUrl, slugify, whatsappUrl } from './components/utils.js';

function useText(lang) { return copy[lang] || copy.en; }

function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector('meta[name=\"description\"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    meta.content = description;
  }, [title, description]);
}

function App() {
  const [lang, setLang] = useState('en');
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const t = useText(lang);

  useEffect(() => {
    document.documentElement.lang = lang === 'ar' ? 'ar' : 'en';
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('rtl-mode', lang === 'ar');
  }, [lang]);
  useEffect(() => {
    const handleShortcut = event => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSearchOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  return <div className={`app-shell ${lang === 'ar' ? 'is-rtl' : ''}`}>
    <div className="topline"><span className="topline-dot" />{t.message}<span className="topline-separator">·</span>{t.madeMorocco}</div>
    <Header lang={lang} setLang={setLang} t={t} onSearch={() => setSearchOpen(true)} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    {menuOpen && <MobileMenu lang={lang} t={t} onClose={() => setMenuOpen(false)} />}
    <Routes>
      <Route path="/" element={<HomePage lang={lang} t={t} />} />
      <Route path="/anime" element={<CategoryPage category="anime" lang={lang} t={t} />} />
      <Route path="/anime/:subcat" element={<CategoryPage category="anime" lang={lang} t={t} />} />
      <Route path="/gaming" element={<CategoryPage category="gaming" lang={lang} t={t} />} />
      <Route path="/movies-series" element={<CategoryPage category="movies-series" lang={lang} t={t} />} />
      <Route path="/personalized-art" element={<PersonalizedPage lang={lang} t={t} />} />
      <Route path="/:category/:subcat/:slug" element={<ArtworkRoute lang={lang} t={t} />} />
      <Route path="*" element={<NotFound t={t} />} />
    </Routes>
    <Footer lang={lang} t={t} />
    <a className="floating-whatsapp" href={whatsappUrl(lang === 'ar' ? 'سلام، بغيت نعرف أكثر على لوحات AURA WALL.' : 'Hello, I would like to know more about AURA WALL artwork.')} target="_blank" rel="noreferrer" aria-label={t.order}>
      <MessageCircle size={21} strokeWidth={2.2} /><span>{lang === 'ar' ? 'تواصل معنا' : 'Let’s talk'}</span>
    </a>
    <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} products={products} t={t} lang={lang} />
  </div>;
}

function Header({ lang, setLang, t, onSearch, menuOpen, setMenuOpen }) {
  return <header className="site-header">
    <div className="header-inner">
      <button className="mobile-menu-toggle icon-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
      <Link to="/" className="brand-lockup" aria-label="AURA WALL home">
        <img src={asset("/assets/brand/aurawall-logo.png")} alt="AURA WALL" />
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <Link to="/" className="nav-link">{t.navHome}</Link>
        <Link to="/anime" className="nav-link">{t.navAnime}</Link>
        <Link to="/gaming" className="nav-link">{t.navGaming}</Link>
        <Link to="/movies-series" className="nav-link">{t.navMovies}</Link>
        <Link to="/personalized-art" className="nav-link">{t.navPersonal}</Link>
      </nav>
      <div className="header-actions">
        <button className="icon-button search-trigger" onClick={onSearch} aria-label={t.search}><Search size={19} /></button>
        <button className="language-switch" onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} aria-label="Change language">
          <span className="lang-orb">{lang === 'en' ? 'ع' : 'En'}</span><span>{t.language}</span>
        </button>
        <a className="header-whatsapp" href={whatsappUrl(lang === 'ar' ? 'سلام، بغيت نعرف أكثر على لوحات AURA WALL.' : 'Hello, I would like to know more about AURA WALL artwork.')} target="_blank" rel="noreferrer">
          <MessageCircle size={16} /> <span>{t.order}</span>
        </a>
      </div>
    </div>
  </header>;
}

function MobileMenu({ lang, t, onClose }) {
  const navItems = [
    ['/', t.navHome], ['/anime', t.navAnime], ['/gaming', t.navGaming], ['/movies-series', t.navMovies], ['/personalized-art', t.navPersonal],
  ];
  return <div className="mobile-menu-panel">
    <div className="mobile-menu-top"><span>{lang === 'ar' ? 'اكتشف أورا وول' : 'Explore AURA WALL'}</span><button className="icon-button" onClick={onClose} aria-label={t.close}><X size={20}/></button></div>
    <nav>{navItems.map(([href, label], i) => <Link key={href} to={href} onClick={onClose}><span className="mobile-nav-index">0{i + 1}</span>{label}<ArrowUpRight size={18}/></Link>)}</nav>
    <div className="mobile-menu-bottom"><Sparkles size={16}/>{t.madeMorocco}</div>
  </div>;
}

function HomePage({ lang, t }) {
  usePageMeta('AURA WALL — Give Your Walls an Aura', 'Premium plexiglass wall art inspired by anime, gaming, movies, and the worlds you love. Made in Morocco by AURA WALL.');
  const featured = useMemo(() => products.filter(p => p.featured).slice(0, 8), []);
  const categories = [
    { key: 'anime', title: t.navAnime, note: lang === 'ar' ? 'شخصيات وعوالم أنمي أيقونية' : 'Iconic characters & worlds', href: '/anime' },
    { key: 'gaming', title: t.navGaming, note: lang === 'ar' ? 'أعمال مستوحاة من الألعاب' : 'Art from legendary games', href: '/gaming' },
    { key: 'movies-series', title: t.navMovies, note: lang === 'ar' ? 'قصص سينمائية على جدارك' : 'Cinematic stories, reimagined', href: '/movies-series' },
    { key: 'personalized-art', title: t.navPersonal, note: lang === 'ar' ? 'فكرة فنية مصممة لك' : 'Your idea, made personal', href: '/personalized-art' },
  ];
  return <main>
    <section className="hero-section section-wrap">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-line"/>{t.heroEyebrow}</div>
        <h1>{lang === 'ar' ? <>امنح جدرانك<br/><em>هالة خاصة.</em></> : <>Give your walls<br/><em>an aura.</em></>}</h1>
        <p className="hero-description">{t.heroBody}</p>
        <div className="hero-actions">
          <Link to="/anime" className="button button-dark">{t.explore}<ArrowUpRight size={18}/></Link>
          <Link to="/personalized-art" className="button button-soft">{t.create}<ArrowRight size={17}/></Link>
        </div>
        <div className="hero-footnote"><span className="footnote-mark">✳</span><span>{lang === 'ar' ? 'فن حائط فاخر من البليكسي غلاس' : 'Premium plexiglass. Personal expression.'}</span></div>
      </div>
      <div className="hero-visual" aria-label="AURA WALL signature symbol">
        <div className="hero-glow hero-glow-one"/><div className="hero-glow hero-glow-two"/>
        <div className="hero-visual-frame"><img className="hero-sculpture" src={asset("/assets/brand/hero-image-cover.png")} alt="AURA WALL iridescent glass A symbol" /></div>
        <div className="floating-note note-top"><span className="note-dot"/>LIMITED WALL EDITION</div>
        <div className="floating-note note-bottom"><span className="note-icon"><Aperture size={16}/></span><span>DESIGNED TO STAND OUT</span></div>
        <span className="hero-coordinate">35° 41′ N / 0° 38′ W</span>
      </div>
      <a className="hero-scroll" href="#categories"><span className="scroll-arrow"><ArrowDown size={15}/></span>{t.scroll}</a>
    </section>

    <section className="section-wrap category-section" id="categories">
      <SectionIntro eyebrow={t.categoriesEyebrow} title={t.categoriesTitle} body={t.categoriesBody} lang={lang} />
      <div className="category-grid">
        {categories.map((cat, i) => <Link to={cat.href} className={`category-card category-card-${cat.key}`} key={cat.key}>
          <img src={asset(categoryMeta[cat.key].image)} alt={`${cat.title} wall art collection`} loading="lazy" />
          <div className="category-shade" />
          <div className="category-number">0{i + 1} <span>/ 04</span></div>
          <div className="category-info"><span className="category-kicker">{cat.note}</span><h3>{cat.title}</h3></div>
          <span className="category-arrow"><ArrowUpRight size={21}/></span>
        </Link>)}
      </div>
    </section>

    <section className="featured-section">
      <div className="section-wrap">
        <SectionIntro eyebrow={t.featuredEyebrow} title={t.featuredTitle} body={t.featuredBody} lang={lang} action={<Link to="/anime" className="text-link">{t.viewAll}<ArrowUpRight size={17}/></Link>} />
        <ProductGrid items={featured} t={t} lang={lang} />
      </div>
    </section>

    <section className="custom-promo section-wrap">
      <div className="custom-promo-art">
        <div className="custom-image-stack"><img src={asset("/assets/custom/custom-art-1.png")} alt="Example of personalized AURA WALL artwork" loading="lazy"/><img src={asset("/assets/custom/custom-art-2.png")} alt="A second custom artwork example" loading="lazy"/></div>
        <span className="custom-art-stamp"><Sparkles size={17}/><span>MADE<br/>FOR YOU</span></span>
      </div>
      <div className="custom-promo-copy">
        <div className="eyebrow"><span className="eyebrow-line"/>{t.customEyebrow}</div>
        <h2>{t.customTitle}</h2>
        <p>{t.customBody}</p>
        <div className="custom-tags">{t.customOptions.slice(0,4).map(tag => <span key={tag}>{tag}</span>)}</div>
        <Link to="/personalized-art" className="button button-dark">{t.customCta}<ArrowUpRight size={18}/></Link>
      </div>
    </section>

    <section className="brand-statement section-wrap">
      <div className="statement-index"><span>AW—01</span><span className="statement-index-line"/></div>
      <div className="statement-content"><div className="eyebrow"><span className="eyebrow-line"/>{t.statementEyebrow}</div><h2>{t.statementTitle}</h2><p>{t.statementBody}</p></div>
      <div className="statement-mark"><img src={asset("/assets/brand/hero-image-cover.png")} alt="" loading="lazy"/></div>
    </section>
    <section className="last-cta section-wrap"><span className="last-cta-star">✳</span><div><h2>{lang === 'ar' ? 'جدارك. عالمك.' : 'Your wall. Your world.'}</h2><p>{lang === 'ar' ? 'اكتشف القطعة التي تشبهك.' : 'Find the piece that feels like you.'}</p></div><Link to="/anime" className="button button-light">{t.explore}<ArrowUpRight size={18}/></Link></section>
  </main>;
}

function SectionIntro({ eyebrow, title, body, action, lang }) {
  return <div className={`section-intro ${lang === 'ar' ? 'rtl-text' : ''}`}>
    <div className="section-intro-main"><div className="eyebrow"><span className="eyebrow-line"/>{eyebrow}</div><h2>{title}</h2></div>
    <div className="section-intro-side">{body && <p>{body}</p>}{action}</div>
  </div>;
}

function ProductGrid({ items, t, lang }) {
  return <div className="product-grid">{items.map((product, index) => <ProductCard key={product.id} product={product} t={t} lang={lang} index={index}/>)}</div>;
}

function ProductCard({ product, t, lang, index = 0 }) {
  return <Link to={productUrl(product)} className="product-card" style={{'--card-index': index % 8}}>
    <div className="product-image-wrap"><img src={asset(product.image)} alt={product.title} loading="lazy" decoding="async"/><span className="product-view">{t.viewArtwork}<ArrowUpRight size={15}/></span></div>
    <div className="product-meta"><div><span className="product-category-label">{lang === 'ar' ? categoryMeta[product.category]?.arabic || product.category : product.subcategory}</span><h3>{product.title}</h3></div><span className="product-open"><ArrowUpRight size={17}/></span></div>
  </Link>;
}

function CategoryPage({ category, lang, t }) {
  const { subcat } = useParams();
  const [shown, setShown] = useState(12);
  const [query, setQuery] = useState('');
  const meta = categoryMeta[category];
  const normalizedSubcat = subcat ? products.find(p => p.category === category && slugify(p.subcategory) === subcat)?.subcategory : null;
  const filtered = useMemo(() => products.filter(p => p.category === category && (!normalizedSubcat || p.subcategory === normalizedSubcat) && matchesSearch(p, query)), [category, normalizedSubcat, query]);
  useEffect(() => setShown(12), [category, normalizedSubcat, query]);
  const subcategories = category === 'anime' ? ['All artwork','Naruto','One Piece','Dragon Ball Z','More Anime'] : [];
  const title = normalizedSubcat ? (lang === 'ar' ? `${meta?.arabic || 'Art'} · ${normalizedSubcat}` : normalizedSubcat) : (lang === 'ar' ? meta?.arabic || 'Art' : meta?.title || 'Art');
  usePageMeta(`${title} | AURA WALL`, normalizedSubcat ? `${normalizedSubcat} plexiglass wall art from AURA WALL.` : meta?.description || 'Premium plexiglass wall art from AURA WALL.');
  if (!meta) return <NotFound t={t}/>;
  return <main className="collection-page section-wrap">
    <div className={`collection-hero collection-hero-${category}`}>
      <div className="collection-hero-copy"><div className="eyebrow"><span className="eyebrow-line"/>{t.collection} / {category.toUpperCase()}</div><h1>{title}</h1><p>{normalizedSubcat ? `${normalizedSubcat} artwork, selected for the wall.` : meta.description}</p><div className="collection-count"><span>{filtered.length.toString().padStart(2,'0')}</span> {lang === 'ar' ? 'عملاً فنياً في المجموعة' : 'artworks in this collection'}</div></div>
      <div className="collection-hero-image"><img src={asset(meta.image)} alt={`${meta.title} collection cover`}/><span className="collection-hero-index">AURA WALL / COLLECTION</span></div>
    </div>
    {subcategories.length > 0 && <div className="subcategory-strip" aria-label="Anime subcategories">{subcategories.map(item => {
      const active = item === 'All artwork' ? !normalizedSubcat : normalizedSubcat === item;
      const href = item === 'All artwork' ? '/anime' : `/anime/${slugify(item)}`;
      return <Link key={item} to={href} className={`subcategory-pill ${active ? 'active' : ''}`}>{lang === 'ar' && item === 'All artwork' ? t.all : item}<ArrowUpRight size={14}/></Link>;
    })}</div>}
    <div className="catalog-toolbar"><div><span className="toolbar-label">{t.all}</span><span className="toolbar-count">{filtered.length} {lang === 'ar' ? 'عملاً' : 'pieces'}</span></div><label className="catalog-search"><Search size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder={lang === 'ar' ? 'ابحث في هذه المجموعة' : 'Search this collection'} aria-label="Search this collection"/>{query && <button onClick={() => setQuery('')} aria-label={t.close}><X size={14}/></button>}</label></div>
    {filtered.length ? <><ProductGrid items={filtered.slice(0, shown)} t={t} lang={lang}/>{shown < filtered.length && <div className="show-more-wrap"><button className="button button-outline" onClick={() => setShown(s => s + 12)}>{t.showMore}<ChevronDown size={17}/></button><span>{Math.min(shown, filtered.length)} / {filtered.length}</span></div>}</> : <EmptyState t={t} lang={lang}/>}
  </main>;
}

function PersonalizedPage({ lang, t }) {
  usePageMeta('Personalized Art | AURA WALL', 'Create personalized plexiglass wall art from your own photo, character, memory, or concept. Contact AURA WALL on WhatsApp.');
  const steps = [t.step1,t.step2,t.step3,t.step4,t.step5];
  return <main className="personalized-page">
    <section className="personalized-hero section-wrap">
      <div className="personalized-copy"><div className="eyebrow"><span className="eyebrow-line"/>{t.customEyebrow}</div><h1>{t.customTitle}</h1><p>{t.customBody}</p><a className="button button-dark" href={whatsappUrl(lang === 'ar' ? 'سلام، بغيت نصمم لوحة فنية مخصصة ليا.' : 'Hello, I would like to create a personalized AURA WALL artwork.')} target="_blank" rel="noreferrer">{t.customCta}<ArrowUpRight size={18}/></a><div className="personalized-note"><Check size={15}/>{lang === 'ar' ? 'التصميم بالتنسيق معك خطوة بخطوة' : 'Made with you, step by step'}</div></div>
      <div className="personalized-gallery"><div className="personalized-gallery-back"><img src={asset("/assets/custom/custom-art-2.png")} alt="Personalized artwork example"/></div><div className="personalized-gallery-front"><img src={asset("/assets/custom/custom-art-1.png")} alt="Personalized portrait artwork example"/></div><div className="gallery-label"><Sparkles size={17}/><span>{lang === 'ar' ? 'مصمم لك' : 'ONE OF ONE'}</span></div></div>
    </section>
    <section className="custom-options-section section-wrap"><SectionIntro eyebrow={lang === 'ar' ? 'ابدأ بفكرة' : 'START WITH AN IDEA'} title={t.customListTitle} body={lang === 'ar' ? 'أرسل لنا فكرتك أو صورتك المرجعية، وسنساعدك على تحويلها إلى تصميم مناسب لمساحتك.' : 'Send us your idea or reference and we’ll help shape it into artwork designed for your space.'} lang={lang}/><div className="custom-option-grid">{t.customOptions.map((option,i)=><div className="custom-option" key={option}><span>0{i+1}</span><p>{option}</p><ArrowUpRight size={18}/></div>)}</div></section>
    <section className="process-section"><div className="section-wrap"><SectionIntro eyebrow={lang === 'ar' ? 'كيف تعمل العملية' : 'THE PROCESS'} title={t.processTitle} body={lang === 'ar' ? 'رحلة سهلة من أول فكرة إلى لوحة جاهزة على جدارك.' : 'A simple, collaborative journey from the first thought to the finished piece.'} lang={lang}/><div className="process-grid">{steps.map((step,i)=><div className="process-step" key={step}><span className="process-number">0{i+1}</span><span className="process-line"/><h3>{step}</h3></div>)}</div><a className="button button-dark" href={whatsappUrl(lang === 'ar' ? 'سلام، بغيت نبدا مشروع لوحة فنية مخصصة.' : 'Hello, I would like to start a personalized artwork project.')} target="_blank" rel="noreferrer">{t.customCta}<ArrowUpRight size={18}/></a></div></section>
  </main>;
}

function ArtworkRoute({ lang, t }) {
  const { category, subcat, slug } = useParams();
  const product = products.find(p => p.category === category && slugify(p.subcategory) === subcat && p.slug === slug);
  if (!product) return <NotFound t={t}/>;
  return <ArtworkDetail product={product} lang={lang} t={t}/>;
}

function ArtworkDetail({ product, lang, t }) {
  usePageMeta(`${product.title} | AURA WALL`, `${product.title} — premium plexiglass wall art from AURA WALL. Ask about this artwork on WhatsApp.`);
  const related = useMemo(() => products.filter(p => p.id !== product.id && (p.franchise === product.franchise || p.subcategory === product.subcategory)).slice(0,4), [product]);
  const message = lang === 'ar' ? `سلام، بغيت نطلب العمل الفني: ${product.title}.` : `Hello, I'd like to order the ${product.title} artwork.`;
  return <main className="detail-page section-wrap">
    <div className="breadcrumb"><Link to="/">{t.navHome}</Link><span>/</span><Link to={`/${product.category}`}>{lang === 'ar' ? categoryMeta[product.category]?.arabic : categoryMeta[product.category]?.title}</Link><span>/</span><span>{product.title}</span></div>
    <div className="detail-layout"><div className="detail-image-column"><div className="detail-image-stage"><img src={asset(product.image)} alt={product.title}/><span className="detail-image-label">AURA WALL · ARTWORK {product.id.toUpperCase()}</span></div><p className="image-caption"><Aperture size={15}/>{lang === 'ar' ? 'العمل الفني معروض مع الحفاظ على نسبه الأصلية.' : 'Artwork shown in its original proportions.'}</p></div>
      <div className="detail-copy"><div className="eyebrow"><span className="eyebrow-line"/>{t.aboutPiece}</div><p className="detail-category">{product.subcategory} <span>·</span> {product.franchise}</p><h1>{product.title}</h1><p className="detail-description">{product.description}</p><div className="detail-rule"/><div className="detail-facts"><div><span>{t.inspiredBy}</span><strong>{product.franchise}</strong></div><div><span>{t.category}</span><strong>{product.subcategory}</strong></div></div>
        <a className="button button-dark detail-order" href={whatsappUrl(message)} target="_blank" rel="noreferrer"><MessageCircle size={18}/>{t.orderThis}<ArrowUpRight size={18}/></a>
        <div className="detail-order-note"><Check size={15}/>{lang === 'ar' ? 'لا توجد أسعار على الموقع — تواصل معنا لمعرفة التفاصيل.' : 'No prices on the website. Message us for details.'}</div>
        <div className="detail-tags">{product.tags.slice(0,8).map(tag=><span key={tag}>#{tag.replaceAll(' ','')}</span>)}</div>
        <Link to={`/${product.category}`} className="back-link"><ArrowLeft size={16}/>{t.back}</Link>
      </div></div>
    {related.length > 0 && <section className="related-section"><SectionIntro eyebrow={t.details} title={t.related} lang={lang}/><ProductGrid items={related} t={t} lang={lang}/></section>}
  </main>;
}

function SearchOverlay({ open, onClose, products, t, lang }) {
  const [query, setQuery] = useState('');
  useEffect(() => { if (open) setQuery(''); }, [open]);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open, onClose]);
  const results = useMemo(() => query.trim() ? products.filter(p => matchesSearch(p, query)).slice(0,8) : products.filter(p => p.featured).slice(0,5), [products, query]);
  if (!open) return null;
  return <div className="search-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="search-dialog" role="dialog" aria-modal="true" aria-label={t.search}>
      <div className="search-dialog-top"><span className="eyebrow"><span className="eyebrow-line"/>{t.searchResults}</span><button className="icon-button" onClick={onClose} aria-label={t.close}><X size={20}/></button></div>
      <div className="search-input-large"><Search size={23}/><input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder={t.searchPlaceholder} aria-label={t.search}/><span className="search-shortcut">⌘ / Ctrl K</span></div>
      <div className="search-dialog-hint">{t.searchHint}</div>
      <div className="search-result-list">{results.length ? results.map(product=><Link to={productUrl(product)} className="search-result" key={product.id} onClick={onClose}><img src={asset(product.image)} alt="" loading="lazy"/><span className="search-result-info"><small>{product.subcategory} · {product.franchise}</small><strong>{product.title}</strong></span><ArrowUpRight size={18}/></Link>) : <div className="search-empty"><Search size={22}/><strong>{t.noSearch}</strong><span>{t.noSearchHint}</span></div>}</div>
      <div className="search-dialog-bottom"><span>{lang === 'ar' ? 'ابدأ الكتابة للبحث' : 'START TYPING TO SEARCH'}</span><span>{results.length} {lang === 'ar' ? 'نتيجة' : 'results'}</span></div>
    </div>
  </div>;
}

function EmptyState({ t, lang }) {
  return <div className="empty-state"><div className="empty-icon"><Search size={24}/></div><h3>{t.noResults}</h3><p>{lang === 'ar' ? 'جرّب تغيير كلمات البحث أو التصنيف.' : 'Try changing your search terms or collection.'}</p><Link to="/anime" className="text-link">{t.browseAll}<ArrowUpRight size={17}/></Link></div>;
}

function Footer({ lang, t }) {
  return <footer className="site-footer"><div className="footer-main section-wrap"><div className="footer-brand"><Link to="/" className="footer-logo"><img src={asset("/assets/brand/aurawall-logo.png")} alt="AURA WALL"/></Link><p>{t.footerText}</p><span className="footer-origin"><span className="topline-dot"/>{t.madeMorocco}</span></div><div className="footer-links"><div><span className="footer-heading">{t.footerNav}</span><Link to="/anime">{t.navAnime}</Link><Link to="/gaming">{t.navGaming}</Link><Link to="/movies-series">{t.navMovies}</Link><Link to="/personalized-art">{t.navPersonal}</Link></div><div><span className="footer-heading">{t.contact}</span><a href={whatsappUrl(lang === 'ar' ? 'سلام، بغيت نتواصل مع AURA WALL.' : 'Hello, I would like to contact AURA WALL.')} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={14}/></a><span className="footer-contact-note">+212 627 025 271</span><span className="footer-contact-note">Morocco · Worldwide feeling</span></div></div></div><div className="footer-bottom section-wrap"><span>© {new Date().getFullYear()} AURA WALL. {t.rights}</span><span className="footer-bottom-mark">DESIGNED TO MAKE AN IMPRESSION <span>✳</span></span></div></footer>;
}

function NotFound({ t }) {
  return <main className="not-found section-wrap"><div className="eyebrow"><span className="eyebrow-line"/>404 / LOST IN THE AURA</div><h1>{t.noResults}</h1><p>{t.noSearchHint}</p><Link className="button button-dark" to="/">{t.navHome}<ArrowUpRight size={18}/></Link></main>;
}

function matchesSearch(product, query) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [product.title, product.category, product.subcategory, product.franchise, product.character, ...(product.tags || [])].join(' ').toLowerCase();
  return haystack.includes(q) || slugify(haystack).includes(slugify(q));
}

export default App;
