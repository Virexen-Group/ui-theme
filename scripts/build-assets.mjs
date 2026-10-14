
import {
  mkdir,
  copyFile,
  readdir
} from 'node:fs/promises';

import { join } from 'node:path';

const source = 'src';
const destination = 'dist';

await mkdir(destination, { recursive: true });
await mkdir(join(destination, 'fonts'), {
  recursive: true
});

for (const file of [
  'theme.css',
  'email.js',
  'email.d.ts'
]) {
  await copyFile(
    join(source, file),
    join(destination, file)
  );

  console.log(`Copied ${file}`);
}

await copyFile(
  join(source, 'styles', 'components.css'),
  join(destination, 'components.css')
);

console.log('Copied components.css');

const fontFiles = await readdir(
  join(source, 'fonts')
);

for (const file of fontFiles) {
  if (
    file.endsWith('.woff2') ||
    file === 'LICENSE'
  ) {
    await copyFile(
      join(source, 'fonts', file),
      join(destination, 'fonts', file)
    );
  }
}

console.log('Virexen UI assets built.');
