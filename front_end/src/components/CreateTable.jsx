import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function createData(name, calories, fat) {
 return { name, calories, fat };
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    border: "1px solid black",
    fontSize: 14,

  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: "1px solid black",


  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },

}));
const player_rows = []
const labels = ['Height (in)', 'Weight (lb)', 'Hand Size (in)', 'Arm Length (in)', '40 Time (s)',"Bench Press (reps)", "Vertical Leap (in)", "Broad Jump (in)", "Shuttle Time (s)", "3 Cone (s)"]
class CreateTable extends React.Component {
  constructor(props){
    super(props)
    var playerInfo = props.playerInfo
    var originalinfo = props.originalInfo
    this.state = {
      playerInfo: props.playerInfo,
      originalinfo: props.originalInfo,
      originalPlayerName: props.originalPlayerName,
      playerName: props.playerName
      }

      for(var i=0; i <Object.keys(playerInfo).length ; i++){
        player_rows[i] = createData(labels[i],playerInfo[i],originalinfo[i])
      }
    };



render() {
  return (
    <Table sx={{width:'100%', overflowX:'auto',p: 1, m:1 }}aria-label="customized table" >
        <TableHead>
          <TableRow>
            <StyledTableCell>Trait</StyledTableCell>
            <StyledTableCell >{this.state.playerName}</StyledTableCell>
            <StyledTableCell >{this.state.originalPlayerName}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {player_rows.map((row) => (
            <StyledTableRow
              key={row.name}
            >
              <StyledTableCell  component="th" scope="row">
                {row.name}
              </StyledTableCell >
              <StyledTableCell  align="right">{row.calories}</StyledTableCell >
              <StyledTableCell  align="right">{row.fat}</StyledTableCell >
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
  );
}
}
export default CreateTable;
