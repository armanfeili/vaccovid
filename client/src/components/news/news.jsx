import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link} from 'react-router-dom';
import moment from 'moment';
import { Helmet } from "react-helmet";
import Footer from '../common/footer';

import { getCoronavirusNews, getVaccineNews, getHealthNews } from '../../actions/news';

export class NewsComponent extends Component {
    constructor() {
        super();
        this.state = {
            news: [],
            active_btn: "vaccine",
            page: 0,
            showRegions: "off",
        };

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
        if (this.props.match.params.topic === "vaccine" && this.state.active_btn !== this.props.match.params.topic) {
            this.onClickGetVaccineNews()
        } else if (this.props.match.params.topic === "covid19" && this.state.active_btn !== this.props.match.params.topic) {
            this.onClickGetCoronavirusNews()
        } else if (this.props.match.params.topic === "health" && this.state.active_btn !== this.props.match.params.topic) {
            this.onClickGetHealthNews()
        }
    }


    async onClickGetVaccineNews() {
        this.setState({ active_btn: "vaccine" });
        this.setState({ page: 0 });
        await this.props.getVaccineNews(0);
        const allNews = this.props.news.news;
        this.setState({ news: allNews });
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

        await this.props.getHealthNews(0);
        const allNews = this.props.news.news;
        this.setState({ news: allNews });
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
        const { news } = this.props;

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
        return (
            <div>
                <Helmet>
                    <title>{this.state.active_btn === 'covid19' ? 'covid-19' : 'covid-19 ' + this.state.active_btn} news - vaccovid.live</title>
                    <meta name="description" content={`${this.state.active_btn === 'covid19' ? 'Coronavirus' : 'Coronavirus ' + this.state.active_btn} News - Latest covid-19 and vaccine news from the most reliable broadcasting. WHO, CDC, BBC, CNN, Washington Post, Time, Fox-News`} />

                </Helmet>
                <div id="news" className="news">

                    <div className="news-btnAndTitle">
                        <button className="news-btnAndTitle-btn" onClick={this.onClickShowRegions}>Choose Your topic &#9662;</button>
                        <h1 className="news-btnAndTitle-title">{this.state.active_btn.toUpperCase()}</h1>
                    </div>

                    <div className={`news-responsive ${this.state.showRegions === "off" ? "take_underground" : ""}`}>
                        <button className="news-responsive-close_btn" onClick={this.onClickShowRegions}></button>
                        <ul className={`news-responsive-allregions`} id="region">
                            <Link to={{ pathname: `/news/vaccine`, state: { topic: 'vaccine' } }} onClick={async () => { this.onClickShowRegions(); }} className={`news-responsive-allregions-btn ${this.state.active_btn === "vaccine" ? "news-responsive-allregions-btn-active" : ""}`}>VACCINE</Link>
                            <Link to={{ pathname: `/news/covid19`, state: { topic: 'covid19' } }} onClick={async () => { this.onClickShowRegions(); }} className={`news-responsive-allregions-btn ${this.state.active_btn === "covid19" ? "news-responsive-allregions-btn-active" : ""}`} >COVID-19</Link>
                            <Link to={{ pathname: `/news/health`, state: { topic: 'health' } }} onClick={async () => { this.onClickShowRegions(); }} className={`news-responsive-allregions-btn ${this.state.active_btn === "health" ? "news-responsive-allregions-btn-active" : ""}`}>HEALTH</Link>
                        </ul>
                    </div>



                    <div className="news-item news-item--searchfor">
                        <Link to={{ pathname: `/news/vaccine`, state: { topic: 'vaccine' } }} className={`news-item--searchfor-btn news-item--searchfor-btn--vaccine ${this.state.active_btn === "vaccine" ? "news-item--searchfor-btn--vaccine-active-btn" : ""}`}>VACCINE</Link>
                        <Link to={{ pathname: `/news/covid19`, state: { topic: 'covid19' } }} className={`news-item--searchfor-btn news-item--searchfor-btn--corona ${this.state.active_btn === "covid19" ? "news-item--searchfor-btn--corona-active-btn" : ""}`} >COVID19</Link>
                        <Link to={{ pathname: `/news/health`, state: { topic: 'health' } }} className={`news-item--searchfor-btn news-item--searchfor-btn--health ${this.state.active_btn === "health" ? "news-item--searchfor-btn--health-active-btn" : ""}`} >HEALTH</Link>

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
                                        src={news.reference !== "who" ? news.urlToImage : `${require(`../../views/who-pics/who-${Math.floor(Math.random() * 21) + 1}.jpg`)}`}
                                        alt="..."
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
