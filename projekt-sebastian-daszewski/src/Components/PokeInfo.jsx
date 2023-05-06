import React from "react";

const Pokeinfo = ({ data }) => {
   
    return (
        <>
        {
            (!data) ? "" : (
                <>
                <div className="modalInfo">
                    <h1 id="pokedex">POKEDEX</h1>
                    <h1 id="nameDetails" >{data.name}</h1>
                    <div id="imgDetails">
                     <img  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`} alt="" />
                    </div>
                        <div className="details">
                            <div className="heightAndWeight">
                                <h5>
                                {data.height}
                                </h5>
                                <h3>
                                Height
                                </h3>
                                <h5>
                                {data.weight}
                                </h5>
                                <h3>
                                    Weight
                                </h3>
                            </div>
                            <div className="experienceAndAbility">
                                <h5>
                                    {data.base_experience}
                                </h5>
                                <h3>
                                        Base experience
                                </h3>
                                <h5>
                                    {data.abilities[0].ability.name}
                                </h5>
                                <h3>
                                    Ability
                                </h3>
                            </div>
                        </div>
                        <button className="homePage">Strona główna</button>
                     </div>
                </>
            )
        }

        </>
    )
}
export default Pokeinfo