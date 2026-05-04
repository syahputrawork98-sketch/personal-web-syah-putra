# System Architecture

## Overview
The system relies on a database-driven architecture to separate content management from the frontend presentation layer.

**Data Flow**:
`Admin Dashboard` → `Backend API` → `Public Web`

## Tech Stack
- **Frontend**: React + Vite (located in `webstrip/`)
- **Backend**: Express.js (REST API, located in `backend/`)
- **Database**: PostgreSQL with Prisma ORM
- **State Management**: React Context & Hooks
