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
            <Navbar />
            <div>
              {/* <Route exact path="/" component={Landing} /> */}
              <div className='container'>
                {/* <Switch>
                  <Route exact path='/covid-19/world-data' component={CoronavirusWorldComponent} />
                </Switch> */}
                <Switch>
                  <Route exact name="baseContinent" path="/" handler={CoronavirusWorldComponent} component={CoronavirusEachContinentComponent} />
                </Switch>
                <Switch>
                  <Route exact name="baseContinent" path="/covid-19" handler={CoronavirusWorldComponent} component={CoronavirusEachContinentComponent} />
                </Switch>
                <Switch>
                  <Route exact name="eachContinent" path='/covid-19/:continentName' component={CoronavirusEachContinentComponent} />
                </Switch>
                <Switch>
                  <Route exact name="eachCountry" path="/covid-19/:countryName/:iso" 
                  // handler={CoronavirusEachCountryComponent}
                   component={CoronavirusEachCountryComponent} />
                </Switch>
                <Switch>
                  <Route exact path='/coronavirus-world-map' component={WorldMapComponent} />
                </Switch>
                 <Switch>
                  <Route exact path='/coronavirus-usa-map' component={USMapComponent} />
                </Switch>
                 <Switch>
                  <Route exact path='/coronavirus-canada-map' component={CanadaMapComponent} />
                </Switch>
                 <Switch>
                  <Route exact path='/coronavirus-brazil-map' component={BrazilMapComponent} />
                </Switch>
                 <Switch>
                  <Route exact path='/coronavirus-germany-map' component={GermanyMapComponent} />
                </Switch>
                <Switch>
                  <Route exact path='/coronavirus-australia-map' component={AustraliaMapComponent} />
                </Switch>
                <Switch>
                  <Route exact name="newsBaseContinent" path="/news" handler={NewsComponent} component={NewsComponent} />
                </Switch>
                <Switch>
                  <Route exact path='/news/:topic' component={NewsComponent} />
                </Switch>
                 <Switch>
                  <Route exact path='/about' component={About} />
                </Switch>
                <Switch>
                  {/* React Router’s <Switch> component will render the first matched component, making it the perfect tool for us! */}
                  {/* This means if the routes above haven’t matched, the only possible solution is we’ve hit a route that doesn’t actually exist. */}
                  {/* for every private route we just need to wrap it in <switch>, and it prevent from strange redirect issues */}
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
