import React, { Component } from 'react';
import { shape, string } from 'prop-types';
import defaultClasses from './corporatePage.css';
import classify from '../../classify';
import { Link } from 'react-router-dom';

export class CorporatePage extends Component {
    static propTypes = {
        classes: shape({
            root: string,
            authorizeDealer: string
        })
    };
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <section className="corporate-page-section">
                    <a className="corporate-item" >
                        <img src={require("../../assets/img/corporate-banner-1.jpg")} alt="interwood corporate banner" />
                    </a>
                </section>
                <section className="corporate-page-section">
                    <a className="corporate-item" >
                    <img src={require("../../assets/img/corporate-banner-2.jpg")} alt="interwood corporate banner" />
                    </a>
                </section>
                <div className="corporate-page-footer">
                    <Link to="/corporate-form">Go To Corporate Form</Link>
                </div>
            </div>
        );
    }
}

export default classify(defaultClasses)(CorporatePage);
