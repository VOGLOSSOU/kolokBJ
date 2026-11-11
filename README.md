# Kolok - frontend

Web app mobile-first (PWA) qui aide les étudiants béninois à trouver un colocataire fiable et compatible. Le cahier des charges du MVP est dans [docs/kolokBJ.pdf](docs/kolokBJ.pdf).

Stack : React 19, Vite, TypeScript, Tailwind CSS 4, React Router, TanStack Query, vite-plugin-pwa.

## Démarrer

```bash
npm install
cp .env.example .env.local
npm run dev
```

| Commande          | Rôle                                        |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Serveur de développement                    |
| `npm run build`   | Vérification des types + build de production |
| `npm run preview` | Sert le build (pour tester la PWA)          |
| `npm run lint`    | Lint (oxlint)                               |

## Travailler sans backend

Avec `VITE_API_MOCK=true` dans `.env.local`, la session est simulée dans le navigateur. Une petite barre « Démo » en bas à droite permet de changer l'étape de l'utilisateur fictif (non connecté, en attente, rejeté, banni, validé, admin) pour voir chaque écran.

Pour brancher le vrai backend : `VITE_API_MOCK=false`, `VITE_GOOGLE_CLIENT_ID` renseigné, et `API_PROXY_TARGET` pointé sur Express. En dev, Vite relaie `/api` vers Express, ce qui garde le cookie de session sur la même origine.

Les routes d'API utilisées par le front sont une proposition, pas encore validée avec le backend. Elles sont regroupées dans `src/features/auth/api.ts`, et les types dans `src/types/domain.ts`.

## Organisation

```
src/
  app/          routeur, gardes de routes, client TanStack Query, barre de démo
  features/     logique par domaine (auth : session, étapes, appels API, bouton Google)
  pages/        un fichier par écran, chargé à la demande
  components/   composants partagés (ui/, layout/)
  lib/          client API, variables d'environnement, formats (FCFA, numéros béninois)
  types/        types métier partagés avec l'API
```

## Règles du projet

- **La logique métier reste dans l'API** (matching, score, quotas). Le front affiche, pour que l'API serve telle quelle à la future appli mobile.
- **L'étape de l'utilisateur décide des écrans accessibles.** Elle est calculée dans `src/features/auth/stage.ts` et appliquée par `src/app/guards.tsx`. Un profil en attente, rejeté ou banni ne voit aucun autre profil.
- **La charte graphique est dans [design/](design/)** : `KOLOK_DESIGN.md` (règles d'usage, ton, composants) et `kolok-tokens.css` (couleurs, typographie, espacements, rayons, thèmes clair et sombre). Les classes Tailwind sont branchées sur ces variables dans `src/index.css` : `bg-terre`, `text-ink-muted`, `type-title-1`, `rounded-md`, `p-4`... Aucune couleur, taille ou rayon en dur dans un composant, et les classes Tailwind hors charte (`bg-red-500`, `text-sm`, `rounded-xl`) n'existent pas.
- **Un seul bouton `primary` (terre) par écran.** Les autres sont `secondary` ou `ghost`.
- **Léger d'abord** : cible Android d'entrée de gamme en 3G. Police servie par l'appli (aucun appel externe), pages découpées, images en WebP.
