import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaSpotify } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


export class Footer extends Component {
    constructor() {
        super();
        this.state = {
        };

        this.changeOffset = this.changeOffset.bind(this);
    }

    async componentDidMount() {
    }

    changeOffset() {
        window.scrollBy(0, -4000);
    }


    render() {

        return (
            <footer className="footer">
                <div className="footer-first-part">
                    <div className="footer-first-part-about">
                        <h2 className="footer-first-part-about-name">VACCINE NOW</h2>
                        <div className="footer-first-part-about-between"></div>
                        <p className="footer-first-part-about-text">This project is landed in order to inform people from all over the planet about the present novel coronavirus (COVID-19) pandemic.</p>
                    </div>
                    <div className="footer-first-part-maps">
                        <h3 className="footer-first-part-maps-title">MAPS</h3>
                        <div className="footer-first-part-maps-between"></div>
                        <ul className="footer-first-part-maps-list">
                            <li className="footer-first-part-maps-list-item"><Link className="footer-first-part-maps-list-item-link" onClick={this.changeOffset} to="/coronavirus-world-map">World Map</Link></li>
                            <li className="footer-first-part-maps-list-item"><Link className="footer-first-part-maps-list-item-link" onClick={this.changeOffset} to="/coronavirus-usa-map">United States of America Map</Link></li>
                            <li className="footer-first-part-maps-list-item"><Link className="footer-first-part-maps-list-item-link" onClick={this.changeOffset} to="/coronavirus-canada-map">Canada Map</Link></li>
                            <li className="footer-first-part-maps-list-item"><Link className="footer-first-part-maps-list-item-link" onClick={this.changeOffset} to="/coronavirus-brazil-map">Brazil Map</Link></li>
                            <li className="footer-first-part-maps-list-item"><Link className="footer-first-part-maps-list-item-link" onClick={this.changeOffset} to="/coronavirus-germany-map">Germany Map</Link></li>
                            <li className="footer-first-part-maps-list-item"><Link className="footer-first-part-maps-list-item-link" onClick={this.changeOffset} to="/coronavirus-australia-map">Australia Map</Link></li>
                        </ul>
                    </div>
                    <div className="footer-first-part-covid19">
                        <h3 className="footer-first-part-covid19-title">COVID-19</h3>
                        <div className="footer-first-part-covid19-between"></div>
                        <ul className="footer-first-part-covid19-list">
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to="/covid-19/world-data">World Data</Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19/USA/USA`, state: { iso: 'usa', countryName: 'USA' } }}>United States of America </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19/Canada/CAN`, state: { iso: 'can', countryName: 'Canada' } }}>Canada </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19/India/IND`, state: { iso: 'ind', countryName: 'India' } }} >India </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19/Australia/AUS`, state: { iso: 'aus', countryName: 'Australia' } }}>Australia </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19/Brazil/BRA`, state: { iso: 'bra', countryName: 'Brazil' } }}>Brazil </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19/Japan/JPN`, state: { iso: 'jpn', countryName: 'Japan' } }} >Japan </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19/Germany/DEU`, state: { iso: 'deu', countryName: 'Germany' } }} >Germany </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19/France/FRA`, state: { iso: 'fra', countryName: 'France' } }} >Frarnce </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19/UK/GBR`, state: { iso: 'gbr', countryName: 'UK' } }}>United Kingdom </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19/Netherlands/NLD`, state: { iso: 'nld', countryName: 'Netherlands' } }}>Netherlands </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19/Italy/ITA`, state: { iso: 'ita', countryName: 'Italy' } }}>Italy </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19/China/CHN`, state: { iso: 'chn', countryName: 'China' } }}>China </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19/Chile/CHL`, state: { iso: 'chl', countryName: 'Chile' } }} >Chile </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19/Colombia/COL`, state: { iso: 'col', countryName: 'Colombia' } }}>Colombia </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19/Denmark/DNK`, state: { iso: 'dnk', countryName: 'Denmark' } }} >Denmark </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19/Mexico/MEX`, state: { iso: 'mex', countryName: 'Mexico' } }}>Mexico </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19/Pakistan/PAK`, state: { iso: 'pak', countryName: 'Pakistan' } }}>Pakistan </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19/Peru/PER`, state: { iso: 'per', countryName: 'Peru' } }} >Peru </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19/Russia/RUS`, state: { iso: 'rus', countryName: 'Russia' } }}>Russia </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19/Spain/ESP`, state: { iso: 'esp', countryName: 'Spain' } }}>Spain </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19/Sweden/SWE`, state: { iso: 'swe', countryName: 'Sweden' } }}>Sweden </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19/Ukraine/UKR`, state: { iso: 'ukr', countryName: 'Ukraine' } }} >Ukraine </Link></li>
                        </ul>
                    </div>
                    <div className="footer-first-part-news">
                        <h3 className="footer-first-part-news-title">NEWS</h3>
                        <div className="footer-first-part-news-between"></div>
                        <ul className="footer-first-part-news-list">
                            <li className="footer-first-part-news-list-item"><Link className="footer-first-part-news-list-item-link" onClick={this.changeOffset} to="/news">Vaccine news</Link></li>
                            <li className="footer-first-part-news-list-item"><Link className="footer-first-part-news-list-item-link" onClick={this.changeOffset} to="/news">COVID-19 news</Link></li>
                            <li className="footer-first-part-news-list-item"><Link className="footer-first-part-news-list-item-link" onClick={this.changeOffset} to="/news">Health news</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-second-part">
                    <div className="footer-second-part-between"></div>
                    <ul className="footer-second-part-icons">
                        <div className="footer-second-part-icons-instagram">
                            {/* <img className="footer-second-part-icons-tweeter-logo" src={require(`./../../views/socialmedia-icons/instagram.svg`)} /> */}
                            <a href="https://www.instagram.com/vaccovid.live/" rel="noopener noreferrer" target="_blank" ><FaInstagram className="footer-second-part-icons-tweeter-logo" /></a>
                        </div>
                        <div className="footer-second-part-icons-tweeter">
                            {/* <img className="footer-second-part-icons-tweeter-logo" src={require(`./../../views/socialmedia-icons/twitter.svg`)} /> */}
                            <a href="https://twitter.com/vaccovid" rel="noopener noreferrer" target="_blank" ><FaTwitter className="footer-second-part-icons-tweeter-logo" /></a>
                        </div>
                        <div className="footer-second-part-icons-facebook">
                            {/* <img className="footer-second-part-icons-tweeter-logo" src={require(`./../../views/socialmedia-icons/facebook.svg`)} /> */}
                            <a href="https://www.facebook.com/vaccovid.live/" rel="noopener noreferrer" target="_blank" ><FaFacebook className="footer-second-part-icons-tweeter-logo" /></a>
                        </div>
                        <div className="footer-second-part-icons-linkedIn">
                            {/* <img className="footer-second-part-icons-tweeter-logo" src={require(`./../../views/socialmedia-icons/linkedin.svg`)} /> */}
                            <a href="https://www.linkedin.com/in/vac-covid-23918b1bb/" rel="noopener noreferrer" target="_blank" ><FaLinkedin className="footer-second-part-icons-tweeter-logo" /></a>
                        </div>
                        <div className="footer-second-part-icons-spotify">
                            {/* <img className="footer-second-part-icons-tweeter-logo" src={require(`./../../views/socialmedia-icons/spotify.svg`)} /> */}
                            <a href="https://open.spotify.com/playlist/0adoMbkJwT9qasjdM2Riqq?si=N1TTQaHvRXiGeauE8v3-DQ" rel="noopener noreferrer" target="_blank" ><FaSpotify className="footer-second-part-icons-tweeter-logo" /></a>
                        </div>
                    </ul>
                </div>
            </footer>
        );
    }
}

const mapStateToProps = state => ({
});

export default connect(
    mapStateToProps,
    {}
)(Footer);
