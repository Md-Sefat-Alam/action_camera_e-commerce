import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

export default function ServicCard({ product }) {
  const { _id, name, description, imgLink, price } = product;
  const { user, setIsLoading, setError, setMessage } = useAuth();

  const handleAddToCart = (id, name, price, email) => {
    axios
      .get(`http://localhost:5000/getToCart/${email}?id=${id}`)
      .then((res) => {
        if (res.status === 200) {
          if (res.data === "") {
            setIsLoading(true);
            axios
              .post(`http://localhost:5000/addToCart`, {
                id,
                name,
                price,
                email,
              })
              .then((res) => {
                setIsLoading(false);
                if (res.status === 200) {
                  setMessage("Added to Cart");
                }
              })
              .catch((error) => {
                setIsLoading(false);
              });
          } else {
            setError("Already Added");
            // console.log("not added");
          }
        }
      })
      .catch((error) => {});
  };

  return (
    <Card className="cursor-default" sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={imgLink}
        style={{ height: "200px" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => handleAddToCart(_id, name, price, user.email)}
          size="small"
          variant="outlined"
        >
          <ShoppingCartIcon /> Add to Cart
        </Button>
        <Button size="small">
          <FavoriteBorderIcon />
        </Button>
        <div>
          <p className="text-xl text-gray-600 font-bold">{price} TK</p>
        </div>
      </CardActions>
    </Card>
  );
}
