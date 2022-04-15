import { Container, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import SectionHeader from "../shared/SectionHeader/SectionHeader";
import ServiceCard from "../shared/ServiceCard/ServiceCard";
import usePagination from "./Pagination";

const Explore = () => {
  let [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://action-camera-engin.herokuapp.com/all-products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  const PER_PAGE = 6;
  const count = Math.ceil(products.length / PER_PAGE);
  const _DATA = usePagination(products, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  return (
    <div className="pageRoot">
      <SectionHeader text={"all products"} />
      <Container maxWidth="lg">
        <div className="flex justify-end py-4">
          <Pagination
            count={count}
            page={page}
            onChange={handleChange}
            color="secondary"
          />
        </div>
        <div className="pb-10 pt-2 grid grid-cols-3 gap-4">
          {products.length > 0 &&
            _DATA
              .currentData()
              .map((product) => (
                <ServiceCard key={product._id} product={product}></ServiceCard>
              ))}
        </div>
        <div className="flex justify-center py-4">
          <Pagination
            count={count}
            page={page}
            onChange={handleChange}
            color="secondary"
          />
        </div>
      </Container>
    </div>
  );
};

export default Explore;
