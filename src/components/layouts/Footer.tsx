// Import Router Component
import { Link } from "react-router-dom";

// Import UI Component
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material'
import { AppRegistration, Settings, Summarize, Timer } from '@mui/icons-material';

// FunctionComponent Props 定義
type Props = {
  component: React.ReactNode;
}

export const Footer = (props: Props) => {
  return (
    <>
      {props.component}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        {/* ページフッター部にナビゲーションリンクを固定表示 */}
        {/* BottomNavigationAction で Link によるページングをする場合、 */}
        {/* BrowserRouter 内にコンポーネントを配置しないと、リンク先を認識しないいため注意 */}
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
          <BottomNavigationAction 
            label="Timer" 
            icon={<Timer />} 
            component={Link}
            to="/timer"
          />
          <BottomNavigationAction 
            label="Setting" 
            icon={<Settings />} 
            component={Link}
            to="/setting"
          />
        </BottomNavigation>
      </Paper>
    </>
  );
}