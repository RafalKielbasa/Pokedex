import React from 'react'
import { Paper } from '@mui/material'
import  logo  from '../../assets/LOGO_POKEAPI.png'


function SingleCard({pokemonNumber, isFlipped, handleCardClick, pokemonPhoto}) {
  return (
      <>
    {isFlipped ? (
        <Paper sx={{ p: 5, height: 100, display: "flex", justifyContent: "center"}}
        className ="inner front">
          <img src={`${pokemonPhoto}`} />
        </Paper>
      ) : (
        <Paper
          sx={{
            p: 5,
            height: 100,
            bgcolor: "#272D34",
            color: "#d6aeb5",
            fontSize: "100px",
            transition: "0.3s ease all",
            "&:hover": {
              bgcolor: "#FECA1E",
              opacity: "90%",
              color: "#fff",
              transform: "scale(1.02)",
            },
          }}
          
          onClick={() => handleCardClick(pokemonNumber)}
        > <img src={`${logo}`}  style={{ objectFit: "contain", height: "100%", width: "100%" }} className='back'/></Paper>
      )}
      </>
  )
}

export default SingleCard