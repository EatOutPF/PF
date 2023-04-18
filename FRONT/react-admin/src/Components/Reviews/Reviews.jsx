import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { findDetailRestaurant } from "../../Redux/Actions";
import style from "./Reviews.module.css";
import Review from "../Review/Review";

const Reviews = (props) => {
  const { id } = useParams();
  const { detailRestaurant } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findDetailRestaurant(id));
    console.log({ detailRestaurant });
  }, [id]);

  return (
    <div className={style.containerCards}>
      <NavLink to="/home" className={style.containerBack}>
        <button>Volver</button>
      </NavLink>
      <h1 style={{ marginBottom: 0 }}>Calificaciones Restaurante </h1>
      <h2 style={{ marginTop: 0, textTransform: "uppercase" }}>
        {detailRestaurant?.name}
      </h2>
      {!detailRestaurant?.review.length > 0 ? (
        <span>Aún no hay opiniones</span>
      ) : (
        <table>
          <thead className={style.containerThead}>
            <tr className={style.containerTitle}>
              <th>Id usuario</th>
              <th>Nombre usuario</th>
              <th>Opinion</th>
              <th>Puntaje</th>
            </tr>
          </thead>
          <tbody className={style.containerBodyTable}>
            {detailRestaurant?.review?.map((r) => {
              return (
                <>
                  <Review
                    key={r._id}
                    id={r._id}
                    user={r.user}
                    review={r.review}
                    score={r.score}
                  />
                </>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Reviews;
