import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const css = readFileSync(resolve(__dirname, 'styles.css'), 'utf8');

describe('highlight styles', () => {
    it('.highlight sets a background colour, so the selected text is visibly highlighted', () => {
        const rule = css.match(/\.highlight\s*\{([^}]*)\}/);
        expect(rule).not.toBeNull();
        expect(rule![1]).toMatch(/background(-color)?\s*:\s*\S+/);
    });
});
