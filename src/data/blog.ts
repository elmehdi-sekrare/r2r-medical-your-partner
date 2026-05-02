export type BlogArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  intro: string;
  keyPoints: string[];
  sections: {
    title: string;
    body: string[];
  }[];
  conclusion: string;
  relatedCategorySlug?: string;
};

export type ProductTestArticle = {
  slug: string;
  productSlug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  testerProfile: string;
  score: string;
  videoId?: string;
  videoTitle: string;
  verdict: string;
  testedFor: string[];
  strengths: string[];
  limits: string[];
  sections: {
    title: string;
    body: string[];
  }[];
};

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "guide-concentrateur-oxygene",
    title: "Guide complet : Comment choisir un concentrateur d'oxygène",
    excerpt:
      "Les critères essentiels pour sélectionner un concentrateur d'oxygène adapté : débit, usage, bruit, entretien et accompagnement technique.",
    category: "Guide d'achat",
    date: "2026-04-15",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&h=760&fit=crop",
    author: "Équipe R2R Medical",
    relatedCategorySlug: "oxygenotherapie",
    intro:
      "Un concentrateur d'oxygène ne se choisit pas comme un simple appareil électrique. Il doit répondre à une prescription, à un contexte d'utilisation précis et à un besoin de continuité fiable, surtout lorsque le patient l'utilise plusieurs heures par jour.",
    keyPoints: [
      "Vérifier le débit prescrit et la plage de réglage de l'appareil.",
      "Comparer le niveau sonore, le poids et la facilité de déplacement.",
      "Prévoir les accessoires compatibles : lunettes, humidificateur, filtres et tubulures.",
      "Demander un accompagnement pour l'installation, l'entretien et la disponibilité des pièces.",
    ],
    sections: [
      {
        title: "Commencer par le besoin médical réel",
        body: [
          "Le point de départ reste toujours la prescription ou la recommandation médicale. Le débit d'oxygène, la durée quotidienne d'utilisation et le contexte du patient orientent le choix entre un appareil fixe, transportable ou une solution complémentaire.",
          "Pour un cabinet, une clinique ou une structure de soins, il est aussi important d'anticiper la fréquence d'utilisation, le nombre de patients concernés et le besoin éventuel d'un appareil de réserve.",
        ],
      },
      {
        title: "Les critères techniques à comparer",
        body: [
          "Le débit, la concentration d'oxygène, le niveau sonore, la consommation électrique et la facilité d'entretien sont les éléments les plus concrets à analyser. Un appareil silencieux et simple à nettoyer améliore fortement l'expérience au quotidien.",
          "La disponibilité des consommables compte autant que la machine elle-même. Filtres, lunettes, tubulures et humidificateurs doivent être faciles à remplacer pour maintenir une utilisation régulière.",
        ],
      },
      {
        title: "Pourquoi l'accompagnement fournisseur compte",
        body: [
          "Un bon fournisseur ne se limite pas à livrer un appareil. Il doit aider à confirmer le bon modèle, expliquer les accessoires nécessaires et préciser les conditions de garantie, d'entretien et de livraison.",
          "Chez R2R Medical, l'objectif est de simplifier la demande de devis et d'orienter le client vers le matériel correspondant au besoin, avec une réponse rapide via WhatsApp ou formulaire.",
        ],
      },
    ],
    conclusion:
      "Le bon concentrateur est celui qui correspond au besoin prescrit, reste simple à utiliser et peut être suivi dans le temps. Avant de valider un achat, confirmez toujours le débit, les accessoires et les conditions de support.",
  },
  {
    slug: "entretien-fauteuil-roulant",
    title: "Entretien d'un fauteuil roulant : les bonnes pratiques",
    excerpt:
      "Des gestes simples pour préserver la sécurité, le confort et la durée de vie d'un fauteuil roulant utilisé à domicile ou en établissement.",
    category: "Conseils",
    date: "2026-04-08",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=760&fit=crop",
    author: "Équipe R2R Medical",
    relatedCategorySlug: "mobilite",
    intro:
      "Un fauteuil roulant bien entretenu reste plus confortable, plus stable et plus sûr. Les vérifications régulières permettent aussi d'éviter des pannes au mauvais moment, surtout lorsque le fauteuil est utilisé chaque jour.",
    keyPoints: [
      "Contrôler les freins, les roues et les pneus de façon régulière.",
      "Nettoyer l'assise, le dossier et les parties de contact.",
      "Surveiller les vis, repose-pieds, accoudoirs et éléments réglables.",
      "Demander conseil si le fauteuil tire d'un côté, grince ou devient instable.",
    ],
    sections: [
      {
        title: "Les contrôles de sécurité essentiels",
        body: [
          "Les freins doivent bloquer correctement les roues, sans jeu excessif. Les pneus ou bandages doivent être inspectés pour repérer l'usure, les fissures ou une perte d'adhérence.",
          "Les repose-pieds, accoudoirs et poignées doivent rester bien fixés. Un simple desserrage peut gêner le transfert du patient ou réduire la stabilité pendant le déplacement.",
        ],
      },
      {
        title: "Hygiène et confort d'utilisation",
        body: [
          "Le nettoyage régulier de l'assise et du dossier limite l'accumulation de poussière et améliore le confort. Les zones en contact direct avec les mains doivent être nettoyées plus souvent.",
          "Pour les établissements de soins, il est utile de définir une routine d'inspection entre deux utilisateurs afin de garder un niveau d'hygiène constant.",
        ],
      },
      {
        title: "Quand remplacer ou demander un avis",
        body: [
          "Un fauteuil qui devient difficile à pousser, qui tire d'un côté ou dont les freins perdent en efficacité doit être vérifié rapidement. Continuer à l'utiliser dans ces conditions peut augmenter le risque de chute ou d'inconfort.",
          "Lors d'une demande de devis, précisez le type d'utilisateur, le poids supporté, l'environnement d'utilisation et les options nécessaires pour recevoir une proposition adaptée.",
        ],
      },
    ],
    conclusion:
      "Un entretien simple mais régulier prolonge la durée de vie du fauteuil et sécurise l'utilisateur. Les points à surveiller en priorité sont les freins, les roues, l'assise et tous les éléments réglables.",
  },
  {
    slug: "normes-sterilisation-2026",
    title: "Stérilisation en cabinet : points de vigilance avant l'achat",
    excerpt:
      "Autoclave, consommables, traçabilité et organisation : les éléments à vérifier pour structurer une zone de stérilisation fiable.",
    category: "Bonnes pratiques",
    date: "2026-03-22",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1200&h=760&fit=crop",
    author: "Équipe R2R Medical",
    relatedCategorySlug: "sterilisation",
    intro:
      "La stérilisation est un sujet sensible pour tout cabinet ou établissement de soins. Au-delà de l'appareil, il faut penser au circuit propre/sale, aux consommables, à la traçabilité et à la formation des personnes qui manipulent le matériel.",
    keyPoints: [
      "Choisir un équipement adapté au volume d'instruments à traiter.",
      "Prévoir les consommables : sachets, indicateurs, produits de nettoyage et accessoires.",
      "Organiser un flux clair entre instruments souillés, propres et stérilisés.",
      "Conserver les documents, cycles et preuves de suivi selon les exigences applicables.",
    ],
    sections: [
      {
        title: "Penser au flux, pas seulement à l'appareil",
        body: [
          "Un autoclave ou un stérilisateur doit s'intégrer dans un espace organisé. Les instruments doivent passer par des étapes cohérentes : pré-désinfection, nettoyage, conditionnement, stérilisation, stockage.",
          "Un espace mal organisé augmente le risque de confusion entre le matériel propre et le matériel à traiter. C'est pourquoi l'aménagement compte autant que le choix de l'équipement.",
        ],
      },
      {
        title: "Traçabilité et consommables",
        body: [
          "Les sachets, indicateurs chimiques, tests de contrôle et registres de cycles permettent de documenter le processus. Ces éléments doivent être prévus dès l'achat, car ils conditionnent l'utilisation quotidienne.",
          "Avant de commander, il faut vérifier la capacité, les dimensions utiles, les cycles disponibles et la compatibilité avec les instruments réellement utilisés dans le cabinet.",
        ],
      },
      {
        title: "Se faire accompagner avant de choisir",
        body: [
          "Les besoins d'un cabinet dentaire, d'un cabinet de soins ou d'une petite clinique ne sont pas identiques. Le volume, le type d'instruments et la fréquence d'utilisation changent le choix de l'équipement.",
          "R2R Medical peut accompagner la demande en identifiant les produits adaptés et les consommables nécessaires pour éviter les achats incomplets.",
        ],
      },
    ],
    conclusion:
      "Une zone de stérilisation professionnelle repose sur un équipement adapté, une organisation claire et des consommables disponibles. Le devis doit toujours couvrir l'appareil et son environnement d'utilisation.",
  },
  {
    slug: "equipement-cabinet-medical",
    title: "Équiper un cabinet médical au Maroc : liste complète",
    excerpt:
      "Une base claire pour préparer l'ouverture ou la modernisation d'un cabinet : diagnostic, hygiène, mobilier, urgence et consommables.",
    category: "Guide d'achat",
    date: "2026-03-10",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1200&h=760&fit=crop",
    author: "Équipe R2R Medical",
    relatedCategorySlug: "diagnostic",
    intro:
      "Préparer un cabinet médical demande une vision globale. Il ne s'agit pas seulement d'acheter quelques appareils visibles, mais de construire un environnement de consultation fonctionnel, propre, confortable et prêt pour les situations courantes.",
    keyPoints: [
      "Séparer les besoins par zones : accueil, consultation, soins, hygiène et stockage.",
      "Prévoir le diagnostic de base : tensiomètre, stéthoscope, thermomètre, oxymètre selon l'activité.",
      "Ne pas oublier les consommables, protections, pansements et solutions d'hygiène.",
      "Demander un devis groupé pour gagner du temps et mieux comparer les priorités.",
    ],
    sections: [
      {
        title: "La base pour la consultation",
        body: [
          "La salle de consultation doit permettre l'examen, la mesure et l'échange avec le patient dans de bonnes conditions. Selon la spécialité, le socle peut inclure table d'examen, tensiomètre, stéthoscope, oxymètre, thermomètre, éclairage et petit matériel de soins.",
          "Le mobilier médical doit être choisi pour sa facilité de nettoyage, sa stabilité et son confort. Une table ou un fauteuil adapté améliore l'expérience patient et facilite le travail du praticien.",
        ],
      },
      {
        title: "Hygiène, protection et consommables",
        body: [
          "Les consommables sont souvent sous-estimés lors de l'ouverture. Gants, compresses, pansements, champs, désinfectants, boîtes de collecte et protections doivent être intégrés dès le départ.",
          "Une bonne organisation de stock évite les ruptures pendant l'activité. Pour un cabinet qui démarre, il est utile de distinguer le stock de lancement et le stock de réapprovisionnement.",
        ],
      },
      {
        title: "Préparer le devis de façon efficace",
        body: [
          "Pour obtenir un devis pertinent, indiquez la spécialité, la ville, le nombre de salles, les besoins prioritaires et les produits déjà disponibles. Cela permet au fournisseur de proposer une sélection cohérente.",
          "R2R Medical centralise les demandes autour du catalogue, du formulaire de devis et de WhatsApp afin de faciliter la préparation d'un panier professionnel.",
        ],
      },
    ],
    conclusion:
      "Un cabinet bien équipé est un cabinet pensé par usage : diagnostic, examen, hygiène, soins et réapprovisionnement. Une demande de devis structurée permet d'obtenir une réponse plus rapide et plus utile.",
  },
];

export const PRODUCT_TESTS: ProductTestArticle[] = [
  {
    slug: "test-concentrateur-oxygene",
    productSlug: "concentrateur-doxygene",
    title: "Test produit : concentrateur d'oxygène pour usage quotidien",
    excerpt:
      "Un test orienté usage réel : installation, bruit, déplacement, accessoires et points à vérifier avant une demande de devis.",
    date: "2026-04-24",
    readTime: "7 min",
    testerProfile: "Usage domicile accompagné et structure de soins",
    score: "8,6/10",
    videoId: "aSUt9wDOCus",
    videoTitle: "Démonstration concentrateur d'oxygène",
    verdict:
      "Un appareil intéressant pour les besoins d'oxygénothérapie réguliers, à condition de confirmer le débit prescrit, les accessoires et les conditions de maintenance.",
    testedFor: ["Oxygénothérapie", "Usage prolongé", "Installation rapide", "Demande de devis"],
    strengths: [
      "Lecture simple des réglages essentiels.",
      "Format adapté à une installation fixe à domicile ou en structure.",
      "Accessoires respiratoires faciles à prévoir avec le devis.",
    ],
    limits: [
      "Le choix dépend toujours du débit médicalement recommandé.",
      "Prévoir l'entretien des filtres et consommables.",
      "Vérifier le niveau sonore selon l'environnement du patient.",
    ],
    sections: [
      {
        title: "Ce que nous observons en priorité",
        body: [
          "Pour un concentrateur, le premier critère reste l'adéquation au besoin médical. Le débit, la stabilité de fonctionnement et la disponibilité des accessoires sont plus importants qu'une simple comparaison visuelle.",
          "L'installation doit rester claire pour l'utilisateur ou l'aidant : emplacement ventilé, raccordement correct, tubulure adaptée et explication des gestes d'entretien.",
        ],
      },
      {
        title: "Expérience d'utilisation",
        body: [
          "Un bon concentrateur doit être facile à déplacer sur une courte distance, simple à nettoyer et suffisamment lisible pour limiter les erreurs d'usage.",
          "Lors d'une demande à R2R Medical, il est préférable d'indiquer le débit recherché, la ville de livraison et les accessoires déjà disponibles afin de recevoir une proposition cohérente.",
        ],
      },
    ],
  },
  {
    slug: "test-fauteuil-roulant-adulte",
    productSlug: "fauteuil-roulant-adulte",
    title: "Test produit : fauteuil roulant adulte manuel",
    excerpt:
      "Confort, stabilité, freinage, pliage et maniabilité : les points à regarder avant de choisir un fauteuil roulant adulte.",
    date: "2026-04-18",
    readTime: "6 min",
    testerProfile: "Mobilité quotidienne, domicile et consultation",
    score: "8,3/10",
    videoId: "rgAqpgrg-xs",
    videoTitle: "Essai fauteuil roulant adulte",
    verdict:
      "Un fauteuil manuel doit être choisi selon le poids utilisateur, la largeur d'assise, la maniabilité et l'environnement réel : domicile, clinique ou déplacements courts.",
    testedFor: ["Mobilité", "Transfert patient", "Pliage", "Sécurité"],
    strengths: [
      "Solution simple pour les déplacements accompagnés.",
      "Format pliable utile pour le transport.",
      "Freins et repose-pieds à vérifier facilement avant usage.",
    ],
    limits: [
      "La largeur d'assise doit être validée avant achat.",
      "Le confort dépend de la durée d'utilisation quotidienne.",
      "Certains usages nécessitent des options ou un modèle renforcé.",
    ],
    sections: [
      {
        title: "Les points de contrôle avant achat",
        body: [
          "Le choix d'un fauteuil roulant adulte ne doit pas se limiter au prix. La largeur, le poids supporté, le type de roues et la facilité de pliage déterminent l'expérience réelle.",
          "Pour un établissement, il faut aussi penser au nettoyage entre deux utilisateurs, au stockage et à la robustesse des éléments manipulés tous les jours.",
        ],
      },
      {
        title: "Notre lecture terrain",
        body: [
          "Un fauteuil stable, bien freiné et facile à pousser rassure l'utilisateur comme l'accompagnant. Les repose-pieds et accoudoirs doivent rester simples à manipuler.",
          "Avant le devis, indiquez si le fauteuil sera utilisé en intérieur, extérieur, transport voiture ou consultation afin d'orienter le choix du modèle.",
        ],
      },
    ],
  },
  {
    slug: "test-nebuliseur-electrique",
    productSlug: "nebuliseur-electrique",
    title: "Test produit : nébuliseur électrique",
    excerpt:
      "Un regard pratique sur le nébuliseur : montage, nettoyage, masque, bruit et usage respiratoire ponctuel.",
    date: "2026-04-10",
    readTime: "5 min",
    testerProfile: "Soins respiratoires ponctuels",
    score: "8,1/10",
    videoId: "qOlIQ6Deako",
    videoTitle: "Démonstration nébuliseur électrique",
    verdict:
      "Le nébuliseur est surtout utile lorsqu'il reste simple à préparer, à nettoyer et à ranger avec ses accessoires complets.",
    testedFor: ["Respiratoire", "Domicile", "Consommables", "Facilité d'entretien"],
    strengths: [
      "Usage facile à comprendre pour un accompagnant.",
      "Accessoires respiratoires identifiables rapidement.",
      "Format adapté aux besoins respiratoires ponctuels.",
    ],
    limits: [
      "Nettoyage nécessaire après utilisation.",
      "Vérifier les masques et embouts inclus.",
      "Toujours suivre les consignes du professionnel de santé.",
    ],
    sections: [
      {
        title: "Préparation et accessoires",
        body: [
          "Le nébuliseur doit être livré ou demandé avec les accessoires adaptés : masque adulte ou enfant, tuyau, godet et embout selon l'usage prévu.",
          "La simplicité du montage fait une vraie différence, surtout lorsque l'appareil est utilisé par un proche ou dans une routine de soins.",
        ],
      },
      {
        title: "Entretien après utilisation",
        body: [
          "Le nettoyage des pièces en contact avec l'aérosol est essentiel. Un appareil pratique est un appareil dont les accessoires se démontent clairement.",
          "Pour éviter une demande incomplète, R2R Medical peut aider à associer le nébuliseur aux consommables respiratoires compatibles.",
        ],
      },
    ],
  },
  {
    slug: "test-oxymetre-doigt-adulte",
    productSlug: "oxymetre-de-doigt-adulte-bleu",
    title: "Test produit : oxymètre de doigt adulte",
    excerpt:
      "Lecture, prise en main, affichage et limites d'usage : comment intégrer un oxymètre dans un kit de diagnostic de base.",
    date: "2026-03-29",
    readTime: "4 min",
    testerProfile: "Diagnostic rapide en cabinet ou suivi ponctuel",
    score: "8,4/10",
    videoId: "5nXrI6VjkKE",
    videoTitle: "Présentation oxymètre de doigt",
    verdict:
      "Un oxymètre est un outil pratique de lecture rapide, mais il doit être utilisé comme aide au suivi, avec interprétation professionnelle selon le contexte.",
    testedFor: ["Diagnostic", "Monitoring", "Cabinet", "Usage rapide"],
    strengths: [
      "Format compact facile à ranger.",
      "Lecture rapide pour une première observation.",
      "Intéressant dans un kit de consultation ou de soins.",
    ],
    limits: [
      "La lecture peut varier selon le positionnement du doigt.",
      "Ne remplace pas un avis médical.",
      "Vérifier piles, affichage et conditions d'utilisation.",
    ],
    sections: [
      {
        title: "Ce qu'un acheteur doit vérifier",
        body: [
          "L'affichage doit être lisible, la pince confortable et le démarrage rapide. Pour un cabinet, l'appareil doit aussi être simple à nettoyer entre deux usages.",
          "L'oxymètre est souvent commandé avec d'autres produits de diagnostic : tensiomètre, stéthoscope et thermomètre.",
        ],
      },
      {
        title: "Utilisation responsable",
        body: [
          "La mesure dépend du bon positionnement, de la perfusion périphérique et du contexte du patient. Le résultat doit donc être interprété avec prudence.",
          "La demande de devis doit préciser si l'oxymètre est destiné à un cabinet, un service de soins ou un usage ponctuel accompagné.",
        ],
      },
    ],
  },
  {
    slug: "test-tensiometre-digital-brassard",
    productSlug: "tensiometre-digital-brassard",
    title: "Test produit : tensiomètre digital à brassard",
    excerpt:
      "Lisibilité, brassard, mémorisation et usage en cabinet : les critères qui rendent un tensiomètre vraiment pratique.",
    date: "2026-03-18",
    readTime: "6 min",
    testerProfile: "Cabinet médical et suivi tensionnel ponctuel",
    score: "8,2/10",
    videoId: "Ag3TcM8zxuI",
    videoTitle: "Essai tensiomètre digital à brassard",
    verdict:
      "Le tensiomètre digital à brassard est un choix pratique lorsque la taille du brassard, la lisibilité et la simplicité d'utilisation sont bien vérifiées.",
    testedFor: ["Diagnostic", "Cabinet", "Suivi tensionnel", "Confort patient"],
    strengths: [
      "Lecture plus accessible qu'un modèle manuel pour certains usages.",
      "Brassard pratique pour des mesures répétées.",
      "Intégration facile dans un kit de diagnostic.",
    ],
    limits: [
      "La taille du brassard doit correspondre au patient.",
      "Les conditions de mesure influencent le résultat.",
      "Un modèle professionnel peut être préférable en usage intensif.",
    ],
    sections: [
      {
        title: "Lisibilité et brassard",
        body: [
          "Un écran clair et un brassard facile à positionner réduisent les erreurs d'utilisation. La taille du brassard reste un point à confirmer avant achat.",
          "Pour un cabinet, la robustesse du brassard et la rapidité de mesure comptent autant que les fonctions affichées.",
        ],
      },
      {
        title: "Choisir selon l'usage",
        body: [
          "Un usage ponctuel, une consultation quotidienne et un service médical n'ont pas les mêmes contraintes. La fréquence d'utilisation doit guider le niveau de gamme.",
          "R2R Medical peut orienter vers un tensiomètre digital, manuel ou mural selon l'organisation du cabinet.",
        ],
      },
    ],
  },
  {
    slug: "test-stethoscope-digital",
    productSlug: "stethoscope-digital",
    title: "Test produit : stéthoscope digital",
    excerpt:
      "Un format moderne pour l'auscultation : prise en main, usage clinique, confort d'écoute et points à clarifier avant achat.",
    date: "2026-03-06",
    readTime: "6 min",
    testerProfile: "Consultation médicale et diagnostic",
    score: "8,0/10",
    videoId: "8TtnCP7T6qQ",
    videoTitle: "Présentation stéthoscope digital",
    verdict:
      "Le stéthoscope digital peut être pertinent pour certains usages, mais il doit être choisi selon le confort d'écoute, l'autonomie et les habitudes du praticien.",
    testedFor: ["Diagnostic", "Auscultation", "Cabinet", "Équipement professionnel"],
    strengths: [
      "Approche moderne de l'auscultation.",
      "Intéressant pour les praticiens cherchant plus de confort d'écoute.",
      "Produit différenciant dans un cabinet équipé.",
    ],
    limits: [
      "Nécessite une prise en main par l'utilisateur.",
      "L'autonomie et les accessoires doivent être confirmés.",
      "Le choix dépend fortement des préférences du praticien.",
    ],
    sections: [
      {
        title: "Pourquoi tester avant de choisir",
        body: [
          "Le stéthoscope est un outil très personnel. Le poids, l'ergonomie, le rendu sonore et les habitudes d'auscultation influencent fortement le ressenti.",
          "Un modèle digital peut apporter du confort, mais il faut confirmer l'autonomie, les accessoires et la simplicité d'utilisation.",
        ],
      },
      {
        title: "Pour quel type de cabinet ?",
        body: [
          "Il peut convenir à un cabinet qui souhaite moderniser son équipement de diagnostic ou proposer un outil différent pour certaines consultations.",
          "Avant de valider la commande, il est utile de comparer avec un stéthoscope classique selon la spécialité et la fréquence d'utilisation.",
        ],
      },
    ],
  },
];

export function getBlogArticle(slug: string) {
  return BLOG_ARTICLES.find((article) => article.slug === slug);
}

export function getProductTest(slug: string) {
  return PRODUCT_TESTS.find((test) => test.slug === slug);
}
