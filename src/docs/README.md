# Docs

```
meta.ts              title, description, intro, order for every docs page (drives SEO, sitemap, prev/next)
pages/               one file per page, registered in pages/index.ts
components/DocPage   standard template: header, sidebar, SEO + JSON-LD, prev/next. Wrap <DocSection>s.
components/ui.tsx    P, H3, Table, Note, Code, K, C, A
components/Shot.tsx  screenshot slot: drop public/docs/<name>.png, placeholder shows until then
```

## Add a page
1. Add `{ path, title, description, intro }` to `meta.ts` (description ~120-160 chars).
2. Create `pages/MyPage.tsx`:
   ```tsx
   <DocPage path="/docs/my-page">
     <DocSection id="intro" eyebrow="Overview" title="Intro">...</DocSection>
   </DocPage>
   ```
   Sidebar comes from the sections. Use `group` to group them, `nav` for a shorter label.
3. Register it in `pages/index.ts`.

The sitemap is generated at build (`vite.config.ts`). Deep links: `/docs/<page>#<section-id>`.
