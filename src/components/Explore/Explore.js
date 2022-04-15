import { Container, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import SectionHeader from "../shared/SectionHeader/SectionHeader";
import ServiceCard from "../shared/ServiceCard/ServiceCard";

const Explore = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://action-camera-engin.herokuapp.com/all-products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <div className="pageRoot">
      <SectionHeader text={"all products"} />
      <Container maxWidth="lg">
        <div className="pb-10 pt-2 grid grid-cols-3 gap-4">
          {products.length > 0 &&
            products.map((product) => (
              <ServiceCard key={product._id} product={product}></ServiceCard>
            ))}
        </div>
        <div className="flex justify-center py-4">
          <Pagination count={10} color="secondary" />
        </div>
      </Container>
    </div>
  );
};

export default Explore;
