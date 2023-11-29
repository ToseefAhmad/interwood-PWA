import React from 'react';
import { Facebook, Instagram, Twitter } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { shape, string } from 'prop-types';
import { useFooter } from '@magento/peregrine/lib/talons/Footer/useFooter';

import Logo from '@magento/venia-ui/lib/components/Logo';
import { mergeClasses } from '../../classify';
import defaultClasses from './footer.css';
import { DEFAULT_LINKS, LOREM_IPSUM } from './sampleData';
import Newsletter from '../Newsletter';

import CmsBlock from '../CmsBlock';

const Footer = props => {
    const { links } = props;
    const classes = mergeClasses(defaultClasses, props.classes);
    const talonProps = useFooter();

    const { copyrightText } = talonProps;

    const linkGroups = Array.from(links, ([groupKey, linkProps]) => {
        const linkElements = Array.from(linkProps, ([text, path]) => {
            const itemKey = `text: ${text} path:${path}`;
            const child = path ? (
                <Link className={classes.link} to={path}>
                    <FormattedMessage id={text} defaultMessage={text} />
                </Link>
            ) : (
                <span className={classes.label}>
                    <FormattedMessage id={text} defaultMessage={text} />
                </span>
            );

            return (
                <li key={itemKey} className={classes.linkItem}>
                    {child}
                </li>
            );
        });

        return (
            <ul key={groupKey} className={classes.linkGroup}>
                {linkElements}
            </ul>
        );
    });

    return (
        // <footer className={classes.root}>

        <footer className="footer">
            <div className="footer-top">
                <div className="main-container">
                    <div className="fourcols">
                        <div className="column-4">
                            <div className="widget">
                                <CmsBlock identifiers={'footer_column_one'} />
                            </div>
                        </div>
                        <div className="column-4">
                            <div className="widget">
                                <CmsBlock identifiers={'footer_column_two'} />
                            </div>
                        </div>
                        <div className="column-4">
                            <div className="widget">
                                <CmsBlock identifiers={'footer_column_three'} />
                            </div>
                        </div>
                        <div className="column-4">
                            <div className="widget">
                                <span className="footer-block-four">
                                    <CmsBlock identifiers={'footer_column_four'} />
                                </span>
                                <Newsletter />
                                <CmsBlock identifiers={'payment_method_block'} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="footer-middle">
                <div className="main-container">
                    <CmsBlock identifiers={'footer_block_bottom'} />
                </div>
            </div>

            <div className="newsletter-mobile">
                <Newsletter />
                <CmsBlock identifiers={'social_icons'} />
            </div>

            <CmsBlock identifiers={'footer_copyright'} />

        </footer>

    );
};

export default Footer;

Footer.defaultProps = {
    links: DEFAULT_LINKS
};

Footer.propTypes = {
    classes: shape({
        root: string
    })
};
