import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getAllCountriesData, getWorldData, getAllCountriesDataNameOrdered } from '../../actions/covid_countries';
// import * as Scroll from 'react-scroll';
// import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

export class CoronavirusAsiaComponent extends Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
        this.state = { scrollTop: 0 }
    }

    onScroll = () => {
        const scrollY = window.scrollY //Don't get confused by what's scrolling - It's not the window
        const scrollTop = this.myRef.current.scrollTop
        console.log(`onScroll, window.scrollY: ${scrollY} myRef.scrollTop: ${scrollTop}`)
        this.setState({
            scrollTop: scrollTop
        })
    }

    render() {
        const {
            scrollTop
        } = this.state
        return (
            <div
                ref={this.myRef}
                onScroll={this.onScroll}
                style={{
                    border: '1px solid black',
                    width: '600px',
                    height: '100px',
                    overflow: 'scroll',
                }} >
                <p>This demonstrates how to get the scrollTop position within a scrollable react component.</p>
                <p>ScrollTop is {scrollTop}</p>
                <p>This demonstrates how to get the scrollTop position within a scrollable react component.</p>
                <p>ScrollTop is {scrollTop}</p>
                <p>This demonstrates how to get the scrollTop position within a scrollable react component.</p>
                <p>ScrollTop is {scrollTop}</p>
                <p>This demonstrates how to get the scrollTop position within a scrollable react component.</p>
                <p>ScrollTop is {scrollTop}</p>
                <p>This demonstrates how to get the scrollTop position within a scrollable react component.</p>
                <p>ScrollTop is {scrollTop}</p>
                <p>This demonstrates how to get the scrollTop position within a scrollable react component.</p>
                <p>ScrollTop is {scrollTop}</p>
            </div>
        )
    }
}

CoronavirusAsiaComponent.propTypes = {
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
    { getAllCountriesData, getWorldData, getAllCountriesDataNameOrdered })(CoronavirusAsiaComponent);
