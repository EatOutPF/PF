// import "./Componentes/Formulario.jsx"
import React from "react";
import styles from "./CreateRestaurant.module.css"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postRestaurant } from "../../Redux/Actions";
import Validations from "../Validations/Validations";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const msg = useSelector((stage) => stage.msg);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [terminos, setTerminos] = useState("false");


  const [errorName, setErrorName] = useState({
    name: "",
  });

  const [errorAddress, setErrorAddress] = useState({
    streetName: "",
    streetNumber: 0,
    neighborhood: "",
    city: "",
    state: "",
    country: "",
  });

  const [errorCoordinate, setErrorCoordinate] = useState({
    longitude: 0,
    latitude: 0,
  });

  const [errorContact, setErrorContact] = useState({
    phoneNumber: 0,
    email: "",
  });
  const [errorSocialMedia, setErrorSocialMedia] = useState({
    instagram: "",
    facebook: "",
    wpp: "",
  })


  const [errorSchedule, setErrorShedule] = useState({
    monday: { open: "", close: "" },
    tuesday: { open: "", close: "" },
    wednesday: { open: "", close: "" },
    thursday: { open: "", close: "" },
    friday: { open: "", close: "" },
    saturday: { open: "", close: "" },
    sunday: { open: "", close: "" },
  });


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
  })

  const [socialMedia, setSocialMedia] = useState({
    instagram: "",
    facebook: "",
    wpp: 0,
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

  const [selectMenu, setSelectMenu] = useState([]);

  const [selectDiets, setSelectDiets] = useState([]);

  const [selectAtmosphere, setSelectAtmosphere] = useState([]);

  const [selectPaymentMethods, setSelectPaymentMethods] = useState([]);

  const [selectExtra, setSelectExtra] = useState([]);

  const [selectSection, setSelectSection] = useState([]);




  const {
    optionsMenu,
    optionsAtmosphere,
    optionsDiets,
    optionpaymentMethods,
    optionsExtras,
    optionsSection,
  } = useSelector((state) => state);


  const handleInput = (event) => {
    console.log(event.target.value)
    const { name, value } = event.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
    setErrorName(Validations({
      ...errorName,
      [name]: value
    })

    )

  };
  useEffect(() => {
    console.log('Input:', input);
    console.log('Social Media Errors:', errorName);
  }, [input, errorName]);

  const handleDiets = (event) => {
    const checked = selectDiets.includes(event.target.value);
    if (checked) {
      const newDiets = selectDiets.filter(diet => diet !== event.target.value)
      setSelectDiets(newDiets)
    } else {
      setSelectDiets([
        ...selectDiets,
        event.target.value
      ])
    }
    console.log(selectDiets)
  };
  useEffect(() => {
    if (!Array.isArray(selectDiets)) {
      console.error('Invalid selectMenu value');
      return;
    }


    console.log(selectDiets);
  }, [selectDiets]);


  const handleMenu = (event) => {
    const checked = selectMenu.includes(event.target.value)
    if (checked) {
      const newSelect = selectMenu.filter(menu => menu !== event.target.value)
      setSelectMenu(newSelect)
    } else {
      setSelectMenu([
        ...selectMenu,
        event.target.value,
      ]);

    }

    console.log(selectMenu)
  }
  useEffect(() => {
    if (!Array.isArray(selectMenu)) {
      console.error('Invalid selectMenu value');
      return;
    }


    console.log(selectMenu);
  }, [selectMenu]);


  const handlePaymentMethods = (event) => {
    const checked = selectPaymentMethods.includes(event.target.value);
    console.log(checked)
    if (checked) {
      const newPaymentMethods = selectPaymentMethods.filter((pm) => pm !== event.target.value)
      setSelectPaymentMethods(newPaymentMethods)
    } else {
      setSelectPaymentMethods([
        ...selectPaymentMethods,
        event.target.value
      ])
    }
    console.log(selectPaymentMethods)
  };
  useEffect(() => {
    if (!Array.isArray(selectPaymentMethods)) {
      console.error('Invalid selectMenu value');
      return;
    }


    console.log(selectPaymentMethods);
  }, [selectPaymentMethods]);



  const handleAtmosphere = (event) => {
    const checked = selectAtmosphere.includes(event.target.value)

    if (checked) {
      const newAtmosphere = selectAtmosphere.filter(atmosphere => atmosphere !== event.target.value);
      setSelectAtmosphere(newAtmosphere)
    } else {
      setSelectAtmosphere([
        ...selectAtmosphere,
        event.target.value
      ])
    }
    console.log(selectAtmosphere)
  };

  useEffect(() => {
    if (!Array.isArray(selectAtmosphere)) {
      console.error('Invalid selectMenu value');
      return;
    }


    console.log(selectAtmosphere);
  }, [selectAtmosphere]);



  const handleExtras = (event) => {
    const checked = selectExtra.includes(event.target.value);
    if (checked) {
      const newExtra = selectExtra.filter(extras => extras !== event.target.value);
      setSelectExtra(newExtra)
    } else {
      setSelectExtra([
        ...selectExtra,
        event.target.value
      ])
    }
    console.log(selectExtra)
  };

  useEffect(() => {
    if (!Array.isArray(selectExtra)) {
      console.error('Invalid selectMenu value');
      return;
    }


    console.log(selectExtra);
  }, [selectExtra]);


  const handleSection = (event) => {
    const checked = selectSection.includes(event.target.value);
    if (checked) {
      const newSection = selectSection.filter(sections => sections !== event.target.value);
      setSelectSection(newSection)
    } else {
      setSelectSection([
        ...selectSection,
        event.target.value

      ])
    }
    console.log(selectSection)
  };

  useEffect(() => {
    if (!Array.isArray(selectSection)) {
      console.error('Invalid selectMenu value');
      return;
    }


    console.log(selectSection);
  }, [selectSection]);


  const handleNext = () => {
    setStage(stage + 1);
  };

  const handleBack = () => {
    setStage(stage - 1);
  };

  const handleContact = (event) => {
    console.log(event.target.value)
    setContact({
      ...contact,
      [event.target.name]: event.target.value,
    });

    setErrorContact(Validations({
      ...errorContact,
      [event.target.name]: event.target.value,
    }))
    console.log(contact)
  };
  useEffect(() => {
    console.log('Conctact:', contact);
    console.log('Conctact Errors:', errorContact);
  }, [contact, errorContact]);


  const handleAddress = (event) => {
    console.log(event.target.value)
    setAddress({
      ...address,
      [event.target.name]: event.target.value,
    });
    setErrorAddress(Validations({
      ...errorAddress,
      address: event.target.value
    })

    )
    console.log(address)
  };

  useEffect(() => {
    console.log("address:", address);
    console.log("Error address changed:", errorAddress);
  }, [address, errorAddress]);



  const handleLongitude = event => {
    console.log(event.target.value)
    setCoordinate({ ...coordinate, longitude: event.target.value });
    setErrorCoordinate(Validations({
      ...errorCoordinate,
      longitude: event.target.value
    }))
    console.log(coordinate)
  }


  const handleLatitude = (event) => {
    console.log(event.target.value)
    setCoordinate({ ...coordinate, latitude: event.target.value });
    setErrorCoordinate(Validations({
      ...errorCoordinate,
      latitude: event.target.value
    }))
  }
  useEffect(() => {
    console.log("address:", coordinate);
    console.log("Error address changed:", errorCoordinate);
  }, [coordinate, errorCoordinate]);



  const handleInstagram = (event) => {
    console.log(event.target.value)
    setSocialMedia({
      ...socialMedia,
      instagram: event.target.value,
    });
    setErrorSocialMedia(Validations({
      ...errorSocialMedia,
      instagram: event.target.value,
    }))

    console.log(socialMedia)
  }


  const handleFacebook = (event) => {
    console.log(event.target.value)
    setSocialMedia({
      ...socialMedia,
      facebook: event.target.value
    })
    setErrorSocialMedia(Validations({
      ...errorSocialMedia,
      facebook: event.target.value,
    }))
    console.log(socialMedia)
  }

  const handleWpp = (event) => {
    console.log(event.target.value)
    setSocialMedia({
      ...socialMedia,
      wpp: event.target.value,
    })
    setErrorSocialMedia(Validations({
      ...errorSocialMedia,
      wpp: event.target.value,
    }))
    console.log(socialMedia)
  }


  useEffect(() => {
    console.log('Social Media:', socialMedia);
    console.log('Social Media Errors:', errorSocialMedia);
  }, [socialMedia, errorSocialMedia]);



  const handleSchedule = (event) => {
    console.log(event.target.value)
    const { name, value } = event.target;
    const [day, time] = name.split(" ");

    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: {
        ...prevSchedule[day],
        [time]: value,
      },
    }));
    setErrorShedule((prevErrors) => ({
      ...prevErrors,
      [day]: {
        ...prevErrors[day],
        [time]: Validations(value) ? "" : "Invalid time format",
      },
    }));
    console.log(schedule)
  };

  useEffect(() => {
    console.log("Schedule:", schedule);
    console.log("Errors:", errorSchedule);
  }, [schedule, errorSchedule]);


  const handleTable = (event) => {
    console.log(event.target.value)
    setTables(event.target.value);
  };


  const handleCreate = (event) => {
    event.preventDefault();
    setAddress({ ...address, coordinate })
    setContact({ ...contact, socialMedia })
    const newRestaurant = {
      name: input.name,
      address,
      contact,
      schedule,
      images,
      tables,
      diets: selectDiets,
      menu: selectMenu,
      paymentMethods: selectPaymentMethods,
      atmosphere: selectAtmosphere,
      extras: selectExtra,
      section: selectSection,

    };

    console.log({ newRestaurant })
    dispatch(postRestaurant(newRestaurant));
    alert(msg)
    navigate("/home")
  };



  return (

    <div className={styles.formContainer}>
      <h1 className={styles.title}>REGISTRATION RESTAURANT</h1>
      <form onSubmit={handleCreate}>
        {stage === 1 && (
          <div>
            <h2>Step 1</h2>
            <div className={styles.divInt}>
              <label>
                Name:
                <input type="text" name="name" value={input.name} onChange={handleInput} />
                {errorName.name && <span>{errorName.name}</span>}
              </label>

            </div>
            <h3>Contact</h3>
            <div className={styles.divInt}>
              <label>
                Phone Number:
                <input type="number" name="phoneNumber" value={contact.phoneNumber} onChange={handleContact} />
                {errorContact.phoneNumber && <span>{errorContact.phoneNumber}</span>}
              </label>
            </div>
            <div className={styles.div}>
              <label>
                Email:
                <input type="text" name="email" value={contact.email} onChange={handleContact} />
                {errorContact.email && <span>{errorContact.email}</span>}
              </label>
            </div>
            <h3>Social Media</h3>
            <div  className={styles.div}>
              <label>
                Instagram:
                <input type="text" name="instagram" value={socialMedia.instagram} onChange={handleInstagram} />
              </label>
              {errorSocialMedia.instagram && <span>{errorSocialMedia.instagram}</span>}
            </div>

            <div  className={styles.div}>
              <label>
                Facebook:
                <input type="text" name="facebook" value={socialMedia.facebook} onChange={handleFacebook} />
              </label>
              {errorSocialMedia.facebook && <span>{errorSocialMedia.facebook}</span>}
            </div>

            <div  className={styles.div}>
              <label>
                Wpp:
                <input type="number" name="wpp" value={socialMedia.wpp} onChange={handleWpp} />
              </label>
              {errorSocialMedia.wpp && <span>{errorSocialMedia.wpp}</span>}
            </div>


            <button className={styles.buttons} onClick={handleNext}>Next</button>

          </div>
        )}
        {stage === 2 && (
          <div>
            <h2>Step 2</h2>
            <h3>Address</h3>

            <div  className={styles.div}>
              <label>
                Street Name:
                <input type="text" name="streetName" value={address.streetName} onChange={handleAddress} />
              </label>
              {errorAddress.streetName && <span>{errorAddress.streetName}</span>}
            </div>

            <div  className={styles.div}>
              <label>
                Street Number:
                <input type="number" name="streetNumber" value={address.streetNumber} onChange={handleAddress} />
              </label>
              {errorAddress.streetNumber && <span>{errorAddress.streetNumber}</span>}
            </div>

            <div  className={styles.div}>
              <label>
                Neighborhood:
                <input type="text" name="neighborhood" value={address.neighborhood} onChange={handleAddress} />
              </label>
              {errorAddress.neighborhood && <span>{errorAddress.neighborhood}</span>}
            </div>

            <div  className={styles.div}>
              <label>
                City:
                <input type="text" name="city" value={address.city} onChange={handleAddress} />
              </label>
              {errorAddress.city && <span>{errorAddress.city}</span>}
            </div>

            <div  className={styles.div}>
              <label>
                State:
                <input type="text" name="state" value={address.state} onChange={handleAddress} />
              </label>
              {errorAddress.state && <span>{errorAddress.state}</span>}
            </div>

            <div  className={styles.div}>
              <label>
                Country:
                <input type="text" name="country" value={address.country} onChange={handleAddress} />
              </label>
              {errorAddress.country && <span>{errorAddress.country}</span>}
            </div>

            <div  className={styles.div}>
              <label>
                Images:
                <input type="file" onChange={(e) => setImages([...images, e.target.files[0]])} />
              </label>
            </div>


            <div  className={styles.div}>
              <label>
                Longitude:
                <input type="number" name="longitude" value={coordinate.longitude} onChange={handleLongitude} />
              </label>
              {errorCoordinate.longitude && <span>{errorCoordinate.longitude}</span>}

            </div>

            <div  className={styles.div}>
              <label>
                Latitude:
                <input type="number" name="latitude" value={coordinate.latitude} onChange={handleLatitude} />
              </label>
              {errorCoordinate.latitude && <span>{errorCoordinate.latitude}</span>}

            </div>

            <button className={styles.buttons} onClick={handleBack}>Back</button>
            <button className={styles.buttons} onClick={handleNext}>Next</button>

          </div>
        )}
        {stage === 3 && (
          <div>
            <h2>Step 3</h2>

            <h3>Schedule</h3>
             <div   className={styles.div}>
            <label htmlFor="monday"> Monday :
              <input
                placeholder="Open"
                name="monday open"
                value={schedule.monday.open}
                onChange={handleSchedule}
              />
              {errorSchedule.monday.open && <span>{errorSchedule.monday.open}</span>}
              <input
                placeholder="Close"
                name="monday close"
                value={schedule.monday.close}
                onChange={handleSchedule}
              />
              {errorSchedule.monday.close && <span>{errorSchedule.monday.close}</span>}
            </label>
             </div>

            <div  className={styles.div}>
              <label htmlFor="Tuesday">  Tuesday
                <input
                  placeholder="Open"
                  name="tuesday open"
                  value={schedule.tuesday.open}
                  onChange={handleSchedule}
                />
                {errorSchedule.tuesday.open && <span>{errorSchedule.tuesday.open}</span>}

                <input
                  placeholder="Close"
                  name="tuesday close"
                  value={schedule.tuesday.close}
                  onChange={handleSchedule}
                />
                {errorSchedule.tuesday.close && <span>{errorSchedule.tuesday.close}</span>}
              </label>
            </div>

            <div  className={styles.div}>
              <label htmlFor="Wednesday"> Wednesday
                <input
                  placeholder="Open"
                  name="wednesday open"
                  value={schedule.wednesday.open}
                  onChange={handleSchedule}
                />
                {errorSchedule.wednesday.open && <span>{errorSchedule.wednesday.open}</span>}

                <input
                  placeholder="Close"
                  name="wednesday close"
                  value={schedule.wednesday.close}
                  onChange={handleSchedule}
                />
                {errorSchedule.wednesday.close && <span>{errorSchedule.wednesday.close}</span>}
              </label>
            </div>

            <div  className={styles.div}>
              <label htmlFor="Thursday"> Thursday
                <input
                  placeholder="Open"
                  name="thursday open"
                  value={schedule.thursday.open}
                  onChange={handleSchedule}
                />
                {errorSchedule.thursday.open && <span>{errorSchedule.thursday.open}</span>}

                <input
                  placeholder="Close"
                  name="thursday close"
                  value={schedule.thursday.close}
                  onChange={handleSchedule}
                />
                {errorSchedule.thursday.close && <span>{errorSchedule.thursday.close}</span>}
              </label>

            </div>

            <div  className={styles.div}>
              <label htmlFor="Friday"> Friday
                <input
                  placeholder="Open"
                  name="friday open"
                  value={schedule.friday.open}
                  onChange={handleSchedule}
                />
                {errorSchedule.friday.open && <span>{errorSchedule.friday.open}</span>}

                <input
                  placeholder="Close"
                  name="friday close"
                  value={schedule.friday.close}
                  onChange={handleSchedule}
                />
                {errorSchedule.friday.close && <span>{errorSchedule.friday.close}</span>}
              </label>

            </div>

            <div  className={styles.div}>
              <label htmlFor="Saturday"> Saturday
                <input
                  placeholder="Open"
                  name="saturday open"
                  value={schedule.saturday.open}
                  onChange={handleSchedule}
                />
                {errorSchedule.saturday.open && <span>{errorSchedule.saturday.open}</span>}

                <input
                  placeholder="Close"
                  name="saturday close"
                  value={schedule.saturday.close}
                  onChange={handleSchedule}
                />
                {errorSchedule.saturday.close && <span>{errorSchedule.saturday.close}</span>}
              </label>
            </div>

            <div  className={styles.div}> 
              <label htmlFor="sunday"> Sunday
                <input
                  placeholder="Open"
                  name="sunday open"
                  value={schedule.sunday.open}
                  onChange={handleSchedule}
                />
                {errorSchedule.sunday.open && <span>{errorSchedule.sunday.open}</span>}

                <input
                  placeholder="Close"
                  name="sunday close"
                  value={schedule.sunday.close}
                  onChange={handleSchedule}
                />
                {errorSchedule.sunday.close && <span>{errorSchedule.sunday.close}</span>}
              </label>
            </div>

            <h3>Select Menu options:</h3>
             <div  className={styles.div}>
            {optionsMenu.map((menu) => (
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
             </div>


            <h2>Select your diets:</h2>
            {optionsDiets.map((diet) => (
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

            <button className={styles.buttons} onClick={handleBack}>Back</button>
            <button className={styles.buttons} onClick={handleNext}>Next</button>

          </div>
        )}
        {stage === 4 && (
          <div>
            <h2>Step 4</h2>
            <h3>Mesas</h3>

            <label>
              <input type="number" min='1' max='41' name="tables" value={tables} onChange={handleTable} />
              <span>(min: 1 - max: 41)</span>
            </label>


            <h2>Select your  Payment Method:</h2>
            {optionpaymentMethods?.map((pm) => (
              <label key={pm}>
                <input
                  type="checkbox"
                  value={pm}
                  checked={selectPaymentMethods.includes(pm)}
                  onChange={handlePaymentMethods}
                />
                {pm}
              </label>
            ))}


            <h2>Select your Atmosphere:</h2>
            {optionsAtmosphere.map((atmospheres) => (
              <label key={atmospheres}>
                <input
                  type="checkbox"
                  value={atmospheres}
                  checked={selectAtmosphere.includes(atmospheres)}
                  onChange={handleAtmosphere}
                />
                {atmospheres}
              </label>
            ))}

            <h2>Select your Extras:</h2>
            {optionsExtras.map((extras) => (
              <label key={extras}>
                <input
                  type="checkbox"
                  value={extras}
                  checked={selectExtra.includes(extras)}
                  onChange={handleExtras}
                />
                {extras}
              </label>
            ))}


            <h2>Select your Section:</h2>
            {optionsSection.map((sections) => (
              <label key={sections}>
                <input
                  type="checkbox"
                  value={sections}
                  checked={selectSection.includes(sections)}
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
            <button className={styles.buttons} onClick={handleBack}>Back</button>
            <button className={styles.buttons} type="submit" disabled={
              errorName ||
              errorAddress.streetName ||
              errorAddress.streetNumber ||
              errorAddress.city ||
              errorAddress.state ||
              errorAddress.country ||
              errorAddress.city ||
              errorAddress.country ||
              errorCoordinate.latitude ||
              errorCoordinate.latitude ||
              errorContact.email ||
              errorContact.phoneNumber ||
              errorSocialMedia.instagram ||
              errorSocialMedia.facebook ||
              errorSocialMedia.wpp ||
              errorSchedule

            }> Restaurant Created</button>
          </div>
        )}
      </form>
    </div>

  );
}

