# Project Chat Context

Read this file at the start of every new chat before making project changes. Update it when the architecture, design direction, content source, deployment process, or major project status changes.

Last reviewed: 2026-06-12

## Project

This repository is Parth Athalye's personal portfolio. It presents him as an AI Engineer and Full Stack Developer based in Sydney, with emphasis on:

- Production computer vision and YOLO systems
- Semantic retrieval, RAG, and agentic workflows
- Full-stack AI products
- Measurable operational and business outcomes
- Hackathon projects and engineering experience

The site is a single-page Next.js portfolio. There is no backend, database, authentication, test suite, or API route in this repository.

## Technology

- Next.js 16 App Router
- React 19
- TypeScript with strict mode
- Framer Motion
- Three.js through `@react-three/fiber` and `@react-three/drei`
- Plain global CSS
- Google Fonts: Barlow Condensed, Barlow, and DM Mono
- npm with `package-lock.json`

Useful commands:

```bash
npm run dev
npm run build
npm run start
```

The local launch configuration uses port 3001. The production build passed on 2026-06-12.

## Active Application

The live render path is:

```text
app/layout.tsx
  -> app/page.tsx
    -> components/ImmersivePortfolio.tsx
      -> components/ImmersiveScene.tsx
      -> lib/data.ts
      -> app/globals.css
```

`app/page.tsx` renders only `ImmersivePortfolio`.

`ImmersivePortfolio.tsx`:

- Is a client component.
- Tracks normalized page scroll in refs.
- Smoothly interpolates scroll progress with `requestAnimationFrame`.
- Maps the page into a continuous personal journey.
- Provides fixed text navigation, full experience content, project demos, and contact links.
- Dynamically imports the WebGL scene with SSR disabled.
- Replaces WebGL with a static gradient when reduced motion is requested.

The narrative sections are:

1. Hero: name, location, and a restrained personal pitch
2. About: one summary of Parth's interests, approach, and education
3. Experience: Machine Vision AI, Deloitte, and Edgelytics
4. Selected projects: TeachMap, Legion, and Hisaab-Book
5. Contact and external links

`ImmersiveScene.tsx`:

- Uses a fixed full-screen React Three Fiber canvas.
- Moves the camera through a 3D scene based on scroll progress.
- Follows one explicit "signal to system" theme rather than a set of standalone objects.
- Uses a continuous orange data rail, moving data packets, repeated station frames, and corridor guides to make every stage feel like part of the same pipeline.
- Moves through raw signals, dual-camera vision, semantic retrieval, predictive features, and three product interfaces representing TeachMap, Legion, and Hisaab-Book.
- Uses lightweight procedural geometry rather than external 3D assets.
- Caps DPR at 1.5 and requests high-performance WebGL.

`app/globals.css` owns the active visual system and responsive behavior.

## Current Design Direction

The current, uncommitted redesign is a personalized immersive career journey:

- Deep green-black background: `#101310`
- Warm paper text: `#ece9e1`
- Orange route accent: `#f1663b`
- Muted natural green supporting colors
- Instrument Sans, DM Serif Display, and IBM Plex Mono
- Fixed WebGL journey tied to real experience and projects
- One continuous signal-to-system narrative: observe, structure, validate, and ship
- Long editorial scroll sections with generous negative space
- Plain text navigation and restrained, sharp-edged controls

Avoid pseudo-system language, numbered chapter rails, status lights, glass dashboard cards, generic AI shapes, initials as a logo, and repeated "I build/do" capability statements. The experience should remain immersive, but every visual device should relate to Parth's work or personal journey. Extend the existing data rail and station language instead of introducing disconnected 3D motifs.

The fixed header has plain navigation and a résumé link. It does not display Parth's name or initials. Experience and project items are not numbered, and there are no introductory headlines before those sections.

Mobile behavior is defined at 850px and 470px. Sections and projects become single-column, typography scales down, and the layout uses `svh` for the hero.

Accessibility already considered:

- Visible keyboard focus styles
- Semantic buttons and links
- `prefers-reduced-motion` fallback
- External links use `rel="noreferrer"` or `noopener noreferrer`

Preserve these behaviors when extending the current design.

## Content Source

`lib/data.ts` is the canonical structured content source for:

- `PROJECTS`
- `EXPERIENCE`
- `CONTACT_FIELDS`
- `DOCS_LINK`
- `SKILLS`
- `EDUCATION`

Projects and experience each have a short `summary` for the immersive page and a detailed `desc` for résumé-style or legacy views. Keep the immersive copy conversational and restrained; keep metrics in the detailed description.

Project summaries and stacks should be checked against each public project's latest pushed code, not blindly copied from stale READMEs. Hisaab-Book's README contains placeholders and incorrect contributor details; its React Native/FastAPI source is more reliable.

The active immersive page consumes `PROJECTS`, `EXPERIENCE`, `EDUCATION`, `CONTACT_FIELDS`, and `DOCS_LINK`. Project and experience entries include a short transformation `phase`, a conversational `summary`, and a detailed evidence-led `desc`; the active page now displays both summary and description.

Key profile facts currently represented:

- Name: Parth Athalye
- Location: Sydney, Australia
- Current role: Software Developer Intern at Machine Vision AI
- Education: Master of IT (Artificial Intelligence), UNSW Sydney
- Prior roles: Deloitte ML Engineer Intern; Edgelytics Solutions R&D Intern
- Featured projects: TeachMap, Legion, and Hisaab-Book
- Email: `athalyeparth@gmail.com`
- GitHub: `parthathalye17`
- LinkedIn: `parthathalye`

Machine Vision AI content was refreshed on 2026-06-12 with production metrics covering dual-camera dataset preparation, an 8-class YOLO11m-seg model on SageMaker, 90.7% precision, 0.81 mask mAP@50, a 94% safety-alert reduction at 9.7 FPS, the role-based Next.js/FastAPI workflow, and the AWS evidence-to-revenue pipeline for 100+ daily truck events.

The active page derives its resume URL from `CONTACT_FIELDS` to avoid URL drift.

## Legacy Implementation

These components belong to the previous Ferrari-inspired section-based portfolio and are not rendered by the active page:

- `components/Nav.tsx`
- `components/Cursor.tsx`
- `components/Hero.tsx`
- `components/SphereCanvas.tsx`
- `components/About.tsx`
- `components/Experience.tsx`
- `components/Projects.tsx`
- `components/VideoModal.tsx`
- `components/Contact.tsx`

They remain useful as a content-rich fallback and contain interactions omitted from the current immersive version, including expanded experience descriptions, project descriptions and stacks, inline YouTube modals, skills, education, phone, and the full contact grid.

`index.html` is an older standalone React/Babel prototype of that legacy design. It is not part of the Next.js runtime.

`DESIGN-ferrari.md` is the original design research brief. It explains the prior black/white editorial system and Ferrari-red accent. It is historical context, not the active design specification.

Do not accidentally edit legacy components expecting the visible site to change. Decide explicitly whether a task targets the active immersive experience or restores/uses legacy functionality.

## Repository State

At the time this file was created, the immersive redesign was present as uncommitted work:

- Modified: `app/globals.css`
- Modified: `app/layout.tsx`
- Modified: `app/page.tsx`
- Modified: `lib/data.ts`
- Modified: `package.json`
- Modified: `package-lock.json`
- Untracked: `components/ImmersivePortfolio.tsx`
- Untracked: `components/ImmersiveScene.tsx`

Treat these as intentional user changes. Do not revert them unless explicitly asked.

Recent committed history:

- `7f51887` Mobile responsive bug fix
- `0a9aad5` Making the app responsive
- `0cb56c8` not-found page and Next.js upgrade
- `4b82acd` Major design implementation

## Engineering Guidance

- Read `git status` before editing; the worktree may be dirty.
- Prefer the active architecture and existing visual language.
- Keep profile content centralized in `lib/data.ts` when practical.
- Avoid adding a state library unless real shared state appears; Zustand is currently unused by application code.
- Preserve reduced-motion behavior and mobile fallbacks.
- Consider WebGL performance for every scene change.
- Keep Three.js at `0.182.x` while React Three Fiber 9.6.1 still constructs the now-deprecated `THREE.Clock`; Three.js 0.183+ logs a browser warning.
- Run `npm run build` after implementation changes.
- There is no lint or test script, so the production build is the current baseline verification.
- Do not commit generated `.next`, `*.tsbuildinfo`, PDFs, `.DS_Store`, or local editor configuration.

## Known Follow-Ups

- Google Fonts are loaded with CSS `@import`, so rendering depends on network access.
- There is no automated test coverage or lint command.
- The custom 404 page uses inline default styling and does not match the immersive visual system.
- `index.html`, the legacy components, and the current immersive implementation create three representations of similar content; avoid updating only the wrong one.

## Session Continuity

No prior agent memory file existed when this document was created. This file is now the project memory. At the end of work that changes durable project knowledge, update the relevant sections rather than appending a chat transcript.
