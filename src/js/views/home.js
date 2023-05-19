import React from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

import Characters from "../component/characters";
import Planets from "../component/planets";
import Spaceships from "../component/spaceships";

export const Home = () => (
	<>
		<Characters/>
		<Planets/>
		<Spaceships/>
	</>
);
