import { useSelector, TypedUseSelectorHook } from 'react-redux';

type state = {
  sidebarShow: 'responsive' | boolean;
  asideShow: boolean;
  darkMode: boolean;
};

const initialState: state = {
  sidebarShow: 'responsive',
  asideShow: false,
  darkMode: false,
};

type args = { type?: string; [key: string]: any };

export type CoreUIState = Readonly<typeof initialState>;

export default (state = initialState, { type, ...rest }: args): CoreUIState => {
  switch (type) {
    case 'set':
      return { ...state, ...rest };
    default:
      return state;
  }
};

// https://react-redux.js.org/using-react-redux/static-typing#typing-the-useselector-hook
export const useTypedSelector: TypedUseSelectorHook<state> = useSelector;
