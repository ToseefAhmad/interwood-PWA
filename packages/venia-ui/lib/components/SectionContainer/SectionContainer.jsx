import React, { useEffect, useState } from 'react'
import styles from "./SectionContainer.module.css";
import CmsBlock from '../CmsBlock';

const SectionContainer = () => {
    // STATE FOR WINDOW SIZE
    const [width, setWidth] = useState(window.innerWidth);

    // USEEFFECT TO ADD RESIZE EFFECT ON INITIAL RENDER

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth);
        })
    }, [])

    let content = null;

    if (width > 500) {
        content = <CmsBlock identifiers={'Desktop_Lower_Banner'}></CmsBlock>

    }
    // mobile_lower_banner_block
    else if (width < 500) {
        content = <CmsBlock identifiers={'mobile_lower_banner_block'}></CmsBlock>
    }
    return (
        <section className={styles['section-container']}>
            {content}
        </section>
    )
}

export default SectionContainer