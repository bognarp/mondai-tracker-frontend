import React from 'react';
import { useInputChange } from '../../hooks/useInputChange';

function SignupForm() {
  const [input, handleInputChange] = useInputChange();

  const handleSubmit = (e) => {
    e.preventDefault();

    let user = {
      ...input,
    };

    console.log('NEW USER: ', user);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input type="text" name="username" onChange={handleInputChange} />
      </div>
      <div>
        <label>Email</label>
        <input type="text" name="email" onChange={handleInputChange} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" onChange={handleInputChange} />
      </div>
      <div>
        <label>Confirm Password</label>
        <input type="password" name="password2" onChange={handleInputChange} />
      </div>
      <input type="submit" />
    </form>
  );
}

export default SignupForm;
