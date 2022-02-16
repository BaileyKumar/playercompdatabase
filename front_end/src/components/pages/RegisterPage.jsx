import React from 'react';
import {StateSwitchComponent} from '../StateSwitchComponent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Slider from '@mui/material/Slider';

class RegisterPage extends StateSwitchComponent{
  constructor(props){
    super(props);

    this.mainSiteComponent = props.mainSiteComponent;
    this.search = this.search.bind(this);

    this.state = {
      name:'Player Name',
      position:'QB',
      height: this.mainSiteComponent.state.originalStateInfo.height ?? '',
      weight: this.mainSiteComponent.state.originalStateInfo.weight ??'',
      handsize:this.mainSiteComponent.state.originalStateInfo.handsize ??'',
      armlength: this.mainSiteComponent.state.originalStateInfo.armlength ?? '',
      fourtyyarddash: this.mainSiteComponent.state.originalStateInfo.fourtyyarddash ??'',
      benchpress: this.mainSiteComponent.state.originalStateInfo.benchpress ??'',
      verticalleap: this.mainSiteComponent.state.originalStateInfo.verticalleap ??'',
      broadjump: this.mainSiteComponent.state.originalStateInfo.broadjump ??'',
      shuttle: this.mainSiteComponent.state.originalStateInfo.shuttle ??'',
      threecone: this.mainSiteComponent.state.originalStateInfo.threecone ??'',
      year: this.mainSiteComponent.state.originalStateInfo.year ??'2000',
      sliderWeights: {
        height: this.mainSiteComponent.state.originalStateInfo.sliderWeights ? this.mainSiteComponent.state.originalStateInfo.sliderWeights.height : '1',
        weight:this.mainSiteComponent.state.originalStateInfo.sliderWeights ? this.mainSiteComponent.state.originalStateInfo.sliderWeights.weight : '1',
        handsize:this.mainSiteComponent.state.originalStateInfo.sliderWeights ? this.mainSiteComponent.state.originalStateInfo.sliderWeights.handsize : '1',
        armlength: this.mainSiteComponent.state.originalStateInfo.sliderWeights ? this.mainSiteComponent.state.originalStateInfo.sliderWeights.armlength : '1',
        fourtyyarddash: this.mainSiteComponent.state.originalStateInfo.sliderWeights ? this.mainSiteComponent.state.originalStateInfo.sliderWeights.fourtyyarddash : '1',
        benchpress: this.mainSiteComponent.state.originalStateInfo.sliderWeights ? this.mainSiteComponent.state.originalStateInfo.sliderWeights.benchpress : '1',
        verticalleap: this.mainSiteComponent.state.originalStateInfo.sliderWeights ? this.mainSiteComponent.state.originalStateInfo.sliderWeights.verticalleap : '1',
        broadjump: this.mainSiteComponent.state.originalStateInfo.sliderWeights ? this.mainSiteComponent.state.originalStateInfo.sliderWeights.broadjump : '1',
        shuttle: this.mainSiteComponent.state.originalStateInfo.sliderWeights ? this.mainSiteComponent.state.originalStateInfo.sliderWeights.shuttle : '1',
        threecone: this.mainSiteComponent.state.originalStateInfo.sliderWeights ? this.mainSiteComponent.state.originalStateInfo.sliderWeights.threecone : '1'
      }
    };
}
  clean(str){
    return str.replace(/[^a-z-A-Z ]/g, "").replace(/ +/, " ")
  }
  search(){
    const postOptions = {
      method: 'Post',
      headers: {'Content-Type': 'application/json'},
      contentType: "application/json; charset=utf-8",
      body: JSON.stringify({ name: this.state.name, position: this.state.position , height: this.state.height, weight: this.state.weight, handsize: this.state.handsize, armlength: this.state.armlength, fourtyyarddash: this.state.fourtyyarddash, benchpress: this.state.benchpress, verticalleap: this.state.verticalleap, broadjump: this.state.broadjump, shuttle: this.state.shuttle, threecone: this.state.threecone, year: this.state.year, sliderWeights: this.state.sliderWeights})

    }
    fetch('/request', postOptions)
    .then(res => res.json())
    .then(data =>{
      this.mainSiteComponent.setState({playerInfo: data.playerinfo, percentiles: data.percentiles, view: 'results', player_percentiles: data.player_percentiles, originalinfo: data.originalinfo, originalPlayerName: this.state.name, originalStateInfo: this.state, nameMap: data.nameMap})
    });
  }
  handleChangeName(event) {
    this.setState({name: this.clean(event.target.value)})
  }
  handleChangePosition(event) {
    this.setState({position: event.target.value})
  }
  handleChangeHeight(event) {
    this.setState({height: event.target.value})
  }
  handleChangeWeight(event) {
    this.setState({weight: event.target.value})
  }
  handleChangeHandSize(event){
    this.setState({handsize: event.target.value})
  }
  handleChangeArmLength(event){
    this.setState({armlength: event.target.value})
  }
  handleChangeFourtyYardDash(event){
    this.setState({fourtyyarddash: event.target.value})
  }
  handleChangeBenchPress(event){
    this.setState({benchpress: event.target.value})
  }
  handleChangeVerticalLeap(event){
    this.setState({verticalleap: event.target.value})
  }
  handleChangeBroadJump(event){
    this.setState({broadjump: event.target.value})
  }
  handleChangeShuttle(event){
    this.setState({shuttle: event.target.value})
  }
  handleChangeThreeCone(event){
    this.setState({threecone: event.target.value})
  }
  handleYearChange(event){
    this.setState({year: event.target.value})
  }

  handleChangeHeightSlider(event) {
    const newHeight = { ...this.state.sliderWeights, height : event.target.value };
    this.setState({sliderWeights : newHeight})
  }
  handleChangeWeightSlider(event) {
    const newHeight = { ...this.state.sliderWeights, weight : event.target.value };
    this.setState({sliderWeights : newHeight})
  }
  handleChangeHandSizeSlider(event){
    const newHeight = { ...this.state.sliderWeights, handsize : event.target.value };
    this.setState({sliderWeights : newHeight})

  }
  handleChangeArmLengthSlider(event){
    const newHeight = { ...this.state.sliderWeights, armlength : event.target.value };
    this.setState({sliderWeights : newHeight})
  }
  handleChangeFourtyYardDashSlider(event){
    const newHeight = { ...this.state.sliderWeights, fourtyyarddash : event.target.value };
    this.setState({sliderWeights : newHeight})
  }
  handleChangeBenchPressSlider(event){
    const newHeight = { ...this.state.sliderWeights, benchpress : event.target.value };
    this.setState({sliderWeights : newHeight})
  }
  handleChangeVerticalLeapSlider(event){
    const newHeight = { ...this.state.sliderWeights, verticalleap : event.target.value };
    this.setState({sliderWeights : newHeight})
  }
  handleChangeBroadJumpSlider(event){
    const newHeight = { ...this.state.sliderWeights, broadjump : event.target.value };
    this.setState({sliderWeights : newHeight})
  }
  handleChangeShuttleSlider(event){
    const newHeight = { ...this.state.sliderWeights, shuttle : event.target.value };
    this.setState({sliderWeights : newHeight})
  }
  handleChangeThreeConeSlider(event){
    const newHeight = { ...this.state.sliderWeights, threecone : event.target.value };
    this.setState({sliderWeights : newHeight})
  }

  render() {

    return (
      <div>
      <Box sx={{ p: 2, m:2 }} flexGrow =" 1"  justifyContent="center"
 textAlign= "center">

      <Typography variant="h6"  >
      Use The Sliders to Determine the Multiplier of Each Trait. Blank Traits Will Be Given a Multiplier of 0 Automatically.
      </Typography>
      </Box>
         <Box

            maxWidth="xs"
            height="70vh"
            display='flex'
            alignItems="flex-start"
            justifyContent="center"
            flexDirection="row"
            flexWrap = "wrap"
            flexGrow = "1"
            margin = "16x"

          sx={{ p: 2, m:2 }}
         >
          <FormControl       sx={{ p: 2, m:1 }}>
          <Select
               labelId="demo-simple-select-label"
               id="demo-simple-select"
               defaultValue ="QB"
               autoWidth
               sx={{ m: 1, minWidth: 120 }}
               onChange={this.handleChangePosition.bind(this)}
             >
             <MenuItem selected value="QB">QB</MenuItem>
             <MenuItem value="RB">RB</MenuItem>
             <MenuItem value="WR">WR</MenuItem>
             <MenuItem value="TE">TE</MenuItem>
             <MenuItem value="OT">OT</MenuItem>
             <MenuItem value="IOL">IOL</MenuItem>
             <MenuItem value="EDGE">EDGE</MenuItem>
             <MenuItem value="DE">DE</MenuItem>
             <MenuItem value="IDL">IDL</MenuItem>
             <MenuItem value="LB">LB</MenuItem>
             <MenuItem value="CB">CB</MenuItem>
             <MenuItem value="S">S</MenuItem>
             </Select>

          </FormControl>

          <FormControl       sx={{ p: 1, m:1 }}>
          <TextField


            variant="outlined"
            margin="normal"
            id="Name"
            label="Name"
            name="Name"
            autoComplete="Name"
            defaultValue = {this.mainSiteComponent.state.originalStateInfo.name === null ? "Player Name" : this.mainSiteComponent.state.originalStateInfo.name}
            onChange = {this.handleChangeName.bind(this)}
            autoFocus
          />
          </FormControl>

          {/*Set up the textfield appearance*/}
          <FormControl sx={{ p: 1, m:1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            name="Height"
            label="Height (inches)"
            id="Height"
            defaultValue = {this.mainSiteComponent.state.originalStateInfo.height}
            helperText="Ex. 77.5"
            autoComplete="Height"
            onChange = {this.handleChangeHeight.bind(this)}
          />
          <Slider defaultValue={this.mainSiteComponent.state.originalStateInfo.sliderWeights ? this.mainSiteComponent.state.originalStateInfo.sliderWeights.height : 1} min={0.25} max={2} step={0.25} valueLabelDisplay="auto"
            onChange={this.handleChangeHeightSlider.bind(this)}
            aria-label="Always visible"
            getAriaValueText={this.valueText}
           />
           </FormControl>


          <FormControl       sx={{ p: 1, m:1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            name="Weight"
            label="Weight (lbs)"
            type = "number"
            id="Weight"
            helperText="Ex. 277.5"
            defaultValue = {this.mainSiteComponent.state.originalStateInfo.weight}
            autoComplete="Weight"
            onChange = {this.handleChangeWeight.bind(this)}
          />
          <Slider defaultValue={this.mainSiteComponent.state.originalStateInfo.sliderWeights ? this.mainSiteComponent.state.originalStateInfo.sliderWeights.weight : 1} min={0.25} max={2} step={0.25} valueLabelDisplay="auto"
            onChange={this.handleChangeWeightSlider.bind(this)}
            aria-label="Always visible"
            getAriaValueText={this.valueText}
           />
           </FormControl>

  <FormControl       sx={{ p: 1, m:1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            name="Hand Size"
            type = "number"
            label="Hand Size"
            id="Hand Size"
            helperText="Ex. 9.75"
            autoComplete="Hand Size (inches)"
            defaultValue = {this.mainSiteComponent.state.originalStateInfo.handsize}
            onChange = {this.handleChangeHandSize.bind(this)}
          />
          <Slider defaultValue={this.mainSiteComponent.state.originalStateInfo.sliderWeights ? this.mainSiteComponent.state.originalStateInfo.sliderWeights.handsize : 1} min={0.25} max={2} step={0.25} valueLabelDisplay="auto"
            onChange={this.handleChangeHandSizeSlider.bind(this)}
            aria-label="Always visible"
            getAriaValueText={this.valueText}
           />
           </FormControl>

           <FormControl       sx={{ p: 1, m:1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            name="Arm Length"
            type = "number"
            label="Arm Length (inches)"
            id="Arm Length"
            helperText="Ex. 33.5"
            defaultValue = {this.mainSiteComponent.state.originalStateInfo.armlength}
            autoComplete="Arm Length"
            onChange = {this.handleChangeArmLength.bind(this)}
          />
          <Slider defaultValue={this.mainSiteComponent.state.originalStateInfo.sliderWeights ? this.mainSiteComponent.state.originalStateInfo.sliderWeights.armlength : 1} min={0.25} max={2} step={0.25} valueLabelDisplay="auto"
            onChange={this.handleChangeArmLengthSlider.bind(this)}
            aria-label="Always visible"
            getAriaValueText={this.valueText}
           />
           </FormControl>

           <FormControl       sx={{ p: 1, m:1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            name="40 Time"
            type = "number"
            label="40 Time"
            id="40 Time"
            helperText="Ex. 4.46"
            defaultValue = {this.mainSiteComponent.state.originalStateInfo.fourtyyarddash}
            autoComplete="40 Time"
            onChange = {this.handleChangeFourtyYardDash.bind(this)}
          />
          <Slider defaultValue={this.mainSiteComponent.state.originalStateInfo.sliderWeights ? this.mainSiteComponent.state.originalStateInfo.sliderWeights.fourtyyarddash : 1} min={0.25} max={2} step={0.25} valueLabelDisplay="auto"
            onChange={this.handleChangeFourtyYardDashSlider.bind(this)}
            aria-label="Always visible"
            getAriaValueText={this.valueText}
           />
           </FormControl>

           <FormControl       sx={{ p: 1, m:1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            name="Bench Press"
            type="number"
            label="Bench Press"
            id="Bench Press"
            defaultValue = {this.mainSiteComponent.state.originalStateInfo.benchpress}
            autoComplete="Bench Press"
            helperText="Ex. 12"
            onChange = {this.handleChangeBenchPress.bind(this)}
          />
          <Slider defaultValue={this.mainSiteComponent.state.originalStateInfo.sliderWeights ? this.mainSiteComponent.state.originalStateInfo.sliderWeights.benchpress : 1} min={0.25} max={2} step={0.25} valueLabelDisplay="auto"
            onChange={this.handleChangeBenchPressSlider.bind(this)}
            aria-label="Always visible"
            getAriaValueText={this.valueText}
           />
           </FormControl>

           <FormControl       sx={{ p: 1, m:1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            type = "number"
            name="Vertical Leap"
            label="Vertical Leap (inches)"
            id="Vertical Leap"
            defaultValue = {this.mainSiteComponent.state.originalStateInfo.verticalleap}
            autoComplete="Vertical Leap "
            helperText="Ex. 37.5"
            onChange = {this.handleChangeVerticalLeap.bind(this)}
          />
          <Slider defaultValue={this.mainSiteComponent.state.originalStateInfo.sliderWeights ? this.mainSiteComponent.state.originalStateInfo.sliderWeights.verticalleap : 1} min={0.25} max={2} step={0.25} valueLabelDisplay="auto"
            onChange={this.handleChangeVerticalLeapSlider.bind(this)}
            aria-label="Always visible"
            getAriaValueText={this.valueText}
           />
           </FormControl>

           <FormControl       sx={{ p: 1, m:1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            type = "number"
            name="Broad Jump"
            label="Broad Jump (inches)"
            id="Broad Jump"
            autoComplete="Broad Jump"
            helperText="Ex. 125"
            defaultValue = {this.mainSiteComponent.state.originalStateInfo.broadjump}
            onChange = {this.handleChangeBroadJump.bind(this)}
          />
          <Slider defaultValue={this.mainSiteComponent.state.originalStateInfo.sliderWeights ? this.mainSiteComponent.state.originalStateInfo.sliderWeights.broadjump : 1} min={0.25} max={2} step={0.25} valueLabelDisplay="auto"
            onChange={this.handleChangeBroadJumpSlider.bind(this)}
            aria-label="Always visible"
            getAriaValueText={this.valueText}
           />
           </FormControl>

           <FormControl       sx={{ p: 1, m:1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            name="Shuttle Time"
            label="Shuttle Time"
            type = "number"
            id="Shuttle Time"
            autoComplete="Shuttle Time"
            helperText="Ex. 4.51"
            defaultValue = {this.mainSiteComponent.state.originalStateInfo.shuttle}
            onChange = {this.handleChangeShuttle.bind(this)}
          />
          <Slider defaultValue={this.mainSiteComponent.state.originalStateInfo.sliderWeights ? this.mainSiteComponent.state.originalStateInfo.sliderWeights.shuttle : 1} min={0.25} max={2} step={0.25} valueLabelDisplay="auto"
            onChange={this.handleChangeShuttleSlider.bind(this)}
            aria-label="Always visible"
            getAriaValueText={this.valueText}
           />
           </FormControl>

           <FormControl       sx={{ p: 1, m:1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            name="3 Cone"
            label="3 Cone"
            id="3 Cone"
            type = "number"
            autoComplete="3 Cone"
            helperText="Ex. 7.15"
            defaultValue = {this.mainSiteComponent.state.originalStateInfo.threecone}
            onChange = {this.handleChangeThreeCone.bind(this)}
          />
          <Slider defaultValue={this.mainSiteComponent.state.originalStateInfo.sliderWeights ? this.mainSiteComponent.state.originalStateInfo.sliderWeights.threecone : 1} min={0.25} max={2} step={0.25} valueLabelDisplay="auto"
            onChange={this.handleChangeThreeConeSlider.bind(this)}
            aria-label="Always visible"
            getAriaValueText={this.valueText}
           />
           </FormControl>


          <Slider defaultValue={this.mainSiteComponent.state.originalStateInfo.year ?? 2000} min={1987} max={2021} valueLabelDisplay="on"
            onChange={this.handleYearChange.bind(this)}
            aria-label="Always visible"
            getAriaValueText={this.valueText}
           />
           <Typography id="track-false-slider" gutterBottom>
      Use The Slider Above To Determine The Oldest Draft Class To Get Prospects From
    </Typography>


            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.search}
            >
              Search
            </Button>
          </Box>
          </div>

    );
  }
}

export {RegisterPage};
