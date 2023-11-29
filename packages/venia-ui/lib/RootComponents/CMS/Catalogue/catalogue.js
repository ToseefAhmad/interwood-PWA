import React, { Component, useState } from 'react';
import { shape, string } from 'prop-types';
import defaultClasses from './catalogue.css';
import classify from '../../../classify';
import CatalogSlider from "../../../components/CatalogSlider";

const Slider = (props) => {

        const { classes } = props;
        const [ flage, setFlage] = useState(false);
        return (
            <div className={classes.root}>
                <section className="catalogues-section">
                    {
                    flage ? <header className="w-100 title-header text-center mb-2">
                        <h2>Interwood Catalogues</h2>
                    </header> : null
                    }
                    <div className="catalogues-slider">
                        <CatalogSlider  setFlage={setFlage}/>
                    </div>
                </section>
            </div>
        );
}

export default classify(defaultClasses)(Slider);
