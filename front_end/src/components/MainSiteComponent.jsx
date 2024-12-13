import React from 'react';

import {SearchPage} from './pages/SearchPage';
import ResultsPage from './pages/ResultsPage';
import TablePage from './pages/TablePage'
import Header from './Header'
import Footer from './Footer'

class MainSiteComponent extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      view: props.state,
      playerInfo : '',
      percentiles: '',
      player_percentiles: '',
      originalinfo: '',
      originalPlayerName: '',
      originalStateInfo:{name:'Player Name'}
    };
  }

  render() {
    return (
      <div>
          {/*Select which page to render based on this.state.view}*/}
        <Header mainSiteComponent={this}/>
        <br/>
        <Footer mainSiteComponent={this}/>
        {this.state.view === 'search' ? <SearchPage mainSiteComponent={this}/> : null}
        {this.state.view === 'results' ? <ResultsPage mainSiteComponent={this}/> : null}
        {this.state.view === 'table' ? <TablePage mainSiteComponent={this}/> : null}
      </div>
    );
  }
}
export {MainSiteComponent};
