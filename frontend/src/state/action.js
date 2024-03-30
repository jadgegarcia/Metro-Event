// actions/authActions.js
  export const login = (username, password, userType) => ({
    type: 'LOGIN',
    payload: { username, password, userType }
  });
  
  export const logout = () => ({
    type: 'LOGOUT'
  });
  