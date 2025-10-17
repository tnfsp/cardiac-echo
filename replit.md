# Cardiac Ultrasound Examination Guide

## Overview

A clinical web application for conducting and documenting cardiac ultrasound examinations. The system guides healthcare professionals through a standardized examination workflow across multiple cardiac views (PLAX, PSAX, A4C, A2C/A3C/A5C, Subcostal), collecting measurements and assessments, and generating clinical summaries.

**Primary Users**: Healthcare professionals (cardiologists, sonographers) performing cardiac ultrasound examinations in hospital settings

**Key Features**:
- Step-by-step guided examination workflow with color-coded view headers
- Full-screen single-page navigation (no scrolling within views)
- Multi-view cardiac assessment (PLAX, PSAX, A4C, A2C/A3C/A5C, Subcostal)
- Intelligent valve detail assessment (auto-inserted when MR/MS/AR/AS >= Moderate)
- Auto-populated clinical summary based on examination findings
- Real-time data entry with validation
- Touch-optimized tablet/iPad interface (44px minimum touch targets)
- Google Sheets integration for automated report upload

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, using Vite as the build tool

**UI Component Library**: Shadcn/UI (New York variant) built on Radix UI primitives
- Design system follows clinical medical workflow patterns inspired by Epic and iPad medical apps
- Touch-first design with minimum 44px touch targets
- Mobile-first responsive layout optimized for tablets

**Styling**: 
- Tailwind CSS with custom medical-themed color palette
- CSS variables for theming (light mode focused)
- Clinical color scheme: Medical Blue (#0B5394), Approval Green (#34A853), Clinical White, Alert Red (#EA4335)
- Typography: Roboto/Open Sans for clinical legibility

**State Management**:
- Local component state using React hooks
- Form data managed in parent component (ExamPage) and passed down to view components
- No global state management library (Redux, Zustand, etc.)

**Routing**:
- Wouter for lightweight client-side routing
- Single-page application with step-based navigation

**Data Fetching**:
- TanStack Query (React Query) v5 configured for API interactions
- Query client configured with infinite stale time and no automatic refetching

**Key Design Patterns**:
- Controlled components for all form inputs
- Prop drilling for state management (parent owns data, children receive via props)
- Separation of concerns: view components (PLAXView, PSAXView, A4CView, etc.) handle presentation, parent (ExamPage) manages state
- Reusable form components: CheckboxGroup, MeasurementInput, SeveritySelect, ViewHeader
- Dynamic step insertion: Valve detail pages (AS, AR, MS, MR) are conditionally added based on severity selections
- Auto-population via useEffect: Summary fields automatically fill when entering summary view

### Backend Architecture

**Framework**: Express.js with TypeScript

**API Structure**:
- RESTful API design with `/api` prefix
- Routes registered in `server/routes.ts`
- Currently uses in-memory storage (MemStorage class)
- Modular storage interface (IStorage) allows easy migration to database

**Development Setup**:
- Vite dev server integrated with Express in development mode
- Hot module replacement (HMR) enabled
- Runtime error overlay for development

**Build Process**:
- Frontend: Vite builds to `dist/public`
- Backend: esbuild bundles server code to `dist`
- Production serves static files from Express

### Data Storage Solutions

**Current Implementation**: In-memory storage (MemStorage)
- Temporary user storage for development
- User model with id, username, password fields

**Database Schema** (Drizzle ORM):
- Configured for PostgreSQL via Drizzle Kit
- Schema defined in `shared/schema.ts`
- Users table with UUID primary key, unique username
- Migration files output to `./migrations`
- Environment variable `DATABASE_URL` required for database connection

**Database Driver**: 
- Neon Serverless PostgreSQL client (`@neondatabase/serverless`)
- Drizzle ORM v0.39.1 with Zod schema validation

**Session Management**:
- `connect-pg-simple` configured for PostgreSQL session storage
- Express session middleware expected (not yet implemented in codebase)

### External Dependencies

**Core Libraries**:
- React 18 with React DOM
- TypeScript for type safety
- Vite for development and building
- Express.js for server

**UI Component Library**:
- Radix UI primitives (accordion, dialog, select, checkbox, radio, etc.)
- shadcn/ui component patterns
- Lucide React for icons
- class-variance-authority and clsx for conditional styling
- cmdk for command palette functionality
- embla-carousel-react for carousels
- date-fns for date manipulation

**Form Management**:
- React Hook Form integration ready (`@hookform/resolvers`)
- Zod for schema validation (`drizzle-zod`)

**Database & ORM**:
- Drizzle ORM with PostgreSQL dialect
- Drizzle Kit for migrations
- Neon Serverless for serverless PostgreSQL

**Development Tools**:
- Replit-specific plugins for dev experience
- TSX for running TypeScript in Node
- ESBuild for production bundling
- PostCSS with Autoprefixer

**Design System**:
- Tailwind CSS v3
- Custom design tokens defined in `tailwind.config.ts`
- Google Fonts (Roboto, Open Sans)

**Production Considerations**:
- Environment-based configuration (NODE_ENV)
- Static file serving in production
- Database provisioning required (DATABASE_URL must be set)
- Session store needs PostgreSQL connection

## Recent Changes (October 17, 2025)

### UI/UX Improvements
- **Single-block full-screen navigation**: Each examination section (2D Assessment, M-mode, Color Doppler, Doppler) now displays as an independent full-screen page
- **Substep-based workflow**: 
  - PLAX divided into: 2D Assessment → M-mode → Color Doppler → Doppler (4 pages)
  - PSAX divided into: 2D Assessment → M-mode → Color Doppler → Doppler (4 pages)
  - A4C divided into: 2D Assessment → Color Doppler → Doppler (3 pages)
- **Color-coded headers**: Each substep displays VIEW name and section (e.g., "PLAX - 2D Assessment"):
  - PLAX substeps: Medical Blue (#0B5394)
  - PSAX substeps: Lighter Blue (#1155CC)
  - A4C substeps: Approval Green (#0B8043)
  - A2C/A3C/A5C: Orange (#B45F06)
  - Subcostal: Purple (#741B47)
  - Valve Details: Coral Red (#E67C73)
  - Summary: Success Green (#34A853)

### Smart Workflow Logic
- **Conditional valve assessment**: System automatically inserts detailed valve assessment pages (AS, AR, MS, MR) when corresponding severity is selected as Moderate or Severe
- **Dynamic step progression**: Navigation adapts based on clinical findings, ensuring thorough examination

### Auto-populated Summary
- **LV Function**: Auto-filled from A4C contraction status and Simpson EF
- **RV Function**: Auto-filled from RV contraction status and TAPSE measurement
- **Valvular Assessment**: Aggregates all valve findings (MR, MS, AR, AS, TR) from multiple views
- **Aorta/LA**: Combines aortic root and LA measurements from PLAX
- **Pericardium**: Auto-populates pericardial effusion status

### Form Input Improvements
- **PSAX Color Doppler dropdowns**: Changed PV/TV/AV color from text inputs to dropdown selects:
  - PV color: Normal | PS | PR
  - TV color: Normal | TR
  - AV color: Normal | AS | AR

### Implemented Views
1. **PLAX** (Parasternal Long Axis): 
   - 2D Assessment: AV/MV structure, pericardial effusion
   - M-mode: Aortic root, LA, LVOT, IVS, LVESd, LVPW, LVEDd
   - Color Doppler: MR, MS severity
   - Doppler: AR, AS severity
2. **PSAX** (Parasternal Short Axis):
   - 2D Assessment: AV structure, MV fish-mouth, LV papillary level, RVOT status, measurements
   - M-mode: LV FS% and level
   - Color Doppler: PV/TV/AV color dropdowns
   - Doppler: TR CW Vmax, RVSP
3. **A4C** (Apical 4 Chamber):
   - 2D Assessment: LV/RV size and contraction, Simpson EF, TAPSE, septal motion
   - Color Doppler: MS, MR, TR severity with measurements
   - Doppler: MV inflow, TR measurements, TDI, E/e' ratio
4. **Valve Details** (AS/AR/MS/MR): Condition-specific detailed measurements:
   - AS: LVOT VTI, AV velocities, gradients, AVA
   - AR: VC, Vmax, PHT
   - MS: Mean PG, PHT, MVA, fish-mouth assessment
   - MR: VC, PISA, EROA, pulmonary vein flow
5. **Summary**: Auto-populated clinical impression with manual override capability

### Pending Views
- A2C/A3C/A5C: Placeholder (form structure ready)
- Subcostal: Placeholder (form structure ready)