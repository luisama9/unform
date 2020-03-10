import {useReducer, useEffect} from 'react';
import {createContainer} from 'react-tracked';

import {useAsyncStorage} from '@react-native-community/async-storage';

const STORAGE_KEY = 'users';
let initialState = [{email: 'teste', password: '123'}];

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return [...state, {email: action.email, password: action.password}];
  }
};

const useStore = () => {
  const {setItem, getItem} = useAsyncStorage(STORAGE_KEY);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      await setItem(JSON.stringify(state));
    })();
  }, [getItem, setItem, state]);

  return [state, dispatch];
};

export const {
  Provider,
  useTrackedState,
  useUpdate: useDispatch,
} = createContainer(useStore);
