import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import moment from 'moment';
import Footer from '../common/footer';

import {
    getAllVaccines, getAllVaccinesPreClinical, getAllVaccinesPhaseOne, getAllVaccinesPhaseTwo, getAllVaccinesPhaseThree, getAllVaccinesPhaseFour, get_FDA_Approved_Vaccines, getVaccinesCategoryBased
} from '../../actions/vaccine';

export class Vaccine extends Component {
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
    }

    async callActionMethods() {
        let { category } = this.props.match.params;
        if (category === "all-vaccines") {
            await this.props.getAllVaccines();
            this.setState({ descriptionText: "RNA Based is a category for making more resistant vaccine.RNA Based is a category for making more resistant vaccine.RNA Based is a category for making more resistant vaccine.RNA Based is a category for making more resistant vaccine.RNA Based is a category for making more resistant vaccine.RNA Based is a category for making more resistant vaccine." })
        } else if (category === "fda-approved") {
            await this.props.get_FDA_Approved_Vaccines();
            this.setState({ descriptionText: "DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine." })
        } else if (category === "phase-four") {
            await this.props.getAllVaccinesPhaseFour();
            this.setState({ descriptionText: "DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine." })
        } else if (category === "phase-three") {
            await this.props.getAllVaccinesPhaseThree();
            this.setState({ descriptionText: "DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine." })
        } else if (category === "phase-two") {
            await this.props.getAllVaccinesPhaseTwo();
            this.setState({ descriptionText: "DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine." })
        } else if (category === "phase-one") {
            await this.props.getAllVaccinesPhaseOne();
            this.setState({ descriptionText: "DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine." })
        } else if (category === "pre-clinical") {
            await this.props.getAllVaccinesPreClinical();
            this.setState({ descriptionText: "DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine." })
        } else if (category === "rna-based") {
            await this.props.getVaccinesCategoryBased("RNA-based vaccine");
            this.setState({ descriptionText: "DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine." })
        } else if (category === "dna-based") {
            await this.props.getVaccinesCategoryBased("DNA-based");
            this.setState({ descriptionText: "DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine." })
        } else if (category === "inactivated-virus") {
            await this.props.getVaccinesCategoryBased("Inactivated virus");
            this.setState({ descriptionText: "DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine." })
        } else if (category === "live-attenuated-virus") {
            await this.props.getVaccinesCategoryBased("Live attenuated virus");
            this.setState({ descriptionText: "DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine." })
        } else if (category === "replicating-viral-vector") {
            await this.props.getVaccinesCategoryBased("Replicating viral vector");
            this.setState({ descriptionText: "DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine." })
        } else if (category === "non-replicating-viral-vector") {
            await this.props.getVaccinesCategoryBased("Non-replicating viral vector");
            this.setState({ descriptionText: "DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine." })
        } else if (category === "protein-subunit") {
            await this.props.getVaccinesCategoryBased("Protein subunit");
            this.setState({ descriptionText: "DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine." })
        } else if (category === "replicating-bacterial-vector") {
            await this.props.getVaccinesCategoryBased("Replicating bacterial vector");
            this.setState({ descriptionText: "DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine." })
        } else if (category === "virus-like-particle") {
            await this.props.getVaccinesCategoryBased("Virus-like particle");
            this.setState({ descriptionText: "DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine.DNA Based is a category for making more resistant vaccine." })
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
        let { category } = this.props.match.params; // url parameteres
        let { vaccines } = this.props;
        let tableIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]



        const orderName = (titleName, orderBase) => {
            if (this.state.order_kind !== titleName) {
                this.setState({ activeTitle: orderBase })
                vaccines = vaccines.sort(this.compareValues(orderBase, 'asc'));
                this.setState({ order: 'asc' })
                this.setState({ order_kind: titleName })
                this.setState({ firstTimeOrdering: false })
            } else if (this.state.order_kind === titleName) {
                this.setState({ activeTitle: orderBase })
                if (this.state.order === 'desc') {
                    vaccines = vaccines.sort(this.compareValues(orderBase, 'asc'));
                    this.setState({ order: 'asc' })
                } else if (this.state.order === 'asc') {
                    vaccines = vaccines.sort(this.compareValues(orderBase, 'desc'));
                    this.setState({ order: 'desc' })
                }
            }
        }

        const orderDate = (titleName, orderBase) => {
            if (this.state.firstTimeOrdering === true) {
                vaccines = vaccines.sort(this.compareValues('lastUpdated', 'asc'));
                this.setState({ order: 'asc' })
                this.setState({ order_kind: 'lastUpdated' })
                this.setState({ firstTimeOrdering: false })
            } else if (this.state.order_kind !== titleName) {
                this.setState({ activeTitle: orderBase })
                vaccines = vaccines.sort(this.compareValues(orderBase, 'desc'));
                this.setState({ order: 'desc' })
                this.setState({ order_kind: titleName })
                this.setState({ firstTimeOrdering: false })
            } else if (this.state.order_kind === titleName) {
                this.setState({ activeTitle: orderBase })
                if (this.state.order === 'desc') {
                    vaccines = vaccines.sort(this.compareValues(orderBase, 'asc'));
                    this.setState({ order: 'asc' })
                } else if (this.state.order === 'asc') {
                    vaccines = vaccines.sort(this.compareValues(orderBase, 'desc'));
                    this.setState({ order: 'desc' })
                }
            }
        }

        return <div>
            <Helmet>
                <title>Vaccine tracker {category} data - vaccovid</title>
                <meta name="description" content={`Vaccine and Covid-19 tracker. Vaccine Tracker ${category} statistical data. Including Phases,Company name,Category,results`} />
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
                                    <h2 className={`vaccine-page-responsive-allregions-title`}>Phases</h2>
                                    <Link to={{ pathname: `/vaccine-tracker` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`vaccine-page-responsive-allregions-btn ${category === "all-vaccines" ? "vaccine-page-responsive-allregions-btn-active" : ""}`}>ALL Vaccines</Link>
                                    <Link to={{ pathname: `/vaccine-tracker/phase-four` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`vaccine-page-responsive-allregions-btn ${category === "phase-four" ? "vaccine-page-responsive-allregions-btn-active" : ""}`} >Phase 4</Link>
                                    <Link to={{ pathname: `/vaccine-tracker/phase-three` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`vaccine-page-responsive-allregions-btn ${category === "phase-three" ? "vaccine-page-responsive-allregions-btn-active" : ""}`} >Phase 3</Link>
                                    <Link to={{ pathname: `/vaccine-tracker/phase-tow` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`vaccine-page-responsive-allregions-btn ${category === "phase-tow" ? "vaccine-page-responsive-allregions-btn-active" : ""}`} >Phase 2</Link>
                                    <Link to={{ pathname: `/vaccine-tracker/phase-one` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`vaccine-page-responsive-allregions-btn ${category === "phase-one" ? "vaccine-page-responsive-allregions-btn-active" : ""}`} >Phase 1</Link>
                                    <Link to={{ pathname: `/vaccine-tracker/pre-clinical` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`vaccine-page-responsive-allregions-btn ${category === "pre-clinical" ? "vaccine-page-responsive-allregions-btn-active" : ""}`} >Pre Clinical</Link>

                                    <h2 className={`vaccine-page-responsive-allregions-title`}>Categories</h2>
                                    <Link to={{ pathname: `/vaccine-tracker/rna-based` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`vaccine-page-responsive-allregions-btn ${category === "rna-based" ? "vaccine-page-responsive-allregions-btn-active" : ""}`} >RNA Based</Link>
                                    <Link to={{ pathname: `/vaccine-tracker/dna-based` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`vaccine-page-responsive-allregions-btn ${category === "dna-based" ? "vaccine-page-responsive-allregions-btn-active" : ""}`} >DNA Based</Link>
                                    <Link to={{ pathname: `/vaccine-tracker/inactivated-virus` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`vaccine-page-responsive-allregions-btn ${category === "inactivated-virus" ? "vaccine-page-responsive-allregions-btn-active" : ""}`} >Inactivated Virus</Link>
                                    <Link to={{ pathname: `/vaccine-tracker/live-attenuated-virus` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`vaccine-page-responsive-allregions-btn ${category === "live-attenuated-virus" ? "vaccine-page-responsive-allregions-btn-active" : ""}`} >Live Attenuated Virus</Link>
                                    <Link to={{ pathname: `/vaccine-tracker/replicating-viral-vector` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`vaccine-page-responsive-allregions-btn ${category === "replicating-viral-vector" ? "vaccine-page-responsive-allregions-btn-active" : ""}`} >Replicating Viral Vector</Link>
                                    <Link to={{ pathname: `/vaccine-tracker/non-replicating-viral-vector` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`vaccine-page-responsive-allregions-btn ${category === "non-replicating-viral-vector" ? "vaccine-page-responsive-allregions-btn-active" : ""}`} >Non-Replicating Viral Vector</Link>
                                    <Link to={{ pathname: `/vaccine-tracker/protein-subunit` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`vaccine-page-responsive-allregions-btn ${category === "protein-subunit" ? "vaccine-page-responsive-allregions-btn-active" : ""}`} >Protein subunit</Link>
                                    <Link to={{ pathname: `/vaccine-tracker/virus-like-particle` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`vaccine-page-responsive-allregions-btn ${category === "virus-like-particle" ? "vaccine-page-responsive-allregions-btn-active" : ""}`} >Virus-Like Particle</Link>
                                    <Link to={{ pathname: `/vaccine-tracker/replicating-bacterial-vector` }} onClick={async () => { this.onClickShowRegions(); this.changeOffset(); }} className={`vaccine-page-responsive-allregions-btn ${category === "replicating-bacterial-vector" ? "vaccine-page-responsive-allregions-btn-active" : ""}`} >Replicating Bacterial Vector</Link>
                                    <p className={`vaccine-page-responsive-allregions-btn`} >...</p>
                                    <p className={`vaccine-page-responsive-allregions-btn`} >---</p>
                                </ul>
                            </div>
                            <ul className="vaccine-page-list" id="region"
                                ref={this.regionRef}
                                onScroll={() => this.onScroll('region')}
                            >
                                <h2 className={`vaccine-page-list-title`}>Categories</h2>
                                <Link to={{ pathname: `/vaccine-tracker` }} onClick={async () => { }} className={`vaccine-page-list-btn ${category === "all-vaccines" ? "vaccine-page-list-btn-active" : ""}`}>ALL Vaccines</Link>
                                <Link to={{ pathname: `/vaccine-tracker/fda-approved` }} onClick={async () => { }} className={`vaccine-page-list-btn ${category === "fda-approved" ? "vaccine-page-list-btn-active" : ""}`}>FDA Apprroved</Link>
                                <Link to={{ pathname: `/vaccine-tracker/rna-based` }} onClick={async () => { }} className={`vaccine-page-list-btn ${category === "rna-based" ? "vaccine-page-list-btn-active" : ""}`}>RNA Based</Link>
                                <Link to={{ pathname: `/vaccine-tracker/dna-based` }} onClick={async () => { }} className={`vaccine-page-list-btn ${category === "dna-based" ? "vaccine-page-list-btn-active" : ""}`}>DNA Based</Link>
                                <Link to={{ pathname: `/vaccine-tracker/inactivated-virus` }} onClick={async () => { }} className={`vaccine-page-list-btn ${category === "inactivated-virus" ? "vaccine-page-list-btn-active" : ""}`}>Inactivated Virus</Link>
                                <Link to={{ pathname: `/vaccine-tracker/live-attenuated-virus` }} onClick={async () => { }} className={`vaccine-page-list-btn ${category === "live-attenuated-virus" ? "vaccine-page-list-btn-active" : ""}`}>Live Attenuated Virus</Link>
                                <Link to={{ pathname: `/vaccine-tracker/replicating-viral-vector` }} onClick={async () => { }} className={`vaccine-page-list-btn ${category === "replicating-viral-vector" ? "vaccine-page-list-btn-active" : ""}`}>Replicating Viral Vector</Link>
                                <Link to={{ pathname: `/vaccine-tracker/non-replicating-viral-vector` }} onClick={async () => { }} className={`vaccine-page-list-btn ${category === "non-replicating-viral-vector" ? "vaccine-page-list-btn-active" : ""}`}>Non-Replicating Viral Vector</Link>
                                <Link to={{ pathname: `/vaccine-tracker/protein-subunit` }} onClick={async () => { }} className={`vaccine-page-list-btn ${category === "protein-subunit" ? "vaccine-page-list-btn-active" : ""}`}>Protein subunit</Link>
                                <Link to={{ pathname: `/vaccine-tracker/replicating-bacterial-vector` }} onClick={async () => { }} className={`vaccine-page-list-btn ${category === "replicating-bacterial-vector" ? "vaccine-page-list-btn-active" : ""}`}>Replicating Bacterial Vector</Link>
                                <Link to={{ pathname: `/vaccine-tracker/virus-like-particle` }} onClick={async () => { }} className={`vaccine-page-list-btn ${category === "virus-like-particle" ? "vaccine-page-list-btn-active" : ""}`}>Virus-Like Particle</Link>
                            </ul>

                            <section className="vaccine-page-categories">
                                <Link to={{ pathname: `/vaccine-tracker` }} onClick={async () => { }} className={`vaccine-page-categories-btn vaccine-page-categories-btn-0 ${category === "all-vaccines" ? "vaccine-page-categories-btn-active" : ""}`}>All Vaccines</Link>
                                <Link to={{ pathname: `/vaccine-tracker/pre-clinical` }} onClick={async () => { }} className={`vaccine-page-categories-btn vaccine-page-categories-btn-4 ${category === "pre-clinical" ? "vaccine-page-categories-btn-active" : ""}`}>Pre Clinical</Link>
                                <Link to={{ pathname: `/vaccine-tracker/phase-one` }} onClick={async () => { }} className={`vaccine-page-categories-btn vaccine-page-categories-btn-3 ${category === "phase-one" ? "vaccine-page-categories-btn-active" : ""}`}>Phase 1</Link>
                                <Link to={{ pathname: `/vaccine-tracker/phase-two` }} onClick={async () => { }} className={`vaccine-page-categories-btn vaccine-page-categories-btn-2 ${category === "phase-two" ? "vaccine-page-categories-btn-active" : ""}`}>Phase 2</Link>
                                <Link to={{ pathname: `/vaccine-tracker/phase-three` }} onClick={async () => { }} className={`vaccine-page-categories-btn vaccine-page-categories-btn-1 ${category === "phase-three" ? "vaccine-page-categories-btn-active" : ""}`}>Phase 3</Link>
                                <Link to={{ pathname: `/vaccine-tracker/phase-four` }} onClick={async () => { }} className={`vaccine-page-categories-btn vaccine-page-categories-btn-5 ${category === "phase-four" ? "vaccine-page-categories-btn-active" : ""}`}>Phase 4</Link>
                                <Link to={{ pathname: `/vaccine-tracker/fda-approved` }} onClick={async () => { }} className={`vaccine-page-categories-btn vaccine-page-categories-btn-9 ${category === "fda-approved" ? "vaccine-page-categories-btn-active" : ""}`}>FDA Approved</Link>
                                <Link to={{ pathname: `/vaccine-tracker/rna-based-vaccine/biontech-pfizer-fosun-pharma-rentschler-biopharma` }} onClick={async () => { }} className={`vaccine-page-categories-btn vaccine-page-categories-btn-6 ${category === "pfizer" ? "vaccine-page-categories-btn-active" : ""}`}>Pfizer</Link>
                                <Link to={{ pathname: `/vaccine-tracker/rna-based-vaccine/moderna-niaid-lonza-catalent-rovi-medidata-bioqual` }} onClick={async () => { }} className={`vaccine-page-categories-btn vaccine-page-categories-btn-7 ${category === "moderna" ? "vaccine-page-categories-btn-active" : ""}`}>Moderna</Link>
                                <Link to={{ pathname: `/vaccine-tracker/non-replicating-viral-vector/university-of-oxford-oxford-biomedica,-vaccines-manufacturing-and-innovation-centre,-pall-life-sciences,-cobra-biologics,-halixbv,-advent-s.r.l.,-merck-kgaa,-the-serum-institute,-vaccitech,-catalent,-csl,-and-astrazenecaiqvia` }} onClick={async () => { }} className={`vaccine-page-categories-btn vaccine-page-categories-btn-8 ${category === "oxford" ? "vaccine-page-categories-btn-active" : ""}`}>Oxford</Link>
                                <Link to={{ pathname: `/vaccine-tracker/inactivated-virus/sinovac-instituto-butantan-bio-farma` }} onClick={async () => { }} className={`vaccine-page-categories-btn vaccine-page-categories-btn-10 ${category === "sinovac" ? "vaccine-page-categories-btn-active" : ""}`}>Sputnik V</Link>
                                <Link to={{ pathname: `/vaccine-tracker/non-replicating-viral-vector/cansino-biologics-beijing-institute-of-biotechnology-petrovax` }} onClick={async () => { }} className={`vaccine-page-categories-btn vaccine-page-categories-btn-11 ${category === "canSino-biologics" ? "vaccine-page-categories-btn-active" : ""}`}>CanSino Biologics</Link>
                                <Link to={{ pathname: `/vaccine-tracker/inactivated-virus/sinovac-instituto-butantan-bio-farma` }} onClick={async () => { }} className={`vaccine-page-categories-btn vaccine-page-categories-btn-12 ${category === "sinovac" ? "vaccine-page-categories-btn-active" : ""}`}>Sinovac</Link>
                                <Link to={{ pathname: `/vaccine-tracker/protein-subunit/novavaxemergent-biosolutions-praha-vaccines-biofabri-fujifilm-diosynth-biotechnologies-fdb-serum-institute-of-india-sk-bioscience-takeda-pharmaceutical-company-limited-agc-biologics-polypeptide-group-endo` }} onClick={async () => { }} className={`vaccine-page-categories-btn vaccine-page-categories-btn-13 ${category === "novavax" ? "vaccine-page-categories-btn-active" : ""}`}>Novavax</Link>
                                <Link to={{ pathname: `/vaccine-tracker/inactivated-virus/wuhan-institute-of-biological-products-sinopharm` }} onClick={async () => { }} className={`vaccine-page-categories-btn vaccine-page-categories-btn-14 ${category === "wuhan" ? "vaccine-page-categories-btn-active" : ""}`}>Wuhan</Link>
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
                                    <caption className="vaccine-page-table-title-stats-caption"><h1 className="vaccine-page-table-title-stats-caption-h1">{category === "all-vaccines" ? "All Vaccines" : category.toUpperCase() + " Vaccines"} </h1></caption>
                                    <thead className="vaccine-page-table-title-stats-thead">
                                        <tr className="vaccine-page-table-title-stats-columns" id="columns"
                                            ref={this.titleRef}
                                            // onScroll={this.onScroll('columns')}
                                            onScroll={() => this.onScroll('columns')}
                                        >
                                            <th className={`vaccine-page-table-title-stats-columns-item vaccine-page-table-title-stats-columns-number`}>NUM</th>
                                            <th className={`vaccine-page-table-title-stats-columns-item vaccine-page-table-title-stats-columns-name ${this.state.activeTitle === 'developerResearcher' ? "vaccine-page-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderName('developerResearcher', 'developerResearcher') }}>Company <span className="sign">&#9662;</span></th>
                                            <th className={`vaccine-page-table-title-stats-columns-item vaccine-page-table-title-stats-columns-confirmed ${this.state.activeTitle === 'category' ? "vaccine-page-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderName('category', 'category') }}>Category <span className="sign">&#9662;</span></th>
                                            <th className={`vaccine-page-table-title-stats-columns-item vaccine-page-table-title-stats-columns-newcases ${this.state.activeTitle === 'phase' ? "vaccine-page-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderName('phase', 'phase') }}>Phase <span className="sign">&#9662;</span></th>
                                            <th className={`vaccine-page-table-title-stats-columns-item vaccine-page-table-title-stats-columns-newcases ${this.state.activeTitle === 'description' ? "vaccine-page-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderName('description', 'description') }}>Description <span className="sign">&#9662;</span></th>
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
                                    {vaccines.length > 0 ? vaccines.map((vaccine, index) => {
                                        // changeColor();
                                        return <tr key={index} className="vaccine-page-table-stats-item">
                                            <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-number">{index + 1}</td>
                                            <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-name"><Link className="vaccine-page-table-stats-item-name-link" to={{
                                                pathname: `/vaccine-tracker/${vaccine.trimedCategory}/${vaccine.trimedName}`
                                            }} onClick={this.changeOffset} >{vaccine.developerResearcher} <span className="sign">&#9662;</span></Link></td>
                                            <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-confirmed">{vaccine.category !== "undefined" ? vaccine.category : "No Data"}</td>
                                            <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-newcases">{vaccine.phase !== "undefined" ? vaccine.phase : "No Data"}</td>
                                            <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-confirmedpermil"><Link className="vaccine-page-table-stats-item-confirmedpermil" to={{ pathname: `/vaccine-tracker/${vaccine.trimedCategory}/${vaccine.trimedName}` }} onClick={this.changeOffset} >{vaccine.description !== "undefined" ? vaccine.description : "No Data - More info"}<span className="sign">&#9662;</span></Link> </td>
                                            <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-critical"><Link className="vaccine-page-table-stats-item-critical" to={{ pathname: `/vaccine-tracker/${vaccine.trimedCategory}/${vaccine.trimedName}` }} onClick={this.changeOffset} >{vaccine.nextSteps !== "undefined" ? vaccine.nextSteps : "No Data - More info"}<span className="sign">&#9662;</span></Link> </td>
                                            <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-deceased"><Link className="vaccine-page-table-stats-item-deceased" to={{ pathname: `/vaccine-tracker/${vaccine.trimedCategory}/${vaccine.trimedName}` }} onClick={this.changeOffset} >{vaccine.FDAApproved !== "undefined" ? vaccine.FDAApproved : "Not Approved Yet"} <span className="sign">&#9662;</span></Link></td>
                                            <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-active"><Link className="vaccine-page-table-stats-item-active" to={{ pathname: `/vaccine-tracker/${vaccine.trimedCategory}/${vaccine.trimedName}` }} onClick={this.changeOffset} >{vaccine.funder !== "undefined" ? vaccine.funder : "No Data - More info"} <span className="sign">&#9662;</span></Link></td>
                                            <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-newdeaths">{vaccine.lastUpdated !== "undefined" ? moment(vaccine.lastUpdated).fromNow() : "No Data"}</td>
                                        </tr>
                                    }

                                    ) :

                                        tableIndex.map((e, i) => {
                                            return (
                                                <tr key={i} className="vaccine-page-table-stats-item vaccine-page-table-stats-loading loading">
                                                    <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-number">{1}</td>
                                                    <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-name">No Data Yet<span className="sign">&#9662;</span></td>
                                                    <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-confirmed">No Data Yet</td>
                                                    <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-newcases">No Data Yet</td>
                                                    <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-confirmedpermil">No Data Yet</td>
                                                    <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-critical">No Data Yet</td>
                                                    <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-active">No Data Yet</td>
                                                    <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-deceased">No Data Yet</td>
                                                    <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-newdeaths">No Data Yet</td>
                                                    <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-deathspermil">No Data Yet</td>
                                                    <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-giventests">No Data Yet</td>
                                                    <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-testspermil">No Data Yet</td>
                                                    <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-recovered">No Data Yet</td>
                                                    <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-recoveredrate">No Data Yet</td>
                                                    <td className="vaccine-page-table-stats-item-each vaccine-page-table-stats-item-population">No Data Yet</td>
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

Vaccine.propTypes = {
    // world: PropTypes.object,
    vaccines: PropTypes.array,
    treatments: PropTypes.array,
    eachVaccine: PropTypes.array,

    getAllCountriesData: PropTypes.func.isRequired,
    getWorldData: PropTypes.func.isRequired,
    getAllCountriesDataNameOrdered: PropTypes.func.isRequired,
    getAsiaCountriesData: PropTypes.func.isRequired,
    getAfricaCountriesData: PropTypes.func.isRequired,
    getEuropeCountriesData: PropTypes.func.isRequired,
    getNorthAmericaCountriesData: PropTypes.func.isRequired,
    getSouthAmericaCountriesData: PropTypes.func.isRequired,
    getAustraliaOceaniaCountriesData: PropTypes.func.isRequired,

    getCountryISOBased: PropTypes.func.isRequired,
    getProvinceReportISOBased: PropTypes.func.isRequired,

    clearWorldData: PropTypes.func.isRequired,
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
        getAllVaccines, getAllVaccinesPreClinical, getAllVaccinesPhaseOne, getAllVaccinesPhaseTwo, getAllVaccinesPhaseThree, getAllVaccinesPhaseFour, get_FDA_Approved_Vaccines, getVaccinesCategoryBased
    })(Vaccine);
