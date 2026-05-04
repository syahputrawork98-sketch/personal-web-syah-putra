# Kanban Master - Project Control Center

Kanban Master is the central hub for project documentation, progress tracking, and system planning. It serves as the single source of truth for the entire development lifecycle.

## Project Workflow
The development follows a structured synchronization flow:
**Kanban Master (Planning/Docs)** -> **Backend (Express/API)** -> **Webstrip (Frontend/UI)**

Every feature must be documented here before, during, and after implementation to ensure consistency and maintainability.

## Document Organization
- **[STATUS.md](./STATUS.md)**: High-level overview of all project components.
- **[CHANGELOG.md](./CHANGELOG.md)**: Record of completed milestones and significant changes.
- **[NEXT-STEPS.md](./NEXT-STEPS.md)**: Immediate priorities and upcoming tasks.
- **[checklists/](./checklists/)**: Atomic task lists for every system module.
- **[maps/](./maps/)**: Technical mappings of APIs, data sources, and menu structures.
- **[audits/](./audits/)**: Historical and current system audits (HRD, Sync, Build).
- **[roadmap/](./roadmap/)**: Granular progress tracking (Done, Doing, Next, Backlog).

## Status Definitions
- 🟢 **Done**: Fully implemented, tested, and documented.
- 🟡 **Partial**: Partially implemented or missing specific sub-features.
- 🔵 **Planned**: Scheduled for implementation but not yet started.
- 🟠 **Needs Audit**: Implemented but requires verification or refinement.
- 🔴 **Blocked**: Implementation stopped due to external or technical dependencies.
