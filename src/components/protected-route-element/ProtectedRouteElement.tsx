import { FC, useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../';
import { getUser } from '../../services/actions/auth';
import { getCookie } from '../../utils/cookie';
import { IUser } from '../../utils/types';
import { selectors } from '../../services';

interface IProps {
  children: React.ReactElement;
}

const ProtectedRouteElement: FC<IProps> = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [isUserRequest, setUserRequest] = useState<boolean>(true);

  const user = useSelector(selectors.user) as IUser;

  useEffect(() => {
    if (!!getCookie("token")) {
      dispatch(getUser() as any)
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