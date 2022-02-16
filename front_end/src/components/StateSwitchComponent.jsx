import React from 'react';

class StateSwitchComponent extends React.Component{
  constructor(props) {
    super(props);

    //Set up a parent component who's states we can switch
    this.mainSiteComponent = props.mainSiteComponent;

    //Bind the listeners
    this.switchLogin = this.switchLogin.bind(this);
    this.switchRegister = this.switchRegister.bind(this);
    this.switchHome = this.switchHome.bind(this);
    this.switchLeaderBoard = this.switchLeaderBoard.bind(this);
    this.switchProfile = this.switchProfile.bind(this);
  }

  //Set up the state switch events
  switchLogin(e) {
    this.mainSiteComponent.setState({view: 'login'});
  }

  switchRegister(e) {
    this.mainSiteComponent.setState({view: 'register'});
  }

  switchHome(e) {
    this.mainSiteComponent.setState({view: 'home'});
  }

  switchLeaderBoard(e) {
    this.mainSiteComponent.setState({view: 'leaderboard'});
  }

  switchProfile(e) {
    this.mainSiteComponent.setState({view: 'profile'});
  }

}

export {StateSwitchComponent};
