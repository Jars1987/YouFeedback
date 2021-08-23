import { FETCH_SURVEYS } from '../actions/types';

const surveysReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }
};

export default surveysReducer;
