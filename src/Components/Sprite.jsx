import React, { useEffect, useState } from "react";
import "./styles.css";
import { Box } from "@mui/material";
import cat2 from "../Assets/images/cat2.svg";
import dog from "../Assets/images/dog.svg";

export const Sprites = (props) => {
  const { sprite, sprite2, setSprite, setSprite2, displayAddIcon } = props;
  const spriteProps = [
    {
      id: 0,
      src: cat2,
    },
    {
      id: 1,
      src: dog,
    },
  ];
  function handleClick(src) {
    console.log("clicked");
    displayAddIcon ? setSprite(src) : setSprite2(src);
  }
  return (
    <Box
      sx={{
        marginLeft: "5%",
        fontFamily: "monospace",
        display: "flex",
        maxWidth: "540px",
        height: "140px",
        flexDirection: "row",
        columnGap: "10px",
      }}
    >
      {spriteProps.map((item) => (
        <Box
          sx={{
            background:
              sprite !== item.src && sprite2 !== item.src ? "white" : "#4d97ff",
            borderRadius: "20px",
            maxHeight: "130px",
            border:
              sprite === item.src || sprite2 === item.src
                ? "2px solid #0d6efd"
                : "2px solid transparent",
            ":hover": {
              backgroundColor: "#4d97ff",
              border: "2px solid #0d6efd",
              cursor: "pointer",
            },
          }}
          onClick={() => handleClick(item.src)}
        >
          <img
            src={item.src}
            alt="item"
            style={{
              matginBottom: "30px",
              height: "120px",
              width: "120px",
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default Sprites;
