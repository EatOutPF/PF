// import "./Componentes/Formulario.jsx"
import React, { useEffect } from "react";
import styles from "../Components/CreateRestaurant/CreateRestaurant.module.css"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postRestaurant } from "../Redux/Actions";

export default function Form() {
  const dispatch = useDispatch();
  const [terminos, setTerminos] = useState("false");

  const [input, setInput] = useState({
    name: "",
  });


  const [address, setAddress] = useState({
    streetName: "",
    streetNumber: 0,
    neighborhood: "",
    city: "",
    state: "",
    country: "",
  });

  const [coordinate, setCoordinate] = useState({
    longitude: 0,
    latitude: 0,
  }
  )

  const [contact, setContact] = useState({
    phoneNumber: 0,
    email: "",
    socialMedia: { instagram: "", facebook: "", wpp: "", },
  })


  const [schedule, setSchedule] = useState({
    monday: { open: "", close: "" },
    tuesday: { open: "", close: "" },
    wednesday: { open: "", close: "" },
    thursday: { open: "", close: "" },
    friday: { open: "", close: "" },
    saturday: { open: "", close: "" },
    sunday: { open: "", close: "" },
  });


  const [images, setImages] = useState([]);

  const [tables, setTables] = useState(0);

  const [stage, setStage] = useState(1);


  const PaymentMethods = ["credito", "debito", "mercadopago", "efectivo", "transferencia"]

  const Atmospheres = ["musica en vivo", "familiar", "romantico", "formal"]

  const Extras = ["petfriendly", "bar", "wi-fi", "fumadores", "menú para niño"]

  const Sections = ["terraza", "barra", "salón principal"]

  const Menus = ["italiana", "asiática", "internacional", "hamburguesas", "alta cocina", "bares", "pizzerías", "mediterránea", "gourmet",]

  const [diets, setSelectDiets] = useState([
    "vegano",
    "celiaco",
    "vegetariano"
  ]);



  const [menu, setSelectMenu] = useState([
    "italiana",
    "asiática",
    "internacional",
    "hamburguesas",
    "alta cocina",
    "bares",
    "pizzerías",
    "mediterránea",
    "gourmet",

  ]);


  const [paymentMethods, setSelectPaymentMethods] = useState([
    "credito",
    "debito",
    "mercadopago",
    "efectivo",
    "transferencia",


  ]);

  const [atmosphere, setSelectAtmosphere] = useState([
    "musica en vivo",
    "familiar",
    "romantico",
    "formal",
  ])

  const [extra, setSelectExtra] = useState([
    "petfriendly",
    "bar",
    "wi-fi",
    "fumadores",
    "menú para niño",

  ])


  const [section, setSelectSection] = useState([
    "terraza",
    "barra",
    "salón principal",
  ])


  const handleMenu = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectMenu([...menu, value]);
    } else {
      setSelectMenu(menu.filter((menues) => menues !== value));
    }
  };



  const handleDiets = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectDiets([...diets, value]);
    } else {
      setSelectDiets(diets.filter((diet) => diet !== value));
    }
  };

  const handlePaymentMethods = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectPaymentMethods([...paymentMethods, value]);
    } else {
      setSelectPaymentMethods(paymentMethods.filter((paymentMethod) => paymentMethod !== value));
    }
  };


  const handleAtmosphere = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectAtmosphere([...atmosphere, value]);
    } else {
      setSelectAtmosphere(atmosphere.filter((atmospheres) => atmospheres !== value));
    }
  };


  const handleExtras = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectExtra([...extra, value]);
    } else {
      setSelectExtra(extra.filter((extras) => extras !== value));
    }
  };

  const handleSection = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectSection([...section, value]);
    } else {
      setSelectSection(section.filter((sections) => sections !== value));
    }
  };

  const handleNext = () => {
    setStage(stage + 1);
  };

  const handleBack = () => {
    setStage(stage - 1);
  };

  const handleContact = (event) => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value,
    });
  };



  const handleInput = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleAddress = (event) => {
    console.log(event)
    setAddress({
      ...setAddress,
      [event.target.name]: event.target.value,
    });
  };

  const handleLongitude = event => {
    setCoordinate({ ...coordinate, longitude: event.target.value })
  }

  const handleLatitude = event => {
    setCoordinate({ ...coordinate, latitude: event.target.value })
  }



  const handleSchedule = (e) => {
    const { name, value } = e.target;
    const [day, time] = name.split(" ");

    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: {
        ...prevSchedule[day],
        [time]: value,
      },
    }));
  };

  const handleTable = (event) => {
    setTables(event.target.value);
  };


  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log("Submitted data:", new);
  // };

  const handleCreate = () => {
    let nombreResto = input.name
    const newRestaurant = {
      name: nombreResto,
      address,
      coordinate,
      contact,
      schedule,
      images,
      tables,
      diets,
      menu,
      paymentMethods,
      atmosphere,
      extra,
      section,

    };

    console.log(newRestaurant)
    dispatch(postRestaurant(newRestaurant));
  };


  return (

    <div className={styles.formContainer}>
      <h1 className={styles.title}>REGISTRATION RESTAURANT</h1>
      {stage === 1 && (
        <div>
          <h2>Step 1</h2>
          <form onSubmit={() => setStage(2)}>
            <div>
              <label>
                Name:
                <input type="text" name="name" value={input.name} onChange={handleInput} />
              </label>

            </div>
            <h3>Contact</h3>
            <div>
              <label>
                Phone Number:
                <input type="number" name="phoneNumber" value={contact.phoneNumber} onChange={handleContact} />
              </label>
            </div>
            <div>
              <label>
                Email:
                <input type="text" name="email" value={contact.email} onChange={handleContact} />
              </label>
            </div>
            <h3>Social Media</h3>
            <div>
              <label>
                Instagram:
                <input type="text" name="instagram" value={contact.instagram} onChange={handleContact} />
              </label>
            </div>

            <div>
              <label>
                Facebook:
                <input type="text" name="facebook" value={contact.facebook} onChange={handleContact} />
              </label>
            </div>

            <div>
              <label>
                Wpp:
                <input type="number" name="wpp" value={contact.wpp} onChange={handleContact} />
              </label>
            </div>


            <button onClick={handleNext}>Next</button>
          </form>
        </div>
      )}
      {stage === 2 && (
        <div>
          <h2>Step 2</h2>
          <h3>Address</h3>
          <form onSubmit={() => setStage(3)}>
            <div>
              <label>
                Street Name:
                <input type="text" name="streetName" value={address.streetName} onChange={handleAddress} />
              </label>
            </div>

            <div>
              <label>
                Street Number:
                <input type="number" name="streetNumber" value={address.streetNumber} onChange={handleAddress} />
              </label>
            </div>

            <div>
              <label>
                Neighborhood:
                <input type="text" name="neighborhood" value={address.neighborhood} onChange={handleAddress} />
              </label>
            </div>

            <div>
              <label>
                City:
                <input type="text" name="city" value={address.city} onChange={handleAddress} />
              </label>
            </div>

            <div>
              <label>
                State:
                <input type="text" name="state" value={address.state} onChange={handleAddress} />
              </label>
            </div>

            <div>
              <label>
                Country:
                <input type="text" name="country" value={address.country} onChange={handleAddress} />
              </label>
            </div>

            <div>
              <label>
                Images:
                <input type="file" onChange={(e) => setImages([...images, e.target.files[0]])} />
              </label>
            </div>


            <div>
              <label>
                Longitude:
                <input type="number" name="longitude" value={coordinate.longitude} onChange={handleLongitude} />
              </label>
            </div>

            <div>
              <label>
                Latitude:
                <input type="number" name="latitude" value={coordinate.latitude} onChange={handleLatitude} />
              </label>
            </div>

            <button onClick={handleBack}>Back</button>
            <button onClick={handleNext}>Next</button>
          </form>
        </div>
      )}
      {stage === 3 && (
        <div>
          <h2>Step 3</h2>
          <form onSubmit={() => setStage(4)}>
            <h3 className={styles.titles}>Schedule</h3>

            <label htmlFor="monday"> Monday :
              <input
                placeholder="Open"
                name="monday open"
                value={schedule.monday.open}
                onChange={handleSchedule}
              />
              <input
                placeholder="Close"
                name="monday close"
                value={schedule.monday.close}
                onChange={handleSchedule}
              />
            </label>
            <div>
              <label htmlFor="Tuesday">  Tuesday
                <input
                  placeholder="Open"
                  name="tuesday open"
                  value={schedule.tuesday.open}
                  onChange={handleSchedule}
                />
                <input
                  placeholder="Close"
                  name="tuesday close"
                  value={schedule.tuesday.close}
                  onChange={handleSchedule}
                />
              </label>
            </div>

            <div>
              <label htmlFor="Wednesday"> Wednesday
                <input
                  placeholder="Open"
                  name="wednesday open"
                  value={schedule.wednesday.open}
                  onChange={handleSchedule}
                />
                <input
                  placeholder="Close"
                  name="wednesday close"
                  value={schedule.wednesday.close}
                  onChange={handleSchedule}
                />
              </label>

            </div>

            <div>
              <label htmlFor="Thursday"> Thursday
                <input
                  placeholder="Open"
                  name="thursday open"
                  value={schedule.thursday.open}
                  onChange={handleSchedule}
                />
                <input
                  placeholder="Close"
                  name="thursday close"
                  value={schedule.thursday.close}
                  onChange={handleSchedule}
                />
              </label>
            </div>

            <div>
              <label htmlFor="Friday"> Friday
                <input
                  placeholder="Open"
                  name="friday open"
                  value={schedule.friday.open}
                  onChange={handleSchedule}
                />
                <input
                  placeholder="Close"
                  name="friday close"
                  value={schedule.friday.close}
                  onChange={handleSchedule}
                />
              </label>
            </div>

            <div>
              <label htmlFor="Saturday"> Saturday
                <input
                  placeholder="Open"
                  name="saturday open"
                  value={schedule.saturday.open}
                  onChange={handleSchedule}
                />
                <input
                  placeholder="Close"
                  name="saturday close"
                  value={schedule.saturday.close}
                  onChange={handleSchedule}
                />
              </label>
            </div>

            <div>

              <label htmlFor="sunday"> Sunday
                <input
                  placeholder="Open"
                  name="sunday open"
                  value={schedule.sunday.open}
                  onChange={handleSchedule}
                />
                <input
                  placeholder="Close"
                  name="sunday close"
                  value={schedule.sunday.close}
                  onChange={handleSchedule}
                />
              </label>
            </div>

            <h3>Select Menu options:</h3>

            {Menus.map((menues) => (
              <label key={menues}>
                <input
                  type="checkbox"
                  value={menues}
                  checked={menu.includes(menues)}
                  onChange={handleMenu}
                />
                {menues}
              </label>
            ))}


            <h2>Select your diets:</h2>
            {Diets.map((diet) => (
              <label key={diet}>
                <input
                  type="checkbox"
                  value={diet}
                  checked={diets.includes(diet)}
                  onChange={handleDiets}
                />
                {diet}
              </label>
            ))}

            <button onClick={handleBack}>Back</button>
            <button onClick={handleNext}>Next</button>
          </form>
        </div>
      )}
      {stage === 4 && (
        <div>
          <h2>Step 4</h2>
          <h3>Mesas</h3>
          <form onSubmit={handleCreate}>
            <label>
              <input type="number" min='1' max='41' name="tables" value={tables} onChange={handleTable} />
              <span>(min: 1 - max: 41)</span>
            </label>


            <h2>Select your  Payment Method:</h2>
            {PaymentMethods.map((paymentMethod) => (
              <label key={paymentMethod}>
                <input
                  type="checkbox"
                  value={paymentMethod}
                  checked={paymentMethods.includes(paymentMethod)}
                  onChange={handlePaymentMethods}
                />
                {paymentMethod}
              </label>
            ))}


            <h2>Select your Atmosphere:</h2>
            {Atmospheres.map((atmospheres) => (
              <label key={atmospheres}>
                <input
                  type="checkbox"
                  value={atmospheres}
                  checked={atmosphere.includes(atmospheres)}
                  onChange={handleAtmosphere}
                />
                {atmospheres}
              </label>
            ))}

            <h2>Select your Extras:</h2>
            {Extras.map((extras) => (
              <label key={extras}>
                <input
                  type="checkbox"
                  value={extras}
                  checked={extra.includes(extras)}
                  onChange={handleExtras}
                />
                {extras}
              </label>
            ))}


            <h2>Select your Section:</h2>
            {Sections.map((sections) => (
              <label key={sections}>
                <input
                  type="checkbox"
                  value={sections}
                  checked={section.includes(sections)}
                  onChange={handleSection}
                />
                {sections}
              </label>
            ))}

            <div>
              <div />
              <div className={styles.terminos}>
                <label htmlFor="terminos">Acepto términos y condiciones</label>
                <input
                  type="checkbox"
                  value={terminos}
                  id="terminos"
                  name="terminos"
                  onChange={(e) => setTerminos(e.target.checked)}
                />
              </div>
            </div>
            <button onClick={handleBack}>Back</button>
            <button type="submit"> Restaurant Created</button>
          </form>
        </div>
      )}
    </div>

  );
}

//TRAER DEL ESTADO GLOBAL LO JARCODEADO
//LLAMAR LA AXION DEL ESTADO GLOBAL SI LLENAS UN CAMPO BIEN TE VAS A LA HOME Y SI TENES ERROR QUE TE DEJE EN EL FORMULARIO 