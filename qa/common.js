const {spawnSync} = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const themeRoot = path.resolve(__dirname, '..');
const qaRoot = path.resolve(themeRoot, 'qa');
const defaultUrl = 'https://deutschmitbuba.de/';

function getTargetUrl() {
    return process.env.QA_URL || defaultUrl;
}

function ensureDir(dir) {
    fs.mkdirSync(dir, {recursive: true});
}

function timestamp() {
    return new Date().toISOString().replace(/[:.]/g, '-');
}

function run(command, args, options = {}) {
    const executable = command;
    const result = spawnSync(executable, args, {
        cwd: options.cwd || themeRoot,
        env: {...process.env, ...(options.env || {})},
        encoding: 'utf8',
        shell: process.platform === 'win32',
        stdio: options.stdio || 'pipe'
    });

    if (result.status !== 0 && !options.allowFailure) {
        const output = `${result.stdout || ''}${result.stderr || ''}`.trim();
        const tail = output.split(/\r?\n/).slice(-80).join('\n');
        throw new Error(`${executable} ${args.join(' ')} failed\n${tail}`);
    }

    return result;
}

module.exports = {
    defaultUrl,
    ensureDir,
    getTargetUrl,
    qaRoot,
    run,
    themeRoot,
    timestamp
};
