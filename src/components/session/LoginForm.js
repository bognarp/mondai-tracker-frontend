import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/sessionActions';
import { useInputChange } from '../../hooks/useInputChange';
import Error from '../layout/Error';

function LoginForm() {
  const dispatch = useDispatch();
  const [input, handleInputChange] = useInputChange();

  const handleSubmit = (e) => {
    e.preventDefault();

    let user = {
      ...input,
    };

    dispatch(login(user));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="text" name="email" onChange={handleInputChange} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" onChange={handleInputChange} />
        </div>

        <button type="submit">Login</button>
      </form>
      <Error />
    </div>
  );
}

export default LoginForm;
