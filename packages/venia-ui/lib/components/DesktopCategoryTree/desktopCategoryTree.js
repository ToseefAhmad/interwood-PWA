import React,{ Fragment } from 'react';

import { Link } from '@magento/venia-drivers';
import {useDesktopCategoryTree} from '@magento/peregrine/lib/talons/DesktopCategoryTree/useDesktopCategoryTree';

import ParentCategory from './parentCategory';
import { mergeClasses } from '../../classify';
import defaultClasses from './desktopCategoryTree.css';




const DesktopCategoryTree = (props) => {
    // const { categoryId } = props;
    const classes = mergeClasses(defaultClasses, props.classes);

    const talonProps = useDesktopCategoryTree()
    const {
        data,
        loading
    } = talonProps;

    let parentCategories = data ? data. categories.items[0].children : null;

    let xyz = [];
    if(parentCategories){
        let test = JSON.parse(JSON.stringify(parentCategories))
       xyz = test.sort(function(a,b){
            if ( a.position < b.position ){
                return -1;
              }
              if ( a.position > b.position ){
                return 1;
              }
              return 0;
        })

        let iii = 0;
    };

    const parentNode = parentCategories ?
    xyz.map((parent) => {
            return <>{parent.include_in_menu===1?<ParentCategory parentData={parent} />:null}</>
        }) : null;


    return(
    <Fragment>
        <div className={[defaultClasses["navigation"], "megamenu-wrapper"].join(' ')}>
            <div className={[defaultClasses["header-bottom"], defaultClasses["header-bottom-desktop"],defaultClasses["sticky-header"] , defaultClasses["d-none"],defaultClasses["d-lg-block"],   " "].join(' ')}>
                <div className={[defaultClasses["container"], "container"].join(' ')}>
                    <nav className={[defaultClasses["main-nav"],defaultClasses[" "], "w-100 "].join(' ')}>
                        <ul className={[defaultClasses["menu"], defaultClasses["sf-js-enabled"], defaultClasses["sf-arrows"], " "].join(' ')}>
                            {parentNode}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </Fragment>
)
}

export default DesktopCategoryTree;
