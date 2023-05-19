import React, { useState, useEffect, useContext } from "react";
import { favContext } from "../context/favContext";

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [favorites, setFavorites] = useState([]);

  function fetchCharactersData() {
    fetch("https://www.swapi.tech/api/people")
      .then((response) => response.json())
      .then((data) => {
        const charactersData = data.results;

        const fetchCharactersProperties = charactersData.map((person) =>
          fetch(person.url).then((response) => response.json())
        );
        Promise.all(fetchCharactersProperties)
          .then((charactersProperties) => {
            const characterData = charactersData.map((person, index) => ({
              ...person,
              properties: charactersProperties[index].result.properties,
            }));
            setCharacters(characterData);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }
  useEffect(() => {
    fetchCharactersData();
  }, []);

  const handleFavorites = (person) => {
    setFavorites([...favorites, person])
  }

  return (
    <div className="container py-5">
      <h1>Characters</h1>
      <div className="d-flex flex-nowrap overflow-auto">
        {characters.map((person) => (<div className="col-sm-5" key={person.uid}>
          <div className="card m-2">
            <div className="row">
              <div className="col-12">
                <img
                  src="https://media.entertainmentearth.com/assets/images/5f5b80fa13734dc3b3205af64798709cxl.jpg"
                  className="img-fluid rounded-start characterImage"
                  alt="..."
                />
                <h5 className="card-title mx-2">{person.name}</h5>
                <p className="card-text mx-3">Gender: {person.properties.gender}</p>
                <p className="card-text mx-3">Height: {person.properties.height}</p>
                <p className="card-text mx-3">Birth year: {person.properties.birth_year}</p>
              </div>
              <div className="col-12">
                <button type="button" className="btn btn-outline-primary m-2">Learn more!</button>
                <button type="button" className="btn btn-outline-warning m-2" onClick={() =>addToFavorites({uid: person.uid, name: person.name,})}><i className="fa-sharp fa-regular fa-heart"></i></button>
              </div>
            </div>
          </div>
        </div>))}
      </div>
    </div>
  )
}
export default Characters