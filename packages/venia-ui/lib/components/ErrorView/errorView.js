import React from 'react';
import { mergeClasses } from '../../classify';
import defaultClasses from './error.css';
import PropTypes, { shape, string } from 'prop-types';
import {Redirect} from "react-router-dom";
import { Link } from '@magento/venia-drivers';


const ErrorView = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    return <section className="page-404">
    <div className="page-404-vector">
        <img src="https://interwood.pk/media/404.webp" alt="404" />
    </div>
    <div className="page-404-content">
        <h3>page not found</h3>
        <p>Sorry, but the page that you requested doesn't exist.</p>
        <Link class="continue-shopping" to="/">Back To Home Page</Link>
    </div>
</section>
};

ErrorView.propTypes = {
    children: PropTypes.node.isRequired,
    classes: shape({
        root: string
    })
};

export default ErrorView;
