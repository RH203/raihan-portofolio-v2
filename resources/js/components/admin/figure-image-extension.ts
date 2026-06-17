import { mergeAttributes, Node } from '@tiptap/core';

export const FigureImage = Node.create({
    name: 'figureImage',
    group: 'block',
    atom: true,
    draggable: true,
    selectable: true,

    addAttributes() {
        return {
            src: { default: null },
            alt: { default: '' },
            caption: { default: '' },
            source: { default: '' },
            size: { default: 'full' },
            width: { default: null },
            height: { default: null },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'figure[data-type="figure-image"]',
                getAttrs: (element) => {
                    const figure = element as HTMLElement;
                    const image = figure.querySelector('img');
                    const caption = figure.querySelector('[data-caption]');
                    const source = figure.querySelector('[data-source]');

                    return {
                        src: image?.getAttribute('src'),
                        alt: image?.getAttribute('alt') || '',
                        caption: caption?.textContent || '',
                        source: source?.textContent || '',
                        size: figure.dataset.size || 'full',
                        width: image?.getAttribute('width'),
                        height: image?.getAttribute('height'),
                    };
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        const { src, alt, caption, source, size, width, height } = HTMLAttributes;

        return [
            'figure',
            mergeAttributes({
                'data-type': 'figure-image',
                'data-size': size || 'full',
            }),
            ['img', { src, alt, width, height, loading: 'lazy', decoding: 'async' }],
            [
                'figcaption',
                {},
                ['span', { 'data-figure-label': '' }, ''],
                ['span', { 'data-caption': '' }, caption || ''],
                source ? ['span', { 'data-source': '' }, source] : ['span', { 'data-source': '' }, ''],
            ],
        ];
    },
});
