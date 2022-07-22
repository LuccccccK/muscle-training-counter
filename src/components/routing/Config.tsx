// Import Router Component
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RouteAuthGuard } from "./AuthGuard";

// Import Custom Component
import { Login } from './../pages/Login';
import Register from '../pages/Register';
import Summary from '../pages/Summary';

import { AuthProvider } from './../providers/Auth';

export const RouteConfig = () => {
  return (
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
    </BrowserRouter>
  )
}