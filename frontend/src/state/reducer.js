// reducers/authReducer.js
  const initialState = {
    isLoggedIn: false,
    username: '',
    password: ''
  };
  
  export function authReducer(state = initialState, action) {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          isLoggedIn: true,
          username: action.payload.username,
          password: action.payload.password
        };
      case 'LOGOUT':
        return initialState;
      default:
        return state;
    }
  };
  
  