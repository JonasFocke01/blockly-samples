#!/usr/bin/env node
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

const args = process.argv.slice(2);
const {spawnSync} = require('child_process');

const script = args[0];
if (['build', 'start', 'clean', 'lint'].includes(script)) {
  const result = spawnSync('node',
      [].concat(require.resolve('../scripts/' + script))
          .concat(args.slice(1)), {stdio: 'inherit'}
  );
  if (result.signal) {
    if (result.signal === 'SIGKILL') {
      console.log('The build failed because the process exited too early. ');
    } else if (result.signal === 'SIGTERM') {
      console.log('The build failed because the process exited too early. ');
    }
    process.exit(1);
  }
  process.exit(result.status);
} else {
  console.log('Unknown script "' + script + '".');
}
