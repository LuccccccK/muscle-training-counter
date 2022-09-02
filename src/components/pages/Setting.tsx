import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller, useFieldArray } from 'react-hook-form'
import Axios, { AxiosRequestConfig } from "axios";
import { Button, Stack, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { IStore } from "../../redux/store";

interface TrainingSetting {
  name: string
}

interface SettingData {
  name: string
  trainings: TrainingSetting[]
}

const validationRules = {
  name: { required: '名前を入力してください。' },
  trainings: { required: 'トレーニング名を入力してください。' }
}

const Setting = () => {
  const [data, setData] = useState<SettingData>({
    name: '',
    trainings: []
  } as SettingData);

  const { register, control, handleSubmit, reset, formState: { errors }} = useForm<SettingData>({})

  // ネストされた項目を扱う場合には、useFieldArray を利用する
  const { fields } = useFieldArray({
    control,
    name: "trainings",
  });

  const credential = useSelector((state: IStore) => state.credential.credential);
  const config: AxiosRequestConfig = {
    headers: {
      "Authorization": credential
    }
  }

  const onSubmit: SubmitHandler<SettingData> = (data: SettingData) => {
    Axios.put("http://localhost:3001/nest-api/setting", data, config);
  }

  // 初回レンダリング時のみ実行
  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get<SettingData>("http://localhost:3001/nest-api/setting", config);
      if (result.data.trainings.length < 1) {
        // todo: トレーニングの種類数を画面上から操作できるようにする
        result.data.trainings.push({} as SettingData)
        result.data.trainings.push({} as SettingData)
        result.data.trainings.push({} as SettingData)
      }
      setData(result.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    reset(data);
  }, [reset, data]);

  return (
    <Stack component="form" noValidate spacing={2} sx={{ m: 2, width: '25ch' }} onSubmit={handleSubmit(onSubmit)}>
      <Controller name="name" defaultValue="" control={control} rules={validationRules.name}
        render={({ field }) => (
          <TextField type="text" label="名前"
            {...field}
            {...register("name")}
            error={errors.name !== undefined}
            helperText={errors.name?.message}
          />
        )}
      />
      {
        fields.map((e, index) => {
          return (
            <Controller key={e.name} name={`trainings.${index}.name`} defaultValue="" control={control} rules={validationRules.trainings}
              render={({ field }) => (
                <TextField type="text" label="トレーニング名"
                  {...field}
                  {...register(`trainings.${index}.name`)}
                  error={(errors.trainings !== undefined ? errors.trainings[index]?.name : undefined) !== undefined}
                  helperText={errors.trainings !== undefined ? errors.trainings[index]?.name?.message : null}
                />
              )}
            />
          )
        })
      }
      <Stack direction="column" spacing={1} m={2}>
        <Button variant="contained" color="primary" type="submit">Save</Button>
      </Stack>
    </Stack>
  )
}

export default Setting;