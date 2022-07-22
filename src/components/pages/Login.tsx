import React from 'react';
import { NavigateFunction, useNavigate } from "react-router-dom";

// Import UI Component
import { Box, Grid, Paper, Avatar, Typography } from '@mui/material'
import { Lock } from '@mui/icons-material';

// Import OAuth (Google) Module
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';

// Import Provider Component
import { AuthContextType, useAuthContext } from './../providers/index'

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID ? process.env.REACT_APP_GOOGLE_CLIENT_ID : "";

export const Login = () => {
  // React Hook がまだあまり理解できていないが、const定義しないと、
  // useAuthContext() を呼び出せない。
  const auth: AuthContextType = useAuthContext();
  const navigate: NavigateFunction = useNavigate();

  const onSuccess = (response: CredentialResponse) => {
    console.log('CredentialResponse.credential: ' + response.credential);
    auth.signin(response.credential ? response.credential : "", () => {
      navigate("/");
    });
  }

  const onError = () => {
    alert('ログインできませんでした')
  }

  return (
    <Paper elevation={3} sx={{ p: 4, height: "70vh", width: "280px", m: "20px auto" }}>
      <Grid
        container
        direction="column"
        alignItems="center"
      >
        <Avatar>
          <Lock />
        </Avatar>
        <Typography variant={"h5"} sx={{ m: "30px" }}>
          Sign In
        </Typography>
        <Box mt={3}>
          <GoogleOAuthProvider clientId={ googleClientId }>
            <GoogleLogin
              onSuccess={ onSuccess }
              onError={ onError }
            />
          </GoogleOAuthProvider>
        </Box>
      </Grid>
    </Paper>
  )
}
