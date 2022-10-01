import { Check } from "../../types";

type State = {
  isLoading: boolean;
  hasError: boolean;
  data: Check[];
};

type Action = {
  type: string;
  payload?: any;
};

export const initialState: State = {
  isLoading: false,
  hasError: false,
  data: [],
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "REQUEST_STARTED":
      return initialState;
    case "REQUEST_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.payload.sort(
          (a: Check, b: Check) => a.priority - b.priority
        ),
      };
    case "REQUEST_FAILED":
      return { ...state, isLoading: false, hasError: true };
    default:
      return state;
  }
};
