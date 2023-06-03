import { StadiumDay, StadiumNight, LightThemeImg, DarkThemeImg } from "src/img";
export const lightTheme = {
  bgColor: LightThemeImg,
  bgCardColor: "#F0E2B6",
  textColor: "black",
  searcherBorder: "2px solid black",
  borderColor: "#ff66a3",
  heartActive: "red",
  heartDisabled: "grey",
  arenaBgImg: StadiumDay,
  navButtonsColor: "#DEC20B",
  navContainerColor: "#F0E2B6",
  hoverButtonColor: "#996515",
};

export const darkTheme = {
  bgColor: DarkThemeImg,
  bgCardColor: "#330049",
  textColor: "white",
  searcherBorder: "2px solid white",
  borderColor: "#ff895d",
  heartActive: "#c51350",
  heartDisabled: "#41506b",
  arenaBgImg: StadiumNight,
  navButtonsColor: "#fb6767",
  navContainerColor: "#330049",
  hoverButtonColor: "#c50000",
};
