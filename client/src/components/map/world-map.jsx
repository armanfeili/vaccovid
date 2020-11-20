import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { VectorMap } from "react-jvectormap"
import { getAllCountriesData } from '../../actions/covid_countries';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

import { mapData } from "./mapData";

export class WorldMapComponent extends Component {
    constructor() {
        super();

        this.state = {
            countries: [],
            countryCode: ''
        }

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
        this.searchCountryCode = this.searchCountryCode.bind(this);
        this.onGetAllCountriesData = this.onGetAllCountriesData.bind(this);
        this.numberWithCommas = this.numberWithCommas.bind(this);
        this.onRegionTipShow = this.onRegionTipShow.bind(this);
    }

    // You may call setState() immediately in componentDidMount().It will trigger 
    // an extra rendering, but it will happen before the browser updates the 
    // screen.This guarantees that even though the render() will be called twice 
    // in this case, the user won’t see the intermediate state.Use this pattern 
    // with caution because it often causes performance issues.In most cases, 
    // you should be able to assign the initial state in the constructor() instead.
    async componentDidMount() {
        this.onGetAllCountriesData();
    }

    // This method is not called for the initial render.
    // Use this as an opportunity to operate on the DOM when the component has been 
    // updated.This is also a good place to do network requests as long as you 
    // compare the current props to previous props(e.g.a network request may not be 
    // necessary if the props have not changed). it doesn't update state immidiatly
    async componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.countries !== prevProps.countries) {
            this.setState({ countries: this.props.countries })
            // console.log(this.props.countries);  // returns [...]
            // console.log(this.state.countries);  // returns []
            setTimeout(() => {
                // console.log(this.state.countries);  // returns [...]
            }, 2000);
        }
    }

    // You may call setState() immediately in componentDidUpdate() but note that 
    // it must be wrapped in a condition like in the example above, or you’ll 
    // cause an infinite loop

    async onGetAllCountriesData() {
        await this.props.getAllCountriesData();
    };

    searchCountryCode(countryCode, countries) {
        // console.log(countryCode);
        // console.log(countries);
        for (var i = 0; i < countries.length; i++) {
            if (countries[i].TwoLetterSymbol === countryCode.toLowerCase()) {
                return countries[i];
            }
        }
    }

    handleClick(e, countryCode) {
        // console.log(countryCode);
        // return this.mapData.paths[l].name
    };

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    onRegionTipShow(event, label, code) {
        const country = this.searchCountryCode(code, this.props.countries)

        if (country !== undefined) {
            label.html(
                `
                <div class="map-info">
                    <img src='${require(`./../../views/flags/${code.toLowerCase()}.svg`) ?
                    require(`./../../views/flags/${code.toLowerCase()}.svg`) :
                    require(`./../../views/flags/us.svg`)}' 
                    class="map-info-country-flag"
                    />
                    <div class="map-info-country-flag-cover"></div>
                    <div class="map-info-country-name">${country.Country}</div>
    
                    <div class="map-info-information">
                        <div class="map-info-information-confirmed">Confirmed: </div><div class="map-info-information-number map-info-information-confirmed-color">${country.TotalCases !== null ? this.numberWithCommas(country.TotalCases) : 'no data'}</div>
                        <div class="map-info-information-deceased">Deceased: </div><div class="map-info-information-number map-info-information-deceased-color">${country.TotalDeaths !== null ? this.numberWithCommas(country.TotalDeaths) : 'no data'}</div>
                        <div class="map-info-information-critical">Critical: </div><div class="map-info-information-number map-info-information-critical-color">${country.Serious_Critical !== null ? this.numberWithCommas(country.Serious_Critical) : 'no data'}</div>
                        <div class="map-info-information-active">Active: </div><div class="map-info-information-number map-info-information-active-color">${country.ActiveCases !== null ? this.numberWithCommas(country.ActiveCases) : 'no data'}</div>
                         <div class="map-info-information-newcases">New Cases: </div><div class="map-info-information-number map-info-information-newcases-color">${country.NewCases === null || country.NewCases === 0 ? '---' : this.numberWithCommas(country.NewCases)}</div>
                    </div>
                </div>
    
                `
            )
        } else {
            label.html(
                `
                <div class="map-info">
                    <img src='${require(`./../../views/flags/${code.toLowerCase()}.svg`) ?
                    require(`./../../views/flags/${code.toLowerCase()}.svg`) :
                    require(`./../../views/flags/us.svg`)}' 
                    class="map-info-country-flag"
                    />
                    <div class="map-info-country-flag-cover"></div>
                    <div class="map-info-country-name">${label.html()}</div>
    
                    <div class="map-info-information">
                        <div class="map-info-information-confirmed">Confirmed: </div><div class="map-info-information-number map-info-information-confirmed-color">No data</div>
                        <div class="map-info-information-deceased">Deceased: </div><div class="map-info-information-number map-info-information-deceased-color">No data</div>
                        <div class="map-info-information-critical">Critical: </div><div class="map-info-information-number map-info-information-critical-color">No data</div>
                        <div class="map-info-information-active">Active: </div><div class="map-info-information-number map-info-information-active-color">No data</div>
                        <div class="map-info-information-recovered">New Cases: </div><div class="map-info-information-number map-info-information-recovered-color">No data</div>
                    </div>
                </div>
    
                `
            )
        }
    }

    // <div class="map-info-information-newcases">New Cases: </div><div class="map-info-information-number map-info-information-newcases-color">${country.NewCases === null || country.NewCases === 0 ? '---' : this.numberWithCommas(country.NewCases)}</div>
    // <div class="map-info-information-newdeaths">New Deaths: </div><div class="map-info-information-number map-info-information-newdeaths-color">${country.NewDeaths === null || country.NewDeaths === 0 ? '---' : this.numberWithCommas(country.NewDeaths)}</div>

    render() {

        const { countries } = this.props;
        return (

            <div className="map-page">
                <Helmet>

                    <title>Corona Virus World map - vaccovid.live</title>
                    <meta name="description" content="Corona Virus World map. New cases, New deaths, confirmed Cases, total deaths, critical cases, active cases, new recovered of all countries in map." />
                    {/* <!-- Open Graph / Facebook --> */}
                    <meta property="og:title" content={`Corona Virus world map - vaccovid.live`} />
                    <meta property="og:description"
                        content={`Corona Virus World map. New cases, New deaths, confirmed Cases, total deaths, critical cases, active cases, new recovered of all countries in map.`} />

                    {/* <!-- Twitter --> */}
                    <meta property="twitter:title" content={`Corona Virus world map - vaccovid.live`} />
                    <meta property="twitter:description"
                        content={`Corona Virus World map. New cases, New deaths, confirmed Cases, total deaths, critical cases, active cases, new recovered of all countries in map.`} />

                </Helmet>
                <div className="map-page-buttons">
                    <Link className="map-page-buttons-each map-page-buttons-world" to="/coronavirus-world-map">World</Link>
                    <Link className="map-page-buttons-each map-page-buttons-usa" to="/coronavirus-usa-map">USA</Link>
                    <Link className="map-page-buttons-each map-page-buttons-canada" to="/coronavirus-canada-map">Canada</Link>
                    <Link className="map-page-buttons-each map-page-buttons-brazil" to="/coronavirus-brazil-map">Brazil</Link>
                    <Link className="map-page-buttons-each map-page-buttons-germany" to="/coronavirus-germany-map">Germany</Link>
                    <Link className="map-page-buttons-each map-page-buttons-australia" to="/coronavirus-australia-map">Australia</Link>
                </div>
                <div className="map">
                    {countries ?
                        <div>
                            <VectorMap
                                map={"world_mill"}
                                backgroundColor="transparent" //change it to ocean blue: #0077be
                                zoomOnScroll={true}
                                containerStyle={{ width: "100%", height: "520px" }}
                                onRegionClick={this.handleClick}
                                //gets the country code
                                containerClassName="maps"
                                regionStyle={{
                                    initial: {
                                        fill: "#e4e4e4",
                                        "fill-opacity": 0.9,
                                        stroke: "none",
                                        "stroke-width": 0,
                                        "stroke-opacity": 0
                                    },
                                    hover: {
                                        "fill-opacity": 0.8,
                                        cursor: "pointer"
                                    },
                                    selected: {
                                        // fill: "#2938bc" //color for the clicked country
                                    },
                                    selectedHover: {
                                        // fill: "#ec1515" //color for the clicked country
                                    }
                                }
                                }
                                regionsSelectable={false}
                                series={
                                    {
                                        regions: [{
                                            values: mapData, //this is your data
                                            scale: ['#ffffd2', '#ffd700'],
                                            normalizeFunction: "polynomial"
                                        }]
                                    }
                                }
                                onRegionTipShow={this.onRegionTipShow}
                            />
                        </div>
                        :
                        <div>Loading</div>
                    }

                </div>
            </div>
        );
    }
}

// world_mill [yes][check]
// us_aea [yes]
// europe_mill
// continents_mill
// ch_mill
// oceania_mill
// africa_mill
// asia_mill
// north_america_mill
// south_america_mill
// ca_lcc [yes]
// brazil [yes]
// se_mill
// es_mill
// vietnam
// indonesia
// th_mill
// de_mill [yes]
// ar_mill
// au_mill [yes]
// kr_mill
// co_mill

WorldMapComponent.propTypes = {
    countries: PropTypes.array
};


// pass the application state (main data) to our component as props. so we can access it by props
const mapStateToProps = state => ({
    countries: state.countriesObject.countries,
    // newsLoading: state.newsObject.newsLoading,
});

export default connect(
    mapStateToProps,
    { getAllCountriesData }
)(WorldMapComponent);