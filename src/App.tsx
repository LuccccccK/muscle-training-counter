import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Import UI Component
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material'
import { AppRegistration, Summarize } from '@mui/icons-material';

import logo from './logo.svg';
import './App.css';

// Import Custom Component
import Register from './components/Register';
import Summary from './components/Summary';

const App = () => {
  return (
    <BrowserRouter>
      {/* Routing 定義 */}
      <Routes>
        <Route path="/" element={<Register />}></Route>  
        <Route path="/summary" element={<Summary />}></Route>
      </Routes>
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
  );
}

export default App;
