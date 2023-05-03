import * as React from "react";
import styled from "styled-components";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
const HoverCard = styled.span`
  :hover {
    transform: translate3D(0, -1px, 0) scale(1.03);
  }
`;

const PokemonCard = ({ url, title, height, baseExperience, weight, ability }) => {
  return (
    <HoverCard>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: 220,
          background: "lightgrey",
        }}
      >
        <CardMedia
          sx={{
            width: 200,
            height: 200,
          }}
          image={url}
          title={title}
        />
        <CardContent
          sx={{
            padding: "0px",
          }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            {title}
          </Typography>
          <Typography
            component="div"
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "30px",
            }}
          >
            <Typography
              variant="h7"
              color="text.primary"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: "11px" }}>
                {height}
              </Typography>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  marginBottom: "10px",
                }}
              >
                Height
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: "11px" }}>
                {weight}
              </Typography>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "12px",
                }}
              >
                Weight
              </Typography>
            </Typography>
            <Typography
              variant="h7"
              color="text.primary"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: "12px",
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: "11px" }}>
                {baseExperience}
              </Typography>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  marginBottom: "10px",
                }}
              >
                Base Experience
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: "11px" }}>
                {ability}
              </Typography>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "12px",
                }}
              >
                Ability
              </Typography>
            </Typography>
          </Typography>
        </CardContent>
      </Card>
    </HoverCard>
  );
};

export default PokemonCard;
