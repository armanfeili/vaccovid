import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAllCountriesData, getWorldData, getAllCountriesDataNameOrdered } from '../../actions/covid_countries';
// import * as Scroll from 'react-scroll';
// import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

export class CoronavirusWorldComponent extends Component {
    constructor() {
        super();
        // State is similar to props, but it is private and fully controlled by the component.
        this.titleRef = React.createRef()
        this.tableRef = React.createRef()
        this.regionRef = React.createRef()

        this.state = {
            value: '',
            active_btn: "world",
            order: "",
            order_kind: "",
            color: "",
            firstTimeOrdering: true,
            page: 0,
            orderNameForTitles: '',
            activeTitle: 'TotalCase',
            showRegions: "off"
            // scrolling: 0,
            // scrollTitle: 0,
            // scrollTable: 0
        };

        this.onClickGetCovidWorldData = this.onClickGetCovidWorldData.bind(this);
        this.onClickShowRegions = this.onClickShowRegions.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.compareValues = this.compareValues.bind(this);
        this.numberWithCommas = this.numberWithCommas.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.search = this.search.bind(this);
    }

    async componentDidMount() {
        this.onClickGetCovidWorldData();
    }



    async onClickGetCovidWorldData() {
        this.setState({ active_btn: "world" });
        await this.props.getAllCountriesData();
        await this.props.getAllCountriesDataNameOrdered();
        await this.props.getWorldData();
        // const allNews = this.props.news.news;
        // console.log(this.state.news); // it still returens old data (previous state)
    };
    async onClickGetCovidAsiaData() {
        this.setState({ active_btn: "asia" });
        // await this.props.getVaccineNews(0);
        // const allNews = this.props.news.news;
        // console.log(this.state.news); // it still returens old data (previous state)
    };
    async onClickGetCovidAfricaData() {
        this.setState({ active_btn: "africa" });
        // await this.props.getVaccineNews(0);
        // const allNews = this.props.news.news;
        // console.log(this.state.news); // it still returens old data (previous state)
    };

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

            const varA = (typeof a[key] === 'string')
                ? a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string')
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

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    onScroll = (element) => {
        // http://jsfiddle.net/gwcoffey/9EfUy/
        // https://andrewnoske.com/wiki/JavaScript_-_Synchronize_Two_Scroll_Areas
        // https://codepen.io/JohnReynolds57/pen/NLNOyO?editors=0011
        // https://www.w3schools.com/jsref/prop_element_scrolltop.asp

        if (this.regionRef.current !== null && this.titleRef.current !== null && this.tableRef.current !== null) {
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

            // this.setState({
            //     scrollTitle: scrollTitle,
            //     scrollTable: scrollTable
            // })
        }
    }

    search() {
        // Declare variables
        let input = document.getElementById("input");
        let filter = input !== null ? input.value.toUpperCase() : '';
        let table = document.getElementById("coronavirusTable");
        let selectedTR = []
        let td = []
        let txtValue;
        // console.log(table);

        let tr = table !== null ? table.getElementsByTagName("tr") : '';
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

        // const links = this.props.news.news;
        // const linksLoop = [];
        let { countries } = this.props;
        let { countriesNameOrdered } = this.props;
        let { world } = this.props;
        // const countriesOrdered = countries.sort(this.compareValues('Country', 'asc'));

        const trimString = (str) => {
            // str = str.replace(' ', /-/g);
            // return str;
            str = str.replace(/\s+/g, '-');
            return str;
        }

        const orderConfirmed = () => {
            if (this.state.firstTimeOrdering === true) {
                countries = countries.sort(this.compareValues('TotalCases', 'asc'));
                this.setState({ order: 'asc' })
                this.setState({ order_kind: 'confirmed' })
                this.setState({ firstTimeOrdering: false })
            } else if (this.state.order_kind !== 'confirmed') {
                countries = countries.sort(this.compareValues('TotalCases', 'desc'));
                this.setState({ activeTitle: 'TotalCase' })
                this.setState({ order: 'desc' })
                this.setState({ order_kind: 'confirmed' })
            } else if (this.state.order_kind === 'confirmed') {
                this.setState({ activeTitle: 'TotalCase' })
                if (this.state.order === 'desc') {
                    countries = countries.sort(this.compareValues('TotalCases', 'asc'));
                    this.setState({ order: 'asc' })
                } else if (this.state.order === 'asc') {
                    countries = countries.sort(this.compareValues('TotalCases', 'desc'));
                    this.setState({ order: 'desc' })
                }
            }
        }

        const orderName = () => {
            if (this.state.order_kind !== 'name') {
                countries = countries.sort(this.compareValues('Country', 'asc'));
                this.setState({ activeTitle: 'Country' })
                this.setState({ order: 'asc' })
                this.setState({ order_kind: 'name' })
                this.setState({ firstTimeOrdering: false })
            } else if (this.state.order_kind === 'name') {
                this.setState({ activeTitle: 'Country' })
                if (this.state.order === 'desc') {
                    countries = countries.sort(this.compareValues('Country', 'asc'));
                    this.setState({ order: 'asc' })
                } else if (this.state.order === 'asc') {
                    countries = countries.sort(this.compareValues('Country', 'desc'));
                    this.setState({ order: 'desc' })
                }
            }
        }

        const orderStats = (titleName, orderBase) => {
            if (this.state.order_kind !== titleName) {
                this.setState({ activeTitle: orderBase })
                countries = countries.sort(this.compareValues(orderBase, 'desc'));
                this.setState({ order: 'desc' })
                this.setState({ order_kind: titleName })
                this.setState({ firstTimeOrdering: false })
            } else if (this.state.order_kind === titleName) {
                this.setState({ activeTitle: orderBase })
                if (this.state.order === 'desc') {
                    countries = countries.sort(this.compareValues(orderBase, 'asc'));
                    this.setState({ order: 'asc' })
                } else if (this.state.order === 'asc') {
                    countries = countries.sort(this.compareValues(orderBase, 'desc'));
                    this.setState({ order: 'desc' })
                }
            }
        }

        return (
            <div className="coronavirus">

                <div className="coronavirus-btnAndTitle">
                    <button className="coronavirus-btnAndTitle-btn" onClick={this.onClickShowRegions}>Choose Your Region &#9662;</button>
                    {/* <h1 className="coronavirus-regions-name">SOUTH AMERICA</h1> */}
                    <h1 className="coronavirus-btnAndTitle-title">{this.state.active_btn.toUpperCase()}</h1>
                </div>

                <div className={`coronavirus-responsive ${this.state.showRegions === "off" ? "take_underground" : ""}`}>
                    <button className="coronavirus-responsive-close_btn" onClick={this.onClickShowRegions}></button>
                    <ul className={`coronavirus-responsive-allregions`} id="region">
                        <h2 className={`coronavirus-responsive-allregions-title`}>Continents</h2>
                        <Link to="/covid-19/world-data" className={`coronavirus-responsive-allregions-btn ${this.state.active_btn === "world" ? "coronavirus-responsive-allregions-btn-active" : ""}`}>World</Link>
                        <Link to="/covid-19/asia-data" className={`coronavirus-responsive-allregions-btn ${this.state.active_btn === "asia" ? "coronavirus-responsive-allregions-btn-active" : ""}`} >Asia</Link>
                        <Link to="/covid-19/africa-data" className={`coronavirus-responsive-allregions-btn ${this.state.active_btn === "africa" ? "coronavirus-responsive-allregions-btn-active" : ""}`}>Africa</Link>
                        <Link to="/covid-19/australia-data" className={`coronavirus-responsive-allregions-btn ${this.state.active_btn === "australia" ? "coronavirus-responsive-allregions-btn-active" : ""}`}>Australia</Link>
                        <Link to="/covid-19/europe-data" className={`coronavirus-responsive-allregions-btn ${this.state.active_btn === "europe" ? "coronavirus-responsive-allregions-btn-active" : ""}`}>Europe</Link>
                        <Link to="/covid-19/north-america-data" className={`coronavirus-responsive-allregions-btn ${this.state.active_btn === "north_america" ? "coronavirus-responsive-allregions-btn-active" : ""}`}>North America</Link>
                        <Link to="/covid-19/south-america-data" className={`coronavirus-responsive-allregions-btn ${this.state.active_btn === "south_america" ? "coronavirus-responsive-allregions-btn-active" : ""}`}>South America</Link>
                        <Link to="/covid-19/oceania-data" className={`coronavirus-responsive-allregions-btn ${this.state.active_btn === "oceania" ? "coronavirus-responsive-allregions-btn-active" : ""}`}>Oceania</Link>
                        <h2 className={`coronavirus-responsive-allregions-title`}>Countries</h2>
                        {countriesNameOrdered.length > 0 ? countriesNameOrdered.map((country, index) => {
                            // changeColor();
                            return <Link to={{
                                pathname: `/covid-19/${trimString(country.Country)}/${country.ThreeLetterSymbol.toUpperCase()}`, state: { iso: country.ThreeLetterSymbol }
                            }} key={country.id} className={`coronavirus-responsive-allregions-btn`}>{country.Country}</Link>
                        }) : (
                                <div>
                                    {/* <div className={`coronavirus-responsive-allregions-btn coronavirus-responsive-allregions-btn-loading`}></div> */}
                                    <div className={`coronavirus-responsive-allregions-btn`}>Loading</div>
                                    {/* <div className={`coronavirus-responsive-allregions-btn coronavirus-responsive-allregions-btn-loading loading`}></div>
                                    <div className={`coronavirus-responsive-allregions-btn coronavirus-responsive-allregions-btn-loading loading`}></div>
                                    <div className={`coronavirus-responsive-allregions-btn coronavirus-responsive-allregions-btn-loading loading`}></div>
                                    <div className={`coronavirus-responsive-allregions-btn coronavirus-responsive-allregions-btn-loading loading`}></div>
                                    <div className={`coronavirus-responsive-allregions-btn coronavirus-responsive-allregions-btn-loading loading`}></div>
                                    <div className={`coronavirus-responsive-allregions-btn coronavirus-responsive-allregions-btn-loading loading`}></div>
                                    <div className={`coronavirus-responsive-allregions-btn coronavirus-responsive-allregions-btn-loading loading`}></div>
                                    <div className={`coronavirus-responsive-allregions-btn coronavirus-responsive-allregions-btn-loading loading`}></div>
                                    <div className={`coronavirus-responsive-allregions-btn coronavirus-responsive-allregions-btn-loading loading`}></div> */}
                                </div>
                            )
                        }
                    </ul>
                </div>

                <ul className="coronavirus-regions" id="region"
                    ref={this.regionRef}
                    // onScroll={this.onScroll('region')}
                    // ref={this.myRef}
                    onScroll={() => this.onScroll('region')}

                >
                    <h2 className={`coronavirus-regions-title`}>Continents</h2>
                    <Link to="/covid-19/world-data" className={`coronavirus-regions-btn ${this.state.active_btn === "world" ? "coronavirus-regions-btn-active" : ""}`} onClick={this.onClickGetCovidWorldData}>World</Link>
                    <Link to="/covid-19/asia-data" className={`coronavirus-regions-btn ${this.state.active_btn === "asia" ? "coronavirus-regions-btn-active" : ""}`} >Asia</Link>
                    <Link to="/covid-19/africa-data" className={`coronavirus-regions-btn ${this.state.active_btn === "africa" ? "coronavirus-regions-btn-active" : ""}`}>Africa</Link>
                    <Link to="/covid-19/australia-data" className={`coronavirus-regions-btn ${this.state.active_btn === "australia" ? "coronavirus-regions-btn-active" : ""}`}>Australia</Link>
                    <Link to="/covid-19/europe-data" className={`coronavirus-regions-btn ${this.state.active_btn === "europe" ? "coronavirus-regions-btn-active" : ""}`}>Europe</Link>
                    <Link to="/covid-19/north-america-data" className={`coronavirus-regions-btn ${this.state.active_btn === "north_america" ? "coronavirus-regions-btn-active" : ""}`}>North America</Link>
                    <Link to="/covid-19/south-america-data" className={`coronavirus-regions-btn ${this.state.active_btn === "south_america" ? "coronavirus-regions-btn-active" : ""}`}>South America</Link>
                    <Link to="/covid-19/oceania-data" className={`coronavirus-regions-btn ${this.state.active_btn === "oceania" ? "coronavirus-regions-btn-active" : ""}`}>Oceania</Link>
                    <h2 className={`coronavirus-regions-title`}>Countries</h2>
                    {countriesNameOrdered.length > 0 ? countriesNameOrdered.map((country, index) => {
                        // changeColor();
                        return <Link to={{
                            pathname: `/covid-19/${trimString(country.Country)}/${country.ThreeLetterSymbol.toUpperCase()}`, state: { iso: country.ThreeLetterSymbol }
                        }} key={country.id} className={`coronavirus-regions-btn`}>{country.Country}</Link>
                    }) : (
                            <div>
                                {/* <div className={`coronavirus-regions-btn coronavirus-regions-btn-loading`}></div> */}
                                <div className={`coronavirus-regions-btn coronavirus-regions-btn-loading loading`}></div>
                                <div className={`coronavirus-regions-btn coronavirus-regions-btn-loading loading`}></div>
                                <div className={`coronavirus-regions-btn coronavirus-regions-btn-loading loading`}></div>
                                <div className={`coronavirus-regions-btn coronavirus-regions-btn-loading loading`}></div>
                                <div className={`coronavirus-regions-btn coronavirus-regions-btn-loading loading`}></div>
                                <div className={`coronavirus-regions-btn coronavirus-regions-btn-loading loading`}></div>
                                <div className={`coronavirus-regions-btn coronavirus-regions-btn-loading loading`}></div>
                                <div className={`coronavirus-regions-btn coronavirus-regions-btn-loading loading`}></div>
                                <div className={`coronavirus-regions-btn coronavirus-regions-btn-loading loading`}></div>
                                <div className={`coronavirus-regions-btn coronavirus-regions-btn-loading loading`}></div>
                            </div>
                        )
                    }
                </ul>

                <div className="coronavirus-quick-facts">
                    {world.length > 0 ? world.map((world, index) => {
                        return <ul className="coronavirus-quick-facts-world">
                            <li className="coronavirus-quick-facts-world-item coronavirus-quick-facts-world-item-TotalCases" key={world.TotalCases}><h2 className="coronavirus-quick-facts-world-item-TotalCases-text">TOTAL CASES</h2><span className="coronavirus-quick-facts-world-item-TotalCases-number">{this.numberWithCommas(world.TotalCases)}</span></li>
                            <li className="coronavirus-quick-facts-world-item coronavirus-quick-facts-world-item-ActiveCases" key={world.ActiveCases}><h2 className="coronavirus-quick-facts-world-item-ActiveCases-text">ACTIVE CASES</h2><span className="coronavirus-quick-facts-world-item-ActiveCases-number">{this.numberWithCommas(world.ActiveCases)}</span></li>
                            <li className="coronavirus-quick-facts-world-item coronavirus-quick-facts-world-item-TotalDeaths" key={world.TotalDeaths}><h2 className="coronavirus-quick-facts-world-item-TotalDeaths-text">TOTAL DEATHS</h2><span className="coronavirus-quick-facts-world-item-TotalDeaths-number">{this.numberWithCommas(world.TotalDeaths)}</span></li>
                            <li className="coronavirus-quick-facts-world-item coronavirus-quick-facts-world-item-NewCases" key={world.NewCases}><h2 className="coronavirus-quick-facts-world-item-NewCases-text">NEW CASES</h2><span className="coronavirus-quick-facts-world-item-NewCases-number">{this.numberWithCommas(world.NewCases)}</span></li>
                            <li className="coronavirus-quick-facts-world-item coronavirus-quick-facts-world-item-Serious_Critical" key={world.Serious_Critical}><h2 className="coronavirus-quick-facts-world-item-Serious_Critical-text">CRITICAL</h2><span className="coronavirus-quick-facts-world-item-Serious_Critical-number">{this.numberWithCommas(world.Serious_Critical)}</span></li>
                            <li className="coronavirus-quick-facts-world-item coronavirus-quick-facts-world-item-NewDeaths" key={world.NewDeaths}><h2 className="coronavirus-quick-facts-world-item-NewDeaths-text">NEW DEATHS</h2><span className="coronavirus-quick-facts-world-item-NewDeaths-number">{this.numberWithCommas(world.NewDeaths)}</span></li>
                            {/* <li className="coronavirus-quick-facts-world-item coronavirus-quick-facts-world-item-Case_Fatality_Rate" key={world.Case_Fatality_Rate}><h2 className="coronavirus-quick-facts-world-item-Case_Fatality_Rate-text">CASE FATALITY RATE (CFR)</h2><span className="coronavirus-quick-facts-world-item-Case_Fatality_Rate-number">{this.numberWithCommas(world.Case_Fatality_Rate)}</span></li>
                            <li className="coronavirus-quick-facts-world-item coronavirus-quick-facts-world-item-Recovery_Proporation" key={world.Recovery_Proporation}><h2 className="coronavirus-quick-facts-world-item-Recovery_Proporation-text">RECOVERY PROPORATION</h2><span className="coronavirus-quick-facts-world-item-Recovery_Proporation-number">{this.numberWithCommas(world.Recovery_Proporation)}</span></li> */}
                        </ul>
                    }) : (
                            <ul className="coronavirus-quick-facts-world">
                                <li className="coronavirus-quick-facts-world-item coronavirus-quick-facts-world-item-loading loading" key={1}></li>
                                <li className="coronavirus-quick-facts-world-item coronavirus-quick-facts-world-item-loading loading" key={2}></li>
                                <li className="coronavirus-quick-facts-world-item coronavirus-quick-facts-world-item-loading loading" key={3}></li>
                                <li className="coronavirus-quick-facts-world-item coronavirus-quick-facts-world-item-loading loading" key={4}></li>
                                <li className="coronavirus-quick-facts-world-item coronavirus-quick-facts-world-item-loading loading" key={5}></li>
                                <li className="coronavirus-quick-facts-world-item coronavirus-quick-facts-world-item-loading loading" key={6}></li>
                            </ul>
                        )
                    }
                </div>

                <div className="coronavirus-table-title">
                    <input className="coronavirus-table-title-searchbar" type="text" id="input" placeholder="Your Country" onKeyUp={this.search()} value={this.state.value} onChange={this.handleChange} />
                    <table className="coronavirus-table-title-stats" id="t01">
                        <caption className="coronavirus-table-title-stats-caption">South America Data</caption>
                        {/* <caption className="coronavirus-table-title-stats-caption">World Data</caption> */}
                        <thead className="coronavirus-table-title-stats-thead">
                            <tr className="coronavirus-table-title-stats-columns" id="columns"
                                ref={this.titleRef}
                                // onScroll={this.onScroll('columns')}
                                onScroll={() => this.onScroll('columns')}
                            >
                                <th className={`coronavirus-table-title-stats-columns-item coronavirus-table-title-stats-columns-number`}>NUM</th>
                                <th className={`coronavirus-table-title-stats-columns-item coronavirus-table-title-stats-columns-name ${this.state.activeTitle === 'Country' ? "coronavirus-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderName() }}>COUNTRY</th>
                                <th className={`coronavirus-table-title-stats-columns-item coronavirus-table-title-stats-columns-confirmed ${this.state.activeTitle === 'TotalCase' ? "coronavirus-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderConfirmed() }}>TOTAL CASES</th>
                                {/* <th className="coronavirus-table-title-stats-columns-item coronavirus-table-title-stats-columns-confirmed"><button onClick={() => countries.sort(this.compareValues('TotalCases', 'desc'))}>CONFIRMED</button></th> */}
                                <th className={`coronavirus-table-title-stats-columns-item coronavirus-table-title-stats-columns-newcases ${this.state.activeTitle === 'NewCases' ? "coronavirus-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderStats('newcases', 'NewCases') }}>NEW CASES</th>
                                <th className={`coronavirus-table-title-stats-columns-item coronavirus-table-title-stats-columns-confirmedpermil ${this.state.activeTitle === 'Infection_Risk' ? "coronavirus-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderStats('confirmedpermil', 'Infection_Risk') }}>INFECTION RISK</th>
                                <th className={`coronavirus-table-title-stats-columns-item coronavirus-table-title-stats-columns-critical ${this.state.activeTitle === 'Serious_Critical' ? "coronavirus-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderStats('critical', 'Serious_Critical') }}>SERIOUS, CRITICAL</th>
                                <th className={`coronavirus-table-title-stats-columns-item coronavirus-table-title-stats-columns-active ${this.state.activeTitle === 'ActiveCases' ? "coronavirus-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderStats('active', 'ActiveCases') }}>ACTIVE CASES</th>
                                <th className={`coronavirus-table-title-stats-columns-item coronavirus-table-title-stats-columns-deceased ${this.state.activeTitle === 'TotalDeaths' ? "coronavirus-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderStats('deceased', 'TotalDeaths') }}>TOTAL DEATHS</th>
                                <th className={`coronavirus-table-title-stats-columns-item coronavirus-table-title-stats-columns-newdeaths ${this.state.activeTitle === 'NewDeaths' ? "coronavirus-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderStats('newdeaths', 'NewDeaths') }}>NEW DEATHS</th>
                                <th className={`coronavirus-table-title-stats-columns-item coronavirus-table-title-stats-columns-deathspermil ${this.state.activeTitle === 'Case_Fatality_Rate' ? "coronavirus-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderStats('deathspermil', 'Case_Fatality_Rate') }}>CASE FATALITY RATE (CFR)</th>
                                <th className={`coronavirus-table-title-stats-columns-item coronavirus-table-title-stats-columns-giventests ${this.state.activeTitle === 'TotalTests' ? "coronavirus-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderStats('giventests', 'TotalTests') }}>TOTAL TESTS</th>
                                <th className={`coronavirus-table-title-stats-columns-item coronavirus-table-title-stats-columns-testspermil ${this.state.activeTitle === 'Test_Percentage' ? "coronavirus-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderStats('testspermil', 'Test_Percentage') }}>TEST PERCENTAGE</th>
                                <th className={`coronavirus-table-title-stats-columns-item coronavirus-table-title-stats-columns-recovered ${this.state.activeTitle === 'TotalRecovered' ? "coronavirus-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderStats('recovered', 'TotalRecovered') }}>TOTAL RECOVERED</th>
                                <th className={`coronavirus-table-title-stats-columns-item coronavirus-table-title-stats-columns-recoveredrate ${this.state.activeTitle === 'Recovery_Proporation' ? "coronavirus-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderStats('recoveredrate', 'Recovery_Proporation') }}>RECOVERY PERCENTAGE</th>
                                <th className={`coronavirus-table-title-stats-columns-item coronavirus-table-title-stats-columns-population ${this.state.activeTitle === 'Population' ? "coronavirus-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderStats('population', 'Population') }}>POPULATION</th>
                            </tr>
                        </thead>
                    </table>
                </div>

                <table className="coronavirus-table-stats" id="coronavirusTable"
                    ref={this.tableRef}
                    // onscroll={this.onScroll('coronavirusTable')}
                    onScroll={() => this.onScroll('coronavirusTable')}
                >
                    <tbody>

                        {countries.length > 0 ? countries.map((country, index) => {
                            // changeColor();
                            return <tr key={country.id} className="coronavirus-table-stats-item">
                                {/* <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-name"><Link to="eachCountry" params={{ iso: country.ThreeLetterSymbol.toUpperCase() }}>{country.Country}</Link></td> */}
                                <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-number">{index + 1}</td>
                                <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-name"><Link className="coronavirus-table-stats-item-name-link" to={{ pathname: `/covid-19/${country.Country}/${country.ThreeLetterSymbol.toUpperCase()}` }}>{country.Country}</Link></td>
                                {/* <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-name"><Link to='/covid-19/${country.ThreeLetterSymbol.toUpperCase()}' >{country.Country}</Link></td> */}
                                <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-confirmed">{country.TotalCases !== null ? this.numberWithCommas(country.TotalCases) : "No Data"}</td>
                                <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-newcases">{country.NewCases !== null ? this.numberWithCommas(country.NewCases) : "No Data"}</td>
                                <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-confirmedpermil">{country.Infection_Risk !== null ? country.Infection_Risk + "%" : "No Data"}</td>
                                <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-critical">{country.Serious_Critical !== null ? this.numberWithCommas(country.Serious_Critical) : "No Data"}</td>
                                <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-active">{country.ActiveCases !== null ? this.numberWithCommas(country.ActiveCases) : "No Data"}</td>
                                <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-deceased">{country.TotalDeaths !== null ? this.numberWithCommas(country.TotalDeaths) : "No Data"}</td>
                                <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-newdeaths">{country.NewDeaths !== null ? this.numberWithCommas(country.NewDeaths) : "No Data"}</td>
                                <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-deathspermil">{country.Case_Fatality_Rate !== null ? country.Case_Fatality_Rate + "%" : "No Data"}</td>
                                <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-giventests">{country.TotalTests !== null ? this.numberWithCommas(country.TotalTests) : "No Data"}</td>
                                <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-testspermil">{country.Test_Percentage !== null ? country.Test_Percentage + "%" : "No Data"}</td>
                                <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-recovered">{country.TotalRecovered !== null ? this.numberWithCommas(country.TotalRecovered) : "No Data"}</td>
                                <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-recoveredrate">{country.Recovery_Proporation !== null ? country.Recovery_Proporation + "%" : "No Data"}</td>
                                <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-population">{country.Population !== null ? this.numberWithCommas(country.Population) : "No Data"}</td>
                            </tr>
                        }

                        ) : (
                                <tr>
                                    <div className="coronavirus-table-stats-loading loading"></div>

                                </tr>
                            )

                        }
                    </tbody>
                </table>

                <div className="coronavirus-guide">
                    <ul className="coronavirus-guide-list">
                        <li className="coronavirus-guide-list-item">
                            <h3 className="coronavirus-guide-list-item-title coronavirus-guide-list-item-INFECTION_RISK">INFECTION RISK:
                            <span className="coronavirus-guide-list-item-text"> Total Number of covid-19 cases divided by Total Population since the beginning of outbreak</span>
                            </h3>
                        </li>
                        <li className="coronavirus-guide-list-item">
                            <h3 className="coronavirus-guide-list-item-title coronavirus-guide-list-item-TEST_PERCENTAGE">TEST PERCENTAGE:
                            <span className="coronavirus-guide-list-item-text"> Total number of tests divided by total population</span>
                            </h3>
                        </li>
                        <li className="coronavirus-guide-list-item">
                            <h3 className="coronavirus-guide-list-item-title coronavirus-guide-list-item-CASE_FATALITY_RATE">CASE FATALITY RATE (CFR):
                            <span className="coronavirus-guide-list-item-text"> Total Number of Deaths due to Covid-19 divided by Total Number of confirmed cases since the beginning of outbreak (It shows that how lethal covid-19 is in any country)</span>
                            </h3>
                        </li>
                        <li className="coronavirus-guide-list-item">
                            <h3 className="coronavirus-guide-list-item-title coronavirus-guide-list-item-RECOVERY_PERCENTAGE">RECOVERY PERCENTAGE:
                            <span className="coronavirus-guide-list-item-text"> Total number of recovered cases divided by Total number of covid-19 cases</span>
                            </h3>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

CoronavirusWorldComponent.propTypes = {
    countries: PropTypes.array,
    getAllCountriesData: PropTypes.func.isRequired,
    // getVaccineNews: PropTypes.func.isRequired,
    // getHealthNews: PropTypes.func.isRequired,
};


// pass the application state (main data) to our component as props. so we can access it by props
const mapStateToProps = state => ({
    countries: state.countriesObject.countries,
    countriesNameOrdered: state.countriesObject.countriesNameOrdered,
    world: state.countriesObject.world,
});

export default connect(
    mapStateToProps,
    { getAllCountriesData, getWorldData, getAllCountriesDataNameOrdered })(CoronavirusWorldComponent);
