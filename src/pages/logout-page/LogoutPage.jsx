import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Loader } from '../../components/';
import { logout } from '../../services/actions/auth';
import { getCookie } from '../../utils/cookie';

function LogoutPage() {
  const dispatch = useDispatch();

  const [isLogoutRequest, setLogoutRequest] = useState(true);

  useEffect(() => {
    if (!!getCookie("refreshToken")) {
      dispatch(logout())
        .finally(() => setLogoutRequest(false));
    } else {
      setLogoutRequest(false);
    }
  }, [dispatch]);

  return isLogoutRequest ? (<Loader />) : (<Navigate to="/login" replace={true} />);
}

export default React.memo(LogoutPage);