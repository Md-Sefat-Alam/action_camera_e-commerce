import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function ServicCard() {
  return (
    <Card className="cursor-default" sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://cdn.pixabay.com/photo/2014/11/03/10/44/camera-514992_960_720.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined">
          <ShoppingCartIcon /> Buy Now
        </Button>
        <Button size="small">
          <FavoriteBorderIcon />
        </Button>
        <div>
          <p className="text-xl text-gray-600 font-bold">36000 TK</p>
        </div>
      </CardActions>
    </Card>
  );
}
