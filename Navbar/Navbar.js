import React from "react";
import ProgressBar from "./ProgressBar";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./styles/navbar.module.scss";
import LanguageSelector from "./LanguageSelector";
import json_navbar_en from './jsons/en/navbar_en.json';
import json_navbar_pt from './jsons/pt/navbar_pt.json';
import { isFirefox, isSafari, isChrome } from "react-device-detect";

const Navbar = () => {

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // VARIABLES
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // json data
    const [language, set_language] = useState(localStorage.getItem("language"));
    const navbar_height = parseInt(getComputedStyle(document.body).getPropertyValue('--navbar_height').split("px")[0]);
    //const [contact_us_button_is_hovered, set_contact_us_button_is_hovered] = useState(false);
    const json_data = language === "EN" ? json_navbar_en : json_navbar_pt;
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

    // styles
    const navbar_background_color = ((!CSS.supports("-webkit-backdrop-filter", "blur(5px)") && !CSS.supports("backdrop-filter", "blur(5px)")) ? "rgba(255, 255, 255, 1.0)" : "rgba(255, 255, 255, 0.9)");
    const navbar_transition = isChrome ? "all 0.1s ease" : "all 0.1s ease"
    const navbar_box_shadow = "rgba(100, 100, 111, 0.2) 0px 10px 29px 0px";
    const [red_middle_item, set_red_middle_item] = useState("");
    const [navbar_style, set_navbar_style] = useState({transition: navbar_transition, borderBottom: "1px solid rgba(150, 150, 150, 1.0)", width: "100%"});
    
    const shown_hamburguer_menu_style = {
        width: "235px",
        height: "100vh",
        display: "flex",
        transform: "translateX(0px)",
        transition: "all 0.25s ease-in-out",
    };

    const hidden_hamburguer_menu_style = {
        width: "235px",
        height: "100vh",
        display: "flex",
        transform: "translateX(-235px)",
        transition: "all 0.25s ease-in-out",
    };
    
    const [hamburguer_menu_style, set_hamburguer_menu_style] = useState(hidden_hamburguer_menu_style);

    const normal_navbar_style = {
        transition: navbar_transition, 
        borderBottom: "1px solid rgba(150, 150, 150, 1.0)", 
        width: "100%", 
        boxShadow: navbar_box_shadow,
        backgroundColor: navbar_background_color,
    }

    const on_top_navbar_style = {
        transition: navbar_transition, 
        border: "none", 
        width: "100%", 
        boxShadow: "none",
        backdropFilter: "blur(0px)",
    }
    
    // auxiliary variables
    let history = useHistory();
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    
    // item arrays
    const middle_navbar_items = json_data.navbar_items.slice(1, json_data.navbar_items.length - 2);
    //const socials_items = footer_json_data.middle.items.slice(0, 3);

    // variables to determine the current url
    let current_url = (window.location.href[window.location.href.length - 1] === "/") ? (window.location.href.split("#")[0]) : (window.location.href.split("#")[0] + "/");
    current_url = current_url.replace("http://", "").replace("https://", "");
    let is_home = current_url.split("/").length <= 2;

    // scrolling direction
    const [current_scroll_position, set_current_scroll_position] = useState(localStorage.getItem("current_scroll_position") !== null ? parseInt(localStorage.getItem("current_scroll_position")) : 0);
    const [initial_status, set_initial_status] = useState(true);
    const [navbar_status, set_navbar_status] = useState("expanded");
    const [scrollDir, setScrollDir] = useState("scrolling up");
    const [scroll_amount, set_scroll_amount] = useState(0); // used to make sure that the navbar starts with the proper style
    
    const [scroll_position, set_scroll_position] = useState(localStorage.getItem('scroll_position')); // used to make sure that the navbar starts with the proper style
    if(scroll_position === null){ 
        set_scroll_position(0);
        localStorage.setItem('scroll_position', 0); 
        forceUpdate();
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // AUXILIARY FUNCTIONS
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // initial setup for the navbar
    // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    useEffect(() => {

        if(isFirefox && initial_status){
            window.scrollTo(0, scroll_position);
        }

        set_current_scroll_position(window.pageYOffset);
        localStorage.setItem("current_scroll_position", window.pageYOffset);
        window.dispatchEvent(new Event("current_scroll_position_change"));

        // determine which (if any) navbar middle element should be coloured red
        let red_middle_item_aux = "";
        var en_middle_navbar_items = json_navbar_en.navbar_items.slice(1, json_navbar_en.navbar_items.length - 2)
        
        for(let i = 0; i < en_middle_navbar_items.length; i++){

            let i_aux = en_middle_navbar_items[i][0].toLowerCase().replace(" & ", "_and_").replaceAll(" ", "_")

            var current_y_position = window.pageYOffset;

            var target_top = parseInt(document.getElementById(i_aux).getBoundingClientRect().top);
            
            if(current_y_position > (current_y_position + target_top - navbar_height - 30))
                red_middle_item_aux = middle_navbar_items[i][0];
        }

        // disable the red text for the remainder of the page (i.e., we've scrolled past the last middle navbar element)
        if(current_y_position > (current_y_position + parseInt(document.getElementById(en_middle_navbar_items[en_middle_navbar_items.length - 1][0].toLowerCase().replace(" & ", "_and_").replaceAll(" ", "_")).getBoundingClientRect().bottom) - navbar_height - 30))
            red_middle_item_aux = ""
        
        set_red_middle_item(red_middle_item_aux);

    // eslint-disable-next-line
    }, [scroll_position]);
    
    useEffect(() => {

        set_navbar_status("expanded");

        let current_url = (window.location.href[window.location.href.length - 1] === "/") ? (window.location.href.split("#")[0]) : (window.location.href.split("#")[0] + "/");
        current_url = current_url.replace("http://", "").replace("https://", "");

        if(current_url.split("/").length <= 2){
            if(window.pageYOffset < 1){
                set_navbar_style(on_top_navbar_style);
            }
            else{
                set_navbar_style(normal_navbar_style);
                forceUpdate();
            }
        }
        
        else
            set_navbar_style(normal_navbar_style);

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const unlisten = history.listen((location) => {

            //window.location.reload();
            //set_navbar_style({background: "", transform: `translate(0px, 0px)`, transition: navbar_transition});
            set_navbar_status("expanded");

            // home page
            if(window.pageYOffset !== 0)
                if(location["pathname"] ===  "/") { 
                    set_navbar_style({transition: navbar_transition, backgroundColor: "rgba(255, 255, 255, 1.0)", border: "none", boxShadow: navbar_box_shadow}); forceUpdate(); 
                }
            
        });
        return function cleanup() { 
            unlisten()
        }
    // eslint-disable-next-line
    }, [history]);

    // ---------------------------------------------------------------
    // redirect the user to different pages based on its input
    // ---------------------------------------------------------------
    const handle_click = (id) => {

        is_home = false;

        if(id === "home"){
            is_home = true;
            
            window.scrollTo(0, 0);
            history.push("/");

            localStorage.setItem("current_scroll_position", "0");
        }

        else if(id.includes("http")){
            window.open(id, "_blank");
        }
        
        else{
            
            id = id.toLowerCase().replace(" & ", "_and_").replaceAll(" ", "_")

            set_navbar_status("expanded");
            set_navbar_style(normal_navbar_style);
            forceUpdate();

            let target_top = parseInt(document.getElementById(id).getBoundingClientRect().top);
            if(target_top === 0)
                return

            let new_scroll_position = current_scroll_position + target_top - navbar_height - 20;
            window.scroll({top: new_scroll_position, left: 0, behavior: 'smooth' });
            
            localStorage.setItem("current_scroll_position", new_scroll_position);
            set_current_scroll_position(new_scroll_position);
        }

        hide_mobile_menu();
    }

    // ----------------------------------------------------------------------------------
    // determine the current scrolling direction
    // ----------------------------------------------------------------------------------
    useEffect(() => {
        const threshold = 0;
        let lastScrollY = window.pageYOffset;
        let ticking = false;

        const updateScrollDir = () => {

            let scroll_y_aux = window.pageYOffset;
            set_scroll_position(scroll_y_aux);
            forceUpdate();
            
            if (Math.abs(scroll_y_aux - lastScrollY) < threshold) {
                ticking = false;
                return;
            }
            setScrollDir((scroll_y_aux > lastScrollY && (scroll_amount > 2)) ? "scrolling down" : "scrolling up");
            lastScrollY = scroll_y_aux > 0 ? scroll_y_aux : 0;
            ticking = false;
            if(scroll_y_aux <= 5)
                setScrollDir("top");
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollDir);
                ticking = true;
            }
        };

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    
        // eslint-disable-next-line
    }, [scrollDir, scroll_position, forceUpdate]);

    useEffect(() => {
        if(navbar_style["backgroundColor"] !== navbar_background_color)
            window.dispatchEvent(new Event("at_the_top"));
        else
            window.dispatchEvent(new Event("not_at_the_top"));
    }, [navbar_style, navbar_background_color]);

    // listen for scroll changes
    window.addEventListener('at_the_top', () => {
        set_current_scroll_position(0);
        localStorage.setItem("current_scroll_position", "0");
    });

    // ------------------------------------------------------------------------------------------------------------------------------------
    // update the navbar's state according to the current scrolling direction
    // ------------------------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        window.onscroll = () => {

            set_scroll_amount(scroll_amount + 1);
            set_initial_status(false);
            
            if(window.pageYOffset < 1){

                if(navbar_style !== on_top_navbar_style){
                    set_navbar_style(on_top_navbar_style);
                    set_navbar_status("expanded");
                    localStorage.setItem("navbar_status", "expanded");
                }
                

                if(is_home && scroll_amount >= 2)
                    set_navbar_style(on_top_navbar_style);
            }

            else{
                if(scroll_amount === 0){
                    set_navbar_status("expanded");
                    set_navbar_style(normal_navbar_style);
                    return;
                }
                
                if(scrollDir === "scrolling down"){ // the user is scrolling down

                    if((scroll_amount < 2))
                        return;

                    if((!isSafari) && initial_status){
                        set_initial_status(false);
                        return;
                    }

                    if(navbar_status === "expanded"){
                        set_navbar_style(normal_navbar_style);
                        localStorage.setItem("navbar_status", "collapsed");
                        set_navbar_status("collapsed");
                    }

                    //console.log("going down");
                }

                else{ // the user is scrolling up

                    if(navbar_status === "collapsed"){
                        set_navbar_style(normal_navbar_style);
                        localStorage.setItem("navbar_status", "expanded");
                        set_navbar_status("expanded");
                    }

                    //console.log("going up");
                }
            }
        }
        // eslint-disable-next-line
    }, [scrollDir, initial_status, scroll_amount]);

    const show_mobile_menu = () => {
        set_hamburguer_menu_style(shown_hamburguer_menu_style);
        document.body.style.overflow = "hidden";
    }

    const hide_mobile_menu = () => {
        
        if(hamburguer_menu_style["transform"] === "translateX(0px)"){
            set_hamburguer_menu_style(hidden_hamburguer_menu_style);
            document.body.style.overflow = "visible";
        }
    }

    return( 
        <div className = {navbar_style["backgroundColor"] === navbar_background_color ? styles.desktop_root : styles.desktop_root_on_top}>
            <ProgressBar z_index = {hamburguer_menu_style["transform"] === "translateX(0px)" ? 10 : 30}/>
            <div className = {styles.desktop_sub_root} style = {navbar_style}>
                
                    <div className = {styles.hamburguer_menu_div_left} style = {hamburguer_menu_style}>
                        
                        <div className = {styles.home_link_div}>
                            <div className = {styles.home_div} style = {{margin: "0 auto"}}>
                                <div className = {styles.vertical_align} style = {{height: "100%"}}>
                                    <div 
                                        onClick = {() => handle_click("home")}
                                        className = {styles.logo} 
                                        style = {{backgroundImage: `url(${require(`${json_data.navbar_items[0][0]}`)})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "contain"}}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className = {styles.hamburguer_menu_div_left_inner}>
                            {middle_navbar_items.map((navbar_item) => (
                                <div 
                                    key = {middle_navbar_items.indexOf(navbar_item)}
                                    className = {styles.hamburguer_menu_item_div}
                                    onClick = {() => handle_click(json_navbar_en.navbar_items[json_data.navbar_items.indexOf(navbar_item)][0])}>
                                        {/*<div className = {styles.hamburguer_menu_item_icon_div}>
                                            <div 
                                                className = {styles.hamburguer_menu_item_icon} 
                                                style = {{backgroundImage: `url(${require(`${navbar_item[1]}`)})`}}
                                            />
                                        </div>*/}
                                        <div 
                                            className = {styles.hamburguer_menu_item_text}
                                            style = {{
                                                color: (red_middle_item === navbar_item[0] ? "var(--secondary_colour)" : "rgba(90, 90, 90, 1.0)"),
                                                fontFamily: (red_middle_item === navbar_item[0] ? "semibold" : "regular"),
                                            }}>{navbar_item[0]}</div>
                                </div>
                            ))}
                        </div>
                        <div className = {styles.hamburguer_menu_bottom_div}>
                            <div className = {styles.hamburguer_menu_bottom_div_language_selector}>
                                <LanguageSelector navbar_or_hamburguer_menu = {"hamburguer_menu"} />
                            </div>
                            <div className = {styles.hamburguer_menu_div_left_background} style = {{backgroundImage: `url(${require(`${json_data.hamburguer_menu_background_image}`)})`}} />
                        </div>
                    </div>

                    <div 
                        className = {styles.hamburguer_menu_blur_div}
                        style = {{
                            visibility: (hamburguer_menu_style["transform"] === "translateX(0px)" ? "visible" : "hidden"),
                            opacity: (hamburguer_menu_style["transform"] === "translateX(0px)" ? "1.0" : "0.0")
                        }}
                        onClick = {() => hide_mobile_menu()}/>
                
                <div 
                    className = {styles.desktop_inner}
                    style = {{
                        width: (window_width <= (max_width + 100) ? (window_width <= 835 ? "100%" : "90%") : "100%"),
                    }}>

                    <div className = {styles.hamburguer_menu_icon_div}>
                        <div 
                            onClick = {() => show_mobile_menu()}
                            className = {styles.hamburguer_menu_icon} 
                            style = {{filter: (navbar_style["backgroundColor"] === navbar_background_color ? "" : "invert(100%)"), backgroundImage: `url(${require(`${json_data.hamburguer_menu_icon}`)})`}}
                        />
                    </div>
                    
                    {/* home button */}
                    <div 
                        className = {styles.home_div}
                        style = {{
                            width: (window_width < 400 ? "100px" : "220px")
                        }}>
                        <div className = {styles.vertical_align} style = {{height: "100%"}}>
                            <div 
                                onClick = {() => handle_click("home")}
                                className = {styles.logo} 
                                style = {{
                                    backgroundImage: `url(${require(`${navbar_style["backgroundColor"] === navbar_background_color ? json_data.navbar_items[0][0] : json_data.navbar_items[0][1]}`)})`, 
                                    backgroundPosition: "center", 
                                    backgroundRepeat: "no-repeat", 
                                    backgroundSize: "contain",
                                    width: (window_width < 400 ? (navbar_style["backgroundColor"] !== navbar_background_color ? "50px" : "100px") : (navbar_style["backgroundColor"] !== navbar_background_color ? "50px" : "120px"))
                                }}
                            />
                        </div>
                    </div>

                    <div className = {styles.middle_div}>
                        {middle_navbar_items.map((navbar_item) => (
                            <div 
                                key = {middle_navbar_items.indexOf(navbar_item)}
                                className = {styles.middle_div_item}
                                style = {{
                                    color: (navbar_style["backgroundColor"] === navbar_background_color ? (red_middle_item === navbar_item[0] ? "var(--secondary_colour)" : "rgba(90, 90, 90, 1.0)") : navbar_background_color)
                                }}
                                onClick = {() => handle_click(json_navbar_en.navbar_items[json_data.navbar_items.indexOf(navbar_item)][0])}>
                                <div>{navbar_item[0]}</div>
                            </div>
                        ))}
                    </div>

                    {/* contact_us button */}
                    <div className = {styles.contact_us_div}>
                        
                        <div className = {styles.contact_us_inner_div}>
                            <div className = {styles.vertical_align}>
                                <div 
                                    onClick = {() => handle_click(json_navbar_en.navbar_items[json_data.navbar_items.length - 2][0])} 
                                    className = {styles.contact_us_button}
                                    //onMouseEnter = {() => set_contact_us_button_is_hovered(true)}
                                    //onMouseLeave = {() => set_contact_us_button_is_hovered(false)}
                                    style = {{
                                        //border: (navbar_style["backgroundColor"] !== navbar_background_color ? "2px solid rgba(255, 255, 255, 1.0)" : "2px solid var(--secondary_colour)"),
                                    }}>
                                    <p 
                                        className = {styles.contact_us_text}
                                        style = {{
                                            //color: ((navbar_style["backgroundColor"] !== navbar_background_color || contact_us_button_is_hovered) ? "rgba(255, 255, 255, 1.0)" : "var(--secondary_colour)"),
                                        }}>
                                        {json_data.navbar_items[json_data.navbar_items.length - 2][0]}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* language selector */}
                    <LanguageSelector 
                        navbar_or_hamburguer_menu = {"navbar"} 
                        navbar_style = {navbar_style} 
                        navbar_background_color = {navbar_background_color}/>
                </div>
            </div>
        </div>
    );
}

export default Navbar;