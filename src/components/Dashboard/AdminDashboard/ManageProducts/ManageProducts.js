import {
  Button,
  Container,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import SectionHeader from "../../../shared/SectionHeader/SectionHeader";

const ManageProducts = () => {
  const [newProductData, setNewProductData] = useState({
    name: "",
    description: "",
    imgLink: "",
    price: 0,
  });
  const handleTextWrite = (e, type) => {
    switch (type) {
      case "name":
        const makeUpdateName = { ...newProductData };
        makeUpdateName.name = e.target.value;
        setNewProductData(makeUpdateName);
        break;
      case "description":
        const makeUpdateDescription = { ...newProductData };
        makeUpdateDescription.description = e.target.value;
        setNewProductData(makeUpdateDescription);
        break;
      case "link":
        const makeUpdateLink = { ...newProductData };
        makeUpdateLink.imgLink = e.target.value;
        setNewProductData(makeUpdateLink);
        break;
      case "price":
        const makeUpdatePrice = { ...newProductData };
        makeUpdatePrice.price = e.target.value;
        setNewProductData(makeUpdatePrice);
        break;

      default:
        break;
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (window.confirm("Add new?")) {
      axios
        .post(
          "https://action-camera-engin.herokuapp.com/add_a_product",
          newProductData
        )
        .then((res) => {
          if (res.status === 200) {
            e.target.reset();
          } else {
          }
        });
    }
  };

  return (
    <div>
      <SectionHeader text={"Add new product"} />
      <Container maxWidth="lg">
        <form onSubmit={(e) => handleAddProduct(e)}>
          <div className="flex justify-start">
            <div className="m-1">
              <TextField
                onChange={(e) => handleTextWrite(e, "name")}
                id="standard-password-input"
                label="Product name"
                type="text"
                required
                variant="standard"
              />
              <br />
              <br />
              <TextField
                onChange={(e) => handleTextWrite(e, "description")}
                className="mx-3"
                required
                id="standard-textarea"
                label="Product Description"
                placeholder="Product Description"
                multiline
                variant="standard"
              />
            </div>
            <div className="m-1">
              <TextField
                onChange={(e) => handleTextWrite(e, "link")}
                id="standard-password-input"
                label="Image Link"
                type="link"
                required
                autoComplete=""
                variant="standard"
              />
              <br />
              <FormControl
                style={{ marginTop: "25px" }}
                fullWidth
                sx={{ m: 1 }}
                variant="standard"
              >
                <InputLabel htmlFor="standard-adornment-amount">
                  Product Price
                </InputLabel>
                <Input
                  onChange={(e) => handleTextWrite(e, "price")}
                  style={{ width: "200px" }}
                  required
                  type="number"
                  min={0}
                  maxRows={10}
                  id="standard-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">TK</InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <Button type="submit" variant="outlined">
              Add New
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default ManageProducts;
