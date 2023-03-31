import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { findDetailRestaurant } from "../../Redux/Actions";

const Reviews = (props) => {
  const { id } = useParams();
  const { detailRestaurant } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findDetailRestaurant(id));
  }, [detailRestaurant]);

  return (
    <div>
      <NavLink to="/home">
        <button>Volver</button>
      </NavLink>
      <h1>Calificaciones Restaurante {detailRestaurant.name}</h1>
      {detailRestaurant && (
        <table>
          <thead>
            <tr>
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
            {detailRestaurant?.review?.map((r) => {
              return <td>{r}</td>;
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Reviews;
