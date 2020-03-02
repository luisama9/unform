import {useReducer, useEffect} from 'react';
import {createContainer} from 'react-tracked';
import AsyncStorage from '@react-native-community/async-storage';

// used only when localStorage is empty
const initialState = {
  users: [{email: 'teste', password: '123'}],
};

const storageKey = 'STORAGE_KEY';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        users: [
          ...state.users,
          {email: action.email, password: action.password},
        ],
      };
  }
};
const init = async () => {
  let preloadedState;

  try {
    // (async () => {
    preloadedState = await AsyncStorage.getItem(storageKey);
    console.log('ps', preloadedState);
    // })();
  } catch (error) {
    console.log(error);
  }
  // console.log('ps', preloadedState);
  return preloadedState || initialState;
};
// console.log('init', init());

const useStore = () => {
  const [state, dispatch] = useReducer(reducer, null, init);
  useEffect(() => {
    AsyncStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);
  return [state, dispatch];
};

export const {
  Provider,
  useTrackedState,
  useUpdate: useDispatch,
} = createContainer(useStore);
