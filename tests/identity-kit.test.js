import {test} from 'node:test';import {strict as assert} from 'node:assert';import {readFileSync,existsSync,readdirSync} from 'node:fs';
const read=(x)=>readFileSync(x,'utf8');

// Apps import theme.css alone; 0.6.4–0.6.8 shipped a stub that silently dropped these.
test('theme.css keeps the shared classes, tokens and self-hosted Manrope',()=>{
  const css=read('src/theme.css');
  for(const cls of ['.btn','.btn-primary','.btn-block','.btn-link','.btn-danger','.notice','.notice-warning','.notice-error','.notice-success','.field','.muted','.stack','.panel','.eyebrow','.code-input','.sr-only'])
    assert.match(css,new RegExp(`\\${cls}\\b`),`theme.css is missing ${cls}`);
  for(const token of ['--color-danger','--color-success','--color-warning','--color-input-bg','--radius-md','--focus'])assert.ok(css.includes(`${token}:`),`theme.css is missing ${token}`);
  assert.ok((css.match(/@font-face/g)||[]).length>=6);
  const fonts=readdirSync('src/fonts');
  for(const match of css.matchAll(/url\(\.\/fonts\/([^)]+)\)/g))assert.ok(fonts.includes(match[1]),`missing font file ${match[1]}`);
  assert.ok(read('scripts/build-assets.mjs').includes('src/fonts'));
});

test('every preset defines the text colour on primary actions',()=>{
  const css=read('src/styles/packs-notifications.css');
  assert.match(css,/:root\{--vx-action-text:#fff\}/);
});

test('identity preset is typed, styled and gives identity layouts the soft background',()=>{
  assert.match(read('src/config/virexen-ui.ts'),/'identity'/);
  assert.match(read('src/styles/packs-notifications.css'),/\[data-vx-preset="identity"\]\{--vx-action:#1f6feb/);
  assert.match(read('src/styles/identity.css'),/\[data-vx-preset="identity"\] \.vx-identity \{ background:/);
});

test('identity icons are mapped and catalogued',()=>{
  const icon=read('src/components/icons/VIcon.vue'),catalog=read('src/components/icons/icon-catalog.ts');
  for(const name of ['key','passkey','mail','plus-circle','arrow-left','smartphone','user-plus','user-check','qr-code','lock','close','shield-alert']){
    assert.ok(new RegExp(`(^|[\\s,{])'?${name}'?:`,'m').test(icon),`VIcon has no ${name}`);
    assert.ok(catalog.includes(`'${name}'`),`catalogue has no ${name}`);
  }
});

test('VAccountListItem is exported, documented and globally styled',()=>{
  assert.ok(existsSync('src/components/account/VAccountListItem.vue'));
  assert.match(read('src/index.ts'),/as VAccountListItem\b/);
  const pkg=JSON.parse(read('package.json'));
  assert.ok(pkg.exports['./vue/account-list-item']);
  assert.ok(existsSync('src/entries/account-list-item.ts'));
  assert.match(read('src/styles/components.css'),/\.vx-account-item__main/);
  assert.match(read('sandbox/docs-components.ts'),/"VAccountListItem"/);
  // Actions are never nested inside the row's button.
  const sfc=read('src/components/account/VAccountListItem.vue');
  assert.ok(sfc.indexOf('vx-account-item__actions')>sfc.indexOf('</component>'));
});

test('compiled component styles are importable',()=>{
  assert.equal(JSON.parse(read('package.json')).exports['./vue.css'],'./dist/vue/ui-theme.css');
});
