import React from 'react';
import { shape, string } from 'prop-types';

import { mergeClasses } from '../../classify';
import defaultClasses from './fieldIcons.css';

const FieldIcons = props => {
    const { after, before, children } = props;

    const classes = mergeClasses(defaultClasses, props.classes);

    const style = {
        '--iconsBefore': before ? 1 : 0,
        '--iconsAfter': after ? 1 : 0
    };

    return (
        <span>{children}</span>
        // <span className={classes.root} style={style}>
        //<span className={classes.input}>{children}</span>
        //     <span className={classes.before}>{before}</span>
        //     <span className={classes.after}>{after}</span>
        // </span>
    );
};

FieldIcons.propTypes = {
    classes: shape({
        after: string,
        before: string,
        root: string
    })
};

export default FieldIcons;
