# Centre Dentaire El Hadri

Site vitrine du Centre Dentaire El Hadri (Salé), en français et en arabe.

- Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript
- Langues : `/fr` et `/ar` (RTL). La langue est choisie automatiquement (choix mémorisé, sinon langue du navigateur) et se change dans le header.
- Prise de rendez-vous : le formulaire ouvre WhatsApp avec la demande pré-remplie.

## Lancer le projet

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000.

## Où modifier le contenu

- Infos du cabinet (téléphones, adresse, coordonnées GPS, réseaux) : `src/lib/site.ts`
- Tous les textes : `src/i18n/dictionaries/fr.ts` et `ar.ts`

## À compléter avec le client

- Horaires d'ouverture (provisoires)
- Nom, parcours et photo du docteur
- Liste exacte des soins proposés
- Plus de photos du cabinet si besoin
- Confirmer que le 07 02 09 11 77 est sur WhatsApp
