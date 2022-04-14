import React, {createContext, useContext, useState} from 'react';

interface State {
  translationY: any;
  setTranslationY: any;
  isScrollUp: boolean;
  setScrollUp: any;
  isScrollStartReached: boolean;
  setScrollStartReached: any;
}

const initialState: State = {
  translationY: 0,
  setTranslationY: null,
  isScrollUp: true,
  setScrollUp: null,
  isScrollStartReached: true,
  setScrollStartReached: null,
};

const ScrollContext = createContext<State>(initialState);

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const ScrollProvider = ({children}: Props) => {
  const [translationY, setTranslationY] = useState(0);
  const [isScrollUp, setScrollUp] = useState(true);
  const [isScrollStartReached, setScrollStartReached] = useState(true);
  return (
    <ScrollContext.Provider
      value={{
        translationY,
        setTranslationY,
        isScrollUp,
        setScrollUp,
        isScrollStartReached,
        setScrollStartReached,
      }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);

export default ScrollProvider;
