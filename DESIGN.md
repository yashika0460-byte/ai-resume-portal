# Design Brief — AI Resume Screening Portal (Next-Gen Dark Theme)

## Direction
Next-gen SaaS AI Portal — dark navy-to-indigo gradient with vibrant indigo/violet accents, glass-morphism cards, and smooth micro-interactions.

## Tone
Premium, intelligent, cutting-edge. Dark mode conveys sophistication and focus. Production-grade aesthetic matching Linear, Vercel, and advanced tech SaaS.

## Differentiation
Animated CSS grid overlay on gradient background + glass cards with glow borders + circular score gauges + color-coded skill chips. Every interactive element has intentional micro-interaction choreography.

## Color Palette

| Token | OKLCH | Role |
|-------|-------|------|
| background | `0.08 0.015 264` | Deep navy page surface |
| card | `0.13 0.012 264` | Elevated dark surface for glass cards |
| foreground | `0.95 0.01 264` | Near-white text on dark |
| primary | `0.53 0.22 264` | Vibrant indigo, CTAs, active states |
| secondary | `0.56 0.2 300` | Violet for secondary actions |
| accent | `0.62 0.22 300` | Bright violet, highlights, UI focus |
| success | `0.54 0.2 151` | Emerald for positive indicators |
| warning | `0.65 0.18 79` | Amber for caution/pending states |
| destructive | `0.62 0.22 22` | Red for errors/delete actions |
| muted | `0.25 0.01 264` | Dark grey for disabled/secondary text |
| border | `0.18 0.012 264` | Dark subtle dividers |

## Typography

- **Display:** Space Grotesk 600–700 — headlines, section titles (32–48px)
- **Body:** General Sans 400–500 — copy, labels, form input (14–16px)
- **Mono:** JetBrains Mono 400 — code, technical data, scores (12–14px)

## Elevation & Depth

Glass-morphism cards with 24px blur, 1.5px indigo borders, and dual-layer shadows (ambient + inset glow). Hover states elevate background opacity and shift border to violet. No drop shadows on text. Layered surfaces: background < card < popover. Glow accents (`--glow-indigo`, `--glow-violet`) provide non-intrusive focus cues.

## Structural Zones

| Zone | Background | Border | Treatment |
|------|-----------|--------|-----------|
| Page | gradient-flow (navy→indigo layered) | none | Animated grid overlay drift (20s) |
| Header | glass | 1.5px primary/50% | Logo + admin email + logout + back arrow |
| Sidebar (Admin) | `--sidebar` (0.11 0.012 264) | `--sidebar-border` | 250px fixed / mobile-collapsible, nav items with violet active state |
| Card | glass with hover | 1.5px primary/20% | 12px radius, backdrop blur 24px, dual shadows |
| Content Grid | gradient-flow | none | 1 col sm, 2 col md, 3 col lg responsive |
| Interactive | indigo/violet | indigo on focus | Smooth 0.3s transitions, no hard snap |

## Spacing & Rhythm

16px base unit. Card padding 24px. Section gaps 32px. Content grid gap 20px. Micro-spacing (4px) for icon+text pairs. Consistent left/right padding (20px mobile, 32px desktop). Alternating section backgrounds (card vs subtle) creates visual rhythm.

## Component Patterns

**Buttons:** indigo primary, violet hover, glass card background, 12px radius. **Cards:** glass morphism with glow on hover. **Badges:** color-coded by category (blue=technical, violet=soft, emerald=success). **Inputs:** dark input background (0.15 OKLCH) with indigo focus ring. **Score gauge:** circular radial visualization (SVG/canvas) preferred over linear progress. **Skill chips:** solid category colors, 4px border-radius, transition on focus.

## Motion & Micro-interactions

**Entrance:** fade-up 0.4s cubic-bezier on page load. **Hover:** smooth background/border transitions (0.3s) on cards & buttons. **Active:** nav items shift to violet accent + bold weight. **Decorative:** glow animation (2s ease-in-out) on key CTAs; grid drift (20s linear) on background; float-up animation (0.4s) on score updates. No bouncy/flip animations — all motion is purposeful and refined.

## Responsive Breakpoints

- **sm** (640px): Single-column cards, full-width inputs, collapsed sidebar (mobile menu icon)
- **md** (768px): Two-column card grid, tighter spacing, compact sidebar on tablet
- **lg** (1024px): Three-column card grid, full sidebar, expanded layout

## Anti-Patterns Avoided

No rainbow palettes. No text gradients. No garish glow effects. No bouncy animations. No default Tailwind shadows. Cards are readable; content never sacrificed for aesthetics. Glows are subtle and purposeful. Only 5 semantic colors + neutrals. All animations have choreography, not scattered random motion.

## Signature Detail

**Animated grid drift overlay** on gradient background paired with **glass cards with glow borders** and **circular score gauges**. Every interaction has smooth, intentional motion. Dark mode throughout conveys premium, focused, next-gen aesthetic.
