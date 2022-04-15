import { Container, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import SectionHeader from "../shared/SectionHeader/SectionHeader";
import Slider from "../Slider/Slider";
import ServiceCard from "../shared/ServiceCard/ServiceCard";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const Home = () => {
  const { products, setProducts } = useAuth();
  const [review, setReview] = useState([]);
  useEffect(() => {
    fetch("https://action-camera-engin.herokuapp.com/products6")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  useEffect(() => {
    axios
      .get(`https://action-camera-engin.herokuapp.com/review`)
      .then((res) => {
        if (res.status === 200) {
          setReview(res.data);
        }
      })
      .catch((error) => console.error(error));
  }, []);
  console.log(review);
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
            {review.length > 0 &&
              review.map((n) => {
                const { _id, email, rate, text, date } = n;
                return (
                  <div key={_id} className="my-4 bg-gray-100 rounded p-1 flex">
                    <div className="flex items-center">
                      <div className="flex justify-center uppercase items-center w-20 h-20 bg-gray-200 rounded-full">
                        {email[0]}
                      </div>
                      <div
                        style={{ minWidth: "200px" }}
                        className="mx-3 flex flex-col"
                      >
                        <span className="text-gray-500">{date}</span>
                        <h4 className="text-gray-900 font-bold">{email}</h4>
                      </div>
                    </div>
                    <div className="bg-gray-100 flex-grow rounded pt-3 pl-1 pr-3 relative">
                      <div className="absolute -top-3 left-2">
                        <Rating
                          name="half-rating-read"
                          defaultValue={rate}
                          precision={0.5}
                          readOnly
                        />
                      </div>
                      <div className="text-gray-500">{text}</div>
                    </div>
                  </div>
                );
              })}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Home;
