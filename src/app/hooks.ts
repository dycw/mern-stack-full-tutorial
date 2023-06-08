import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { Dispatch, State } from "./store";

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
export const useAppDispatch = () => useDispatch<Dispatch>();
