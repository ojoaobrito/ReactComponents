import React from 'react';
import Cover from './Cover';
import Section from './Section';
import { useEffect } from 'react';
import styles from './styles/home.module.scss';

const Home = () => {

    // -----------------------------
    // scroll to the top of the page
    // -----------------------------
    useEffect(() => {
        window.scrollTo(0, 0);

    }, []);

    return ( 
        <div className = {styles.desktop_root}>
            
            <Cover />

            <div id = "section">
                <Section />
            </div>
            
        </div>
    );
}

export default Home;