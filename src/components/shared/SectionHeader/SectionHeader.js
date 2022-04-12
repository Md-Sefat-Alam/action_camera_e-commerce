import React from "react";
import Container from "@mui/material/Container";

const SectionHeader = ({ text }) => {
  return (
    <div
      style={{ backgroundColor: "#DFE3EE" }}
      className="p-1 text-xl font-bold my-5"
    >
      <Container maxWidth="lg">
        <h3 className="font-bold font-serif capitalize text-gray-800">
          {text}
        </h3>
      </Container>
    </div>
  );
};

export default SectionHeader;
