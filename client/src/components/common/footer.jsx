import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
// import { FaSpotify } from "react-icons/fa";
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
                        <h2 className="footer-first-part-about-name">VACCOVID.LIVE</h2>
                        <div className="footer-first-part-about-between"></div>
                        <p className="footer-first-part-about-text">VacCovid is an up to date vaccine and covid-19 tracker which has been landed in order to inform people from all over the planet about the present novel coronavirus (COVID-19) pandemic.</p>
                    </div>
                    <div className="footer-first-part-vacAndTreat">
                        <h3 className="footer-first-part-vacAndTreat-title">Vaccine</h3>
                        <div className="footer-first-part-vacAndTreat-between"></div>
                        <ul className="footer-first-part-vacAndTreat-list">
                            <li className="footer-first-part-vacAndTreat-list-item"><Link className="footer-first-part-vacAndTreat-list-item-link" onClick={this.changeOffset} to="/vaccine-tracker">All Vaccines</Link></li>
                            <li className="footer-first-part-vacAndTreat-list-item"><Link className="footer-first-part-vacAndTreat-list-item-link" onClick={this.changeOffset} to="/vaccine-tracker/rna-based-vaccine/biontech-pfizer-fosun-pharma-rentschler-biopharma">Pfizer</Link></li>
                            <li className="footer-first-part-vacAndTreat-list-item"><Link className="footer-first-part-vacAndTreat-list-item-link" onClick={this.changeOffset} to="/vaccine-tracker/rna-based-vaccine/moderna-niaid-lonza-catalent-rovi-medidata-bioqual">Moderna</Link></li>
                            <li className="footer-first-part-vacAndTreat-list-item"><Link className="footer-first-part-vacAndTreat-list-item-link" onClick={this.changeOffset} to="/vaccine-tracker/non-replicating-viral-vector/university-of-oxford-oxford-biomedica,-vaccines-manufacturing-and-innovation-centre,-pall-life-sciences,-cobra-biologics,-halixbv,-advent-s.r.l.,-merck-kgaa,-the-serum-institute,-vaccitech,-catalent,-csl,-and-astrazenecaiqvia">Oxford</Link></li>
                            <li className="footer-first-part-vacAndTreat-list-item"><Link className="footer-first-part-vacAndTreat-list-item-link" onClick={this.changeOffset} to="/vaccine-tracker/protein-subunit/novavaxemergent-biosolutions-praha-vaccines-biofabri-fujifilm-diosynth-biotechnologies-fdb-serum-institute-of-india-sk-bioscience-takeda-pharmaceutical-company-limited-agc-biologics-polypeptide-group-endo">Novavax</Link></li>
                            <li className="footer-first-part-vacAndTreat-list-item"><Link className="footer-first-part-vacAndTreat-list-item-link" onClick={this.changeOffset} to="/vaccine-tracker/inactivated-virus/sinovac-instituto-butantan-bio-farma">Sinovac</Link></li>
                        </ul>
                        <h3 className="footer-first-part-vacAndTreat-title">Treatment</h3>
                        <div className="footer-first-part-vacAndTreat-between"></div>
                        <ul className="footer-first-part-vacAndTreat-list">
                            <li className="footer-first-part-vacAndTreat-list-item"><Link className="footer-first-part-vacAndTreat-list-item-link" onClick={this.changeOffset} to="/treatment-tracker">All Treatments</Link></li>
                            <li className="footer-first-part-vacAndTreat-list-item"><Link className="footer-first-part-vacAndTreat-list-item-link" onClick={this.changeOffset} to="/treatment-tracker/antivirals/gilead-world-health-organization-solidarity-trial-national-institute-of-allergy-and-infectious-diseases-(niaid)s-adaptive-covid-19-treatment-trial-feinstein-institutes-i-spy-covid">Remdesivir</Link></li>
                            <li className="footer-first-part-vacAndTreat-list-item"><Link className="footer-first-part-vacAndTreat-list-item-link" onClick={this.changeOffset} to="/treatment-tracker/antivirals/fujifilm-toyama-chemical-zhejiang-hisun-pharmaceuticals-numerous-trials-with-global-research-sponsors-brigham-and-womens-hospital-massachusetts-general-hospital,-and-the-university-of-massachusetts-medical-school-glenmark-pharmaceuticals">Favilavir</Link></li>
                            <li className="footer-first-part-vacAndTreat-list-item"><Link className="footer-first-part-vacAndTreat-list-item-link" onClick={this.changeOffset} to="/treatment-tracker/other/numerous-trials-with-global-research-sponsors-including-world-health-organization-solidarity-trial-orchid-trial-with-national-heart-lung,-and-blood-institute-(nhlbi)-remap-cap-global-trial-novartis-principle-trial">Chloroquine</Link></li>
                            <li className="footer-first-part-vacAndTreat-list-item"><Link className="footer-first-part-vacAndTreat-list-item-link" onClick={this.changeOffset} to="/treatment-tracker/other/medincell-university-of-utah-surgisphere-corp-university-of-baghdad-tanta-university-other-global-research-sponsors">Ivermectin</Link></li>
                            <li className="footer-first-part-vacAndTreat-list-item"><Link className="footer-first-part-vacAndTreat-list-item-link" onClick={this.changeOffset} to="/treatment-tracker/antibodies/numerous-trials-with-global-research-sponsors-roche-remap-cap-recovery">Tocilizumab</Link></li>
                        </ul>
                    </div>
                    <div className="footer-first-part-covid19">
                        <h3 className="footer-first-part-covid19-title">COVID-19</h3>
                        <div className="footer-first-part-covid19-between"></div>
                        <ul className="footer-first-part-covid19-list">
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to="/covid-19-tracker/world-data">World Data</Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19-tracker/USA/USA`, state: { iso: 'usa', countryName: 'USA' } }}>United States of America </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19-tracker/Canada/CAN`, state: { iso: 'can', countryName: 'Canada' } }}>Canada </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19-tracker/India/IND`, state: { iso: 'ind', countryName: 'India' } }} >India </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19-tracker/Australia/AUS`, state: { iso: 'aus', countryName: 'Australia' } }}>Australia </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19-tracker/Brazil/BRA`, state: { iso: 'bra', countryName: 'Brazil' } }}>Brazil </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19-tracker/Japan/JPN`, state: { iso: 'jpn', countryName: 'Japan' } }} >Japan </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19-tracker/Germany/DEU`, state: { iso: 'deu', countryName: 'Germany' } }} >Germany </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19-tracker/France/FRA`, state: { iso: 'fra', countryName: 'France' } }} >France </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19-tracker/UK/GBR`, state: { iso: 'gbr', countryName: 'UK' } }}>United Kingdom </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19-tracker/Netherlands/NLD`, state: { iso: 'nld', countryName: 'Netherlands' } }}>Netherlands </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19-tracker/Italy/ITA`, state: { iso: 'ita', countryName: 'Italy' } }}>Italy </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19-tracker/China/CHN`, state: { iso: 'chn', countryName: 'China' } }}>China </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19-tracker/Chile/CHL`, state: { iso: 'chl', countryName: 'Chile' } }} >Chile </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19-tracker/Colombia/COL`, state: { iso: 'col', countryName: 'Colombia' } }}>Colombia </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19-tracker/Denmark/DNK`, state: { iso: 'dnk', countryName: 'Denmark' } }} >Denmark </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19-tracker/Mexico/MEX`, state: { iso: 'mex', countryName: 'Mexico' } }}>Mexico </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19-tracker/Pakistan/PAK`, state: { iso: 'pak', countryName: 'Pakistan' } }}>Pakistan </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19-tracker/Peru/PER`, state: { iso: 'per', countryName: 'Peru' } }} >Peru </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19-tracker/Russia/RUS`, state: { iso: 'rus', countryName: 'Russia' } }}>Russia </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19-tracker/Spain/ESP`, state: { iso: 'esp', countryName: 'Spain' } }}>Spain </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19-tracker/Sweden/SWE`, state: { iso: 'swe', countryName: 'Sweden' } }}>Sweden </Link></li>
                            <li className="footer-first-part-covid19-list-item"><Link className="footer-first-part-covid19-list-item-link" onClick={this.changeOffset} to={{ pathname: `/covid-19-tracker/Ukraine/UKR`, state: { iso: 'ukr', countryName: 'Ukraine' } }} >Ukraine </Link></li>
                        </ul>
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
                        <h3 className="footer-first-part-maps-title">News</h3>
                        <div className="footer-first-part-maps-between"></div>
                        <ul className="footer-first-part-maps-list">
                            <li className="footer-first-part-maps-list-item"><Link className="footer-first-part-maps-list-item-link" onClick={this.changeOffset} to={{ pathname: `/news/vaccine`, state: { topic: 'vaccine' } }}>Vaccine news</Link></li>
                            <li className="footer-first-part-maps-list-item"><Link className="footer-first-part-maps-list-item-link" onClick={this.changeOffset} to={{ pathname: `/news/covid19`, state: { topic: 'covid19' } }}>COVID-19 news</Link></li>
                            <li className="footer-first-part-maps-list-item"><Link className="footer-first-part-maps-list-item-link" onClick={this.changeOffset} to={{ pathname: `/news/health`, state: { topic: 'health' } }}>Health news</Link></li>
                        </ul>
                    </div>
                    {/* <div className="footer-first-part-news">
                        <h3 className="footer-first-part-news-title">NEWS</h3>
                        <div className="footer-first-part-news-between"></div>
                        <ul className="footer-first-part-news-list">
                            <li className="footer-first-part-news-list-item"><Link className="footer-first-part-news-list-item-link" onClick={this.changeOffset} to={{ pathname: `/news/vaccine`, state: { topic: 'vaccine' } }}>Vaccine news</Link></li>
                            <li className="footer-first-part-news-list-item"><Link className="footer-first-part-news-list-item-link" onClick={this.changeOffset} to={{ pathname: `/news/covid19`, state: { topic: 'covid19' } }}>COVID-19 news</Link></li>
                            <li className="footer-first-part-news-list-item"><Link className="footer-first-part-news-list-item-link" onClick={this.changeOffset} to={{ pathname: `/news/health`, state: { topic: 'health' } }}>Health news</Link></li>
                        </ul>
                    </div> */}
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
                            <a href="https://www.facebook.com/vaccovid" rel="noopener noreferrer" target="_blank" ><FaFacebook className="footer-second-part-icons-tweeter-logo" /></a>
                        </div>
                        <div className="footer-second-part-icons-linkedIn">
                            {/* <img className="footer-second-part-icons-tweeter-logo" src={require(`./../../views/socialmedia-icons/linkedin.svg`)} /> */}
                            <a href="https://www.linkedin.com/company/vaccovid/" rel="noopener noreferrer" target="_blank" ><FaLinkedin className="footer-second-part-icons-tweeter-logo" /></a>
                        </div>
                        <div className="footer-second-part-icons-spotify">
                            {/* <img className="footer-second-part-icons-tweeter-logo" src={require(`./../../views/socialmedia-icons/spotify.svg`)} /> */}
                            {/* <a href="https://open.spotify.com/playlist/0adoMbkJwT9qasjdM2Riqq?si=N1TTQaHvRXiGeauE8v3-DQ" rel="noopener noreferrer" target="_blank" ><SiGmail className="footer-second-part-icons-tweeter-logo" /></a> */}
                            {/* <a href="mailto:vaccovid.live@gmail.com?subject=Summer%20Party&body=You%20are%20invited%20to%20a%20big%20summer%20party!" rel="noopener noreferrer" target="_blank" ><SiGmail className="footer-second-part-icons-tweeter-logo" /></a> */}
                            <a href="mailto:vaccovid.live@gmail.com?subject=Hi%20there.%20I'm%20a%20visitor%20to%20your%20website,%20and%20here%20is%20my%20comment:" rel="noopener noreferrer" target="_blank" ><SiGmail className="footer-second-part-icons-tweeter-logo" /></a>
                        </div>
                    </ul>
                    <p className="footer-second-part-text">Please let us know if we can provide any other additional features.</p>
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
