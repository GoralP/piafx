import React from "react";
// import loader from "../../assets/images/loader.svg"
import loader from "../../assets/images/PiaFxLoader.gif"

const CircularProgress = ({className}) => <div className={`loader ${className}`}>
  <img src={loader} alt="loader"/>
</div>;
export default CircularProgress;
