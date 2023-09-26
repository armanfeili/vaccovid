import React from 'react';
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
    <Route exact name="baseContinent1" path="/" handler={CoronavirusWorldComponent} component={CoronavirusWorldComponent} />
  </Switch>
  <Switch>
    <Route exact name="baseContinent2" path="/covid-19-tracker" handler={CoronavirusWorldComponent} component={CoronavirusWorldComponent} />
  </Switch>
  <Switch>
    <Route exact name="eachContinent" path='/covid-19-tracker/:continentName' component={CoronavirusEachContinentComponent} />
  </Switch>
  <Switch>
    <Route exact name="baseContinent3" path="/covid-19" handler={CoronavirusWorldComponent} component={CoronavirusWorldComponent} />
  </Switch>
  <Switch>
    <Route exact name="eachContinen2" path='/covid-19/:continentName' component={CoronavirusEachContinentComponent} />
  </Switch>
  <Switch>
    <Route exact name="Vaccine" path='/vaccine-tracker' component={VaccineBase} />
  </Switch>
  <Switch>
    <Route exact name="Vaccine" path='/vaccine-tracker/:category' component={Vaccine} />
  </Switch>
  <Switch>
    <Route exact name="Treatment" path='/treatment-tracker' component={TreatmentBase} />
  </Switch>
  <Switch>
    <Route exact name="Treatment" path='/treatment-tracker/:category' component={Treatment} />
  </Switch>
  <Switch>
    <Route exact name="EachVaccine" path='/vaccine-tracker/:category/:name' component={EachVaccine} />
  </Switch>
  <Switch>
    <Route exact name="EachTreatment" path='/treatment-tracker/:category/:name' component={EachTreatment} />
  </Switch>
  <Switch>
    <Route exact name="eachCountry" path="/covid-19-tracker/:countryName/:iso" component={CoronavirusEachCountryComponent} />
  </Switch>
  <Switch>
    <Route exact name="eachCountry2" path="/covid-19/:countryName/:iso" component={CoronavirusEachCountryComponent} />
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
