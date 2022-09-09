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

interface Setting {
  email: string
  trainings: TrainingSetting[]
}

interface TrainingSetting {
  name: string
}

interface Training extends TrainingSetting {
  count: number
}

interface TrainingResult {
  date: string
  trainings: Training[]
}

const Register = () => {
  const [isOpenSpinner, setIsOpenSpinner] = useState(true);
  const [date, setDate] = useState(new Date())
  const [trainings, setTrainings] = useState([] as Training[])

  const credential = useSelector((state: IStore) => state.credential.credential);
  const config: AxiosRequestConfig = {
    headers: {
      "Authorization": credential
    }
  }

  const fetcher = () => {
    setIsOpenSpinner(true);

    const fetch = async () => {
      const setting = await Axios.get<Setting>("http://localhost:3001/nest-api/setting", config)
      const result = await Axios.get<TrainingResult>("http://localhost:3001/nest-api/training-result?date=" + dateFormat(date), config);

      const trainings: Training[] = setting.data.trainings.map((e) => {
        const training = result.data.trainings.find((el) => el.name === e.name);
        const count = (training !== undefined) ? training.count : 0;
        return {
          name: e.name,
          count: count
        } as Training
      })
      setTrainings(trainings);
    }
    fetch()

    setIsOpenSpinner(false);
  }

  useEffect(fetcher, [])
  useEffect(fetcher, [date])

  // 日付切り替え処理
  const switchDate = async (d: DateClickArg) => {
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

    setDate(d.date);
  }

  // 筋トレ結果を保存
  const save = () => {
    setIsOpenSpinner(true);
    const body = {
      date: dateFormat(date),
      trainings: trainings
    } as TrainingResult
    Axios.put("http://localhost:3001/nest-api/training-result", body, config)
    .then((response) => {
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
          <Box>{dateFormat(date)}</Box>
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