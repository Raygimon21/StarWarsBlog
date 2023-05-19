import React, { createContext, useState } from "react";

 export const favContext = createContext()
 const favoriteFunctions = {
    addToFavorites: (setFavorites) => (item) => {
      setFavorites((prevState) => [...prevState, item]);
    },
    removeFav: (setFavorites) => (item) => {
      setFavorites((prevState) => prevState.filter((favItem) => favItem.uid !== item.uid));
    },
  };
  
 export const favContextProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const contextValue = {
        fav: favorites,
        addToFavorites: favoriteFunctions.addToFavorites(setFavorites),
        removeFav: favoriteFunctions.removeFav(setFavorites),
    };

    return (
        <favContext.Provider value={contextValue}>
            {children}
        </favContext.Provider>
    )
 }