# Public API Endpoints

## GET /api/settings/hero
- **Purpose**: Fetch public hero section content.
- **Source**: `SiteSetting` model (key: "hero")
- **Example Response**:
```json
{
  "hero": {
    "name": "Syah Putra Nugraha",
    "roles": ["Full Stack Web Developer"],
    "title": "Building Digital Experiences with Precision.",
    "subtitle": "Specialist in web application development...",
    "primaryCtaLabel": "View Projects",
    "secondaryCtaLabel": "Download CV",
    "resumeUrl": "/CV_Syah_Putra_Nugraha.pdf"
  }
}
```
- **Consumed by**: `webstrip/src/pages/Home.jsx`
- **Status**: Done

## GET /api/settings/profile
- **Purpose**: Fetch public profile/about me content.
- **Source**: `SiteSetting` model (key: "profile")
- **Example Response**:
```json
{
  "profile": {
    "aboutTitle": "About Me",
    "summaryTitle": "Professional Summary",
    "summary": "Full Stack Web Developer...",
    "avatarUrl": "",
    "resumeUrl": "/CV_Syah_Putra_Nugraha.pdf"
  }
}
```
- **Consumed by**: `webstrip/src/pages/About.jsx`
- **Status**: Done

## GET /api/education
- **Purpose**: Fetch list of active education history.
- **Source**: `Education` model
- **Example Response**:
```json
{
  "education": [
    {
      "id": "cuid...",
      "school": "SMK Negeri 1 Cimahi",
      "degree": "Rekayasa Perangkat Lunak",
      "period": "2013 - 2017",
      "description": "",
      "sortOrder": 0,
      "isActive": true
    }
  ]
}
```
- **Consumed by**: `webstrip/src/pages/About.jsx`
- **Status**: Done

## GET /api/projects
- **Purpose**: Fetch featured and active projects.
- **Source**: `Project` model
- **Example Response**:
```json
{
  "projects": [
    {
      "id": "cuid...",
      "title": "Construction App",
      "subtitle": "Rumahku",
      "techStack": ["React", "Node.js"],
      "description": "...",
      "featured": true,
      "visible": true
    }
  ]
}
```
- **Consumed by**: `webstrip/src/pages/Projects.jsx`
- **Status**: Done

## GET /api/experiences
- **Purpose**: Fetch professional experience history.
- **Source**: `Experience` model
- **Example Response**: Needs Audit
- **Consumed by**: `webstrip/src/pages/Experience.jsx`
- **Status**: Partial (Frontend currently using fallback map)

## GET /api/certifications
- **Purpose**: Fetch acquired certifications.
- **Source**: `Certification` model
- **Example Response**: Needs Audit
- **Consumed by**: `webstrip/src/pages/Experience.jsx`
- **Status**: Partial (Frontend currently using fallback map)

## GET /api/skills
- **Purpose**: Fetch list of technical/soft skills.
- **Source**: `Skill` model
- **Example Response**: Needs Audit
- **Consumed by**: `webstrip/src/pages/About.jsx`
- **Status**: Done

## GET /api/settings/contact (atau GET /api/contact)
- **Purpose**: Fetch public contact details.
- **Source**: `SiteSetting` model (key: "contact")
- **Example Response**: Needs Audit
- **Consumed by**: `webstrip/src/pages/Contact.jsx`, `webstrip/src/pages/About.jsx`
- **Status**: Done
