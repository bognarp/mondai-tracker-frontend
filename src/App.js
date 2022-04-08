import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Profile from './components/layout/profile/Profile';
import Dashboard from './components/layout/dashboard/Dashboard';

import NoMatch from './components/NoMatch';
import LoginForm from './components/session/LoginForm';
import SignupForm from './components/session/SignupForm';
import { AuthRoute, ProtectedRoute } from './util/routeUtil';
import Project from './components/layout/project/Project';
import Home from './components/landing/Home';

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/" element={<Layout />}>
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="projects/:projectId"
          element={
            <ProtectedRoute>
              <Project />
            </ProtectedRoute>
          }
        />
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
      <Route path="projects" element={<Navigate replace to="/dashboard" />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

export default App;
