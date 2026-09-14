export const PCN_CLASSES = [
  { code: '1', name: 'Comptes de capitaux', color: 'emerald' },
  { code: '2', name: "Comptes d'immobilisations", color: 'blue' },
  { code: '3', name: 'Comptes de stocks et en-cours', color: 'amber' },
  { code: '4', name: 'Comptes de tiers', color: 'purple' },
  { code: '5', name: 'Comptes financiers', color: 'indigo' },
  { code: '6', name: 'Comptes de charges', color: 'rose' },
  { code: '7', name: 'Comptes de produits', color: 'teal' },
];

export const PCN_ACCOUNTS = [
  // CLASSE 1
  { code: '101', name: 'Capital social ou individuel', classCode: '1' },
  { code: '106', name: 'Réserves (Légale, Statutaire)', classCode: '1' },
  { code: '110', name: 'Report à nouveau (solde créditeur)', classCode: '1' },
  { code: '120', name: "Résultat de l'exercice (Bénéfice)", classCode: '1' },
  { code: '129', name: "Résultat de l'exercice (Perte)", classCode: '1' },
  { code: '164', name: "Emprunts auprès des établissements de crédit", classCode: '1' },

  // CLASSE 2
  { code: '204', name: 'Logiciels et droits assimilés', classCode: '2' },
  { code: '211', name: 'Terrains', classCode: '2' },
  { code: '213', name: 'Constructions', classCode: '2' },
  { code: '215', name: 'Installations techniques, matériel et outillage industriels', classCode: '2' },
  { code: '218', name: 'Autres immobilisations corporelles (Matériel de transport, informatique)', classCode: '2' },
  { code: '281', name: 'Amortissements des immobilisations corporelles', classCode: '2' },
  { code: '291', name: 'Dépréciations des immobilisations corporelles', classCode: '2' },

  // CLASSE 3
  { code: '300', name: 'Achats de marchandises vendues', classCode: '3' },
  { code: '310', name: 'Matières premières et fournitures', classCode: '3' },
  { code: '355', name: 'Produits finis', classCode: '3' },
  { code: '380', name: 'Marchandises stockées', classCode: '3' },
  { code: '391', name: 'Dépréciations des stocks de matières premières', classCode: '3' },

  // CLASSE 4
  { code: '401', name: 'Fournisseurs de stocks et services', classCode: '4' },
  { code: '404', name: "Fournisseurs d'immobilisations", classCode: '4' },
  { code: '408', name: 'Fournisseurs - Factures non parvenues', classCode: '4' },
  { code: '411', name: 'Clients', classCode: '4' },
  { code: '416', name: 'Clients douteux ou litigieux', classCode: '4' },
  { code: '445', name: 'État - Taxes sur le chiffre d\'affaires (TVA)', classCode: '4' },
  { code: '4456', name: 'TVA déductible', classCode: '4' },
  { code: '4457', name: 'TVA collectée', classCode: '4' },
  { code: '491', name: 'Dépréciations des comptes clients', classCode: '4' },

  // CLASSE 5
  { code: '512', name: 'Banques (Comptes courants)', classCode: '5' },
  { code: '515', name: 'Caisse Nationale d\'Épargne et de Prévoyance (CNEP)', classCode: '5' },
  { code: '517', name: 'Chèques postaux (CCP)', classCode: '5' },
  { code: '530', name: 'Caisse', classCode: '5' },

  // CLASSE 6
  { code: '600', name: 'Achats consommés de matières premières', classCode: '6' },
  { code: '607', name: 'Achats de marchandises vendues', classCode: '6' },
  { code: '613', name: 'Locations et charges locatives', classCode: '6' },
  { code: '615', name: 'Entretien et réparations', classCode: '6' },
  { code: '631', name: 'Rémunérations du personnel (Salaires)', classCode: '6' },
  { code: '641', name: 'Impôts, taxes et versements assimilés', classCode: '6' },
  { code: '661', name: 'Charges d\'intérêts bancaires', classCode: '6' },
  { code: '681', name: 'Dotations aux amortissements et dépréciations d\'actifs non courants', classCode: '6' },
  { code: '685', name: 'Dotations aux dépréciations et provisions - actifs courants', classCode: '6' },

  // CLASSE 7
  { code: '700', name: 'Ventes de marchandises', classCode: '7' },
  { code: '701', name: 'Ventes de produits finis', classCode: '7' },
  { code: '706', name: 'Prestations de services rendues', classCode: '7' },
  { code: '740', name: 'Subventions d\'exploitation', classCode: '7' },
  { code: '768', name: 'Autres produits financiers', classCode: '7' },
  { code: '781', name: 'Reprises sur amortissements et dépréciations', classCode: '7' }
];
