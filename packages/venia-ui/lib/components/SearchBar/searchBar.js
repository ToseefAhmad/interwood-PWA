import React from 'react';
import { bool, shape, string } from 'prop-types';
import { Form } from 'informed';
import { useSearchBar } from '@magento/peregrine/lib/talons/SearchBar';

import { mergeClasses } from '../../classify';
import Autocomplete from './autocomplete';
import SearchField from './searchField';
import defaultClasses from './searchBar.css';

const SearchBar = React.forwardRef((props, ref) => {
    const { isOpen , isCompare } = props;
    const talonProps = useSearchBar();
    const {
        containerRef,
        handleChange,
        handleFocus,
        handleSubmit,
        initialValues,
        isAutoCompleteOpen,
        setIsAutoCompleteOpen,
        valid
    } = talonProps;

    const classes = mergeClasses(defaultClasses, props.classes);
    const rootClassName = isOpen ? classes.root_open : classes.root;

    return (
        <>
        {
            !isCompare ?
            <div className={[defaultClasses["header-icon"], defaultClasses["header-search"],defaultClasses["header-search-inline"],defaultClasses["header-search-category"],"searchbar-global-class"].join(' ')} ref={ref}>
            <div ref={containerRef}>
                <Form
                    autoComplete="off"
                    className={classes.form}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    <div className={classes.autocomplete}>
                        <Autocomplete
                            setVisible={setIsAutoCompleteOpen}
                            valid={valid}
                            visible={isAutoCompleteOpen}
                            isCompare={isCompare}
                        />
                    </div>
                    <div className={[defaultClasses["header-search-wrapper"], " "].join(' ')}>
                        <SearchField
                            isSearchOpen={isOpen}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            />
                        <button className={[defaultClasses["btn"], defaultClasses[""], "icon-search"].join(' ')} type="submit"><i className={[defaultClasses[""], "icon-search-3"].join(' ')}></i></button>
                    </div>

                </Form>
            </div>
        </div> : null
        }
        {
            isCompare ?
            <div className={[defaultClasses["header-icon"], defaultClasses["header-search"],defaultClasses["header-search-inline"],defaultClasses["header-search-category"]," "].join(' ')} ref={ref}>
            <div ref={containerRef}>
                <Form
                    autoComplete="off"
                    className={classes.form}
                    initialValues={initialValues}
                    // onSubmit={handleSubmit}
                >
                    <div className={classes.autocomplete}>
                        <Autocomplete
                            setVisible={setIsAutoCompleteOpen}
                            valid={valid}
                            visible={isAutoCompleteOpen}
                            isCompare={isCompare}
                        />
                    </div>
                    <div className={[defaultClasses["header-search-wrapper"], " "].join(' ')}>
                        <SearchField
                            isSearchOpen={isOpen}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            />
                        <button className={[defaultClasses["btn"], defaultClasses[""], "icon-search-3"].join(' ')} type="submit"><i className={[defaultClasses[""], "icon-search-3"].join(' ')}></i></button>
                    </div>

                </Form>
            </div>
        </div>: null
        }
        </>
    );
});

export default SearchBar;

SearchBar.propTypes = {
    classes: shape({
        autocomplete: string,
        container: string,
        form: string,
        root: string,
        root_open: string,
        search: string
    }),
    isOpen: bool
};
