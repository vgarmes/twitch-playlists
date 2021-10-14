import React, { useEffect } from 'react';
import { useGlobalContext } from '../context/global-context';

const Alert = () => {
  const { alert, removeAlert } = useGlobalContext();

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [alert, removeAlert]);

  return (
    <>
      {alert.show && <p className={`alert alert-${alert.type}`}>{alert.msg}</p>}
    </>
  );
};

export default Alert;
