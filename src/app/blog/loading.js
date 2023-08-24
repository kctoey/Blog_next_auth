"use client";
import React from "react";
import Lottie from "lottie-react";
import animationData from "../../../public/animation_llp4222k.json";
const loading = () => {
  return (
    <div
      style={{
        width: 500,
        height: 500,
      }}
    >
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default loading;
