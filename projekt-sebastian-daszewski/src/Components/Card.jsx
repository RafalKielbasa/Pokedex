import React from "react";
const Card = ({ pokemon, loading,infoPokemon}) => {
    
    return (
        <>
        {
            loading ? <h1>Loading...</h1> :
                pokemon.map((item) => {
                    return (
                        <>
                            <div className="card" key={item.id} onClick={()=>infoPokemon(item)}>
                            <img id="cardImg" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${item.id}.svg`} alt="" />
                                <h1 className="cardName">{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</h1>
                                <div className="detailsFirstLine">
                                    <div className="height">
                                        <h4>
                                        {item.height}
                                        </h4>
                                        <h3>
                                            Height
                                        </h3>
                                    </div>
                                    <div className="experience">
                                        <h4>
                                        {item.base_experience}
                                        </h4>
                                        <h3>
                                            Base experience
                                        </h3>
                                    </div>
                                </div>
                                <div className="detailsSecondLine">
                                    <div className="height">
                                        <h4>
                                        {item.weight}
                                        </h4>
                                        <h3>
                                        Weight
                                        </h3>
                                    </div>
                                    <div className="experience">
                                        <h4>
                                        {item.abilities[0].ability.name}
                                        </h4>
                                        <h3>
                                            Ability
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })
        }

        </>
    )
}
export default Card;