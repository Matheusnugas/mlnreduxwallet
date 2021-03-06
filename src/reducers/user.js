// Esse reducer será responsável por tratar as informações da pessoa usuária

import { SEND_PERSONAL_DATA } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_PERSONAL_DATA:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default userReducer;
