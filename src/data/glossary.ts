export type GlossaryEntry = {
  term: string;
  short: string;
  long: string;
  related?: string[];
  categorySlug?: string;
};

export const GLOSSARY: GlossaryEntry[] = [
  { term: "Anesthésie", short: "Suppression de la sensation douloureuse.", long: "L'anesthésie regroupe les techniques médicales qui permettent une intervention sans douleur. On distingue l'anesthésie générale, locale et locorégionale. Elle nécessite un matériel spécifique (laryngoscopes, masques, sondes d'intubation) et une surveillance per-opératoire continue.", categorySlug: "anesthesie", related: ["Laryngoscope", "Sonde d'intubation"] },
  { term: "Bistouri", short: "Instrument tranchant chirurgical.", long: "Le bistouri est un instrument coupant utilisé en chirurgie. Il existe en version réutilisable (manche + lame interchangeable) ou jetable. Le choix de la lame dépend du tissu à inciser.", categorySlug: "instruments" },
  { term: "Concentrateur d'oxygène", short: "Appareil produisant de l'oxygène médical à partir de l'air ambiant.", long: "Le concentrateur d'oxygène filtre l'azote de l'air pour délivrer un débit d'oxygène à 90-96 %. Il existe en version stationnaire (5L/min) et portable. Indispensable pour l'oxygénothérapie de longue durée à domicile.", categorySlug: "oxygenotherapie", related: ["CPAP", "Saturomètre"] },
  { term: "CPAP", short: "Pression positive continue (apnée du sommeil).", long: "La CPAP (Continuous Positive Airway Pressure) maintient ouvertes les voies aériennes pendant le sommeil. Indiquée pour le syndrome d'apnée obstructive du sommeil (SAOS).", categorySlug: "oxygenotherapie" },
  { term: "Défibrillateur (DAE)", short: "Choc électrique pour rétablir le rythme cardiaque.", long: "Le défibrillateur automatisé externe analyse le rythme cardiaque et délivre un choc si nécessaire. Obligatoire dans certains établissements recevant du public.", categorySlug: "diagnostic" },
  { term: "ECG (Électrocardiogramme)", short: "Enregistrement de l'activité électrique du cœur.", long: "L'ECG enregistre l'activité électrique cardiaque via des électrodes. Il permet de détecter troubles du rythme, ischémie ou hypertrophie. Disponible en 3, 6 ou 12 dérivations.", categorySlug: "diagnostic" },
  { term: "Fauteuil roulant", short: "Aide à la mobilité pour personnes à mobilité réduite.", long: "Existe en version manuelle (autopropulsée ou avec accompagnant) ou électrique. Le choix dépend du poids de l'utilisateur, de l'usage (intérieur/extérieur) et du transport.", categorySlug: "mobilite" },
  { term: "Garrot", short: "Bande qui comprime un membre pour interrompre la circulation.", long: "Utilisé pour la pose de voie veineuse ou en urgence pour stopper une hémorragie. Existe en version élastique réutilisable ou tactique (CAT).", categorySlug: "consommables" },
  { term: "Hémoglobinomètre", short: "Mesure du taux d'hémoglobine.", long: "Petit appareil portable qui mesure rapidement le taux d'hémoglobine à partir d'une goutte de sang capillaire. Utile en don du sang et urgence.", categorySlug: "diagnostic" },
  { term: "Intubation", short: "Insertion d'une sonde dans la trachée.", long: "Geste d'urgence ou anesthésique pour libérer les voies aériennes. Nécessite un laryngoscope, une sonde d'intubation et un ballon insufflateur.", categorySlug: "anesthesie" },
  { term: "Laryngoscope", short: "Instrument pour visualiser le larynx lors de l'intubation.", long: "Comprend un manche (pile) et une lame (Macintosh ou Miller, plusieurs tailles). Existe en version conventionnelle, fibre optique et vidéolaryngoscope.", categorySlug: "anesthesie" },
  { term: "Masque chirurgical", short: "Protection respiratoire de classe I/II.", long: "Filtre les particules expirées par le porteur. Différent du FFP2 qui protège l'utilisateur. Norme EN 14683 (type I, II, IIR).", categorySlug: "protection" },
  { term: "Nébuliseur", short: "Diffuse un médicament sous forme d'aérosol.", long: "Transforme un liquide médicamenteux en fines particules inhalables. Indiqué pour asthme, bronchiolite, mucoviscidose. Pneumatique ou ultrasonique.", categorySlug: "oxygenotherapie" },
  { term: "Orthèse", short: "Appareil orthopédique de soutien ou correction.", long: "Dispositif externe qui soutient, immobilise ou corrige une articulation. Genouillère, attelle, ceinture lombaire, minerve.", categorySlug: "orthopedie" },
  { term: "Pansement", short: "Protection d'une plaie pour favoriser la cicatrisation.", long: "Existe en différents types : sec, hydrocolloïde, hydrogel, alginate, hydrofibre. Le choix dépend du stade de cicatrisation et de l'exsudat.", categorySlug: "pansements" },
  { term: "Quotient respiratoire", short: "Rapport CO₂ produit / O₂ consommé.", long: "Indicateur métabolique mesuré par calorimétrie indirecte. Utile en réanimation pour adapter la nutrition.", categorySlug: "diagnostic" },
  { term: "Réanimation", short: "Ensemble des techniques de maintien des fonctions vitales.", long: "Inclut ventilation assistée, monitoring multi-paramétrique, perfusion, support hémodynamique. Nécessite un plateau technique lourd.", categorySlug: "anesthesie" },
  { term: "Stérilisation", short: "Élimination de tous les micro-organismes.", long: "Procédé physique (autoclave vapeur, chaleur sèche) ou chimique (oxyde d'éthylène, peroxyde) qui rend un dispositif stérile. Différent de la désinfection.", categorySlug: "sterilisation" },
  { term: "Stéthoscope", short: "Instrument d'auscultation cardio-pulmonaire.", long: "Permet d'écouter les bruits internes du corps (cœur, poumons, abdomen). Modèles cardiologie, pédiatrie, double pavillon, électronique.", categorySlug: "diagnostic" },
  { term: "Tensiomètre", short: "Mesure la pression artérielle.", long: "Manuel (anaïroïde + stéthoscope) ou électronique (brassard automatique). Le tensiomètre validé cliniquement est recommandé pour le suivi à domicile.", categorySlug: "diagnostic" },
  { term: "Saturomètre (oxymètre)", short: "Mesure la saturation en oxygène (SpO₂).", long: "Pince au doigt non invasive qui mesure SpO₂ et fréquence cardiaque. Valeur normale 95-100 %. Indispensable en oxygénothérapie.", categorySlug: "diagnostic" },
  { term: "Ventilateur médical", short: "Appareil d'assistance respiratoire.", long: "Délivre une ventilation contrôlée ou assistée à un patient incapable de respirer seul. Modes : VC, VAC, VSAI, BiPAP.", categorySlug: "anesthesie" },
];
