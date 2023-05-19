import React, { useState, useEffect, useContext } from "react";

function Planets() {
  const [planets, setPlanets] = useState([]);

  function fetchPlanetsData() {
    fetch("https://www.swapi.tech/api/planets")
      .then((response) => response.json())
      .then((data) => {
        const planetsData = data.results;

        const fetchPlanetsProperties = planetsData.map((planet) =>
          fetch(planet.url).then((response) => response.json())
        );
        Promise.all(fetchPlanetsProperties)
          .then((planetsProperties) => {
            const planetData = planetsData.map((planet, index) => ({
              ...planet,
              properties: planetsProperties[index].result.properties,
            }));
            setPlanets(planetData);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }
  useEffect(() => {
    fetchPlanetsData();
  }, []);

  return (
    <div className="container py-5">
      <h1>Planets</h1>
      <div className="d-flex flex-nowrap overflow-auto">
        {planets.map((planet) => (<div className="col-sm-5" key={planet.uid}>
          <div className="card m-2">
            <div className="row">
              <div className="col-12">
                <img
                  src="https://custom.swcombine.com/static/8/632-large-1675095606.png"
                  className="img-fluid rounded-start characterImage"
                  alt="..."
                />
                <h5 className="card-title mx-2">{planet.name}</h5>
                <p className="card-text mx-3">Population: {planet.properties.population}</p>
                <p className="card-text mx-3">Climate: {planet.properties.climate}</p>
                <p className="card-text mx-3">Diameter: {planet.properties.diameter}</p>
              </div>
              <div className="col-12">
                <button type="button" class="btn btn-outline-primary m-2">Learn more!</button>
                <button type="button" class="btn btn-outline-warning m-2"><i class="fa-sharp fa-regular fa-heart"></i></button>
              </div>
            </div>
          </div>
        </div>))}
      </div>
    </div>
  )
}
export default Planets