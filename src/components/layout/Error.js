import React from 'react';
import { useSelector } from 'react-redux';

function Error() {
  const getErrors = useSelector((state) => {
    return state.errors.session;
  });

  if (getErrors.length !== 0) {
    const errorReducer = (state, errors) => {
      return { ...state, ...errors.message };
    };

    const errors = getErrors.reduce(errorReducer, {});

    return (
      <ul>
        {Object.keys(errors).map((errorName, idx) => {
          return (
            <li key={`error-${idx}`}>{`${errorName}: ${errors[errorName]}`}</li>
          );
        })}
      </ul>
    );
  }

  return null;
}

export default Error;
