import React, { FC, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Loader } from '../../components/';
import { useDispatch } from '../../hooks';
import { logout } from '../../services/actions/auth';
import { getCookie } from '../../utils/cookie';

const LogoutPage: FC = () => {
  const dispatch = useDispatch();

  const [isLogoutRequest, setLogoutRequest] = useState<boolean>(true);

  useEffect(() => {
    if (!!getCookie("refreshToken")) {
      dispatch(logout())
        .finally(() => setLogoutRequest(false));
    } else {
      setLogoutRequest(false);
    }
  }, [dispatch]);

  return isLogoutRequest ? (<Loader />) : (<Navigate to="/login" replace={true} />);
};

export default React.memo(LogoutPage);