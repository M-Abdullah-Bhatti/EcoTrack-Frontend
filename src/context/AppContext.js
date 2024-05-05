import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [type, setType] = useState(0);
  const [postId, setPostId] = useState(null);

  return <AppContext.Provider value={{ open, setOpen, type, setType, postId, setPostId }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);