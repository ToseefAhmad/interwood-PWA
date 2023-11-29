import React, {Fragment} from "react";
import style from './item.css';
const OtherLabels=(props)=>{

    const {label,product_link}=props;
    let available=null;
    if(label===""){
      available=null;
   }
    else {
        if(label.includes(" ** ")){
           let labels=label.replace(" ** ",'');
            available=<li key={labels}><a className={style['outOfStock']}>{labels}</a></li>;
        }
        else {
            available=<li key={label+1}><a>{label}</a></li>;
        }
    }
    return(
        <Fragment>{available}</Fragment>

    );

}

export default OtherLabels;
