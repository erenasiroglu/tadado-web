---
name: tadado-web-rules
description: This is a new rule
---

# Overview

SSR and SSG are the default.
- Optimize for SEO, GEO (Generative Engine Optimization), and Web Vitals.
- Prefer simplicity, clarity, and maintainability.
- Less JavaScript, more semantic HTML.
- Landing pages and blogs only (no complex app logic).

Code Style
- Follow Standard.js rules strictly.
- Use functional and declarative programming.
- Avoid classes and unnecessary abstractions.
- Write small, single-responsibility functions.
- Use descriptive variable names (isVisible, hasContent, shouldAnimate).
- Prefer early returns and guard clauses.
- Structure files clearly: component, helpers, static content.

JavaScript Rules
- 2 space indentation
- Single quotes
- No semicolons
- No unused variables
- Always use ===
- Use camelCase for functions and variables
- Use PascalCase for React components
- Use named exports

React & Next.js
- Use React Server Components by default.
- Use "use client" only for:
  - Animations
  - User interactions (accordion, modal, menu)
  - Forms
- Never fetch data inside client components.
- Use Suspense for client boundaries.
- Use generateMetadata for every page.
- Prefer SSG / ISR for blogs and landing pages.

UI & Styling
- Use shadcn/ui and Radix UI for UI primitives.
- Use Tailwind CSS for layout and spacing.
- Avoid global CSS.
- Do not use @apply.
- Customize shadcn components instead of rewriting them.

Animations
- Use framer-motion sparingly.
- Animations must not block content rendering.
- Content must be visible on first paint.
- Respect reduced motion preferences.
- Limit animations to hero, CTA, and transitions.

SEO & GEO (High Priority)
- Semantic HTML is mandatory.
- Correct heading hierarchy (single H1).
- Use structured content that LLMs can easily parse.
- Use JSON-LD only when necessary and always sanitized.
- Add Open Graph and Twitter metadata.
- Optimize internal linking and content clarity.

Performance
- Use next/image for all images.
- Prefer WebP and proper sizing.
- Lazy load non-critical content.
- Avoid unnecessary useEffect and useState.
- Optimize for LCP, CLS, and FID.

Blog & Landing Pages
- Use static or MDX content.
- Blog pages:
  - Article schema
  - Author, publish date, reading time
- Landing pages:
  - Clear value proposition
  - One primary CTA
  - SEO-first structure

State Management
- Prefer local state.
- Avoid global state unless absolutely necessary.
- Zustand only if clearly required.

Accessibility
- Use semantic elements (article, section, nav).
- Ensure keyboard navigation.
- Use ARIA only when needed.

Security
- Sanitize all user-generated content.
- Avoid dangerouslySetInnerHTML unless required.
- Never render unsanitized HTML.

Guiding Rule
Code must serve content, performance, and SEO — not the other way around.

