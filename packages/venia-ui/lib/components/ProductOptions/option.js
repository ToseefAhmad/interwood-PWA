import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import {
    arrayOf,
    func,
    number,
    object,
    oneOfType,
    shape,
    string
} from 'prop-types';

import { mergeClasses } from '../../classify';
import getOptionType from './getOptionType';
import SwatchList from './swatchList';
import TileList from './tileList';
import defaultClasses from './option.css';
import { useOption } from '@magento/peregrine/lib/talons/ProductOptions/useOption';

const getItemKey = ({ value_index }) => value_index;

// TODO: get an explicit field from the API
// that identifies an attribute as a swatch
const getListComponent = (attribute_code, values) => {
    const optionType = getOptionType({ attribute_code, values });

    return optionType === 'swatch' ? SwatchList : TileList;
};

const Option = props => {
    const {
        attribute_code,
        attribute_id,
        label,
        onSelectionChange,
        selectedValue,
        values
    } = props;

    const talonProps = useOption({
        attribute_id,
        label,
        onSelectionChange,
        selectedValue,
        values
    });

    const {
        handleSelectionChange,
        initialSelection,
        selectedValueDescription
    } = talonProps;

    const ValueList = useMemo(() => getListComponent(attribute_code, values), [
        attribute_code,
        values
    ]);

    const classes = mergeClasses(defaultClasses, props.classes);

    return (

            <ValueList
                getItemKey={getItemKey}
                selectedValue={initialSelection}
                items={values}
                onSelectionChange={handleSelectionChange}
            />

    );
};

Option.propTypes = {
    attribute_code: string.isRequired,
    attribute_id: string,
    classes: shape({
        root: string,
        title: string
    }),
    label: string.isRequired,
    onSelectionChange: func,
    selectedValue: oneOfType([number, string]),
    values: arrayOf(object).isRequired
};

export default Option;
