# Service Pages Design

## Overview
Create 6 individual service pages inside `/pages/`, one per service in the services section. Each page is a self-contained HTML file with embedded CSS/JS (matching existing inner page pattern). Update main page service card links to point to new pages.

## Folder Structure
```
pages/
├── short-term-visas/index.html
├── work-visas/index.html
├── permanent-visas/index.html
├── visa-extensions/index.html
├── inbound-visa-processing/index.html
├── balikbayan-dual-citizenship/index.html
```

## Page Sections (top to bottom)

1. **Navbar** — Fixed, dark, same as privacy-policy page pattern
2. **Hero** — Full-width background image, floating shapes, badge, title with gradient highlight, subtitle, breadcrumb, wave divider
3. **Service Overview Cards** — 2-3 cards per visa sub-type with icons
4. **Requirements Section** — Checklist-style document requirements in cards
5. **Process Timeline** — Vertical numbered timeline with animated connecting line
6. **Key Info Cards** — Processing time, validity, fees in icon+value grid
7. **FAQ Accordion** — 3-4 expandable Q&A items with smooth toggle
8. **CTA Banner** — Full-width gradient "Ready to Apply?" with button
9. **Contact Section** — Reused contact form (Web3Forms) + contact info
10. **Footer** — Same as existing inner pages

## Animations
- IntersectionObserver scroll-triggered fade-in/fade-up
- Staggered card entrances
- Timeline step reveal
- FAQ accordion smooth expand/collapse
- Hover effects (lift + shadow) on cards
- Floating shapes in hero
- Back-to-top button

## Main Page Changes
- Update 6 service card `href` from `#contact` to `pages/<service-slug>/`

## Content
Each page has unique visa information relevant to that service type.
