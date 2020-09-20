import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  INIT_URL,
  SIGNOUT_USER_SUCCESS,
  USER_DATA,
  USER_TOKEN_SET,
} from "../../constants/ActionTypes";
import axios from "../../util/Api";

export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url,
  };
};

export const userSignUp = ({ first_name, last_name, username, email, age, phone_number, country, city, region, status, password }) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios
      .post("auth/register", {
        first_name,
        last_name,
        username,
        email,
        age,
        phone_number,
        country,
        city,
        region,
        status,
        password
      })
      .then(({ data }) => {
        // console.log("data:", data);
        if (data.result) {
          localStorage.setItem(
            "token",
            JSON.stringify(data.token.access_token)
          );
          axios.defaults.headers.common["authorization"] =
            "Bearer " + data.token.access_token;
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: USER_TOKEN_SET, payload: data.token.access_token });
          dispatch({ type: USER_DATA, payload: data.user });
        } else {
          // console.log("payload: data.error", data.error);
          dispatch({ type: FETCH_ERROR, payload: "Network Error" });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
        // console.log("Error****:", error.message);
      });
  };
};

export const userSignIn = ({ username, password }) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios
      .post("auth/login", {
        username: username,
        password: password,
      })
      .then(({ data }) => {
        // console.log("userSignIn: ", data);
        if (data.result) {
          localStorage.setItem(
            "token",
            JSON.stringify(data.token.access_token)
          );
          axios.defaults.headers.common["authorization"] =
            "Bearer " + data.token.access_token;
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: USER_TOKEN_SET, payload: data.token.access_token });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.error });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
        // console.log("Error****:", error.message);
      });
  };
};

export const getUser = (token) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios
      .get("users/me", {
        headers: {
          "x-auth-token": token,
        },
      })
      .then(({ data }) => {
        // console.log("userSignIn: ", data);
        if (data.result) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: USER_DATA, payload: data.user });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.error });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
        // console.log("Error****:", error.message);
      });
  };
};

export const userSignOut = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });

    axios
      .post("auth/logout")
      .then(({ data }) => {
        // console.log("log out", data);
        if (data.result) {
          localStorage.removeItem("token");
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: SIGNOUT_USER_SUCCESS });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.error });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
        console.log("Error****:", error.message);
      });
  };
};
