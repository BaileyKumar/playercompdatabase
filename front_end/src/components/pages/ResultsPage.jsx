import React from "react";
import {StateSwitchComponent} from '../StateSwitchComponent';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@mui/material/IconButton';
import 'chart.js/auto';
import CreateTable from '../CreateTable.jsx';
import { Radar } from 'react-chartjs-2';
import { Chart, Filler } from 'chart.js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import { saveAs } from 'file-saver';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Collapse
} from "@material-ui/core";

const playerObjects = [];
class ResultsPage extends StateSwitchComponent {
  constructor(props){
    super(props);
    Chart.register(Filler);
    this.back = this.back.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {settings: [], checked: false}
    var playerInfo = this.mainSiteComponent.state.playerInfo
    var ogPlayerName = this.mainSiteComponent.state.originalPlayerName
    var nameMap = this.mainSiteComponent.state.nameMap
    for(var i=0; i <Object.keys(playerInfo).length ; i++){
      var obj = Object.keys(playerInfo)[i]
      playerObjects[i] = {
        id : ''+(i+1),
        nameHeader: obj,
        realName: nameMap[obj],
        info: playerInfo[obj].slice(0,-1),
        similarity: playerInfo[obj].at(-1),
        subMenu: [{ id: "1", name: "subMenu1" }, { id: "2", name: "subMenu2" }],
        data:{
              labels: ['Height', 'Weight', 'Hand Size', 'Arm Length', '40 Time',"Bench Press", "Vertical Leap", "Broad Jump", "Shuttle Time", "3 Cone"],
              datasets: [
                {
                  label: obj,
                  data: this.mainSiteComponent.state.player_percentiles[obj],
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderColor: 'rgba(255, 99, 132, 1)',
                  fill: true,
                  borderWidth: 1,
                },
                {
                label: ogPlayerName,
                data: this.mainSiteComponent.state.player_percentiles[ogPlayerName],
                backgroundColor: 'rgba(100, 199, 255, 0.2)',
                borderColor: 'rgba(100, 199, 255, 1)',
                fill: true,
                borderWidth: 1,
              }
              ],
            }
      }
      this.state.settings[i]= {
        id : ''+(i+1),
        open: false
      }
    }
    playerObjects.sort(function(a, b){
      return a.similarity - b.similarity;
    });
    this.mainSiteComponent = props.mainSiteComponent;
    this.state1 = {
    };
    window.scrollTo(0, 0)/* loads halfway down on mobile for some reason */
  }
  back(){
      this.mainSiteComponent.setState({view: 'register'})
  }

  saveImage(id){
   var chart = document.getElementById(id);
    chart.toBlob(function (blob) {
    saveAs(blob, id+".png")
  })
  }
  handleChange(event){
    this.setState({checked: !event.target.checked})
    console.log(this.state)
  }


  handleClick = id => {
    this.setState(state => ({
      ...state,
      settings: state.settings.map(item =>
        item.id === id ? { ...item, open: !item.open } : item
      )
    }));
  };

  render() {
    const { settings } = this.state;
    const graphOptions = { maintainAspectRatio: false,backgroundColor: '#5cc249',
      plugins: {
        legend: {
            labels: {
                font: {
                    size: 18
                }
            }
        }
    },
    scales: {
      gridLines: {
           display: false
         },
      r: {
      suggestedMax: 1,
      suggestedMin: 0,
      stepSize: 0.1,
        pointLabels: {
          font: {
            size: 16
          }
        }
      }
    }
    };
    return (
      <div style={{ marginRight: "15px" }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', p: 1, m:1, justifyContent: 'space-between' }}>
        <IconButton aria-label="delete" onClick={this.back}     style={{
          borderRadius: 35,
          fontSize: "24px",
          color : "#000000"}}>
          <ArrowBackIcon /> &nbsp; Back
        </IconButton>
        <FormControlLabel control=
        {<Switch
             defaultChecked
             onChange={this.handleChange}
             inputProps={{ 'aria-label': 'controlled' }}/>}
           label="Show Trait Table"/>
      </Box>
      <Typography variant="h6" align = 'center' >
      Click on a Name to Expand. Number to the Right is the Similarity Score. Values in the Radar Chart is the Percentile (e.g. 0.9 = top 90%)
      </Typography>
        <List component="nav">
          {playerObjects.map(each => (
            <React.Fragment key={each.id}>
              <ListItem button onClick={() => this.handleClick(each.id)}>
                <ListItemText inset primary={each.nameHeader}  primaryTypographyProps={{
                    color: 'primary',
                    fontWeight: 'medium',
                    variant: 'h5',
                    fontSize: 20,
                  }}/>
                  <Typography variant="h6" align = 'center' >
                    { ((5-each.similarity)*20).toFixed(2)}
                  </Typography>
              </ListItem>
              <Divider />
              <Collapse
                in={settings.find(item => item.id === each.id).open}
                timeout="auto"
                unmountOnExit>
              <IconButton aria-label="delete" onClick={()=>this.saveImage(each.nameHeader)} style={{
                borderRadius: 35,
                fontSize: "24px",
                color : "#000000"}}>
                <DownloadIcon /> Download Chart
              </IconButton>
              <Box sx={{ display: 'flex', flexDirection: 'row-reverse', p: 1, m:1 }}>
  {!this.state.checked && <CreateTable  sx={{ flexGrow: 1 }} playerInfo={each.info} originalInfo = {this.mainSiteComponent.state.originalinfo} originalPlayerName = {this.mainSiteComponent.state.originalPlayerName} playerName = {each.realName}/>}
                <Radar data={each.data} options={graphOptions} id={each.nameHeader} height={800} weight ={800} />
                </Box>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      </div>
    );
  }
}
export default ResultsPage;
