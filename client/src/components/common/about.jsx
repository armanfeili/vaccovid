import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../common/footer';
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
// import { FiUserPlus } from "react-icons/fi";
import { BsPersonPlus } from "react-icons/bs";
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';

export class About extends Component {
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
            <div>
                <Helmet>
                    <title>About Vaccovid project, Contributers and Resources - vaccovid.live</title>
                    <meta name="description" content="all you need to know about Vaccovid project, Contributers and Resources - vaccovid.live" />

                </Helmet>
                <div className="about">
                    <div className="about-whoweare">
                        <header className="about-whoweare-first-part">
                            <h1 className="about-whoweare-first-part-title">PURPOSE</h1>
                            <div className="about-whoweare-first-part-between"></div>
                            <p className="about-whoweare-first-part-description"><span className="about-advantages-paragraph-text-bold">VACCOVID.LIVE</span> is a comprehensive up-to-date Vaccine tracker, COVID-19 tracker and Treatment tracker website which has been landed to inform people throughout the planet about the present novel coronavirus (COVID-19) pandemic. We accomplished this duty by providing the latest reliable data from several APIs. In VACCOVID you can also find the most relevant and up-to-date news about covid-19. We have tried to gather and illustrate the latest statistical data known about covid-19 in tangible tables using evidence based and professional conceptual framework.</p>
                        </header>
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
                        <div className="about-whoweare-second-part">
                            <div className="about-whoweare-second-part-Arman-Feili">
                                <div className="about-whoweare-second-part-Arman-Feili-image">
                                    <img className="about-whoweare-second-part-Arman-Feili-image-img" src={require(`./../../views/contributors/asep.jpg`)} alt="co-founder " />
                                </div>
                                <div className="about-whoweare-second-part-Arman-Feili-title">
                                    <h2 className="about-whoweare-second-part-Arman-Feili-title-name">Asep Supriyadi</h2>
                                    <p className="about-whoweare-second-part-Arman-Feili-title-proficiency"></p>
                                    <p className="about-whoweare-second-part-Arman-Feili-title-act">Communication Manager</p>
                                    <div className="about-whoweare-second-part-Arman-Feili-title-linkedIn">
                                        <a className="about-whoweare-second-part-Arman-Feili-title-linkedIn-item" href="https://www.linkedin.com/in/asep-supriyadi/" rel="noopener noreferrer" target="_blank" ><FaLinkedin className="about-whoweare-second-part-Arman-Feili-title-linkedIn-item-logo" /><span className="about-whoweare-second-part-Arman-Feili-title-linkedIn-item-text">Follow on LinkedIn</span></a>
                                    </div>
                                    <div className="about-whoweare-second-part-Arman-Feili-title-instagram">
                                        <a className="about-whoweare-second-part-Arman-Feili-title-instagram-item" href="https://www.instagram.com/assepsoepriyadhie/" rel="noopener noreferrer" target="_blank" ><FaInstagram className="about-whoweare-second-part-Arman-Feili-title-instagram-item-logo" /><span className="about-whoweare-second-part-Arman-Feili-title-instagram-item-text">@assepsoepriyadhie</span></a>
                                    </div>
                                </div>
                            </div>
                            <div className="about-whoweare-second-part-Parsa-Radfar">
                                <div className="about-whoweare-second-part-Parsa-Radfar-image">
                                    {/* <img className="about-whoweare-second-part-Parsa-Radfar-image-img" src={require(`./../../views/contributors/user-plus.jpg`)} alt="co-founder " /> */}
                                    <BsPersonPlus className="about-whoweare-second-part-Parsa-Radfar-image-img" />
                                </div>
                                <div className="about-whoweare-second-part-Parsa-Radfar-title">
                                    <h2 className="about-whoweare-second-part-Parsa-Radfar-title-name">Join The Team</h2>
                                    <p className="about-whoweare-second-part-Parsa-Radfar-title-proficiency"></p>
                                    <p className="about-whoweare-second-part-Parsa-Radfar-title-act">send us a message</p>
                                    <div className="about-whoweare-second-part-Arman-Feili-title-instagram">
                                        <a className="about-whoweare-second-part-Arman-Feili-title-instagram-item" href="mailto:vaccovid.live@gmail.com?subject=Hi%20there.%20I'm%20a%20visitor%20to%20your%20website,%20and%20here%20is%20my%20comment:" rel="noopener noreferrer" target="_blank" ><SiGmail className="about-whoweare-second-part-Arman-Feili-title-instagram-item-logo" /><span className="about-whoweare-second-part-Arman-Feili-title-instagram-item-text">Send us an Email</span></a>
                                    </div>
                                    <div className="about-whoweare-second-part-Arman-Feili-title-linkedIn">
                                        <a className="about-whoweare-second-part-Arman-Feili-title-linkedIn-item" href="https://www.linkedin.com/company/vaccovid/" rel="noopener noreferrer" target="_blank" ><FaLinkedin className="about-whoweare-second-part-Arman-Feili-title-linkedIn-item-logo" /><span className="about-whoweare-second-part-Arman-Feili-title-linkedIn-item-text">Follow on LinkedIn</span></a>
                                    </div>
                                </div>
                            </div>
                            <div className="about-whoweare-second-part-Amin-Feili">
                                <div className="about-whoweare-second-part-Amin-Feili-image">
                                    {/* <img className="about-whoweare-second-part-Amin-Feili-image-img" src={require(`./../../views/contributors/user-plus.jpg`)} alt="data-analyser " /> */}
                                    <BsPersonPlus className="about-whoweare-second-part-Amin-Feili-image-img" />
                                </div>
                                <div className="about-whoweare-second-part-Amin-Feili-title">
                                    <h2 className="about-whoweare-second-part-Amin-Feili-title-name">Join The Team</h2>
                                    <p className="about-whoweare-second-part-Amin-Feili-title-proficiency"></p>
                                    <p className="about-whoweare-second-part-Amin-Feili-title-act">send us a message</p>
                                    <div className="about-whoweare-second-part-Arman-Feili-title-instagram">
                                        <a className="about-whoweare-second-part-Arman-Feili-title-instagram-item" href="mailto:vaccovid.live@gmail.com?subject=Hi%20there.%20I'm%20a%20visitor%20to%20your%20website,%20and%20here%20is%20my%20comment:" rel="noopener noreferrer" target="_blank" ><SiGmail className="about-whoweare-second-part-Arman-Feili-title-instagram-item-logo" /><span className="about-whoweare-second-part-Arman-Feili-title-instagram-item-text">Send us an Email</span></a>
                                    </div>
                                    <div className="about-whoweare-second-part-Arman-Feili-title-linkedIn">
                                        <a className="about-whoweare-second-part-Arman-Feili-title-linkedIn-item" href="https://www.linkedin.com/company/vaccovid/" rel="noopener noreferrer" target="_blank" ><FaLinkedin className="about-whoweare-second-part-Arman-Feili-title-linkedIn-item-logo" /><span className="about-whoweare-second-part-Arman-Feili-title-linkedIn-item-text">Follow on LinkedIn</span></a>
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
                            <a href="https://milkeninstitute.org/centers/fastercures" rel="noopener noreferrer" target="_blank" className="about-resources-list-link">
                                <div className="about-resources-list-item">
                                    <div className="about-resources-list-item-image">
                                        <img className="about-resources-list-item-image-img" src={require(`./../../views/resources/faster-cures.jpg`)} alt="faster-cures.jpg" />
                                    </div>
                                    <div className="about-resources-list-item-cover"></div>
                                    <h2 className="about-resources-list-item-title">FasterCures - Milken Institute</h2>
                                    <div className="about-resources-list-item-between"></div>
                                    <p className="about-resources-list-item-description">Milken Institute's FasterCures Center works with our partners to build a patient-centric system where lifesaving treatments get to those who need them.</p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <main className="about-advantages">
                        <h1 className="about-advantages-title">Features</h1>
                        <div className="about-advantages-between"></div>
                        <div className="about-advantages-paragraph">
                            <h3 className="about-advantages-paragraph-heading">Covid-19 Tracker: </h3><p className="about-advantages-paragraph-text">We fetch and update covid-19 data every 5 minutes from 5 different APIs, which can help us to keep the tracker, up-to-date and accurate. We are honored to claim that we provide the essential COVID-19 statistical data of all 219 countries of the entire world separately. We also provide the coronavirus statistical data of all states of 23 countries which include <span className="about-advantages-paragraph-text-bold">United States of America, Canada, India, Australia, Brazil, Japan, Germany, France, United Kingdom, Netherlands, Italy, China, Chile, Colombia, Denmark, Mexico, Peru, Pakistan, Russia, Spain, Sweden, and Ukraine.</span> (Special thanks to <a onClick={this.changeOffset} href="https://covid-19-apis.postman.com/" className="about-advantages-paragraph-text-external-link">Postman</a> company that provided all essential APIs for every covid-19 cases.)</p>
                        </div>
                        <div className="about-advantages-paragraph">
                            <p className="about-advantages-paragraph-text">The visual <Link onClick={this.changeOffset} to="/covid-19-tracker" className="about-advantages-paragraph-text-internal-link">data</Link> you can observe in every table, are separated to the multiple following columns: Total cases, New Case, Active Cases, Serious or Critical Cases, Total Deaths, New Deaths, Total Tests and Total Recovered.Additionally we have added 4 measurement items named <span className="about-advantages-paragraph-text-bold">Infection risk, Case fatality rate (CFR), Test percentage and Recovery percentage</span> for any country and state, in order to make the data of coronavirus cases, more comprehensible.</p>
                        </div>
                        <div className="about-advantages-paragraph">
                            <p className="about-advantages-paragraph-text">In addition, you can see the data tracks from the past six months on visual charts in order to realize the trends on Total and New cases or deaths of each country, through the time. You can also compare each country's data with average world status.</p>
                        </div>
                        <div className="about-advantages-paragraph">
                            <p className="about-advantages-paragraph-text">We tried our best to demonstrate all these data in the most straightforward and user-friendly way, so any visitor can get the most of their observation from any section on their own devices.</p>
                        </div>
                        <div className="about-advantages-paragraph">
                            <h3 className="about-advantages-paragraph-heading">Vaccine Tracker: </h3><p className="about-advantages-paragraph-text">Thanks to <a onClick={this.changeOffset} href="https://milkeninstitute.org/centers/fastercures" className="about-advantages-paragraph-text-external-link">FasterCures</a> (Milken institute) we could gather latest data about more than 230 developing <Link onClick={this.changeOffset} to="/vaccine-tracker" className="about-advantages-paragraph-text-internal-link">vaccines</Link>. The following information is available about each vaccine:</p>
                            <ul className="about-advantages-paragraph-list">
                                <li className="about-advantages-paragraph-list-item">The clinical stage</li>
                                <li className="about-advantages-paragraph-list-item">The description of vaccine product</li>
                                <li className="about-advantages-paragraph-list-item">Following steps that the company should take for getting into the next phase</li>
                                <li className="about-advantages-paragraph-list-item">FDA approval in order to show that which vaccine has the eligibility to get into the market for public use</li>
                                <li className="about-advantages-paragraph-list-item">The Last time that the producing company revealed their results</li>
                                <li className="about-advantages-paragraph-list-item">Specific links to the results of each vaccine progress</li>
                            </ul>
                        </div>
                        <div className="about-advantages-paragraph">
                            <p className="about-advantages-paragraph-text">vaccines are organized according to clinical stage and production platform. We have also specified links to the vaccines that have more potential to reach phase 4 and get the FDA approval. You can see the complete information and results for that specific vaccine, by a click on any vaccine name.</p>
                        </div>
                        <div className="about-advantages-paragraph">
                            <h3 className="about-advantages-paragraph-heading">Treatment Tracker: </h3><p className="about-advantages-paragraph-text">The same as vaccine tracker, we provide data from the same resource, <a onClick={this.changeOffset} href="https://milkeninstitute.org/centers/fastercures" className="about-advantages-paragraph-text-external-link">FasterCures</a>. Treatments are organized based on clinical stage and development platform.</p>
                        </div>
                        <div className="about-advantages-paragraph">
                            <p className="about-advantages-paragraph-text">We have also specified the links to the most frequently used medications which are currently utilized to treat covid-19 cases and have more potential than other treatments to get FDA approval.</p>
                        </div>
                        <div className="about-advantages-paragraph">
                            <p className="about-advantages-paragraph-text">You can see the complete information and results about any specific medication, by a click on any treatment name.</p>
                        </div>
                        <div className="about-advantages-paragraph">
                            <h3 className="about-advantages-paragraph-heading">Articles: </h3><p className="about-advantages-paragraph-text">This part is a covid-specific blog that provides reviews and analytical articles about recent discoveries, epidemiologic findings and effects of the disease on different aspects of our life.</p>
                        </div>
                        <div className="about-advantages-paragraph">
                            <h3 className="about-advantages-paragraph-heading">News: </h3><p className="about-advantages-paragraph-text">We gather the most relevant coronavirus news from more than 20 well-founded broadcasting services with the most reliable sources for fresh coronavirus news and update them every 5 hours. The WHO (World Health Organization) news is placed at the top of other services which include <span className="about-advantages-paragraph-text-bold">CNN, BBC, FOX-news, TIME, MNT(Medical-News-Today), Bloomberg, ABC-news, CBS-news, CBC-news, NBC-news, USA Today, New Scientist, National Geographic, Google news, News24, Next Big Future, The Times of India, The Wall Street Journal, The Washington Post, and Axios.</span></p>
                        </div>
                        <div className="about-advantages-paragraph">
                            <h3 className="about-advantages-paragraph-heading">Maps: </h3><p className="about-advantages-paragraph-text">Here you can find an abstract visual information about covid-19 cases on maps. Not only we are covering the <span className="about-advantages-paragraph-text-bold">world map</span>, but also we provide information for entire states of several countries including <span className="about-advantages-paragraph-text-bold">United States of America, Canada, Brazil, Germany and Australia</span>. Since we have data from all covid-19 cases from 23 countries, we are trying to develop this part and add more countries with full information on their map in near future.</p>
                        </div>
                        <div className="about-advantages-paragraph">
                            <p className="about-advantages-paragraph-text">Each country or state has been distinguished from other countries and states by colors based on the total cases. </p>
                        </div>
                        <div className="about-advantages-paragraph">
                            <h3 className="about-advantages-paragraph-heading">Impacts: </h3><p className="about-advantages-paragraph-text">Coming soon!</p>
                        </div>
                        <div className="about-advantages-paragraph">
                            <p className="about-advantages-paragraph-text">We hope that <Link onClick={this.changeOffset} to="/" className="about-advantages-paragraph-text-internal-link">VACCOVID.LIVE</Link> help communities to stay safe and aware of the disease to prepare for future challenges...</p>
                        </div>

                    </main>
                </div>
                <Footer />
                <main>
                </main>
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
