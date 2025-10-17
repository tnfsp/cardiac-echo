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

### Major System Refactoring
- **Comprehensive workflow expansion**: System now supports 29+ examination steps (up from 12 base steps)
- **Granular page splitting**: Each measurement group displays as an independent full-screen page with no scrolling
- **Fully implemented A2C/A3C/A5C and Subcostal views**: No longer placeholders
- **Conditional ASD/VSD detail assessment**: Automatically appears when septal defects detected

### UI/UX Improvements
- **Single-block full-screen navigation**: Each examination section displays as an independent full-screen page
- **Enhanced substep-based workflow**: 
  - **PLAX**: 6 pages (2D → M-mode Aortic/LA → M-mode LVOT → M-mode LV → Color → Doppler)
  - **PSAX**: 4 pages (2D → M-mode → Color → Doppler)
  - **A4C**: 6 pages (2D LV → 2D RV → Color → Doppler MV → Doppler TR → Doppler TDI)
  - **A2C/A3C/A5C**: 3 pages (2D → Color → Doppler)
  - **Subcostal**: 2 pages (ASD/VSD/Pericardium → IVC Assessment)
- **Color-coded headers**: Each substep displays VIEW name and section:
  - PLAX substeps: Medical Blue (#0B5394)
  - PSAX substeps: Lighter Blue (#1155CC)
  - A4C substeps: Approval Green (#0B8043)
  - A2C/A3C/A5C: Orange (#B45F06)
  - Subcostal: Purple (#741B47)
  - ASD/VSD Detail: Deep Purple (#6A1B9A)
  - Valve Details: Coral Red (#E67C73)
  - Summary: Success Green (#34A853)
- **Collapsible Patient Header**: 
  - Header starts in expanded view with all fields accessible
  - "收起" (Collapse) button appears after filling required fields (date, physician, patient ID, bed number)
  - User can manually choose to collapse the header to save screen space
  - Collapsed view shows patient info in single line with "編輯" (Edit) button to expand
  - Header remains expanded until user manually collapses it
- **Simplified Navigation Bar**: 
  - Top navigation shows only main VIEW labels (PLAX, PSAX, A4C, A2C/A3C/A5C, Subcostal, ASD/VSD Detail, Valve Details, Summary)
  - Substeps hidden from top bar to reduce clutter
  - Clicking main view navigates to first substep of that view
  - Current main view highlighted even when on substeps

### Smart Workflow Logic
- **Conditional valve assessment**: System automatically inserts detailed valve assessment pages (AS, AR, MS, MR) when corresponding severity is selected as Moderate or Severe
- **Conditional ASD/VSD detail**: Automatically adds detailed septal defect assessment when ASD or VSD defect is detected in Subcostal view
- **Dynamic step progression**: Navigation adapts based on clinical findings, ensuring thorough examination

### Auto-populated Summary
- **Display-only Summary Section**: All examination findings auto-populated and displayed as read-only text
- **LV Function**: Auto-filled from A4C contraction status and Simpson EF
- **RV Function**: Auto-filled from RV contraction status and TAPSE measurement
- **Valvular Assessment**: Aggregates all valve findings (MR, MS, AR, AS, TR) from PLAX, A4C, and A2C views
- **ASD/VSD**: Automatically populated when septal defects detected in Subcostal view
- **Aorta/LA**: Combines aortic root and LA measurements from PLAX
- **Pericardium**: Auto-populates pericardial effusion status from PLAX and Subcostal views
- **IVC/Volume Status**: Includes IVC measurements and volume assessment from Subcostal view
- **Notes Section**: Separate editable text area for free-form clinical notes and observations

### Form Input Improvements
- **PSAX Color Doppler dropdowns**: Changed PV/TV/AV color from text inputs to dropdown selects:
  - PV color: Normal | PS | PR
  - TV color: Normal | TR
  - AV color: Normal | AS | AR
- **A4C Color Doppler simplified**: Removed EROA/VC input fields from Color Doppler view
  - Detailed measurements moved to dedicated valve detail pages
  - Color view now focuses only on severity assessment

### Report Generation Features
- **Dual Report Functions**:
  1. **複製報告 (Copy Report)**: Generates formatted text report and copies to clipboard using Clipboard API
     - Includes patient info, summary findings, and detailed measurements
     - Formatted for easy pasting into LINE, messaging apps, or medical records
     - Shows success toast notification upon copy
  2. **上傳雲端 (Upload to Cloud)**: Uploads examination data to Google Sheets
     - Sends structured data for cloud storage and analysis
     - Shows success toast notification upon upload
- Both buttons available on Summary page after completing examination

### Implemented Views
1. **PLAX** (Parasternal Long Axis) - 6 pages:
   - 2D Assessment: AV/MV structure, pericardial effusion
   - M-mode Aortic/LA: Aortic root at diastolic, LA measurements
   - M-mode LVOT: LVOT diameter
   - M-mode LV: IVS, LVESd, LVPW, LVEDd
   - Color Doppler: MR, MS severity
   - Doppler: AR, AS severity

2. **PSAX** (Parasternal Short Axis) - 4 pages:
   - 2D Assessment: AV structure, MV fish-mouth, LV papillary level, RVOT status, measurements
   - M-mode: LV FS% and level
   - Color Doppler: PV/TV/AV color dropdowns
   - Doppler: TR CW Vmax, RVSP

3. **A4C** (Apical 4 Chamber) - 6 pages:
   - 2D LV: LV size, LV contraction, Simpson EF
   - 2D RV: RV size, RV contraction, TAPSE, septal motion
   - Color Doppler: MS, MR, TR severity (simplified)
   - Doppler MV: MV E/A, deceleration time
   - Doppler TR: TR Vmax, RVSP
   - Doppler TDI: TDI Septal, TDI Lateral, E/e' ratio

4. **A2C/A3C/A5C** (Apical 2/3/5 Chamber) - 3 pages:
   - 2D Assessment: LV wall motion (Normal/RWMA/Akinetic), AV/LVOT structure, LVOT diameter
   - Color Doppler: MR/AR severity, MS/AS severity
   - Doppler: AV (AS) CW VTI measurements (Vmax, Mean PG, AVA)

5. **Subcostal View** - 2 pages:
   - ASD/VSD/Pericardium: Interatrial septum assessment, interventricular septum assessment, pericardial effusion
   - IVC Assessment: IVC diameter, collapse ratio, volume status, RA/IVC flow

6. **ASD/VSD Detail** (Conditional) - 1 page:
   - RVOT PW: RVOT Vmax, RVOT VTI
   - RVOT CW PV: PV Vmax, PV VTI
   - ASD shunt direction and flow velocity
   - VSD shunt direction and flow velocity
   - Only appears when ASD or VSD defect detected

7. **Valve Details** (AS/AR/MS/MR - Conditional): Condition-specific detailed measurements:
   - AS: LVOT PW VTI/Velocity, AV CW VTI (Vmax, Mean PG, AVA)
   - AR: VC, AV CW (Vmax, AR slope PHT)
   - MS: CW mean PG/PHT/MVA, MV fish-mouth assessment with MVA
   - MR: VC, PISA/EROA, CW Vmax/VTI, Pulmonary vein flow (S/D/A waves)

8. **Summary**: Auto-populated clinical impression with manual override capability
   - Aggregates data from all views
   - Includes LV/RV function, valvular assessment, ASD/VSD status, aorta/LA, pericardium, IVC/volume status