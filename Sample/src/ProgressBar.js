import PropTypes from "prop-types";
import React, { Component } from "react";

class ProgressBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0
        };
        this.Scrolling = this.Scrolling.bind(this);
    }

    Scrolling() {
    const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
    const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (height > 0) {
        this.setState({ width: `${scrolled}%` });
    } else {
        this.setState({ width: null });
    }
    }

    componentDidMount() {
    try {
        window.addEventListener("scroll", this.Scrolling);
    } catch (oError) {
        console.log(oError);
    }
    }

    componentWillUnmount() {
    try {
        window.removeEventListener("scroll", this.Scrolling);
    } catch (oError) {
        console.log(oError);
    }
    }

    render() {
    const { width } = this.state;
    return <div style={
        {
            margin: 0,
            padding: 0,
            position: "absolute",
            top: "calc(var(--navbar_height) - 2px)",
            zIndex: this.props.z_index,
            backgroundColor: "#1e2c48",
            height: "3px",
            width: width,
            transitionProperty: "width",
            transitionDuration: "0.1s",
            transitionTimingFunction: `ease-out`,
            }
    } />;
    }
    }

    ProgressBar.propTypes = {
    height: PropTypes.number,
    duration: PropTypes.number
    };

    export default ProgressBar;