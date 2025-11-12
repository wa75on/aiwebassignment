# Website Structure

## Directory Organization

```
website/
├── index.html          # Main plea page (root entry point)
├── images/             # All image assets (.jpeg, .jpg, .png)
├── pages/              # Additional HTML pages
│   ├── docx-hell.html  # Anti-.docx rant page
│   └── markdown.html   # Markdown tribute page
├── scripts/            # All JavaScript files
│   ├── tooplate-minimal-script.js
│   ├── markdown-tribute.js
│   └── plea.js
└── styles/             # All CSS files
    ├── tooplate-minimal-white-style.css
    ├── markdown-tribute.css
    └── plea.css
```

## File References

### Root index.html (plea page):
- CSS: `styles/filename.css`
- JS: `scripts/filename.js`
- Images: `images/filename.jpeg`
- Pages: `pages/pagename.html`

### Pages folder (docx-hell.html, markdown.html):
- CSS: `../styles/filename.css`
- JS: `../scripts/filename.js`
- Images: `../images/filename.jpeg`
- Cross-page: `pagename.html` or `../index.html`

## Entry Point

Open `index.html` in the root - this is the main plea page that users see first.
