import React from 'react';
import ContentstackSDK from '@contentstack/app-sdk';

import './styles/styles.css';
import { HighlightIcon } from './components';

export default ContentstackSDK.init().then(async (sdk) => {
    const extensionObj = await sdk['location'];
    const RTE = await extensionObj['RTEPlugin'];
    if (!RTE) return;

    const Highlight = RTE('highlight', () => ({
        title: 'Highlight',
        icon: <HighlightIcon />,
        render: (props: any) => {
            return <span className="highlight">{props.children}</span>;
        },
        display: ['toolbar', 'hoveringToolbar'],
        elementType: ['text'],
    }));

    return {
        Highlight,
    };
});
