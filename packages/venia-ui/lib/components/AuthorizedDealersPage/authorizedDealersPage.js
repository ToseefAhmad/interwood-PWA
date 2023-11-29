import React, { Component } from 'react';
import { shape, string } from 'prop-types';
import defaultClasses from './authorizedDealer.css';
import CmsBlock from "../CmsBlock/cmsBlock";
import classify from '../../classify';

export class AuthorizedDealer extends Component {
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
                <CmsBlock identifiers={'authorized_dealers_content'} />
            </div>
        );
    }
}

export default classify(defaultClasses)(AuthorizedDealer);
