// Import UI Component
import { Box } from '@mui/material'

import './App.css';

// Import Custom Component
import { RouteConfig } from './components/routing';

const App = () => {
  return (
    <Box sx={{ pb: 7 }}>
      <RouteConfig></RouteConfig>
    </Box>
  );
}

export default App;
