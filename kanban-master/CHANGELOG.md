# Changelog

All notable changes to this project will be documented in this file.

## [2026-05-04]
### Added
- **Mobile Navigation**: Added Hamburger Menu with Framer Motion animations, body scroll lock, and overlay.
- **Database-First Cleanup**: Fully decoupled business content from i18n files.
- **Standalone Fallback System**: Created modular fallback JS files for all portfolio data.
- **About Soft Skills API Sync**: Public profile now dynamically reads soft skills from API type `SOFT`.
- **Certifications CMS**: Admin interface and public display for certifications.
- **Experience CMS**: Admin interface and public display for work history.

### Fixed
- **Sync Audit**: Fixed mismatch in experience endpoint pluralization and contact path.
- **i18n Bloat**: Removed large business content blocks from `id.json`, `en.json`, and `jp.json`.
- **Build Integrity**: Verified `npm run build` success after major refactoring.

### Infrastructure
- **Kanban Master**: Reorganized project documentation into a centralized atomic control center.

## [Previous Milestones]
- **Education CMS**: CRUD and public display for education history.
- **Settings CMS**: Hero and Profile settings management.
- **Admin Dashboard**: Secure login and layout setup.
- **Core Backend**: Express + Prisma + PostgreSQL initialization.
- **Initial Frontend**: React + Vite + Tailwind/CSS foundation.
