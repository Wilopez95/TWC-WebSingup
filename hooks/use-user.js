import { useContext } from 'react';
import { UserContext } from '../auth/user-provider';

const useUser = () => useContext(UserContext);

export default useUser;
