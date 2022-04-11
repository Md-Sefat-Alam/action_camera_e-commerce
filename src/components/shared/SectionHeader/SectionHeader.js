import React from "react";
import Container from "@mui/material/Container";

const SectionHeader = ({ text }) => {
  return (
    <div
      style={{ backgroundColor: "#3B5998" }}
      className="p-1 text-xl font-bold my-5"
    >
      <Container maxWidth="lg">
        <h3 className="font-bold capitalize text-gray-300">{text}</h3>
      </Container>
    </div>
  );
};

export default SectionHeader;
