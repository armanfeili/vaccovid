import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';
import Footer from '../common/footer';

// import * as Scroll from 'react-scroll';
// import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import { getCoronavirusNews, getVaccineNews, getHealthNews } from '../../actions/news';

export class NewsComponent extends Component {
    // components are like JavaScript functions. They accept arbitrary inputs (called “props”) 
    // and return React elements describing what should appear on the screen.
    // When React sees an element representing a user-defined component, it passes JSX attributes and 
    // children to this component as a single object.We call this object “props”.
    // Props are Read-Only. All React components must act like pure functions with 
    // respect to their props.
    // Class components should always call the base constructor with props.
    constructor() {
        super();
        // State is similar to props, but it is private and fully controlled by the component.
        this.state = {
            news: [],
            active_btn: "vaccine",
            page: 0,
            showRegions: "off",
        };

        // This binding is necessary to make `this` work in the callback
        this.onClickGetVaccineNews = this.onClickGetVaccineNews.bind(this);
        this.vaccineNext = this.vaccineNext.bind(this);
        this.vaccinePrevious = this.vaccinePrevious.bind(this);

        this.onClickGetCoronavirusNews = this.onClickGetCoronavirusNews.bind(this);
        this.coronavirusNext = this.coronavirusNext.bind(this);
        this.coronavirusPrevious = this.coronavirusPrevious.bind(this);

        this.onClickGetHealthNews = this.onClickGetHealthNews.bind(this);
        this.healthNext = this.healthNext.bind(this);
        this.healthPrevious = this.healthPrevious.bind(this);

        this.onClickShowRegions = this.onClickShowRegions.bind(this);

    }

    async componentDidMount() {
        this.onClickGetVaccineNews(this.state.page);
    }

    async componentDidUpdate() {
        document.title = `${this.state.active_btn === 'covid19' ? 'covid-19' : 'covid-19 ' + this.state.active_btn} news - vaccovid.live`;
    }


    async onClickGetVaccineNews() {
        this.setState({ active_btn: "vaccine" });
        this.setState({ page: 0 });
        await this.props.getVaccineNews(0);
        const allNews = this.props.news.news;
        // console.log(await this.props.news);
        // console.log(await this.props.news.news);
        this.setState({ news: allNews });
        // console.log(this.state.news); // it still returens old data (previous state)
    };


    async vaccineNext() {
        if (this.props.news.news.length === 10) {
            await this.props.getVaccineNews(this.state.page + 1);
            const allNews = this.props.news.news;
            if (allNews !== undefined) {
                this.setState({ page: this.state.page + 1 });
                this.setState({ news: allNews });
            } else if (allNews === undefined) {
                this.setState({ page: this.state.page - 1 });
            }
        }
    }
    async vaccinePrevious() {
        if (this.state.page > 0) {
            await this.props.getVaccineNews(this.state.page - 1);
            const allNews = this.props.news.news;
            if (allNews !== undefined) {
                this.setState({ page: this.state.page - 1 });
                this.setState({ news: allNews });
            } else if (allNews === undefined) {
                this.setState({ page: this.state.page - 1 });
            }
        }
    }

    async onClickGetCoronavirusNews() {
        this.setState({ active_btn: "covid19" });
        this.setState({ page: 0 });
        await this.props.getCoronavirusNews(0);
        const allNews = this.props.news.news;
        this.setState({ news: allNews });
    };

    async coronavirusNext() {
        if (this.props.news.news.length === 10) {
            await this.props.getCoronavirusNews(this.state.page + 1);
            const allNews = this.props.news.news;
            if (allNews !== undefined) {
                this.setState({ page: this.state.page + 1 });
                this.setState({ news: allNews });
            } else if (allNews === undefined) {
                this.setState({ page: this.state.page - 1 });
            }
        }
    }
    async coronavirusPrevious() {
        if (this.state.page > 0) {
            await this.props.getCoronavirusNews(this.state.page - 1);
            const allNews = this.props.news.news;
            if (allNews !== undefined) {
                this.setState({ page: this.state.page - 1 });
                this.setState({ news: allNews });
            } else if (allNews === undefined) {
                this.setState({ page: this.state.page - 1 });
            }
        }
    }

    async onClickGetHealthNews() {
        this.setState({ active_btn: "health" });
        this.setState({ page: 0 });
        const health = await this.props.getHealthNews(0);
        console.log(health);
        const allNews = this.props.news.news;
        this.setState({ news: allNews });
        console.log(this.state.news); // it still returens old data (previous state)
    };


    async healthNext() {
        if (this.props.news.news.length === 10) {
            await this.props.getHealthNews(this.state.page + 1);
            const allNews = this.props.news.news;
            if (allNews !== undefined) {
                this.setState({ page: this.state.page + 1 });
                this.setState({ news: allNews });
            } else if (allNews === undefined) {
                this.setState({ page: this.state.page - 1 });
            }
        }
    }
    async healthPrevious() {
        if (this.state.page > 0) {
            await this.props.getHealthNews(this.state.page - 1);
            const allNews = this.props.news.news;
            if (allNews !== undefined) {
                this.setState({ page: this.state.page - 1 });
                this.setState({ news: allNews });
            } else if (allNews === undefined) {
                this.setState({ page: this.state.page - 1 });
            }
        }
    }

    onClickShowRegions() {
        if (this.state.showRegions === "on") {
            this.setState({ showRegions: "off" });
        } else {
            this.setState({ showRegions: "on" });
        }
    };

    render() {
        // const links = this.props.news.news;
        // const linksLoop = [];
        const { news } = this.props;

        // let { parameteres } = this.props.match.params; // url parameteres
        let url_state = this.props.location.state;       // url passing state

        if (window.location.pathname === "/news" || window.location.pathname === "/news/" || url_state === undefined) {
            return <Redirect to={{ pathname: `/news/vaccine`, state: { topic: 'vaccine' } }} push />
        }

        if (url_state.topic === null || url_state.topic === undefined) {
            return <Redirect to={{ pathname: '/not-found' }} push />
            // this.props.history.push('/not-found')
        }

        const renderButtons = () => {
            if (this.state.active_btn === "covid19") {
                return (
                    <div className="news-item--news-button">
                        <Link to=" " onClick={this.coronavirusPrevious} className="news-item--news-button--previous">RECENT NEWS</Link>
                        <Link to=" " onClick={this.coronavirusNext} className="news-item--news-button--next">OLDER NEWS</Link>
                    </div>
                )
            } else if (this.state.active_btn === "vaccine") {
                return (
                    <div className="news-item--news-button">
                        <Link to=" " onClick={this.vaccinePrevious} className="news-item--news-button--previous">RECENT NEWS</Link>
                        <Link to=" " onClick={this.vaccineNext} className="news-item--news-button--next">OLDER NEWS</Link>
                    </div>
                )
            } else if (this.state.active_btn === "health") {
                return (
                    <div className="news-item--news-button">
                        <Link to=" " onClick={this.healthPrevious} className="news-item--news-button--previous">RECENT NEWS</Link>
                        <Link to=" " onClick={this.healthNext} className="news-item--news-button--next">OLDER NEWS</Link>
                    </div>
                )
            }
        }
        // console.log(news.news);
        // console.log(news);
        return (
            <div>
                <div id="news" className="news">

                    <div className="news-btnAndTitle">
                        <button className="news-btnAndTitle-btn" onClick={this.onClickShowRegions}>Choose Your topic &#9662;</button>
                        <h1 className="news-btnAndTitle-title">{this.state.active_btn.toUpperCase()}</h1>
                    </div>

                    <div className={`news-responsive ${this.state.showRegions === "off" ? "take_underground" : ""}`}>
                        <button className="news-responsive-close_btn" onClick={this.onClickShowRegions}></button>
                        <ul className={`news-responsive-allregions`} id="region">
                            <Link to={{ pathname: `/news/vaccine`, state: { topic: 'vaccine' } }} onClick={async () => { this.onClickShowRegions(); this.onClickGetVaccineNews(); }} className={`news-responsive-allregions-btn ${this.state.active_btn === "vaccine" ? "news-responsive-allregions-btn-active" : ""}`}>VACCINE</Link>
                            <Link to={{ pathname: `/news/covid19`, state: { topic: 'covid19' } }} onClick={async () => { this.onClickShowRegions(); this.onClickGetCoronavirusNews(); }} className={`news-responsive-allregions-btn ${this.state.active_btn === "covid19" ? "news-responsive-allregions-btn-active" : ""}`} >COVID-19</Link>
                            <Link to={{ pathname: `/news/health`, state: { topic: 'health' } }} onClick={async () => { this.onClickShowRegions(); this.onClickGetHealthNews(); }} className={`news-responsive-allregions-btn ${this.state.active_btn === "health" ? "news-responsive-allregions-btn-active" : ""}`}>HEALTH</Link>
                        </ul>
                    </div>



                    <div className="news-item news-item--searchfor">
                        <Link to={{ pathname: `/news/vaccine`, state: { topic: 'vaccine' } }} className={`news-item--searchfor-btn news-item--searchfor-btn--vaccine ${this.state.active_btn === "vaccine" ? "news-item--searchfor-btn--vaccine-active-btn" : ""}`} onClick={this.onClickGetVaccineNews}>VACCINE</Link>
                        <Link to={{ pathname: `/news/covid19`, state: { topic: 'covid19' } }} className={`news-item--searchfor-btn news-item--searchfor-btn--corona ${this.state.active_btn === "covid19" ? "news-item--searchfor-btn--corona-active-btn" : ""}`} onClick={this.onClickGetCoronavirusNews}>COVID19</Link>
                        <Link to={{ pathname: `/news/health`, state: { topic: 'health' } }} className={`news-item--searchfor-btn news-item--searchfor-btn--health ${this.state.active_btn === "health" ? "news-item--searchfor-btn--health-active-btn" : ""}`} onClick={this.onClickGetHealthNews}>HEALTH</Link>

                    </div>
                    <div className="news-item news-item--news">

                        <ul className="news-item--news-list" id="containerElement">
                            {news.news ? news.news.map(news => {
                                // {news ? news.map(news => {
                                return <a href={news.link} rel="noopener noreferrer" target="_blank" key={news.news_id} className="news-item--news-list-eachNews">
                                    <img
                                        className="news-item--news-list-eachNews-broadcastImg"
                                        src={`${require(`./../../views/news-logo-resized/${news.reference}.jpg`) ? require(`./../../views/news-logo-resized/${news.reference}.jpg`) : require('../../views/news-logo-resized/google-news.jpg')}`}
                                        alt="news img loading"
                                        // style={{ width: '25px', marginRight: '5px' }}
                                        title={`${news.reference} broadcast`}
                                    />
                                    <div className="news-item--news-list-eachNews-broadcastImg-cover"></div>
                                    <div className="news-item--news-list-eachNews-title">{news.title}</div>
                                    <div className="news-item--news-list-eachNews-between"></div>
                                    <div className="news-item--news-list-eachNews-content">{news.content}</div>
                                    <img
                                        className='news-item--news-list-eachNews-newsImg'
                                        src={news.reference !== "who" ? news.urlToImage : `${require(`../../views/who-pics/who-${Math.floor(Math.random() * 13) + 1}.jpg`)}`}
                                        // src={`${require(`../../../../pics${news.imageInLocalStorage}`)}`}
                                        alt="..."
                                    // style={{ width: '25px', marginRight: '5px' }}
                                    />
                                    <div className="news-item--news-list-eachNews-newsImg-cover"></div>
                                    <div className="news-item--news-list-eachNews-pubDate">{moment(news.pubDate).fromNow()}</div>
                                </a>
                            }
                            ) : (
                                    <div className="news-loading">
                                        <div className="news-item--news-list-eachNews news-item--news-list-eachNews-loading loading"></div>
                                        <div className="news-item--news-list-eachNews news-item--news-list-eachNews-loading loading"></div>
                                        <div className="news-item--news-list-eachNews news-item--news-list-eachNews-loading loading"></div>
                                        <div className="news-item--news-list-eachNews news-item--news-list-eachNews-loading loading"></div>
                                        <div className="news-item--news-list-eachNews news-item--news-list-eachNews-loading loading"></div>
                                    </div>
                                )

                            }

                        </ul>
                    </div>
                    {
                        renderButtons()
                    }
                </div>
                <Footer />
            </div >
        );
    }
}

NewsComponent.propTypes = {
    // news: PropTypes.array,
    news: PropTypes.object,
    getCoronavirusNews: PropTypes.func.isRequired,
    getVaccineNews: PropTypes.func.isRequired,
    getHealthNews: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    news: state.newsObject.news,
    newsLoading: state.newsObject.newsLoading,
});

export default connect(
    mapStateToProps,
    { getCoronavirusNews, getVaccineNews, getHealthNews }
)(NewsComponent);
