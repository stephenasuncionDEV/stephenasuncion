import type { RootState } from "@/store/index";
import { useSelector, useDispatch } from "react-redux";
import { updateError } from "@/store/error";

export const useErrorStore = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.error);

  const onUpdateError = (error: string) => {
    dispatch(updateError(error));
  };

  return {
    ...state,
    onUpdateError,
  };
};
