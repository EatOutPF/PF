import React, { useEffect } from "react";

const Reserve = (props) => {
  useEffect(() => {
    console.log(1, props);
  }, [props]);

  return (
    <>
      {props && (
        <tr key={props.id}>
          <td>{props.user?._id}</td>
          <td>{props.user?.name}</td>
          <td>{props.user?.email}</td>
          <td>{props.user?.phone}</td>
          <td>{props.date} </td>
          <td>{props.time} </td>
          <td>{props.table}</td>
          <td>{props.payment?.amount}</td>
          <td>{props.payment?.date}</td>
        </tr>
      )}
    </>
  );
};

export default Reserve;
