import React from 'react';
import { useSelector } from 'react-redux';

function Error() {
  const getErrors = useSelector((state) => {
    return state.errors.session;
  });

  if (getErrors.length !== 0) {
    const errorReducer = (state, errors) => {
      return { ...state, ...errors };
    };

    const errors = getErrors.reduce(errorReducer, {});

    return (
      <div>
        Oops There was an error...
        <ul>
          {Object.keys(errors).map((errorName, idx) => {
            return (
              <li key={`error-${idx}`}>{`${errorName}: ${errors[errorName]}`}</li>
            );
          })}
        </ul>
      </div>
    );
  }

  return null;
}

export default Error;
