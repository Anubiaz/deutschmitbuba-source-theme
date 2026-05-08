# Source Theme Agent Notes

- This theme uses Yarn via `yarn.lock`; do not run `npm install`.
- Do not run `npm audit fix` or `npm audit fix --force` for this theme.
- Use Node 22 unless a deliberate Node upgrade task is requested.
- Preferred local check from the workspace root:

```powershell
.\Theme\scripts\Invoke-SourceFastCheck.ps1
.\Theme\scripts\Invoke-SourceFastCheck.ps1 -Build
.\Theme\scripts\Invoke-SourceFastCheck.ps1 -Zip
```

- `node_modules/`, `dist/`, and npm lockfiles are not deployment sources.
- For larger changes, use the QA scripts in `package.json`: `yarn qa:all` or targeted `yarn qa:gscan`, `yarn qa:css`, `yarn qa:a11y`, `yarn qa:screenshots`, `yarn qa:lighthouse`.
- QA artifacts are written under `qa/` and should be referenced by path instead of pasting long output into chat.
