# Public API Endpoints

## GET /api/settings/hero
- **Purpose**: Fetch hero section data (title, subtitle, roles, CTA).
- **Source model/table**: `SiteSetting`
- **Example response JSON**:
```json
{
  "hero": {
    "name": "Syah Putra Nugraha",
    "roles": ["Full Stack Developer", "..."],
    "title": "...",
    "subtitle": "...",
    "primaryCtaLabel": "...",
    "secondaryCtaLabel": "...",
    "resumeUrl": "..."
  }
}
```
- **Consumed by frontend page**: `Home.jsx`
- **Status**: Done

## GET /api/settings/profile
- **Purpose**: Fetch about me / profile summary data.
- **Source model/table**: `SiteSetting`
- **Example response JSON**:
```json
{
  "profile": {
    "aboutTitle": "...",
    "summaryTitle": "...",
    "summary": "...",
    "avatarUrl": "...",
    "resumeUrl": "..."
  }
}
```
- **Consumed by frontend page**: `About.jsx`
- **Status**: Done

## GET /api/education
- **Purpose**: Fetch academic history records.
- **Source model/table**: `Education`
- **Example response JSON**:
```json
{
  "education": [
    {
      "id": "...",
      "school": "...",
      "degree": "...",
      "period": "...",
      "description": "...",
      "sortOrder": 0,
      "isActive": true
    }
  ]
}
```
- **Consumed by frontend page**: `About.jsx`
- **Status**: Done

## GET /api/projects
- **Purpose**: Fetch all active and featured projects.
- **Source model/table**: `Project`
- **Consumed by frontend page**: `Projects.jsx`
- **Status**: Done

## GET /api/experience
- **Purpose**: Fetch work experience history.
- **Source model/table**: `Experience`
- **Consumed by frontend page**: `Experience.jsx`
- **Status**: Needs Audit

## GET /api/certifications
- **Purpose**: Fetch professional certifications.
- **Source model/table**: `Certification`
- **Consumed by frontend page**: `Experience.jsx`
- **Status**: Needs Audit

## GET /api/skills
- **Purpose**: Fetch technical and soft skills.
- **Source model/table**: `Skill`
- **Consumed by frontend page**: `About.jsx`
- **Status**: Done

## GET /api/contact
- **Purpose**: Fetch contact information details.
- **Source model/table**: `SiteSetting`
- **Consumed by frontend page**: `Contact.jsx`, `About.jsx`
- **Status**: Needs Audit
