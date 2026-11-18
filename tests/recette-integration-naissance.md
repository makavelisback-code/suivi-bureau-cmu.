# Recette d'intégration CMU — date de naissance (environnement autorisé)

## Prérequis
- Utiliser un compte agent habilité et un établissement de test autorisé.
- Ne jamais utiliser de données personnelles réelles dans ce test.
- Tester uniquement sur la branche de développement; ne pas fusionner avant validation.
- Numéro fictif unique : `TEST-CMU-QR-YYYYMMDD-001` (remplacer YYYYMMDD par la date).

## Scénario
1. Ouvrir V15.6 de développement, se connecter à l'établissement de test.
2. Créer un adhérent fictif : nom TESTCMU, prénoms DEMO, immatriculation TEST-CMU-QR-YYYYMMDD-001, date de naissance 2000-02-29; sélectionner les autres champs obligatoires.
3. Vérifier que la sauvegarde ne signale aucune erreur et que la synchronisation affiche « Synchronisé ✓ ».
4. Recharger la page; rechercher le numéro fictif, ouvrir la fiche en modification et vérifier que la date vaut 2000-02-29.
5. Sur un second navigateur/appareil avec un compte autorisé pour le même établissement, se connecter, retrouver le dossier et vérifier les quatre champs.
6. Modifier la date en 2001-03-01, attendre la synchronisation et vérifier sur le premier navigateur après rechargement.
7. Tenter une date future : l'application doit refuser l'enregistrement.
8. Supprimer le dossier fictif uniquement après confirmation de la synchronisation et vérifier sa disparition sur les deux appareils.

## Critères de réussite
- Les quatre champs restent identiques après création, synchronisation et relecture.
- Aucune erreur Supabase; aucun doublon.
- Une date inconnue reste vide; une date future est rejetée.
- Aucune donnée d'un autre établissement n'est visible.
- Le test n'a pas modifié de dossier réel.

## Précaution
La migration `birth_date` est appliquée en base, mais les tests GitHub sont statiques et simulés. Cette recette est nécessaire avant fusion de la branche et déploiement public.
