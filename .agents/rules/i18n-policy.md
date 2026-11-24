# Internationalization (i18n) Policy

## Supported Locales (v1.0)
- Exact locale set: `["es", "en"]`.
- No third locale and no runtime machine translation in v1.0.

## 100% Parity Rules
1. **No hardcoded UI copy**: Every user-visible string (labels, headings, buttons, `aria-label`, placeholders, empty states, error messages, SEO metadata) must come from `messages/es.json` and `messages/en.json` via `next-intl`.
2. **Key symmetry**: `messages/es.json` and `messages/en.json` must always contain the exact same key hierarchy. Never add a key to one file without adding its natural translation to the other in the same change.
3. **Project content symmetry**: Every slug in `content/projects/es/<slug>.mdx` must have an exact counterpart in `content/projects/en/<slug>.mdx` with identical `slug`, `date`, `featured`, `stack`, and URL metadata, and naturally written copy in each language.
4. **Localized recruiter assets**:
   - CV downloads must map to the active locale (`public/cv/CV-<Nombre>-ES.pdf` and `public/cv/CV-<Nombre>-EN.pdf`).
   - OpenGraph title, description, and preview cards must match the active locale.
5. **Natural technical tone**: Write Spanish and English copy directly for recruiters and engineering leads — avoid literal word-for-word machine translation.
