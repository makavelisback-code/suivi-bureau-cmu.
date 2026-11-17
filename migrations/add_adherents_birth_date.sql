-- Migration préparée pour validation avant exécution en production.
-- Ajouter la date de naissance sans modifier les lignes existantes.
ALTER TABLE public.adherents
  ADD COLUMN IF NOT EXISTS birth_date date;
COMMENT ON COLUMN public.adherents.birth_date IS 'Date de naissance du bénéficiaire, vérifiée sur une source officielle ou saisie par un agent autorisé.';
-- Vérification après migration :
-- SELECT column_name, data_type FROM information_schema.columns
-- WHERE table_schema='public' AND table_name='adherents' AND column_name='birth_date';
