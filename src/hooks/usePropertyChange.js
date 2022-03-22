import { isEqual, isEmpty } from 'lodash-es';
import { useEffect, useState } from 'react';

function usePropertyUpdate(changedInput, defaultValues = {}) {
  const [initialValues, setInitialValues] = useState(defaultValues);
  const [changedProps, setChangedProps] = useState([]);
  const [isChanged, setChanged] = useState(false);

  useEffect(() => {
    if (!isEmpty(changedInput)) {
      const keys = Object.keys(changedInput).filter((key) => {
        return !isEqual(initialValues[key], changedInput[key]);
      });

      isEmpty(keys) ? setChanged(false) : setChanged(true);

      setChangedProps(keys);
    }
  }, [changedInput, initialValues]);

  return [isChanged, changedProps, initialValues, setInitialValues];
}

export default usePropertyUpdate;
