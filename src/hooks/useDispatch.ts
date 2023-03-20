import { useDispatch as dispatchHook } from 'react-redux';
import { TAppDispatch } from '../services/types';

const useDispatch = () => dispatchHook<TAppDispatch>();

export default useDispatch;