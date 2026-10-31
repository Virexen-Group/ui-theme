import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const launcher=fs.readFileSync('src/data/virexen-app-launcher.ts','utf8');
test('the app launcher lists Virexen CMS',()=>{assert.match(launcher,/\{ id: 'Virexen-CMS', label: 'Virexen CMS', href: 'https:\/\/cms\.virexen\.com' \}/)});
