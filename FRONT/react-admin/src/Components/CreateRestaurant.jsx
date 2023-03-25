/* import "./Componentes/Formulario.jsx" */
import React from "react";
import { useState } from "react";

export default function Form() {
  const [terminos, setTerminos] = useState("false");
  const [active, setActive] = useState("true");
  const [input, setInputs] = useState({
    name: "",
    address: {
      streetName: "",
      streetNumber: 0,
      neighborhood: "",
      city: "",
      state: "",
      country: "",
    },
    images: [],

    tables: 0,
    schedule: [
      {
        monday: { open: "", close: "" },
        tuesday: { open: "", close: "" },
        wednesday: { open: "", close: "" },
        thursday: { open: "", close: "" },
        friday: { open: "", close: "" },
        saturday: { open: "", close: "" },
        sunday: { open: "", close: "" },
      },
    ],
    menu: [],
    diets: [],
    paymentMethods: [
      "credito",
      "debito",
      "mercadopago",
      "efectivo",
      "transferencia",
    ],
    atmosphere: [],
    extras: [],
    section: ["terraza", "barra", "salón principal"],
    ranking: "",
    active: true,
  });

  const handlerChange = (e) => {
    const input = e.target.name;
    const value = e.target.value;

    // validate({...restaurantForm, [input]: value})

    setInputs({ ...Form, [input]: value });
  };

  return (
    <form className={styles.formContainer}>
      <p className={styles.title}>RESTAURANT REGISTRATION</p>

      <div>
        <label> Name: </label>
        <input
          type="text"
          value={input.name}
          onChange={handlerChange}
          name="name"
        />
      </div>

      <div>
        <label> Address: </label>
        <input
          type="text"
          value={input.address}
          onChange={handlerChange}
          name="addres"
        />
      </div>

      <div>
        <div>
          <label>Image (url):</label>
          <input
            type="text"
            value={input.images}
            name="image"
            onChange={(e) => handlerChange(e)}
          />
        </div>
        {/* {errors.images && <p>*{errors.images}</p>} */}
      </div>

      <div>
        <label> Tables: </label>
        <input
          type="number"
          min="1"
          max="41"
          value={input.tables}
          onChange={handlerChange}
          name="tables"
        />
        <span> (min: 1 - max: 41) </span>
      </div>
      <div>
        <label> Contact: </label>
        <input
          type="text"
          value={input.Info}
          onChange={handlerChange}
          name="Info"
        />
      </div>

      <div>
        <label> Schedule: </label>
        <input
          type="text"
          value={input.Info}
          onChange={handlerChange}
          name="Info"
        />
      </div>

      <div>
        <p>Select type of menu and/or service</p>
        <label> Menu </label>
        <select className="input" name="menu" onChange={handlerChange}>
          <option value=""> Select...</option>
          <option value="italiana" key="italiana">
            Menu Italiano
          </option>
          <option value="asiática" key="asiática">
            Menu asiático
          </option>
          <option value="internacional" key="internacional">
            Menu Internacional
          </option>
          <option value="hamburguesas" key="hamburguesas">
            Hamburguesas
          </option>
          <option value="alta cocina" key="alta cocina">
            Alta Cocina
          </option>
          <option value="bares" key="bares">
            Bar
          </option>
          <option value="pizzerías" key="pizzerías">
            Pizzería
          </option>
          <option value="mediterránea" key="mediterránea">
            Mediterránea
          </option>
          <option value="gourmet" key="gourmet">
            Gourmet
          </option>
          <option value="menu para niños" key="menu para niños">
            {" "}
            Menu Infantil
          </option>
        </select>
      </div>

      <div>
        <p>Select type of menu diests</p>

        <label> Diests </label>
        <select className="input" name="diests" onChange={handlerChange}>
          <option value=""> Select...</option>
          <option value="vegano" key="vegano">
            Menu vegano
          </option>
          <option value="celiaco" key="celiaco">
            Menu celiaco
          </option>
          <option value="vegetariano" key="vegetariano">
            Menu vegetariano
          </option>
        </select>
      </div>

      <div>
        <label> PaymentMethods: </label>
        <input
          type="text"
          value={input.Info}
          onChange={handlerChange}
          name="Info"
        />
      </div>

      <div>
        <label> Atmosphere: </label>
        <select className="input" name="atmosphere" onChange={handlerChange}>
          <option value=""> Select...</option>
          <option value="show en vivo" key="show en vivo">
            Show en vivo
          </option>
          <option value="familiar" key="familiar">
            Espacio familiar
          </option>
          <option value="romantico" key="romantico">
            {" "}
            Espacio romantico
          </option>
          <option value="formal" key="formal">
            {" "}
            Espacio formal
          </option>
        </select>
      </div>

      <div>
        <label> Extras: </label>
        <select className="input" name="extras" onChange={handlerChange}>
          <option value=""> Select...</option>
          <option value="petfriendly" key="petfriendly">
            Pet friendly
          </option>
          <option value="bar" key="bar">
            Bar
          </option>
          <option value="wi-fi" key="wi-fi">
            {" "}
            Zona Wi-Fi
          </option>
          <option value="fumadores" key="fumadores">
            {" "}
            Espacio fumadores
          </option>
        </select>
      </div>

      <div>
        <label> Section: </label>
        <select className="input" name="extras" onChange={handlerChange}>
          <option value=""> Select...</option>
          <option value="terraza" key="terraza">
            Terraza
          </option>
          <option value="barra" key="barra">
            Barra
          </option>
          <option value="salon principal" key="salon principal">
            {" "}
            Salon principal
          </option>
        </select>
      </div>

      <div>
        <label> Ranking: </label>
        <input
          type="text"
          value={input.Info}
          onChange={handlerChange}
          name="Info"
        />
      </div>

      <div>
        <label> Active </label>
        <input
          type="checkbox"
          id="active"
          name="active"
          onChange={(e) => setActive(e.target.checked)}
        />
      </div>

      <div className={styles.terminos}>
        <label htmlFor="terminos">Acepto términos y condiciones</label>
        <input
          type="checkbox"
          id="terminos"
          name="terminos"
          onChange={(e) => setTerminos(e.target.checked)}
        />
      </div>
    </form>
  );
}

/* detailRestaurant: {
    _id: "",
    name: "",
    address: {
      streetName: "",
      streetNumber: 0,
      neighborhood: "",
      city: "",
      state: "",
      country: "",
    },
    images: [],
    contact: {
      phoneNumber: "",
      email: "",
      socialMedia: { instagram: "", facebook: "", wpp: "" },
    },
    tables: 41,
    schedule: [
      {
        monday: { open: "", close: "" },
        tuesday: { open: "", close: "" },
        wednesday: { open: "", close: "" },
        thursday: { open: "", close: "" },
        friday: { open: "", close: "" },
        saturday: { open: "", close: "" },
        sunday: { open: "", close: "" },
      },
    ],
    menu: [
      "italiana",
      "asiática",
      "internacional",
      "hamburguesas",
      "alta cocina",
      "bares",
      "pizzerías",
      "mediterránea",
      "gourmet",
    ],
    diets: ["vegano", "celiaco", "vegetariano"],
    paymentMethods: [
      "credito",
      "debito",
      "mercadopago",
      "efectivo",
      "transferencia",
    ],
    atmosphere: ["musica en vivo", "familiar", "romantico", "formal"],
    extras: ["petfriendly", "bar", "wi-fi", "fumadores", "menú para niño"],
    section: ["terraza", "barra", "salón principal"],
    ranking: "",
    active: true,
  }, */
