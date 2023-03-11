import { TypedUseSelectorHook, useSelector as selectorHook } from 'react-redux';
import { TRootState } from '../services/types';

const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;

export default useSelector;