import { Container, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import SectionHeader from "../shared/SectionHeader/SectionHeader";
import Slider from "../Slider/Slider";
import ServiceCard from "../shared/ServiceCard/ServiceCard";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { products, setProducts } = useAuth();
  useEffect(() => {
    fetch("http://localhost:5000/products6")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <div className="pageRoot">
      <Slider></Slider>
      <div className="mt-6 pb-6 bg-gray-100">
        <SectionHeader text={"Products"} />
        <Container maxWidth="lg">
          <div className="grid grid-cols-3 gap-4">
            {products.length > 0 &&
              products.map((product) => (
                <ServiceCard key={product._id} product={product}></ServiceCard>
              ))}
          </div>
        </Container>
      </div>
      <div className="mt-6 pb-6 bg-gray-50">
        <SectionHeader text={"Reviews"} />
        <Container maxWidth="lg">
          <div className="">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div className="my-4 bg-gray-100 rounded p-1 flex">
                <div className="flex items-center">
                  <div className="flex justify-center items-center w-20 h-20 bg-gray-200 rounded-full">
                    img
                  </div>
                  <div
                    style={{ minWidth: "200px" }}
                    className="mx-3 flex flex-col"
                  >
                    <span className="text-gray-500">20/02/2022</span>
                    <h4 className="text-gray-900 font-bold">Md. Sefat Alam</h4>
                  </div>
                </div>
                <div className="bg-gray-100 flex-grow rounded pt-3 pl-1 pr-3 relative">
                  <div className="absolute -top-3 left-2">
                    <Rating
                      name="half-rating-read"
                      defaultValue={4.5}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                  <div className="text-gray-500">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Voluptate sapiente non enim quia. Dignissimos, quidem
                    possimus consequatur dolores animi neque. Dolorem, quisquam
                    facere consequuntur itaque at consequatur maxime temporibus
                    beatae.
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Home;
