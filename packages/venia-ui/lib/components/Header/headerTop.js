import React from 'react';

import { mergeClasses } from '../../classify';
import defaultClasses from './headerTop.css';
import CmsBlock from '../CmsBlock';

const HeaderTop = ( props ) => {
    const classes = mergeClasses(defaultClasses, props.classes);

    return(

        <CmsBlock identifiers={'header_top'} />

    )
};
export default HeaderTop;
