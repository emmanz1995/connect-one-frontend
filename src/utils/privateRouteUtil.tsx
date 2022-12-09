import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRouteUtil = ({ children }: any) => {
  const location = useLocation();
  const { user } = useSelector((state: any) => state.auth);

  if(!user) {
    return <Navigate to='/' state={{ from: location }} />
  }

  return children;
}