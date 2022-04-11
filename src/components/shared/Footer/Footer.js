import { Container } from "@mui/material";
import React from "react";
import SocialButtonsContainer from "react-social-media-buttons";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SendIcon from "@mui/icons-material/Send";
import DirectionsIcon from "@mui/icons-material/Directions";

const Footer = () => {
  return (
    <footer
      style={{ minHeight: "300px" }}
      className="bg-gray-900 rounded-tl-full"
    >
      <Container maxWidth="lg">
        <div style={{ height: "300px" }} className="grid grid-cols-5 gap-4">
          <div className="col-span-2 select-none cursor-pointer flex items-center justify-center">
            <img className="w-52" src="./images/logo/logo.png" alt="logo" />
          </div>
          <div>
            <div className="text-gray-400 font-bold mt-10">Office</div>
            <div className="text-gray-500">
              <p className="text-sm py-4">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Ratione neque consectetur pariatur officiis porro animi
                distinctio sint fuga quod cumque.
              </p>
              <p className="text-sm pb-2">
                <span className="border-b-2 border-gray-400">
                  someone@some.com
                </span>
              </p>
              <p className="text-sm pb-2">tel: +88100000002</p>
            </div>
          </div>
          <div>
            <div className="text-gray-400 font-bold mt-10">Links</div>
            <div className="mr-3">
              <ul className="text-gray-500 text-md">
                <li className="border-l border-b px-2 rounded-xl cursor-pointer transition-all hover:text-center my-2">
                  Lorem, ipsum dolor.
                </li>
                <li className="border-l border-b px-2 rounded-xl cursor-pointer transition-all hover:text-center my-2">
                  Earum, assumenda odit?
                </li>
                <li className="border-l border-b px-2 rounded-xl cursor-pointer transition-all hover:text-center my-2">
                  Dolores, veniam saepe!
                </li>
                <li className="border-l border-b px-2 rounded-xl cursor-pointer transition-all hover:text-center my-2">
                  Ab, laborum corrupti?
                </li>
                <li className="border-l border-b px-2 rounded-xl cursor-pointer transition-all hover:text-center my-2">
                  Ut, reprehenderit rem?
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-gray-400 font-bold">Newsletter</div>
            <div>
              <Paper
                component="form"
                sx={{
                  p: "0px 2px",
                  display: "flex",
                  alignItems: "center",
                  width: 250,
                  m: "10px",
                }}
              >
                <IconButton sx={{ p: "0px 5px" }} aria-label="menu">
                  <MailOutlineIcon />
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Enter Your Email"
                  inputProps={{ "aria-label": "Enter Your Email" }}
                />
                <Divider sx={{ height: 20, m: 0.5 }} orientation="vertical" />
                <IconButton
                  color="primary"
                  sx={{ p: "5px" }}
                  aria-label="directions"
                >
                  <SendIcon />
                </IconButton>
              </Paper>
            </div>
            <SocialButtonsContainer
              links={[
                "https://twitter.com/Twitter",
                "https://www.instagram.com/instagram/",
                "https://www.linkedin.com/company/linkedin/",
                "https://google.com",
                "https://github.com",
              ]}
              buttonStyle={{
                width: "30px",
                height: "30px",
                margin: "0px 5px",
                backgroundColor: "#cdc1c1",
                borderRadius: "50%",
              }}
              iconStyle={{ color: "#000000" }}
              openNewTab={true}
            />
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
