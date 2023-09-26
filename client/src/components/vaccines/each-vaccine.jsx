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

export class EachVaccine extends Component {
    constructor() {
        super();
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
        let { eachVacItem } = this.props;

        return <div>
            <Helmet>
                <title>{name} vaccine results - vaccovid</title>
                <meta name="description" content={`Description and results of ${name} vaccine in ${category} category - vaccovid`} />
            </Helmet>
            {
                category ? (
                    <div>
                        <div className="each-vaccine">
                            <div className="each-vaccine-btnAndTitle">
                                <button className="each-vaccine-btnAndTitle-btn" onClick={this.onClickShowRegions}>Choose Category &#9662;</button>
                                <h1 className="each-vaccine-btnAndTitle-title">{name.toUpperCase()}</h1>
                            </div>

                            <div className={`each-vaccine-responsive ${this.state.showRegions === "off" ? "take_underground" : ""}`}>
                                <button className="each-vaccine-responsive-close_btn" onClick={this.onClickShowRegions}></button>
                                <ul className={`each-vaccine-responsive-allregions`} id="region">
                                    <h2 className={`each-vaccine-responsive-allregions-title`}>Phases</h2>
                                    <Link to={{ pathname: `/vaccine-tracker/all-vaccines` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`each-vaccine-responsive-allregions-btn ${category === "all-vaccines" ? "each-vaccine-responsive-allregions-btn-active" : ""}`}>ALL Vaccines</Link>
                                    <Link to={{ pathname: `/vaccine-tracker/phase-four` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`each-vaccine-responsive-allregions-btn ${category === "phase-four" ? "each-vaccine-responsive-allregions-btn-active" : ""}`} >Phase 4</Link>
                                    <Link to={{ pathname: `/vaccine-tracker/phase-three` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`each-vaccine-responsive-allregions-btn ${category === "phase-three" ? "each-vaccine-responsive-allregions-btn-active" : ""}`} >Phase 3</Link>
                                    <Link to={{ pathname: `/vaccine-tracker/phase-two` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`each-vaccine-responsive-allregions-btn ${category === "phase-two" ? "each-vaccine-responsive-allregions-btn-active" : ""}`} >Phase 2</Link>
                                    <Link to={{ pathname: `/vaccine-tracker/phase-one` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`each-vaccine-responsive-allregions-btn ${category === "phase-one" ? "each-vaccine-responsive-allregions-btn-active" : ""}`} >Phase 1</Link>
                                    <Link to={{ pathname: `/vaccine-tracker/pre-clinical` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`each-vaccine-responsive-allregions-btn ${category === "pre-clinical" ? "each-vaccine-responsive-allregions-btn-active" : ""}`} >Pre Clinical</Link>

                                    <h2 className={`each-vaccine-responsive-allregions-title`}>Categories</h2>
                                    <Link to={{ pathname: `/vaccine-tracker/rna-based` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`each-vaccine-responsive-allregions-btn ${category === "rna-based" ? "each-vaccine-responsive-allregions-btn-active" : ""}`} >RNA Based</Link>
                                    <Link to={{ pathname: `/vaccine-tracker/dna-based` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`each-vaccine-responsive-allregions-btn ${category === "dna-based" ? "each-vaccine-responsive-allregions-btn-active" : ""}`} >DNA Based</Link>
                                    <Link to={{ pathname: `/vaccine-tracker/inactivated-virus` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`each-vaccine-responsive-allregions-btn ${category === "inactivated-virus" ? "each-vaccine-responsive-allregions-btn-active" : ""}`} >Inactivated Virus</Link>
                                    <Link to={{ pathname: `/vaccine-tracker/live-attenuated-virus` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`each-vaccine-responsive-allregions-btn ${category === "live-attenuated-virus" ? "each-vaccine-responsive-allregions-btn-active" : ""}`} >Live Attenuated Virus</Link>
                                    <Link to={{ pathname: `/vaccine-tracker/replicating-viral-vector` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`each-vaccine-responsive-allregions-btn ${category === "replicating-viral-vector" ? "each-vaccine-responsive-allregions-btn-active" : ""}`} >Replicating Viral Vector</Link>
                                    <Link to={{ pathname: `/vaccine-tracker/non-replicating-viral-vector` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`each-vaccine-responsive-allregions-btn ${category === "non-replicating-viral-vector" ? "each-vaccine-responsive-allregions-btn-active" : ""}`} >Non-Replicating Viral Vector</Link>
                                    <Link to={{ pathname: `/vaccine-tracker/protein-subunit` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`each-vaccine-responsive-allregions-btn ${category === "protein-subunit" ? "each-vaccine-responsive-allregions-btn-active" : ""}`} >Protein subunit</Link>
                                    <Link to={{ pathname: `/vaccine-tracker/virus-like-particle` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`each-vaccine-responsive-allregions-btn ${category === "virus-like-particle" ? "each-vaccine-responsive-allregions-btn-active" : ""}`} >Virus-Like Particle</Link>
                                    <Link to={{ pathname: `/vaccine-tracker/replicating-bacterial-vector` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`each-vaccine-responsive-allregions-btn ${category === "replicating-bacterial-vector" ? "each-vaccine-responsive-allregions-btn-active" : ""}`} >Replicating Bacterial Vector</Link>
                                    <p className={`each-vaccine-responsive-allregions-btn`} >...</p>
                                    <p className={`each-vaccine-responsive-allregions-btn`} >---</p>
                                </ul>
                            </div>
                            <ul className="each-vaccine-list" id="region"
                                ref={this.regionRef}
                                onScroll={() => this.onScroll('region')}
                            >
                                <h2 className={`each-vaccine-list-title`}>Categories</h2>
                                <Link to={{ pathname: `/vaccine-tracker/all-vaccines` }} onClick={async () => { }} className={`each-vaccine-list-btn ${category === "all-vaccines" ? "each-vaccine-list-btn-active" : ""}`}>ALL Vaccines</Link>
                                <Link to={{ pathname: `/vaccine-tracker/fda-approved` }} onClick={async () => { }} className={`each-vaccine-list-btn ${category === "fda-apprroved" ? "each-vaccine-list-btn-active" : ""}`}>FDA Apprroved</Link>
                                <Link to={{ pathname: `/vaccine-tracker/rna-based` }} onClick={async () => { }} className={`each-vaccine-list-btn ${category === "rna-based" ? "each-vaccine-list-btn-active" : ""}`}>RNA Based</Link>
                                <Link to={{ pathname: `/vaccine-tracker/dna-based` }} onClick={async () => { }} className={`each-vaccine-list-btn ${category === "dna-based" ? "each-vaccine-list-btn-active" : ""}`}>DNA Based</Link>
                                <Link to={{ pathname: `/vaccine-tracker/inactivated-virus` }} onClick={async () => { }} className={`each-vaccine-list-btn ${category === "inactivated-virus" ? "each-vaccine-list-btn-active" : ""}`}>Inactivated Virus</Link>
                                <Link to={{ pathname: `/vaccine-tracker/live-attenuated-virus` }} onClick={async () => { }} className={`each-vaccine-list-btn ${category === "live-attenuated-virus" ? "each-vaccine-list-btn-active" : ""}`}>Live Attenuated Virus</Link>
                                <Link to={{ pathname: `/vaccine-tracker/replicating-viral-vector` }} onClick={async () => { }} className={`each-vaccine-list-btn ${category === "replicating-viral-vector" ? "each-vaccine-list-btn-active" : ""}`}>Replicating Viral Vector</Link>
                                <Link to={{ pathname: `/vaccine-tracker/non-replicating-viral-vector` }} onClick={async () => { }} className={`each-vaccine-list-btn ${category === "non-replicating-viral-vector" ? "each-vaccine-list-btn-active" : ""}`}>Non-Replicating Viral Vector</Link>
                                <Link to={{ pathname: `/vaccine-tracker/protein-subunit` }} onClick={async () => { }} className={`each-vaccine-list-btn ${category === "protein-subunit" ? "each-vaccine-list-btn-active" : ""}`}>Protein subunit</Link>
                                <Link to={{ pathname: `/vaccine-tracker/replicating-bacterial-vector` }} onClick={async () => { }} className={`each-vaccine-list-btn ${category === "replicating-bacterial-vector" ? "each-vaccine-list-btn-active" : ""}`}>Replicating Bacterial Vector</Link>
                                <Link to={{ pathname: `/vaccine-tracker/virus-like-particle` }} onClick={async () => { }} className={`each-vaccine-list-btn ${category === "virus-like-particle" ? "each-vaccine-list-btn-active" : ""}`}>Virus-Like Particle</Link>
                            </ul>

                            {
                                eachVacItem[0] !== undefined ?
                                    <section className="each-vaccine-titleAndPic">
                                        <div className="each-vaccine-titleAndPic-titleAndCategory">
                                            <div className="each-vaccine-titleAndPic-titleAndCategory-title">{eachVacItem[0].developerResearcher.toUpperCase()}</div>
                                            <div className="each-vaccine-titleAndPic-titleAndCategory-category">{eachVacItem[0].category}</div>
                                            <div className={`each-vaccine-titleAndPic-titleAndCategory-treatmentVsVaccine`}>Type: <span className="each-vaccine-titleAndPic-titleAndCategory-treatmentVsVaccine-text">{eachVacItem[0].treatmentVsVaccine}</span></div>
                                            <div className={`each-vaccine-titleAndPic-titleAndCategory-phase ${eachVacItem[0].phase === "undefined" ? "displayOff" : ""}`}>Stage: <span className="each-vaccine-titleAndPic-titleAndCategory-phase-text">{eachVacItem[0].phase}</span></div>
                                            <div className={`each-vaccine-titleAndPic-titleAndCategory-funder ${eachVacItem[0].funder === "undefined" ? "displayOff" : ""}`}>Funder: <span className="each-vaccine-titleAndPic-titleAndCategory-funder-text">{eachVacItem[0].funder}</span></div>
                                            <div className={`each-vaccine-titleAndPic-titleAndCategory-FDAApproved ${eachVacItem[0].FDAApproved === "undefined" ? "displayOff" : ""}`}>FDA Approval: <span className="each-vaccine-titleAndPic-titleAndCategory-FDAApproved-text">{eachVacItem[0].FDAApproved}</span></div>
                                            <div className={`each-vaccine-titleAndPic-titleAndCategory-lastUpdated ${eachVacItem[0].lastUpdated === "undefined" ? "displayOff" : ""}`}>Last Update: <span className="each-vaccine-titleAndPic-titleAndCategory-lastUpdated-text">{moment(eachVacItem[0].lastUpdated).fromNow()}</span></div>
                                            <div className={`each-vaccine-titleAndPic-titleAndCategory-publishedResults ${eachVacItem[0].publishedResults[0] === "undefined" ? "displayOff" : ""}`}>Published Results: <span className="each-vaccine-titleAndPic-titleAndCategory-publishedResults-text">{eachVacItem[0].publishedResults[0] === "undefined" ? "" : eachVacItem[0].publishedResults.map((e, i) => {
                                                return <a className="each-vaccine-titleAndPic-titleAndCategory-publishedResults-text-link" href={`${e}`} rel="noopener noreferrer" target="_blank">Link-{i + 1}</a>
                                            })}</span></div>
                                        </div>
                                        <div className="each-vaccine-titleAndPic-categoryPic">
                                            <img className="each-vaccine-titleAndPic-categoryPic-pic" src={`${require(`./../../views/vaccine-categories-pics/${eachVacItem[0].trimedCategory}.jpg`) ?
                                                require(`./../../views/vaccine-categories-pics/${eachVacItem[0].trimedCategory}.jpg`) :
                                                require(`./../../views/vaccine-categories-pics/Other.jpg`)}`} alt="category" />
                                            <div className="each-vaccine-titleAndPic-categoryPic-cover"></div>
                                        </div>
                                    </section>
                                    : <div>Loading</div>
                            }
                            {eachVacItem[0] !== undefined ?
                                <main className="each-vaccine-desc">
                                    <div className="each-vaccine-desc-allText">
                                        <div className={`each-vaccine-desc-allText-description ${eachVacItem[0].description === "undefined" ? "displayOff" : ""}`}>Description: <span className="each-vaccine-desc-allText-description-text">{eachVacItem[0].description}</span></div>
                                        <div className={`each-vaccine-desc-allText-nextSteps ${eachVacItem[0].nextSteps === "undefined" ? "displayOff" : ""}`}>Next Steps: <span className="each-vaccine-desc-allText-nextSteps-text">{eachVacItem[0].nextSteps}</span></div>
                                        <div className={`each-vaccine-desc-allText-clinicalTrialsForCovid19 ${eachVacItem[0].clinicalTrialsForCovid19 === "undefined" ? "displayOff" : ""}`}>Clinical Trials For Covid-19: <span className="each-vaccine-desc-allText-clinicalTrialsForCovid19-text">{eachVacItem[0].clinicalTrialsForCovid19}</span></div>
                                        <div className={`each-vaccine-desc-allText-clinicalTrialsForOtherDiseases ${eachVacItem[0].clinicalTrialsForOtherDiseases === "undefined" ? "displayOff" : ""}`}>Clinical Trials For Other Diseases: <span className="each-vaccine-desc-allText-clinicalTrialsForOtherDiseases-text">{eachVacItem[0].clinicalTrialsForOtherDiseases}</span></div>
                                    </div>
                                </main>
                                : <div>...</div>}
                        </div>
                    </div>
                ) : (<h6>loading</h6>)
            }
            <Footer />
        </div>

    }
}

EachVaccine.propTypes = {
    eachVacItem: PropTypes.array,

    getEachVacOrTreat: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    eachVacItem: state.vaccineObject.eachVacItem,
});

export default connect(
    mapStateToProps,
    {
        getEachVacOrTreat
    })(EachVaccine);
