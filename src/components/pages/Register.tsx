import React from 'react';
import Axios from 'axios';

// Import MUI
import { Box, Stack, Button, ButtonGroup, Backdrop, CircularProgress } from '@mui/material'

// Import Fullcalendar Module
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja'; 

// Import Utility
import dateFormat from '../../utility/date';

import './Register.css';

interface CounterResult {
  selectedDate: string
  countPushUp: number
  countAbdominalMuscles: number
  countSquat: number
}

// Counter Classで利用するState 定義
interface CounterState extends CounterResult{
  isOpenSpinner: boolean
}

const makeInitailState = (d: string) => {
  return {
    isOpenSpinner: true,
    selectedDate: d,
    countPushUp: 0,
    countAbdominalMuscles: 0,
    countSquat: 0,
  } as CounterState
}

const Register = () => {
  return <RegisterComponent></RegisterComponent>
}

class RegisterComponent extends React.Component<{}, CounterState>
{
  constructor(props: any)
  {
    super(props);
    this.state = makeInitailState(dateFormat(new Date()));
  }

  componentDidMount()
  {
    const currentDate = dateFormat(new Date());
    Axios.get("https://mtc.haba.link/api/result?selectedDate=" + currentDate).then((response) => {
      const appState = response.data ? response.data as CounterState : makeInitailState(currentDate);
      appState.isOpenSpinner = false;
      this.setState(appState);
    });
  }

  // LocalStorageに筋トレ結果を保存
  save()
  {
    this.setState({ isOpenSpinner: true });
    const body = {
      selectedDate: this.state.selectedDate,
      countAbdominalMuscles: this.state.countAbdominalMuscles,
      countPushUp: this.state.countPushUp,
      countSquat: this.state.countSquat
    } as CounterResult
    Axios.post("https://mtc.haba.link/api/result", body).then((response) => {
      this.setState({ isOpenSpinner: false });
    });
  }

  // 日付切り替え処理
  switchDate(d: DateClickArg)
  {
    const currentDate = new Date();
    if (currentDate < d.date) {
      alert("未来日は選択できません");
      return;
    }

    // 日付押下時に選択した日付の背景色を切り替えるため、対象のclassNameを削除し、
    // 今回押下された日付の要素にclassNameをaddして、背景色の切り替えを実現
    // Fullcalendarの公式ドキュメントにも d.dayEl の Elementeに対し、
    // 直接 Style (Background Color) を切り替えるサンプルコードがあったため、この方式を採用
    Array.from(document.getElementsByClassName("date-selected")).forEach(e => {
      e.classList.remove("date-selected");
    });
    d.dayEl.classList.add("date-selected");

    this.setState({ isOpenSpinner: true });
    Axios.get("https://mtc.haba.link/api/result?selectedDate=" + d.dateStr).then((response) => {
      const appState = response.data ? response.data as CounterState : makeInitailState(d.dateStr);
      appState.isOpenSpinner = false;
      this.setState(appState);
    });
  }

  render()
  {
    return (
      <Box sx={{ pb: 7 }}>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={this.state.isOpenSpinner}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]} // 日付単位での表示、日付に対するinteraction実現
          initialView="dayGridMonth" 
          locales={[jaLocale]}
          locale='ja'
          contentHeight={ 500 }
          dateClick={(arg) => this.switchDate(arg)}
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
          <Button variant="contained" color="primary" onClick={() => this.save()}>Save</Button>
        </Stack>
      </Box>
    );
  }
}
export default Register;
