# Recette CMU V15.6 — validation gratuite et sans données patients

## Niveau 1 — Vérifications automatisées (sans Supabase)
- Exécuter le workflow GitHub Actions « Vérification scanner QR CMU » sur la PR #2.
- Vérifier les scénarios : QR officiel, QR malveillant, saisie manuelle, code assuré distinct de l'immatriculation, date de naissance, doublons, reconnexion et séparation locale des établissements.
- Un statut vert valide uniquement ces tests simulés, pas une synchronisation réelle.

## Niveau 2 — Recette manuelle sur téléphone (lecture seule)
1. Ouvrir la page de test du formulaire : https://makavelisback-code.github.io/suivi-bureau-cmu./test-formulaire-qr-cmu.html
2. Vérifier les champs **Nom**, **Prénoms**, **Numéro d'immatriculation** et **Date de naissance**. Le code assuré ne doit pas se substituer à l'immatriculation.
3. Tester avec une chaîne fictive `Z8991E3303` (exemple technique, **ne pas présumer qu'elle appartient à un patient réel**) et le lien fictif `https://carte.sencsu.sn/?code=TEST1234`. Ne pas rechercher de personne réelle sur le portail officiel.
4. Vérifier qu'un QR ou lien non autorisé est refusé, que la saisie manuelle est possible et que le lien de vérification utilise seulement un domaine officiel.
5. Tester une date bissextile valide (2000-02-29), une date impossible (2001-02-29) et une date future.
6. **Ne pas se connecter à Supabase ni enregistrer de dossier** pendant cette recette de démonstration.

## Niveau 3 — Synchronisation réelle (non autorisée pour le moment)
- À réaliser ultérieurement **uniquement** avec un compte agent et un établissement de test explicitement autorisés, sans données réelles, et après vérification de l'isolation.
- Créer un dossier fictif, vérifier sur deux appareils, modifier puis supprimer le dossier de test.
- Ne jamais lancer ce scénario dans la table de production des patients.
- Aucun environnement Supabase payant ne doit être créé sans nouvel accord.

## Critères avant déploiement
- Tests automatisés verts.
- Recette sur téléphone validée.
- Synchronisation réelle et droits d'accès validés dans un environnement autorisé.
- Validation explicite de l'utilisateur avant fusion et déploiement.
