import React from 'react';
import JsxParser from 'react-jsx-parser'
import { Link } from '@magento/venia-drivers';

const toHTML = str => ({ __html: str });

function PlainHtmlRenderer({ html, classes }) {
    // Even if empty, render a div with no content, for styling purposes.
    if (!html) {
        return <div className={classes.root} />;
    }
    return (
        <div className={classes.root} >
            <JsxParser
            components={{ Link}}
            jsx={html}
            />
        </div>
    );
}

export const canRender = () => true; // backstop component, always renders
export const Component = PlainHtmlRenderer;
