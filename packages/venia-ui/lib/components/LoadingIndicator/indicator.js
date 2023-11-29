import React from 'react';

import defaultClasses from './indicator.css';
import { mergeClasses } from '../../classify';
import { Loader as LoaderIcon } from 'react-feather';
import Icon from '../Icon';

const LoadingIndicator = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const className = props.global ? classes.global : classes.root;

    return (
        <div className={className} style={!props.global ? {"backgroundColor": "transparent"} : {}}>
            <img className="loader-img" src={require('../../assets/img/icons/final100kb.gif')}/>
            {/* <span className={classes.message}>{props.children}</span> */}
        </div>
    );
};

export default LoadingIndicator;
