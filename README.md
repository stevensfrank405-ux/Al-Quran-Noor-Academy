# Al-Quran Noor Academy

A responsive, accessible static website for a Quran academy serving local and international learners. Built with HTML, CSS, and JavaScript; no build step or package installation is required.

## Run locally

From the repository root:

```sh
python3 -m http.server 3000 --bind 0.0.0.0
```

Open the local server in your browser. Deploy the root directory to any static hosting service. For GitHub Pages, select **Settings → Pages → Deploy from a branch → main → / (root)**.

## Inquiry form

The trial inquiry form validates required fields and prepares a message that can be copied or downloaded. It does not transmit data, reserve a lesson, or store personal information. Academy contact details have not yet been provided. Connect a verified email, WhatsApp number, or form backend before accepting live inquiries. Confirm course offerings, fees, teacher availability, and trial terms with the academy before launch.

## Design

Forest green, warm ivory, and muted gold; responsive cards, mobile navigation, course selection, expandable FAQs, and an original SVG Quran illustration. Google Fonts are optional: system fonts work offline. No analytics or cookies are used by the application. Google Fonts requests are subject to Google's privacy practices.

## Explore pages

- `courses.html`: course comparison and suggested starting points.
- `noorani-qaida.html`, `tajweed.html`, `memorization.html`: detailed course outlines and course-specific inquiry links.
- `about.html`: purpose, learning approach, and academy values.
- `student-guide.html`: preparation, home practice, parent guidance, time zones, and an interactive checklist.
- `admissions.html`: enrollment guidance, FAQs, and the local inquiry composer.
- `privacy.html`: form behavior and external service disclosures.

All navigation uses relative URLs for GitHub Pages project hosting. Course inquiry links preselect the course using a validated `course` query parameter. No server or package build is needed.

## Motion and reflections

Scroll reveals progressively enhance visible content using IntersectionObserver. Reduced-motion preferences disable motion; the reflection carousel is manually controlled and does not auto-advance. Quran excerpts include surah/ayah references and English renderings of meaning. Editorial reflection prompts are displayed separately. The home page also has a reading progress indicator and an accessible back-to-top button.
