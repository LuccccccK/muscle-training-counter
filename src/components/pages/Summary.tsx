import React from 'react';
import Axios from 'axios';

// Import MUI
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'
import { Paper } from '@mui/material'

interface CounterResult {
  selectedDate: string
  countPushUp: number
  countAbdominalMuscles: number
  countSquat: number
}

// Summary Classで利用するState 定義
interface SummaryState {
  results: CounterResult[]
}

const Summary = () => {
  return <SummaryComponent />
}

class SummaryComponent extends React.Component<{}, SummaryState>
{
  constructor(props: any)
  {
    super(props);
    this.state = {
      results: []
    } as SummaryState
  }

  componentDidMount()
  {
    Axios.get("https://mtc.haba.link/api/summary").then((response) => {
      console.log(response.data);
      this.setState({results: response.data});
    });
  }

  render() {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>日付</TableCell>
              <TableCell align="right">腕立て伏せ</TableCell>
              <TableCell align="right">腹筋</TableCell>
              <TableCell align="right">スクワット</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.results.map((row) => (
              <TableRow
                key={row.selectedDate}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.selectedDate}
                </TableCell>
                <TableCell align="right">{row.countPushUp}</TableCell>
                <TableCell align="right">{row.countAbdominalMuscles}</TableCell>
                <TableCell align="right">{row.countSquat}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}
export default Summary;