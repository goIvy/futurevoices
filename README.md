# Future Voices

Website for **Future Voices**, a Feed the Monster program that teaches young people public speaking,
confidence, and speech & debate through games and activities.

It's one self-contained page: open `index.html` in a browser, or host it with GitHub Pages
(Settings → Pages → deploy from the `main` branch root).

## What's on it

- **Quick debate card** (hero): draws a kid-friendly topic, assigns a side, and runs a 60-second speaking clock.
- **Program pillars**: confidence, public speaking, speech & debate.
- **Activities**: 12 games, filterable by skill.
- **A 60-minute chapter meeting**, drawn to scale.
- **Five-level skill path**: Spark, Story, Stage, Spar, Showcase.
- **Chapters**: roles, four steps to start one, a starter kit, an application form, and a chapter directory.
- **FAQ**.

## Editing

Everything you'd change often is a plain list near the top of the `<script>` block:
`TOPICS` (debate topics), `GAMES` (activities), `MEETING` (meeting agenda), and `CHAPTERS`
(the directory: add `{ name, place, since }` once a chapter holds its first meeting).

## Connecting the application form

The form doesn't send anything until you connect it. Set `FORM_ENDPOINT` to a form-service URL
(Formspree, a Google Apps Script web app, etc.). It receives a JSON POST with `role`, `name`,
`email`, `organization`, `location`, `ages`, and `why`.
