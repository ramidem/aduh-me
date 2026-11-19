---
title: what the blog?
date: 2026-10-13T19:46:00+08:00
description: How this notes blog is put together
category: astro
---

This blog is a set of notes. Each note is a markdown file in `src/content/notes/`, loaded by an Astro content collection.

## Folders

A note's folder is its `category` in front matter. This one sits in `astro`:

```yaml
category: astro
```

Folders are one level deep: no folders inside folders. **All Notes** shows every note, whatever its folder.
