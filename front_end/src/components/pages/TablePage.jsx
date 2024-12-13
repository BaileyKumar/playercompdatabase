import React from 'react';
import {StateSwitchComponent} from '../StateSwitchComponent';
import Button from '@mui/material/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Slider from '@mui/material/Slider';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';


import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Slider as SliderReact} from 'primereact/slider';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { MultiSelect } from 'primereact/multiselect';


import fetch from 'cross-fetch'

import '../../index.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';


class TablePage extends StateSwitchComponent{
  constructor(props){
    super(props);
    this.mainSiteComponent = props.mainSiteComponent;
    this.fetchData = this.fetchData.bind(this);
    this.formatData = this.formatData.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
    this.setCollegeValues = this.setCollegeValues.bind(this);
    this.positions = [
      { label: "QB", value : "QB"},
      { label: "RB", value : "RB"},
      { label: "WR", value : "WR"},
      { label: "TE", value : "TE"},
      { label: "OL", value: "OL" },
      { label: "OT", value : "OT"},
      { label: "IOL", value : "IOL"},
      { label: "EDGE", value : "EDGE"},
      { label: "DE", value : "DE"},
      { label: "IDL", value : "IDL"},
      { label: "ILB", value: "ILB" },
      { label: "LB", value : "LB"},
      { label: "CB", value : "CB"},
      { label: "S", value : "S"},
      { label: "DB", value: "DB" },
    ];

    this.state = {
      tableInfo : '',
      year: 2000,
      position: 'QB',
      showTable: false,
      includeUDFA: null,
      tableData: '',
      firstPage: 0,
      rowsOnPage: 10,
      minMaxValues: {
        height : [65, 82],
        weight : [140, 400],
        handsize: [7.13, 11.75],
        armlength: [27, 38],
        fourtytime: [4.22, 6.07],
        verticalleap: [17, 46],
        broadjump: [70, 140],
        shuttletime: [3.76, 5.56],
        threecone: [6.34, 9.18],
        pickNumber: [0,350],
        round: [0,12],
        wAV: [-1,184]
      },
      filters : {
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'college': { value: null, matchMode: FilterMatchMode.IN },
        'height': { value: null, matchMode: FilterMatchMode.BETWEEN },
        'weight': { value: null, matchMode: FilterMatchMode.BETWEEN },
        'handsize': { value: null, matchMode: FilterMatchMode.BETWEEN },
        'armlength': { value: null, matchMode: FilterMatchMode.BETWEEN },
        'fourtytime': { value: null, matchMode: FilterMatchMode.BETWEEN },
        'verticalleap': { value: null, matchMode: FilterMatchMode.BETWEEN },
        'broadjump': { value: null, matchMode: FilterMatchMode.BETWEEN },
        'shuttletime': { value: null, matchMode: FilterMatchMode.BETWEEN },
        'threecone': { value: null, matchMode: FilterMatchMode.BETWEEN },
        'pickNumber': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        'round': {value: null, matchMode: FilterMatchMode.BETWEEN},
        'wAV': {value: null, matchMode: FilterMatchMode.BETWEEN}
      },
      globalFilter : '',
      collegeValues : []
    }
// [1990, "Patrick Williams", "Arkansas", "SS", 73.5, 197, 8.75, 31.0, 4.62, 10, 32.5, 112.0, 4.4, ""]
    this.columns = [
      {field: "Position", header: "Position"},
      {field: "Name", header: "Name"},
      {field: "Year", header: "Year"},
      {field: "College", header: "College"},
      {field: "Height", header: "Height"},
      {field: "Weight", header: "Weight"},
      {field: "40 Time", header: "40 Time"},
      {field: "Hand Size", header: "Hand Size"},
      {field: "Arm Length", header: "Arm Length"},
      {field: "Vertical Leap", header: "Vertical Leap"},
      {field: "Broad Jump", header: "Broad Jump"},
      {field: "Shuttle Time", header: "Shuttle Time"},
      {field: "3 Cone", header: "3 Cone"},
      {field: "Pick Number", header: "Pick Number"},
      {field: "Round", header: "Round"},
      {field: "wAV", header: "wAV"}
    ]
  }

fetchData(){
  const postOptions = {
    method: 'Post',
    headers: {'Content-Type': 'application/json'},
    contentType: "application/json; charset=utf-8",
    body: JSON.stringify({position: this.state.position, year: this.state.year})

  }
  fetch('/api/getData', postOptions)
  .then(res => res.json())
  .then(data =>{
    this.setState({ tableInfo: data, showTable: true, firstPage: 0}, ()=> this.formatData())
    this.setCollegeValues();
  });
}

formatData(){
  var formattedData = []
  // (2014, 'Connor Shaw', 'South Carolina', 'QB', 72.38, 206, 9.25, 30.0, 4.66, '', 34.0, 115.0, 4.33, 7.07)
  for (var i = 0; i < this.state.tableInfo.length; i++){
    var currentPlayerInfo = this.state.tableInfo[i]
    formattedData.push(
      {
        year : currentPlayerInfo[0],
        name : currentPlayerInfo[1],
        college: currentPlayerInfo[2],
        // position: currentPlayerInfo[3],
        height: currentPlayerInfo[4],
        weight: currentPlayerInfo[5],
        // handsize: currentPlayerInfo[6],
        armlength: currentPlayerInfo[7],
        fourtytime: currentPlayerInfo[8],
        verticalleap: currentPlayerInfo[10],
        broadjump: currentPlayerInfo[11],
        shuttletime: currentPlayerInfo[12],
        threecone: currentPlayerInfo[13],
        pickNumber: currentPlayerInfo[14],
        round: currentPlayerInfo[15],
        wAV: currentPlayerInfo[16]

      }
    )
  }
  this.setState({tableData: formattedData});
}

handleChangePosition(event) {
  this.setState({position: event.target.value})
}

handleYearChange(event){
  this.setState({year: event.target.value})
}
setCollegeValues(){
  const _collegeValues = []
  this.state.tableData.forEach( player => {
    if (!_collegeValues.includes(player.college) && player.college){
      _collegeValues.push({name : player.college})
    }
  })
  _collegeValues.sort((a, b) => a.name.localeCompare(b.name))
  this.setState({
    collegeValues : _collegeValues
  })
}
resetFilter(){
  this.setState({
    filters : {
      'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
      'college': { value: null, matchMode: FilterMatchMode.IN },
      'height': { value: null, matchMode: FilterMatchMode.BETWEEN },
      'weight': { value: null, matchMode: FilterMatchMode.BETWEEN },
      'handsize': { value: null, matchMode: FilterMatchMode.BETWEEN },
      'armlength': { value: null, matchMode: FilterMatchMode.BETWEEN },
      'fourtytime': { value: null, matchMode: FilterMatchMode.BETWEEN },
      'verticalleap': { value: null, matchMode: FilterMatchMode.BETWEEN },
      'broadjump': { value: null, matchMode: FilterMatchMode.BETWEEN },
      'shuttletime': { value: null, matchMode: FilterMatchMode.BETWEEN },
      'threecone': { value: null, matchMode: FilterMatchMode.BETWEEN },
      'pickNumber': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
      'round': {value: null, matchMode: FilterMatchMode.BETWEEN},
      'wAV': {value: null, matchMode: FilterMatchMode.BETWEEN}
    },
    globalFilter : ''
  })
}
  render() {
    const onGlobalFilterChange= (e) => {
      const value = e.target.value;
      let _filters1 = { ...this.state.filters };
      _filters1['global'].value = value;
      this.setState({
        filters : _filters1,
        globalFilter: value
      })
    }
    const renderHeader = () => {
      return (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={this.resetFilter} style={{backgroundColor : '#42a5f5', color : 'white'}} variant="contained" startIcon={<FilterAltOffIcon />}>
          Clear Filters
          </Button>
              <span className="p-input-icon-left">
                  <i className="pi pi-search" />
                  <InputText value={this.state.globalFilter} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
              </span>
              </div>
      )
    }
    const onCustomPage = (event) => {
        this.setState({
          firstPage: event.first,
          rowsOnPage: event.rows
        })
    }
    const collegeFilterTemplate = (options) => {
      return <MultiSelect value={options.value} options={this.state.collegeValues} onChange={(e) => options.filterCallback(e.value)} optionLabel="name" placeholder="Any" className="p-column-filter" />;
    }
    const pickNumberFilterTemplate = (options) => {
      return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)}/>
    }
    const sliderFilterTemplateDecimal = (options) => {
      const min = this.state.minMaxValues[options.field][0]
      const max = this.state.minMaxValues[options.field][1]
      options.value = options.value ? options.value : [min,max]
      return (
          <React.Fragment>
              <SliderReact value={options.value ? options.value : [min,max]} onChange={(e) => options.filterCallback(e.value)} min={min} max={max} range step={0.01}/>
              <Box sx={{justifyContent: 'space-between', p : 1 }} display='flex' alignItems='center' className="flex align-items-center justify-content-between px-2">
              <span>
                <InputNumber
                  mode="decimal"
                  minFractionDigits={0}
                  maxFractionDigits={2}
                  value={options.value[0]}
                  onChange={(e) => {
                    options.value[0] = e.value
                    options.filterCallback(options.value)
                  }}/>
              </span>
              <span>
                <InputNumber
                  mode="decimal"
                  minFractionDigits={0}
                  maxFractionDigits={2}
                  value={options.value ? options.value[1] : max}
                  onChange={(e) => {
                    options.value[1] = e.value
                    options.filterCallback(options.value)
                  }}/>
              </span>
              </Box>
          </React.Fragment>
      )
    }
    const sliderFilterTemplate = (options) => {
      const min = this.state.minMaxValues[options.field][0]
      const max = this.state.minMaxValues[options.field][1]
      options.value = options.value ? options.value : [min,max]
      return (
        <React.Fragment>
            <SliderReact value={options.value ? options.value : [min,max]} onChange={(e) => options.filterCallback(e.value)} min={min} max={max} range/>
            <Box sx={{justifyContent: 'space-between', p : 1 }} display='flex' alignItems='center' className="flex align-items-center justify-content-between px-2">
            <span>
              <InputNumber
                value={options.value[0]}
                onChange={(e) => {
                  options.value[0] = e.value
                  options.filterCallback(options.value)
                }}/>
            </span>
            <span>
              <InputNumber
                value={options.value[1]}
                onChange={(e) => {
                  options.value[1] = e.value
                  options.filterCallback(options.value)
                }}/>
            </span>
            </Box>
        </React.Fragment>
      )
    }
    const template = {
        layout: 'RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink',
        'RowsPerPageDropdown': (options) => {
            const dropdownOptions = [
                { label: 10, value: 10 },
                { label: 20, value: 20 },
                { label: 50, value: 50 }
            ];

            return (
                <React.Fragment>
                    <span className="mx-1" style={{ color: 'var(--text-color)', userSelect: 'none' }}>Items per page: </span>
                    <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} />
                </React.Fragment>
            );
        },
        'CurrentPageReport': (options) => {
            return (
                <span style={{ color: 'var(--text-color)', userSelect: 'none', width: '120px', textAlign: 'center' }}>
                    {options.first} - {options.last} of {options.totalRecords}
                </span>
            )
        }
      };

    const header = renderHeader();
    return (
      <div>
      <Box sx={{ gap: 30, m:2.5, justifyContent: 'center' }} flexGrow =" 1" display='flex' alignItems="flex-start" flexDirection="column">
      <Typography align= "center" id="track-false-slider" variant="h6" gutterBottom>
       Use The Slider Below To Determine The Oldest Draft Class To Get Prospects From
     </Typography>
     <Dropdown
        options = {this.positions}
        value = {this.state.position ? this.state.position : "QB"}
        onChange={this.handleChangePosition.bind(this)}>
      </Dropdown>
      <Slider value={this.state.year || 2000} min={1987} max={2024} valueLabelDisplay="on"
        onChange={this.handleYearChange.bind(this)}
        aria-label="Always visible"
        getAriaValueText={this.valueText}
        />
      <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={this.fetchData}>
          Search
        </Button>
        </Box>
      { this.state.showTable &&
        <div>
        <Typography variant="h5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
           To include/exclude UDFAs, set the Pick Number filter Equal/Not equals to -1.
        </Typography>
        <br/>
        <DataTable width = "100%" value={this.state.tableData} showGridlines stripedRows paginator filters={this.state.filters} filterDisplay="menu"
        paginatorTemplate={template} first={this.state.firstPage} rows={this.state.rowsOnPage} onPage={onCustomPage} header={header} globalFilterFields={['name']}>
            <Column field="name" header="Name" sortable></Column>
            <Column field="year" header="Year" sortable></Column>
            <Column field="college" header="College" sortable filter showFilterMatchModes={false} filterElement={collegeFilterTemplate}/>
            <Column field="height" header="Height" dataType="numeric" showFilterMatchModes={false} sortable filter filterElement={sliderFilterTemplateDecimal}/>
            <Column field="weight" header="Weight" dataType="numeric" showFilterMatchModes={false} sortable filter filterElement={sliderFilterTemplate}/>
            <Column field="fourtytime" header="40 Time" dataType="numeric" showFilterMatchModes={false} sortable filter filterElement={sliderFilterTemplateDecimal}/>
            <Column field="armlength" header="Arm Length" dataType="numeric" showFilterMatchModes={false} sortable filter filterElement={sliderFilterTemplateDecimal}/>
            <Column field="verticalleap" header="Vertical Leap" dataType="numeric" showFilterMatchModes={false} sortable filter filterElement={sliderFilterTemplateDecimal}/>
            <Column field="broadjump" header="Broad Jump" dataType="numeric" showFilterMatchModes={false} sortable filter filterElement={sliderFilterTemplateDecimal}/>
            <Column field="shuttletime" header="Shuttle Time" dataType="numeric" showFilterMatchModes={false} sortable filter filterElement={sliderFilterTemplateDecimal}/>
            <Column field="threecone" header="3 Cone" dataType="numeric" showFilterMatchModes={false} sortable filter filterElement={sliderFilterTemplateDecimal}/>
            <Column field="pickNumber" header="Pick Number" dataType="numeric" showFilterMatchModes={true} sortable filter filterElement={pickNumberFilterTemplate}/>
            <Column field="round" header="Round" dataType="numeric" showFilterMatchModes={false} sortable filter filterElement={sliderFilterTemplate}/>
            <Column field="wAV" header="wAV" dataType="numeric" showFilterMatchModes={false} sortable filter filterElement={sliderFilterTemplate}/>
        </DataTable>
        </div>
    }
    </div>
    );
  }
}

export default TablePage;
