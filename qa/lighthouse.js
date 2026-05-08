const path = require('node:path');
const {ensureDir, getTargetUrl, qaRoot, run, timestamp} = require('./common');

const url = getTargetUrl();
const outDir = path.join(qaRoot, 'lighthouse', timestamp());
const tmpDir = path.join(qaRoot, 'tmp', 'lighthouse');
ensureDir(outDir);
ensureDir(tmpDir);

const profiles = [
    {name: 'mobile', formFactor: 'mobile'},
    {name: 'desktop', formFactor: 'desktop', preset: 'desktop'}
];

function score(report, key) {
    return Math.round((report.categories[key].score || 0) * 100);
}

for (const profile of profiles) {
    const outPath = path.join(outDir, profile.name);
    const cliOutPath = path.relative(process.cwd(), outPath).replace(/\\/g, '/');
    const result = run('npx', [
        'lighthouse',
        url,
        '--quiet',
        '--chrome-flags=--headless=new --no-sandbox',
        `--form-factor=${profile.formFactor}`,
        `--throttling-method=simulate`,
        `--output=json`,
        `--output=html`,
        `--output-path=${cliOutPath}`
    ].concat(profile.preset ? [`--preset=${profile.preset}`] : []), {
        allowFailure: true,
        env: {
            TMP: tmpDir,
            TEMP: tmpDir
        }
    });

    const reportPath = `${outPath}.report.json`;
    if (!require('node:fs').existsSync(reportPath)) {
        const output = `${result.stdout || ''}${result.stderr || ''}`.trim();
        const tail = output.split(/\r?\n/).slice(-80).join('\n');
        throw new Error(`lighthouse ${profile.name} failed\n${tail}`);
    }

    const report = require(reportPath);
    console.log(`${profile.name}: P${score(report, 'performance')} A${score(report, 'accessibility')} BP${score(report, 'best-practices')} SEO${score(report, 'seo')}`);
}

console.log(`report=${outDir}`);
