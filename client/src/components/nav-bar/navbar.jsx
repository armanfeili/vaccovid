import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { FiCoffee } from "react-icons/fi";

export default class NavBar extends Component {
    constructor() {
        super();
        // State is similar to props, but it is private and fully controlled by the component.
        this.titleRef = React.createRef()
        this.tableRef = React.createRef()
        this.regionRef = React.createRef()

        this.state = {
            showNavbar: "off"
        };

        this.onClickShowNavbar = this.onClickShowNavbar.bind(this);
        this.changeOffset = this.changeOffset.bind(this);

    }

    onClickShowNavbar() {
        if (this.state.showNavbar === "on") {
            this.setState({ showNavbar: "off" });
        } else {
            this.setState({ showNavbar: "on" });
        }
    };


    changeOffset() {
        window.scrollBy(0, -4000);
    }

    render() {
        return (
            <div>
                <nav className="navigation" id="navOne" >
                    <NavLink className="navigation-brand" onClick={this.changeOffset} to={{ pathname: `/`, state: { continentName: 'World' } }}>
                        VACCOVID<span className="navigation-brand__secondpart">.LIVE</span><span className=" navigation-brand__livepoint"></span><span className=" navigation-brand__shiningpoint"></span>
                    </NavLink>
                    <div className={`navigation-open ${this.state.showNavbar === "on" ? "activeNav" : ""}`} onClick={this.onClickShowNavbar}>
                        <div className="navigation-open-btn navigation-open-btn-1"></div>
                        <div className="navigation-open-btn navigation-open-btn-2"></div>
                        <div className="navigation-open-btn navigation-open-btn-3"></div>
                    </div>
                    <div className="navigation-btns" id="mobile-nav1">
                        <ul className="navigation-btns-ul">
                            <li className="navigation-btns-li">
                                {/* <NavLink className="nav-link" activeClassName='is-active' to="/covid-19-tracker/world-data"> */}
                                <NavLink className="nav-link" activeClassName='is-active' exact={true} to={{ pathname: `/`, state: { continentName: 'World' } }}>
                                    COVID-19
                                </NavLink>
                            </li>
                            <li className="navigation-btns-li">
                                <NavLink className="nav-link" activeClassName='is-active' to={{ pathname: `/vaccine-tracker` }}>
                                    VACCINE
                                </NavLink>
                            </li>
                            <li className="navigation-btns-li">
                                <NavLink className="nav-link" activeClassName='is-active' to={{ pathname: `/treatment-tracker` }}>
                                    TREATMENT
                                </NavLink>
                            </li>
                            <li className="navigation-btns-li">
                                <NavLink className="nav-link" activeClassName='is-active' to="/coronavirus-world-map">
                                    {" "}
                                    MAP
                                </NavLink>
                            </li>
                            <li className="navigation-btns-li">
                                <NavLink className="nav-link" activeClassName='is-active' to={{ pathname: `/news/vaccine`, state: { topic: 'vaccine' } }}>
                                    {" "}
                                    NEWS
                                </NavLink>
                            </li>
                            <li className="navigation-btns-li">
                                <a href='http://docs.vaccovid.live/' className="nav-link" rel="noopener noreferrer" target='_blank'>
                                    ARTICLES
                                </a>
                            </li>
                            <li className="navigation-btns-li">
                                <NavLink className="nav-link" activeClassName='is-active' to="/about">
                                    {" "}
                                    ABOUT
                                </NavLink>
                            </li>

                        </ul>
                    </div>
                    <a href='https://ko-fi.com/V7V42SBFO' className="navigation-coffee" rel="noopener noreferrer" target='_blank'><span className="navigation-coffee-holder"><FiCoffee className="navigation-coffee-holder-logo" /></span><span className="navigation-coffee-text">Buy me a coffee</span></a>
                </nav >
                <nav className="res-navigation">
                    <div className={`res-navigation-responsive ${this.state.showNavbar === "off" ? "takeToSky" : ""}`} id="mobile-nav2">
                        <ul className="res-navigation-responsive-ul">
                            <li className="res-navigation-responsive-li">
                                {/* <NavLink className="res-navigation-responsive-li-nav-link" onClick={this.onClickShowNavbar} activeClassName='res-navigation-responsive-is-active' to="/covid-19-tracker/world-data"> */}
                                <NavLink className="res-navigation-responsive-li-nav-link" onClick={() => { this.onClickShowNavbar(); this.changeOffset() }} exact={true} activeClassName='res-navigation-responsive-is-active' to={{ pathname: `/`, state: { continentName: 'World' } }}>
                                    COVID-19
                                </NavLink>
                            </li>
                            <li className="res-navigation-responsive-li">
                                <NavLink className="res-navigation-responsive-li-nav-link" onClick={() => { this.onClickShowNavbar(); this.changeOffset() }} exact={true} activeClassName='res-navigation-responsive-is-active' to={{ pathname: `/vaccine-tracker`, state: { continentName: 'World' } }}>
                                    VACCINE
                                </NavLink>
                            </li>
                            <li className="res-navigation-responsive-li">
                                <NavLink className="res-navigation-responsive-li-nav-link" onClick={() => { this.onClickShowNavbar(); this.changeOffset() }} exact={true} activeClassName='res-navigation-responsive-is-active' to={{ pathname: `/treatment-tracker`, state: { continentName: 'World' } }}>
                                    TREATMENT
                                </NavLink>
                            </li>
                            <li className="res-navigation-responsive-li">
                                <NavLink className="res-navigation-responsive-li-nav-link" onClick={() => { this.onClickShowNavbar(); this.changeOffset() }} activeClassName='res-navigation-responsive-is-active' to="/coronavirus-world-map">
                                    {" "}
                                    MAP
                                </NavLink>
                            </li>
                            <li className="res-navigation-responsive-li">
                                <NavLink className="res-navigation-responsive-li-nav-link" onClick={() => { this.onClickShowNavbar(); this.changeOffset() }} activeClassName='res-navigation-responsive-is-active' to={{ pathname: `/news/vaccine`, state: { topic: 'vaccine' } }}>
                                    {" "}
                                    NEWS
                                </NavLink>
                            </li>
                            <li className="res-navigation-responsive-li">
                                <a href='http://docs.vaccovid.live/' className="res-navigation-responsive-li-nav-link" rel="noopener noreferrer" target='_blank'>ARTICLES</a>
                            </li>
                            <li className="res-navigation-responsive-li">
                                <NavLink className="res-navigation-responsive-li-nav-link" onClick={() => { this.onClickShowNavbar(); this.changeOffset() }} activeClassName='res-navigation-responsive-is-active' to="/about">
                                    {" "}
                                    ABOUT
                                </NavLink>
                            </li>
                            <li className="res-navigation-responsive-li">
                                <p className="res-navigation-responsive-li-nav-link">...</p>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}