# kadence-child-theme

WordPress Kadence child theme starter with a custom Gutenberg hero banner block, one custom template, and example page setup guidance.

The theme is installed in `wp-content/themes/kadence-child-theme`. Activate **Kadence Child Theme** from **Appearance > Themes**.

To pull upstream updates, run this from the child theme directory:

```powershell
git pull
```

`style.css` provides the theme metadata required by WordPress and declares `kadence` as the parent theme.

In the block editor, open the block inserter with **+** and add **Kadence Hero Banner** from the **Kadence Child** category. The hero includes a WebP background, award image, two achievement cards, registration button, and video play button. Edit the content, images, links, typography, and button gradient in the block settings. The video iframe is created only after the play button is clicked and removed when the dialog closes. The block uses local CSS and inline SVG icons without external font or icon libraries.

Add **Artikel Terbaru** from the same category to display the latest published posts in a horizontally scrollable card layout. Its block settings let you change the heading and show between one and twelve posts.

Add **BUMP Ponpes An-Nur II** to show five circular BUMP logos. In the block settings, choose an image, edit each unit name, and optionally add its link.

Add **Sosial Media** to display a social-media callout with Facebook, Instagram, YouTube, and TikTok links. Edit the text and account URLs in the block settings, and optionally select an illustration from the Media Library.
