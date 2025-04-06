import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  FETCH_ERROR_10s,
  FETCH_INFO,
  FETCH_WARNING,
} from "@/components/constants/ActionTypes";

export const fetchStart = () => {
  return (dispatch) => {
    dispatch({
      type: FETCH_START,
    });
  };
};

export const fetchSuccess = (message) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_SUCCESS,
      payload: message || "",
    });
  };
};

export const fetchError = (error) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_ERROR,
      payload: error,
    });
  };
};

export const fetchInfo = (infoMessage) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_INFO,
      payload: infoMessage,
    });
  };
};

export const fetchWarning = (warningMessage) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_WARNING,
      payload: warningMessage,
    });
  };
};

export const fetchError10s = (error) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_ERROR_10s,
      payload: error,
    });
  };
};
