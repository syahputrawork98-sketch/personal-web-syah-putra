# Admin Protected API Endpoints

*All endpoints below require a valid JWT token in the Authorization header.*

## Auth Login
- **Method**: POST
- **Path**: `/api/auth/login`
- **Auth required**: No
- **Used by admin page**: `Login.jsx`
- **Status**: Done

## Admin Projects CRUD
- **Method**: GET, POST, PUT, DELETE
- **Path**: `/api/admin/projects` (and `/:id`)
- **Auth required**: Yes
- **Used by admin page**: `AdminProjects.jsx`
- **Status**: Done

## Admin Settings (Hero/Profile)
- **Method**: GET, PUT
- **Path**: `/api/admin/settings/hero`, `/api/admin/settings/profile`
- **Auth required**: Yes
- **Used by admin page**: `AdminHeroSettings.jsx`, `AdminProfileSettings.jsx`
- **Status**: Done

## Admin Education CRUD
- **Method**: GET, POST, PUT, DELETE
- **Path**: `/api/admin/education` (and `/:id`)
- **Auth required**: Yes
- **Used by admin page**: `AdminEducation.jsx`
- **Status**: Done

## Admin Experience CRUD
- **Method**: Needs Audit
- **Path**: `/api/admin/experiences`
- **Auth required**: Yes
- **Status**: Needs Audit

## Admin Certifications CRUD
- **Method**: Needs Audit
- **Path**: `/api/admin/certifications`
- **Auth required**: Yes
- **Status**: Needs Audit

## Admin Skills CRUD
- **Method**: Needs Audit
- **Path**: `/api/admin/skills`
- **Auth required**: Yes
- **Status**: Needs Audit

## Admin Contact/Settings
- **Method**: Needs Audit
- **Status**: Needs Audit

## Account/Admin User Settings
- **Method**: Needs Audit
- **Status**: Needs Audit
