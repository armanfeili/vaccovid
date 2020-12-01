import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import moment from 'moment';
import Footer from '../common/footer';

import {
    getEachVacOrTreat
} from '../../actions/vaccine';

export class EachTreatment extends Component {
    constructor() {
        super();
        // State is similar to props, but it is private and fully controlled by the component.
        this.titleRef = React.createRef()
        this.tableRef = React.createRef()
        this.regionRef = React.createRef()

        this.state = {
            showRegions: "off",
            category: "",
            name: "",
            descriptionText: "",
            order: "",
            order_kind: "",
            firstTimeOrdering: true,
            activeTitle: "lastUpdated",
        };

        this.onClickShowRegions = this.onClickShowRegions.bind(this);
        this.changeOffset = this.changeOffset.bind(this);
        this.callActionMethods = this.callActionMethods.bind(this);
    }

    async componentDidMount() {
        this.callActionMethods();
    }

    async componentDidUpdate(prevProps) {
        if (
            this.state.category !== this.props.match.params.category
            || this.state.name !== this.props.match.params.name
        ) {
            this.callActionMethods();

            this.setState({ category: this.props.match.params.category })
            this.setState({ name: this.props.match.params.name })
            // await this.getProvinceCovidData();
        }
    }

    async componentWillUnmount() {
    }

    async callActionMethods() {
        let { category, name } = this.props.match.params;
        this.props.getEachVacOrTreat(category, name);
    }

    changeOffset() {
        window.scrollBy(0, -4000);
    }

    onClickShowRegions() {
        if (this.state.showRegions === "on") {
            this.setState({ showRegions: "off" });
        } else {
            this.setState({ showRegions: "on" });
        }
    };

    render() {
        let { category, name } = this.props.match.params; // url parameteres
        // console.log(this.props.match.params);
        let { eachVacItem } = this.props;

        return <div>
            <Helmet>
                <title>{name} treatment results - vaccovid</title>
                <meta name="description" content={`Description and results of ${name} treatment in ${category} category - vaccovid`} />
            </Helmet>
            {
                category ? (
                    <div>
                        <div className="each-vaccine">
                            {/* <section className="each-vaccine-list"></section> */}
                            <div className="each-vaccine-btnAndTitle">
                                <button className="each-vaccine-btnAndTitle-btn" onClick={this.onClickShowRegions}>Choose Category &#9662;</button>
                                <h1 className="each-vaccine-btnAndTitle-title">{name.toUpperCase()}</h1>
                            </div>

                            <div className={`each-vaccine-responsive ${this.state.showRegions === "off" ? "take_underground" : ""}`}>
                                <button className="each-vaccine-responsive-close_btn" onClick={this.onClickShowRegions}></button>
                                <ul className={`each-vaccine-responsive-allregions`} id="region">
                                    <h2 className={`each-vaccine-responsive-allregions-title`}>Categories</h2>
                                    <Link to={{ pathname: `/treatment-tracker` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`each-vaccine-responsive-allregions-btn ${category === "all-treatments" ? "each-vaccine-responsive-allregions-btn-active" : ""}`}>ALL Treatments</Link>
                                    <Link to={{ pathname: `/treatment-tracker/fda-approved` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`each-vaccine-responsive-allregions-btn ${category === "fda-approved" ? "each-vaccine-responsive-allregions-btn-active" : ""}`} >FDA Apprroved</Link>
                                    <Link to={{ pathname: `/treatment-tracker/antibodies` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`each-vaccine-responsive-allregions-btn ${category === "antibodies" ? "each-vaccine-responsive-allregions-btn-active" : ""}`} >Antibodies</Link>
                                    <Link to={{ pathname: `/treatment-tracker/antivirals` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`each-vaccine-responsive-allregions-btn ${category === "antivirals" ? "each-vaccine-responsive-allregions-btn-active" : ""}`} >Antivirals</Link>
                                    <Link to={{ pathname: `/treatment-tracker/cell-based-therapies` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`each-vaccine-responsive-allregions-btn ${category === "cell-based-therapies" ? "each-vaccine-responsive-allregions-btn-active" : ""}`} >Cell-based Therapies</Link>
                                    <Link to={{ pathname: `/treatment-tracker/rna-based` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`each-vaccine-responsive-allregions-btn ${category === "rna-based" ? "each-vaccine-responsive-allregions-btn-active" : ""}`} >RNA Based</Link>
                                    <Link to={{ pathname: `/treatment-tracker/device` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`each-vaccine-responsive-allregions-btn ${category === "device" ? "each-vaccine-responsive-allregions-btn-active" : ""}`} >Device</Link>
                                    <Link to={{ pathname: `/treatment-tracker/scanning-compounds-to-repurpose` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`each-vaccine-responsive-allregions-btn ${category === "scanning-compounds-to-repurpose" ? "each-vaccine-responsive-allregions-btn-active" : ""}`} >Scanning Compounds to Repurpose</Link>
                                    <Link to={{ pathname: `/treatment-tracker/clinical` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`each-vaccine-responsive-allregions-btn ${category === "clinical" ? "each-vaccine-responsive-allregions-btn-active" : ""}`} >Clinical</Link>
                                    <Link to={{ pathname: `/treatment-tracker/pre-clinical` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`each-vaccine-responsive-allregions-btn ${category === "pre-clinical" ? "each-vaccine-responsive-allregions-btn-active" : ""}`} >Pre Clinical</Link>
                                    <p className={`vaccine-page-responsive-allregions-btn`} >...</p>
                                    <p className={`vaccine-page-responsive-allregions-btn`} >...</p>
                                    <p className={`vaccine-page-responsive-allregions-btn`} >...</p>
                                    <p className={`vaccine-page-responsive-allregions-btn`} >...</p>
                                    <p className={`vaccine-page-responsive-allregions-btn`} >...</p>
                                    <p className={`vaccine-page-responsive-allregions-btn`} >...</p>
                                    <p className={`vaccine-page-responsive-allregions-btn`} >...</p>
                                </ul>
                            </div>
                            <ul className="each-vaccine-list" id="region"
                                ref={this.regionRef}
                                onScroll={() => this.onScroll('region')}
                            >
                                <h2 className={`each-vaccine-list-title`}>Categories</h2>
                                <Link to={{ pathname: `/treatment-tracker/all-vaccines` }} onClick={async () => { }} className={`each-vaccine-list-btn ${category === "all-vaccines" ? "each-vaccine-list-btn-active" : ""}`}>ALL Treatments</Link>
                                <Link to={{ pathname: `/treatment-tracker/fda-approved` }} onClick={async () => { }} className={`each-vaccine-list-btn ${category === "fda-apprroved" ? "each-vaccine-list-btn-active" : ""}`}>FDA Apprroved</Link>
                                <Link to={{ pathname: `/treatment-tracker/antibodies` }} onClick={async () => { }} className={`each-vaccine-list-btn ${category === "antibodies" ? "each-vaccine-list-btn-active" : ""}`}>Antibodies</Link>
                                <Link to={{ pathname: `/treatment-tracker/antivirals` }} onClick={async () => { }} className={`each-vaccine-list-btn ${category === "antivirals" ? "each-vaccine-list-btn-active" : ""}`}>Antivirals</Link>
                                <Link to={{ pathname: `/treatment-tracker/cell-based-therapies` }} onClick={async () => { }} className={`each-vaccine-list-btn ${category === "cell-based-therapies" ? "each-vaccine-list-btn-active" : ""}`}>Cell-based Therapies</Link>
                                <Link to={{ pathname: `/treatment-tracker/rna-based` }} onClick={async () => { }} className={`each-vaccine-list-btn ${category === "rna-based" ? "each-vaccine-list-btn-active" : ""}`}>RNA Based</Link>
                                <Link to={{ pathname: `/treatment-tracker/device` }} onClick={async () => { }} className={`each-vaccine-list-btn ${category === "device" ? "each-vaccine-list-btn-active" : ""}`}>Device</Link>
                                <Link to={{ pathname: `/treatment-tracker/scanning-compounds-to-repurpose` }} onClick={async () => { }} className={`each-vaccine-list-btn ${category === "scanning-compounds-to-repurpose" ? "each-vaccine-list-btn-active" : ""}`}>Scanning Compounds to Repurpose</Link>
                                <Link to={{ pathname: `/treatment-tracker/clinical` }} onClick={async () => { }} className={`each-vaccine-list-btn ${category === "clinical" ? "each-vaccine-list-btn-active" : ""}`}>Clinical</Link>
                                <Link to={{ pathname: `/treatment-tracker/pre-clinical` }} onClick={async () => { }} className={`each-vaccine-list-btn ${category === "pre-clinical" ? "each-vaccine-list-btn-active" : ""}`}>Pre Clinical</Link>
                            </ul>

                            {
                                eachVacItem[0] !== undefined ?
                                    <section className="each-vaccine-titleAndPic">
                                        <div className="each-vaccine-titleAndPic-titleAndCategory">
                                            <div className="each-vaccine-titleAndPic-titleAndCategory-title">{eachVacItem[0].description === "undefined" ? eachVacItem[0].developerResearcher : eachVacItem[0].description.toUpperCase()}</div>
                                            <div className="each-vaccine-titleAndPic-titleAndCategory-category">{eachVacItem[0].category}</div>
                                            <div className={`each-vaccine-titleAndPic-titleAndCategory-treatmentVsVaccine`}>Type: <span className="each-vaccine-titleAndPic-titleAndCategory-treatmentVsVaccine-text">{eachVacItem[0].treatmentVsVaccine}</span></div>
                                            <div className={`each-vaccine-titleAndPic-titleAndCategory-phase ${eachVacItem[0].phase === "undefined" ? "displayOff" : ""}`}>Stage: <span className="each-vaccine-titleAndPic-titleAndCategory-phase-text">{eachVacItem[0].phase}</span></div>
                                            <div className={`each-vaccine-titleAndPic-titleAndCategory-funder ${eachVacItem[0].funder === "undefined" ? "displayOff" : ""}`}>Funder: <span className="each-vaccine-titleAndPic-titleAndCategory-funder-text">{eachVacItem[0].funder}</span></div>
                                            <div className={`each-vaccine-titleAndPic-titleAndCategory-FDAApproved ${eachVacItem[0].FDAApproved === "undefined" ? "displayOff" : ""}`}>FDA Approval: <span className="each-vaccine-titleAndPic-titleAndCategory-FDAApproved-text">{eachVacItem[0].FDAApproved}</span></div>
                                            <div className={`each-vaccine-titleAndPic-titleAndCategory-lastUpdated ${eachVacItem[0].lastUpdated === "undefined" ? "displayOff" : ""}`}>Last Update: <span className="each-vaccine-titleAndPic-titleAndCategory-lastUpdated-text">{moment(eachVacItem[0].lastUpdated).fromNow()}</span></div>
                                            <div className={`each-vaccine-titleAndPic-titleAndCategory-publishedResults ${eachVacItem[0].publishedResults[0] === "undefined" ? "displayOff" : ""}`}>Published Results: <span className="each-vaccine-titleAndPic-titleAndCategory-publishedResults-text">{eachVacItem[0].publishedResults[0] === "undefined" ? "" : eachVacItem[0].publishedResults.map((e, i) => {
                                                // return <div>{e}</div>
                                                return <a className="each-vaccine-titleAndPic-titleAndCategory-publishedResults-text-link" href={`${e}`} rel="noopener noreferrer" target="_blank">Link-{i + 1}</a>
                                            })}</span></div>
                                        </div>
                                        <div className="each-vaccine-titleAndPic-categoryPic">
                                            <img className="each-vaccine-titleAndPic-categoryPic-pic" src={`${require(`./../../views/vaccine-categories-pics/${eachVacItem[0].trimedCategory}.jpg`) ?
                                                require(`./../../views/vaccine-categories-pics/${eachVacItem[0].trimedCategory}.jpg`) :
                                                require(`./../../views/vaccine-categories-pics/other.jpg`)}`} alt="category" />
                                            <div className="each-vaccine-titleAndPic-categoryPic-cover"></div>
                                        </div>
                                    </section>
                                    : <div>Loading</div>
                            }
                            {eachVacItem[0] !== undefined ?
                                <main className="each-vaccine-desc">
                                    <div className="each-vaccine-desc-allText">
                                        <div className={`each-vaccine-desc-allText-description ${eachVacItem[0].developerResearcher === "undefined" ? "displayOff" : ""}`}>Description: <span className="each-vaccine-desc-allText-description-text">{eachVacItem[0].developerResearcher}</span></div>
                                        <div className={`each-vaccine-desc-allText-nextSteps ${eachVacItem[0].nextSteps === "undefined" ? "displayOff" : ""}`}>Next Steps: <span className="each-vaccine-desc-allText-nextSteps-text">{eachVacItem[0].nextSteps}</span></div>
                                        <div className={`each-vaccine-desc-allText-clinicalTrialsForCovid19 ${eachVacItem[0].clinicalTrialsForCovid19 === "undefined" ? "displayOff" : ""}`}>Clinical Trials For Covid-19: <span className="each-vaccine-desc-allText-clinicalTrialsForCovid19-text">{eachVacItem[0].clinicalTrialsForCovid19}</span></div>
                                        <div className={`each-vaccine-desc-allText-clinicalTrialsForOtherDiseases ${eachVacItem[0].clinicalTrialsForOtherDiseases === "undefined" ? "displayOff" : ""}`}>Clinical Trials For Other Diseases: <span className="each-vaccine-desc-allText-clinicalTrialsForOtherDiseases-text">{eachVacItem[0].clinicalTrialsForOtherDiseases}</span></div>
                                    </div>
                                </main>
                                : <div>...</div>}
                            {/* <section className="each-vaccine-table"></section> */}
                        </div>
                    </div>
                ) : (<h6>loading</h6>)
            }
            <Footer />
        </div>

    }
}

EachTreatment.propTypes = {
    eachVacItem: PropTypes.array,

    getEachVacOrTreat: PropTypes.func.isRequired,
};


// pass the application state (main data) to our component as props. so we can access it by props
const mapStateToProps = state => ({
    // vaccines: state.vaccineObject.vaccines,
    // treatments: state.vaccineObject.treatments,
    eachVacItem: state.vaccineObject.eachVacItem,
});

export default connect(
    mapStateToProps,
    {
        getEachVacOrTreat
    })(EachTreatment);
