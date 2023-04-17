import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { findDetailRestaurant } from "../../Redux/Actions";
import Reserve from "../Reserve/Reserve";

const Reserves = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detailRestaurant = useSelector((state) => state.detailRestaurant);

  useEffect(() => {
    dispatch(findDetailRestaurant(id));
  }, [id]);

  return (
    <div>
      <table>
        <thead>
          <th>Id Usuario</th>
          <th>Nombre Usuario</th>
          <th>Fecha</th>
          <th>Mesa</th>
          <th>Anticipo</th>
        </thead>

        {detailRestaurant && (
          <tbody>
            {detailRestaurant?.reserve?.map((rsv) => {
              <Reserve
                ket={rsv._id}
                id={rsv._id}
                date={rsv.date}
                time={rsv.time}
                payment={rsv.payment}
                table={rsv.table}
                user={rsv.user}
              />;
            })}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Reserves;
