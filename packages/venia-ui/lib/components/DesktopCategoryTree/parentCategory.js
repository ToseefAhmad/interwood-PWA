import React from 'react';

import { Link,resourceUrl } from '@magento/venia-drivers';

import { mergeClasses } from '../../classify';
import defaultClasses from './desktopCategoryTree.css';


const ParentCategory = props => {
    const { parentData } = props;
    const {menu_image}=parentData;
    const classes = mergeClasses(defaultClasses, props.classes);
    const firstChild = (data) => {
        let xyz = [];
        if(data.children_count){
            let test = JSON.parse(JSON.stringify(data.children))
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
        return <>
            {
                data.children_count ?
                <>
                    <ul className={[defaultClasses["submenu"], " "].join(' ')}>
                        {
                            xyz.map((childData, index) => {
                                return<>
                                {childData.include_in_menu===1?
                                    <li key={index + data}>
                                        <Link to={resourceUrl(`/${childData.url_path}${childData.url_suffix}`)}>
                                            {childData.name}
                                        </Link>
                                    </li>:null
                                }
                                </>
                            })
                        }
                    </ul>
                </> : <Link to={resourceUrl(`/${data.url_path}${data.url_suffix}`)}>{data.name}</Link>
            }
        </>
    }

    let menuImage=null;
    if(menu_image)
    {
      menuImage=
          <div className="megamenu-has-banner">
              <div className="promobanner">
                  <a>
                      <img alt={parentData.name} src={menu_image}/>
                  </a>
              </div>
          </div>

    };

    let xyz = [];
    if(parentData.children_count){
        let test = JSON.parse(JSON.stringify(parentData.children))
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
     let size=0;
     size=xyz.map(x=>{
         if(x.include_in_menu===1)
         {
             size=size+1;
         }
         return size;
     });
    return (
            <>

                {
                    parentData.children_count != 0 && size!=0 ?
                    <li className={[defaultClasses["has-megamenu"], "has-megamenu", `${parentData.children.length}`].join(' ')}>
                        <Link to={resourceUrl(`/${parentData.url_path}${parentData.url_suffix}`)} className={[defaultClasses["sf-with-ul"], " "].join(' ')} >
                            {parentData.name}
                        </Link>
                        <div className={[defaultClasses["megamenu"], "megamenu"].join(' ')}>
                            <div className={[defaultClasses[" "], "megamenu-column", `${parentData.children.length}`].join(' ')}>
                            {
                                xyz.map((data, index) => {
                                return <>
                                    {
                                        data.include_in_menu===1?
                                            <div className={[defaultClasses["mega-menu-item"], "mega-menu-item"].join(' ')}>
                                                <Link to={resourceUrl(`/${data.url_path}${data.url_suffix}`)} className={[defaultClasses["nolink"], " "].join(' ')}>
                                                    {data.name}
                                                </Link>
                                                <ul className={[defaultClasses["submenu"], "submenu-line"].join(' ')}>
                                                    <li key={index+data}>
                                                        {firstChild(data)}
                                                    </li>
                                                </ul>
                                            </div>:null
                                    }
                                </>
                                })
                            }
                            </div>
                            {menuImage}
                        </div>
                    </li> : <i className="nav-style-global">
                            <Link to={resourceUrl(`/${parentData.url_path}${parentData.url_suffix}`)} className={[defaultClasses["sf-with-ul"], " "].join(' ')} >
                                {parentData.name}
                            </Link>
                        </i>
                }
            </>

    )
};
export default ParentCategory;
