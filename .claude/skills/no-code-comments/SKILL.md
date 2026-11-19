---
name: no-code-comments
description: Always active. Never write code comments, delete existing code comments in any file you touch, and never read node_modules.
---

# No code comments

These rules apply to every task in this repository.

## Rules

1. Never write code comments in any language (JS/TS, Astro, CSS, HTML, JSON-with-comments, shell, etc.). Make the code self-explanatory through naming and structure instead.
2. When you edit a file, delete every existing code comment in it, including `//`, `/* */`, `/** */`, `<!-- -->`, and `#` comments.
3. Never read, grep, or glob inside `node_modules`. Use official docs or type definitions exposed through the project's own source instead.

## Exceptions

Keep only comments that tooling requires to function:

- Directives such as `// @ts-expect-error`, `// eslint-disable`, `/* @vite-ignore */`, and `// prettier-ignore`
- Shebangs and license headers required by a dependency
- Astro frontmatter fences (`---`) are not comments and must stay
