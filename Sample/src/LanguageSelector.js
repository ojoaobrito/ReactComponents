import React from "react";
import { useState } from "react";
import styles from "./styles/language_selector.module.scss";
import json_navbar_en from './jsons/en/navbar_en.json';
import json_navbar_pt from './jsons/pt/navbar_pt.json';

const LanguageSelector = (props) => {

    ////////////////////////////////////////////////////////////////////////////
    // VARIABLES
    ////////////////////////////////////////////////////////////////////////////
    // json data
    const [language, set_language] = useState(localStorage.getItem("language"));
    const json_data = language === "EN" ? json_navbar_en : json_navbar_pt;

    const change_language = (new_language) => {
        set_language(new_language);

        // save to local storage
        localStorage.setItem("language", new_language);
        window.dispatchEvent(new Event("language"));
    }

    return (
        <div 
            className = {styles.root}
            style = {{
                display: (props.navbar_or_hamburguer_menu === "hamburguer_menu" ? "flex" : ""),
                width: (props.navbar_or_hamburguer_menu === "hamburguer_menu" ? "100%" : "fit-content"),
                marginRight: (props.navbar_or_hamburguer_menu === "hamburguer_menu" ? "0px" : "20px"),
                marginLeft: (props.navbar_or_hamburguer_menu === "hamburguer_menu" ? "0px" : "5px"),
            }}>
            <div
                className = {styles.language_selector_item}
                onClick = {() => change_language(json_data.navbar_items[json_data.navbar_items.length - 1][0])}
                style = {{
                    fontFamily: (language === json_data.navbar_items[json_data.navbar_items.length - 1][0] ? "semibold" : "regular"),
                    color: (language === json_data.navbar_items[json_data.navbar_items.length - 1][0] ? (props.navbar_or_hamburguer_menu === "navbar" && props.navbar_style["backgroundColor"] === props.navbar_background_color ? "var(--secondary_colour)" : (props.navbar_or_hamburguer_menu === "navbar" ? props.navbar_background_color : "var(--secondary_colour)")) : (props.navbar_or_hamburguer_menu === "navbar" && props.navbar_style["backgroundColor"] === props.navbar_background_color ? "rgba(90, 90, 90, 1.0)" : "rgba(210, 210, 210, 1.0)")),
                    flexBasis: (props.navbar_or_hamburguer_menu === "hamburguer_menu" ? "30%" : "100%"),
                }}>
                {json_data.navbar_items[json_data.navbar_items.length - 1][0]}
            </div>

            <div 
                className = {props.navbar_or_hamburguer_menu === "hamburguer_menu" ? styles.language_selector_separator_vertical : styles.language_selector_separator}
                style = {{
                    flexBasis: (props.navbar_or_hamburguer_menu === "hamburguer_menu" ? "5%" : "100%"),
                }}></div>

            <div
                className = {styles.language_selector_item}
                onClick = {() => change_language(json_data.navbar_items[json_data.navbar_items.length - 1][1])}
                style = {{
                    fontFamily: (language === json_data.navbar_items[json_data.navbar_items.length - 1][1] ? "semibold" : "regular"),
                    color: (language === json_data.navbar_items[json_data.navbar_items.length - 1][1] ? (props.navbar_or_hamburguer_menu === "navbar" && props.navbar_style["backgroundColor"] === props.navbar_background_color ? "var(--secondary_colour)" : (props.navbar_or_hamburguer_menu === "navbar" ? props.navbar_background_color : "var(--secondary_colour)")) : (props.navbar_or_hamburguer_menu === "navbar" && props.navbar_style["backgroundColor"] === props.navbar_background_color ? "rgba(90, 90, 90, 1.0)" : "rgba(210, 210, 210, 1.0)")),
                    flexBasis: (props.navbar_or_hamburguer_menu === "hamburguer_menu" ? "30%" : "100%"),
                }}>
                {json_data.navbar_items[json_data.navbar_items.length - 1][1]}
            </div>
            
        </div>
    );
}

export default LanguageSelector;