## Project AI Agent Guide

This repository is a small React + TypeScript application under the `src/` directory (for example `src/App.tsx` and `src/runawayButtons.tsx`). All AI agents working in this project should follow the conventions in this document unless the user explicitly asks otherwise.

---

## Git & Workflow Rules

- **Always create a new git branch for any code or config changes.**
  - Do not make changes directly on `main` (or `master`).
  - Use `git switch -c <branch-name>` (or similar) before editing files.
- **Suggested branch naming convention:**
  - Features: `feature/<short-kebab-description>`
    - Example: `feature/runaway-button-sound-effect`
  - Chores / docs / refactors: `chore/<short-kebab-description>`
    - Example: `chore/add-agents-claude-guides`
- **Keep branches small and focused.**
  - Group related edits together; avoid mixing unrelated refactors with feature work.
- **Commit messages should describe _why_ as well as _what_.**
  - Example: `feat: add runaway button speed controls to improve UX`

If the user asks for a change and the current branch is `main`, first create a new branch and continue all work there.

---

## UI & Componentization Guidelines

- **Default approach:** implement new UI features as **reusable React components**, not large blocks of inline JSX.
  - Prefer creating or extending components (e.g. similar to `RunawayButton`) instead of embedding complex JSX directly in `App.tsx`.
- **Component design:**
  - Keep components **small and focused**; compose multiple simple components rather than one large one.
  - Use props (with TypeScript types or interfaces) to pass data and callbacks.
  - Avoid duplicating UI logic; extract shared behavior into reusable components or hooks when it appears in more than one place.
- **File organization:**
  - Place new components in their own `*.tsx` files under `src/` (or an appropriate subfolder) when they are more than a few lines or are likely to be reused.
  - Co-locate component-specific styles with the component where practical (CSS modules, co-located `.css`, or styled solutions consistent with the existing project).

When adding or modifying UI, prefer:

1. Creating a new component file for the feature.
2. Wiring that component into `App.tsx` or other containers.
3. Keeping layout/markup in components and side-effectful logic in hooks or small helpers.

---

## Coding Patterns for This Project

- **React style**
  - Use functional components and React hooks (`useState`, `useEffect`, etc.).
  - Follow existing patterns from `src/App.tsx` and `src/runawayButtons.tsx` unless there is a strong reason to deviate.
- **TypeScript**
  - Type public surfaces: component props, reusable helpers, and any exported functions.
  - Prefer type aliases or interfaces for props rather than `any`.
- **Quality**
  - Run available checks (lints/tests) after non-trivial changes when tools are available.
  - Keep code readable and consistent with surrounding style (naming, formatting, and structure).

---

## Expectations for AI Agents

- **Before editing**
  - Read the relevant files fully (especially any `*.tsx` files you will touch).
  - Briefly describe your plan for multi-file or non-trivial changes.
- **While editing**
  - Prefer extracting new JSX into a separate component when:
    - The markup is more than a few lines, **or**
    - It is likely to be reused, **or**
    - It has its own interaction logic or state.
  - Keep changes minimal and focused on the user’s request.
- **After editing**
  - Re-read the changed files to ensure imports, exports, and types are consistent.
  - Summarize what changed in clear, concise language.

Always respect user instructions in the current conversation, but treat this document as the default behavior when the user has not specified a preference.

