import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

// Only registerRTEPlugins is faked (it needs a live Contentstack host); PluginBuilder is real.
vi.mock('@contentstack/app-sdk', async (orig) => {
    const actual: any = await orig();
    const PluginBuilder = actual.PluginBuilder ?? actual.default.PluginBuilder;
    return {
        PluginBuilder,
        default: { registerRTEPlugins: (...defs: any[]) => defs },
    };
});

import plugin from './plugin';
import { HighlightIcon } from './components';

const def: any = (plugin as any)[0];

describe('highlight RTE plugin', () => {
    it('registers exactly one plugin with id "highlight"', () => {
        expect((plugin as any).length).toBe(1);
        expect(def.id).toBe('highlight');
    });

    it('has title "Highlight", text element type, toolbar + hoveringToolbar display', () => {
        expect(def.config.title).toBe('Highlight');
        expect(def.config.elementType).toBe('text');
        expect(def.config.display).toEqual(['toolbar', 'hoveringToolbar']);
    });

    it('uses the HighlightIcon as its icon', () => {
        expect(def.config.icon.type).toBe(HighlightIcon);
    });

    it('render wraps the selected text in span.highlight', () => {
        const html = renderToStaticMarkup(def.config.render({ children: 'hello' }));
        expect(html).toBe('<span class="highlight">hello</span>');
    });

    it('render keeps nested children intact', () => {
        const el = def.config.render({ children: [<b key="b">bold</b>, ' text'] });
        expect(renderToStaticMarkup(el)).toBe('<span class="highlight"><b>bold</b> text</span>');
    });

    it('defines no toggle/remove callbacks of its own (SDK handles toggling for text plugins)', () => {
        expect(Object.keys(def.callbacks)).toEqual([]);
    });
});

describe('HighlightIcon', () => {
    it('renders a 16x16 svg with the default fill', () => {
        const html = renderToStaticMarkup(<HighlightIcon />);
        expect(html).toContain('width="16"');
        expect(html).toContain('height="16"');
        expect(html).toContain('fill="#647696"');
    });

    it('honours width, height, fill and className props', () => {
        const html = renderToStaticMarkup(<HighlightIcon width={24} height={20} fill="#f00" className="x" />);
        expect(html).toContain('width="24"');
        expect(html).toContain('height="20"');
        expect(html).toContain('fill="#f00"');
        expect(html).toContain('class="x"');
    });
});
