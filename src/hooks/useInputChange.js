import { useState } from 'react';

export const useInputChange = (defaultValues = {}) => {
  const [input, setInput] = useState(defaultValues);

  const handleInputChange = (e) => {
    setInput({ ...input, [e.currentTarget.id]: e.currentTarget.value });
  };

  return [input, handleInputChange];
};
