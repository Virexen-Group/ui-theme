import {describe,it,expect} from 'vitest';
import {generateBrandPalette,meetsTextContrast} from '../src/utils/brand-colors';
describe('brand colour accessibility',()=>{it('generates a scale',()=>{const c=generateBrandPalette('#193B9F');expect(c).toHaveLength(11);expect(c[0].hex).toMatch(/^#/);});it('checks WCAG contrast',()=>{expect(meetsTextContrast('#000','#fff')).toBe(true);expect(meetsTextContrast('#fff','#fff')).toBe(false);});});
