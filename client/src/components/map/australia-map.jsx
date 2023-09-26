import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { VectorMap } from "react-jvectormap"
import { getAustraliaStatesData, clearProvincesData  } from '../../actions/covid_countries';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

import { provinceData } from "./provinceData";

export class AustraliaMapComponent extends Component {
    constructor() {
        super();

        this.state = {
            provinces: [],
            countryCode: ''
        }

        this.handleClick = this.handleClick.bind(this);
        this.searchStateCode = this.searchStateCode.bind(this);
        this.onGetAllStatesData = this.onGetAllStatesData.bind(this);
        this.numberWithCommas = this.numberWithCommas.bind(this);
        this.onRegionTipShow = this.onRegionTipShow.bind(this);
    }

    async componentDidMount() {
        this.onGetAllStatesData();
    }

    async componentDidUpdate(prevProps) {
        if (this.props.provinces !== prevProps.provinces) {
            this.setState({ provinces: this.props.provinces })
        }
    }

    async componentWillUnmount() {
        await this.props.clearProvincesData();
    }

    async onGetAllStatesData() {
        await this.props.getAustraliaStatesData();
    };

    searchStateCode(stateCode, provinces) {
        for (var i = 0; i < provinces.length; i++) {
            if (provinces[i].TwoLetterSymbol === stateCode) {
                return provinces[i];
            }
        }
    }

    handleClick(e, stateCode) {
        console.log(stateCode);
    };

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    onRegionTipShow(event, label, code) {
        const provinceCode = code.slice(3, 5);
        const province = this.searchStateCode(provinceCode, this.props.provinces);
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
        return (

            <div className="map-page">
                <Helmet>
                    <title>Australia Coronavirus map - vaccovid.live</title>
                    <meta name="description" content="Australia Coronavirus map. New cases, New deaths, confirmed cases, total deaths, critical and active cases of all states in map." />

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
                    { provinces && provinces.length > 0 ?
                        <div>
                            <VectorMap map={"au_mill"}
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
                                    },
                                    selected: {
                                    },
                                    selectedHover: {
                                    }
                                }
                                }
                                regionsSelectable={false}
                                series={
                                    {
                                        regions: [{
                                            values: provinceData,
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

AustraliaMapComponent.propTypes = {
    provinces: PropTypes.array
};


const mapStateToProps = state => ({
    provinces: state.provincesObject.provinces,
});

export default connect(
    mapStateToProps,
    { getAustraliaStatesData, clearProvincesData  }
)(AustraliaMapComponent);