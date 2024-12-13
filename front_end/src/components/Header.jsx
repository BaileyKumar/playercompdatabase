import React from 'react';

import {StateSwitchComponent} from './StateSwitchComponent';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';



class Header extends StateSwitchComponent{
  constructor(props) {
    super(props);
    this.mainSiteComponent = props.mainSiteComponent;
    this.switchToSearch = this.switchToSearch.bind(this);
    this.switchToTable = this.switchToTable.bind(this);
    this.state = {
      index : this.mainSiteComponent.state.view === 'table' ? 1: 0
    }
  }
  handleTabChange = (event,newTabIndex) => {
    this.setState({index: newTabIndex})
    newTabIndex ===  0 ? this.switchToSearch() : this.switchToTable()
  };
  
  render() {
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value ={this.state.index} aria-label="basic tabs example" variant="fullWidth"
          onChange = {this.handleTabChange.bind(this)} >
            <Tab label="Search" />
            <Tab label="Table" />
          </Tabs>
        </Box>
      </Box>
    );
  }
}

export default Header;
