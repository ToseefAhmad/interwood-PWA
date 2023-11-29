import React, { Fragment, useState } from 'react';
import { Form, Text } from 'informed';

import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

const PriceFilter = (props) => {
    const { items, filterState, filterApi, group, handleApply } = props;
    const { setItems, addItem, toggleItem } = filterApi;
    const firstelement = items ? items[0].value : null;
    const lastElement = items ? items[(items.length) - 1].value : null;
    const firstMin = firstelement ? parseInt(firstelement.slice(0, firstelement.indexOf('_'))) : 0;
    const lastMax = lastElement ? parseInt(lastElement.slice(lastElement.indexOf('_') + 1, lastElement.length)) : 0;
    const [minValue, setMinValue] = useState(firstMin);
    const [MaxValue, setMaxValue] = useState(lastMax)

    const onSliderChange = (e) =>{
        setMinValue(e[0]);
        setMaxValue(e[1]);

    }

const applyChange = (e) => {
    const item = {title: `${minValue}_${MaxValue}`, value: `${minValue}_${MaxValue}`}
    if(!filterState) {
        addItem({group, item})
    } else {
    setItems({group, item})
    toggleItem({group, item})
    }
    handleApply()

}
    return (
        <Fragment>
            <div className="price-filter-container">
                <p className="price-filters-values">{minValue}</p>
                <p className="price-filters-values">{MaxValue}</p>
            </div>
            
            <Range
                min={firstMin}
                max={lastMax}
                defaultValue={[firstMin, lastMax]}
                onChange={onSliderChange}
                onAfterChange={applyChange}
                railStyle={{
                height: 2
                }}
                handleStyle={{
                height: 28,
                width: 28,
                marginLeft: -14,
                marginTop: -14,
                backgroundColor: "red",
                border: 0
                }}
                trackStyle={{
                background: "none"
                }}
            />
        </Fragment>
    )
}

export default PriceFilter ;