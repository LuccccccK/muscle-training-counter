import { useEffect, useState } from 'react';
import Axios, { AxiosRequestConfig } from 'axios';
import { Box, Stack, Button, ButtonGroup, Backdrop, CircularProgress, Grid } from '@mui/material'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import dateFormat from '../../utility/date';
import './Register.css';
import { useSelector } from 'react-redux';
import { IStore } from '../../redux/store';

interface CounterResult {
  selectedDate: string
  countPushUp: number
  countAbdominalMuscles: number
  countSquat: number
}

interface TrainingSetting {
  name: string
}

interface Training extends TrainingSetting {
  count: number
}

const makeInitailState = (d: string) => {
  return {
    selectedDate: d,
    countPushUp: 0,
    countAbdominalMuscles: 0,
    countSquat: 0,
  } as CounterResult
}

const Register = () => {
  const [isOpenSpinner, setIsOpenSpinner] = useState(true);
  const [state, setState] = useState({} as CounterResult)
  const [trainings, setTrainings] = useState([] as Training[])

  const increment = (i: number) => {
    
  };

  const credential = useSelector((state: IStore) => state.credential.credential);
  const config: AxiosRequestConfig = {
    headers: {
      "Authorization": credential
    }
  }

  // 初回レンダリング時に必要なデータを取得しセット
  useEffect(() => {
    const currentDate = dateFormat(new Date());
    const fetchResultData = async () => {
      const result = await Axios.get("https://mtc.haba.link/api/result?selectedDate=" + currentDate);
      const appState = result.data ? result.data as CounterResult : makeInitailState(currentDate);
      setState(appState);
    }
    fetchResultData();

    const fetchSettingData = async () => {
      const setting = await Axios.get("http://localhost:3001/nest-api/setting", config)
      const trainings: Training[] = setting.data.trainings.map((e: TrainingSetting) => {
        return {
          name: e.name,
          count: 0 // todo: 取得したデータをはめ込む必要あり
        } as Training
      })
      setTrainings(trainings);
    }
    fetchSettingData()
    
    setIsOpenSpinner(false);
  }, [])

  // 日付切り替え処理
  const switchDate = (d: DateClickArg) => {
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

    setIsOpenSpinner(true);
    Axios.get("https://mtc.haba.link/api/result?selectedDate=" + d.dateStr).then((response) => {
      const appState = response.data ? response.data as CounterResult : makeInitailState(d.dateStr);
      setState(appState);
      setIsOpenSpinner(false);
    });
  }

  // 筋トレ結果を保存
  const save = () => {
    setIsOpenSpinner(true);
    const body = {
      selectedDate: state.selectedDate,
      countAbdominalMuscles: state.countAbdominalMuscles,
      countPushUp: state.countPushUp,
      countSquat: state.countSquat
    } as CounterResult
    Axios.post("https://mtc.haba.link/api/result", body).then((response) => {
      setIsOpenSpinner(false);
    });
  }

  return (
    <Box sx={{ pb: 7 }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isOpenSpinner}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]} // 日付単位での表示、日付に対するinteraction実現
        initialView="dayGridMonth" 
        contentHeight={ 450 }
        dateClick={(arg) => switchDate(arg)}
      />
      <Grid container spacing={1} m={1} alignItems="center">
        <Grid item xs={4}>
          <Box sx={{ textAlign: 'right' }}>日付：</Box>
        </Grid>
        <Grid item xs={8}>
          <Box>{state.selectedDate}</Box>
        </Grid>
        {
          trainings.map((e, index) => {
            return (
              <Grid key={`training-${index}`} container spacing={1} m={0} alignItems="center">
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'right' }}>{e.name}：</Box>
                </Grid>
                <Grid item xs={2}>
                  <Box>{e.count}</Box>
                </Grid>
                <Grid item xs={6}>
                  <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button 
                      onClick={() => {
                        setTrainings((prevState) => 
                          prevState.map((e, i) => {
                            if (i !== index) { return e; } // 更新対象ではない要素はそのままreturn
                            return { ...e, count: e.count + 1 }
                          })
                        );
                      }}
                    >+1</Button>
                    <Button 
                      onClick={() => {
                        setTrainings((prevState) => 
                          prevState.map((e, i) => {
                            if (i !== index) { return e; } // 更新対象ではない要素はそのままreturn
                            return { ...e, count: e.count - 1 }
                          })
                        );
                      }}
                    >-1</Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
            )
          })
        }
      </Grid>
      <Stack direction="column" spacing={1} m={2}>
        <Button variant="contained" color="primary" onClick={() => save()}>Save</Button>
      </Stack>
    </Box>
  );
}
export default Register;