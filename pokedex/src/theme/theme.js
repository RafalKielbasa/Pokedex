import { StadiumDay, StadiumNight, LightThemeImg, DarkThemeImg } from "src/img";
export const lightTheme = {
  bgColor: LightThemeImg,
  bgCardColor: "#e3f6f5",
  textColor: "black",
  searcherBorder: "2px solid black",
  borderColor: "#ff66a3",
  heartActive: "red",
  heartDisabled: "grey",
  arenaBgImg: StadiumDay,
};

export const darkTheme = {
  bgColor: DarkThemeImg,
  bgCardColor: "#007cb9",
  textColor: "white",
  searcherBorder: "2px solid white",
  borderColor: "#ff895d",
  heartActive: "#c51350",
  heartDisabled: "#41506b",
  arenaBgImg: StadiumNight,
};
