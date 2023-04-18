import React from "react";
import style from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={style.containerLoading}>
      <div className={style.spinner}></div>
      <div className={style.loading}>{/*  <div>Cargando ...</div> */}</div>
    </div>
  );
};

export default Loading;
