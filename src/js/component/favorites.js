import React, { useContext } from "react";
import { favContext } from "../context/favContext";

const Favorites = () => {
    const { fav } = useContext(favContext)
    return (
        <div>hola</div>
    )
}
export default Favorites