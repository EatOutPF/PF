import React, { useEffect } from "react";

const Review = (props) => {
  useEffect(() => {
    console.log(2, props);
  }, [props]);

  return (
    <>
      {props && (
        <tr key={props.id}>
          <td>{props.user?._id}</td>
          <td>{props.user?.name}</td>
          <td>{props.review}</td>
          <td>{props.score}</td>
        </tr>
      )}
    </>
  );
};

export default Review;
