import React from 'react';
import { createTestInstance } from '@magento/peregrine';
import { useCountry } from '@magento/peregrine/lib/talons/Country/useCountry';

import Country from '../country';

jest.mock('@magento/peregrine/lib/talons/Country/useCountry');
jest.mock('../../../classify');

const mockProps = {
    field: 'country',
    initialValue: 'PK',
    label: 'Country',
    validate: jest.fn()
};

test('renders a disabled dropdown while loading', () => {
    useCountry.mockReturnValueOnce({
        countries: [],
        loading: true
    });

    const tree = createTestInstance(<Country {...mockProps} />);

    expect(tree.toJSON()).toMatchSnapshot();
});

test('renders dropdown with country data', () => {
    useCountry.mockReturnValueOnce({
        countries: [
            { label: 'Pakistan', value: 'PK' }],
        loading: false
    });

    const tree = createTestInstance(<Country {...mockProps} />);

    expect(tree.toJSON()).toMatchSnapshot();
});
