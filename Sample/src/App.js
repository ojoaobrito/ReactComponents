import Home from "./Home";
import Navbar from "./Navbar";
import React from "react";
import { Link } from 'react-scroll';
import styles from './styles/app.module.scss';
import ScrollUpButton from "./ScrollUpButton";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {

    // set the default values (if they have never been set before)
    if(localStorage.getItem('language') === null)
        localStorage.setItem('language', "EN"); 

    // set the default values (if they have never been set before)
    if(localStorage.getItem('scroll_position') === null)
        localStorage.setItem('scroll_position', "0"); 

    // tell every component to start with the correct language
    window.dispatchEvent(new Event("language"));

	return (
        <Router>
			<div className = {styles.app}>
				<div className = {styles.app_navbar_desktop}>
                    <Route>
                        <Navbar />
                    </Route>
                </div>
				<div className = {styles.app_content_desktop}>
					<Switch>
                        <Route exact path = "/">
                            <Link activeClass = "active" to = "home" spy = {true} smooth = {true} duration = {100}>
                                <Home />
                            </Link>
                        </Route>
					</Switch>

                    {/* button that redirects the user back to the top of the page, if needed */}
                    <ScrollUpButton />
				</div>
			</div>
		</Router>
	);
}

export default App;