import React from 'react';
import Axios from 'axios';

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
    // todo: ymを切り替えれるようにする
    Axios.get("https://mtc.haba.link/nest-api/summary?ym=2022-08").then((response) => {
      this.setState({results: response.data});
    });
  }

  render() {
    return (
      <div>
        <BarChart
          width={375}
          height={300}
          data={this.state.results}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="selectedDate" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="countPushUp" name="腕立て伏せ" stackId="a" fill="#8884d8" />
          <Bar dataKey="countAbdominalMuscles" name="腹筋" stackId="a" fill="#82ca9d" />
          <Bar dataKey="countSquat" name="スクワット" stackId="a" fill="#cc7c5e" />
        </BarChart>
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
      </div>
    )
  }
}
export default Summary;