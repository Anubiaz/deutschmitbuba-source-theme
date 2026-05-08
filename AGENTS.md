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
