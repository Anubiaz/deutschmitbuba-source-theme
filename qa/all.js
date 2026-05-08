const {run} = require('./common');

const checks = [
    'qa:gscan',
    'qa:css',
    'qa:a11y',
    'qa:screenshots',
    'qa:lighthouse'
];

const failures = [];

for (const check of checks) {
    const result = run('corepack', ['yarn', check], {allowFailure: true});
    const output = `${result.stdout || ''}${result.stderr || ''}`.trim();
    const lines = output.split(/\r?\n/).filter((line) => {
        return /^(gscan|a11y|screenshots|mobile:|desktop:|report=|Done in|error Command failed|✓ Your theme|[\w-]+: ok)/.test(line.trim());
    });

    console.log(`\n[${check}] ${result.status === 0 ? 'ok' : 'failed'}`);
    console.log((lines.length ? lines : output.split(/\r?\n/).slice(-20)).join('\n'));

    if (result.status !== 0) {
        failures.push(check);
    }
}

if (failures.length > 0) {
    console.log(`\nqa:all failed: ${failures.join(', ')}`);
    process.exit(1);
}

console.log('\nqa:all: ok');
