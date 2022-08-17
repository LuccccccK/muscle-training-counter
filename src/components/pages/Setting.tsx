import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import Axios from "axios";
import { Button, Stack, TextField } from "@mui/material";

interface TrainingSetting {
  name: string
}

interface SettingData {
  name: string
  trainings: TrainingSetting[]
}

const validationRules = {
  name: { required: '名前を入力してください。' }
}

const Setting = () => {
  const [data, setData] = useState<SettingData>({
    name: '',
    trainings: []
  } as SettingData);

  const { register, control, handleSubmit, reset, formState: { errors }} = useForm<SettingData>({})

  const onSubmit: SubmitHandler<SettingData> = (data: SettingData) => {
    console.log(`submit: ${data.name}`)
  }

  // 初回レンダリング時のみ実行
  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get("http://localhost:3001/nest-api/setting");
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
      <Stack direction="column" spacing={1} m={2}>
        <Button variant="contained" color="primary" type="submit">Save</Button>
      </Stack>
    </Stack>
  )
}

export default Setting;