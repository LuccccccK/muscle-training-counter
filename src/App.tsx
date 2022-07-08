import React from 'react';
import {Stack, Button} from '@mui/material'

// fullcalendar module import
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja'; 

import logo from './logo.svg';
import './App.css';

interface Hoge {
  selectedDate: string
  value: number
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
      value: 0
    } as Hoge
  }

  //インクリメントする関数
  onIncrement = () => {
    //setStateでstateの値を更新します
    this.setState({ value : this.state.value + 1});
  }

  //デクリメントする関数
  onDecrement = () => {
    //setStateでstateの値を更新します
    this.setState({ value : this.state.value - 1});
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
        <Stack direction="column" spacing={1}>
          <div>日付：{this.state.selectedDate}</div>
          <div>カウント値：{this.state.value}</div>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="primary" onClick={this.onIncrement}>+</Button>
            <Button variant="contained" color="primary" onClick={this.onDecrement}>-</Button>
          </Stack>
        </Stack>
      </div>
    );
  }
}
export default App;
