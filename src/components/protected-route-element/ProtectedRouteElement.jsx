import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../';
import { getUser } from '../../services/actions/auth';
import { getCookie } from '../../utils/cookie';

function ProtectedRouteElement({ children }) {
  const dispatch = useDispatch();

  const [isUserRequest, setUserRequest] = useState(true);

  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    if (!!getCookie("token")) {
      dispatch(getUser())
        .finally(() => setUserRequest(false));
    } else {
      setUserRequest(false);
    }
  }, [dispatch]);

  if (isUserRequest) {
    return <Loader />;
  }

  return !!user ? children : (<Navigate to="/login" replace={true} />);
}

ProtectedRouteElement.propTypes = {
  children: PropTypes.element.isRequired
};

export default ProtectedRouteElement;