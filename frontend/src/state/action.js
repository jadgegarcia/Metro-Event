// actions/authActions.js
  export const login = (username, password) => ({
    type: 'LOGIN',
    payload: { username, password }
  });
  
  export const logout = () => ({
    type: 'LOGOUT'
  });
  