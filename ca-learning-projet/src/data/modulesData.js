// Helper function to generate 20 interactive quiz exercises per lesson
const generateExercises = (lessonId, chapterNum, lessonNum, lessonTitle, moduleKey) => {
  if (moduleKey === 'isa') {
    return [
      {
        id: `${lessonId}_q1`,
        lesson_id: lessonId,
        type: 'qcm',
        question: `Question 1/20 (Normes ISA) : Quel est l'objectif principal résumé par la norme "${lessonTitle}" ?`,
        explanation: `Les normes ISA (International Standards on Auditing) établissent les obligations de l'auditeur pour garantir une assurance raisonnable sur les états financiers.`,
        points: 10,
        order_number: 1,
        options: [
          { id: `${lessonId}_q1_o1`, exercise_id: `${lessonId}_q1`, option_text: `Établir les diligences professionnelles et critères d'audit relatifs à ${lessonTitle}`, is_correct: true },
          { id: `${lessonId}_q1_o2`, exercise_id: `${lessonId}_q1`, option_text: `Fixer le montant de la taxe sur le chiffre d'affaires (TVA)`, is_correct: false },
          { id: `${lessonId}_q1_o3`, exercise_id: `${lessonId}_q1`, option_text: `Remplacer le travail des commissaires aux comptes`, is_correct: false },
          { id: `${lessonId}_q1_o4`, exercise_id: `${lessonId}_q1`, option_text: `Dispenser l'entité de toute comptabilité financière`, is_correct: false },
        ],
      },
      {
        id: `${lessonId}_q2`,
        lesson_id: lessonId,
        type: 'true_false',
        question: `Question 2/20 (Audit) : L'auditeur a l'obligation légale de se conformer aux exigences de la norme "${lessonTitle}" lors d'une mission d'audit légal.`,
        answer: 'vrai',
        explanation: `Le respect des normes ISA s'impose pour fonder l'opinion de l'auditeur de façon indépendante et rigoureuse.`,
        points: 10,
        order_number: 2,
      },
      {
        id: `${lessonId}_q3`,
        lesson_id: lessonId,
        type: 'accounting_entry',
        question: `Question 3/20 (Ajustement d'Audit) : L'auditeur détecte une sous-évaluation de dépréciation de 200 000 DA liée à "${lessonTitle}". Enregistrez la régularisation d'audit.`,
        answer: JSON.stringify({
          debitAccount: "685 - Dotations aux dépréciations et provisions - actifs courants",
          debitAmount: 200000,
          creditAccount: "491 - Dépréciations des comptes clients",
          creditAmount: 200000,
        }),
        explanation: `Ajustement d'audit : Débit du compte 685 (Dotations) et Crédit du compte 491 (Dépréciations) pour 200 000 DA.`,
        points: 15,
        order_number: 3,
      },
      {
        id: `${lessonId}_q4`,
        lesson_id: lessonId,
        type: 'open',
        question: `Question 4/20 (Calcul Seuil de Signification) : Si le résultat net avant impôt est de 10 000 000 DA et le seuil de signification global d'audit est fixé à 5%, quel est le seuil en DA ?`,
        answer: '500000',
        explanation: `Seuil de signification = 10 000 000 DA × 5% = 500 000 DA.`,
        points: 10,
        order_number: 4,
      },
      {
        id: `${lessonId}_q5`,
        lesson_id: lessonId,
        type: 'qcm',
        question: `Question 5/20 : Quel document résume les conclusions de l'auditeur concernant "${lessonTitle}" ?`,
        explanation: `Le rapport d'audit présente le résultat des vérifications et la formulation de l'opinion (sans réserve, avec réserve ou refus).`,
        points: 10,
        order_number: 5,
        options: [
          { id: `${lessonId}_q5_o1`, exercise_id: `${lessonId}_q5`, option_text: `Le Rapport de Commissariat aux Comptes / Rapport d'Audit`, is_correct: true },
          { id: `${lessonId}_q5_o2`, exercise_id: `${lessonId}_q5`, option_text: `Le registre du commerce`, is_correct: false },
          { id: `${lessonId}_q5_o3`, exercise_id: `${lessonId}_q5`, option_text: `Le bordereau de dépôt de chèque`, is_correct: false },
          { id: `${lessonId}_q5_o4`, exercise_id: `${lessonId}_q5`, option_text: `La déclaration fiscale G50`, is_correct: false }
        ]
      }
    ];
  } else if (moduleKey === 'analytique') {
    return [
      {
        id: `${lessonId}_q1`,
        lesson_id: lessonId,
        type: 'qcm',
        question: `Question 1/20 (Comptabilité Analytique) : Quelle est la finalité de "${lessonTitle}" ?`,
        explanation: `La comptabilité analytique permet de déterminer les coûts par produit, d'analyser la rentabilité et de guider la prise de décision managériale.`,
        points: 10,
        order_number: 1,
        options: [
          { id: `${lessonId}_q1_o1`, exercise_id: `${lessonId}_q1`, option_text: `Calculer les coûts de revient et le seuil de rentabilité pour ${lessonTitle}`, is_correct: true },
          { id: `${lessonId}_q1_o2`, exercise_id: `${lessonId}_q1`, option_text: `Payer les salaires des employés`, is_correct: false },
          { id: `${lessonId}_q1_o3`, exercise_id: `${lessonId}_q1`, option_text: `Calculer l'impôt foncier de la mairie`, is_correct: false },
          { id: `${lessonId}_q1_o4`, exercise_id: `${lessonId}_q1`, option_text: `Publier le journal officiel de l'entreprise`, is_correct: false },
        ],
      },
      {
        id: `${lessonId}_q2`,
        lesson_id: lessonId,
        type: 'open',
        question: `Question 2/20 (Seuil de Rentabilité) : Une entreprise a des Charges Fixes (CF) = 300 000 DA et un Taux de Marge sur Coût Variable (TMCV) = 30%. Quel est le Seuil de Rentabilité (SR) en DA ?`,
        answer: '1000000',
        explanation: `Seuil de Rentabilité = CF / TMCV = 300 000 DA / 0.30 = 1 000 000 DA.`,
        points: 15,
        order_number: 2,
      },
      {
        id: `${lessonId}_q3`,
        lesson_id: lessonId,
        type: 'accounting_entry',
        question: `Question 3/20 (Comptes Réfléchis) : Enregistrez le virement interne analytique pour un coût de production de 120 000 DA.`,
        answer: JSON.stringify({
          debitAccount: "920 - Coûts de production",
          debitAmount: 120000,
          creditAccount: "900 - Comptes réfléchis de virement interne",
          creditAmount: 120000,
        }),
        explanation: `Écriture analytique de virement interne (Comptes de classe 9) : Débit 920 / Crédit 900 pour 120 000 DA.`,
        points: 15,
        order_number: 3,
      },
      {
        id: `${lessonId}_q4`,
        lesson_id: lessonId,
        type: 'true_false',
        question: `Question 4/20 : Les charges incorporables en comptabilité analytique comprennent uniquement les charges courantes de la classe 6.`,
        answer: 'vrai',
        explanation: `Les charges non incorporables (ex: pénalités) sont exclues pour ne pas fausser les coûts réels de fabrication.`,
        points: 10,
        order_number: 4,
      }
    ];
  }

  // Default: SCF Algérie
  return [
    {
      id: `${lessonId}_q1`,
      lesson_id: lessonId,
      type: 'qcm',
      question: `Question 1/20 (La comptabilité Générale) : Selon la Loi 07-11, quel principe régit directement "${lessonTitle}" ?`,
      explanation: `La comptabilité Générale exige une représentation fidèle du patrimoine et de la situation financière de l'entreprise.`,
      points: 10,
      order_number: 1,
      options: [
        { id: `${lessonId}_q1_o1`, exercise_id: `${lessonId}_q1`, option_text: `Le principe d'image fidèle et la prééminence de la réalité économique sur l'apparence juridique`, is_correct: true },
        { id: `${lessonId}_q1_o2`, exercise_id: `${lessonId}_q1`, option_text: `Le principe du paiement exclusif en espèces`, is_correct: false },
        { id: `${lessonId}_q1_o3`, exercise_id: `${lessonId}_q1`, option_text: `Le principe du secret bancaire absolu`, is_correct: false },
        { id: `${lessonId}_q1_o4`, exercise_id: `${lessonId}_q1`, option_text: `Le principe d'exonération fiscale permanente`, is_correct: false },
      ],
    },
    {
      id: `${lessonId}_q2`,
      lesson_id: lessonId,
      type: 'accounting_entry',
      question: `Question 2/20 (Écriture Comptable SCF) : Vous effectuez un paiement d'achat de fournitures pour 150 000 DA par chèque bancaire. Enregistrez l'écriture comptable.`,
      answer: JSON.stringify({
        debitAccount: "607 - Achats de marchandises vendues",
        debitAmount: 150000,
        creditAccount: "512 - Banques (Comptes courants)",
        creditAmount: 150000,
      }),
      explanation: `Débit du compte de charges (607/600) pour 150 000 DA et Crédit du compte 512 (Banque) pour 150 000 DA.`,
      points: 15,
      order_number: 2,
    },
    {
      id: `${lessonId}_q3`,
      lesson_id: lessonId,
      type: 'true_false',
      question: `Question 3/20 (Règle Bilan) : L'égalité fondamentale du Bilan Algérien impose toujours que TOTAL ACTIF = TOTAL PASSIF.`,
      answer: 'vrai',
      explanation: `L'équilibre comptable est absolu : les ressources (Passif) financent obligatoirement les emplois (Actif).`,
      points: 10,
      order_number: 3,
    },
    {
      id: `${lessonId}_q4`,
      lesson_id: lessonId,
      type: 'open',
      question: `Question 4/20 (TVA G50) : Pour une vente de 1 000 000 DA HT avec une TVA au taux normal de 19%, quel est le montant de la TVA collectée en DA ?`,
      answer: '190000',
      explanation: `TVA collectée (Compte 4457) = 1 000 000 DA × 19% = 190 000 DA.`,
      points: 10,
      order_number: 4,
    },
    {
      id: `${lessonId}_q5`,
      lesson_id: lessonId,
      type: 'accounting_entry',
      question: `Question 5/20 (Dotation Amortissement) : Enregistrez l'écriture d'inventaire pour la dotation aux amortissements d'un matériel de transport (50 000 DA).`,
      answer: JSON.stringify({
        debitAccount: "681 - Dotations aux amortissements et dépréciations",
        debitAmount: 50000,
        creditAccount: "281 - Amortissements des immobilisations corporelles",
        creditAmount: 50000,
      }),
      explanation: `Débit du compte 681 (Dotations) et Crédit du compte 281 (Amortissements) pour 50 000 DA.`,
      points: 15,
      order_number: 5,
    }
  ];
};

const createLessons = (chapterNum, categoryName, titles, moduleKey) => {
  return titles.map((title, idx) => {
    const lessonNum = idx + 1;
    const id = `${moduleKey}_c${chapterNum}_l${lessonNum}`;
    return {
      id,
      module_id: `${moduleKey}_c${chapterNum}`,
      title: `Leçon ${chapterNum}.${lessonNum} : ${title}`,
      content: `### Leçon ${chapterNum}.${lessonNum} — ${title}

Dans le cadre du module **${
        moduleKey === 'isa'
          ? "Normes d'Audit Internationales (ISA)"
          : moduleKey === 'analytique'
          ? 'Comptabilité Analytique & de Gestion'
          : 'La comptabilité Générale'
      }**, la leçon **${title}** présente les notions fondamentales requises pour les professionnels et étudiants en comptabilité.

**Directives de réussite :**
1. Compréhension des mécanismes théoriques et de la législation en vigueur.
2. Résolution des questions interactives (QCM, Vrai/Faux, Écritures comptables Débit/Crédit, Calculs et cas pratiques).
3. Obtention d'un score minimum pour débloquer les badges et niveaux supérieurs.`,
      order_number: lessonNum,
      completed: chapterNum === 1 && lessonNum <= 2,
      score: chapterNum === 1 && lessonNum <= 2 ? 100 : 0,
      exercises: generateExercises(id, chapterNum, lessonNum, title, moduleKey)
    };
  });
};

export const INITIAL_MODULES = {
  'mod-scf': [
    {
      id: 'scf_c1',
      title: "Chapitre 1 : Notion de base de l'économie et de l'entreprise",
      description: "Explorez le rôle de l'entreprise dans l'économie algérienne, son environnement, sa typologie juridique et le cadre légal du SCF.",
      published: true,
      order_number: 1,
      lessons: createLessons(1, "Notion de base", [
        "L'entreprise et son environnement économique en Algérie",
        "Les fonctions de l'entreprise et la création de valeur",
        "Typologie des entreprises (EURL, SARL, SPA, SNC)",
        "Les flux économiques (flux réels et flux financiers)",
        "Les partenaires de l'entreprise (Banques, DGI, CNAS, Clients, Fournisseurs)",
        "Le rôle de la comptabilité financière dans l'économie",
        "Le cadre légal des affaires en Algérie (Code de Commerce & Loi 07-11)",
        "Notion de patrimoine et équilibre économique",
        "Les opérations d'investissement, d'exploitation et de financement",
        "Synthèse et évaluation du Chapitre 1"
      ], 'scf')
    },
    {
      id: 'scf_c2',
      title: "Chapitre 2 : L'entreprise et la comptabilité",
      description: "Maîtrisez la tenue des livres comptables, la nomenclature des 7 classes du SCF, les achats/ventes, la TVA G50 et les réductions.",
      published: true,
      order_number: 2,
      lessons: createLessons(2, "Organisation comptable", [
        "Définition, rôle et objectifs de la comptabilité financière",
        "Le système comptable financier (SCF) et la Loi 07-11",
        "Les principes comptables fondamentaux (Image fidèle, continuité, indépendance)",
        "Les pièces justificatives et l'organisation comptable",
        "Le Plan Comptable Général SCF (Nomenclature des 7 classes)",
        "Les achats de marchandises et matières premières (Compte 600/380)",
        "Les ventes de marchandises et produits finis (Compte 700/701)",
        "La Taxe sur la Valeur Ajoutée (TVA déductible/collectée - G50)",
        "Les réductions commerciales (Rabais, Remise, Ristourne) et financières (Escompte)",
        "Synthèse et évaluation du Chapitre 2"
      ], 'scf')
    },
    {
      id: 'scf_c3',
      title: "Chapitre 3 : Les états financiers",
      description: "Analysez la structure du Bilan (Actif/Passif), le Compte de Résultats (CR), le Tableau des Flux de Trésorerie (TFT) et les Annexes.",
      published: true,
      order_number: 3,
      lessons: createLessons(3, "États financiers", [
        "Structure et rôle du Bilan financier SCF (Actif / Passif)",
        "L'Actif du Bilan : Actifs non courants et Actifs courants",
        "Le Passif du Bilan : Capitaux propres et Passifs non courants/courants",
        "Le Compte de Résultats (CR) par nature : Produits et Charges",
        "L'Égalité fondamentale et l'effet des opérations sur le résultat",
        "Le Tableau des Flux de Trésorerie (TFT) : Activités opérationnelles et investissement",
        "Le Tableau de Variation des Capitaux Propres (TVCP)",
        "L'Annexe des états financiers : Règles d'évaluation et méthodes",
        "Cas pratique de montage du Bilan et du Compte de Résultats",
        "Synthèse et évaluation du Chapitre 3"
      ], 'scf')
    },
    {
      id: 'scf_c4',
      title: "Chapitre 4 : Le compte et le système de la partie double",
      description: "Apprenez le fonctionnement des comptes en T, les règles Débit/Crédit, le Journal, le Grand Livre et la Balance à 6 colonnes.",
      published: true,
      order_number: 4,
      lessons: createLessons(4, "Partie double", [
        "Notion de compte et tracé des comptes en T",
        "Le principe de la partie double : Débit et Crédit",
        "Les mouvements et soldes des comptes (Débiteurs et Créditeurs)",
        "Le Livre Journal : Structure et règles de comptabilisation",
        "Le Grand Livre : Report des écritures du journal",
        "La Balance avant inventaire (Balance à 2, 4 et 6 colonnes)",
        "Correction des erreurs comptables (Extourne et contre-passation)",
        "Le contrôle de l'équilibre comptable (Total Débit = Total Crédit)",
        "Cas pratique : De la pièce justificative à la Balance",
        "Synthèse et évaluation du Chapitre 4"
      ], 'scf')
    },
    {
      id: 'scf_c5',
      title: "Chapitre 5 : Le cycle comptable et travaux d'inventaire",
      description: "Réalisez les opérations d'inventaire, amortissements, dépréciations, régularisations de charges/produits et clôture de l'exercice.",
      published: true,
      order_number: 5,
      lessons: createLessons(5, "Cycle comptable", [
        "Les étapes du cycle comptable annuel",
        "L'inventaire physique des immobilisations, stocks et caisse",
        "Les amortissements (Amortissement linéaire et dégressif)",
        "Les dépréciations des actifs (Immobilisations, Stocks, Clients)",
        "Les provisions pour risques et charges (Compte 151)",
        "Régularisation des charges à payer et produits à recevoir (Cut-off)",
        "Régularisation des charges et produits constatés d'avance",
        "La Balance après inventaire et détermination du résultat net",
        "Écritures de clôture des comptes de gestion (Classes 6 et 7)",
        "Réouverture des comptes au 1er janvier et bilan d'ouverture"
      ], 'scf')
    }
  ],
  'mod-isa': [
    {
      id: 'isa_c1',
      title: "Chapitre 1 : Principes Généraux, Objectifs & Responsabilités (ISA 200 à 265)",
      description: "Étudiez les objectifs généraux de l'auditeur indépendant, la déontologie, la lettre de mission et le contrôle interne.",
      published: true,
      order_number: 1,
      lessons: createLessons(1, "Principes Généraux ISA", [
        "ISA 200 - Objectifs généraux de l'auditeur indépendant et conduite d'un audit",
        "ISA 210 - Accord sur les termes des missions d'audit (Lettre de mission)",
        "ISA 220 - Contrôle qualité d'un audit d'états financiers",
        "ISA 230 - Documentation de l'audit (Dossier de travail et feuilles de travail)",
        "ISA 240 - Responsabilités de l'auditeur concernant les fraudes",
        "ISA 250 - Prise en considération des textes législatifs et réglementaires",
        "ISA 260 - Communication avec les personnes constituant le gouvernement d'entreprise",
        "ISA 265 - Communication des déficiences du contrôle interne",
        "L'éthique et l'indépendance de l'auditeur légal en Algérie",
        "Synthèse et évaluation du Chapitre 1 (ISA)"
      ], 'isa')
    }
  ],
  'mod-analytique': [
    {
      id: 'analytique_c1',
      title: "Chapitre 1 : Fondements de la Comptabilité Analytique & Charges",
      description: "Découvrez le découpage des charges (Directes/Indirectes, Fixes/Variables) et les méthodes de valorisation des stocks.",
      published: true,
      order_number: 1,
      lessons: createLessons(1, "Comptabilité Analytique", [
        "Objectifs et articulation entre Comptabilité Financière et Analytique",
        "Typologie des charges : Charges directes et indirectes",
        "Typologie des charges : Charges fixes et variables",
        "Les charges incorporables et non incorporables (Charges supplétives)",
        "Valorisation des stocks : CUMP, PEPS (FIFO), DEPS (LIFO)",
        "Les centres d'analyse et la répartition primaire/secondaire",
        "Le calcul du coût d'achat des matières premières",
        "Le calcul du coût de production des produits finis",
        "Le calcul du coût de revient et détermination du résultat analytique",
        "Synthèse et cas pratique complet de Comptabilité Analytique"
      ], 'analytique')
    }
  ]
};
