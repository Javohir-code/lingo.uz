import React, {useEffect} from 'react';
import CircularProgress from "../CircularProgress/index";
import Auxiliary from "../../util/Auxiliary";
import {useDispatch, useSelector} from "react-redux";
import {hideMessage} from "../../appRedux/actions/Common";

const InfoView = () => {

  const dispatch = useDispatch();

  const error = useSelector(({commonData}) => commonData.error);

  const loading = useSelector(({commonData}) => commonData.loading);

  const message = useSelector(({commonData}) => commonData.message);

  const displayMessage = message;

  useEffect(() => {
    if (error || message) {
      setTimeout(() => {
        dispatch(hideMessage());
      }, 3000);
    }
  }, [error, message, dispatch]);

  return (
    <Auxiliary>
      {loading && <div className="gx-loader-view gx-loader-position">
        <CircularProgress/>
      </div>}
      {error && message.error(<span id="message-id">{error}</span>)}
      {displayMessage && message.info(<span id="message-id">{displayMessage}</span>)}
    </Auxiliary>
  );
};

export default InfoView;
