import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type Language = "fr" | "ar";

const STORAGE_KEY = "r2r.language";

const DICTIONARY = {
  fr: {
    navHome: "Accueil",
    navCatalog: "Catalogue",
    navCategories: "Catégories",
    navQuote: "Devis",
    navCompare: "Comparer",
    navContact: "Contact",
    navAbout: "À propos",
    navBlog: "Blog",
    favorites: "Favoris",
    comparison: "Comparaison",
    quoteBasket: "Panier devis",
    menu: "Menu",
    language: "Langue",
    heroBadge: "Fournisseur agréé Maroc",
    heroLine1: "Équipements",
    heroLine2: "Médicaux",
    heroLine3: "Professionnels",
    heroCopy: "Votre partenaire de confiance au Maroc — 412 produits disponibles, livraison nationale et support WhatsApp 7j/7.",
    exploreCatalog: "Explorer le catalogue",
    contactUs: "Nous contacter",
    searchPlaceholder: "Rechercher: fauteuil, oxygène, pansement...",
    find: "Trouver",
    needOxygen: "Oxygène & respiration",
    needMobility: "Fauteuils & mobilité",
    needDiagnostic: "Diagnostic rapide",
    needHygiene: "Hygiène & protection",
    fastFindTitle: "Trouver un produit",
    fastFindText: "Recherche rapide dans 412 références.",
    fastQuoteTitle: "Préparer un devis",
    fastQuoteText: "Ajoutez plusieurs produits au panier devis.",
    fastOrderTitle: "Commander vite",
    fastOrderText: "Message WhatsApp généré automatiquement.",
    fastDeliveryTitle: "Livraison Maroc",
    fastDeliveryText: "Demandez disponibilité par ville.",
    products: "Produits",
    categories: "Catégories",
    deliveryMorocco: "Livraison Maroc",
    whatsappSupport: "Support WhatsApp",
    ourCategories: "Nos catégories",
    categoryHeadline: "Explorez nos 10 univers médicaux",
    categoryCopy: "Un catalogue complet pour les hôpitaux, cliniques et professionnels de santé.",
    selection: "Sélection",
    pricedProducts: "Produits avec prix affiché",
    viewAll: "Voir tout",
    frequentRequests: "Demandes fréquentes",
    oftenSearched: "Produits souvent recherchés",
    searchMore: "Rechercher plus",
    why: "Pourquoi R2R",
    promiseTitle: "Un partenaire qui tient ses promesses",
    fullCatalog: "Catalogue Complet",
    fullCatalogText: "412 références couvrant tous les besoins hospitaliers.",
    certifiedQuality: "Qualité Certifiée",
    certifiedQualityText: "Équipements conformes aux normes médicales internationales.",
    whatsappTeam: "Support WhatsApp",
    whatsappTeamText: "Une équipe réactive 7j/7 pour vos devis et commandes.",
    centralQuote: "Devis Centralisé",
    centralQuoteText: "Panier devis, comparaison et message WhatsApp préparé.",
    readyOrder: "Prêt à commander ?",
    readyCopy: "Contactez-nous directement sur WhatsApp pour tout devis ou commande.",
    startConversation: "Démarrer la conversation",
    footerCopy: "Votre partenaire de confiance en équipement médical au Maroc. 412 produits professionnels, livraison nationale.",
    orderWhatsapp: "Commander sur WhatsApp",
    navigation: "Navigation",
    contact: "Contact",
    adminCatalog: "Admin catalogue",
    quoteRequest: "Demande de devis",
    nationalDelivery: "Maroc — Livraison nationale",
    openingHours: "Lun–Sam, 8h–18h",
    rights: "Tous droits réservés.",
    madeIn: "Fait au Maroc",
  },
  ar: {
    navHome: "الرئيسية",
    navCatalog: "الكتالوج",
    navCategories: "الفئات",
    navQuote: "عرض سعر",
    navCompare: "مقارنة",
    navContact: "اتصال",
    navAbout: "من نحن",
    navBlog: "المدونة",
    favorites: "المفضلة",
    comparison: "المقارنة",
    quoteBasket: "سلة العرض",
    menu: "القائمة",
    language: "اللغة",
    heroBadge: "مورد طبي معتمد في المغرب",
    heroLine1: "معدات",
    heroLine2: "طبية",
    heroLine3: "احترافية",
    heroCopy: "شريككم الموثوق في المغرب — 412 منتجا متاحا، توصيل وطني ودعم واتساب طوال الأسبوع.",
    exploreCatalog: "تصفح الكتالوج",
    contactUs: "تواصل معنا",
    searchPlaceholder: "ابحث: كرسي متحرك، أوكسجين، ضمادات...",
    find: "بحث",
    needOxygen: "الأوكسجين والتنفس",
    needMobility: "الكراسي والتنقل",
    needDiagnostic: "تشخيص سريع",
    needHygiene: "النظافة والحماية",
    fastFindTitle: "العثور على منتج",
    fastFindText: "بحث سريع بين 412 مرجعا.",
    fastQuoteTitle: "تحضير عرض سعر",
    fastQuoteText: "أضف عدة منتجات إلى سلة العرض.",
    fastOrderTitle: "طلب سريع",
    fastOrderText: "رسالة واتساب جاهزة تلقائيا.",
    fastDeliveryTitle: "التوصيل بالمغرب",
    fastDeliveryText: "اطلب التوفر حسب المدينة.",
    products: "المنتجات",
    categories: "الفئات",
    deliveryMorocco: "التوصيل بالمغرب",
    whatsappSupport: "دعم واتساب",
    ourCategories: "فئاتنا",
    categoryHeadline: "اكتشف 10 مجالات طبية",
    categoryCopy: "كتالوج متكامل للمستشفيات والعيادات ومهنيي الصحة.",
    selection: "مختارات",
    pricedProducts: "منتجات بسعر ظاهر",
    viewAll: "عرض الكل",
    frequentRequests: "طلبات متكررة",
    oftenSearched: "منتجات يبحث عنها العملاء",
    searchMore: "بحث أكثر",
    why: "لماذا R2R",
    promiseTitle: "شريك يلتزم بوعوده",
    fullCatalog: "كتالوج شامل",
    fullCatalogText: "412 مرجعا لتلبية احتياجات المؤسسات الصحية.",
    certifiedQuality: "جودة موثوقة",
    certifiedQualityText: "معدات مطابقة للمعايير الطبية الدولية.",
    whatsappTeam: "دعم واتساب",
    whatsappTeamText: "فريق سريع الاستجابة لعروض الأسعار والطلبات.",
    centralQuote: "عرض سعر موحد",
    centralQuoteText: "سلة عرض، مقارنة ورسالة واتساب جاهزة.",
    readyOrder: "جاهز للطلب؟",
    readyCopy: "تواصل معنا مباشرة على واتساب لأي عرض سعر أو طلب.",
    startConversation: "ابدأ المحادثة",
    footerCopy: "شريككم الموثوق في المعدات الطبية بالمغرب. 412 منتجا احترافيا وتوصيل وطني.",
    orderWhatsapp: "اطلب عبر واتساب",
    navigation: "التنقل",
    contact: "اتصال",
    adminCatalog: "إدارة الكتالوج",
    quoteRequest: "طلب عرض سعر",
    nationalDelivery: "المغرب — توصيل وطني",
    openingHours: "الاثنين–السبت، 8h–18h",
    rights: "جميع الحقوق محفوظة.",
    madeIn: "صنع في المغرب",
  },
} as const;

type TranslationKey = keyof typeof DICTIONARY.fr;

type I18nContextValue = {
  language: Language;
  direction: "ltr" | "rtl";
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "fr";
  return window.localStorage.getItem(STORAGE_KEY) === "ar" ? "ar" : "fr";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const direction = language === "ar" ? "rtl" : "ltr";

  const setLanguage = (next: Language) => {
    setLanguageState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    document.documentElement.dataset.language = language;
  }, [direction, language]);

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      direction,
      setLanguage,
      toggleLanguage: () => setLanguage(language === "fr" ? "ar" : "fr"),
      t: (key) => DICTIONARY[language][key],
    }),
    [direction, language],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used inside I18nProvider");
  return context;
}
