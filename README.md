# aduh-me

Med Aduh's personal site: a notes blog laid out like a notes app, built with [Astro](https://astro.build).

## Notes

Each note is a markdown file in `src/content/notes/`. The file name is the URL slug, so `start-here.md` is served at `/start-here/`.

Front matter:

| Field         | Required | Meaning                                                                     |
| :------------ | :------- | :-------------------------------------------------------------------------- |
| `title`       | yes      | The note title.                                                             |
| `date`        | yes      | Publish date with a UTC offset. Notes dated in the future stay hidden.      |
| `description` | yes      | One line, used in the note list, meta description and RSS.                  |
| `category`    | no       | The folder the note sits in, served at `/folders/<category>/`.              |
| `pinned`      | no       | `true` lists the note under Pinned and makes it the opening note on `/`.    |
| `draft`       | no       | `true` shows the note in `npm run dev` and leaves it out of the build.      |

`not-found.md` is the 404 page and never appears in the list. `folders` and `tags` cannot be note slugs.

## Commands

Use the Node version in `.nvmrc`:

```sh
nvm use
npm install
```

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm run dev`     | Start the dev server at `localhost:4321`.   |
| `npm run build`   | Build the site to `dist/`.                  |
| `npm run preview` | Serve the built site locally.               |

The build also writes `sitemap-index.xml`, `robots.txt` and `rss.xml`.
