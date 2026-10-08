# Future Voices

Website for **Future Voices**, a Feed the Monster program that teaches young people public speaking,
confidence, and speech & debate through games and activities.

It's a static site with no build step: open `index.html` in a browser. Pushing to `main` publishes it
to GitHub Pages through `.github/workflows/deploy.yml` (one-time setup: Settings → Pages → Source:
**GitHub Actions**).

## Pages and files

| File | What it is |
|---|---|
| `index.html` | The main site |
| `toolkit.html` | Chapter lead toolkit: roster, attendance and skill-path tracking |
| `css/style.css` | Shared styles and color tokens (light and dark) |
| `js/common.js` | Shared theme switch and toast messages |

## What's on it

- **Quick debate card** (hero): draws a kid-friendly topic, assigns a side, and runs a 60-second
  speaking clock with optional sound cues (off by default).
- **Program pillars**: confidence, public speaking, speech & debate.
- **Activities**: 12 games, filterable by skill. Each card opens step-by-step instructions and a tip for leaders.
- **A 60-minute chapter meeting**, drawn to scale.
- **Five-level skill path**: Spark, Story, Stage, Spar, Showcase.
- **Chapters**: roles, four steps to start one, a starter kit, an application form, and a chapter directory.
- **FAQ**.
- **Light/dark theme switch** in the nav, remembered per browser.

## Chapter lead toolkit

`toolkit.html` helps a chapter lead run meetings:

- **Roster**: add members, set their level, see each member's attendance rate.
- **Attendance**: create a meeting and everyone starts as present; tap a status to cycle
  Present → Late → Excused → Absent.
- **Skill path**: a board of the five levels with a "Level up" button for each member.
- **Copy roster as CSV** to paste into a spreadsheet.

It opens with a clearly labeled example chapter. Data is saved in the browser's local storage on
that device only, so it is not shared between people or devices.

## Editing

Everything you'd change often is a plain list near the top of the `<script>` block:
`TOPICS` (debate topics), `GAMES` (activities), `MEETING` (meeting agenda), and `CHAPTERS`
(the directory: add `{ name, place, since }` once a chapter holds its first meeting).

## Connecting the application form

The form doesn't send anything until you connect it. Set `FORM_ENDPOINT` to a form-service URL
(Formspree, a Google Apps Script web app, etc.). It receives a JSON POST with `role`, `name`,
`email`, `organization`, `location`, `ages`, and `why`.
