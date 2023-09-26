import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { VectorMap } from "react-jvectormap"
import { getAllCountriesData, clearCountriesData } from '../../actions/covid_countries';
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

        this.handleClick = this.handleClick.bind(this);
        this.searchCountryCode = this.searchCountryCode.bind(this);
        this.onGetAllCountriesData = this.onGetAllCountriesData.bind(this);
        this.numberWithCommas = this.numberWithCommas.bind(this);
        this.onRegionTipShow = this.onRegionTipShow.bind(this);
    }

    async componentDidMount() {
        this.onGetAllCountriesData();
    }

    async componentDidUpdate(prevProps) {
        if (this.props.countries !== prevProps.countries) {
            this.setState({ countries: this.props.countries })
        }
    }

    async componentWillUnmount() {
        await this.props.clearCountriesData();
    }

    async onGetAllCountriesData() {
        await this.props.getAllCountriesData();
    };

    searchCountryCode(countryCode, countries) {
        for (var i = 0; i < countries.length; i++) {
            if (countries[i].TwoLetterSymbol === countryCode.toLowerCase()) {
                return countries[i];
            }
        }
    }

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

    render() {

        const { countries } = this.props;
        return (

            <div className="map-page">
                <Helmet>

                    <title>Coronavirus World map - vaccovid.live</title>
                    <meta name="description" content="Coronavirus World map. New cases, New deaths, confirmed Cases, total deaths, critical cases, active cases, new recovered of all countries in map." />

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
                    {countries && countries.length > 0 ?
                        <div>
                            <VectorMap
                                map={"world_mill"}
                                backgroundColor="transparent"
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

WorldMapComponent.propTypes = {
    countries: PropTypes.array
};


const mapStateToProps = state => ({
    countries: state.countriesObject.countries,
});

export default connect(
    mapStateToProps,
    { getAllCountriesData, clearCountriesData }
)(WorldMapComponent);