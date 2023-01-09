import { spawn } from 'cross-spawn';

/**
 * Async `exec`.
 *
 * Inspired by `remix-run` build [scripts](https://github.com/remix-run/remix/blob/534e1ec071f17654a4db8622e30d6ff70548ce26/scripts/build.mjs).
 *
 * @param {string} command - Shell command to execute.
 * @param {string[]} [args] - Command arguments.
 * @param {import('node:child_process').SpawnOptions} options - Options to pass to `cross-spawn`.
 * @returns {Promise<void>} Returns a Promise which resolves when `command` exits. If the exit code is non-zero, it rejects with the exit code.
 */
export function exec(command, args = [], options = {}) {
  /** @type {(data: Error) => any} */
  const handleError = (data) => console.error(data.toString().trim());

  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: process.cwd(),
      stdio: 'inherit',
      ...options,
    });

    const onExit = () => child.kill('SIGINT');

    process.on('SIGINT', onExit);
    process.on('SIGTERM', onExit);

    child.on('error', handleError);
    child.on('close', (code) => {
      if (code === 0) {
        resolve(void 0);
      } else {
        reject(code);
      }
    });
  });
}
