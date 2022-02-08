import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Profile from './components/layout/profile/Profile';

import NoMatch from './components/NoMatch';
import LoginForm from './components/session/LoginForm';
import SignupForm from './components/session/SignupForm';
import { AuthRoute, ProtectedRoute } from './util/routeUtil';

function App() {
  return (
    <Routes>
      <Route index element={<Layout />} />
      <Route path="/" element={<Layout />}>
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route
        path="login"
        element={
          <AuthRoute>
            <LoginForm />
          </AuthRoute>
        }
      />
      <Route path="signup" element={<SignupForm />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

export default App;
