import React from 'react';

class StateSwitchComponent extends React.Component{
  constructor(props) {
    super(props);

    //Set up a parent component who's states we can switch
    this.mainSiteComponent = props.mainSiteComponent;
  }
}

export {StateSwitchComponent};
