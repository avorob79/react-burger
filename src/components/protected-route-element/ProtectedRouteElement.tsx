import { FC, useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader } from '../';
import { useDispatch, useSelector } from '../../hooks';
import { getUser } from '../../services/actions/auth';
import { getCookie } from '../../utils/cookie';
import { selectors } from '../../services';

interface IProps {
  children: React.ReactElement;
}

const ProtectedRouteElement: FC<IProps> = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [isUserRequest, setUserRequest] = useState<boolean>(true);

  const user = useSelector(selectors.user);

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

  return !!user ? children : (<Navigate to="/login" replace={true} state={{ from: location }} />);
};

export default ProtectedRouteElement;