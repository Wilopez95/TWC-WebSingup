import { useContext } from 'react';
import { TokenContext } from '../auth/token-provider';

const useToken = () => useContext(TokenContext);

export default useToken;
