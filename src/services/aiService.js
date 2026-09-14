// AI Assistant service for answering accounting & audit questions based on Algerian SCF (Loi 07-11)
export const askAIAssistant = async (prompt) => {
  const lower = prompt.toLowerCase();

  // Simulated smart response generator for accounting queries
  if (lower.includes('bilan') || lower.includes('actif') || lower.includes('passif')) {
    return `Dans le **Système Comptable Financier (SCF Algérie)**, le Bilan est un état financier synthétique représentant le patrimoine de l'entreprise à une date donnée.
    
• **Actif** : Représente les emplois des ressources (Actifs non courants : immobilisations ; Actifs courants : stocks, clients, trésorerie).
• **Passif** : Représente l'origine des ressources (Capitaux propres : capital, réserves, résultat ; Passifs non courants : emprunts ; Passifs courants : fournisseurs, dettes fiscales/sociales).

**Égalité fondamentale :**
$$\\text{TOTAL ACTIF} = \\text{TOTAL PASSIF}$$`;
  }

  if (lower.includes('débit') || lower.includes('débit/crédit') || lower.includes('partie double') || lower.includes('credit')) {
    return `Règle d'or de la **Partie Double en Comptabilité Algérienne** :
    
1. **Comptes d'Actif & de Charges (Classes 2, 3, 41, 5, 6)** :
   - Augmentent au **DÉBIT** (+).
   - Diminuent au **CRÉDIT** (-).

2. **Comptes de Passif, Capitaux & Produits (Classes 1, 40, 7)** :
   - Augmentent au **CRÉDIT** (+).
   - Diminuent au **DÉBIT** (-).

Pour chaque écriture : **Total Débits = Total Crédits**.`;
  }

  if (lower.includes('tva') || lower.includes('g50') || lower.includes('taxe')) {
    return `La **TVA (Taxe sur la Valeur Ajoutée)** en Algérie :
    
• **TVA Collectée (Compte 4457)** : Collectée sur les ventes effectuées (19% taux normal, 9% taux réduit).
• **TVA Déductible (Compte 4456)** : Payée sur les achats de marchandises, matières et services.
• **Déclaration G50** : À déposer mensuellement avant le 20 du mois suivant.
$$\\text{TVA à payer} = \\text{TVA Collectée} - \\text{TVA Déductible}$$`;
  }

  if (lower.includes('isa') || lower.includes('audit') || lower.includes('seuil')) {
    return `Selon la norme **ISA 320 (Seuil de Signification)** :
L'auditeur doit déterminer le seuil de signification pour l'ensemble des états financiers afin d'évaluer si les anomalies non corrigées ont un impact significatif sur l'image fidèle des comptes.

Le seuil est généralement calculé sur :
- 0.5% à 1% du Chiffre d'Affaires HT, ou
- 5% du Résultat Net avant Impôt.`;
  }

  return `Merci pour votre question ! En tant qu'**IA Comptable Algérienne (SCF - Loi 07-11)**, je suis là pour vous guider.
  
Pour la notion de **${prompt}**, souvenez-vous que le SCF organise la comptabilité selon le Plan Comptable National (7 classes) et impose le respect des principes d'image fidèle, de continuité d'exploitation et d'indépendance des exercices.

N'hésitez pas à lancer une simulation sur notre **Simulateur Comptable (Débit/Crédit)** pour pratiquer !`;
};
