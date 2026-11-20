---
title: Hello, notes
date: 2026-10-13T14:27:00+08:00
description: Every piece of markdown a note can use
pinned: false
draft: true
---

Sample note. Every piece of markdown a note can use, so the styles get tested in one place.

## Headings

The note title is the `title` in front matter. Inside a note, headings go from two levels down to six.

### Third level

#### Fourth level

##### Fifth level

###### Sixth level

## Text

A paragraph with *emphasis*, **strong text**, ***both at once***, ~~strikethrough~~, and `inline code`.\
This line follows a hard line break.

Links: [an inline link](/), [a link with a title](https://github.com/ramidem "ramidem on GitHub"), and an autolink <https://ramidem.github.io>.

An abbreviation: <abbr title="HyperText Markup Language">HTML</abbr>. A footnote reference.[^1]

## Quotes

> A blockquote. Good for things other people said.
>
> > A quote inside a quote.

## Lists

- Unordered item
- Another item
  - Nested item
  - Another nested item

1. Ordered item
2. Second item
   1. Nested ordered item
3. Third item

- [x] A finished task
- [ ] An open task

<dl>
<dt>Definition term</dt>
<dd>The definition, from a definition list.</dd>
</dl>

## Code

```ruby
def greet(name)
  puts "Hello, #{name}"
end

greet("notes")
3.times { |i| puts i }
```

## Table

| Syntax       | Renders as   | Count |
| :----------- | :----------: | ----: |
| `*em*`       | *em*         | 1     |
| `**strong**` | **strong**   | 2     |
| `~~del~~`    | ~~del~~      | 3     |

## Image

![The site icon](/images/notes/site-icon.png "The site icon")

## Media

Markdown has no syntax for these, so each one is a small block of HTML.

### Image with a caption

<figure class="note-figure">
<img src="/images/notes/site-icon.png" alt="The site icon" loading="lazy">
<figcaption>An image with a caption.</figcaption>
</figure>

### Video

<figure class="note-figure note-video">
<video controls playsinline preload="metadata" aria-label="A flower blooming">
<source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" type="video/webm">
<source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4">
<a href="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4">Download the video</a>
</video>
<figcaption>A self-hosted video with controls. Sample clip: MDN, CC0.</figcaption>
</figure>

### Looping clip

<figure class="note-figure note-video">
<video autoplay muted loop playsinline data-loop aria-label="A flower blooming, looping">
<source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4">
<a href="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4">Download the video</a>
</video>
<figcaption>The same clip, silent and autoplaying, in place of a GIF.</figcaption>
</figure>

### YouTube

<figure class="note-figure note-embed">
<a class="note-youtube" href="https://www.youtube.com/watch?v=jNQXAC9IVRw" data-youtube-id="jNQXAC9IVRw" data-title="Me at the zoo">
<img src="https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg" alt="" loading="lazy">
<span class="note-youtube-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></span>
<span class="visually-hidden">Play video: Me at the zoo</span>
</a>
<figcaption>Loads the player only when clicked.</figcaption>
</figure>

### Audio

<figure class="note-figure note-audio">
<audio controls preload="metadata" src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" aria-label="A T. rex roar">
<a href="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3">Download the audio</a>
</audio>
<figcaption>An audio clip. Sample: MDN, CC0.</figcaption>
</figure>

### Link cards

<div class="note-card-block">
<a class="note-card" href="https://docs.astro.build/en/guides/content-collections/" target="_blank" rel="noopener noreferrer">
<span class="note-card-text">
<strong>Content collections</strong>
<span class="note-card-description">How Astro loads and queries a folder of markdown files.</span>
<span class="note-card-host">docs.astro.build</span>
</span>
</a>
</div>

<div class="note-card-block">
<a class="note-card" href="/what-the-blog/">
<span class="note-card-text">
<strong>what the blog?</strong>
<span class="note-card-description">A link to another note, with an image on the right.</span>
<span class="note-card-host">aduh-me</span>
</span>
<img class="note-card-image" src="/images/notes/site-icon.png" alt="" loading="lazy">
</a>
</div>

---

Above is a horizontal rule. Footnotes collect below.

[^1]: The footnote text, with a link back.
