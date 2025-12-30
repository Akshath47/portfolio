# Portfolio Website Layout Plan

This document outlines the planned layout and required **shadcn/ui components** for the portfolio website.
Spaces are left open for **Unicorn Studio visuals/animations** in the Hero section.

---

## 🏠 Hero Section
- **Typography**: Large heading (`h1`) → "Hi, I’m Akshath"
- **Subheading**: Smaller text (`p`) → "CS student at Imperial College London"
- **Buttons**: 
  - `Button` (primary) → "View Resume"
  - `Button` (secondary) → "Contact Me"
- **Layout Component**: `Card` or `Container`
- **Custom Visual Placeholder**:
  - [UNICON STUDIO COMPONENT] → 3D/animation (hero centerpiece, e.g. interactive globe, coding abstract art, floating particles)

---

## 🙋 About Section
- **Typography**: `h2` section title ("About Me")
- **Text**: `p` with 2–3 sentences about background & interests
- **Optional Layout**: `Card` or `Grid` for text + small illustration

---

## 💼 Experience Section
- **Section Title**: `h2` → "Experience"
- **Cards**:
  - `Card` per experience (internship, hackathon, coursework)
    - `CardHeader`: role & organization
    - `CardContent`: description, skills used
    - `Badge` list for technologies
- **Layout**: `Grid` (2–3 columns) for responsive layout

---

## 📂 Projects Section
- **Section Title**: `h2` → "Projects"
- **Cards**:
  - `Card` with screenshot/thumbnail (use `Image`)
  - `CardHeader`: project title
  - `CardContent`: description + highlights
  - `Accordion` for "More Details"
- **Custom Visual Placeholder**:
  - [UNICON STUDIO MINI-VISUAL] per project card (optional, subtle animated highlight)

---

## 🛠 Skills Section
- **Section Title**: `h2` → "Skills"
- **Badge Grid**:
  - `Badge` components grouped by category:
    - Languages
    - Frameworks
    - Tools
- **Layout**: `Grid` with equal-sized badge containers

---

## 🏆 Achievements / Certifications
- **Section Title**: `h2` → "Achievements"
- **List or Timeline**:
  - `Steps` component for chronological achievements
  - Each step: title + description

---

## 📬 Contact Section
- **Section Title**: `h2` → "Get in Touch"
- **Links**:
  - `Button` (variant=outline) → Email (mailto:)
  - `Button` → LinkedIn
  - `Button` → GitHub
- **Footer**:
  - Minimal `Footer` container with smaller typography
  - Optional `Separator`

---

## 🎨 Visual Style Notes
- Theme: Minimal, modern, **dark/light mode toggle**
- Typography: Clean (use `Typography` system)
- Animations: 
  - Unicorn Studio 3D hero animation
  - Subtle hover effects on `Cards` and `Buttons`

---

## ✅ Summary of shadcn Components Needed
- **Typography**
- **Button**
- **Card**
- **Badge**
- **Grid / Container**
- **Accordion**
- **Steps / Timeline**
- **Image**
- **Separator**
- **Footer**

(Plus custom Unicorn Studio integrations where marked)
