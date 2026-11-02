# Peng Cai’s academic homepage / 蔡鹏的学术主页

A bilingual academic website built with Next.js and exported to GitHub Pages. English is the default; readers can switch to Chinese. Search-engine indexing is intentionally disabled.

## Local preview

```sh
cd site
npm ci
npm run build
npm run check:content
python3 -m http.server 8011 --bind 127.0.0.1 --directory out
```

Visit http://127.0.0.1:8011/. `npm run dev` supports live development. `npm start` is not used for static exports.

## Content ownership

| Content | Edit |
| --- | --- |
| Name, title, contact, navigation | `site/content/config.toml` and `site/content_zh/config.toml` |
| Short biography and PhD application statement | Each locale's `bio.md` and `about.toml` |
| Bibliographic facts and explicit publication status | `site/content/publications.bib` only |
| Localized summaries, research labels and individual contributions | Each locale's `publications.toml`, keyed by citation ID |
| Research themes and ongoing work | Each locale's `projects.toml`; link articles by `publication_id` |
| Brief education and experience | Each locale's `cv.md` |
| Independent PDF CV | Optional `pdf_url` in each locale's `cv.toml` |

The PDF can be produced outside this repository. Once ready, either place the final file in `site/public/` and configure `/filename.pdf`, or configure an HTTPS URL. No download button is shown until a URL is provided. The website does not generate or maintain the PDF's contents.

Published articles have DOI links and BibTeX. Manuscripts under review are labelled explicitly and are not rendered as published journal citations. Work in preparation belongs on the Research page. Invalid or missing publication status fails the build. `*` denotes joint first authors; `#` denotes corresponding authors; neither is included in exported BibTeX names.

The homepage and Research page derive publication information from the same records. Do not recreate a localized BibTeX copy or manually repeat publication lists in CV. Keep descriptions brief; retain scientific qualification through accurate study-design wording. Individual contributions must be supported by the authorship statement or the site owner's confirmation.

## Validation and deployment

Run `npm run build` followed by `npm run check:content` from `site/`. The content checks exercise status parsing, bilingual bibliography consistency, author markers, export fields, research references and visible static HTML. Browser review should cover both languages, mobile and desktop, light and dark themes, reload/navigation titles, internal anchors and citation disclosure/copy.

Pushing to `master` triggers `.github/workflows/deploy.yml`. Builds copy the root `CNAME` into `site/out/`. A local edit or commit alone does not deploy the site. Preserve the noindex metadata and `site/public/robots.txt`, and avoid runtime font/CDN dependencies.

Local research documents in `files/` and `CLAUDE.local.md` are private and ignored by Git.

## Credits

The original codebase is derived from [PRISM](https://github.com/xyjoey/PRISM); its MIT license is retained in `site/LICENSE`. The 2026 redesign takes inspiration from the reading-first layout and centralized content approach of [academic-homepage](https://github.com/siruizou2005/academic-homepage). It retains this repository's Next.js implementation and bilingual content structure.
