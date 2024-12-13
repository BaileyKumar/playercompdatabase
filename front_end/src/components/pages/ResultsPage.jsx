import React from "react";
import {StateSwitchComponent} from '../StateSwitchComponent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import 'chart.js/auto';
import CreateTable from '../CreateTable.jsx';
import { Radar } from 'react-chartjs-2';
import { Chart, Filler } from 'chart.js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import { saveAs } from 'file-saver';
import Slider from '@mui/material/Slider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { InputSwitch } from 'primereact/inputswitch';

import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Collapse
} from "@material-ui/core";
var playerObjects = [];
var playerObjectsFiltered = [];

const counter = {
  id: "counter",
  beforeDraw: (chart) => {
    const ctx = chart.canvas.getContext('2d');
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  }
}
class ResultPage extends StateSwitchComponent {
  constructor(props){
    super(props);
    Chart.register(Filler);
    Chart.register(counter);
    this.back = this.back.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.state = { settings: [], checked: true, sortType: "similarity", minSimilarPercent: 0}
    var playerInfo = this.mainSiteComponent.state.playerInfo
    var ogPlayerName = this.mainSiteComponent.state.originalPlayerName
    var nameMap = this.mainSiteComponent.state.nameMap
    playerObjects = [];
    for(var i=0; i <Object.keys(playerInfo).length ; i++){
      var obj = Object.keys(playerInfo)[i]
      playerObjects[i] = {
        id : ''+(i+1),
        nameHeader: obj,
        realName: nameMap[obj],
        info: playerInfo[obj].slice(0,-1),
        similarity: playerInfo[obj].at(-1),
        wAV: playerInfo[obj].at(-2),
        round: playerInfo[obj].at(-3),
        pickNumber: playerInfo[obj].at(-4),
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
      if (a["similarity"] === -1) {
        return 1;
      }
      if (b["similarity"]  === -1) {
        return -1;
      }
      return a["similarity"]  - b["similarity"];
    });
    playerObjectsFiltered = playerObjects;
    this.mainSiteComponent = props.mainSiteComponent;
    this.state1 = {
    };
    window.scrollTo(0, 0)/* loads halfway down on mobile for some reason */
  }
  back(){
      this.mainSiteComponent.setState({view: 'search'})
  }

  saveImage(id){
   var chart = document.getElementById(id);
    chart.toBlob(function (blob) {
    saveAs(blob, id+".png")
  })
  }
  handleChange(event){
    this.setState({checked: event.value})
  }
  handleMinSimilarChange(event) {
    this.setState({ minSimilarPercent: event.target.value })
    playerObjectsFiltered = playerObjects.filter(player => (5 - player.similarity) * 20 > event.target.value)
  }
  handleSortChange(event){
    this.setState({sortType : event.target.value})
    if (event.target.value === "wAV"){
      playerObjects.sort(function(a, b){
        return b[event.target.value]  - a[event.target.value];
      });
    }
    else {
      playerObjects.sort(function(a, b){
          if (a[event.target.value] === -1) {
            return 1;
          }
          if (b[event.target.value]  === -1) {
            return -1;
          }
        return a[event.target.value]  - b[event.target.value];
      });
    }
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
      <Box sx={{ display: 'flex', flexDirection: 'row', p: 1, m:2, justifyContent: 'space-between'}}>
        <IconButton aria-label="delete" onClick={this.back}     style={{
          borderRadius: 35,
          fontSize: "24px",
          color : "#000000"}}>
          <ArrowBackIcon /> &nbsp; Back
        </IconButton>
        <Box sx = {{display: 'flex', flexDirection : 'column', p: 1, gap: 0.5, alignItems: 'center'}} >
        <Typography align = 'center' >
        Show Trait Table
        </Typography>
          <InputSwitch
               onChange={this.handleChange}
               checked={this.state.checked}/>
        </Box>
      </Box>
      <Typography variant="h6" align = 'center' >
      Click on a Name to Expand. Number to the Right is the Similarity Score. Values in the Radar Chart is the Percentile (e.g. 0.9 = top 10%).
      <br />
      <br />
      Choose an Option Below to Determine the Type of Sort
      </Typography>
        <ToggleButtonGroup
          color="primary"
          size="large"
          value={this.state.sortType}
          exclusive
          onChange={this.handleSortChange}
          style={{ display: 'flex', justifyContent: 'center'}}
          aria-label="Platform">
          <ToggleButton style={{ borderRadius: '5px', border: '1px solid #1565c0', padding: '10px 20px', textTransform: 'none'}} value="similarity">Similarity</ToggleButton>
          <ToggleButton style={{ borderRadius: '5px', border: '1px solid #1565c0', padding: '10px 20px', textTransform: 'none' }} value="pickNumber">Pick Number</ToggleButton>
          <ToggleButton style={{ borderRadius: '5px', border: '1px solid #1565c0', padding: '10px 20px', textTransform: 'none' }} value="wAV">Value (wAV)</ToggleButton>
        </ToggleButtonGroup>
        {this.state.sortType !== 'similarity' &&
          <div sx={{ p: 1, m: 2}}>
            <Typography variant="h6" align='center' >
              Filter by Minimum Percent Similar 
            </Typography>
            <Slider value={this.state.minSimilarPercent} min={0} max={100} valueLabelDisplay="on"
              onChange={this.handleMinSimilarChange.bind(this)}
              aria-label="Always visible"
              getAriaValueText={this.valueText}
            />
          </div>
        }
        <List component="nav">
          {playerObjectsFiltered.map(each => (
            <React.Fragment key={each.id}>
              <ListItem button onClick={() => this.handleClick(each.id)}>
                <ListItemText inset primary={each.nameHeader}  primaryTypographyProps={{
                    color: 'primary',
                    fontWeight: 'medium',
                    variant: 'h5',
                    fontSize: 20,
                  }}/>
                  <Typography variant="h6" align = 'center' >
                  {this.state.sortType === 'wAV' ? (
                    <p>wAV: {each.wAV ? each.wAV : 0}</p>
                  ) : this.state.sortType === 'pickNumber' ? (
                    <p>Pick: {each.pickNumber === -1 ? 'UDFA' : each.pickNumber}</p>
                  ) : (
                    <p>Similarity: { ((5-each.similarity)*20).toFixed(2)}%</p>
                  )}
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
  {this.state.checked && <CreateTable  sx={{ flexGrow: 1 }} playerInfo={each.info} originalInfo = {this.mainSiteComponent.state.originalinfo} originalPlayerName = {this.mainSiteComponent.state.originalPlayerName} playerName = {each.realName}/>}
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
export default ResultPage;
