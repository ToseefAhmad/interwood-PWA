import React, { Fragment, useCallback, useMemo } from 'react';
import { func, number, shape, string } from 'prop-types';
import Price from '@magento/venia-ui/lib/components/Price';
import { mergeClasses } from '../../classify';
import { Link, resourceUrl } from '@magento/venia-drivers';
import { useToasts } from '@magento/peregrine';

import Image from '../Image';
import defaultClasses from './suggestedProduct.css';
import { useCompareList } from '@magento/peregrine/lib/talons/CompareList/useCompareList';
import CallForPrice from "../CallForPrice/callForPrice";

const IMAGE_WIDTH = 60;

const SuggestedProduct = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { url_key, small_image, name, onNavigate, price, url_suffix, isCompare, id ,callForPrice, group_product_sum ,price_range} = props;
    const {addProductsHandler, addError} =useCompareList({
        productId : id
    })

    const handleClick = useCallback(() => {
        if (typeof onNavigate === 'function') {
            onNavigate();
        }
    }, [onNavigate]);

    const uri = useMemo(() => resourceUrl(`/${url_key}${url_suffix}`), [
        url_key,
        url_suffix
    ]);

    const [, { addToast }] = useToasts();
    useMemo(() => {
        if(addError) {
            addToast({
                type: 'error',
                message:'Not allowed to add more than 3 products to compare list',
                timeout: 3000
            });
        }
    }, [addToast, addError]);

    return (
        <Fragment>
            {
                !isCompare ?
                <Link className={classes.root} to={uri} onClick={handleClick}>
                <Image
                    alt={name}
                    classes={{ image: classes.thumbnail, root: classes.image }}
                    resource={small_image}
                    width={IMAGE_WIDTH}
                />
                <span className={classes.name}>{name}</span>
                    {
                        callForPrice ?
                            <div className="search-action-group"><CallForPrice productId={id}/></div>
                            : <span className={classes.price}>
                                 {
                                     group_product_sum===0 ?
                                         <> {price_range.maximum_price.discount.amount_off ?
                                             <>
                                                 <Price
                                                     value={price_range.maximum_price.final_price.value}
                                                     currencyCode={price.regularPrice.amount.currency}
                                                 />
                       {/*                          <span className={[defaultClasses["old-price"], " "].join(' ')}>*/}
                       {/*     <Price*/}
                       {/*         value={price.regularPrice.amount.value}*/}
                       {/*         currencyCode={price.regularPrice.amount.currency}*/}
                       {/*     />*/}
                       {/*</span>*/}

                                             </> :
                                             <Price
                                                 value={price.regularPrice.amount.value}
                                                 currencyCode={price.regularPrice.amount.currency}
                                             />

                                         }
                                         </> :
                                         <Price value={group_product_sum} currencyCode={"PKR"}/>
                                 }
                </span>
                    }
            </Link> : null
            }
            {
                isCompare ?
                <button className={classes.root} onClick={addProductsHandler}>
                <Image
                    alt={name}
                    classes={{ image: classes.thumbnail, root: classes.image }}
                    resource={small_image}
                    width={IMAGE_WIDTH}
                />
                <span className={classes.name}>{name}</span>
                    {
                        callForPrice? <CallForPrice productId={id}/>
                            :  <span className={classes.price}>
                                {
                                    group_product_sum===0 ?
                                        <> {price_range.maximum_price.discount.amount_off ?
                                            <>
                                                <Price
                                                    value={price_range.maximum_price.final_price.value}
                                                    currencyCode={price.regularPrice.amount.currency}
                                                />
                       {/*                         <span className={[defaultClasses["old-price"], " "].join(' ')}>*/}
                       {/*     <Price*/}
                       {/*         value={price.regularPrice.amount.value}*/}
                       {/*         currencyCode={price.regularPrice.amount.currency}*/}
                       {/*     />*/}
                       {/*</span>*/}

                                            </> :
                                            <Price
                                                value={price.regularPrice.amount.value}
                                                currencyCode={price.regularPrice.amount.currency}
                                            />

                                        }
                                        </> :
                                        <Price value={group_product_sum} currencyCode={"PKR"}/>
                                }

                </span>
                    }
            </button> : null
            }
        </Fragment>
    );
};

SuggestedProduct.propTypes = {
    url_key: string.isRequired,
    small_image: string.isRequired,
    name: string.isRequired,
    onNavigate: func,
    price: shape({
        regularPrice: shape({
            amount: shape({
                currency: string,
                value: number
            })
        })
    }).isRequired,
    classes: shape({
        root: string,
        image: string,
        name: string,
        price: string,
        thumbnail: string
    })
};

export default SuggestedProduct;
