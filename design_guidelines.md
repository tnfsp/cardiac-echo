# Cardiac Ultrasound Examination Guide - Design Guidelines

## Design Approach
**Reference-Based Approach**: Clinical medical workflow interfaces
- Primary inspiration: Epic's medical workflow interfaces and iPad medical apps like Figure 1
- Focus: Clean, clinical layouts optimized for healthcare professionals in hospital environments
- Priority: Usability, clarity, and efficiency over decorative elements

## Core Design Principles
1. **Clinical Clarity**: High contrast, unambiguous visual hierarchy for medical decision-making
2. **Touch-First**: All interactive elements optimized for tablet/iPad use in clinical settings
3. **Workflow-Driven**: UI follows natural examination sequence, minimizing cognitive load
4. **Data Integrity**: Clear visual feedback for data entry states and validation

## Color Palette

### Primary Colors
- **Medical Blue**: #0B5394 (Primary actions, headers, active states)
- **Approval Green**: #34A853 (Success states, confirmation buttons, positive indicators)
- **Clinical White**: #FFFFFF (Background, cards, content areas)

### Functional Colors
- **Text Primary**: #202124 (Body text, labels, high-priority information)
- **Input Fields**: #F8F9FA (Form backgrounds, inactive states)
- **Alert Red**: #EA4335 (Critical alerts, validation errors, required field indicators)

## Typography
- **Font Families**: Roboto or Open Sans (clinical legibility)
- **Hierarchy**:
  - Headers: 24-32px, Semi-bold
  - Section Titles: 18-20px, Medium
  - Body Text: 16px, Regular (optimized for tablet reading distance)
  - Labels: 14px, Medium
  - Input Values: 18px, Regular (clear data entry visibility)

## Layout System
- **Mobile-First**: Single-column layout adapting to tablet landscape
- **Spacing Units**: Tailwind scale - primarily 4, 6, 8 units (p-4, p-6, p-8, m-4, gap-6)
- **Container**: max-w-4xl for optimal tablet viewing
- **Touch Targets**: Minimum 44px height/width for all interactive elements

## Component Library

### Navigation & Progress
- **Step Progress Indicator**: Horizontal pills showing examination views (PLAX → PSAX → A4C → A2C/A3C/A5C → Subcostal → Summary)
- **Active Step**: Medical blue background with white text
- **Completed Steps**: Approval green checkmark
- **Pending Steps**: Light grey with dark text

### Form Components
- **Checkboxes**: Large (24px) with clear check states, medical blue when selected
- **Input Fields**: Light grey background (#F8F9FA), dark text, rounded corners (8px)
- **Numeric Keypad**: On-screen keyboard overlay with large touch-friendly number buttons (56px minimum)
- **Dropdown Selects**: High-contrast options (None/Mild/Mod/Sev) with clear visual separation
- **Radio Groups**: For structural assessments with clear active state indication

### Buttons
- **Primary CTA**: Medical blue (#0B5394), white text, 48px height, rounded-lg
- **Success Action**: Approval green (#34A853), white text, "Generate Report" prominence
- **Secondary**: White background, medical blue border and text
- **Minimum Size**: 44px height for all buttons, generous padding (px-6 py-3)

### Data Display
- **Patient Header**: Fixed top section with date, physician, patient ID, bed number, purpose checkboxes
- **Section Cards**: White background, subtle shadow, organized by examination view
- **Measurement Groups**: Clear visual grouping with labels, units (mm, m/s, mmHg) displayed inline
- **Summary Panel**: Highlighted section at workflow end with consolidated findings

## Interaction Patterns
- **Form State Persistence**: Auto-save indicators, no data loss
- **Progressive Disclosure**: Show relevant fields based on selections (e.g., measurement fields appear when abnormality selected)
- **Validation Feedback**: Inline alerts in red for required fields or out-of-range values
- **One-Click Report**: Prominent green button generating formatted output

## Responsive Behavior
- **Mobile (320-768px)**: Single column, full-width inputs, stacked forms
- **Tablet (768-1024px)**: Optimized primary view, 2-column forms where appropriate
- **Desktop (1024px+)**: Centered container (max-w-4xl), comfortable viewing without excessive whitespace

## Clinical UX Requirements
- **High Contrast**: Ensure all text meets WCAG AA standards for clinical lighting
- **Clear Focus States**: Visible keyboard navigation for accessibility
- **Error Prevention**: Inline validation, clear required field indicators
- **Quick Data Entry**: Numeric keypad overlay, common value shortcuts
- **Workflow Continuity**: Always visible progress indicator, clear next/previous navigation

## Animations
**Minimal and Purposeful Only**:
- Smooth transitions between workflow steps (300ms ease)
- Subtle scale feedback on button press (0.98 scale)
- Keypad slide-in/out animation (200ms)
- No decorative or distracting animations

## Images
Not applicable for this clinical utility application - focus remains on data entry forms and structured workflows.