import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import {StateSwitchComponent} from './StateSwitchComponent';

class Footer extends StateSwitchComponent{
  constructor(props) {
    super(props);
    this.mainSiteComponent = props.mainSiteComponent;
  }

  render() {
    return (
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
        <Link href="https://www.youtube.com/@2MinuteDrillFB" underline="hover">
          <Typography variant="h6">
            Want to Support Me? Subscribe to my Scouting YouTube Channel!
          </Typography>
        </Link>
      </div>
    );
  }
}

export default Footer;
