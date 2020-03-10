import {useReducer, useEffect, useState} from 'react';
import {createContainer} from 'react-tracked';

import {useAsyncStorage} from '@react-native-community/async-storage';

const STORAGE_KEY = 'users';
let initialState = [{email: '', password: ''}];

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return [...state, {email: action.email, password: action.password}];
  }
};

const useInit = a => {
  const {getItem} = useAsyncStorage(STORAGE_KEY);
  let preloadedState;

  try {
    preloadedState = JSON.parse(getItem().then(value => console.log(value)));
    return preloadedState;
  } catch (error) {}

  console.log('INIT', a);

  return preloadedState || initialState;
};

const useStore = () => {
  const {setItem} = useAsyncStorage(STORAGE_KEY);
  const [a, setA] = useState('bilu');
  const [state, dispatch] = useReducer(reducer, [a, setA], useInit);

  useEffect(() => {
    (async () => {
      await setItem(JSON.stringify(state));
    })();
  }, [setItem, state]);

  return [state, dispatch];
};

export const {
  Provider,
  useTrackedState,
  useUpdate: useDispatch,
} = createContainer(useStore);
