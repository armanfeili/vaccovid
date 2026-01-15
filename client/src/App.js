import React from 'react';
import './views/stylesheets/style.css';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';
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

import Vaccine from './components/vaccines/vaccine';
import VaccineBase from './components/vaccines/vaccine-base';
import Treatment from './components/vaccines/treatment';
import TreatmentBase from './components/vaccines/treatment-base';
import EachVaccine from './components/vaccines/each-vaccine';
import EachTreatment from './components/vaccines/each-treatment';

class App extends React.Component {
render () {
return (
<Provider store={store}>
<Router>
<div className='style'>
<Navbar />
<div>
<div className='container'>
  <Switch>
    <Route exact path="/" component={CoronavirusWorldComponent} />
    <Route exact path="/covid-19-tracker" component={CoronavirusWorldComponent} />
    <Route exact path="/covid-19" component={CoronavirusWorldComponent} />
    <Route exact path='/covid-19-tracker/:continentName' component={CoronavirusEachContinentComponent} />
    <Route exact path='/covid-19/:continentName' component={CoronavirusEachContinentComponent} />
    <Route exact path="/covid-19-tracker/:countryName/:iso" component={CoronavirusEachCountryComponent} />
    <Route exact path="/covid-19/:countryName/:iso" component={CoronavirusEachCountryComponent} />
    <Route exact path='/vaccine-tracker' component={VaccineBase} />
    <Route exact path='/vaccine-tracker/:category' component={Vaccine} />
    <Route exact path='/vaccine-tracker/:category/:name' component={EachVaccine} />
    <Route exact path='/treatment-tracker' component={TreatmentBase} />
    <Route exact path='/treatment-tracker/:category' component={Treatment} />
    <Route exact path='/treatment-tracker/:category/:name' component={EachTreatment} />
    <Route exact path='/coronavirus-world-map' component={WorldMapComponent} />
    <Route exact path='/coronavirus-usa-map' component={USMapComponent} />
    <Route exact path='/coronavirus-canada-map' component={CanadaMapComponent} />
    <Route exact path='/coronavirus-brazil-map' component={BrazilMapComponent} />
    <Route exact path='/coronavirus-germany-map' component={GermanyMapComponent} />
    <Route exact path='/coronavirus-australia-map' component={AustraliaMapComponent} />
    <Route exact path="/news" component={NewsComponent} />
    <Route exact path='/news/:topic' component={NewsComponent} />
    <Route path='/about' component={About} />
    <Route path='/not-found' component={NotFound} />
  </Switch>
</div>
</div>
</div>
</Router>
</Provider>
);
}
}

export default App;