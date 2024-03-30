// reducer.js


const initialState = {
  eventOption: 0 // Default to option 1
};

export const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'action':
      return {
        ...state,
        eventOption: action.payload
      };
    default:
      return state;
  }
};

export default eventReducer;
