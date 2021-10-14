import React, { useEffect } from "react";

const Alert = ({ type, msg, removeAlert, playlist }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [playlist]);
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
