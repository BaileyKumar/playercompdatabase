import React from 'react';


import {RegisterPage} from './pages/RegisterPage';
import ResultsPage from './pages/ResultsPage';



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
        {this.state.view === 'register' ? <RegisterPage mainSiteComponent={this}/> : null}
        {this.state.view === 'results' ? <ResultsPage mainSiteComponent={this}/> : null}
      </div>
    );
  }
}

export {MainSiteComponent};
