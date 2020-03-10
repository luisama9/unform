import {useReducer} from 'react';
import {createContainer} from 'react-tracked';

// used only when localStorage is empty
const initialState = {
  users: [{email: 'teste', password: '123'}],
};

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

const useStore = () => useReducer(reducer, initialState);

export const {
  Provider,
  useTrackedState,
  useUpdate: useDispatch,
} = createContainer(useStore);
