import React from 'react';
import LoginForm from './components/session/LoginForm';
import SignupForm from './components/session/SignupForm';

function App() {
  return (
    <div>
      <h2>SignupForm</h2>
      <SignupForm />
      <h2>LoginForm</h2>
      <LoginForm />
    </div>
  );
}

export default App;
