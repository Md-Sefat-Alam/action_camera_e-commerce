import { Container, Pagination } from "@mui/material";
import React from "react";
import SectionHeader from "../shared/SectionHeader/SectionHeader";
import ServiceCard from "../shared/ServiceCard/ServiceCard";

const Explore = () => {
  return (
    <div className="pageRoot">
      <SectionHeader text={"all products"} />
      <Container maxWidth="lg">
        <div className="pb-10 pt-2 grid grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <ServiceCard key={n}></ServiceCard>
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
