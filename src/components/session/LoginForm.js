import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/sessionActions';
import { useInputChange } from '../../hooks/useInputChange';

function LoginForm() {
  const dispatch = useDispatch();
  const getErrors = useSelector((state) => {
    return state.errors.session;
  });
  const [input, handleInputChange] = useInputChange();

  const handleSubmit = (e) => {
    e.preventDefault();

    let user = {
      ...input,
    };

    dispatch(login(user));
  };

  const renderErrors = () => {
    if (getErrors.length !== 0) {
      const errorReducer = (state, errors) => {
        return { ...state, ...errors };
      };

      const errors = getErrors.reduce(errorReducer, {});
      console.log('reduced errors', errors);
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

        <input type="submit" />
      </form>
      {renderErrors()}
    </div>
  );
}

export default LoginForm;
