/* eslint-disable react/prop-types */
import { useEffect } from "react";
const NotFound = ({ setPage }) => {
  useEffect(() => {
    setPage("NotFound");
  });

  return (
    <>
      <div>404</div>
    </>
  );
};

export default NotFound;
