import React from 'react';
// import logo from './logo.svg'
// import './App.css'
import './views/stylesheets/style.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/nav-bar/navbar';

import CoronavirusWorldComponent from './components/coronavirus/coronavirus-world';
import CoronavirusEachContinentComponent from './components/coronavirus/coronavirus-eachContinent';
import CoronavirusEachCountryComponent from './components/coronavirus/coronavirus-eachCountry';
import NotFound from './components/common/notfound';
import About from './components/common/about';

import NewsComponent from './components/news/news';

import WorldMapComponent from './components/map/world-map';
import USMapComponent from './components/map/us-map';
import CanadaMapComponent from './components/map/canada-map';
import BrazilMapComponent from './components/map/brazil-map';
import GermanyMapComponent from './components/map/germany-map';
import AustraliaMapComponent from './components/map/australia-map';

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          {/* Router here is actualy BrowserRouter */}
          <div className='style'>
            {/* Navbar and Footer always display but Landing is sth we want to display in "/" route. so we used <Route /> */}
            <Navbar />
            <div>
              {/* <Route exact path="/" component={Landing} /> */}
              <div className='container'>
                <Switch>
                  {/* <Route exact path='/covid-19/world-data' component={CoronavirusWorldComponent} /> */}
                </Switch>
                {/* <Route exact path='/covid-19/world-data' component={CoronavirusWorldComponent} /> */}
                {/* <Route exact path='/covid-19/asia-data' component={CoronavirusAsiaComponent} />
                <Route exact path='/covid-19/africa-data' component={CoronavirusAsiaComponent} />
                <Route exact path='/covid-19/australia-data' component={CoronavirusAsiaComponent} />
                <Route exact path='/covid-19/europe-data' component={CoronavirusAsiaComponent} />
                <Route exact path='/covid-19/north-america-data' component={CoronavirusAsiaComponent} />
                <Route exact path='/covid-19/south-america-data' component={CoronavirusAsiaComponent} />
                <Route exact path='/covid-19/oceania-data' component={CoronavirusAsiaComponent} /> */}
                <Switch>
                  <Route exact name="eachCountry" path="/covid-19/:countryName/:iso" 
                  // handler={CoronavirusEachCountryComponent}
                   component={CoronavirusEachCountryComponent} />
                </Switch>
                <Switch>
                  <Route exact name="eachContinent" path='/covid-19/:continentName' component={CoronavirusEachContinentComponent} />
                  {/* <Route exact name="eachContinent" path='/covid-19/:continentName' handler={CoronavirusEachContinentComponent} component={CoronavirusEachContinentComponent} /> */}
                  {/* <Route exact name="eachContinent" path='/covid-19s/:continentName' handler={CoronavirusEachContinentComponent} /> */}
                  {/* <Route exact path='/covid-19/' component={EachCountryComponent} /> */}
                  {/* <Route name="eachCountry" path="/covid-19/:countryName/:iso" handler={EachCountryComponent} /> */}
                  {/* <Redirect to="/not-found" /> */}
                </Switch>
                <Switch>
                  <Route exact name="baseContinent" path="/" handler={CoronavirusWorldComponent} component={CoronavirusEachContinentComponent} />
                </Switch>
                <Switch>
                  <Route exact name="baseContinent" path="/covid-19" handler={CoronavirusWorldComponent} component={CoronavirusEachContinentComponent} />
                </Switch>
                <Switch>
                  <Route exact path='/about' component={About} />
                </Switch>
                <Switch>
                  <Route exact path='/news/:topic' component={NewsComponent} />
                </Switch>
                 <Switch>
                  <Route exact name="newsBaseContinent" path="/news" handler={NewsComponent} component={NewsComponent} />
                </Switch>
                <Switch>
                  <Route exact path='/coronavirus-world-map' component={WorldMapComponent} />
                  <Route exact path='/coronavirus-usa-map' component={USMapComponent} />
                  <Route exact path='/coronavirus-canada-map' component={CanadaMapComponent} />
                  <Route exact path='/coronavirus-brazil-map' component={BrazilMapComponent} />
                  <Route exact path='/coronavirus-germany-map' component={GermanyMapComponent} />
                  <Route exact path='/coronavirus-australia-map' component={AustraliaMapComponent} />
                </Switch>

                {/* <Route exact path="/profiles" component={Users} /> */}
                <Switch>
                  {/* React Router’s <Switch> component will render the first matched component, making it the perfect tool for us! */}
                  {/* This means if the routes above haven’t matched, the only possible solution is we’ve hit a route that doesn’t actually exist. */}
                  {/* for every private route we just need to wrap it in <switch>, and it prevent from strange redirect issues */}
                  {/* <PrivateRoute exact path="/dashboard" component={Dashboard} /> */}
                  <Route path='/not-found' component={NotFound} />
                  {/* <Route path="/*" component={NotFound} /> */}
                </Switch>
                  {/* <Redirect to="/not-found" /> */}
                {/* <Route exact path="/not-found" component={NotFound} /> */}
              </div>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   )
// }

export default App;
