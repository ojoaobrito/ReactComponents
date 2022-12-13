import React, { useState } from "react";
import styles from './styles/scroll_up_button.module.scss';
import up_arrow_blue from "./resources/icons/up-arrow.png";

const ScrollUpButton = () => {

    //////////////////////////////////////////////////////////////
    // VARIABLES
    //////////////////////////////////////////////////////////////
    const [at_the_top, set_at_the_top] = useState(true);

    // listen for scroll changes
    window.addEventListener('at_the_top', () => {
        set_at_the_top(true);
    });

    window.addEventListener('not_at_the_top', () => {
        set_at_the_top(false);
    });

    const handle_click = () => {
        window.scroll({top: 0, left: 0, behavior: 'smooth' });
    }

    return (
        <div>
            <div 
                className = {styles.button_container}
                onClick = {() => handle_click()}
                style = {{
                    transform: (at_the_top ? "translateX(100px)" : "translateX(0px)"),
                }}>
                <div className = {styles.vertical_align}>
                    <div>
                        <img className = {styles.up_arrow} src = {up_arrow_blue}  alt = "Up arrow"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ScrollUpButton;