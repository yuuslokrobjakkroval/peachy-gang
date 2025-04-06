import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  FETCH_ERROR_10s,
  FETCH_INFO,
  FETCH_WARNING,
} from "@/components/constants/ActionTypes";

const INIT_STATE = {
  initialURL: "/",
  error: "",
  errorExt: "",
  message: "",
  loading: false,
  address: [],
  dialogMessage: "",
};

const Common = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_START: {
      return { ...state, error: "", message: "", loading: true };
    }
    case FETCH_SUCCESS: {
      return { ...state, error: "", loading: false, message: action.payload };
    }
    case FETCH_INFO: {
      return { ...state, error: "", loading: false, info: action.payload };
    }
    case FETCH_WARNING: {
      return { ...state, error: "", loading: false, warning: action.payload };
    }
    case FETCH_ERROR: {
      return { ...state, loading: false, message: "", error: action.payload };
    }
    case FETCH_ERROR_10s: {
      return { ...state, loading: false, errorExt: action.payload };
    }
    default:
      return state;
  }
};

export default Common;
