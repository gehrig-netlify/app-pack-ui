# @netlify-labs/app-pack-ui

Shared UI components for Netlify's **App Packs** program. The base app template and every vertical app (HR, Finance, etc.) install this package so that components every vertical needs are consistent instead of quietly reimplemented differently.

This is a public npm package under the `@netlify-labs` scope — not the main `@netlify` org scope, since App Packs isn't officially-supported core product surface, and not a private/GitHub-Packages scope, since the "Deploy to Netlify" flow for generated app templates needs `npm install` to work with zero auth.

## Install

```sh
npm install @netlify-labs/app-pack-ui@0.1.0
```

**Pin an exact version, do not use a `^` range.** Generated app templates are meant to diverge deliberately over time (each vertical customizes its copy), not silently pick up upstream changes on every install. Bump the pinned version deliberately when you want to take an update, and check the changelog for breaking changes first.

### Temporary install (before the first real npm publish)

This package hasn't been published to the npm registry yet (see [Versioning & release process](#versioning--release-process)). Until then, templates can install directly from GitHub:

```sh
npm install github:gehrig-netlify/app-pack-ui#<commit-sha>
```

**Pin a commit SHA, not a branch name** — a branch moves, a SHA doesn't, so this is the closest git-based equivalent to the exact-version pin above. `npm install` runs this package's `prepare` script on install (a plain `npm run build`), so consumers get a freshly built `dist/` without needing it committed to the repo.

Once the real npm publish pipeline is set up, switch every template back to the registry install above and drop the git dependency — this is a stopgap, not the long-term distribution path.

Import the compiled stylesheet once, in your root layout (this package ships pre-compiled CSS — see [Theming](#theming) for why):

```ts
import "@netlify-labs/app-pack-ui/styles.css";
```

Then import components as usual:

```tsx
import { DataTable, EmptyState, ThemeProvider } from "@netlify-labs/app-pack-ui";
```

## Theming contract

Every component references CSS custom properties instead of hardcoded colors, so theming comes entirely from whatever your app defines at `:root` (and `.dark`) in your own `globals.css` — the standard shadcn/ui variable set. **You must define all of these** or components will render unstyled or with browser default colors:

```
--background
--foreground
--card
--card-foreground
--popover
--popover-foreground
--primary
--primary-foreground
--secondary
--secondary-foreground
--muted
--muted-foreground
--accent
--accent-foreground
--destructive
--destructive-foreground
--border
--input
--ring
--radius
--sidebar
--sidebar-foreground
--sidebar-primary
--sidebar-primary-foreground
--sidebar-accent
--sidebar-accent-foreground
--sidebar-border
--sidebar-ring
```

The `--sidebar-*` set only needs to be defined if you use `Sidebar` — every other component resolves through the first 20. Define both light and `.dark` values for these the same way as the rest.

If you scaffolded your app from a shadcn/ui `new-york`-style `globals.css`, you already have these. Dark mode is toggled by adding/removing a `dark` class on `<html>` (see `ThemeProvider` below) — define both the light values under `:root` and the dark overrides under `.dark`.

### Why a pre-compiled stylesheet?

Tailwind only generates CSS for classes it can see in **your own** build — it does not scan `node_modules`. If this package shipped compiled JS using Tailwind classnames and relied on your app's Tailwind config to pick them up, components would render completely unstyled. Instead, this package runs its own Tailwind build and ships `dist/styles.css` — you import it once and never need to add this package to your own Tailwind content/source scanning.

## What belongs in this package (and what doesn't)

This package is the shared design system for App Packs: **both primitives (Button, Input, Badge, Card, ...) and composed components (DataTable, Form, EmptyState, ...) belong here.** Every vertical installs the same primitives so a Button in HR looks and behaves like a Button in Finance — that consistency is the point, not just consistency of the more complex composed pieces. Components are built directly on Radix UI primitives (via the unified `radix-ui` package), `class-variance-authority` for variants, `lucide-react` for icons, and a `cn()` class-merging helper.

The test for inclusion is still: **would every vertical need it, and would divergence between verticals be bad?** That test now regularly says "yes" for basic elements too — this is a real, from-scratch design system, not a shim in front of shadcn/ui's copy-in-place CLI.

Nothing vertical-specific (no HR/Finance business logic) belongs here. If you're unsure whether something belongs, flag it in a PR description rather than guessing.

## Components

| Component | Purpose |
|---|---|
| `DataTable` | Sort, filter, search, pagination — generic and typed for reuse. Built on `@tanstack/react-table`. |
| `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`, `useFormStatus` | Zod-validated forms via `react-hook-form`, with an explicit `idle → submitting → success → error` lifecycle. |
| `EmptyState`, `Skeleton`, `NotFoundState`, `AppErrorBoundary` | Shared states: empty, loading, 404, and error-boundary fallback. |
| `ThemeProvider`, `useTheme` | Light/dark/system theme toggling via CSS custom properties. Framework-agnostic (no Next.js dependency). |
| `ProtectedRoute` | Generic, auth-provider-agnostic and routing-library-agnostic auth gate. It never redirects itself — it conditionally renders and calls `onUnauthenticated()`, leaving actual navigation to your app's router glue. |
| `Button`, `ButtonGroup` | Primary/outline button styles, sizes (`sm`/`md`/`icon`), and a joined-border group wrapper. |
| `Badge` | Status/label pill — `default`/`secondary`/`destructive`/`outline` variants. |
| `Avatar`, `AvatarGroup` | User avatar with image-load fallback and presence dot; `AvatarGroup` stacks avatars with a "+N" overflow. |
| `Input` | Text input with optional leading/trailing icon slots. |
| `Checkbox`, `CheckboxLabel` | Radix-backed checkbox, with a compound labeled variant. |
| `RadioGroup`, `RadioGroupItem` | Radix-backed radio group. |
| `Slider` | Radix-backed single or range slider. |
| `Switch` | Radix-backed on/off toggle. |
| `Progress` | Radix-backed determinate progress bar. |
| `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` | Generic composable card primitive. `CardFooter` has a `variant="muted"` option for a visually distinct action band (full-width stacked buttons, top border, tinted background) — see the `LoginForm` story. |
| `Alert`, `AlertTitle`, `AlertDescription` | Inline callout — `default`/`destructive` variants. |
| `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis` | Breadcrumb trail composition. |
| `Pagination` | Standalone, fully controlled page-number list with prev/next and ellipsis collapsing — distinct from `DataTable`'s built-in pagination. |
| `Item`, `ItemMedia`, `ItemContent`, `ItemTitle`, `ItemDescription`, `ItemActions` | Generic list-row composition (icon/avatar + text + trailing actions). |
| `Field`, `FieldLabel`, `FieldControl`, `FieldDescription`, `FieldError` | Framework-agnostic label/control/description/error wrapper — the non-`react-hook-form` counterpart to `Form`'s pieces. |
| `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` | Radix-backed expand/collapse sections. |
| `Menu`, `MenuTrigger`, `MenuContent`, `MenuItem`, `MenuCheckboxItem`, `MenuRadioItem`, `MenuRadioGroup`, `MenuLabel`, `MenuSeparator`, `MenuShortcut`, `MenuSub`, `MenuSubTrigger`, `MenuSubContent`, `MenuGroup`, `MenuPortal` | Radix-backed dropdown menu. |
| `Navigation`, `NavigationList`, `NavigationItem`, `NavigationTrigger`, `NavigationContent`, `NavigationLink`, `NavigationIndicator`, `NavigationViewport` | Radix-backed navigation menu bar. |
| `SidebarProvider`, `Sidebar`, `SidebarTrigger`, `SidebarRail`, `SidebarInset`, `SidebarHeader`, `SidebarContent`, `SidebarFooter`, `SidebarSeparator`, `SidebarGroup`, `SidebarGroupLabel`, `SidebarGroupContent`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`, `SidebarMenuSub`, `SidebarMenuSubItem`, `SidebarMenuSubButton`, `useSidebar` | Collapsible app sidebar with a Radix-`Dialog`-backed mobile sheet. Requires the `--sidebar-*` theme variables (see [Theming](#theming-contract)). |
| `Toaster`, `useToast`, `toast`, `ToastAction` | Radix-backed toast notifications with app-wide stacking/dismissal state. Mount `<Toaster />` once at your app root. |
| `Questionnaire` | Single-select question card flow (letter-badge options, progress text, back/next actions). |

**Deferred, not yet in this package**: Combobox, Carousel, and Chart (Bar) — each needs a new runtime dependency (`cmdk`, `embla-carousel-react`, `recharts` respectively) that hasn't been added yet. Revisit as a separate round.

## Component workshop

This repo's Ladle workshop (`.ladle/`, `src/**/*.stories.tsx`) previews the actual package source — it doesn't build or publish anything itself.

```sh
npm run ladle:serve   # local dev, live prop controls
npm run ladle:build   # static build, deployed to Netlify on every push to main
```

## Versioning & release process

- **Tag push (`vX.Y.Z`)** → `.github/workflows/publish.yml` builds and runs `npm publish`. This is the real, versioned release consumers pin to.
- **Push to `main`** → `.github/workflows/deploy-workshop.yml` builds Ladle and deploys the static output to Netlify — a public, always-current "browse the components" site, useful as living documentation and a shareable link.

### Known caveats worth knowing before you touch the build

- **tsup** is used per this package's build requirements, but its maintainer has publicly pointed people toward `tsdown` (built on Rolldown) as the long-term successor. Revisit if tsup stops receiving updates.
- **npm's OIDC "Trusted Publishing"** can't bootstrap a brand-new package (the package must already exist on the registry before a trust policy can be configured). The very first `0.1.0` publish must happen with `NPM_TOKEN` — either from CI or a local `npm publish` — before `publish.yml`'s token-based auth can be swapped for OIDC.
- **`@tanstack/react-table` v9** was a deliberate choice for the Data Table over the more battle-tested v8 — it was only weeks past beta at the time this package was built. Pin the exact version (no `^` range) and watch its changelog closely; expect possible breaking patch/minor releases until it fully stabilizes.

## Local development

```sh
npm install
npm run dev        # tsup --watch + tailwind --watch
npm run typecheck
npm run build      # dist/index.js, dist/index.cjs, dist/index.d.ts, dist/styles.css
```
