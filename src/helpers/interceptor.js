import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { constants } from '../constants'
import axios from "axios";

const Interceptor = () => {

  const dispatch = useDispatch();

  const addAuthInterceptor = () => {
    axios.interceptors.request.use(
      config => {
        dispatch({ type: constants.LOADING_MAIN, value: true });
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
  };

  const addErrorInterceptor = () => {
    axios.interceptors.response.use(
      response => {
        dispatch({ type: constants.LOADING_MAIN, value: false });
        return response;
      },
      error => {
        if (error.response) {
          const code = error.response.status;
          dispatch({ type: constants.LOADING_MAIN, value: false });
          return error;
        }
        return Promise.reject(error);
      }
    );
  };

  useEffect(addAuthInterceptor, []);
  useEffect(addErrorInterceptor, []);

  return <React.Fragment />;
}

export default Interceptor;
