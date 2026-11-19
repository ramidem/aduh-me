# Notes URLs

## Better plan

Keep the path-based design and fix its one real weakness:

| URL | Role |
| --- | --- |
| `/` | All Notes, indexable |
| `/<slug>/` | Canonical note, indexable, listed under All Notes |
| `/folders/<name>/` | Folder landing page, indexable |
| `/folders/<name>/<slug>/` | The same note under that folder, `rel=canonical` to `/<slug>/`, left out of the sitemap |

- **A prefix for lists:** `/folders/` fixes the root collisions. Reserved top-level names shrink to `folders` and `tags`.
- **Smart folders:** they get `/tags/<name>/` or `/smart/<name>/` with the same shape, and one definition file (id → filter) as the source of truth. Folders are then just one kind of filter.
- **Search:** `?q=` stays a query param. It's a view over any list and never indexed.
- **Scaling limit:** pages grow as notes × contexts. That's fine for hundreds of notes. If it ever hurts, switch just the context variants to `?in=` plus client filtering, since the note body never depends on context.
