import { Card, CardContent, CardMedia, IconButton, Typography, Box } from "@mui/material";
import { useState, useContext, useEffect} from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PokemonDetails from "./PokemonDetails";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FavoriteContext } from "../Global/FavoriteContext";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import { useSnackbar } from 'notistack';

const PokemonCard = ({ item, onArrowClick }) => {
  const { favorites, toggleFavorite } = useContext(FavoriteContext);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [addedToArena, setaddedToArena] = useState(false)
  const { enqueueSnackbar } = useSnackbar();


  useEffect(() => {
    const localStorageFavorites = localStorage.getItem("favorites");
    if (localStorageFavorites) {
      toggleFavorite(JSON.parse(localStorageFavorites));
      const isFavoriteNow = localStorageFavorites.includes(item.id);
      setIsFavorite(isFavoriteNow);

    }


  }, []);

  

 
  const handleCardClick = (itemID,event) => {
    setShowCardDetails(true);
    console.log(event.target.tagName)
    if (!(["BUTTON", "path", "svg"].includes(event.target.tagName)))
      {
        const addedPokemonIds = JSON.parse(localStorage.getItem("arenaPokemons")) || [];
        if (addedPokemonIds.includes(itemID)) {
          const updatedIds = addedPokemonIds.filter((id) => id !== itemID);
          localStorage.setItem("arenaPokemons", JSON.stringify(updatedIds));
          setaddedToArena(false);
          enqueueSnackbar("Usunięto pokemona z areny", { variant: "warning" });
        } else if (addedPokemonIds.length < 2) {
          const updatedIds = [...addedPokemonIds, itemID];
          localStorage.setItem("arenaPokemons", JSON.stringify(updatedIds));
          setaddedToArena(true);
          enqueueSnackbar("Dodano pokemona do areny", { variant: "success" });
        } else {
          enqueueSnackbar("Można dodać tylko maksymalnie 2 pokemony do areny", { variant: "error" });
        }

  }}
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  

  const handleFavoriteClick = () => {
 
    toggleFavorite(item.id);
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const updatedFavorites = storedFavorites.includes(item.id)
      ? storedFavorites.filter((id) => id !== item.id)
      : [...storedFavorites, item.id];

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites.flat()));

      const isFavoriteNow = (updatedFavorites.flat()).includes(item.id);
      setIsFavorite(isFavoriteNow);

    };


  return (
    <>

<Card
   onClick={() => handleCardClick(item.id, event)}
   onMouseEnter={handleMouseEnter}
   onMouseLeave={handleMouseLeave}
   sx={{
     display: 'flex',
     width: { xs: '300px', sm: '382px' },
     borderRadius: '10px',
     boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;',
     transform: isHovered ? 'scale(1.07)' : 'scale(1)',
     transition: 'transform 0.3s ease',
     border: `${addedToArena ? "2px solid #1976d2" : "0px"}`
   }}
>

<CardMedia
          component="img"
          sx={{
            width: '151px',
            height: '151px',
            minWidth: '120px',
            p: 3,
            boxSizing: 'border-box',
            objectFit: 'contain',
          }}
          image={`${item.sprites.other.dream_world.front_default}`}
        />


 <CardContent sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
  <Box sx={{display: "flex"}}> 
  <Typography  variant="h6" sx={{display: "flex", alignContent: "space-between", fontWeight: "700", width: "90%"}}>
       {`${item.species.name.charAt(0).toUpperCase()}${item.species.name.slice(1)}`} 
  </Typography>
  
 
  <IconButton onClick={handleFavoriteClick} sx={{justifyContent: "flex-end", color: isFavorite? '#C70039' : 'grey'}}>
  {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}

  </IconButton>
  </Box>

   <Typography className={item.types[0].type.name} variant="h7" sx={{ my: 1, p:"2px", color:"white", textAlign: "center", borderRadius: "25px", width: "85px", fontWeight: "500"}}>
  { `${item.types[0].type.name.charAt(0).toUpperCase()}${item.types[0].type.name.slice(1)}`}
  
   </Typography>

   <Box sx={{display:"flex"}}>
    <Box sx={{display:"flex", flexDirection:"column", width:"99%"}}>
    <Typography sx={{fontSize: 13, fontWeight: 600}}>{`H:${item.height} | W:${item.weight}`}</Typography>
    <Typography sx={{fontSize: 13, fontWeight: 600}}> {`Exp:${item.base_experience}`}</Typography>
    </Box>
   <IconButton className={ item.types[0].type.name} onClick ={() => onArrowClick(item.id,item.types[0].type.name )} sx={{justifyContent: "flex-end", color:"black", borderRadius: "0px" }}><ArrowForwardIcon /></IconButton>

   </Box>


 </CardContent>

</Card>
    </>
  );
};

export default PokemonCard

