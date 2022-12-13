import React from 'react';
import { useState } from 'react';
import styles from './styles/cover.module.scss';
import json_cover_en from './jsons/en/cover_en.json';
import json_cover_pt from './jsons/pt/cover_pt.json';

const Cover = () => {

    //////////////////////////////////////////////////////////////////////////
    // VARIABLES
    //////////////////////////////////////////////////////////////////////////
    // json data
    const [language, set_language] = useState(localStorage.getItem("language"));
    const json_data = language === "EN" ? json_cover_en : json_cover_pt;
    const [window_width, set_window_width] = useState(window.innerWidth);
    const max_width = parseInt(getComputedStyle(document.body).getPropertyValue('--max_width').split("px")[0]);

    // listen for language changes
    window.addEventListener('language', () => {
        set_language(localStorage.getItem("language"));
    });

    // listen for window width changes
    window.addEventListener('resize', () => { 
        set_window_width(window.innerWidth); 
    });

    return ( 
        <div className = {styles.root}>
            <div 
                className = {styles.root_background}
                style = {{
                    backgroundImage: `url(${require(`${(window_width < 600 ? json_data.mobile_image : json_data.desktop_image)}`)})`,
                    marginLeft: (window_width <= max_width ? "0": "calc(((100vw - var(--max_width)) / 2) * -1)"),
                }}>
            </div>
            <div 
                className = {styles.root_background_fade}
                style = {{
                    marginLeft: (window_width <= max_width ? "0": "calc(((100vw - var(--max_width)) / 2) * -1)"),
                }}/>
            <div className = {styles.main_text_div}>
                <span 
                    className = {styles.white_text}
                    style = {{
                        fontSize: (window_width < 900 ? (window_width < 500 ? "44px" : "55px") : "70px"),
                        marginLeft: (window_width <= (max_width + 100) ? "50px" : "0px"),
                    }}>
                    {json_data.title}
                </span>
            </div>
        </div>
    );
}

export default Cover;