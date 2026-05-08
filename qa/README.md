# QA Setup

Default target URL: `https://deutschmitbuba.de/`

Override it for local or staging checks:

```powershell
$env:QA_URL="http://127.0.0.1:2368/"; yarn qa:all
```

Use Node 22 for this theme. Local Node 24 can install with `--ignore-engines`, but `gscan@5.2.4` officially supports Node 22 and will otherwise warn or fail during dependency operations.

Generated artifacts:

- screenshots: `qa/screenshots/`
- Lighthouse: `qa/lighthouse/`
- pa11y: `qa/a11y/`

Current verified baseline on 2026-05-08:

- `yarn qa:gscan`: ok
- `yarn qa:css`: ok
- `yarn qa:screenshots`: ok at 390, 768, 1024, 1440, 1920 px
- `yarn qa:lighthouse`: ok, writes Mobile and Desktop reports
- `yarn qa:a11y`: currently fails on the live site with 7 findings. Most are Ghost Portal hash links (`#/portal/...`) reported as missing anchors; one is the homepage email input name; one is an injected hidden iframe without title.

If a browser error appears, install the Playwright browser once:

```powershell
corepack yarn playwright install chromium
```
