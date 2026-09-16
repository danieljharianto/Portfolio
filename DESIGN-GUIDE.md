# Portfolio typography and grid

Reference: https://future-assemblies.com/ (inspected 2026-09-14).

The reference declares body and caption text at 1.2 Cargo rem / 1.25 line-height, h1 at 2.6 rem / 1, h2 at 1.3 rem / 1.3, column gutters at 2 rem, and page padding at 1.5 rem. Its current project list has four equal columns. Rules are 1px, black at 20% opacity; text is black at 85%; background is white.

Our implementation normalizes one Cargo rem to 12.5px (an approximation of the supplied upd export, whose body text is 14.861px). These are CSS targets, not browser-measured dimensions of the live reference:

| Guide | Local size |
| --- | --- |
| Body, title, date, filters, footer | 15px / 18.75px |
| Intro heading | 32.5px / 32.5px |
| Intro name | 16.25px / 21.125px |
| Column gutter | 25px |
| Outer margin | 18.75px |
| Project top spacing | 8px |
| Project bottom spacing | 14px |

Edit tokens at the top of portfolio.css. Project columns use proportions 0.8 : 1.2 : 0.6 : 1.8, giving the preview approximately 41% of the available column width. Desktop previews use a 2.4:1 aspect ratio; mobile previews use 2:1. Images fill the frame with object-fit: cover. Header and footer retain their original guides. At 1000px the list becomes two columns; at 600px it stacks, with 16px margins and a 30px intro heading. These breakpoints are local adaptations.

The reference uses Diatype Variable and Diatype Mono Variable. Its font resource is restricted to Cargo. This project uses its existing local PP Mori files and a system monospace fallback; glyph shapes and line wrapping will differ. No reference font files were copied.

Browser automation was unavailable in this session. Layout values were checked against downloaded public HTML/CSS; visual parity remains unverified.


Category tabs: restored to the original left-aligned layout, 24px / 1.1 and weight 700 (19px on mobile), 32px desktop gap, with an active underline. Tabs use SF Pro from the same font source declared in upd/src/index.css, with system sans-serif fallback. The compact project rows and wide previews are retained.

Navigation update: About sits at the far right of the category toolbar in matching SF Pro styling. The header contact link is removed. The intro uses two equal columns (name left, statement right and left-aligned), stacking on mobile. The project count remains available to screen readers.

Latest layout: project categories are nested beneath the short description, with 12px top spacing. Desktop intro and project rows share the same three-column template (0.8 : 1.8 : 1.8), aligning the intro statement with the preview image. Tablet layouts share the same two-column template; mobile stacks. Category tabs explicitly use normal font style with slnt/ital axes set to zero. The about label is lowercase.

Desktop project rows now have a fixed total height of 200px, including padding and border. The description column is 365px, with 13px text and 1.3 line-height. Previews fill the available row height. Long summaries can scroll within their column. At 1000px and below, row height is automatic and columns are fluid to keep text readable. Intro alignment follows the updated shared grid.

Correction: the remote Figma SF Pro source is removed. Tabs request only a locally installed upright SF Pro Display Bold face; Arial is the Windows fallback. Desktop descriptions use 24% of the content width, approximating the reference's equal quarter-column minus gutters (about 298px at a 1280px viewport). Desktop/tablet rows are 120px including padding; summaries scroll if necessary. Mobile stacks with a 120px image and automatic total row height.

Row height adjustment: desktop/tablet project rows increased from 120px to 150px to show more content. Mobile preview height is also 150px; stacked mobile rows retain automatic height.

Project detail sizing: content maximum width 1500px, retaining responsive outer margins. Project title 24px; overview highlight 16px; location and gallery headings 15px; descriptions, year, metadata, and categories 13px. Navigation retains the homepage's 18px/16px desktop/mobile scale. All use shared SF Pro typography.
