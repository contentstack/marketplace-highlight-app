import React from 'react';
import ContentstackAppSDK, { PluginBuilder } from '@contentstack/app-sdk';

import './styles/styles.css';
import { HighlightIcon } from './components';

// Highlight component
function Highlight(props: any) {
    const { children } = props;
    return <span className="highlight">{children}</span>;
}

// Plugin definition using Builder pattern
const HighlightPluginDefinition = new PluginBuilder("highlight")
    .title("Highlight")
    .icon(<HighlightIcon />)
    .elementType("text")
    .display(["toolbar", "hoveringToolbar"])
    .render(Highlight)
    .build();

export default ContentstackAppSDK.registerRTEPlugins(HighlightPluginDefinition);