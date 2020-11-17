import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Chart from 'chart.js';
import Footer from '../common/footer';

import {
    getAllCountriesData, getWorldData, getAllCountriesDataNameOrdered, getAsiaCountriesData, getAfricaCountriesData, getEuropeCountriesData, getNorthAmericaCountriesData, getSouthAmericaCountriesData, getAustraliaOceaniaCountriesData,
    getCountryISOBased, getProvinceReportISOBased, getCitiesReportISOBased,
    getOvidData,
    clearData, clearOvidData
} from '../../actions/covid_countries';

export class countryEachCountryComponent extends Component {
    constructor() {
        super();
        // State is similar to props, but it is private and fully controlled by the component.
        this.titleRef = React.createRef()
        this.tableRef = React.createRef()
        this.regionRef = React.createRef()
        // this.chartReference = React.createRef();

        this.state = {
            value: '',
            active_btn: "world",
            order: "",
            order_kind: "",
            order_cities_kind: "",
            color: "",
            firstTimeOrdering: true,
            page: 0,
            orderNameForTitles: '',
            activeTitle: 'confirmed',
            activeCitiesTitle: 'cities',
            showRegions: "off",
            data: [],
            world: [],
            timer: 5,

            iso: "",
            countryName: "",
            updated: ''
            // scrolling: 0,
            // scrollTitle: 0,
            // scrollTable: 0
        };

        this.getProvinceCovidData = this.getProvinceCovidData.bind(this);

        // this.onClickGetCovidWorldData = this.onClickGetCovidWorldData.bind(this);
        this.onClickShowRegions = this.onClickShowRegions.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.compareValues = this.compareValues.bind(this);
        this.numberWithCommas = this.numberWithCommas.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.search = this.search.bind(this);
        this.quickFactsChart = this.quickFactsChart.bind(this);
        this.compareToWorldChart = this.compareToWorldChart.bind(this);
        this.totalCasesChart = this.totalCasesChart.bind(this);
        this.newCasesChart = this.newCasesChart.bind(this);
        this.totalDeathsChart = this.totalDeathsChart.bind(this);
        this.newDeathsChart = this.newDeathsChart.bind(this);
        this.onload = this.onload.bind(this);
        this.countDown = this.countDown.bind(this);

    }

    async componentDidMount() {
        await this.props.getAllCountriesDataNameOrdered();
        await this.getProvinceCovidData();
    }

    async componentDidUpdate(prevProps) {
        let { countryName } = this.props.match.params;
        document.title = `${countryName} Coronavirus table of statistical data and charts - vaccovid.live`;

        // this.props.history.listen(async (location, action) => {
        //     console.log("on route change");
        //     await this.getProvinceCovidData();
        // });
        if (this.state.iso !== this.props.match.params.iso) {
            this.setState({ iso: this.props.match.params.iso })
            await this.getProvinceCovidData();
            // setTimeout(() => {
            // }, 8000);
            // console.log("happens");
        }

        if (this.props.ovidData.length > 1) {
            this.onload();
            // console.log(this.props.ovidData);
            this.quickFactsChart(this.props.countryISOBased);
            this.compareToWorldChart(this.props.countryISOBased, this.props.world);

            this.totalCasesChart(this.props.ovidData);
            this.newCasesChart(this.props.ovidData);
            this.totalDeathsChart(this.props.ovidData);
            this.newDeathsChart(this.props.ovidData);
            // console.log("ovid");
        }

        // if (
        //     this.props.countryISOBased !== prevProps.countryISOBased
        //     && (this.props.world.length > 0 || this.props.world !== prevProps.world)
        //     && (this.props.ovidData.length > 0 || this.props.ovidData !== prevProps.ovidData)
        // ) {
        //     // this.setState({ data: this.props.countryISOBased, world: this.props.world });

        //     this.quickFactsChart(this.props.countryISOBased);
        //     this.compareToWorldChart(this.props.countryISOBased, this.props.world);

        //     this.totalCasesChart(this.props.ovidData);
        //     this.newCasesChart(this.props.ovidData);
        //     this.totalDeathsChart(this.props.ovidData);
        //     this.newDeathsChart(this.props.ovidData);
        // }
    }

    async componentWillUnmount() {
    }

    async getProvinceCovidData() {
        let iso, countryName;
        if (this.state.iso !== this.props.match.params.iso) {
            iso = this.props.match.params.iso;
            countryName = this.props.match.params.countryName;
            // await this.props.getAllCountriesDataNameOrdered();

            await this.props.clearOvidData();

            await this.props.getWorldData();
            await this.props.getOvidData(iso.toUpperCase());
            await this.props.getCountryISOBased(countryName, iso.toUpperCase());
            await this.props.getProvinceReportISOBased(iso.toUpperCase());
            // await this.props.getCitiesReportISOBased(iso.toUpperCase());

            this.setState({ iso: iso });
        } else if (this.props.match.params === null || this.props.match.params === undefined) {
        }
    }

    // async onClickGetDynamicCovidData() {

    //     await this.props.getAllCountriesDataNameOrdered();

    //     let continentName;
    //     if (this.props.match.params) {
    //         continentName = this.props.match.params.continentName;
    //     } else if (this.props.match.params === null || this.props.match.params === undefined) {
    //         await this.props.getAllCountriesData();
    //         await this.props.getWorldData();
    //     }

    //     if (continentName === 'World') {
    //         // base url
    //         await this.props.getAllCountriesData();
    //         await this.props.getWorldData();
    //     } else if (continentName === 'Asia') {
    //         await this.props.getAsiaCountriesData();
    //     } else if (continentName === 'Africa') {
    //         await this.props.getAfricaCountriesData();
    //     } else if (continentName === 'Europe') {
    //         await this.props.getEuropeCountriesData();
    //     } else if (continentName === 'North America') {
    //         await this.props.getNorthAmericaCountriesData();
    //     } else if (continentName === 'South America') {
    //         await this.props.getSouthAmericaCountriesData();
    //     } else if (continentName === 'Australia/Oceania') {
    //         await this.props.getAustraliaOceaniaCountriesData();
    //     }
    // };

    // async onClickGetCovidWorldData() {
    //     this.setState({ active_btn: "world" });
    //     await this.props.getAllCountriesData();
    //     await this.props.getAllCountriesDataNameOrdered();
    //     await this.props.getWorldData();
    //     // const allNews = this.props.news.news;
    //     // console.log(this.state.news); // it still returens old data (previous state)
    // };


    countDown(duration, display) {
        var timer = duration, minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                timer = duration;
            }
        }, 1000);
    }

    onload() {
        if (this.props.eachCountryProvinces !== null && this.props.eachCountryProvinces !== undefined && this.props.eachCountryProvinces.length > 1) {
            let fiveMinutes = 60 * 5,
                display = document.querySelector('#time');
            if (display !== null) {
                this.countDown(fiveMinutes, display);
            }
        }
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
            else if (element === "countryTable") {
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
        let table = document.getElementById("countryTable");
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


    quickFactsChart(data) {
        let ctx = document.getElementById('quick-facts-chart');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['TotalRecovered', 'ActiveCases', 'Serious_Critical', 'TotalDeaths'],
                datasets: [{
                    label: '# of Votes',
                    data:
                        data[0] !== undefined ?
                            [
                                data[0].TotalRecovered,
                                data[0].ActiveCases,
                                data[0].Serious_Critical,
                                data[0].TotalDeaths
                            ]
                            : [0, 0, 0, 0]
                    ,
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 99, 132, 0.6)',
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                animation: {
                    duration: 0 // general animation time
                },
                // events: ['click'],
                title: {
                    display: true,
                    text: "The condition of all cases in the country",
                    fontColor: 'white'
                },
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                        fontColor: 'white'
                    }
                },
                defaultFontSize: 12,
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: 'white',
                            beginAtZero: true,
                        }
                    }]
                }
            }
        });
        Chart.defaults.global.defaultFontColor = '#eee';
    }

    compareToWorldChart(data, worldData) {
        let ctx = document.getElementById('compare-to-world-chart');
        new Chart(ctx, {
            // type: 'pie',
            type: 'bar',
            data: {
                labels: ['Total Cases', 'Active Cases', 'Serious Critical', 'Total Deaths', 'Total Recovered'],
                datasets: [
                    {
                        label: 'Country percentage',
                        data:
                            data[0] !== undefined ?
                                [
                                    ((data[0].TotalCases / data[0].Population) * 100).toFixed(3),
                                    ((data[0].ActiveCases / data[0].Population) * 100).toFixed(3),
                                    ((data[0].Serious_Critical / data[0].Population) * 100).toFixed(3),
                                    ((data[0].TotalDeaths / data[0].Population) * 100).toFixed(3),
                                    ((data[0].TotalRecovered / data[0].Population) * 100).toFixed(3),
                                ]
                                : [0, 0, 0, 0, 0],
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                        ],
                        borderWidth: 1,
                        fontColor: '#eee',
                    }, {
                        label: 'World percentage',
                        data:
                            worldData[0] !== undefined ?
                                [
                                    ((worldData[0].TotalCases / 7782884635) * 100).toFixed(3),
                                    ((worldData[0].ActiveCases / 7782884635) * 100).toFixed(3),
                                    ((worldData[0].Serious_Critical / 7782884635) * 100).toFixed(3),
                                    ((worldData[0].TotalDeaths / 7782884635) * 100).toFixed(3),
                                    ((worldData[0].TotalRecovered / 7782884635) * 100).toFixed(3),
                                ] : [0, 0, 0, 0, 0],
                        backgroundColor: [
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                        ],
                        borderColor: [
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 1,
                        // borderSkipped: 'top',
                        type: 'bar'
                    }
                ]
            },
            options: {
                animation: {
                    duration: 0 // general animation time
                },
                // events: [],
                title: {
                    display: true,
                    text: "The comparison of country data/its population and the world data/its population"
                },
                tooltips: {
                    enabled: true,
                },
                labels: {
                },
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                    }
                },
                defaultFontSize: 12,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                        }
                    }]
                }
            }
        });

        Chart.defaults.global.defaultFontColor = '#eee';
    }

    totalCasesChart(data) {
        const totalCases = [];
        data.forEach(e => {
            let eachDayDeaths = {};
            eachDayDeaths.x = e.date;
            eachDayDeaths.y = e.total_cases;
            totalCases.push(eachDayDeaths);
        });
        let ctx = document.getElementById('total-cases-chart');
        new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [
                    {
                        label: 'Total Cases',
                        data: totalCases
                        ,
                        backgroundColor: [
                            '#19dac079'
                        ],
                        borderColor: [
                            '#19dac0'
                        ],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                animation: {
                    duration: 0 // general animation time
                },
                // events: [],
                title: {
                    display: true,
                    text: "Total Cases of the country for last six months"
                },
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                    }
                },
                elements: {
                    line: {
                        // borderWidth: 3,
                        // fill: false
                    },
                    point: {
                        backgroundColor: "#19dac0",
                    },
                },
                defaultFontSize: 12,
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'week'
                        }
                    }]
                }
            }
        });
        Chart.defaults.global.defaultFontColor = '#eee';
    }

    newCasesChart(data) {
        const newCases = [];
        data.forEach(e => {
            let eachDayDeaths = {};
            eachDayDeaths.x = e.date;
            eachDayDeaths.y = e.new_cases;
            newCases.push(eachDayDeaths);
        });
        // console.log(newCases);
        let ctx = document.getElementById('new-cases-chart');
        new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [
                    {
                        label: 'New Cases',
                        data: newCases
                        ,
                        backgroundColor: [
                            '#19dac079'
                        ],
                        borderColor: [
                            '#19dac0'
                        ],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                animation: {
                    duration: 0 // general animation time
                },
                // events: [],
                title: {
                    display: true,
                    text: "New Cases of the country for last six months"
                },
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                    }
                },
                elements: {
                    line: {
                        // borderWidth: 3,
                        // fill: false
                    },
                    point: {
                        backgroundColor: "#19dac0",
                    },
                },
                defaultFontSize: 12,
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'week'
                        }
                    }]
                }
            }
        });
        Chart.defaults.global.defaultFontColor = '#eee';
    }

    totalDeathsChart(data) {
        const totalDeaths = [];
        data.forEach(e => {
            let eachDayDeaths = {};
            eachDayDeaths.x = e.date;
            eachDayDeaths.y = e.total_deaths;
            totalDeaths.push(eachDayDeaths);
        });
        let ctx = document.getElementById('total-deaths-chart');
        new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [
                    {
                        label: 'Total Deaths',
                        data: totalDeaths
                        ,
                        backgroundColor: [
                            '#f62a6783',
                        ],
                        borderColor: [
                            '#f62a66',
                        ],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                animation: {
                    duration: 0 // general animation time
                },
                // events: [],
                title: {
                    display: true,
                    text: "Total Deaths of the country for last six months"
                },
                elements: {
                    line: {
                        // borderWidth: 3,
                        // fill: false
                    },
                    point: {
                        backgroundColor: "#f62a66",
                    },
                },
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                    }
                },
                defaultFontSize: 12,
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'week'
                        }
                    }]
                }
            }
        });
        Chart.defaults.global.defaultFontColor = '#eee';
    }

    newDeathsChart(data) {
        const newDeaths = [];
        data.forEach(e => {
            let eachDayDeaths = {};
            eachDayDeaths.x = e.date;
            eachDayDeaths.y = e.new_deaths;
            newDeaths.push(eachDayDeaths);
        });
        let ctx = document.getElementById('new-deaths-chart');
        new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [
                    {
                        label: 'New Deaths',
                        data: newDeaths
                        ,
                        backgroundColor: [
                            '#f62a6783',
                        ],
                        borderColor: [
                            '#f62a66',
                        ],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                animation: {
                    duration: 0 // general animation time
                },
                // events: [],
                title: {
                    display: true,
                    text: "New Deaths of the country for last six months"
                },
                legend: {

                    labels: {
                        // This more specific font property overrides the global property
                    }
                },
                defaultFontSize: 12,
                elements: {
                    line: {
                        // borderWidth: 3,
                        // fill: false
                    },
                    point: {
                        backgroundColor: "#f62a66",
                    },
                },
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'week'
                        },
                        gridLines: {
                            // color: "#00293559"
                        },
                    }],
                    yAxes: [{
                        gridLines: {
                            // color: "#00293559"
                        },
                    }]
                }
            }
        });
        Chart.defaults.global.defaultFontColor = '#eee';
    }

    render() {
        let { countriesNameOrdered } = this.props;
        let { countryISOBased } = this.props;
        let { eachCountryProvinces } = this.props;
        // let { eachCountryCities } = this.props;
        let { ovidData } = this.props;

        let { continentName } = this.props.match.params; // url parameteres
        let url_state = this.props.match.params;       // url parameteres
        // let url_state = this.props.location.state;       // url passing state

        // let { iso } = this.props.match.params; // url parameteres
        // let { iso } = this.props.location.params; // state parameteres

        // if (window.location.pathname === "/covid-19" || window.location.pathname === "/covid-19/" || url_state === undefined) {
        //     return <Redirect to={{ pathname: `/covid-19/world-data`, state: { continentName: 'World' } }} push />
        // }

        if (url_state.iso === null || url_state.iso === undefined || url_state.countryName === null || url_state.countryName === undefined) {
            return <Redirect to={{ pathname: '/not-found' }} push />
            // this.props.history.push('/not-found')
        }

        const trimString = (str) => {
            str = str.replace(/\s+/g, '-');
            return str;
        }

        const orderConfirmed = () => {
            // console.log(eachCountryProvinces);
            // if (eachCountryProvinces.province !== "Grand Princess" && eachCountryProvinces.province !== "Recovered" && eachCountryProvinces.province !== "Diamond Princess"){
            // if (eachCountryProvinces.reports.length > 0) {
            if (this.state.firstTimeOrdering === true) {
                // eachCountryProvinces.reports[0] = eachCountryProvinces.sort(this.compareValues('confirmed', 'asc'));
                eachCountryProvinces = eachCountryProvinces.sort(this.compareValues('confirmed', 'asc'));
                this.setState({ order: 'asc' })
                this.setState({ order_kind: 'confirmed' })
                this.setState({ firstTimeOrdering: false })
            } else if (this.state.order_kind !== 'confirmed') {
                // eachCountryProvinces.reports[0] = eachCountryProvinces.sort(this.compareValues('confirmed', 'desc'));
                eachCountryProvinces = eachCountryProvinces.sort(this.compareValues('confirmed', 'desc'));
                this.setState({ activeTitle: 'confirmed' })
                this.setState({ order: 'desc' })
                this.setState({ order_kind: 'confirmed' })
            } else if (this.state.order_kind === 'confirmed') {
                this.setState({ activeTitle: 'confirmed' })
                if (this.state.order === 'desc') {
                    // eachCountryProvinces.reports[0] = eachCountryProvinces.sort(this.compareValues('confirmed', 'asc'));
                    eachCountryProvinces = eachCountryProvinces.sort(this.compareValues('confirmed', 'asc'));
                    this.setState({ order: 'asc' })
                } else if (this.state.order === 'asc') {
                    // eachCountryProvinces.reports[0] = eachCountryProvinces.sort(this.compareValues('confirmed', 'desc'));
                    eachCountryProvinces = eachCountryProvinces.sort(this.compareValues('confirmed', 'desc'));
                    this.setState({ order: 'desc' })
                }
            }
            // }
        }

        const orderName = () => {
            if (this.state.order_kind !== 'name') {
                eachCountryProvinces = eachCountryProvinces.sort(this.compareValues('province', 'asc'));
                this.setState({ activeTitle: 'province' })
                this.setState({ order: 'asc' })
                this.setState({ order_kind: 'name' })
                this.setState({ firstTimeOrdering: false })
            } else if (this.state.order_kind === 'name') {
                this.setState({ activeTitle: 'province' })
                if (this.state.order === 'desc') {
                    eachCountryProvinces = eachCountryProvinces.sort(this.compareValues('province', 'asc'));
                    this.setState({ order: 'asc' })
                } else if (this.state.order === 'asc') {
                    eachCountryProvinces = eachCountryProvinces.sort(this.compareValues('province', 'desc'));
                    this.setState({ order: 'desc' })
                }
            }
        }

        const orderStats = (titleName, orderBase) => {
            if (this.state.order_kind !== titleName) {
                this.setState({ activeTitle: orderBase })
                eachCountryProvinces = eachCountryProvinces.sort(this.compareValues(orderBase, 'desc'));
                this.setState({ order: 'desc' })
                this.setState({ order_kind: titleName })
                this.setState({ firstTimeOrdering: false })
            } else if (this.state.order_kind === titleName) {
                this.setState({ activeTitle: orderBase })
                if (this.state.order === 'desc') {
                    eachCountryProvinces = eachCountryProvinces.sort(this.compareValues(orderBase, 'asc'));
                    this.setState({ order: 'asc' })
                } else if (this.state.order === 'asc') {
                    eachCountryProvinces = eachCountryProvinces.sort(this.compareValues(orderBase, 'desc'));
                    this.setState({ order: 'desc' })
                }
            }
        }

        // const orderCitiesName = () => {
        //     if (this.state.order_cities_kind !== 'name') {
        //         eachCountryCities = eachCountryCities.sort(this.compareValues('name', 'asc'));
        //         this.setState({ activeTitle: 'cities' })
        //         this.setState({ order: 'asc' })
        //         this.setState({ order_cities_kind: 'name' })
        //         this.setState({ firstTimeOrdering: false })
        //     } else if (this.state.order_cities_kind === 'name') {
        //         this.setState({ activeTitle: 'cities' })
        //         if (this.state.order === 'desc') {
        //             eachCountryCities = eachCountryCities.sort(this.compareValues('name', 'asc'));
        //             this.setState({ order: 'asc' })
        //         } else if (this.state.order === 'asc') {
        //             eachCountryCities = eachCountryCities.sort(this.compareValues('name', 'desc'));
        //             this.setState({ order: 'desc' })
        //         }
        //     }
        // }

        // const orderCitiesStats = (titleName, orderBase) => {
        //     if (this.state.order_kind !== titleName) {
        //         this.setState({ activeTitle: orderBase })
        //         eachCountryCities = eachCountryCities.sort(this.compareValues(orderBase, 'desc'));
        //         this.setState({ order: 'desc' })
        //         this.setState({ order_kind: titleName })
        //         this.setState({ firstTimeOrdering: false })
        //     } else if (this.state.order_kind === titleName) {
        //         this.setState({ activeTitle: orderBase })
        //         if (this.state.order === 'desc') {
        //             eachCountryCities = eachCountryCities.sort(this.compareValues(orderBase, 'asc'));
        //             this.setState({ order: 'asc' })
        //         } else if (this.state.order === 'asc') {
        //             eachCountryCities = eachCountryCities.sort(this.compareValues(orderBase, 'desc'));
        //             this.setState({ order: 'desc' })
        //         }
        //     }
        // }

        return url_state
            &&
            // eachCountryProvinces !== undefined &&
            ovidData.length > 1
            ? (
                <div>
                    <div className={`country ${eachCountryProvinces !== undefined ?
                        eachCountryProvinces.length > 1 ? "country-withProvince" : ""
                        : ""
                        }`}>
                        <div className="country-btnAndTitle">
                            <button className="country-btnAndTitle-btn" onClick={this.onClickShowRegions}>Choose Your Region &#9662;</button>
                            {/* <h1 className="country-regions-name">SOUTH AMERICA</h1> */}
                            <h1 className="country-btnAndTitle-title">{url_state.countryName.toUpperCase()}</h1>
                        </div>

                        <div className={`country-responsive ${this.state.showRegions === "off" ? "take_underground" : ""}`}>
                            <button className="country-responsive-close_btn" onClick={this.onClickShowRegions}></button>
                            <ul className={`country-responsive-allregions`} id="region">
                                <h2 className={`country-responsive-allregions-title`}>Continents</h2>
                                {/* <Link to="/covid-19/world-data" className={`country-responsive-allregions-btn ${this.state.active_btn === "world" ? "country-responsive-allregions-btn-active" : ""}`}>World</Link> */}
                                <Link to={{ pathname: `/covid-19/world-data`, state: { continentName: 'World' } }} onClick={async () => { await this.props.getAllCountriesData(); await this.props.getWorldData(); this.onClickShowRegions(); }} className={`country-responsive-allregions-btn ${continentName === "world-data" ? "country-responsive-allregions-btn-active" : ""}`}>World</Link>
                                <Link to={{ pathname: `/covid-19/asia-data`, state: { continentName: 'Asia' } }} onClick={async () => { await this.props.getAsiaCountriesData(); this.onClickShowRegions(); }} className={`country-responsive-allregions-btn ${continentName === "asia-data" ? "country-responsive-allregions-btn-active" : ""}`} >Asia</Link>
                                {/* <Link to={{ pathname: `/covid-19/asia-data`, state: { continentName: 'Asia' } }} onClick={() => continentBasedCountries('Asia')} className={`country-responsive-allregions-btn ${continentName === "asia-data" ? "country-responsive-allregions-btn-active" : ""}`} >Asia</Link> */}
                                <Link to={{ pathname: `/covid-19/africa-data`, state: { continentName: 'Africa' } }} onClick={async () => { this.props.getAfricaCountriesData(); this.onClickShowRegions(); }} className={`country-responsive-allregions-btn ${continentName === "africa-data" ? "country-responsive-allregions-btn-active" : ""}`}>Africa</Link>
                                <Link to={{ pathname: `/covid-19/australia-data`, state: { continentName: 'Australia/Oceania' } }} onClick={async () => { this.props.getAustraliaOceaniaCountriesData(); this.onClickShowRegions(); }} className={`country-responsive-allregions-btn ${continentName === "australia-data" ? "country-responsive-allregions-btn-active" : ""}`}>Australia</Link>
                                <Link to={{ pathname: `/covid-19/europe-data`, state: { continentName: 'Europe' } }} onClick={async () => { this.props.getEuropeCountriesData(); this.onClickShowRegions(); }} className={`country-responsive-allregions-btn ${continentName === "europe-data" ? "country-responsive-allregions-btn-active" : ""}`}>Europe</Link>
                                <Link to={{ pathname: `/covid-19/north-america-data`, state: { continentName: 'North America' } }} onClick={async () => { this.props.getNorthAmericaCountriesData(); this.onClickShowRegions(); }} className={`country-responsive-allregions-btn ${continentName === "north-america-data" ? "country-responsive-allregions-btn-active" : ""}`}>North America</Link>
                                <Link to={{ pathname: `/covid-19/south-america-data`, state: { continentName: 'South America' } }} onClick={async () => { this.props.getSouthAmericaCountriesData(); this.onClickShowRegions(); }} className={`country-responsive-allregions-btn ${continentName === "south-america-data" ? "country-responsive-allregions-btn-active" : ""}`}>South America</Link>
                                <Link to={{ pathname: `/covid-19/oceania-data`, state: { continentName: 'Australia/Oceania' } }} onClick={async () => { this.props.getAustraliaOceaniaCountriesData(); this.onClickShowRegions(); }} className={`country-responsive-allregions-btn ${continentName === "oceania-data" ? "country-responsive-allregions-btn-active" : ""}`}>Oceania</Link>

                                <h2 className={`coronavirus-responsive-allregions-title`}>Most Viewd</h2>
                                <Link to={{
                                    pathname: `/covid-19/USA/USA`, state: { iso: 'usa', countryName: 'USA' }
                                }} onClick={async () => { await this.props.getCountryISOBased('USA', 'USA'); await this.props.getProvinceReportISOBased('USA'); this.onClickShowRegions(); }} className={`country-responsive-allregions-btn 
                            ${'USA' === this.props.match.params.iso ? "country-responsive-allregions-btn-active" : ""}`}>United States</Link>

                                <Link to={{
                                    pathname: `/covid-19/Canada/CAN`, state: { iso: 'can', countryName: 'Canada' }
                                }} onClick={async () => { await this.props.getCountryISOBased('Canada', 'CAN'); await this.props.getProvinceReportISOBased('CAN'); this.onClickShowRegions(); }} className={`country-responsive-allregions-btn 
                            ${'CAN' === this.props.match.params.iso ? "country-responsive-allregions-btn-active" : ""}`}>Canada</Link>

                                <Link to={{
                                    pathname: `/covid-19/Australia/AUS`, state: { iso: 'aus', countryName: 'Australia' }
                                }} onClick={async () => { await this.props.getCountryISOBased('Australia', 'AUS'); await this.props.getProvinceReportISOBased('AUS'); this.onClickShowRegions(); }} className={`country-responsive-allregions-btn 
                            ${'AUS' === this.props.match.params.iso ? "country-responsive-allregions-btn-active" : ""}`}>Australia</Link>

                                <Link to={{
                                    pathname: `/covid-19/UK/GBR`, state: { iso: 'gbr', countryName: 'UK' }
                                }} onClick={async () => { await this.props.getCountryISOBased('UK', 'GBR'); await this.props.getProvinceReportISOBased('GBR'); this.onClickShowRegions(); }} className={`country-responsive-allregions-btn 
                            ${'GBR' === this.props.match.params.iso ? "country-responsive-allregions-btn-active" : ""}`}>United Kingdom</Link>

                                <Link to={{
                                    pathname: `/covid-19/India/IND`, state: { iso: 'ind', countryName: 'India' }
                                }} onClick={async () => { await this.props.getCountryISOBased('India', 'IND'); await this.props.getProvinceReportISOBased('IND'); this.onClickShowRegions(); }} className={`country-responsive-allregions-btn 
                            ${'IND' === this.props.match.params.iso ? "country-responsive-allregions-btn-active" : ""}`}>India</Link>

                                <h2 className={`country-responsive-allregions-title`}>Countries</h2>
                                {countriesNameOrdered.length > 0 ? countriesNameOrdered.map((country, index) => {
                                    return <Link to={{
                                        pathname: `/covid-19/${trimString(country.Country)}/${country.ThreeLetterSymbol.toUpperCase()}`, state: { iso: country.ThreeLetterSymbol, countryName: country.Country }
                                    }} onClick={async () => { await this.props.getCountryISOBased(country.Country, country.ThreeLetterSymbol.toUpperCase()); await this.props.getProvinceReportISOBased(country.ThreeLetterSymbol.toUpperCase()); this.onClickShowRegions(); }} key={index} className={`country-responsive-allregions-btn 
                            ${country.ThreeLetterSymbol.toUpperCase() === this.props.match.params.iso ? "country-responsive-allregions-btn-active" : ""}`}>
                                        {country.Country}
                                    </Link>
                                }) : (
                                        <div>
                                            <div className={`country-responsive-allregions-btn`}>Loading</div>
                                        </div>
                                    )
                                }
                            </ul>
                        </div>

                        <ul className="country-regions" id="region"
                            ref={this.regionRef}
                            // onScroll={this.onScroll('region')}
                            // ref={this.myRef}
                            onScroll={() => this.onScroll('region')}

                        >
                            <h2 className={`country-regions-title`}>Continents</h2>
                            <Link to={{ pathname: `/covid-19/world-data`, state: { continentName: 'World' } }} onClick={async () => { await this.props.getAllCountriesData(); await this.props.getWorldData(); }} className={`country-regions-btn ${continentName === "world-data" ? "country-regions-btn-active" : ""}`}>World</Link>
                            <Link to={{ pathname: `/covid-19/asia-data`, state: { continentName: 'Asia' } }} onClick={async () => { await this.props.getAsiaCountriesData(); }} className={`country-regions-btn ${continentName === "asia-data" ? "country-regions-btn-active" : ""}`} >Asia</Link>
                            <Link to={{ pathname: `/covid-19/africa-data`, state: { continentName: 'Africa' } }} onClick={async () => { this.props.getAfricaCountriesData(); }} className={`country-regions-btn ${continentName === "africa-data" ? "country-regions-btn-active" : ""}`}>Africa</Link>
                            <Link to={{ pathname: `/covid-19/australia-data`, state: { continentName: 'Australia/Oceania' } }} onClick={async () => { this.props.getAustraliaOceaniaCountriesData(); }} className={`country-regions-btn ${continentName === "australia-data" ? "country-regions-btn-active" : ""}`}>Australia</Link>
                            <Link to={{ pathname: `/covid-19/europe-data`, state: { continentName: 'Europe' } }} onClick={async () => { this.props.getEuropeCountriesData(); }} className={`country-regions-btn ${continentName === "europe-data" ? "country-regions-btn-active" : ""}`}>Europe</Link>
                            <Link to={{ pathname: `/covid-19/north-america-data`, state: { continentName: 'North America' } }} onClick={async () => { this.props.getNorthAmericaCountriesData(); }} className={`country-regions-btn ${continentName === "north_america-data" ? "country-regions-btn-active" : ""}`}>North America</Link>
                            <Link to={{ pathname: `/covid-19/south_america-data`, state: { continentName: 'South America' } }} onClick={async () => { this.props.getSouthAmericaCountriesData(); }} className={`country-regions-btn ${continentName === "south_america-data" ? "country-regions-btn-active" : ""}`}>South America</Link>
                            <Link to={{ pathname: `/covid-19/oceania-data`, state: { continentName: 'Australia/Oceania' } }} onClick={async () => { this.props.getAustraliaOceaniaCountriesData(); }} className={`country-regions-btn ${continentName === "oceania-data" ? "country-regions-btn-active" : ""}`}>Oceania</Link>

                            <h2 className={`country-regions-title`}>Most Viewd</h2>
                            <Link to={{
                                pathname: `/covid-19/USA/USA`, state: { iso: 'usa', countryName: 'USA' }
                            }} onClick={async () => { this.getProvinceCovidData(); }}
                                className={`country-regions-btn ${'USA' === this.props.match.params.iso ? "country-regions-btn-active" : ""}`}>United States</Link>

                            <Link to={{
                                pathname: `/covid-19/Canada/CAN`, state: { iso: 'can', countryName: 'Canada' }
                            }} onClick={async () => { this.getProvinceCovidData(); }}
                                className={`country-regions-btn ${'CAN' === this.props.match.params.iso ? "country-regions-btn-active" : ""}`}>Canada</Link>

                            <Link to={{
                                pathname: `/covid-19/Australia/AUS`, state: { iso: 'aus', countryName: 'Australia' }
                            }} onClick={async () => { this.getProvinceCovidData(); }}
                                className={`country-regions-btn ${'AUS' === this.props.match.params.iso ? "country-regions-btn-active" : ""}`}>Australia</Link>

                            <Link to={{
                                pathname: `/covid-19/UK/GBR`, state: { iso: 'gbr', countryName: 'UK' }
                            }} onClick={async () => { this.getProvinceCovidData(); }}
                                className={`country-regions-btn ${'GBR' === this.props.match.params.iso ? "country-regions-btn-active" : ""}`}>United Kingdom</Link>

                            <Link to={{
                                pathname: `/covid-19/India/IND`, state: { iso: 'ind', countryName: 'India' }
                            }} onClick={async () => { this.getProvinceCovidData(); }}
                                className={`country-regions-btn ${'IND' === this.props.match.params.iso ? "country-regions-btn-active" : ""}`}>India</Link>


                            <h2 className={`country-regions-title`}>Countries</h2>
                            {countriesNameOrdered.length > 0 ? countriesNameOrdered.map((country, index) => {
                                return <Link to={{
                                    pathname: `/covid-19/${trimString(country.Country)}/${country.ThreeLetterSymbol.toUpperCase()}`, state: { iso: country.ThreeLetterSymbol, countryName: country.Country }
                                }}
                                    // onClick={async () => { await this.props.getCountryISOBased(url_state.countryName, url_state.iso.toUpperCase()); await this.props.getProvinceReportISOBased(url_state.iso.toUpperCase()); }}
                                    onClick={async () => { this.getProvinceCovidData(); }}
                                    key={index} className={`country-regions-btn ${country.ThreeLetterSymbol.toUpperCase() === this.props.match.params.iso ? "country-regions-btn-active" : ""}`}>{country.Country}</Link>
                            }) : (
                                    <div>
                                        {/* <div className={`country-regions-btn country-regions-btn-loading`}></div> */}
                                        <div className={`country-regions-btn country-regions-btn-loading loading`}></div>
                                        <div className={`country-regions-btn country-regions-btn-loading loading`}></div>
                                        <div className={`country-regions-btn country-regions-btn-loading loading`}></div>
                                        <div className={`country-regions-btn country-regions-btn-loading loading`}></div>
                                        <div className={`country-regions-btn country-regions-btn-loading loading`}></div>
                                        <div className={`country-regions-btn country-regions-btn-loading loading`}></div>
                                        <div className={`country-regions-btn country-regions-btn-loading loading`}></div>
                                        <div className={`country-regions-btn country-regions-btn-loading loading`}></div>
                                        <div className={`country-regions-btn country-regions-btn-loading loading`}></div>
                                        <div className={`country-regions-btn country-regions-btn-loading loading`}></div>
                                    </div>
                                )
                            }
                        </ul>

                        {/* flag and name */}
                        {/* country data just like quick facts */}
                        {
                            countryISOBased.length > 0 ? countryISOBased.map((country, index) => {
                                return (
                                    <div key={index} className="country-name_and_flag">
                                        <h1 className="country-name_and_flag-name">{countryISOBased.length > 0 ? countryISOBased[0].Country.toUpperCase() : "Loading"}</h1>
                                        <ul className="country-name_and_flag-stats">
                                            <li className="country-name_and_flag-stats-number"><span className="country-name_and_flag-stats-number-left">Total Cases: </span><span className="country-name_and_flag-stats-number-right country-name_and_flag-stats-number-TotalCases">{countryISOBased[0].TotalCases !== null && countryISOBased[0].TotalCases !== undefined ? this.numberWithCommas(countryISOBased[0].TotalCases) : "No Data"}</span></li>
                                            <li className="country-name_and_flag-stats-number"><span className="country-name_and_flag-stats-number-left">Total Deaths: </span><span className="country-name_and_flag-stats-number-right country-name_and_flag-stats-number-TotalDeaths">{countryISOBased[0].TotalDeaths !== null && countryISOBased[0].TotalDeaths !== undefined ? this.numberWithCommas(countryISOBased[0].TotalDeaths) : "No Data"}</span></li>
                                            <li className="country-name_and_flag-stats-number"><span className="country-name_and_flag-stats-number-left">New Cases: </span><span className="country-name_and_flag-stats-number-right country-name_and_flag-stats-number-NewCases">{countryISOBased[0].NewCases !== null && countryISOBased[0].NewCases !== undefined ? this.numberWithCommas(countryISOBased[0].NewCases) : "No Data"}</span></li>
                                            <li className="country-name_and_flag-stats-number"><span className="country-name_and_flag-stats-number-left">New Deaths: </span><span className="country-name_and_flag-stats-number-right country-name_and_flag-stats-number-NewDeaths">{countryISOBased[0].NewDeaths !== null && countryISOBased[0].NewDeaths !== undefined ? this.numberWithCommas(countryISOBased[0].NewDeaths) : "No Data"}</span></li>
                                            <li className="country-name_and_flag-stats-number"><span className="country-name_and_flag-stats-number-left">Infection Risk: </span><span className="country-name_and_flag-stats-number-right country-name_and_flag-stats-number-Infection_Risk">{countryISOBased[0].Infection_Risk !== null && countryISOBased[0].Infection_Risk !== undefined ? this.numberWithCommas(countryISOBased[0].Infection_Risk) + "%" : "No Data"}</span></li>
                                            <li className="country-name_and_flag-stats-number"><span className="country-name_and_flag-stats-number-left">Case Fatality Rate: </span><span className="country-name_and_flag-stats-number-right country-name_and_flag-stats-number-Case_Fatality_Rate">{countryISOBased[0].Case_Fatality_Rate !== null && countryISOBased[0].Case_Fatality_Rate !== undefined ? this.numberWithCommas(countryISOBased[0].Case_Fatality_Rate) + "%" : "No Data"}</span></li>
                                            <li className="country-name_and_flag-stats-number"><span className="country-name_and_flag-stats-number-left">Active Cases: </span><span className="country-name_and_flag-stats-number-right country-name_and_flag-stats-number-ActiveCases">{countryISOBased[0].ActiveCases !== null && countryISOBased[0].ActiveCases !== 0 && countryISOBased[0].ActiveCases !== undefined ? this.numberWithCommas(countryISOBased[0].ActiveCases) : "No Data"}</span></li>
                                            <li className="country-name_and_flag-stats-number"><span className="country-name_and_flag-stats-number-left">Total Tests: </span><span className="country-name_and_flag-stats-number-right country-name_and_flag-stats-number-TotalTests">{countryISOBased[0].TotalTests !== null && countryISOBased[0].TotalTests !== undefined ? this.numberWithCommas(countryISOBased[0].TotalTests) : "No Data"}</span></li>
                                            <li className="country-name_and_flag-stats-number"><span className="country-name_and_flag-stats-number-left">Serious Critical: </span><span className="country-name_and_flag-stats-number-right country-name_and_flag-stats-number-Serious_Critical">{countryISOBased[0].Serious_Critical !== null && countryISOBased[0].Serious_Critical !== undefined ? this.numberWithCommas(countryISOBased[0].Serious_Critical) : "No Data"}</span></li>
                                            <li className="country-name_and_flag-stats-number"><span className="country-name_and_flag-stats-number-left">Test Percentage: </span><span className="country-name_and_flag-stats-number-right country-name_and_flag-stats-number-Test_Percentage">{countryISOBased[0].Test_Percentage !== null && countryISOBased[0].Test_Percentage !== undefined ? this.numberWithCommas(countryISOBased[0].Test_Percentage) + "%" : "No Data"}</span></li>
                                            <li className="country-name_and_flag-stats-number"><span className="country-name_and_flag-stats-number-left">Total Recovered: </span><span className="country-name_and_flag-stats-number-right country-name_and_flag-stats-number-TotalRecovered">{countryISOBased[0].TotalRecovered !== null && countryISOBased[0].TotalRecovered !== 0 && countryISOBased[0].TotalRecovered !== "0" && countryISOBased[0].TotalRecovered !== undefined ? this.numberWithCommas(countryISOBased[0].TotalRecovered) : "No Data"}</span></li>
                                            <li className="country-name_and_flag-stats-number"><span className="country-name_and_flag-stats-number-left">Recovery Proporation: </span><span className="country-name_and_flag-stats-number-right country-name_and_flag-stats-number-Recovery_Proporation">{countryISOBased[0].Recovery_Proporation !== null && countryISOBased[0].Recovery_Proporation !== 0 && countryISOBased[0].Recovery_Proporation !== undefined ? this.numberWithCommas(countryISOBased[0].Recovery_Proporation) + "%" : "No Data"}</span></li>
                                        </ul>
                                        <div className="country-name_and_flag-cover"></div>
                                        <img className="country-name_and_flag-flag" src={`${require(`./../../views/flags/${country.TwoLetterSymbol.toLowerCase()}.svg`) ?
                                            require(`./../../views/flags/${country.TwoLetterSymbol.toLowerCase()}.svg`) :
                                            require(`./../../views/flags/us.svg`)}`} alt="" />
                                    </div>
                                )
                            }) : (
                                    <div>Image is loading ...</div>
                                )
                        }


                        {

                        }
                        {/* provinces if exist */}
                        {
                            // eachCountryProvinces === undefined ?
                            eachCountryProvinces.length > 1 ? (
                                <div className="country-table-title">
                                    <input className="country-table-title-searchbar" type="text" id="input" placeholder="Your State" onKeyUp={this.search()} value={this.state.value} onChange={this.handleChange} />
                                    <table className="country-table-title-stats" id="t01">
                                        <caption className="country-table-title-stats-caption"><h2 className="country-table-title-stats-caption-h2">{countryISOBased.length > 0 ? countryISOBased[0].Country + " States" : "Data"}<span className="country-table-title-stats-caption-update-text">- Live Update in <span id="time">05:00</span></span><span className="country-table-title-stats-caption-livepoint"></span><span className="country-table-title-stats-caption-shiningpoint"></span></h2></caption>
                                        {/* <caption className="country-table-title-stats-caption">World Data</caption> */}
                                        <thead className="country-table-title-stats-thead">
                                            <tr className="country-table-title-stats-columns" id="columns"
                                                ref={this.titleRef}
                                                // onScroll={this.onScroll('columns')}
                                                onScroll={() => this.onScroll('columns')}
                                            >
                                                <th className={`country-table-title-stats-columns-item country-table-title-stats-columns-number`}>NUM</th>
                                                <th className={`country-table-title-stats-columns-item country-table-title-stats-columns-name ${this.state.activeTitle === 'province' ? "country-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderName() }}>STATES <span className="sign">&#9662;</span></th>
                                                <th className={`country-table-title-stats-columns-item country-table-title-stats-columns-confirmed ${this.state.activeTitle === 'confirmed' ? "country-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderConfirmed() }}>TOTAL CASES <span className="sign">&#9662;</span></th>
                                                <th className={`country-table-title-stats-columns-item country-table-title-stats-columns-newcases ${this.state.activeTitle === 'NewCases' ? "country-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderStats('newcases', 'confirmed_diff') }}>NEW CASES <span className="sign">&#9662;</span></th>
                                                <th className={`country-table-title-stats-columns-item country-table-title-stats-columns-active ${this.state.activeTitle === 'active' ? "country-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderStats('active', 'active') }}>ACTIVE CASES <span className="sign">&#9662;</span></th>
                                                <th className={`country-table-title-stats-columns-item country-table-title-stats-columns-deceased ${this.state.activeTitle === 'deaths' ? "country-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderStats('deceased', 'deaths') }}>TOTAL DEATHS <span className="sign">&#9662;</span></th>
                                                <th className={`country-table-title-stats-columns-item country-table-title-stats-columns-newdeaths ${this.state.activeTitle === 'deaths_diff' ? "country-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderStats('newdeaths', 'deaths_diff') }}>NEW DEATHS <span className="sign">&#9662;</span></th>
                                                <th className={`country-table-title-stats-columns-item country-table-title-stats-columns-deathspermil ${this.state.activeTitle === 'Case_Fatality_Rate' ? "country-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderStats('deathspermil', 'Case_Fatality_Rate') }}>CASE FATALITY RATE (CFR <span className="sign">&#9662;</span>)</th>
                                                <th className={`country-table-title-stats-columns-item country-table-title-stats-columns-recovered ${this.state.activeTitle === 'recovered' ? "country-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderStats('recovered', 'recovered') }}>TOTAL RECOVERED <span className="sign">&#9662;</span></th>
                                                <th className={`country-table-title-stats-columns-item country-table-title-stats-columns-recoveredrate ${this.state.activeTitle === 'Recovery_Proporation' ? "country-table-title-stats-columns-active_btn" : ""}`} onClick={() => { orderStats('recoveredrate', 'Recovery_Proporation') }}>RECOVERY PERCENTAGE <span className="sign">&#9662;</span></th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            ) : ""
                            // : ""
                        }

                        <table className="country-table-stats" id="countryTable"
                            ref={this.tableRef}
                            // onscroll={this.onScroll('countryTable')}
                            onScroll={() => this.onScroll('countryTable')}
                        >
                            <tbody>
                                {eachCountryProvinces.length > 1 ? eachCountryProvinces.map((country, index) => {
                                    if (country.confirmed !== 0 && country.province !== "Grand Princess" && country.province !== "Recovered" && country.province !== "Diamond Princess") {
                                        return <tr key={index} className="country-table-stats-item">
                                            {/* <td className="country-table-stats-item-each country-table-stats-item-name"><Link to="eachCountry" params={{ iso: country.ThreeLetterSymbol.toUpperCase() }}>{country.Country}</Link></td> */}
                                            <td className="country-table-stats-item-each country-table-stats-item-number">{index + 1}</td>
                                            <td className="country-table-stats-item-each country-table-stats-item-name">{country.province.substr(0, 24)}</td>
                                            {/* <td className="country-table-stats-item-each country-table-stats-item-name"><Link to='/covid-19/${country.ThreeLetterSymbol.toUpperCase()}' >{country.Country}</Link></td> */}
                                            <td className="country-table-stats-item-each country-table-stats-item-confirmed">{country.reports === true && country.confirmed !== null ? this.numberWithCommas(country.confirmed) : "No Data"}</td>
                                            <td className="country-table-stats-item-each country-table-stats-item-newcases">{country.reports === true && country.confirmed_diff !== null ? this.numberWithCommas(country.confirmed_diff) : "No Data"}</td>
                                            {/* <td className="country-table-stats-item-each country-table-stats-item-confirmedpermil">{country.Infection_Risk !== null ? country.Infection_Risk + "%" : "No Data"}</td> */}
                                            {/* <td className="country-table-stats-item-each country-table-stats-item-critical">{country.Serious_Critical !== null ? this.numberWithCommas(country.Serious_Critical) : "No Data"}</td> */}
                                            <td className="country-table-stats-item-each country-table-stats-item-active">{country.reports === true && country.active !== null ? this.numberWithCommas(country.active) : "No Data"}</td>
                                            <td className="country-table-stats-item-each country-table-stats-item-deceased">{country.reports === true && country.deaths !== null ? this.numberWithCommas(country.deaths) : "No Data"}</td>
                                            <td className="country-table-stats-item-each country-table-stats-item-newdeaths">{country.reports === true && country.deaths_diff !== null ? this.numberWithCommas(country.deaths_diff) : "No Data"}</td>
                                            <td className="country-table-stats-item-each country-table-stats-item-deathspermil">{country.reports === true && country.Case_Fatality_Rate !== null ? country.Case_Fatality_Rate + "%" : "No Data"}</td>
                                            {/* <td className="country-table-stats-item-each country-table-stats-item-giventests">{country.TotalTests !== null ? this.numberWithCommas(country.TotalTests) : "No Data"}</td> */}
                                            {/* <td className="country-table-stats-item-each country-table-stats-item-testspermil">{country.Test_Percentage !== null ? country.Test_Percentage + "%" : "No Data"}</td> */}
                                            <td className="country-table-stats-item-each country-table-stats-item-recovered">{country.reports === true && country.recovered !== null && country.recovered !== 0 ? this.numberWithCommas(country.recovered) : "No Data"}</td>
                                            <td className="country-table-stats-item-each country-table-stats-item-recoveredrate">{country.reports === true && country.Recovery_Proporation !== null && country.Recovery_Proporation !== 0 ? country.Recovery_Proporation + "%" : "No Data"}</td>
                                            {/* <td className="country-table-stats-item-each country-table-stats-item-population">{country.Population !== null ? this.numberWithCommas(country.Population) : "No Data"}</td> */}
                                        </tr>
                                    }
                                    return <tr key={index}></tr>
                                }

                                ) : (
                                        // <tr className="country-table-stats-loading loading">
                                        //     <td></td>

                                        // </tr>
                                        ""
                                    )

                                }
                            </tbody>
                        </table>
                        {
                            eachCountryProvinces.length > 1 ? (
                                <div className="country-guide">
                                    <ul className="country-guide-list">
                                        <li className="country-guide-list-item">
                                            <h3 className="country-guide-list-item-title country-guide-list-item-CASE_FATALITY_RATE">CASE FATALITY RATE (CFR):
                            <span className="country-guide-list-item-text"> Total Number of Deaths due to Covid-19 divided by Total Number of confirmed cases since the beginning of outbreak (It shows that how lethal covid-19 is in any country)</span>
                                            </h3>
                                        </li>
                                        <li className="country-guide-list-item">
                                            <h3 className="country-guide-list-item-title country-guide-list-item-RECOVERY_PERCENTAGE">RECOVERY PERCENTAGE:
                            <span className="country-guide-list-item-text"> Total number of recovered cases divided by Total number of covid-19 cases</span>
                                            </h3>
                                        </li>
                                    </ul>
                                </div>) : ""
                        }

                        {
                            // // eachCountryCities === undefined ?
                            // eachCountryCities.length > 1 ? (
                            //     <div className="country-table-cities-title">
                            //         <input className="country-table-cities-title-searchbar" type="text" id="input" placeholder="Your Country" onKeyUp={this.search()} value={this.state.value} onChange={this.handleChange} />
                            //         <table className="country-table-cities-title-stats" id="t01">
                            //             <caption className="country-table-cities-title-stats-caption">{countryISOBased.length > 0 ? countryISOBased[0].Country + " Cities" : "DATA"}</caption>
                            //             {/* <caption className="country-table-cities-title-stats-caption">World Data</caption> */}
                            //             <thead className="country-table-cities-title-stats-thead">
                            //                 <tr className="country-table-cities-title-stats-columns" id="columns"
                            //                     ref={this.titleRef}
                            //                     // onScroll={this.onScroll('columns')}
                            //                     onScroll={() => this.onScroll('columns')}
                            //                 >
                            //                     <th className={`country-table-cities-title-stats-columns-item country-table-cities-title-stats-columns-number`}>NUM</th>
                            //                     <th className={`country-table-cities-title-stats-columns-item country-table-cities-title-stats-columns-name ${this.state.activeCitiesTitle === 'cities' ? "country-table-cities-title-stats-columns-active_btn" : ""}`} onClick={() => { orderCitiesName() }}>CITIES</th>
                            //                     <th className={`country-table-cities-title-stats-columns-item country-table-cities-title-stats-columns-confirmed ${this.state.activeCitiesTitle === 'confirmed' ? "country-table-cities-title-stats-columns-active_btn" : ""}`} onClick={() => { orderCitiesStats('confirmed', 'confirmed') }}>TOTAL CASES</th>
                            //                     <th className={`country-table-cities-title-stats-columns-item country-table-cities-title-stats-columns-newcases ${this.state.activeCitiesTitle === 'NewCases' ? "country-table-cities-title-stats-columns-active_btn" : ""}`} onClick={() => { orderCitiesStats('newcases', 'confirmed_diff') }}>NEW CASES</th>
                            //                     <th className={`country-table-cities-title-stats-columns-item country-table-cities-title-stats-columns-deceased ${this.state.activeCitiesTitle === 'deaths' ? "country-table-cities-title-stats-columns-active_btn" : ""}`} onClick={() => { orderCitiesStats('deceased', 'deaths') }}>TOTAL DEATHS</th>
                            //                     <th className={`country-table-cities-title-stats-columns-item country-table-cities-title-stats-columns-newdeaths ${this.state.activeCitiesTitle === 'deaths_diff' ? "country-table-cities-title-stats-columns-active_btn" : ""}`} onClick={() => { orderCitiesStats('newdeaths', 'deaths_diff') }}>NEW DEATHS</th>
                            //                 </tr>
                            //             </thead>
                            //         </table>
                            //     </div>
                            // ) : ""
                            // // : ""
                        }

                        {/* <table className="country-cities-stats" id="countryTable"
                    ref={this.tableRef}
                    // onscroll={this.onScroll('countryTable')}
                    onScroll={() => this.onScroll('countryTable')}
                >
                    <tbody>
                        {eachCountryCities.length > 1 ? eachCountryCities.map((country, index) => {
                            
                            if (country.confirmed !== 0 && country.name !== "Unassigned") {
                                return <tr key={country.id} className="country-cities-stats-item">
                                    <td className="country-cities-stats-item-each country-cities-stats-item-number">{index + 1}</td>
                                    <td className="country-cities-stats-item-each country-cities-stats-item-name">{country.name}</td>
                                    <td className="country-cities-stats-item-each country-cities-stats-item-confirmed">{country.reports === true && country.confirmed !== null ? this.numberWithCommas(country.confirmed) : "No Data"}</td>
                                    <td className="country-cities-stats-item-each country-cities-stats-item-newcases">{country.reports === true && country.confirmed_diff !== null ? this.numberWithCommas(country.confirmed_diff) : "No Data"}</td>
                                    <td className="country-cities-stats-item-each country-cities-stats-item-deceased">{country.reports === true && country.deaths !== null ? this.numberWithCommas(country.deaths) : "No Data"}</td>
                                    <td className="country-cities-stats-item-each country-cities-stats-item-newdeaths">{country.reports === true && country.deaths_diff !== null ? this.numberWithCommas(country.deaths_diff) : "No Data"}</td>
                                </tr>
                            }
                        }

                        ) : (
                                // <tr className="country-cities-stats-loading loading">
                                //     <td></td>

                                // </tr>
                                ""
                            )

                        }
                    </tbody>
                </table> */}

                        {/* <div> */}
                        <div className="country-quick-facts-chart">
                            <canvas id="quick-facts-chart"></canvas>
                        </div>

                        <div className="country-compare-to-world-chart">
                            <canvas id="compare-to-world-chart"></canvas>
                        </div>

                        <div className="country-new-cases-chart">
                            <canvas id="new-cases-chart"></canvas>
                        </div>

                        <div className="country-new-deaths-chart">
                            <canvas id="new-deaths-chart"></canvas>
                        </div>

                        <div className="country-total-cases-chart">
                            <canvas id="total-cases-chart"></canvas>
                        </div>

                        <div className="country-total-deaths-chart">
                            <canvas id="total-deaths-chart"></canvas>
                        </div>
                    </div>
                    <Footer />
                </div >
            ) : (
                <div className="country-loading">
                    <div className="country-loading-regions country-loading-load"></div>
                    <div className="country-loading-stats country-loading-load"></div>
                    <div className="country-loading-chart-one country-loading-load"></div>
                    <div className="country-loading-chart-two country-loading-load"></div>
                    <div className="country-loading-chart-three country-loading-load"></div>
                    <div className="country-loading-chart-four country-loading-load"></div>
                </div>
            );


    }
}
countryEachCountryComponent.propTypes = {
    countriesNameOrdered: PropTypes.array,
    world: PropTypes.array,
    ovidData: PropTypes.array,
    countryISOBased: PropTypes.array,
    eachCountryProvinces: PropTypes.array,

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
    getOvidData: PropTypes.func.isRequired,

    clearData: PropTypes.func.isRequired,
    // clearAllCountriesNameOrderedData: PropTypes.func.isRequired,
    // clearProvinceReportISOBasedData: PropTypes.func.isRequired,
    // clearCountryISOBasedData: PropTypes.func.isRequired,
    clearOvidData: PropTypes.func.isRequired,
    // clearWorldData: PropTypes.func.isRequired,
};


// pass the application state (main data) to our component as props. so we can access it by props
const mapStateToProps = state => ({
    countriesNameOrdered: state.countriesObject.countriesNameOrdered,
    world: state.countriesObject.world,
    ovidData: state.countriesObject.ovidData,

    countryISOBased: state.countriesObject.countryISOBased,
    eachCountryProvinces: state.countriesObject.eachCountryProvinces,
    // eachCountryCities: state.provincesObject.eachCountryCities,
});

export default connect(
    mapStateToProps,
    {
        getAllCountriesData, getWorldData, getAllCountriesDataNameOrdered, getAsiaCountriesData, getAfricaCountriesData, getEuropeCountriesData, getNorthAmericaCountriesData, getSouthAmericaCountriesData, getAustraliaOceaniaCountriesData,
        getCountryISOBased, getProvinceReportISOBased, getCitiesReportISOBased,
        getOvidData,
        clearData, clearOvidData
    })(countryEachCountryComponent);
