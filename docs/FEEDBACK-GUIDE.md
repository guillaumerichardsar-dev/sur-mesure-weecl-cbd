# Sur-Mesure WEECL — Guide de feedback prototype

Merci de tester le prototype. C'est une version très en amont du produit
final : votre feedback nous aide à valider ou corriger les hypothèses UX,
copy, et logique produit avant d'investir dans le MVP réel (8-10 semaines
de développement).

## Ce qui EST cliquable
- 6 starters (Soir, Calme, Confort musculaire, Matin, Équilibre, Brut)
- Choix d'intensité (5, 10, 15, 20%)
- Choix de format (huile / vape)
- Choix de base (huile : MCT / Hemp / Olive) ou d'arôme (vape : Neutre /
  Citrus / Menthe / Herbacé)
- Multi-flacon avec écran bridge (auto-same / custom / skip)
- Récap avec prix indicatif live
- Form coordonnées + soumission fictive → page merci

## Ce qui N'EST PAS cliquable
- Aucun paiement PayGreen — le submit ne fait qu'un log console
- Aucun email envoyé — pas de suivi J+21, pas de confirmation
- Aucun espace client réel
- Prix affichés = indicatifs, ronds, non contractuels

## Points à observer / commenter

### UX
- Le flow "compose une formule signature puis choisis le format" est-il
  intuitif ?
- L'écran bridge (ajouter un flacon complémentaire) est-il compris ?
  Trop friction ? Trop léger ?
- La modal de mapping vape (concentrations 15%/20% → 7.5%/10% vape) est
  bien reçue ou ressentie comme paternaliste ?
- Confort musculaire grisé en vape : le message est clair ou frustrant ?

### Copy
- Le ton (formulateur scientifique, vocabulaire sensoriel) sonne juste ou
  trop clinique ?
- Les descriptions sensorielles des starters donnent envie ou restent
  abstraites ?
- Les mentions cosmétique buccal / vape / faible puissance sont
  suffisamment claires ?
- Y a-t-il un mot ambigu qui pourrait poser problème DGCCRF / ANSES ?

### Produit
- Est-ce que les 6 starters couvrent bien les besoins B2C attendus ?
- L'idée duo huile + vape (immédiateté + durée) parle-t-elle ?
- Les prix indicatifs (45-159 € TTC selon config) sont-ils cohérents avec
  la cible premium ?

## Sécurité et confidentialité — à savoir avant de tester

- Ce que vous saisissez dans le formulaire final (nom, email, téléphone,
  choix de formulation) est loggé côté serveur dans les logs Vercel
  Functions, à des fins d'audit du prototype uniquement. Ce n'est pas un
  vrai formulaire de collecte : évitez d'y mettre des informations
  sensibles ou que vous ne souhaitez pas voir apparaître dans un log.
- Aucun paiement réel n'est déclenché, aucune commande n'est créée, aucun
  email n'est envoyé. Tout le flux est fictif de bout en bout.
- Le prototype fonctionne entièrement sur des données mockées (prix,
  stock, formulations) — rien n'est connecté à un système de production.

## Bugs connus / limitations V0

- La sidebar de prix live passe en pleine largeur sur mobile (pas de
  bandeau sticky en bas d'écran).
- Aucun paiement réel — le devis fictif se termine sur `/merci`.
- Aucune persistance — pas de compte, pas d'historique, pas de sauvegarde
  de la configuration en cours.
- Formats vape reportés en V2 : flacon 10 ml PG et pod prêt-à-vaper (la V0
  ne propose que le format 30 ml chubby).
- Starter Confort musculaire indisponible en vape, reporté en V2.

## Comment donner votre feedback

- Email : guillaume@weecl.com
- Slack WEECL : #sur-mesure-prototype (si canal ouvert)
- Enregistrement d'écran commenté (Loom) : bienvenu pour l'UX

Merci !
