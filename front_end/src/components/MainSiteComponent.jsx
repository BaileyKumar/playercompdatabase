import React from 'react';

//Import Navbar
// import {SiteNavbar} from './SiteNavbar';
//
// //Import interior pages
// import {LoginPage} from './pages/LoginPage';
import {RegisterPage} from './pages/RegisterPage';
import ResultsPage from './pages/ResultsPage';
// import {HomePage} from './pages/HomePage';
// import {LeaderBoardPage} from './pages/LeaderBoardPage';
// import {ProfilePage} from './pages/ProfilePage';
// import {TeamPage} from './pages/TeamPage';


/*The main handler for the REACT app*/
class MainSiteComponent extends React.Component{
  constructor(props) {
    super(props);

    //Define the view
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

  //If the component loaded....

  render() {
    return (
      <div>
        {/*If we are not logging in or registering, display the defeault site header and navbar
        {this.state.view === 'login' && this.state.view === 'register' ?

          <SiteNavbar mainSiteComponent={this}/>

         : null}*/}

        {/*Select which page to render based on this.state.view
        // {this.state.view === 'login' ? <LoginPage username = {this.state.username} accessToken = {this.state.accessToken} mainSiteComponent={this}/> : null}
        // {this.state.view === 'team' ? <TeamPage team = {this.state.teamId} mainSiteComponent={this}/> : null }*/}
        {this.state.view === 'register' ? <RegisterPage mainSiteComponent={this}/> : null}
        {this.state.view === 'results' ? <ResultsPage mainSiteComponent={this}/> : null}
        {/*  // {this.state.view === 'home' ? <HomePage username = {this.state.username} accessToken = {this.state.accessToken} mainSiteComponent={this}/> : null}
        // {this.state.view === 'leaderboard' ? <LeaderBoardPage username = {this.state.username} accessToken = {this.state.accessToken} mainSiteComponent={this}/> : null}
        // {this.state.view === 'profile' ? <ProfilePage mainSiteComponent={this}/> : null}*/}
      </div>
    );
  }
}

export {MainSiteComponent};
