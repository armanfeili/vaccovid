import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Footer from '../common/footer';

import {
    getAllCountriesData, getWorldData, getAllCountriesDataNameOrdered, getAsiaCountriesData, getAfricaCountriesData, getEuropeCountriesData, getNorthAmericaCountriesData, getSouthAmericaCountriesData, getAustraliaOceaniaCountriesData, getCountryISOBased, getProvinceReportISOBased,
    clearWorldData
} from '../../actions/covid_countries';

export class CoronavirusWorldComponent extends Component {
    constructor() {
        super();
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
            showRegions: "off",
            timer: 5
        };

        this.onClickGetCovidWorldData = this.onClickGetCovidWorldData.bind(this);
        this.onClickShowRegions = this.onClickShowRegions.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.compareValues = this.compareValues.bind(this);
        this.numberWithCommas = this.numberWithCommas.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.search = this.search.bind(this);
        this.changeOffset = this.changeOffset.bind(this);
        this.onload = this.onload.bind(this);
        // this.countDown = this.countDown.bind(this); // REMOVED: Method no longer exists
    }

    async componentDidMount() {
        this.onClickGetDynamicCovidData();
        this.onload();
    }

    async componentDidUpdate(prevProps) {
        if (this.props.countries !== prevProps.countries) {
        }
    }

    async componentWillUnmount() {
    }

    async onClickGetDynamicCovidData() {

        await this.props.getAllCountriesDataNameOrdered();

        let continentName;
        if (this.props.location.state) {
            continentName = this.props.location.state.continentName;
        } else if (this.props.location.state === null || this.props.location.state === undefined) {
            await this.props.getAllCountriesData();
            await this.props.getWorldData();
        }

        if (continentName === 'World') {
            await this.props.getAllCountriesData();
            await this.props.getWorldData();
        } else if (continentName === 'Asia') {
            await this.props.getAsiaCountriesData();

        } else if (continentName === 'Africa') {
            await this.props.getAfricaCountriesData();

        } else if (continentName === 'Europe') {
            await this.props.getEuropeCountriesData();

        } else if (continentName === 'North America') {
            await this.props.getNorthAmericaCountriesData();

        } else if (continentName === 'South America') {
            await this.props.getSouthAmericaCountriesData();

        } else if (continentName === 'Australia/Oceania') {
            await this.props.getAustraliaOceaniaCountriesData();

        }
    };

    async onClickGetCovidWorldData() {
        this.setState({ active_btn: "world" });
        await this.props.getAllCountriesData();
        await this.props.getAllCountriesDataNameOrdered();
        await this.props.getWorldData();

    };

    async onClickGetCovidAsiaData() {
        this.setState({ active_btn: "asia" });
    };
    async onClickGetCovidAfricaData() {
        this.setState({ active_btn: "africa" });

    };

    // DEPRECATED: countDown function removed - Data is archived (no live updates)
    // countDown(duration, display) {
    //     var timer = duration, minutes, seconds;
    //     setInterval(function () {
    //         minutes = parseInt(timer / 60, 10);
    //         seconds = parseInt(timer % 60, 10);
    //
    //         minutes = minutes < 10 ? "0" + minutes : minutes;
    //         seconds = seconds < 10 ? "0" + seconds : seconds;
    //
    //         display.textContent = minutes + ":" + seconds;
    //
    //         if (--timer < 0) {
    //             timer = duration;
    //         }
    //     }, 1000);
    // }

    onload() {
        let { countries } = this.props;
        let { countriesNameOrdered } = this.props;
        let { world } = this.props;
        if (countriesNameOrdered !== undefined && countries !== undefined && world !== undefined) {
            var fiveMinutes = 60 * 5,
                display = document.querySelector('#time');
            if (display !== null) {
                this.countDown(fiveMinutes, display);
            }
        }
    };

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

    compareValues(key, order = 'asc') {
        return function innerSort(a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
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
            return (
                (order === 'desc') ? (comparison * -1) : comparison
            );
        };
    }

    numberWithCommas(x) {
        if (x === null || x === undefined) return '0';
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    onScroll = (element) => {
        if (this.regionRef.current !== null && this.titleRef.current !== null && this.tableRef.current !== null) {
            let scrollTable = this.tableRef.current.scrollLeft

            if (element === "coronavirusTable") {
                this.titleRef.current.scrollLeft = scrollTable
            }

        }
    }

    search() {
        let input = document.getElementById("input");
        let filter = input !== null ? input.value.toUpperCase() : '';
        let table = document.getElementById("coronavirusTable");
        let selectedTR = []
        let td = []
        let txtValue;

        let tr = table !== null ? table.getElementsByTagName("tr") : '';
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
        let { countries } = this.props;
        let { countriesNameOrdered } = this.props;
        let { world } = this.props;
        let tableIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        let continentName = 'world-data'
        let url_state = { continentName: 'World' };  

        if (continentName === null || continentName === undefined) {
            return <Redirect to={{ pathname: '/not-found' }} push />
        }

        const trimString = (str) => {
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

        return <div>
            <Helmet>
                <title>VACCOVID - Vaccine, Covid-19 and Treatment tracker</title>
                <meta name="description" content="VACCOVID.LIVE comprehensive up-to-date Vaccine tracker, COVID-19 tracker and Treatment tracker website that makes people aware about coronavirus pandemic" />
                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:title" content="Vaccovid - Vaccine and Covid-19 tracker on tables of data, maps & news" />
                <meta property="og:description"
                    content="VACCOVID.LIVE comprehensive up-to-date Vaccine tracker, COVID-19 tracker and Treatment tracker website that make people aware about coronavirus pandemic" />

                {/* <!-- Twitter --> */}
                <meta property="twitter:title" content="Vaccovid - Vaccine tracker, Covid-19 tracker and Treatment tracker" />
                <meta property="twitter:description"
                    content="VACCOVID.LIVE comprehensive up-to-date Vaccine tracker, COVID-19 tracker and Treatment tracker website that make people aware about coronavirus pandemic" />

            </Helmet>
            {
                url_state && countriesNameOrdered !== undefined && countries !== undefined && world !== undefined ? (
                    <div>
                        <div className={`coronavirus ${url_state.continentName !== "World" ? "coronavirus-removeQuickFactsHeight" : ""} ${url_state.continentName === "Australia/Oceania" ? "coronavirus-removeQuickFactsHeight-heightWhenAustralia" : ""}`}>
                            <div className="coronavirus-btnAndTitle">
                                <button className="coronavirus-btnAndTitle-btn" onClick={this.onClickShowRegions}>Choose Your Region &#9662;</button>
                                <h1 className="coronavirus-btnAndTitle-title">{url_state.continentName.toUpperCase()}</h1>
                            </div>

                            <div className={`coronavirus-responsive ${this.state.showRegions === "off" ? "take_underground" : ""}`}>
                                <button className="coronavirus-responsive-close_btn" onClick={this.onClickShowRegions}></button>
                                <ul className={`coronavirus-responsive-allregions`} id="region">
                                    <h2 className={`coronavirus-responsive-allregions-title`}>Continents</h2>
                                    <Link to={{ pathname: `/covid-19-tracker/world-data`, state: { continentName: 'World' } }} onClick={async () => { await this.props.getAllCountriesData(); await this.props.getWorldData(); this.onClickShowRegions(); }} className={`coronavirus-responsive-allregions-btn ${continentName === "world-data" ? "coronavirus-responsive-allregions-btn-active" : ""}`}>World</Link>
                                    <Link to={{ pathname: `/covid-19-tracker/asia-data`, state: { continentName: 'Asia' } }} onClick={async () => { await this.props.getAsiaCountriesData(); this.onClickShowRegions(); }} className={`coronavirus-responsive-allregions-btn ${continentName === "asia-data" ? "coronavirus-responsive-allregions-btn-active" : ""}`} >Asia</Link>
                                    <Link to={{ pathname: `/covid-19-tracker/africa-data`, state: { continentName: 'Africa' } }} onClick={async () => { this.props.getAfricaCountriesData(); this.onClickShowRegions(); }} className={`coronavirus-responsive-allregions-btn ${continentName === "africa-data" ? "coronavirus-responsive-allregions-btn-active" : ""}`}>Africa</Link>
                                    <Link to={{ pathname: `/covid-19-tracker/australia-data`, state: { continentName: 'Australia/Oceania' } }} onClick={async () => { this.props.getAustraliaOceaniaCountriesData(); this.onClickShowRegions(); }} className={`coronavirus-responsive-allregions-btn ${continentName === "australia-data" ? "coronavirus-responsive-allregions-btn-active" : ""}`}>Australia</Link>
                                    <Link to={{ pathname: `/covid-19-tracker/europe-data`, state: { continentName: 'Europe' } }} onClick={async () => { this.props.getEuropeCountriesData(); this.onClickShowRegions(); }} className={`coronavirus-responsive-allregions-btn ${continentName === "europe-data" ? "coronavirus-responsive-allregions-btn-active" : ""}`}>Europe</Link>
                                    <Link to={{ pathname: `/covid-19-tracker/north-america-data`, state: { continentName: 'North America' } }} onClick={async () => { this.props.getNorthAmericaCountriesData(); this.onClickShowRegions(); }} className={`coronavirus-responsive-allregions-btn ${continentName === "north-america-data" ? "coronavirus-responsive-allregions-btn-active" : ""}`}>North America</Link>
                                    <Link to={{ pathname: `/covid-19-tracker/south-america-data`, state: { continentName: 'South America' } }} onClick={async () => { this.props.getSouthAmericaCountriesData(); this.onClickShowRegions(); }} className={`coronavirus-responsive-allregions-btn ${continentName === "south-america-data" ? "coronavirus-responsive-allregions-btn-active" : ""}`}>South America</Link>
                                    <Link to={{ pathname: `/covid-19-tracker/oceania-data`, state: { continentName: 'Australia/Oceania' } }} onClick={async () => { this.props.getAustraliaOceaniaCountriesData(); this.onClickShowRegions(); }} className={`coronavirus-responsive-allregions-btn ${continentName === "oceania-data" ? "coronavirus-responsive-allregions-btn-active" : ""}`}>Oceania</Link>

                                    <h2 className={`coronavirus-responsive-allregions-title`}>Most Viewed</h2>
                                    <Link to={{
                                        pathname: `/covid-19-tracker/USA/USA`, state: { iso: 'usa', countryName: 'USA' }
                                    }} className={`coronavirus-responsive-allregions-btn`}>United States</Link>


                                    <Link to={{
                                        pathname: `/covid-19-tracker/Canada/CAN`, state: { iso: 'can', countryName: 'Canada' }
                                    }} className={`coronavirus-responsive-allregions-btn`}>Canada</Link>

                                    <Link to={{
                                        pathname: `/covid-19-tracker/Australia/AUS`, state: { iso: 'aus', countryName: 'Australia' }
                                    }} className={`coronavirus-responsive-allregions-btn`}>Australia</Link>

                                    <Link to={{
                                        pathname: `/covid-19-tracker/UK/GBR`, state: { iso: 'gbr', countryName: 'UK' }
                                    }} className={`coronavirus-responsive-allregions-btn`}>United Kingdom</Link>

                                    <Link to={{
                                        pathname: `/covid-19-tracker/India/IND`, state: { iso: 'ind', countryName: 'India' }
                                    }} className={`coronavirus-responsive-allregions-btn`}>India</Link>


                                    <h2 className={`coronavirus-responsive-allregions-title`}>Countries</h2>
                                    {countriesNameOrdered.length > 0 ? countriesNameOrdered.map((country, index) => {
                                        return <Link to={{
                                            pathname: `/covid-19-tracker/${trimString(country.Country)}/${country.ThreeLetterSymbol.toUpperCase()}`, state: { iso: country.ThreeLetterSymbol, countryName: country.Country }
                                        }}
                                            key={index} className={`coronavirus-responsive-allregions-btn`}>{country.Country}</Link>
                                    }) : (
                                            <div>
                                                <div className={`coronavirus-responsive-allregions-btn`}>Loading</div>
                                            </div>
                                        )
                                    }
                                </ul>
                            </div>

                            <ul className="coronavirus-regions" id="region"
                                ref={this.regionRef}
                                onScroll={() => this.onScroll('region')}

                            >
                                <h2 className={`coronavirus-regions-title`}>Continents</h2>
                                <Link to={{ pathname: `/covid-19-tracker/world-data`, state: { continentName: 'World' } }} onClick={async () => { await this.props.getAllCountriesData(); await this.props.getWorldData(); }} className={`coronavirus-regions-btn ${continentName === "world-data" ? "coronavirus-regions-btn-active" : ""}`}>World</Link>
                                <Link to={{ pathname: `/covid-19-tracker/asia-data`, state: { continentName: 'Asia' } }} onClick={async () => { await this.props.getAsiaCountriesData(); }} className={`coronavirus-regions-btn ${continentName === "asia-data" ? "coronavirus-regions-btn-active" : ""}`} >Asia</Link>
                                <Link to={{ pathname: `/covid-19-tracker/africa-data`, state: { continentName: 'Africa' } }} onClick={async () => { this.props.getAfricaCountriesData(); }} className={`coronavirus-regions-btn ${continentName === "africa-data" ? "coronavirus-regions-btn-active" : ""}`}>Africa</Link>
                                <Link to={{ pathname: `/covid-19-tracker/australia-data`, state: { continentName: 'Australia/Oceania' } }} onClick={async () => { this.props.getAustraliaOceaniaCountriesData(); }} className={`coronavirus-regions-btn ${continentName === "australia-data" ? "coronavirus-regions-btn-active" : ""}`}>Australia</Link>
                                <Link to={{ pathname: `/covid-19-tracker/europe-data`, state: { continentName: 'Europe' } }} onClick={async () => { this.props.getEuropeCountriesData(); }} className={`coronavirus-regions-btn ${continentName === "europe-data" ? "coronavirus-regions-btn-active" : ""}`}>Europe</Link>
                                <Link to={{ pathname: `/covid-19-tracker/north-america-data`, state: { continentName: 'North America' } }} onClick={async () => { this.props.getNorthAmericaCountriesData(); }} className={`coronavirus-regions-btn ${continentName === "north-america-data" ? "coronavirus-regions-btn-active" : ""}`}>North America</Link>
                                <Link to={{ pathname: `/covid-19-tracker/south_america-data`, state: { continentName: 'South America' } }} onClick={async () => { this.props.getSouthAmericaCountriesData(); }} className={`coronavirus-regions-btn ${continentName === "south_america-data" ? "coronavirus-regions-btn-active" : ""}`}>South America</Link>
                                <Link to={{ pathname: `/covid-19-tracker/oceania-data`, state: { continentName: 'Australia/Oceania' } }} onClick={async () => { this.props.getAustraliaOceaniaCountriesData(); }} className={`coronavirus-regions-btn ${continentName === "oceania-data" ? "coronavirus-regions-btn-active" : ""}`}>Oceania</Link>

                                <h2 className={`coronavirus-regions-title`}>Most Viewed</h2>

                                <Link to={{
                                    pathname: `/covid-19-tracker/USA/USA`, state: { iso: 'usa', countryName: 'USA' }
                                }} className={`coronavirus-regions-btn`}>United States</Link>

                                <Link to={{
                                    pathname: `/covid-19-tracker/Canada/CAN`, state: { iso: 'can', countryName: 'Canada' }
                                }} className={`coronavirus-regions-btn`}>Canada</Link>

                                <Link to={{
                                    pathname: `/covid-19-tracker/Australia/AUS`, state: { iso: 'aus', countryName: 'Australia' }
                                }} className={`coronavirus-regions-btn`}>Australia</Link>

                                <Link to={{
                                    pathname: `/covid-19-tracker/UK/GBR`, state: { iso: 'gbr', countryName: 'UK' }
                                }} className={`coronavirus-regions-btn`}>United Kingdom</Link>

                                <Link to={{
                                    pathname: `/covid-19-tracker/India/IND`, state: { iso: 'ind', countryName: 'India' }
                                }} className={`coronavirus-regions-btn`}>India</Link>


                                <h2 className={`coronavirus-regions-title`}>Countries</h2>
                                {countriesNameOrdered.length > 0 ? countriesNameOrdered.map((country, index) => {
                                    return <Link to={{
                                        pathname: `/covid-19-tracker/${trimString(country.Country)}/${country.ThreeLetterSymbol.toUpperCase()}`, state: { iso: country.ThreeLetterSymbol, countryName: country.Country }
                                    }}
                                        onClick={async () => { await this.props.getCountryISOBased(country.Country, country.ThreeLetterSymbol.toUpperCase()); await this.props.getProvinceReportISOBased(country.ThreeLetterSymbol.toUpperCase()); }}
                                        key={index} className={`coronavirus-regions-btn`}>{country.Country}</Link>
                                }) : (
                                        <div>
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

                            <div className={`coronavirus-quick-facts ${url_state.continentName !== "World" ? "coronavirus-quick-facts-displayOff" : ""}`}>
                                {world.length > 0 ? world.map((world, index) => {
                                    return <ul key={index} className="coronavirus-quick-facts-world">
                                        <li className="coronavirus-quick-facts-world-item coronavirus-quick-facts-world-item-TotalCases" key={world.TotalCases}><h2 className="coronavirus-quick-facts-world-item-TotalCases-text">TOTAL CASES</h2><span className="coronavirus-quick-facts-world-item-TotalCases-number">{this.numberWithCommas(world.TotalCases)}</span></li>
                                        <li className="coronavirus-quick-facts-world-item coronavirus-quick-facts-world-item-ActiveCases" key={world.ActiveCases}><h2 className="coronavirus-quick-facts-world-item-ActiveCases-text">ACTIVE CASES</h2><span className="coronavirus-quick-facts-world-item-ActiveCases-number">{this.numberWithCommas(world.ActiveCases)}</span></li>
                                        <li className="coronavirus-quick-facts-world-item coronavirus-quick-facts-world-item-TotalDeaths" key={world.TotalDeaths}><h2 className="coronavirus-quick-facts-world-item-TotalDeaths-text">TOTAL DEATHS</h2><span className="coronavirus-quick-facts-world-item-TotalDeaths-number">{this.numberWithCommas(world.TotalDeaths)}</span></li>
                                        <li className="coronavirus-quick-facts-world-item coronavirus-quick-facts-world-item-NewCases" key={world.NewCases}><h2 className="coronavirus-quick-facts-world-item-NewCases-text">NEW CASES</h2><span className="coronavirus-quick-facts-world-item-NewCases-number">{this.numberWithCommas(world.NewCases)}</span></li>
                                        <li className="coronavirus-quick-facts-world-item coronavirus-quick-facts-world-item-Serious_Critical" key={world.Serious_Critical}><h2 className="coronavirus-quick-facts-world-item-Serious_Critical-text">CRITICAL</h2><span className="coronavirus-quick-facts-world-item-Serious_Critical-number">{this.numberWithCommas(world.Serious_Critical)}</span></li>
                                        <li className="coronavirus-quick-facts-world-item coronavirus-quick-facts-world-item-NewDeaths" key={world.NewDeaths}><h2 className="coronavirus-quick-facts-world-item-NewDeaths-text">NEW DEATHS</h2><span className="coronavirus-quick-facts-world-item-NewDeaths-number">{this.numberWithCommas(world.NewDeaths)}</span></li>
                                    </ul>
                                }) : (
                                        <ul className="coronavirus-quick-facts-world">
                                            <li className="coronavirus-quick-facts-world-item coronavirus-quick-facts-world-item-loading loading coronavirus-quick-facts-world-item-TotalCases" key={1}><h2 className="coronavirus-quick-facts-world-item-TotalCases-text">TOTAL CASES</h2><span className="coronavirus-quick-facts-world-item-TotalCases-number">Loading</span></li>
                                            <li className="coronavirus-quick-facts-world-item coronavirus-quick-facts-world-item-loading loading coronavirus-quick-facts-world-item-ActiveCases" key={2}><h2 className="coronavirus-quick-facts-world-item-ActiveCases-text">ACTIVE CASES</h2><span className="coronavirus-quick-facts-world-item-ActiveCases-number">Loading</span></li>
                                            <li className="coronavirus-quick-facts-world-item coronavirus-quick-facts-world-item-loading loading coronavirus-quick-facts-world-item-TotalDeaths" key={3}><h2 className="coronavirus-quick-facts-world-item-TotalDeaths-text">TOTAL DEATHS</h2><span className="coronavirus-quick-facts-world-item-TotalDeaths-number">Loading</span></li>
                                            <li className="coronavirus-quick-facts-world-item coronavirus-quick-facts-world-item-loading loading coronavirus-quick-facts-world-item-NewCases" key={4}><h2 className="coronavirus-quick-facts-world-item-NewCases-text">NEW CASES</h2><span className="coronavirus-quick-facts-world-item-NewCases-number">Loading</span></li>
                                            <li className="coronavirus-quick-facts-world-item coronavirus-quick-facts-world-item-loading loading coronavirus-quick-facts-world-item-Serious_Critical" key={5}><h2 className="coronavirus-quick-facts-world-item-Serious_Critical-text">CRITICAL</h2><span className="coronavirus-quick-facts-world-item-Serious_Critical-number">Loading</span></li>
                                            <li className="coronavirus-quick-facts-world-item coronavirus-quick-facts-world-item-loading loading coronavirus-quick-facts-world-item-NewDeaths" key={6}><h2 className="coronavirus-quick-facts-world-item-NewDeaths-text">NEW DEATHS</h2><span className="coronavirus-quick-facts-world-item-NewDeaths-number">Loading</span></li>
                                        </ul>
                                    )
                                }
                            </div>
                            <div className="coronavirus-table-title">
                                <input className="coronavirus-table-title-searchbar" type="text" id="input" placeholder="Your Country" onKeyUp={this.search()} value={this.state.value} onChange={this.handleChange} />
                                <table className="coronavirus-table-title-stats" id="t01">
                                    <caption className="coronavirus-table-title-stats-caption"><h1 className="coronavirus-table-title-stats-caption-h1">{url_state.continentName} Data <span className="coronavirus-table-title-stats-caption-update-text">(Data as of February 14, 2023)</span></h1></caption>
                                    <thead className="coronavirus-table-title-stats-thead">
                                        <tr className="coronavirus-table-title-stats-columns" id="columns"
                                            ref={this.titleRef}
                                            onScroll={() => this.onScroll('columns')}
                                        >
                                            <th className={`coronavirus-table-title-stats-columns-item coronavirus-table-title-stats-columns-number`}>NUM</th>
                                            <th className={`coronavirus-table-title-stats-columns-item coronavirus-table-title-stats-columns-name ${this.state.activeTitle === 'Country' ? "coronavirus-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderName() }}>COUNTRY <span className="sign">&#9662;</span></th>
                                            <th className={`coronavirus-table-title-stats-columns-item coronavirus-table-title-stats-columns-confirmed ${this.state.activeTitle === 'TotalCase' ? "coronavirus-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderConfirmed() }}>TOTAL CASES <span className="sign">&#9662;</span></th>
                                            <th className={`coronavirus-table-title-stats-columns-item coronavirus-table-title-stats-columns-newcases ${this.state.activeTitle === 'NewCases' ? "coronavirus-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderStats('newcases', 'NewCases') }}>NEW CASES <span className="sign">&#9662;</span></th>
                                            <th className={`coronavirus-table-title-stats-columns-item coronavirus-table-title-stats-columns-confirmedpermil ${this.state.activeTitle === 'Infection_Risk' ? "coronavirus-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderStats('confirmedpermil', 'Infection_Risk') }}>INFECTION RISK <span className="sign">&#9662;</span></th>
                                            <th className={`coronavirus-table-title-stats-columns-item coronavirus-table-title-stats-columns-critical ${this.state.activeTitle === 'Serious_Critical' ? "coronavirus-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderStats('critical', 'Serious_Critical') }}>SERIOUS, CRITICAL <span className="sign">&#9662;</span></th>
                                            <th className={`coronavirus-table-title-stats-columns-item coronavirus-table-title-stats-columns-active ${this.state.activeTitle === 'ActiveCases' ? "coronavirus-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderStats('active', 'ActiveCases') }}>ACTIVE CASES <span className="sign">&#9662;</span></th>
                                            <th className={`coronavirus-table-title-stats-columns-item coronavirus-table-title-stats-columns-deceased ${this.state.activeTitle === 'TotalDeaths' ? "coronavirus-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderStats('deceased', 'TotalDeaths') }}>TOTAL DEATHS <span className="sign">&#9662;</span></th>
                                            <th className={`coronavirus-table-title-stats-columns-item coronavirus-table-title-stats-columns-newdeaths ${this.state.activeTitle === 'NewDeaths' ? "coronavirus-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderStats('newdeaths', 'NewDeaths') }}>NEW DEATHS <span className="sign">&#9662;</span></th>
                                            <th className={`coronavirus-table-title-stats-columns-item coronavirus-table-title-stats-columns-deathspermil ${this.state.activeTitle === 'Case_Fatality_Rate' ? "coronavirus-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderStats('deathspermil', 'Case_Fatality_Rate') }}>CASE FATALITY RATE (CFR <span className="sign">&#9662;</span>)</th>
                                            <th className={`coronavirus-table-title-stats-columns-item coronavirus-table-title-stats-columns-giventests ${this.state.activeTitle === 'TotalTests' ? "coronavirus-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderStats('giventests', 'TotalTests') }}>TOTAL TESTS <span className="sign">&#9662;</span></th>
                                            <th className={`coronavirus-table-title-stats-columns-item coronavirus-table-title-stats-columns-testspermil ${this.state.activeTitle === 'Test_Percentage' ? "coronavirus-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderStats('testspermil', 'Test_Percentage') }}>TEST PERCENTAGE <span className="sign">&#9662;</span></th>
                                            <th className={`coronavirus-table-title-stats-columns-item coronavirus-table-title-stats-columns-recovered ${this.state.activeTitle === 'TotalRecovered' ? "coronavirus-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderStats('recovered', 'TotalRecovered') }}>TOTAL RECOVERED <span className="sign">&#9662;</span></th>
                                            <th className={`coronavirus-table-title-stats-columns-item coronavirus-table-title-stats-columns-recoveredrate ${this.state.activeTitle === 'Recovery_Proporation' ? "coronavirus-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderStats('recoveredrate', 'Recovery_Proporation') }}>RECOVERY PERCENTAGE <span className="sign">&#9662;</span></th>
                                            <th className={`coronavirus-table-title-stats-columns-item coronavirus-table-title-stats-columns-population ${this.state.activeTitle === 'Population' ? "coronavirus-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderStats('population', 'Population') }}>POPULATION <span className="sign">&#9662;</span></th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>

                            <table className="coronavirus-table-stats" id="coronavirusTable"
                                ref={this.tableRef}
                                onScroll={() => this.onScroll('coronavirusTable')}
                            >
                                <tbody>
                                    {countries.length > 0 ? countries.map((country, index) => {
                                        return <tr key={index} className="coronavirus-table-stats-item">
                                            <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-number">{index + 1}</td>
                                            <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-name"><Link className="coronavirus-table-stats-item-name-link" to={{
                                                pathname: `/covid-19-tracker/${trimString(country.Country)}/${country.ThreeLetterSymbol.toUpperCase()}`, state: { iso: country.ThreeLetterSymbol, countryName: country.Country }
                                            }} onClick={this.changeOffset} >{country.Country} <span className="sign">&#9662;</span></Link></td>
                                            <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-confirmed">{country.TotalCases !== null ? this.numberWithCommas(country.TotalCases) : "No Data"}</td>
                                            <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-newcases">{country.NewCases !== null ? this.numberWithCommas(country.NewCases) : "No Data"}</td>
                                            <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-confirmedpermil">{country.Infection_Risk !== null ? country.Infection_Risk + "%" : "No Data"}</td>
                                            <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-critical">{country.Serious_Critical !== null ? this.numberWithCommas(country.Serious_Critical) : "No Data"}</td>
                                            <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-active">{country.ActiveCases !== null && country.ActiveCases !== 0 && country.ActiveCases !== "0" ? this.numberWithCommas(country.ActiveCases) : "No Data"}</td>
                                            <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-deceased">{country.TotalDeaths !== null ? this.numberWithCommas(country.TotalDeaths) : "No Data"}</td>
                                            <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-newdeaths">{country.NewDeaths !== null ? this.numberWithCommas(country.NewDeaths) : "No Data"}</td>
                                            <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-deathspermil">{country.Case_Fatality_Rate !== null ? country.Case_Fatality_Rate + "%" : "No Data"}</td>
                                            <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-giventests">{country.TotalTests !== null ? this.numberWithCommas(country.TotalTests) : "No Data"}</td>
                                            <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-testspermil">{country.Test_Percentage !== null ? country.Test_Percentage + "%" : "No Data"}</td>
                                            <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-recovered">{country.TotalRecovered !== null && country.TotalRecovered !== 0 && country.TotalRecovered !== "0" ? this.numberWithCommas(country.TotalRecovered) : "No Data"}</td>
                                            <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-recoveredrate">{country.Recovery_Proporation !== null && country.Recovery_Proporation !== 0 && country.Recovery_Proporation !== "0" ? country.Recovery_Proporation + "%" : "No Data"}</td>
                                            <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-population">{country.Population !== null && country.Population !== 0 && country.Population !== "0" ? this.numberWithCommas(country.Population) : "No Data"}</td>
                                        </tr>
                                    }

                                    ) : tableIndex.map((e, i) => {
                                        return (
                                            <tr key={i} className="coronavirus-table-stats-item coronavirus-table-stats-loading loading">
                                                <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-number">{i + 1}</td>
                                                <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-name">Loading<span className="sign">&#9662;</span></td>
                                                <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-confirmed">Loading</td>
                                                <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-newcases">Loading</td>
                                                <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-confirmedpermil">Loading</td>
                                                <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-critical">Loading</td>
                                                <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-active">Loading</td>
                                                <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-deceased">Loading</td>
                                                <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-newdeaths">Loading</td>
                                                <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-deathspermil">Loading</td>
                                                <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-giventests">Loading</td>
                                                <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-testspermil">Loading</td>
                                                <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-recovered">Loading</td>
                                                <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-recoveredrate">Loading</td>
                                                <td className="coronavirus-table-stats-item-each coronavirus-table-stats-item-population">Loading</td>
                                            </tr>
                                        )
                                    })

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
                    </div>
                ) : (<h6>loading</h6>)
            }

            <Footer />
        </div>

    }
}

CoronavirusWorldComponent.propTypes = {
    world: PropTypes.array,
    countries: PropTypes.array,
    countriesNameOrdered: PropTypes.array,

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


const mapStateToProps = state => ({
    countries: state.countriesObject.countries,
    countriesNameOrdered: state.countriesObject.countriesNameOrdered,
    world: state.countriesObject.world,
});

export default connect(
    mapStateToProps,
    {
        getAllCountriesData, getWorldData, getAllCountriesDataNameOrdered, getAsiaCountriesData, getAfricaCountriesData, getEuropeCountriesData, getNorthAmericaCountriesData, getSouthAmericaCountriesData, getAustraliaOceaniaCountriesData,
        getCountryISOBased, getProvinceReportISOBased,
        clearWorldData
    })(CoronavirusWorldComponent);
