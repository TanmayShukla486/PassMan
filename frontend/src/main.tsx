import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App.tsx';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import { AuthContextProvider } from './context/auth/AuthContext.tsx';
import Register from './pages/RegisterPage.tsx';
import Login from './pages/LoginPage.tsx';
import OtpVerification from './pages/OtpVerification.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/register" />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/passwords',
    element: <App />,
  },
  {
    path: '/verify',
    element: <OtpVerification />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
