// Import Router Component
import { BrowserRouter, Routes, Route, RouteProps, Link } from "react-router-dom";

// Import UI Component
import { Paper, BottomNavigation, BottomNavigationAction, Box } from '@mui/material'
import { AppRegistration, Summarize } from '@mui/icons-material';

import './App.css';

// Import Custom Component
import { Login } from './components/Login';
import Register from './components/Register';
import Summary from './components/Summary';
import { AuthProvider } from './components/providers/Auth';
import { RouteAuthGuard } from './components/routing/AuthGuard';

const App = () => {
  return (
    <Box sx={{ pb: 7 }}>
      <BrowserRouter>
        {/* AuthContext を利用するため、AuthProvider Component で Routing定義を囲む */}
        <AuthProvider>
          {/* Routing 定義 */}
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/" element={
              <RouteAuthGuard component={<Register />} />}>
            </Route>  
            <Route path="/summary" element={
              <RouteAuthGuard component={<Summary />} />}>
            </Route>
          </Routes>
        </AuthProvider>
        {/* ページフッター部にナビゲーションリンクを固定表示 */}
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
          {/* BottomNavigationAction で Link によるページングをする場合、 */}
          {/* BrowserRouter 内にコンポーネントを配置しないと、リンク先を認識したいため、ここに記述 */}
          <BottomNavigation showLabels>
            <BottomNavigationAction 
              label="Register" 
              icon={<AppRegistration />} 
              component={Link}
              to="/"
            />
            <BottomNavigationAction 
              label="Summary" 
              icon={<Summarize />} 
              component={Link}
              to="/summary"
            />
          </BottomNavigation>
        </Paper>
      </BrowserRouter>
    </Box>
  );
}

export default App;
