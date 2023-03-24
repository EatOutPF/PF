// home - search - filter - ordenar - crear -  informe(saldo x restaurante – II fase)
import { useState } from "react";
import Logout from "../Components/Logout";

const NavBar = () => {

  const [order, setOrder] = useState("");
  return (
    <div>
      <Logout/>  
  
    </div>
  );
};

export default NavBar;