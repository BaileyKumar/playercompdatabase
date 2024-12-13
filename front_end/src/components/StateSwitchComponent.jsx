import React from 'react';

class StateSwitchComponent extends React.Component{
  constructor(props) {
    super(props);

    //Set up a parent component who's states we can switch
    this.mainSiteComponent = props.mainSiteComponent;

    //Bind the listeners
    this.switchToTable = this.switchToTable.bind(this);
    this.switchToSearch = this.switchToSearch.bind(this);
  }

  //Set up the state switch events
  switchToTable(e) {
    this.mainSiteComponent.setState({view: 'table'});
  }

  switchToSearch(e) {
    this.mainSiteComponent.setState({view: 'search'});
  }

}

export {StateSwitchComponent};
