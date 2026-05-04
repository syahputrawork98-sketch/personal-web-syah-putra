# i18n Removal Checklist (COMPLETED)

- [x] Remove `I18nContext` and `useI18n` hook
- [x] Delete `src/data/i18n.js` and `src/data/i18n/` folder
- [x] Remove language switcher from Navbar (desktop & mobile)
- [x] Hardcode Indonesian text for all UI labels (Nav, Buttons, Titles)
- [x] Set document root language to Indonesian (`lang="id"`)
- [x] Update Public Pages to Indonesian-only:
  - [x] Home
  - [x] About
  - [x] Projects
  - [x] Experience
  - [x] Contact
- [x] Update `ProjectCard.jsx` to handle multilingual DB objects with ID priority
- [x] Update `README.md` to reflect i18n removal
- [x] Verify production build (`npm run build`)

> [!NOTE]
> The i18n system was removed to stabilize the Database-First content strategy and prevent data conflicts between static JSON files and the API.
