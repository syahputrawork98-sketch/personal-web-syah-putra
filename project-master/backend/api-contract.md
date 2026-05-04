# API Contracts

## `GET /api/settings/hero`
**Response:**
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

## `GET /api/settings/profile`
**Response:**
```json
{
  "profile": {
    "aboutTitle": "About Me",
    "summaryTitle": "Professional Summary",
    "summary": "Full Stack Web Developer with experience...",
    "avatarUrl": "...",
    "resumeUrl": "/CV_Syah_Putra_Nugraha.pdf"
  }
}
```

## `GET /api/education`
**Response:**
```json
{
  "education": [
    {
      "id": "...",
      "school": "SMK Negeri 1 Cimahi",
      "degree": "Software Engineering",
      "period": "2013 - 2017",
      "description": "...",
      "sortOrder": 0,
      "isActive": true
    }
  ]
}
```
