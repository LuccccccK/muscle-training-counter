import { useEffect, useState } from "react";
import Axios from "axios";
import { Box } from "@mui/material";

const getSetting = () => {
  Axios.get("http://localhost:3001/nest-api/setting").then((response) => {
    console.log(response);
    return response
  });
}

const Setting = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get("http://localhost:3001/nest-api/setting");
      setData(result.data);
      console.log(data)
    }
    fetchData();
  }, []);

  return (
    <Box>
      {data}
    </Box>
  )
}

export default Setting;