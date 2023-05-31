import { MoonLoader } from "react-spinners";
import { LoaderWrapper } from "./Loader.styles";

export const LoaderSpinner = () => {
  return (
    <LoaderWrapper>
      <MoonLoader color="#36abd6" size={80} />
    </LoaderWrapper>
  );
};
