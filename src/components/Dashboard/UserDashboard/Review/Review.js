import React, { useRef } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import SectionHeader from "../../../shared/SectionHeader/SectionHeader";
import { Button, TextField } from "@mui/material";
import useAuth from "../../../../hooks/useAuth";
import axios from "axios";
import { useHistory } from "react-router-dom";
const Review = () => {
  const handleReviewTextRef = useRef();
  const [value, setValue] = React.useState(4);
  const { user, setMessage } = useAuth();
  const history = useHistory();
  const handleAddReview = () => {
    const reviewData = {
      email: user.email,
      rate: value,
      text: handleReviewTextRef.current.lastChild.firstChild.value,
      date: new Date().toLocaleDateString(),
    };
    axios
      .post(`https://action-camera-engin.herokuapp.com/review`, reviewData)
      .then((res) => {
        if (res.status === 200) {
          setMessage("Thanks for your review");
          window.alert("added");
          history.push("/dashboard/my-orders");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <SectionHeader text={"Add your Review"} />
      </div>
      <Box
        sx={{
          "& > legend": { mt: 2 },
        }}
      >
        <Rating
          size="large"
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Box>
      <div style={{ minWidth: "400px" }}>
        <TextField
          id="outlined-multiline-static"
          label="Review Text In Details"
          multiline
          style={{ minWidth: "500px", margin: "10px" }}
          rows={8}
          ref={handleReviewTextRef}
          defaultValue="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda enim quisquam ipsa similique quo temporibus exercitationem, doloribus dolorum id, molestiae suscipit itaque! Fuga, repellendus cumque ratione excepturi quos aperiam laudantium vitae officiis! Totam dolorum recusandae beatae sapiente non, voluptate architecto?"
        />
      </div>
      <div style={{ minWidth: "500px", margin: "10px" }}>
        <Button onClick={handleAddReview} align="right" variant="outlined">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Review;
