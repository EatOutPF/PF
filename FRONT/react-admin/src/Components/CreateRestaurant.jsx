// import "./Componentes/Formulario.jsx"
import React from "react";
import styles from "../Components/CreateRestaurant/CreateRestaurant.module.css"
import { useState,  useEffect} from "react";
import {useDispatch} from "react-redux";
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

  const[coordinate,setCoordinate] = useState({
    longitude:0,
    latitude:0,
  }
  )

  const [contact, setContact] = useState({
    contact: {
      phoneNumber: "",
      email: "",
      socialMedia: { instagram: "", facebook: "", wpp: "", },
    }
  })

  const [schedule, setSchedule] = useState([
    {
      monday: { open: "", close: "" },
      tuesday: { open: "", close: "" },
      wednesday: { open: "", close: "" },
      thursday: { open: "", close: "" },
      friday: { open: "", close: "" },
      saturday: { open: "", close: "" },
      sunday: { open: "", close: "" },
    },
  ]);
  const [images, setImages] = useState([]);

  const [tables, setTables] = useState(0);

  const [stage, setStage] = useState(1);

  const diets = ["vegano", "celiaco", "vegetariano"];

  const paymentMethods = ["credito", "debito", "mercadopago", "efectivo", "transferencia"]

  const atmospheres = ["musica en vivo", "familiar", "romantico", "formal"]

  const extras = ["petfriendly", "bar", "wi-fi", "fumadores", "menú para niño"]

  const sections = ["terraza", "barra", "salón principal"]

  const menus = [ "italiana","asiática","internacional","hamburguesas","alta cocina","bares","pizzerías","mediterránea","gourmet",]

  const [selectDiets, setSelectDiets] = useState([
    "vegano",
    "celiaco",
    "vegetariano"
  ]);

  const [selectMenu, setSelectMenu] = useState([
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


  const [selectPaymentMethods, setSelectPaymentMethods] = useState([
    "credito",
    "debito",
    "mercadopago",
    "efectivo",
    "transferencia",


  ]);

  const [selectAtmosphere, setSelectAtmosphere] = useState([
    "musica en vivo",
    "familiar",
    "romantico",
    "formal",
  ])

  const [selectExtra, setSelectExtra] = useState([
    "petfriendly",
    "bar",
    "wi-fi",
    "fumadores",
    "menú para niño",

  ])


  const [selectSection, setSelectSection] = useState([
    "terraza",
    "barra",
    "salón principal",


  ])

  
  const handleMenu = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectMenu([...selectMenu, value]);
    } else {
      setSelectMenu(selectMenu.filter((menu) => menu !== value));
    }
  };



  const handleDiets = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectDiets([...selectDiets, value]);
    } else {
      setSelectDiets(selectDiets.filter((diet) => diet !== value));
    }
  };

  const handlePaymentMethods = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectPaymentMethods([...selectPaymentMethods, value]);
    } else {
      setSelectPaymentMethods(selectPaymentMethods.filter((paymentMethod) => paymentMethod !== value));
    }
  };


  const handleAtmosphere = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectAtmosphere([...selectAtmosphere, value]);
    } else {
      setSelectAtmosphere(selectAtmosphere.filter((atmosphere) => atmosphere !== value));
    }
  };


  const handleExtras = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectExtra([...selectExtra, value]);
    } else {
      setSelectExtra(selectExtra.filter((extra) => extra !== value));
    }
  };

  const handleSection = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectSection([...selectSection, value]);
    } else {
      setSelectSection(selectSection.filter((section) => section !== value));
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
      ...setContact,
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
    setCoordinate({...coordinate, longitude: event.target.value})
  }

  const handleLatitude = event => {
    setCoordinate({...coordinate, latitude: event.target.value})
  }

  const handleSchedule = (day, time, value) => {
    setSchedule((prevSchedule) => {
      const updatedSchedule = [...prevSchedule];
      updatedSchedule[0][day][time] = value;
      return updatedSchedule;
    });
  };

  const handleTable = (event) => {
    setTables(event.target.value);
  };


  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log("Submitted data:", input, addres, contact);
  // };

  const handleCreate = () => {
  const newRestaurant = {
    input,
    address,
    contact,
    schedule,
    images,
    tables,
    stage,
    selectDiets,
    selectMenu,
    selectPaymentMethods,
    selectAtmosphere,
    selectExtra,
    selectSection,

  };
  dispatch(postRestaurant(newRestaurant));
};


// useEffect(() => {
//   dispatch(postRestaurant())
//   }, [dispatch])


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
                <input type="number" name="phoneNumber" value={contact.name} onChange={handleContact} />
              </label>
            </div>
            <div>
              <label>
                Email:
                <input type="text" name="email" value={contact.name} onChange={handleContact} />
              </label>
            </div>
            <h3>Social Media</h3>
            <div>
              <label>
                Instagram:
                <input type="text" name="instagram" value={contact.name} onChange={handleContact} />
              </label>
            </div>

            <div>
              <label>
                Facebook:
                <input type="text" name="facebook" value={contact.name} onChange={handleContact} />
              </label>
            </div>

            <div>
              <label>
                Wpp:
                <input type="number" name="wpp" value={contact.name} onChange={handleContact} />
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
                value={schedule[0].monday.open}
                onChange={(e) => handleSchedule("monday", "open", e.target.value)}
              />
              <input
                placeholder="Close"
                value={schedule[0].monday.close}
                onChange={(e) => handleSchedule( "monday", "close", e.target.value)}
              />
            </label>
            <div>
              <label htmlFor="Tuesday">  Tuesday
                <input
                  placeholder="Open"
                  value={schedule[0].tuesday.open}
                  onChange={(e) => handleSchedule( "tuesday", "open", e.target.value)}
                />
                <input
                  placeholder="Close"
                  value={schedule[0].tuesday.close}
                  onChange={(e) => handleSchedule( "tuesday", "close", e.target.value)}
                />
              </label>

            </div>

            <div>

              <label htmlFor="Wednesday"> Wednesday
                <input
                  placeholder="Open"
                  value={schedule[0].wednesday.open}
                  onChange={(e) => handleSchedule("wednesday", "open",e.target.value)}
                />
                <input
                  placeholder="Close"
                  value={schedule[0].wednesday.close}
                  onChange={(e) => handleSchedule( "wednesday", "close",e.target.value)}
                />
              </label>

            </div>

            <div>
              <label htmlFor="Thursday"> Thursday
                <input
                  placeholder="Open"
                  value={schedule[0].thursday.open}
                  onChange={(e) => handleSchedule( "thursday", "open",e.target.value)}
                />
                <input
                  placeholder="Close"
                  value={schedule[0].thursday.close}
                  onChange={(e) => handleSchedule( "thursday", "close", e.target.value)}
                />
              </label>

            </div>

            <div>
              <label htmlFor="Friday"> Friday
                <input
                  placeholder="Open"
                  value={schedule[0].friday.open}
                  onChange={(e) => handleSchedule( "friday", "open", e.target.value)}
                />
                <input
                  placeholder="Close"
                  value={schedule[0].friday.close}
                  onChange={(e) => handleSchedule( "friday", "close",e.target.value)}
                />
              </label>

            </div>

            <div>
              <label htmlFor="Saturday"> Saturday
                <input
                  placeholder="Open"
                  value={schedule[0].saturday.open}
                  onChange={(e) => handleSchedule( "saturday", "open", e.target.value)}
                />
                <input
                  placeholder="Close"
                  value={schedule[0].saturday.close}
                  onChange={(e) => handleSchedule("saturday", "close", e.target.value)}
                />
              </label>
            </div>

            <div>

              <label htmlFor="sunday"> Sunday
                <input
                  placeholder="Open"
                  value={schedule[0].sunday.open}
                  onChange={(e) => handleSchedule("sunday", "open",e.target.value)}
                />
                <input
                  placeholder="Close"
                  value={schedule[0].sunday.close}
                  onChange={(e) => handleSchedule("sunday", "close",e.target.value)}
                />
              </label>
            </div>

               <h3>Select Menu options:</h3>
        
            {menus.map((menu) => (
              <label key={menu}>
                <input
                  type="checkbox"
                  value={menu}
                  checked={selectMenu.includes(menu)}
                  onChange={handleMenu}
                />
                {menu}
              </label>
            ))}


            <h2>Select your diets:</h2>
            {diets.map((diet) => (
              <label key={diet}>
                <input
                  type="checkbox"
                  value={diet}
                  checked={selectDiets.includes(diet)}
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
            {paymentMethods.map((paymentMethod) => (
              <label key={paymentMethod}>
                <input
                  type="checkbox"
                  value={paymentMethod}
                  checked={selectPaymentMethods.includes(paymentMethod)}
                  onChange={handlePaymentMethods}
                />
                {paymentMethod}
              </label>
            ))}


            <h2>Select your Atmosphere:</h2>
            {atmospheres.map((atmosphere) => (
              <label key={atmosphere}>
                <input
                  type="checkbox"
                  value={atmosphere}
                  checked={selectAtmosphere.includes(atmosphere)}
                  onChange={handleAtmosphere}
                />
                {atmosphere}
              </label>
            ))}

            <h2>Select your Extras:</h2>
            {extras.map((extra) => (
              <label key={extra}>
                <input
                  type="checkbox"
                  value={extra}
                  checked={selectExtra.includes(extra)}
                  onChange={handleExtras}
                />
                {extra}
              </label>
            ))}


            <h2>Select your Section:</h2>
            {sections.map((section) => (
              <label key={section}>
                <input
                  type="checkbox"
                  value={section}
                  checked={selectSection.includes(section)}
                  onChange={handleSection}
                />
                {section}
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

