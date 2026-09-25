# Camping- und Naturfreunde Türlersee — Website

Moderne, statische Website (HTML5, responsiv) mit CMS-Editor für Aktivitäten und
Online-Anmeldungen für Verein und Aktivitäten.

## Technik

- **[Eleventy](https://www.11ty.dev/)** — generiert statisches HTML5 aus Vorlagen (`src/`)
- **[Decap CMS](https://decapcms.org/)** unter `/admin/` — Aktivitäten, Vereinsdaten und
  Website-Texte bearbeiten, ohne Code anzufassen. Jede Änderung wird als Git-Commit
  gespeichert.
- **[Netlify Forms](https://docs.netlify.com/forms/setup/)** — Formulare für die
  Vereinsanmeldung (`/mitglied-werden/`) und für Aktivitäten-Anmeldungen laufen ohne
  eigenes Backend; Einträge landen im Netlify-Dashboard (und optional per E-Mail).

## Lokal entwickeln

```bash
npm install
npm start
```

Öffnet einen lokalen Server mit Live-Reload (Standard: http://localhost:8080).

```bash
npm run build
```

Baut die Seite nach `_site/`.

## Aktivität hinzufügen

Entweder über `/admin/` (CMS) oder manuell eine neue Datei in `src/activities/`
anlegen, z. B. `src/activities/sommerfest.md`:

```markdown
---
title: Sommerfest
date: 2026-07-18
time: "14:00 – 22:00"
location: Camping Türlersee
registration: true
---
Beschreibungstext der Veranstaltung.
```

## Deployment (Netlify) — einmalige Einrichtung

1. Auf [netlify.com](https://app.netlify.com) mit dem GitHub-Account einloggen.
2. "Add new site" → "Import an existing project" → das GitHub-Repo auswählen.
3. Build-Einstellungen werden aus `netlify.toml` übernommen (Build: `npm run build`,
   Publish: `_site`).
4. Für das CMS-Login unter `/admin/`: Im Netlify-Dashboard **Identity** aktivieren
   (Site settings → Identity → Enable Identity) und unter **Services** die
   **Git Gateway** aktivieren. Danach unter Identity → Invite users die
   Vorstandsmitglieder einladen, die Inhalte bearbeiten dürfen sollen.
5. Für E-Mail-Benachrichtigungen bei neuen Anmeldungen: Site settings → Forms →
   Form notifications → "Email notification" hinzufügen.

## Struktur

```
src/
  _data/          Website-Texte & Vereinsdaten (JSON, via CMS editierbar)
  _includes/      Layouts (Basis-Template, Aktivitäts-Template)
  activities/     Eine Markdown-Datei pro Aktivität
  admin/          Decap CMS Konfiguration
  css/, js/, images/
  index.njk, verein.njk, aktivitaeten.njk, mitglied-werden.njk
```
