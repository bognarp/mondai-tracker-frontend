import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../actions/sessionActions';
import { useInputChange } from '../../hooks/useInputChange';

function SignupForm() {
  const dispatch = useDispatch();
  const getErrors = useSelector((state) => {
    return state.errors.session;
  });
  const navigate = useNavigate();
  const [input, handleInputChange] = useInputChange();

  const handleSubmit = (e) => {
    e.preventDefault();

    let user = {
      ...input,
    };

    console.log('NEW USER: ', user);

    dispatch(signup(user)).then((res) => {
      res && navigate('/login');
      // if (res) navigate('/login');
    });
  };

  const renderErrors = () => {
    if (getErrors.length !== 0) {
      const errorReducer = (state, errors) => {
        return { ...state, ...errors };
      };

      const errors = getErrors.reduce(errorReducer, {});

      return (
        <ul>
          {Object.keys(errors).map((errorName, idx) => {
            return <li key={`error-${idx}`}>{errors[errorName]}</li>;
          })}
        </ul>
      );
    }

    return null;
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
      {renderErrors()}
    </form>
  );
}

export default SignupForm;
