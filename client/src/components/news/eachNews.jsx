// import React, { Component } from 'react';
// import { getCoronavirusNews, getVaccineNews } from '../../actions/news';

// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

// export class EachNewsComponent extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             news: [],
//         };

//         this.onClickGetCoronavirusNews = this.onClickGetCoronavirusNews.bind(this);
//         this.onClickGetVaccineNews = this.onClickGetVaccineNews.bind(this);

//     }

//     async componentDidMount() {
//         // this.props.getLinks();
//         // const allNews = await this.props.getCoronavirusNews();
//         // this.props.getCoronavirusNews();
//         // console.log(allNews);
//         // this.setState({ news: allNews });
//         // this.setState({ fetching: false }); // it means it's not loading
//     }

//     async onClickGetCoronavirusNews() {
//         const allNews = await this.props.getCoronavirusNews();
//         this.setState({ news: allNews });
//         this.setState({ fetching: true }); // it means it's loading
//         // this.setState({ news: allNews });
//     };

//     async onClickGetVaccineNews() {
//         const allNews = await this.props.getVaccineNews();
//         this.setState({ news: allNews });
//         this.setState({ fetching: true }); // it means it's loading
//         // this.setState({ news: allNews });
//     };

//     render() {
//         // const links = this.props.news.news;
//         // const linksLoop = [];
//         const { news, newsLoading } = this.props;


//         if (newsLoading) {
//             return <div>Loading...</div>;
//         }

//         // console.log(news.news);
//         return (
//             <div className="eachnews">
//                 eachnews
//                 {/* {news.news ? news.news.map(news =>
//                     <li key={news.news_id}>{news.link}</li>
//                 ) : 'Loading'} */}

//             </div>
//         );
//     }
// }

// EachNewsComponent.propTypes = {
//     // news: PropTypes.array,
//     news: PropTypes.object,
//     getCoronavirusNews: PropTypes.func.isRequired,
//     getVaccineNews: PropTypes.func.isRequired,
// };

// const mapStateToProps = state => ({
//     news: state.newsObject.news,
//     newsLoading: state.newsObject.newsLoading,
// });

// export default connect(
//     mapStateToProps,
//     { getCoronavirusNews, getVaccineNews }
// )(EachNewsComponent);
