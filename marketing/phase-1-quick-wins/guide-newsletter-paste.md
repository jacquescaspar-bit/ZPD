# Guide — print + newsletter paste

**Canonical page:** https://zpdlearning.com/blog/is-tutoring-the-right-fit

A PNG or JPEG **cannot** hold a clickable link. Pixels only. The click has to live in the newsletter HTML (image wrapped in `<a>`), or the editor hyperlinks the image after paste.

| Asset                                                                                      | Use                                                                                         |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| `public/guides/is-tutoring-the-right-fit.pdf` (copy in `phase-1-quick-wins/guide-assets/`) | Print / attach as a handout. Links work in Preview, Acrobat, and browsers.                  |
| `public/guides/is-tutoring-the-right-fit-a4.png`                                           | One-page image for print newsletters / Word.                                                |
| `public/guides/is-tutoring-the-right-fit-newsletter.png` (copy in `guide-assets/`)         | Digital newsletters. Paste the image. URL is printed on it. Operator inlines this on T5/T4. |
| `public/guides/newsletter-embed.html`                                                      | HTML wrap: image already linked. Paste HTML if the CMS allows it.                           |

Rebuild after copy changes: `pnpm guide:print`

## First-touch (T5 school office, T4 P&C)

Ask stays “get this into the newsletter.” Do not offer to pay.

1. Inline or attach the **newsletter PNG**.
2. Put the URL in the body as plain text (not the only thing they have to click).

```
Please share this free page in the parent newsletter with families who are considering tutoring.

https://zpdlearning.com/blog/is-tutoring-the-right-fit
```

If they can hyperlink an image: point it at that URL.

## HTML they can paste (digital newsletter)

```html
<a href="https://zpdlearning.com/blog/is-tutoring-the-right-fit">
  <img
    src="https://zpdlearning.com/guides/is-tutoring-the-right-fit-newsletter.png"
    alt="Is tutoring actually the right fit? A parent page from ZPD Learning"
    width="600"
    style="max-width:100%;height:auto;border:0;display:block;"
  />
</a>
```

Remote image `src` is a fetch from our domain — some school filters block it. Copy-pasting the PNG bytes into the newsletter avoids that. The URL printed on the image still works if they cannot click.

## T3 clinics

Attach the **PDF**. That is the handout. Same URL in the body if they also want the live page.
