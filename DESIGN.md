# Design Brief — AI Resume Screening Portal

## Tone & Purpose
Premium tech workspace for intelligent resume analysis. Light, confident, professional. Glass-morphism conveys transparency and accessibility. Sky-blue to lavender gradient + teal accents evoke AI intelligence and trust. Admin portal extends this with structured sidebar navigation and email-locked security paradigm.

## Color Palette (Light Mode + Admin Portal)
| Token | OKLCH | Usage |
|-------|-------|-------|
| Background | `0.96 0.008 240` | Off-white, page surface |
| Card | `0.98 0.005 240` | Frosted glass cards, overlay |
| Primary | `0.44 0.2 246` | Electric blue, CTAs, active |
| Secondary | `0.9 0.012 240` | Soft blue-grey, secondary UI |
| Accent | `0.52 0.18 198` | Teal, highlights, admin nav active |
| Foreground | `0.15 0.015 240` | Dark navy text |
| Muted | `0.92 0.008 240` | Near-white muted text |
| Border | `0.82 0.012 240` | Subtle dividers, card borders |
| Destructive | `0.55 0.22 25` | Warm red, errors, warnings |
| Sidebar | `0.88 0.015 246` | Admin nav background, light blue-white |
| Sidebar Primary | `0.52 0.18 198` | Active nav item, teal accent |

## Typography
| Layer | Font | Size | Weight | Usage |
|-------|------|------|--------|-------|
| Display | Space Grotesk | 32–48px | 600–700 | Headlines, section titles |
| Body | Figtree | 14–16px | 400–500 | Copy, labels, form input |
| Mono | JetBrains Mono | 12–14px | 400 | Code, technical data, scores |

## Elevation & Depth
Glass-morphism with three tiers: `glass` (cards), `glass-hover` (interaction state), `accent-glow` (highlights). Cards use `backdrop-blur-xl` with semi-transparent white. Shadows favor soft depth (`shadow-sm` to `shadow-md`) over contrast. Teal accents (`--accent`) provide visual focal points. Admin sidebar uses soft blue background (`--sidebar`) with teal active states.

## Structural Zones
| Zone | Background | Border | Treatment |
|------|-----------|--------|-----------|
| Header (Admin) | `glass` | subtle teal accent bottom | Logo, admin email, logout button, back arrow |
| Sidebar (Admin) | `--sidebar` (light blue) | `--sidebar-border` | 250px desktop / collapsible mobile, nav items with active teal accent, email-locked security visual |
| Content | `gradient-flow` (sky-blue to lavender) | none | Large glass card grid, 1–3 cols responsive |
| Cards | `glass` with hover state | `border-border/20` | 12px radius, backdrop blur, semi-transparent |
| Nav Items (Sidebar) | `--admin-nav-hover` on hover | none | Teal accent `--admin-nav-active` when active, rounded corners, 3px spacing |
| Interactive | Primary + teal accents | teal outline on focus | Buttons, inputs transition-smooth on hover |

## Component Patterns
Admin portal: sidebar + main content area. Sidebar (250px / collapsible mobile) with five nav items (Overview, Candidates, Job Matching, User Management, Activity). Active nav item uses teal accent background + bold text. Main content: glass cards grid (1 col mobile, 2 cols tablet, 3 cols desktop). Card-based layout with `.glass` utility. Teal accents on CTAs, active states, data highlights. Header: app logo (left), admin email display (center-right), logout button (right), back arrow (top-left). No decorative gradients on text — text always solid `--foreground`.

## Motion & Micro-interactions
`transition-smooth` (0.3s cubic-bezier) on all interactive elements. Sidebar nav items smooth transition on hover + active state (background + text color). Teal glow animation (`accent-glow`, subtle) on key CTAs. No bounce or flip animations — all motion is professional, refined. Sidebar collapse animation is smooth (no snapping). Active nav item transitions via background-color + text-weight.

## Responsive Breakpoints
- **sm** (640px): Single-column card layout, full-width inputs
- **md** (768px): Two-column grid, tighter spacing
- **lg** (1024px): Three-column grid, sidebar possible

## Anti-Patterns Avoided
No rainbow colors. No blinking/flashing. No generic "AI purple" everywhere. No text gradients. No oversized glowing shadows. Cards are translucent but readable; content is never sacrificed for aesthetic effect.

## Signature Detail
Teal accent on active sidebar nav items. Glass-morphism cards with subtle borders. Email-locked security paradigm (admin email `chandu46@gmail.com` displayed in header). Gradient background (sky-blue to lavender to pale mint) evokes data flow and professional intelligence. Sidebar navigation creates clear information hierarchy and role separation. Frosted glass cards maintain visual lightness while conveying premium quality.
