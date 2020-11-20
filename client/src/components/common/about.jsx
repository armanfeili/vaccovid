import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../common/footer';
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Helmet } from "react-helmet";

export class About extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    async componentDidMount() {
    }

    render() {
        return (
            <div>
                <Helmet>

                    <title>About Vaccovid project, Contributers and Resources - vaccovid.live</title>
                    <meta name="description" content="all you need to know about Vaccovid project, Contributers and Resources - vaccovid.live" />
                    {/* <!-- Open Graph / Facebook --> */}
                    <meta property="og:title" content={`About Vaccovid project, Contributers and Resources - vaccovid.live`} />
                    <meta property="og:description"
                        content="all you need to know about Vaccovid project, Contributers and Resources - vaccovid.live" />

                    {/* <!-- Twitter --> */}
                    <meta property="twitter:title" content={`About Vaccovid project, Contributers and Resources - vaccovid.live`} />
                    <meta property="twitter:description"
                        content="all you need to know about Vaccovid project, Contributers and Resources - vaccovid.live" />

                </Helmet>
                <div className="about">
                    <div className="about-whoweare">
                        <div className="about-whoweare-first-part">
                            <h1 className="about-whoweare-first-part-title">PURPOSE</h1>
                            <div className="about-whoweare-first-part-between"></div>
                            <p className="about-whoweare-first-part-description">VacCovid is an up to date vaccine and covid-19 tracker which has been landed in order to inform people from all over the planet about the present novel coronavirus (COVID-19) pandemic. We accomplished this duty by providing the most existed reliable data from several APIs, showing the statistical data in tangible tables and charts, finding the most relevant and up to date news, and compare each country's data day by day and with avrage world data.</p>
                        </div>
                        <div className="about-whoweare-second-part">
                            <h2 className="about-whoweare-second-part-contributors">WHO WE ARE?</h2>
                            <div className="about-whoweare-second-part-between"></div>
                            <div className="about-whoweare-second-part-Arman-Feili">
                                <div className="about-whoweare-second-part-Arman-Feili-image">
                                    <img className="about-whoweare-second-part-Arman-Feili-image-img" src={require(`./../../views/contributors/arman-feili.jpg`)} alt="co-founder " />
                                </div>
                                <div className="about-whoweare-second-part-Arman-Feili-title">
                                    <h2 className="about-whoweare-second-part-Arman-Feili-title-name">Arman Feili</h2>
                                    <p className="about-whoweare-second-part-Arman-Feili-title-proficiency">Full-Stack Developer</p>
                                    <p className="about-whoweare-second-part-Arman-Feili-title-act">Founder</p>
                                    <div className="about-whoweare-second-part-Arman-Feili-title-linkedIn">
                                        <a className="about-whoweare-second-part-Arman-Feili-title-linkedIn-item" href="https://www.linkedin.com/in/arman-feili-89b622132/" rel="noopener noreferrer" target="_blank" ><FaLinkedin className="about-whoweare-second-part-Arman-Feili-title-linkedIn-item-logo" /><span className="about-whoweare-second-part-Arman-Feili-title-linkedIn-item-text">Follow on LinkedIn</span></a>
                                    </div>
                                    <div className="about-whoweare-second-part-Arman-Feili-title-instagram">
                                        <a className="about-whoweare-second-part-Arman-Feili-title-instagram-item" href="https://www.instagram.com/arman_feili/" rel="noopener noreferrer" target="_blank" ><FaInstagram className="about-whoweare-second-part-Arman-Feili-title-instagram-item-logo" /><span className="about-whoweare-second-part-Arman-Feili-title-instagram-item-text">Follow @arman_feili</span></a>
                                    </div>
                                </div>
                            </div>
                            <div className="about-whoweare-second-part-Parsa-Radfar">
                                <div className="about-whoweare-second-part-Parsa-Radfar-image">
                                    <img className="about-whoweare-second-part-Parsa-Radfar-image-img" src={require(`./../../views/contributors/parsa-radfar.jpg`)} alt="co-founder " />
                                </div>
                                <div className="about-whoweare-second-part-Parsa-Radfar-title">
                                    <h2 className="about-whoweare-second-part-Parsa-Radfar-title-name">Parsa Radfar</h2>
                                    <p className="about-whoweare-second-part-Parsa-Radfar-title-proficiency">Back-End Developer</p>
                                    <p className="about-whoweare-second-part-Parsa-Radfar-title-act">Co-Founder</p>
                                    <div className="about-whoweare-second-part-Arman-Feili-title-linkedIn">
                                        <a className="about-whoweare-second-part-Arman-Feili-title-linkedIn-item" href="https://www.linkedin.com/in/parsa-radfar-aka-versa-b71bb965/" rel="noopener noreferrer" target="_blank" ><FaLinkedin className="about-whoweare-second-part-Arman-Feili-title-linkedIn-item-logo" /><span className="about-whoweare-second-part-Arman-Feili-title-linkedIn-item-text">Follow on LinkedIn</span></a>
                                    </div>
                                    <div className="about-whoweare-second-part-Arman-Feili-title-instagram">
                                        <a className="about-whoweare-second-part-Arman-Feili-title-instagram-item" href="https://www.instagram.com/p.radfar/" rel="noopener noreferrer" target="_blank" ><FaInstagram className="about-whoweare-second-part-Arman-Feili-title-instagram-item-logo" /><span className="about-whoweare-second-part-Arman-Feili-title-instagram-item-text">Follow @p.radfar</span></a>
                                    </div>
                                </div>
                            </div>
                            <div className="about-whoweare-second-part-Amin-Feili">
                                <div className="about-whoweare-second-part-Amin-Feili-image">
                                    <img className="about-whoweare-second-part-Amin-Feili-image-img" src={require(`./../../views/contributors/amin-feili.jpg`)} alt="data-analyser " />
                                </div>
                                <div className="about-whoweare-second-part-Amin-Feili-title">
                                    <h2 className="about-whoweare-second-part-Amin-Feili-title-name">Amin Feili</h2>
                                    <p className="about-whoweare-second-part-Amin-Feili-title-proficiency">Medical Doctor</p>
                                    <p className="about-whoweare-second-part-Amin-Feili-title-act">Data Analyzer</p>
                                    <div className="about-whoweare-second-part-Arman-Feili-title-linkedIn">
                                        <a className="about-whoweare-second-part-Arman-Feili-title-linkedIn-item" href="https://www.linkedin.com/in/amin-feili-65a6b3161/" rel="noopener noreferrer" target="_blank" ><FaLinkedin className="about-whoweare-second-part-Arman-Feili-title-linkedIn-item-logo" /><span className="about-whoweare-second-part-Arman-Feili-title-linkedIn-item-text">Follow on LinkedIn</span></a>
                                    </div>
                                    <div className="about-whoweare-second-part-Arman-Feili-title-instagram">
                                        <a className="about-whoweare-second-part-Arman-Feili-title-instagram-item" href="https://www.instagram.com/doctor._amin/" rel="noopener noreferrer" target="_blank" ><FaInstagram className="about-whoweare-second-part-Arman-Feili-title-instagram-item-logo" /><span className="about-whoweare-second-part-Arman-Feili-title-instagram-item-text">Follow @doctor._amin</span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="about-resources">
                        <h1 className="about-resources-title">RESOURCES</h1>
                        <div className="about-resources-between"></div>
                        <div className="about-resources-list">
                            <a href="https://www.who.int/" rel="noopener noreferrer" target="_blank" className="about-resources-list-link">
                                <div className="about-resources-list-item">
                                    <div className="about-resources-list-item-image">
                                        <img className="about-resources-list-item-image-img" src={require(`./../../views/resources/who.jpg`)} alt="who.jpg" />
                                    </div>
                                    <div className="about-resources-list-item-cover"></div>
                                    <h2 className="about-resources-list-item-title">World Health Organization</h2>
                                    <div className="about-resources-list-item-between"></div>
                                    <p className="about-resources-list-item-description">WHO's primary role is to direct international health within the United Nations' system and to lead partners in global health responses.</p>
                                </div>
                            </a>
                            <a href="https://ourworldindata.org/" rel="noopener noreferrer" target="_blank" className="about-resources-list-link">
                                <div className="about-resources-list-item">
                                    <div className="about-resources-list-item-image">
                                        <img className="about-resources-list-item-image-img" src={require(`./../../views/resources/our_world_in_data.jpg`)} alt="our_world_in_data.jpg" />
                                    </div>
                                    <div className="about-resources-list-item-cover"></div>
                                    <h2 className="about-resources-list-item-title">Our World In Data</h2>
                                    <div className="about-resources-list-item-between"></div>
                                    <p className="about-resources-list-item-description">Research and data to make progress against the world’s largest problems</p>
                                </div>
                            </a>

                            <a href="https://covid-19-apis.postman.com/" rel="noopener noreferrer" target="_blank" className="about-resources-list-link">
                                <div className="about-resources-list-item">
                                    <div className="about-resources-list-item-image">
                                        <img className="about-resources-list-item-image-img" src={require(`./../../views/resources/postman.png`)} alt="postman.png" />
                                    </div>
                                    <div className="about-resources-list-item-cover"></div>
                                    <h2 className="about-resources-list-item-title">Postman</h2>
                                    <div className="about-resources-list-item-between"></div>
                                    <p className="about-resources-list-item-description">During the present novel coronavirus (COVID-19) pandemic, those on the front lines need quick, easy access to real-time critical data. Postman is committed to providing whatever assistance we can in this area.</p>
                                </div>
                            </a>
                            <a href="https://www.cdc.gov/" rel="noopener noreferrer" target="_blank" className="about-resources-list-link">
                                <div className="about-resources-list-item">
                                    <div className="about-resources-list-item-image">
                                        <img className="about-resources-list-item-image-img" src={require(`./../../views/resources/cdc.jpg`)} alt="cdc.jpg" />
                                    </div>
                                    <div className="about-resources-list-item-cover"></div>
                                    <h2 className="about-resources-list-item-title">Centers for Disease Control</h2>
                                    <div className="about-resources-list-item-between"></div>
                                    <p className="about-resources-list-item-description">As the nation's health protection agency, CDC saves lives and protects people from health, safety, and security threats.</p>
                                </div>
                            </a>
                            <a href="https://www.gavi.org/" rel="noopener noreferrer" target="_blank" className="about-resources-list-link">
                                <div className="about-resources-list-item">
                                    <div className="about-resources-list-item-image">
                                        <img className="about-resources-list-item-image-img" src={require(`./../../views/resources/gavi.jpg`)} alt="gavi.jpg" />
                                    </div>
                                    <div className="about-resources-list-item-cover"></div>
                                    <h2 className="about-resources-list-item-title">Gavi, The Vaccine Alliance</h2>
                                    <div className="about-resources-list-item-between"></div>
                                    <p className="about-resources-list-item-description">Gavi is an international organisation created in 2000 to improve access to new and underused vaccines for children living in the world's poorest countries.</p>
                                </div>
                            </a>
                            <a href="https://www.worldometers.info/coronavirus/" rel="noopener noreferrer" target="_blank" className="about-resources-list-link">
                                <div className="about-resources-list-item">
                                    <div className="about-resources-list-item-image">
                                        <img className="about-resources-list-item-image-img" src={require(`./../../views/resources/worldometers.jpg`)} alt="worldometers.jpg" />
                                    </div>
                                    <div className="about-resources-list-item-cover"></div>
                                    <h2 className="about-resources-list-item-title">Worldometers</h2>
                                    <div className="about-resources-list-item-between"></div>
                                    <p className="about-resources-list-item-description">Live world statistics on population, government and economics, society and media, environment, food, water, energy and health.</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <Footer />
            </div >
        );
    }
}

const mapStateToProps = state => ({
});

export default connect(
    mapStateToProps,
    {}
)(About);
