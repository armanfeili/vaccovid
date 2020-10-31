import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

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

    }

    onClickShowNavbar() {
        if (this.state.showNavbar === "on") {
            this.setState({ showNavbar: "off" });
        } else {
            this.setState({ showNavbar: "on" });
        }
    };

    render() {
        return (
            <div>
                <nav className="navigation" id="navOne" >
                    <NavLink className="navigation-brand" to={{ pathname: `/covid-19/world-data`, state: { continentName: 'World' } }}>
                        VACCOVID<span className="navigation-brand__secondpart">.LIVE</span><span className=" navigation-brand__livepoint"></span><span className=" navigation-brand__shiningpoint"></span>
                    </NavLink>
                    <div className={`navigation-open ${this.state.showNavbar === "on" ? "activeNav" : ""}`} onClick={this.onClickShowNavbar}>
                        <div className="navigation-open-btn navigation-open-btn-1"></div>
                        <div className="navigation-open-btn navigation-open-btn-2"></div>
                        <div className="navigation-open-btn navigation-open-btn-3"></div>
                    </div>
                    <div className="navigation-btns" id="mobile-nav1">
                        <ul className="navigation-btns-ul">
                            {/* <li className="navigation-btns-li">
                                <NavLink className="nav-link" exact={true} activeClassName='is-active' to="/">
                                    OVERVIEW
                                </NavLink>
                            </li>
                            <li className="navigation-btns-li">
                                <NavLink className="nav-link" activeClassName='is-active' to="/vaccine">
                                    VACCINE
                                </NavLink>
                            </li> */}
                            <li className="navigation-btns-li">
                                {/* <NavLink className="nav-link" activeClassName='is-active' to="/covid-19/world-data"> */}
                                <NavLink className="nav-link" activeClassName='is-active' to={{ pathname: `/covid-19/world-data`, state: { continentName: 'World' } }}>
                                    COVID-19
                                </NavLink>
                            </li>

                            <li className="navigation-btns-li">
                                <NavLink className="nav-link" activeClassName='is-active' to={{ pathname: `/news/vaccine`, state: { topic: 'vaccine' } }}>
                                    {" "}
                                    NEWS
                                </NavLink>
                            </li>
                            <li className="navigation-btns-li">
                                <NavLink className="nav-link" activeClassName='is-active' to="/coronavirus-world-map">
                                    {" "}
                                    MAP
                                </NavLink>
                            </li>
                            {/* <li className="navigation-btns-li">
                                <NavLink className="nav-link" activeClassName='is-active' to="/impacts">
                                    {" "}
                                    IMPACTS
                                </NavLink>
                            </li> */}
                            <li className="navigation-btns-li">
                                <NavLink className="nav-link" activeClassName='is-active' to="/about">
                                    {" "}
                                    ABOUT
                                </NavLink>
                            </li>

                        </ul>
                    </div>
                </nav >
                <nav className="res-navigation">
                    <div className={`res-navigation-responsive ${this.state.showNavbar === "off" ? "takeToSky" : ""}`} id="mobile-nav2">
                        <ul className="res-navigation-responsive-ul">
                            {/* <li className="res-navigation-responsive-li">
                                <NavLink className="res-navigation-responsive-li-nav-link" onClick={this.onClickShowNavbar} activeClassName='res-navigation-responsive-is-active' to="/">
                                    OVERVIEW
                                </NavLink>
                            </li>
                            <li className="res-navigation-responsive-li">
                                <NavLink className="res-navigation-responsive-li-nav-link" onClick={this.onClickShowNavbar} activeClassName='res-navigation-responsive-is-active' to="/vaccine">
                                    VACCINE
                                </NavLink>
                            </li> */}
                            <li className="res-navigation-responsive-li">
                                {/* <NavLink className="res-navigation-responsive-li-nav-link" onClick={this.onClickShowNavbar} activeClassName='res-navigation-responsive-is-active' to="/covid-19/world-data"> */}
                                <NavLink className="res-navigation-responsive-li-nav-link" onClick={this.onClickShowNavbar} exact={true} activeClassName='res-navigation-responsive-is-active' to={{ pathname: `/covid-19/world-data`, state: { continentName: 'World' } }}>
                                    COVID-19
                                </NavLink>
                            </li>

                            <li className="res-navigation-responsive-li">
                                <NavLink className="res-navigation-responsive-li-nav-link" onClick={this.onClickShowNavbar} activeClassName='res-navigation-responsive-is-active' to={{ pathname: `/news/vaccine`, state: { topic: 'vaccine' } }}>
                                    {" "}
                                    NEWS
                                </NavLink>
                            </li>
                            <li className="res-navigation-responsive-li">
                                <NavLink className="res-navigation-responsive-li-nav-link" onClick={this.onClickShowNavbar} activeClassName='res-navigation-responsive-is-active' to="/coronavirus-world-map">
                                    {" "}
                                    MAP
                                </NavLink>
                            </li>
                            {/* <li className="res-navigation-responsive-li">
                                <NavLink className="res-navigation-responsive-li-nav-link" onClick={this.onClickShowNavbar} activeClassName='res-navigation-responsive-is-active' to="/impacts">
                                    {" "}
                                    IMPACTS
                                </NavLink>
                            </li> */}
                            <li className="res-navigation-responsive-li">
                                <NavLink className="res-navigation-responsive-li-nav-link" onClick={this.onClickShowNavbar} activeClassName='res-navigation-responsive-is-active' to="/about">
                                    {" "}
                                    ABOUT
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}