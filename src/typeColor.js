export const typeColor = (type) => {
  switch (type) {
    case "grass":
      return "lightgreen";
    case "fire":
      return "#FF6347";
    case "water":
      return "#75E6DA";
    case "electric":
      return "yellow";
    case "poison":
      return "#B728FB";
    case "normal":
      return " rgba(10, 9, 9, 0.42)";
    case "psychic":
      return "rgba(224, 19, 109, 0.69)";
    case "ground":
      return "rgba(171, 128, 41, 0.69)";
    case "bug":
      return "rgba(172, 216, 53, 0.69)";
    case "rock":
      return "#5A4D41";
    case "fairy":
      return "#d8bfd8";
    case "fighting":
      return "#c65747";
    case "ghost":
      return "#8f5dcd";
    case "dragon":
      return "#45267b";
    case "dark":
      return "#4b3d17";
    case "steel":
      return "#9b9c9d";
    case "ice":
      return "#0fffff";
    case "flying":
      return "#87CEEB";
    default:
      return "white";
  }
};
