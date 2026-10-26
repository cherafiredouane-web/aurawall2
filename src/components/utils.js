export const asset = (path = '') => `${import.meta.env.BASE_URL}${path.toString().replace(/^\/+/, '')}`;

export const WHATSAPP_NUMBER = '212627025271';

export function whatsappUrl(message = 'Salam, I would like to know more about AURA WALL artwork.') {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function slugify(value = '') {
  return value.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export function productUrl(product) {
  const cat = product.category === 'movies-series' ? 'movies-series' : product.category;
  const sub = slugify(product.subcategory || product.category);
  return `/${cat}/${sub}/${product.slug}`;
}

export const categoryMeta = {
  anime: {
    title: 'Anime',
    arabic: 'أنمي',
    subtitle: 'Bring your favourite worlds out of the screen.',
    description: 'Iconic characters, signature moments, and bold colour—curated for your walls.',
    image: '/assets/categories/anime.jpg',
    accent: 'anime',
  },
  gaming: {
    title: 'Gaming',
    arabic: 'الألعاب',
    subtitle: 'Level up your space.',
    description: 'Artwork inspired by legendary games, unforgettable characters, and late-night worlds.',
    image: '/assets/categories/gaming.jpg',
    accent: 'gaming',
  },
  'movies-series': {
    title: 'Movies & Series',
    arabic: 'الأفلام والمسلسلات',
    subtitle: 'Your screen favourites. Reimagined for your space.',
    description: 'Cinematic portraits and cult-favourite stories with gallery-worthy presence.',
    image: '/assets/categories/movies-series.jpg',
    accent: 'movies',
  },
  'personalized-art': {
    title: 'Personalized Art',
    arabic: 'فن حسب الطلب',
    subtitle: 'Your idea. Your story. Your Aura.',
    description: 'Turn a memory, character, photo, or personal concept into a piece that feels yours.',
    image: '/assets/categories/personalized-art.jpg',
    accent: 'custom',
  },
};

export const copy = {
  en: {
    navHome: 'Home', navAnime: 'Anime', navGaming: 'Gaming', navMovies: 'Movies & Series', navPersonal: 'Personalized Art',
    message: 'Made for the worlds you love', order: 'WhatsApp us', search: 'Search art', language: 'العربية',
    heroEyebrow: 'PREMIUM PLEXIGLASS WALL ART', heroTitle: 'Give your walls an aura.',
    heroBody: 'Premium plexiglass wall art inspired by the worlds you love.', explore: 'Explore artworks', create: 'Create your art',
    scroll: 'SCROLL TO EXPLORE', categoriesEyebrow: 'FIND YOUR WORLD', categoriesTitle: 'A wall for every obsession.',
    categoriesBody: 'A little piece of the worlds that stay with you.', browse: 'Explore collection',
    featuredEyebrow: 'THE AURA EDIT', featuredTitle: 'Pieces with presence.', featuredBody: 'A considered selection of artwork made to turn an empty wall into your favourite corner.',
    viewAll: 'View all artwork', showMore: 'Show more', viewArtwork: 'View artwork',
    customEyebrow: 'MADE PERSONAL', customTitle: 'Create something that is yours.',
    customBody: 'Your memories. Your characters. Your world. We help turn the idea in your head into art made for your space.',
    customCta: 'Create my artwork', processTitle: 'From idea to wall art.',
    step1: 'Choose your idea', step2: 'Send your reference', step3: 'We create the artwork', step4: 'Approve your design', step5: 'Turn it into wall art',
    statementEyebrow: 'MORE THAN DECORATION', statementTitle: 'Make space for what you love.',
    statementBody: 'AURA WALL brings the stories, characters, and ideas you love into the spaces where life happens.',
    madeMorocco: 'Made in Morocco, made for your space.', footerText: 'A little more personality for your walls.',
    collection: 'Collection', all: 'All artwork', noResults: 'No artworks found. Try another character, anime, movie or game.',
    related: 'You might also like', back: 'Back to collection', ask: 'Ask about this artwork', orderThis: 'Order on WhatsApp',
    aboutPiece: 'About this piece', inspiredBy: 'Inspired by', category: 'Collection', details: 'Artwork details',
    searchPlaceholder: 'Try “Itachi”, “Cyberpunk”, “Batman”…', searchHint: 'Search by character, franchise, title, category, or tags.',
    searchResults: 'SEARCH RESULTS', popular: 'Popular searches', noSearch: 'No artworks found', noSearchHint: 'Try another character, anime, movie or game.',
    browseAll: 'Browse all artwork', close: 'Close', customListTitle: 'A piece that only you could imagine.',
    customOptions: ['Personal photo', 'Couple or family art', 'Gaming artwork', 'Anime-inspired concept', 'Character portrait', 'Custom poster'],
    footerNav: 'Explore', contact: 'Get in touch', rights: 'All rights reserved.',
  },
  ar: {
    navHome: 'الرئيسية', navAnime: 'أنمي', navGaming: 'الألعاب', navMovies: 'أفلام ومسلسلات', navPersonal: 'فن حسب الطلب',
    message: 'مصمم للعوالم التي تحبها', order: 'تواصل عبر واتساب', search: 'ابحث عن عمل فني', language: 'English',
    heroEyebrow: 'لوحات حائط فاخرة من البليكسي غلاس', heroTitle: 'امنح جدرانك هالة خاصة.',
    heroBody: 'أعمال فنية فاخرة من البليكسي غلاس مستوحاة من العوالم التي تحبها.', explore: 'اكتشف الأعمال', create: 'صمّم عملك الخاص',
    scroll: 'اكتشف المزيد', categoriesEyebrow: 'اكتشف عالمك', categoriesTitle: 'لكل شغف مكان على جدارك.',
    categoriesBody: 'قطعة صغيرة من العوالم التي تبقى معك.', browse: 'اكتشف المجموعة',
    featuredEyebrow: 'اختيارات أورا', featuredTitle: 'قطع تلفت الأنظار.', featuredBody: 'اختيارات فنية تحول الجدار الفارغ إلى زاويتك المفضلة.',
    viewAll: 'عرض جميع الأعمال', showMore: 'عرض المزيد', viewArtwork: 'شاهد العمل',
    customEyebrow: 'صُمّم لك', customTitle: 'اصنع شيئاً يشبهك.',
    customBody: 'ذكرياتك، شخصياتك، وعالمك الخاص. نحول فكرتك إلى عمل فني يناسب مساحتك.',
    customCta: 'صمّم عملي الفني', processTitle: 'من الفكرة إلى الجدار.',
    step1: 'اختر فكرتك', step2: 'أرسل الصور المرجعية', step3: 'نصمم العمل الفني', step4: 'وافق على التصميم', step5: 'حوّله إلى لوحة حائط',
    statementEyebrow: 'أكثر من مجرد ديكور', statementTitle: 'اترك مساحة لما تحب.',
    statementBody: 'تجمع أورا وول القصص والشخصيات والأفكار التي تحبها في المساحات التي تعيش فيها.',
    madeMorocco: 'صُنع في المغرب، ليناسب مساحتك.', footerText: 'لمسة شخصية أكثر لجدرانك.',
    collection: 'المجموعة', all: 'جميع الأعمال', noResults: 'لم نعثر على أعمال فنية. جرّب البحث عن شخصية أو أنمي أو فيلم أو لعبة أخرى.',
    related: 'قد يعجبك أيضاً', back: 'العودة إلى المجموعة', ask: 'استفسر عن هذا العمل', orderThis: 'اطلب عبر واتساب',
    aboutPiece: 'عن هذا العمل', inspiredBy: 'مستوحى من', category: 'المجموعة', details: 'تفاصيل العمل',
    searchPlaceholder: 'جرّب “Itachi” أو “Cyberpunk” أو “Batman”…', searchHint: 'ابحث باسم الشخصية أو السلسلة أو العنوان أو التصنيف أو الكلمات المفتاحية.',
    searchResults: 'نتائج البحث', popular: 'عمليات بحث شائعة', noSearch: 'لم نعثر على أعمال فنية', noSearchHint: 'جرّب البحث عن شخصية أو أنمي أو فيلم أو لعبة أخرى.',
    browseAll: 'تصفح كل الأعمال', close: 'إغلاق', customListTitle: 'قطعة فنية لا يمكن لأحد تخيلها مثلك.',
    customOptions: ['صورة شخصية', 'فن للأزواج أو العائلة', 'فن الألعاب', 'تصميم مستوحى من الأنمي', 'بورتريه شخصية', 'ملصق مخصص'],
    footerNav: 'اكتشف', contact: 'تواصل معنا', rights: 'جميع الحقوق محفوظة.',
  }
};
