import React from 'react';
import {Stack, Button, ButtonGroup} from '@mui/material'

// fullcalendar module import
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja'; 

import logo from './logo.svg';
import './App.css';

interface Hoge {
  selectedDate: string
  countPushUp: number
  countAbdominalMuscles: number
  countSquat: number
}

const App = () => {
  return <Counter />
}

// yyyy-mm-dd形式の文字列を返す
const dateFormat = (d: Date) => {
  return `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`.replace(/\n|\r/g, '');
}

class Counter extends React.Component<{}, Hoge>
{
  constructor(props: any)
  {
    super(props);
    const currentDate = new Date()
    this.state = {
      selectedDate: dateFormat(currentDate),
      countPushUp: 0,
      countAbdominalMuscles: 0,
      countSquat: 0
    } as Hoge
  }

  render()
  {
    return (
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]} // 日付単位での表示、日付に対するinteraction実現
          initialView="dayGridMonth" 
          locales={[jaLocale]}
          locale='ja'
          dateClick={(arg) => this.setState({ selectedDate: arg.dateStr})}
        />
        <Stack direction="column" spacing={1} m={2}>
          <div>日付：{this.state.selectedDate}</div>
          <Stack direction="row" spacing={2}>
            <div>腕立て伏せ：{this.state.countPushUp}</div>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button 
                onClick={() => this.setState({ countPushUp : this.state.countPushUp + 1})}
              >+1</Button>
              <Button 
                onClick={() => this.setState({ countPushUp : this.state.countPushUp - 1})}
              >-1</Button>
            </ButtonGroup>
          </Stack>
          <Stack direction="row" spacing={2}>
            {/* Todo: 並べ方が汚い... Grid を使うとよさそう */}
            <div>　　　腹筋：{this.state.countAbdominalMuscles}</div>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button 
                onClick={() => this.setState({ countAbdominalMuscles : this.state.countAbdominalMuscles + 1})}
              >+1</Button>
              <Button 
                onClick={() => this.setState({ countAbdominalMuscles : this.state.countAbdominalMuscles - 1})}
              >-1</Button>
            </ButtonGroup>
          </Stack>
          <Stack direction="row" spacing={2}>
            <div>スクワット：{this.state.countSquat}</div>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button 
                onClick={() => this.setState({ countSquat : this.state.countSquat + 1})}
              >+1</Button>
              <Button 
                onClick={() => this.setState({ countSquat : this.state.countSquat - 1})}
              >-1</Button>
            </ButtonGroup>
          </Stack>
          <Button variant="contained" color="primary" onClick={() => alert('Todo: Save Methods')}>Save</Button>
        </Stack>
      </div>
    );
  }
}
export default App;
