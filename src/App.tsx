import React from 'react';
import {Stack, Button} from '@mui/material'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja'; 
import logo from './logo.svg';
import './App.css';

interface Hoge {
  value: number
}

const App = () => {
  return <Counter />
}

class Counter extends React.Component<{}, Hoge>
{
  constructor(props: any)
  {
    super(props);
    this.state = {
      value : 0
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
          plugins={[dayGridPlugin]} 
          initialView="dayGridMonth" 
          locales={[jaLocale]}
          locale='ja'
        />
        <div>
          カウント値：{this.state.value}
        </div>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="primary" onClick={this.onIncrement}>+</Button>
          <Button variant="contained" color="primary" onClick={this.onDecrement}>-</Button>
        </Stack>
      </div>
    );
  }
}
export default App;
