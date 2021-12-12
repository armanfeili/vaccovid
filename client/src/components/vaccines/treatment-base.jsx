import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import moment from 'moment';
import Footer from '../common/footer';

import {
    getAllTreatments, getAllTreatmentsPreClinical, getAllTreatmentsClinical, getAllTreatmentsFDAApproved, getTreatmentsCategoryBased,
    clearTreatmentData
} from '../../actions/vaccine';

export class TreatmentBase extends Component {
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
        this.handleChange = this.handleChange.bind(this);
        this.compareValues = this.compareValues.bind(this);
        // this.numberWithCommas = this.numberWithCommas.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.search = this.search.bind(this);
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
        await this.props.clearTreatmentData();
    }

    async callActionMethods() {
        let category = "all-treatments"
        if (category === "all-treatments") {
            await this.props.getAllTreatments();
            this.setState({ descriptionText: "Here you can find all of the developing or approved treatments and drugs in every stage. You can sort the table based on each columns or search for a unique treatment name." })
        }
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

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    // sort array of objects based on their values: string or number
    compareValues(key, order = 'asc') {
        return function innerSort(a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                // property doesn't exist on either object
                return 0;
            }

            const varA = (typeof a[key] === 'string') && a[key] !== "undefined"
                ? a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string') && b[key] !== "undefined"
                ? b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            // console.log(comparison)
            return (
                (order === 'desc') ? (comparison * -1) : comparison
            );
        };
    }

    onScroll = (element) => {
        // http://jsfiddle.net/gwcoffey/9EfUy/
        // https://andrewnoske.com/wiki/JavaScript_-_Synchronize_Two_Scroll_Areas
        // https://codepen.io/JohnReynolds57/pen/NLNOyO?editors=0011
        // https://www.w3schools.com/jsref/prop_element_scrolltop.asp

        if (this.regionRef.current !== "undefined" && this.titleRef.current !== "undefined" && this.tableRef.current !== "undefined") {
            // console.log(this.regionRef.current);  // this is the element
            // const scrollY = window.scrollY //Don't get confused by what's scrolling - It's not the window
            // let scrollTitle = this.titleRef.current.scrollLeft
            let scrollTable = this.tableRef.current.scrollLeft

            if (element === "columns") {
                // this.tableRef.current.scrollLeft = scrollTitle
                // scrollTable = scrollTitle;
            }
            else if (element === "coronavirusTable") {
                this.titleRef.current.scrollLeft = scrollTable
                // scrollTitle = scrollTable;
            }
        }
    }

    search() {
        // Declare variables
        let input = document.getElementById("input");
        let filter = input !== "undefined" && input !== null ? input.value.toUpperCase() : '';
        let table = document.getElementById("coronavirusTable");
        let selectedTR = []
        let td = []
        let txtValue;
        // console.log(table);

        let tr = table !== "undefined" && table !== null && input !== null ? table.getElementsByTagName("tr") : '';
        // Loop through all table rows, and hide those who don't match the search query
        for (let i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    selectedTR.push(tr[i]);
                    if (selectedTR.length === tr.length) {
                        selectedTR = []
                    }
                } else {
                    tr[i].style.display = "none";
                }
            }
        }

        if (selectedTR.length > 0) {
            for (let i = 0; i < selectedTR.length; i++) {
                i % 2 === 0 ? selectedTR[i].style.backgroundColor = " #083358" : selectedTR[i].style.backgroundColor = "#00204a";
            }
        } else {
            for (let i = 0; i < tr.length; i++) {
                i % 2 === 0 ? tr[i].style.backgroundColor = "" : tr[i].style.backgroundColor = "";
            }
        }
    }

    render() {
        let category = "all-treatments"
        let { treatments } = this.props;
        let tableIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]



        const orderName = (titleName, orderBase) => {
            if (this.state.order_kind !== titleName) {
                this.setState({ activeTitle: orderBase })
                treatments = treatments.sort(this.compareValues(orderBase, 'asc'));
                this.setState({ order: 'asc' })
                this.setState({ order_kind: titleName })
                this.setState({ firstTimeOrdering: false })
            } else if (this.state.order_kind === titleName) {
                this.setState({ activeTitle: orderBase })
                if (this.state.order === 'desc') {
                    treatments = treatments.sort(this.compareValues(orderBase, 'asc'));
                    this.setState({ order: 'asc' })
                } else if (this.state.order === 'asc') {
                    treatments = treatments.sort(this.compareValues(orderBase, 'desc'));
                    this.setState({ order: 'desc' })
                }
            }
        }

        const orderDate = (titleName, orderBase) => {
            if (this.state.firstTimeOrdering === true) {
                treatments = treatments.sort(this.compareValues('lastUpdated', 'asc'));
                this.setState({ order: 'asc' })
                this.setState({ order_kind: 'lastUpdated' })
                this.setState({ firstTimeOrdering: false })
            } else if (this.state.order_kind !== titleName) {
                this.setState({ activeTitle: orderBase })
                treatments = treatments.sort(this.compareValues(orderBase, 'desc'));
                this.setState({ order: 'desc' })
                this.setState({ order_kind: titleName })
                this.setState({ firstTimeOrdering: false })
            } else if (this.state.order_kind === titleName) {
                this.setState({ activeTitle: orderBase })
                if (this.state.order === 'desc') {
                    treatments = treatments.sort(this.compareValues(orderBase, 'asc'));
                    this.setState({ order: 'asc' })
                } else if (this.state.order === 'asc') {
                    treatments = treatments.sort(this.compareValues(orderBase, 'desc'));
                    this.setState({ order: 'desc' })
                }
            }
        }

        return <div>
            <Helmet>
                <title>Coronavirus {category} treatment tracker, drugs and medicine - vaccovid</title>
                <meta name="description" content={`Vaccine and Covid-19 tracker. Coronavirus Treatment Tracker ${category} statistical data. Including Category,Company,Stages,results`} />
            </Helmet>
            {
                category ? (
                    <div>
                        <div className="vaccine-page">
                            {/* <section className="vaccine-page-list"></section> */}
                            <div className="vaccine-page-btnAndTitle">
                                <button className="vaccine-page-btnAndTitle-btn" onClick={this.onClickShowRegions}>Choose Category &#9662;</button>
                                <h1 className="vaccine-page-btnAndTitle-title">{category.toUpperCase()}</h1>
                            </div>

                            <div className={`vaccine-page-responsive ${this.state.showRegions === "off" ? "take_underground" : ""}`}>
                                <button className="vaccine-page-responsive-close_btn" onClick={this.onClickShowRegions}></button>
                                <ul className={`vaccine-page-responsive-allregions`} id="region">
                                    <h2 className={`vaccine-page-responsive-allregions-title`}>Categories</h2>
                                    <Link to={{ pathname: `/treatment-tracker` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`vaccine-page-responsive-allregions-btn ${category === "all-treatments" ? "vaccine-page-responsive-allregions-btn-active" : ""}`}>ALL Treatments</Link>
                                    <Link to={{ pathname: `/treatment-tracker/fda-approved` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`vaccine-page-responsive-allregions-btn ${category === "fda-approved" ? "vaccine-page-responsive-allregions-btn-active" : ""}`} >FDA Apprroved</Link>
                                    <Link to={{ pathname: `/treatment-tracker/antibodies` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`vaccine-page-responsive-allregions-btn ${category === "antibodies" ? "vaccine-page-responsive-allregions-btn-active" : ""}`} >Antibodies</Link>
                                    <Link to={{ pathname: `/treatment-tracker/antivirals` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`vaccine-page-responsive-allregions-btn ${category === "antivirals" ? "vaccine-page-responsive-allregions-btn-active" : ""}`} >Antivirals</Link>
                                    <Link to={{ pathname: `/treatment-tracker/cell-based-therapies` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`vaccine-page-responsive-allregions-btn ${category === "cell-based-therapies" ? "vaccine-page-responsive-allregions-btn-active" : ""}`} >Cell-based Therapies</Link>
                                    <Link to={{ pathname: `/treatment-tracker/rna-based` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`vaccine-page-responsive-allregions-btn ${category === "rna-based" ? "vaccine-page-responsive-allregions-btn-active" : ""}`} >RNA Based</Link>
                                    <Link to={{ pathname: `/treatment-tracker/device` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`vaccine-page-responsive-allregions-btn ${category === "device" ? "vaccine-page-responsive-allregions-btn-active" : ""}`} >Device</Link>
                                    <Link to={{ pathname: `/treatment-tracker/scanning-compounds-to-repurpose` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`vaccine-page-responsive-allregions-btn ${category === "scanning-compounds-to-repurpose" ? "vaccine-page-responsive-allregions-btn-active" : ""}`} >Scanning Compounds to Repurpose</Link>
                                    <Link to={{ pathname: `/treatment-tracker/clinical` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`vaccine-page-responsive-allregions-btn ${category === "clinical" ? "vaccine-page-responsive-allregions-btn-active" : ""}`} >Clinical</Link>
                                    <Link to={{ pathname: `/treatment-tracker/pre-clinical` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`vaccine-page-responsive-allregions-btn ${category === "pre-clinical" ? "vaccine-page-responsive-allregions-btn-active" : ""}`} >Pre Clinical</Link>
                                    <p className={`vaccine-page-responsive-allregions-btn`} >...</p>
                                    <p className={`vaccine-page-responsive-allregions-btn`} >...</p>
                                    <p className={`vaccine-page-responsive-allregions-btn`} >...</p>
                                    <p className={`vaccine-page-responsive-allregions-btn`} >...</p>
                                    <p className={`vaccine-page-responsive-allregions-btn`} >...</p>
                                    <p className={`vaccine-page-responsive-allregions-btn`} >...</p>
                                </ul>
                            </div>
                            <ul className="vaccine-page-list" id="region"
                                ref={this.regionRef}
                                onScroll={() => this.onScroll('region')}
                            >
                                <h2 className={`vaccine-page-list-title`}>Categories</h2>
                                <Link to={{ pathname: `/treatment-tracker` }} onClick={async () => { }} className={`vaccine-page-list-btn ${category === "all-treatments" ? "vaccine-page-list-btn-active" : ""}`}>ALL Treatments</Link>
                                <Link to={{ pathname: `/treatment-tracker/fda-approved` }} onClick={async () => { }} className={`vaccine-page-list-btn ${category === "fda-approved" ? "vaccine-page-list-btn-active" : ""}`}>FDA Apprroved</Link>
                                <Link to={{ pathname: `/treatment-tracker/antibodies` }} onClick={async () => { }} className={`vaccine-page-list-btn ${category === "antibodies" ? "vaccine-page-list-btn-active" : ""}`}>Antibodies</Link>
                                <Link to={{ pathname: `/treatment-tracker/antivirals` }} onClick={async () => { }} className={`vaccine-page-list-btn ${category === "antivirals" ? "vaccine-page-list-btn-active" : ""}`}>Antivirals</Link>
                                <Link to={{ pathname: `/treatment-tracker/cell-based-therapies` }} onClick={async () => { }} className={`vaccine-page-list-btn ${category === "cell-based-therapies" ? "vaccine-page-list-btn-active" : ""}`}>Cell-based Therapies</Link>
                                <Link to={{ pathname: `/treatment-tracker/rna-based` }} onClick={async () => { }} className={`vaccine-page-list-btn ${category === "rna-based" ? "vaccine-page-list-btn-active" : ""}`}>RNA Based</Link>
                                <Link to={{ pathname: `/treatment-tracker/device` }} onClick={async () => { }} className={`vaccine-page-list-btn ${category === "device" ? "vaccine-page-list-btn-active" : ""}`}>Device</Link>
                                <Link to={{ pathname: `/treatment-tracker/scanning-compounds-to-repurpose` }} onClick={async () => { }} className={`vaccine-page-list-btn ${category === "scanning-compounds-to-repurpose" ? "vaccine-page-list-btn-active" : ""}`}>Scanning Compounds to Repurpose</Link>
                                <Link to={{ pathname: `/treatment-tracker/clinical` }} onClick={async () => { }} className={`vaccine-page-list-btn ${category === "clinical" ? "vaccine-page-list-btn-active" : ""}`}>Clinical</Link>
                                <Link to={{ pathname: `/treatment-tracker/pre-clinical` }} onClick={async () => { }} className={`vaccine-page-list-btn ${category === "pre-clinical" ? "vaccine-page-list-btn-active" : ""}`}>Pre Clinical</Link>
                            </ul>

                            <section className="vaccine-page-treatment-categories">
                                <Link to={{ pathname: `/treatment-tracker` }} onClick={async () => { }} className={`vaccine-page-categories-btn vaccine-page-categories-btn-0 ${category === "all-treatments" ? "vaccine-page-categories-btn-active" : ""}`}>All Treatments</Link>
                                <Link to={{ pathname: `/treatment-tracker/fda-approved` }} onClick={async () => { }} className={`vaccine-page-categories-btn vaccine-page-categories-btn-9 ${category === "fda-approved" ? "vaccine-page-categories-btn-active" : ""}`}>FDA Approved</Link>
                                <Link to={{ pathname: `/treatment-tracker/antivirals/gilead-world-health-organization-solidarity-trial-national-institute-of-allergy-and-infectious-diseases-(niaid)s-adaptive-covid-19-treatment-trial-feinstein-institutes-i-spy-covid` }} onClick={async () => { }} className={`vaccine-page-categories-btn vaccine-page-categories-btn-4 ${category === "pre-clinical" ? "vaccine-page-categories-btn-active" : ""}`}>Remdesivir</Link>
                                <Link to={{ pathname: `/treatment-tracker/antivirals/fujifilm-toyama-chemical-zhejiang-hisun-pharmaceuticals-numerous-trials-with-global-research-sponsors-brigham-and-womens-hospital-massachusetts-general-hospital,-and-the-university-of-massachusetts-medical-school-glenmark-pharmaceuticals` }} onClick={async () => { }} className={`vaccine-page-categories-btn vaccine-page-categories-btn-3 ${category === "phase-one" ? "vaccine-page-categories-btn-active" : ""}`}>Favipiravir</Link>
                                <Link to={{ pathname: `/treatment-tracker/other/numerous-trials-with-global-research-sponsors-including-world-health-organization-solidarity-trial-orchid-trial-with-national-heart-lung,-and-blood-institute-(nhlbi)-remap-cap-global-trial-novartis-principle-trial` }} onClick={async () => { }} className={`vaccine-page-categories-btn vaccine-page-categories-btn-2 ${category === "phase-two" ? "vaccine-page-categories-btn-active" : ""}`}>HydroxyChloroquine</Link>
                                <Link to={{ pathname: `/treatment-tracker/other/medincell-university-of-utah-surgisphere-corp-university-of-baghdad-tanta-university-other-global-research-sponsors` }} onClick={async () => { }} className={`vaccine-page-categories-btn vaccine-page-categories-btn-1 ${category === "phase-three" ? "vaccine-page-categories-btn-active" : ""}`}>Ivermectin</Link>
                                <Link to={{ pathname: `/treatment-tracker/antibodies/numerous-trials-with-global-research-sponsors-roche-remap-cap-recovery` }} onClick={async () => { }} className={`vaccine-page-categories-btn vaccine-page-categories-btn-5 ${category === "phase-four" ? "vaccine-page-categories-btn-active" : ""}`}>Tocilizumab</Link>
                                <Link to={{ pathname: `/treatment-tracker/other/swedish-orphan-biovitrum-remap-cap-global-trial-numerous-global-trial-sponsors` }} onClick={async () => { }} className={`vaccine-page-categories-btn vaccine-page-categories-btn-6 ${category === "pfizer" ? "vaccine-page-categories-btn-active" : ""}`}>Anakinra</Link>
                                <Link to={{ pathname: `/treatment-tracker/other/university-of-hawaii-(boehringer-ingelheim)-other-global-research-sponsors` }} onClick={async () => { }} className={`vaccine-page-categories-btn vaccine-page-categories-btn-7 ${category === "moderna" ? "vaccine-page-categories-btn-active" : ""}`}>Telmisartan</Link>
                                <Link to={{ pathname: `/treatment-tracker/antivirals/national-institute-of-allergy-and-infectious-disease-(niaid)university-of-minnesota` }} onClick={async () => { }} className={`vaccine-page-categories-btn vaccine-page-categories-btn-8 ${category === "oxford" ? "vaccine-page-categories-btn-active" : ""}`}>Hyperimmune immunoglobulin(hIVIG)</Link>
                            </section>
                            <main className="vaccine-page-desc">
                                <div className="vaccine-page-desc-title">{category.toUpperCase()}</div>
                                <div className="vaccine-page-desc-between"></div>
                                <div className="vaccine-page-desc-description">{this.state.descriptionText}</div>
                            </main>
                            <div className="vaccine-page-table-title">
                                <input className="vaccine-page-table-title-searchbar" type="text" id="input" placeholder="Search For Company" onKeyUp={this.search()} value={this.state.value} onChange={this.handleChange} />
                                {/* <h4 className="vaccine-page-table-title-update-text">Update in <span id="time">05:00</span><span className="navigation-brand__livepoint"></span><span className="navigation-brand__shiningpoint"></span></h4> */}
                                <table className="vaccine-page-table-title-stats" id="t01">
                                    <caption className="vaccine-page-table-title-stats-caption"><h1 className="vaccine-page-table-title-stats-caption-h1">{category === "all-treatments" ? "All Treatments" : category.toUpperCase() + " Treatments"} </h1></caption>
                                    <thead className="vaccine-page-table-title-stats-thead">
                                        <tr className="vaccine-page-table-title-stats-columns" id="columns"
                                            ref={this.titleRef}
                                            // onScroll={this.onScroll('columns')}
                                            onScroll={() => this.onScroll('columns')}
                                        >
                                            <th className={`vaccine-page-table-title-stats-columns-item vaccine-page-table-title-stats-columns-number`}>NUM</th>
                                            <th className={`vaccine-page-table-title-stats-columns-item vaccine-page-table-title-stats-columns-name ${this.state.activeTitle === 'developerResearcher' ? "vaccine-page-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderName('description', 'description') }}>Treatments <span className="sign">&#9662;</span></th>
                                            <th className={`vaccine-page-table-title-stats-columns-item vaccine-page-table-title-stats-columns-confirmed ${this.state.activeTitle === 'category' ? "vaccine-page-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderName('category', 'category') }}>Category <span className="sign">&#9662;</span></th>
                                            <th className={`vaccine-page-table-title-stats-columns-item vaccine-page-table-title-stats-columns-newcases ${this.state.activeTitle === 'phase' ? "vaccine-page-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderName('phase', 'phase') }}>Stage <span className="sign">&#9662;</span></th>
                                            <th className={`vaccine-page-table-title-stats-columns-item vaccine-page-table-title-stats-columns-newcases ${this.state.activeTitle === 'description' ? "vaccine-page-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderName('developerResearcher', 'developerResearcher') }}>Companies <span className="sign">&#9662;</span></th>
                                            <th className={`vaccine-page-table-title-stats-columns-item vaccine-page-table-title-stats-columns-confirmedpermil ${this.state.activeTitle === 'nextSteps' ? "vaccine-page-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderName('nextSteps', 'nextSteps') }}>Anticipated Next Steps <span className="sign">&#9662;</span></th>
                                            <th className={`vaccine-page-table-title-stats-columns-item vaccine-page-table-title-stats-columns-active ${this.state.activeTitle === 'FDAApproved' ? "vaccine-page-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderName('FDAApproved', 'FDAApproved') }}>FDA-Approved Indications <span className="sign">&#9662;</span></th>
                                            <th className={`vaccine-page-table-title-stats-columns-item vaccine-page-table-title-stats-columns-critical ${this.state.activeTitle === 'funder' ? "vaccine-page-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderName('funder', 'funder') }}>Funder <span className="sign">&#9662;</span></th>
                                            <th className={`vaccine-page-table-title-stats-columns-item vaccine-page-table-title-stats-columns-deceased ${this.state.activeTitle === 'lastUpdated' ? "vaccine-page-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderDate('lastUpdated', 'lastUpdated') }}>Date Last Updated <span className="sign">&#9662;</span></th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>

                            <table className="vaccine-page-table-stats" id="coronavirusTable"
                                ref={this.tableRef}
                                // onscroll={this.onScroll('coronavirusTable')}
                                onScroll={() => this.onScroll('coronavirusTable')}
                            >
                                <tbody>
                                    {treatments.length > 0 ? treatments.map((vaccine, index) => {
                                        // changeColor();
                                        return <tr key={index} className="vaccine-page-table-stats-item">
                                            <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-number">{index + 1}</td>
                                            <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-confirmedpermil"><Link className="vaccine-page-table-stats-item-name-link" to={{ pathname: `/treatment-tracker/${vaccine.trimedCategory}/${vaccine.trimedName}` }} onClick={this.changeOffset} >{vaccine.description !== "undefined" ? vaccine.description : "No Data - More info"}<span className="sign">&#9662;</span></Link> </td>
                                            <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-confirmed">{vaccine.category !== "undefined" ? vaccine.category : "No Data"}</td>
                                            <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-newcases">{vaccine.phase !== "undefined" ? vaccine.phase : "No Data"}</td>
                                            <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-name"><Link className="vaccine-page-table-stats-item-confirmedpermil" to={{ pathname: `/treatment-tracker/${vaccine.trimedCategory}/${vaccine.trimedName}` }} onClick={this.changeOffset} >{vaccine.developerResearcher} <span className="sign">&#9662;</span></Link></td>
                                            <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-critical"><Link className="vaccine-page-table-stats-item-critical" to={{ pathname: `/treatment-tracker/${vaccine.trimedCategory}/${vaccine.trimedName}` }} onClick={this.changeOffset} >{vaccine.nextSteps !== "undefined" ? vaccine.nextSteps : "No Data - More info"}<span className="sign">&#9662;</span></Link> </td>
                                            <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-deceased"><Link className="vaccine-page-table-stats-item-deceased" to={{ pathname: `/treatment-tracker/${vaccine.trimedCategory}/${vaccine.trimedName}` }} onClick={this.changeOffset} >{vaccine.FDAApproved !== "undefined" ? vaccine.FDAApproved : "Not Approved Yet"} <span className="sign">&#9662;</span></Link></td>
                                            <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-active"><Link className="vaccine-page-table-stats-item-active" to={{ pathname: `/treatment-tracker/${vaccine.trimedCategory}/${vaccine.trimedName}` }} onClick={this.changeOffset} >{vaccine.funder !== "undefined" ? vaccine.funder : "No Data - More info"} <span className="sign">&#9662;</span></Link></td>
                                            <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-newdeaths">{vaccine.lastUpdated !== "undefined" ? moment(vaccine.lastUpdated).fromNow() : "No Data"}</td>
                                        </tr>
                                    }

                                    ) :

                                        tableIndex.map((e, i) => {
                                            return (
                                                <tr key={i} className="vaccine-page-table-stats-item vaccine-page-table-stats-loading loading">
                                                    <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-number">{1}</td>
                                                    <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-name">Loading</td>
                                                    <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-confirmed">Loading</td>
                                                    <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-newcases">Loading</td>
                                                    <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-confirmedpermil">Loading</td>
                                                    <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-critical">Loading</td>
                                                    <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-active">Loading</td>
                                                    <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-deceased">Loading</td>
                                                    <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-newdeaths">Loading</td>
                                                    <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-deathspermil">Loading</td>
                                                    <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-giventests">Loading</td>
                                                    <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-testspermil">Loading</td>
                                                    <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-recovered">Loading</td>
                                                    <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-recoveredrate">Loading</td>
                                                    <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-population">Loading</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                            {/* <section className="vaccine-page-table"></section> */}
                        </div>
                    </div>
                ) : (<h6>loading</h6>)
            }
            <Footer />
        </div>

    }
}

TreatmentBase.propTypes = {
    // world: PropTypes.object,
    vaccines: PropTypes.array,
    treatments: PropTypes.array,
    eachVaccine: PropTypes.array,
};


// pass the application state (main data) to our component as props. so we can access it by props
const mapStateToProps = state => ({
    vaccines: state.vaccineObject.vaccines,
    treatments: state.vaccineObject.treatments,
    eachVacItem: state.vaccineObject.eachVacItem,
});

export default connect(
    mapStateToProps,
    {
        getAllTreatments, getAllTreatmentsPreClinical, getAllTreatmentsClinical, getAllTreatmentsFDAApproved, getTreatmentsCategoryBased,
        clearTreatmentData
    })(TreatmentBase);
