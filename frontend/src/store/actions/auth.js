import * as actionTypes from './actionTypes'
import axios from 'axios'


export const authStart = () => {
  return {
    type:actionTypes.AUTH_START
  }
}

export const authSuccess = (token) => {
  return {
    type:actionTypes.AUTH_SUCCESS,
    token:token
  }
}

export const authFail = (error) => {
  //console.log('AUTH ERRORR:   ', error);
  return {
    type:actionTypes.AUTH_FAIL,
    error: error
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('expirationDate')
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}



export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios.post('http://127.0.0.1:8000/rest-auth/login/',{
      username:username,
      password: password
    }).then(res => {
      const token = res.data.key;
      localStorage.setItem('token',token);
      dispatch(authSuccess(token));
    }).catch((error) => {
      dispatch(authFail(error))
    })
  }
}



export const authSignUp = (username, email,  password1, password2) => {
  return dispatch => {
    dispatch(authStart());
    axios.post('http://127.0.0.1:8000/rest-auth/registration/',{
      username:username,
      email:email,
      password1: password1,
      password2: password2,
    }).then(res => {
      const token = res.data.key;
      localStorage.setItem('token',token);
      dispatch(authSuccess(token));
    }).catch((error) => {
      dispatch(authFail(error))
    })
  }
}


export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if(token === undefined) {
      dispatch(logout());
    }else{
      dispatch(authSuccess(token))

    }
  }
}
