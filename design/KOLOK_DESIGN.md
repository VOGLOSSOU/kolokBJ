<!-- Instructions pour l'agent de code : applique cette charte à toute l'interface de Kolok (React + Vite). Importe kolok-tokens.css une seule fois au point d'entrée (main.jsx) et utilise uniquement ses variables CSS (var(--terre), var(--space-4), var(--radius-md)...). Aucune couleur, taille ou espacement en dur. Les valeurs exactes sont aussi dans kolok-tokens.json. -->

# Kolok - charte graphique

Kolok aide les étudiants du Bénin à trouver un colocataire fiable et compatible. Tout a commencé à Zogbadjè, près du campus d'Abomey-Calavi, avec un constat simple : les chambres coûtent cher, les groupes Facebook débordent d'annonces d'agents, et deux étudiants qui pourraient très bien vivre ensemble ne se trouvent jamais.

La charte traduit une promesse : **ici, tu tombes sur quelqu'un de confiance, qui vit comme toi.** Chaque choix visuel sert cette promesse. Le bleu nuit rassure, la terre de barre rappelle d'où on vient, et les formes arrondies disent "on est entre étudiants, détends-toi".

## Personnalité

- **Fiable** avant tout. Kolok doit avoir l'air plus sérieux qu'un groupe Facebook, sans avoir l'air d'une banque.
- **Chaleureux et local.** On parle comme un grand frère du campus, pas comme une administration.
- **Simple.** Un écran, une action. Les étudiants arrivent depuis WhatsApp ou Facebook, sur un petit Android, avec une connexion moyenne.

## Couleurs

La palette part de deux couleurs fortes et d'un fond chaud.

| Rôle | Token | Pourquoi |
| --- | --- | --- |
| Marque | `terre` | La terre de barre, ce rouge-orangé des pistes du sud Bénin. Chaleur, ancrage local, énergie. |
| Confiance | `ink` (bleu nuit) | Couleur du texte et des titres. Sérieux, calme, lisible. |
| Validé | `vert` | Réservé au badge Profil validé et aux colocs confirmées. S'il apparaît, c'est une bonne nouvelle. |
| Accent | `soleil` | Une touche de jaune pour la nouveauté et les illustrations, jamais pour du texte. |
| Fond | `surface` | Un blanc cassé chaud, plus doux que le blanc pur et moins fatigant à l'écran. |

Règles d'usage :

- **Un seul bouton `terre` par écran**, pour l'action principale ("Proposer une coloc", "Créer mon profil"). Les autres boutons sont en contour `ink`.
- Le texte sur `terre` est toujours `on-terre`. Le texte de marque sur fond clair ou sur `terre-soft` est `terre-ink`, jamais `terre` (contraste trop faible).
- `vert` ne sert jamais à décorer. Il veut dire "validé" ou "réussi", point.
- `danger` est réservé aux erreurs, signalements et bannissements.
- Tous les textes respectent un contraste d'au moins 4,5:1 dans les deux thèmes, clair et sombre.

## Typographie

Une seule famille : **Plus Jakarta Sans** (Google Fonts, gratuite). Ronde, moderne, très lisible sur petit écran, avec une graisse 800 qui donne du caractère aux titres.

- `display` (40/44, 800) : écran d'accueil et grands chiffres, comme le score de compatibilité.
- `title-1` (28/34, 700) et `title-2` (20/28, 700) : titres d'écrans et de sections.
- `body` (16/24) : tout le texte courant. Jamais moins de 16px pour le texte de lecture sur mobile.
- `small` (14/20) : infos secondaires d'une carte (filière, quartier).
- `caption` (12/16, 600) : badges et tags uniquement.

## Formes et espacements

- **Tout est arrondi.** Cartes et boutons en `radius-md` (16px), badges et tags en `radius-pill`. Pas d'angles vifs : Kolok doit paraître accueillant.
- Grille de 4px. Les cartes ont un padding `space-4`, les écrans une marge latérale `space-4`, les sections sont séparées par `space-8`.
- Pas d'ombres portées lourdes : une carte se distingue par `surface-raised` et une bordure `line`.

## Le logo

"kolok" en minuscules, en Plus Jakarta Sans 800, couleur `ink`, ou `on-terre` sur fond `terre`.

L'idée forte : **kolok est un palindrome**. Il se lit pareil dans les deux sens, comme deux colocataires qui se trouvent à égalité. Les deux "o" deviennent deux cercles qui se chevauchent légèrement, l'un `terre`, l'autre `ink` : deux personnes, un même logement. Ce motif de deux cercles qui se touchent sert aussi de pictogramme seul (icône de l'appli, favicon).

Aucun fichier de logo n'existe encore : cette description est la référence en attendant le vrai dessin.

## Iconographie

- Icônes au trait, 24px, trait de 1,75px, bouts arrondis. Une bibliothèque libre comme Lucide colle bien.
- Couleur `ink` par défaut, `terre-ink` pour une icône active.
- Pas d'emojis dans l'interface ni dans les textes de Kolok.
- Pas de photos de banque d'images. Les seules photos sont celles des étudiants sur leur profil.

## Voix et ton

- **Tutoiement**, toujours. "Trouve ton coloc", pas "Trouvez votre colocataire".
- Phrases courtes, mots du quotidien : entrée-couchée, chambre-salon, sanitaire, Zogbadjè, Tankpè.
- Les montants en FCFA, écrits "15 000 F".
- Rassurer sans promettre ce qu'on ne fait pas encore : "Chaque profil est relu avant d'être visible", pas "100 % sécurisé".
- Exemples :
  - Bouton : "Proposer une coloc", "Créer mon profil", "Signaler".
  - Message vide : "Personne ne correspond encore à tes critères. Élargis ton quartier ou ton budget."
  - Confirmation : "C'est fait. Arsène a reçu ta demande."

## Composants clés à construire

Pas encore de code, mais voici les éléments qui reviendront partout dans la web app :

- **Carte de profil** : photo ronde, prénom en `title-2`, filière et université en `small` `ink-muted`, tags de quartier en `terre-soft`, budget, score de compatibilité, et bouton "Proposer une coloc".
- **Badge Profil validé** : pastille `vert-soft` avec texte `vert` et une petite coche. Le seul élément vert de l'écran.
- **Score de compatibilité** : un chiffre sur 100 en `display` dans un cercle `radius-pill`. `vert` au-dessus de 75, `ink` sinon. Jamais de rouge : un score bas n'est pas une faute.
- **Bouton principal** : fond `terre`, texte `on-terre`, `radius-md`, 48px de haut minimum pour le pouce.
- **Bouton secondaire** : contour `ink`, fond transparent.
- **Tag de quartier** : `terre-soft`, texte `terre-ink`, `radius-pill`, `caption`.

## À faire et à éviter

- À faire : beaucoup de blanc (`surface`), une seule action forte par écran, des textes courts.
- À faire : tester chaque écran sur un vrai téléphone Android d'entrée de gamme.
- À éviter : les dégradés bleu-violet, les cartes avec une barre de couleur à gauche, les emojis.
- À éviter : `terre` partout. Si tout est orange, plus rien n'est important.
