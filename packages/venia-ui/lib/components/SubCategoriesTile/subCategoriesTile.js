import React from 'react';
import { Link,resourceUrl } from '@magento/venia-drivers';

import { mergeClasses } from '../../classify';
import defaultClasses from './subCategoriesTile.css';

const SubCategoriesTile = ( props ) => {
    const { items } = props;
    const classes = mergeClasses(defaultClasses);
    const categoryTiles = items
    ? items.map((item) => {
        const {   
            id,          
            name,
            canonical_url, 
            image,
        } = item
        return <div className={classes.tilewrapper} key={id}>
            { image
              ? <div className={classes.tileImageWrapper}>
              <Link to={resourceUrl(`/${canonical_url}`)} alt={name}>
                  <img src={ image } alt={name} />
              </Link>
              </div>
              : null 
            }
            <div className={classes.tileNameWrapper}>
                <Link to={resourceUrl(`/${canonical_url}`)} alt={name}>
                    <span>{name}</span>
                </Link>
            </div>
        </div>
    })
    : null

    return(
        <div className={classes.subCategoriesTiles}>
            {categoryTiles}
        </div>
    );
}

export default SubCategoriesTile;