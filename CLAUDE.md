## Claude Guide for This Repo

This document defines how **Claude** should behave when working in this repository. Treat it as the default source of truth for project workflow and UI conventions unless the user explicitly overrides something.

The project is a small **React + TypeScript** app with source code under the `src/` directory (for example `src/App.tsx` and `src/runawayButtons.tsx`).

---

## 1. Git Workflow (Always Use a Branch)

When making any code or configuration changes in this repo:

- **Always create and work on a new git branch.**
  - Do **not** do feature work directly on `main` (or `master`).
  - Example command:
    - `git switch -c chore/agents-claude-guides-<suffix>`
- **Use clear, focused branch names:**
  - Features: `feature/<short-kebab-description>`
    - Example: `feature/runaway-button-variants`
  - Chores/docs: `chore/<short-kebab-description>`
    - Example: `chore/update-ui-guidelines`
- Keep branches **small and single-purpose** so they are easy to review and reason about.

If you detect that you are currently on `main` when asked to make changes, first create and switch to an appropriate feature or chore branch, then proceed.

---

## 2. Preference for UI as Components

When adding or modifying UI:

- **Default behavior:** implement new UI features as **reusable React components**.
  - Avoid large blocks of inline JSX inside container components like `App`.
  - Follow the pattern of `RunawayButton` in `src/runawayButtons.tsx`: a dedicated component with typed props and encapsulated behavior.

Design components with these principles:

- Small, focused components that do one thing well.
- Accept data and callbacks via typed props (TypeScript interfaces or type aliases).
- Extract shared logic into reusable components or hooks when it appears in more than one place.
- Place substantial or reusable components in their own `*.tsx` files under `src/` (or appropriate subfolders).

Only keep very simple, one-off JSX inline; anything with interaction logic, state, or non-trivial layout should usually become a component.

---

## 3. Coding Style & Project Conventions

When editing code:

- Use **functional React components** and hooks (`useState`, `useEffect`, etc.).
- Respect existing patterns in `src/App.tsx` and `src/runawayButtons.tsx` for import style, component structure, and TypeScript usage.
- Prefer explicit typing on component props and shared helpers; avoid `any` unless absolutely necessary.
- Keep changes minimal and aligned with the user’s request; avoid speculative refactors unless explicitly asked.

Run available checks (lints/tests) after meaningful changes when tools are available, and ensure the TypeScript and JSX compile cleanly.

---

## 4. How Claude Should Interact

When working in this repo, Claude should:

- **Before making larger or multi-file changes**
  - Briefly summarize the **goal** and **planned edits** to the user.
  - Confirm any ambiguous requirements instead of guessing.
- **While editing**
  - Read relevant files fully before changing them.
  - Prefer introducing or updating components over ad-hoc inline JSX.
  - Keep explanations concise but clear; expand detail only when the user asks.
- **After editing**
  - Re-skim changed files to ensure imports, exports, and types are consistent.
  - Provide a short summary of what changed and where.

Always follow explicit user instructions in the current conversation first. When the user has not specified a preference, fall back to the rules in this document and in `AGENTS.md`.

