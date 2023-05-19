import React, { useState, useEffect, useContext } from "react";

function Starships() {
    const [starships, setStarships] = useState([]);

    function fetchStarshipsData() {
        fetch("https://www.swapi.tech/api/starships")
            .then((response) => response.json())
            .then((data) => {
                const starshipsData = data.results;

                const fetchStarshipsProperties = starshipsData.map((starship) =>
                    fetch(starship.url).then((response) => response.json())
                );
                Promise.all(fetchStarshipsProperties)
                    .then((starshipsProperties) => {
                        const starshipData = starshipsData.map((starship, index) => ({
                            ...starship,
                            properties: starshipsProperties[index].result.properties,
                        }));
                        setStarships(starshipData);
                    })
                    .catch((error) => console.error(error));
            })
            .catch((error) => console.error(error));
    }
    useEffect(() => {
        fetchStarshipsData();
    }, []);

    return (
        <div className="container py-5">
            <h1>Starships</h1>
            <div className="d-flex flex-nowrap overflow-auto">
                {starships.map((starship) => (<div className="col-sm-5" key={starship.uid}>
                    <div className="card m-2">
                        <div className="row">
                            <div className="col-12">
                                <img
                                    src="https://cdn.icon-icons.com/icons2/335/PNG/256/Death_Star_-_1st_35438.png"
                                    className="img-fluid rounded-start characterImage"
                                    alt="..."
                                />
                                <h5 className="card-title mx-2">{starship.name}</h5>
                                <p className="card-text mx-3">Model: {starship.properties.model}</p>
                                <p className="card-text mx-3">Length: {starship.properties.length}</p>
                                <p className="card-text mx-3">cost_in_credits: {starship.properties.cost_in_credits}</p>
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
export default Starships