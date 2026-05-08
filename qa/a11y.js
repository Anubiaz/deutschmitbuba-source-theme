const path = require('node:path');
const {ensureDir, getTargetUrl, qaRoot, run, timestamp} = require('./common');

const url = getTargetUrl();
const outDir = path.join(qaRoot, 'a11y', timestamp());
ensureDir(outDir);

const result = run('npx', [
    'pa11y',
    url,
    '--reporter',
    'json',
    '--timeout',
    '60000',
    '--wait',
    '1000'
], {allowFailure: true});

const issues = JSON.parse(result.stdout || '[]');
const outFile = path.join(outDir, 'pa11y.json');
require('node:fs').writeFileSync(outFile, JSON.stringify(issues, null, 2));

if (issues.length > 0) {
    console.log(`a11y: ${issues.length} issue(s)`);
    console.log(`report=${outFile}`);
    process.exit(1);
}

console.log('a11y: ok');
console.log(`report=${outFile}`);
