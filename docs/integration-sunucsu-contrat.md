# Intégration SunuCSU — contrat de données et règles de sécurité

Statut : **préparation technique uniquement**. Aucun accès API officiel confirmé, aucune récupération automatique active.

## Objectif
À partir du QR de la carte EDIRAMU, récupérer auprès d'un service SunuCSU **autorisé** les champs :
- `registration_number` : numéro d'immatriculation (distinct du code assuré).
- `last_name` : nom.
- `first_names` : prénoms.
- `birth_date` : date de naissance (YYYY-MM-DD).
- `coverage_start` : début de couverture (YYYY-MM-DD).
- `coverage_end` : fin de couverture (YYYY-MM-DD).
- `official_status` : statut retourné par l'organisme, si disponible.
- `verified_at` : horodatage de la vérification.
- `source` : service officiel consulté.

## États de l'interface
- **Non vérifiée** : aucun résultat officiel reçu.
- **Valide** : résultat officiel positif, cohérent avec les dates de couverture.
- **Expirée** : date de fin antérieure à la date locale de vérification, ou statut officiel explicite.
- **À vérifier** : réponse inaccessible, incohérente, périmée ou ambiguë. Ne jamais assimiler une erreur réseau à une expiration.

Le nom, les prénoms et la date de naissance ne doivent jamais être déduits du seul numéro d'immatriculation.

## Sécurité
- Scanner uniquement `http://carte.sencsu.sn`, `https://carte.sencsu.sn`, `http://scancarte.sunucsu.sn` et `https://scancarte.sunucsu.sn`, puis générer le lien de vérification **HTTPS**.
- Ne pas transmettre le code assuré à la place du numéro d'immatriculation.
- Authentification des agents et contrôle de leur établissement avant toute consultation de données personnelles.
- Pas de secret API dans GitHub Pages ou le JavaScript public : si une API est autorisée, passer par un serveur sécurisé et limiter les journaux.
- Ne pas stocker les réponses de patients dans les tests GitHub ou des traces de diagnostic.
- Pas de scraping ou de contournement d'accès au portail.

## Points à confirmer avec SunuCSU
1. Existence d'une API officielle de vérification d'immatriculation et de couverture.
2. Autorisation et convention d'accès pour EPS1 Mbour.
3. Authentification, quotas, sécurité et format des champs.
4. Définition officielle de « valide », « expirée » et des dates de couverture.
5. Règles de conservation et de journalisation des consultations.

## Critères d'acceptation
- Scanner une fois, afficher l'identité et la couverture sans ressaisie **seulement après réponse officielle**.
- Si la réponse échoue, afficher « À vérifier » et ouvrir la vérification manuelle HTTPS.
- Vérifier la séparation des établissements, les droits des agents et la non-divulgation des données.
- Tester uniquement sur un environnement autorisé, avec des identités fictives ou des données de test fournies par l'organisme.
- Pas de fusion en production sans validation fonctionnelle et autorisation explicite.
