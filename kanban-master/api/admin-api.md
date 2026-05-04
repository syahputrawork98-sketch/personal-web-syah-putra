# Admin API Endpoints

*Semua endpoint di bawah ini (kecuali login) dilindungi oleh middleware `requireAdmin` (JWT Auth).*

## Auth
- **Method**: POST
- **Path**: `/api/auth/login`
- **Auth required**: No
- **Used by admin page**: `/admin/login`
- **Status**: Done

## Projects
- **Method**: GET, POST, PUT, DELETE
- **Path**: `/api/admin/projects` (and `/:id`)
- **Auth required**: Yes
- **Used by admin page**: `AdminProjects.jsx`
- **Status**: Done

## Hero Settings
- **Method**: GET, PUT
- **Path**: `/api/admin/settings/hero`
- **Auth required**: Yes
- **Used by admin page**: `AdminHeroSettings.jsx`
- **Status**: Done

## Profile Settings
- **Method**: GET, PUT
- **Path**: `/api/admin/settings/profile`
- **Auth required**: Yes
- **Used by admin page**: `AdminProfileSettings.jsx`
- **Status**: Done

## Education
- **Method**: GET, POST, PUT, DELETE
- **Path**: `/api/admin/education` (and `/:id`)
- **Auth required**: Yes
- **Used by admin page**: `AdminEducation.jsx`
- **Status**: Done

## Experience
- **Method**: GET, POST, PUT, DELETE
- **Path**: `/api/admin/experiences` (and `/:id`)
- **Auth required**: Yes
- **Used by admin page**: N/A (Admin page planned)
- **Status**: Partial

## Certifications
- **Method**: GET, POST, PUT, DELETE
- **Path**: `/api/admin/certifications` (and `/:id`)
- **Auth required**: Yes
- **Used by admin page**: `AdminCertifications.jsx` (and Create/Edit)
- **Status**: Needs Audit

## Skills
- **Method**: GET, POST, PUT, DELETE
- **Path**: `/api/admin/skills` (and `/:id`)
- **Auth required**: Yes
- **Used by admin page**: `AdminSkills.jsx`
- **Status**: Partial (Needs grouping/tab features)

## Contact / Settings
- **Method**: GET, PUT
- **Path**: `/api/admin/settings/contact`
- **Auth required**: Yes
- **Used by admin page**: N/A (Admin page planned)
- **Status**: Planned

## Account Settings
- **Method**: GET, PUT
- **Path**: `/api/admin/account`
- **Auth required**: Yes
- **Used by admin page**: `AdminAccount.jsx` (If exists)
- **Status**: Planned / Needs Audit
