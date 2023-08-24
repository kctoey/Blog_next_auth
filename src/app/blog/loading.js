"use client";
import React from "react";
import Lottie from "lottie-react";
import animationData from "../../../public/animation_llow89cr.json";
const loading = () => {
  return (
    <div
      style={{
        width: 400,
        height: 400,
      }}
    >
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default loading;
