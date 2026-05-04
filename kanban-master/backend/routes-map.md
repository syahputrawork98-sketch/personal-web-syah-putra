# Backend Routes Map

| Route file | Base path | Controller | Auth | Feature | Status |
| :--- | :--- | :--- | :---: | :--- | :---: |
| `auth.routes.js` | `/api/auth` | `auth.controller` | No | Login Admin | Done |
| `projects.routes.js` | `/api/projects` | `projects.controller` | No | Public Projects | Done |
| `admin/projects.routes.js` | `/api/admin/projects`| `projects.controller` | Yes | Admin Projects CRUD | Done |
| `settings.routes.js` | `/api/settings` | `settings.controller` | No | Public Settings | Done |
| `admin/settings.routes.js` | `/api/admin/settings`| `settings.controller` | Yes | Admin Settings CRUD | Done |
| `education.routes.js` | `/api/education` | `education.controller`| No | Public Education | Done |
| `admin/education.routes.js` | `/api/admin/education`| `education.controller`| Yes | Admin Education CRUD | Done |

*Catatan: Routes untuk Experience, Skills, Certifications, dan Account masih memerlukan audit detail (Needs Audit).*
