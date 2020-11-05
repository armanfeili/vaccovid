import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { VectorMap } from "react-jvectormap"
import { getAustraliaStatesData } from '../../actions/covid_countries';
import { Link } from 'react-router-dom';

import { provinceData } from "./provinceData";

export class AustraliaMapComponent extends Component {
    constructor() {
        super();

        this.state = {
            provinces: [],
            countryCode: ''
        }

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
        this.searchStateCode = this.searchStateCode.bind(this);
        this.onGetAllStatesData = this.onGetAllStatesData.bind(this);
        this.numberWithCommas = this.numberWithCommas.bind(this);
        this.onRegionTipShow = this.onRegionTipShow.bind(this);
    }

    async componentDidMount() {
        document.title = "covid-19 Australia map";
        this.onGetAllStatesData();
    }

    async componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.provinces !== prevProps.provinces) {
            this.setState({ provinces: this.props.provinces })
            // console.log(this.props.provinces);  // returns [...]
            // console.log(this.state.provinces);  // returns []
            setTimeout(() => {
                // console.log(this.state.provinces);  // returns [...]
            }, 2000);
        }
    }

    async onGetAllStatesData() {
        await this.props.getAustraliaStatesData();
    };

    searchStateCode(stateCode, provinces) {
        // console.log(stateCode);
        // console.log(provinces);
        for (var i = 0; i < provinces.length; i++) {
            if (provinces[i].TwoLetterSymbol === stateCode) {
                return provinces[i];
            }
        }
    }

    handleClick(e, stateCode) {
        console.log(stateCode);
        // return this.mapData.paths[l].name
    };

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    onRegionTipShow(event, label, code) {
        // console.log(code);  // US-NC
        const provinceCode = code.slice(3, 5);
        // console.log(provinceCode);
        const province = this.searchStateCode(provinceCode, this.props.provinces);
        // console.log(province);
        if (province !== undefined) {
            label.html(
                `
                <div class="map-info">
                    <img src='${require(`./../../views/all-province-flags/au-${provinceCode.toLowerCase()}.svg`) ?
                    require(`./../../views/all-province-flags/au-${provinceCode.toLowerCase()}.svg`) :
                    require(`./../../views/all-province-flags/au-sa.svg`)}' 
                    class="map-info-country-flag"
                    />
                    <div class="map-info-country-flag-cover"></div>
                    <div class="map-info-country-name">${province.province}</div>

                    <div class="map-info-information">
                    <div class="map-info-information-confirmed">Confirmed:</div><div class="map-info-information-number map-info-information-confirmed-color">${province.reports[0].confirmed !== null ? this.numberWithCommas(province.reports[0].confirmed) : 'no data'}</div>
                    <div class="map-info-information-deceased">Deceased:</div><div class="map-info-information-number map-info-information-deceased-color">${province.reports[0].deaths !== null ? this.numberWithCommas(province.reports[0].deaths) : 'no data'}</div>
                    <div class="map-info-information-active">Active:</div><div class="map-info-information-number map-info-information-active-color">${province.reports[0].active !== null ? this.numberWithCommas(province.reports[0].active) : 'no data'}</div>
                    <div class="map-info-information-newcases">New Cases:</div><div class="map-info-information-number map-info-information-newcases-color">${province.reports[0].confirmed_diff === null || province.NewCases === 0 ? 0 : this.numberWithCommas(province.reports[0].confirmed_diff)}</div>
                    <div class="map-info-information-recovered">Fatality rate:</div><div class="map-info-information-number map-info-information-recovered-color">${province.reports[0].fatality_rate !== null ? province.reports[0].fatality_rate : 'no data'}</div>
                    </div>
                </div>

                `
            )
        }
        else {
            label.html(
                `
                <div class="map-info">
                    <img src='${require(`./../../views/all-province-flags/au-${provinceCode.toLowerCase()}.svg`) ?
                    require(`./../../views/all-province-flags/au-${provinceCode.toLowerCase()}.svg`) :
                    require(`./../../views/all-province-flags/au-sa.svg`)}' 
                    class="map-info-country-flag"
                    />
                    <div class="map-info-country-flag-cover"></div>
                    <div class="map-info-country-name">${label.html()}</div>

                    <div class="map-info-information">
                        <div class="map-info-information-confirmed">Confirmed:</div><div class="map-info-information-number map-info-information-confirmed-color">No data</div>
                        <div class="map-info-information-deceased">Deceased:</div><div class="map-info-information-number map-info-information-deceased-color">No data</div>
                        <div class="map-info-information-active">Active:</div><div class="map-info-information-number map-info-information-active-color">No data</div>
                        <div class="map-info-information-confirmed">New Cases:</div><div class="map-info-information-number map-info-information-confirmed-color">No data</div>
                        <div class="map-info-information-recovered">Fatality rate:</div><div class="map-info-information-number map-info-information-recovered-color">No data</div>
                    </div>
                </div>

                `
            )
        }
    }

    render() {

        const { provinces } = this.props;
        // console.log(provinces);
        return (

            <div className="map-page">
                <div className="map-page-buttons">
                    <Link className="map-page-buttons-each map-page-buttons-world" to="/coronavirus-world-map">World</Link>
                    <Link className="map-page-buttons-each map-page-buttons-usa" to="/coronavirus-usa-map">USA</Link>
                    <Link className="map-page-buttons-each map-page-buttons-canada" to="/coronavirus-canada-map">Canada</Link>
                    <Link className="map-page-buttons-each map-page-buttons-brazil" to="/coronavirus-brazil-map">Brazil</Link>
                    <Link className="map-page-buttons-each map-page-buttons-germany" to="/coronavirus-germany-map">Germany</Link>
                    <Link className="map-page-buttons-each map-page-buttons-australia" to="/coronavirus-australia-map">Australia</Link>
                </div>
                <div className="map">
                    {provinces ?
                        <div>
                            <VectorMap map={"au_mill"}
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
                                            values: provinceData, //this is your data
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

AustraliaMapComponent.propTypes = {
    provinces: PropTypes.array
};


// pass the application state (main data) to our component as props. so we can access it by props
const mapStateToProps = state => ({
    provinces: state.provincesObject.provinces,
    // newsLoading: state.newsObject.newsLoading,
});

export default connect(
    mapStateToProps,
    { getAustraliaStatesData }
)(AustraliaMapComponent);