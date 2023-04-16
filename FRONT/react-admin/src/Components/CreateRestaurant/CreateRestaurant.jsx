// import "./Componentes/Formulario.jsx"
import React from "react";
import styles from "./CreateRestaurant.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postRestaurant } from "../../Redux/Actions";
import Validations from "../Validations/Validations";
import { useNavigate } from "react-router-dom";
import sweetAlert from "sweetalert";
import { readMultifilesUpCloudinary } from "../../Redux/utils";

export default function Form() {
  const msg = useSelector((stage) => stage.msg);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [terminos, setTerminos] = useState("false");
  const user = useSelector((state) => state.user);
  const [upCloudinaryImages, setUpCloudinaryImages] = useState([]);
  const [errorName, setErrorName] = useState({
    name: "",
  });

  const [errorAddress, setErrorAddress] = useState({
    streetName: "",
    streetNumber: "",
    /*  neighborhood: "", */
    city: "",
    state: "",
    country: "",
  });

  const [errorCoordinate, setErrorCoordinate] = useState({
    longitude: "",
    latitude: "",
  });

  const [errorContact, setErrorContact] = useState({
    phoneNumber: "",
    email: "",
  });
  const [errorSocialMedia, setErrorSocialMedia] = useState({
    /*   instagram: "",
    facebook: "", */
    wpp: "",
  });

  /*  const [errorSchedule, setErrorShedule] = useState({
    monday: { open: "", close: "" },
    tuesday: { open: "", close: "" },
    wednesday: { open: "", close: "" },
    thursday: { open: "", close: "" },
    friday: { open: "", close: "" },
    saturday: { open: "", close: "" },
    sunday: { open: "", close: "" },
  }); */

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
  });

  const [contact, setContact] = useState({
    phoneNumber: 0,
    email: "",
  });

  const [socialMedia, setSocialMedia] = useState({
    instagram: "",
    facebook: "",
    wpp: 0,
  });

  const [schedule, setSchedule] = useState({
    monday: { open: "00:00", close: "00:00" },
    tuesday: { open: "00:00", close: "00:00" },
    wednesday: { open: "00:00", close: "00:00" },
    thursday: { open: "00:00", close: "00:00" },
    friday: { open: "00:00", close: "00:00" },
    saturday: { open: "00:00", close: "00:00" },
    sunday: { open: "00:00", close: "00:00" },
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
    const { name, value } = event.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
    setErrorName(
      Validations({
        ...errorName,
        [name]: value,
      })
    );
  };

  useEffect(() => {
    console.log("Input:", input);
    // console.log('Social Media Errors:', errorName);
  }, [input]);

  const handleDiets = (event) => {
    const checked = selectDiets.includes(event.target.value);
    if (checked) {
      const newDiets = selectDiets.filter(
        (diet) => diet !== event.target.value
      );
      setSelectDiets(newDiets);
    } else {
      setSelectDiets([...selectDiets, event.target.value]);
    }
    console.log(selectDiets);
  };
  useEffect(() => {
    if (!Array.isArray(selectDiets)) {
      console.error("Invalid selectMenu value");
      return;
    }

    console.log(selectDiets);
  }, [selectDiets]);

  const handleMenu = (event) => {
    const checked = selectMenu.includes(event.target.value);
    if (checked) {
      const newSelect = selectMenu.filter(
        (menu) => menu !== event.target.value
      );
      setSelectMenu(newSelect);
    } else {
      setSelectMenu([...selectMenu, event.target.value]);
    }

    console.log(selectMenu);
  };
  useEffect(() => {
    if (!Array.isArray(selectMenu)) {
      console.error("Invalid selectMenu value");
      return;
    }

    console.log(selectMenu);
  }, [selectMenu]);

  const handlePaymentMethods = (event) => {
    const checked = selectPaymentMethods.includes(event.target.value);

    if (checked) {
      const newPaymentMethods = selectPaymentMethods.filter(
        (pm) => pm !== event.target.value
      );
      setSelectPaymentMethods(newPaymentMethods);
    } else {
      setSelectPaymentMethods([...selectPaymentMethods, event.target.value]);
    }
    console.log(selectPaymentMethods);
  };
  useEffect(() => {
    if (!Array.isArray(selectPaymentMethods)) {
      console.error("Invalid selectMenu value");
      return;
    }

    console.log(selectPaymentMethods);
  }, [selectPaymentMethods]);

  const handleAtmosphere = (event) => {
    const checked = selectAtmosphere.includes(event.target.value);

    if (checked) {
      const newAtmosphere = selectAtmosphere.filter(
        (atmosphere) => atmosphere !== event.target.value
      );
      setSelectAtmosphere(newAtmosphere);
    } else {
      setSelectAtmosphere([...selectAtmosphere, event.target.value]);
    }
    console.log(selectAtmosphere);
  };

  useEffect(() => {
    if (!Array.isArray(selectAtmosphere)) {
      console.error("Invalid selectMenu value");
      return;
    }

    console.log(selectAtmosphere);
  }, [selectAtmosphere]);

  const handleExtras = (event) => {
    const checked = selectExtra.includes(event.target.value);
    if (checked) {
      const newExtra = selectExtra.filter(
        (extras) => extras !== event.target.value
      );
      setSelectExtra(newExtra);
    } else {
      setSelectExtra([...selectExtra, event.target.value]);
    }
    console.log(selectExtra);
  };

  useEffect(() => {
    if (!Array.isArray(selectExtra)) {
      console.error("Invalid selectMenu value");
      return;
    }

    console.log(selectExtra);
  }, [selectExtra]);

  const handleSection = (event) => {
    const checked = selectSection.includes(event.target.value);
    if (checked) {
      const newSection = selectSection.filter(
        (sections) => sections !== event.target.value
      );
      setSelectSection(newSection);
    } else {
      setSelectSection([...selectSection, event.target.value]);
    }
    console.log(selectSection);
  };

  useEffect(() => {
    if (!Array.isArray(selectSection)) {
      console.error("Invalid selectMenu value");
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
    setContact({
      ...contact,
      [event.target.name]: event.target.value,
    });

    setErrorContact(
      Validations({
        ...errorContact,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleAddress = (event) => {
    setAddress({
      ...address,
      [event.target.name]: event.target.value,
    });
    setErrorAddress(
      Validations({
        ...errorAddress,
        address: event.target.value,
      })
    );
  };

  const handleLongitude = (event) => {
    setCoordinate({ ...coordinate, longitude: event.target.value });
    setErrorCoordinate(
      Validations({
        ...errorCoordinate,
        longitude: event.target.value,
      })
    );
  };

  const handleLatitude = (event) => {
    setCoordinate({ ...coordinate, latitude: event.target.value });
    setErrorCoordinate(
      Validations({
        ...errorCoordinate,
        latitude: event.target.value,
      })
    );
  };

  const handleInstagram = (event) => {
    setSocialMedia({
      ...socialMedia,
      instagram: event.target.value,
    });
    setErrorSocialMedia(
      Validations({
        ...errorSocialMedia,
        instagram: event.target.value,
      })
    );
  };

  const handleFacebook = (event) => {
    setSocialMedia({
      ...socialMedia,
      facebook: event.target.value,
    });
    setErrorSocialMedia(
      Validations({
        ...errorSocialMedia,
        facebook: event.target.value,
      })
    );
  };

  const handleWpp = (event) => {
    setSocialMedia({
      ...socialMedia,
      wpp: event.target.value,
    });
    setErrorSocialMedia(
      Validations({
        ...errorSocialMedia,
        wpp: event.target.value,
      })
    );
  };

  const handleSchedule = (event) => {
    const { name, value } = event.target;
    const [day, time] = name.split(" ");

    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: {
        ...prevSchedule[day],
        [time]: value,
      },
    }));
  };

  /*  const handleImages = async (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "EatOut");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dkqxubvyj/upload",
      {
        method: "POST",
        body: formData,
      }
    ); */

  const handleImages = async (event) => {
    console.log(1);
    const result = await readMultifilesUpCloudinary(event);
    console.log(4);
    if (result) setImages([...images, ...result]);
    console.log(5);
  };

  useEffect(() => {
    if (!Array.isArray(images)) {
      console.error("No imagenes adjuntas");
      return;
    }
  }, [images]);

  useEffect(() => {
    console.log({ images });
  });

  const deleteImages = (id) => (e) => {
    e.preventDefault();

    const arrayImages = images?.filter((img) => img.id !== id);
    setImages(arrayImages);
  };

  const handleTable = (event) => {
    console.log(event.target.value);
    setTables(event.target.value);
  };

  const handleCreate = (event) => {
    event.preventDefault();
    address.coordinate = coordinate;
    contact.socialMedia = socialMedia;
    console.log(user._id);
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
      idUser: user._id,
    };
    console.log(newRestaurant);
    dispatch(postRestaurant(newRestaurant));

    console.log(1, newRestaurant);
    if (msg?.restaurant) {
      sweetAlert("Creación Exitosa", msg.restaurant);
      navigate("/home");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>REGISTRATION RESTAURANT</h1>
        <form onSubmit={handleCreate}>
          {stage === 1 && (
            <div>
              <h2>Step 1</h2>
              <div className={styles.divValidations}>
                <div className={styles.labelValidations}>
                  <label>
                    Name:
                    <input
                      type="text"
                      name="name"
                      value={input.name}
                      onChange={handleInput}
                    />
                  </label>
                  {errorName.name && (
                    <span className={styles.danger}>{errorName.name}</span>
                  )}
                </div>
              </div>
              <h3>Contact</h3>
              <div className={styles.divValidations}>
                <div className={styles.labelValidations}>
                  <label>
                    Phone Number:
                    <input
                      type="number"
                      name="phoneNumber"
                      value={contact.phoneNumber}
                      onChange={handleContact}
                    />
                  </label>
                  {errorContact.phoneNumber && (
                    <span className={styles.danger}>
                      {errorContact.phoneNumber}
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.divValidations}>
                <div className={styles.labelValidations}>
                  <label>
                    Email:
                    <input
                      type="text"
                      name="email"
                      value={contact.email}
                      onChange={handleContact}
                    />
                  </label>
                  {errorContact.email && (
                    <span className={styles.danger}>{errorContact.email}</span>
                  )}
                </div>
              </div>
              <h3>Social Media</h3>
              <div className={styles.divValidations}>
                <div className={styles.labelValidations}>
                  <label>
                    Instagram:
                    <input
                      type="text"
                      name="instagram"
                      value={socialMedia.instagram}
                      onChange={handleInstagram}
                    />
                  </label>
                </div>
              </div>

              <div className={styles.divValidations}>
                <div className={styles.labelValidations}>
                  <label>
                    Facebook:
                    <input
                      type="text"
                      name="facebook"
                      value={socialMedia.facebook}
                      onChange={handleFacebook}
                    />
                  </label>
                </div>
              </div>

              <div className={styles.divValidations}>
                <div className={styles.labelValidations}>
                  <label>
                    Wpp:
                    <input
                      type="number"
                      name="wpp"
                      value={socialMedia.wpp}
                      onChange={handleWpp}
                    />
                  </label>
                  {errorSocialMedia.wpp && (
                    <span className={styles.danger}>
                      {errorSocialMedia.wpp}
                    </span>
                  )}
                </div>
              </div>

              <button className={styles.buttons} onClick={handleNext}>
                Next
              </button>
            </div>
          )}
          {stage === 2 && (
            <div>
              <h2>Step 2</h2>
              <h3>Address</h3>

              <div className={styles.divValidations}>
                <div className={styles.labelValidations}>
                  <label>
                    Street Name:
                    <input
                      type="text"
                      name="streetName"
                      value={address.streetName}
                      onChange={handleAddress}
                    />
                  </label>
                  {errorAddress.streetName && (
                    <span className={styles.danger}>
                      {errorAddress.streetName}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.divValidations}>
                <div className={styles.labelValidations}>
                  <label>
                    Street Number:
                    <input
                      type="number"
                      name="streetNumber"
                      value={address.streetNumber}
                      onChange={handleAddress}
                    />
                  </label>
                  {errorAddress.streetNumber && (
                    <span className={styles.danger}>
                      {errorAddress.streetNumber}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.divValidations}>
                <div className={styles.labelValidations}>
                  <label>
                    Neighborhood:
                    <input
                      type="text"
                      name="neighborhood"
                      value={address.neighborhood}
                      onChange={handleAddress}
                    />
                  </label>
                </div>
              </div>

              <div className={styles.divValidations}>
                <div className={styles.labelValidations}>
                  <label>
                    City:
                    <input
                      type="text"
                      name="city"
                      value={address.city}
                      onChange={handleAddress}
                    />
                  </label>
                  {errorAddress.city && (
                    <span className={styles.danger}>{errorAddress.city}</span>
                  )}
                </div>
              </div>

              <div className={styles.divValidations}>
                <div className={styles.labelValidations}>
                  <label>
                    State:
                    <input
                      type="text"
                      name="state"
                      value={address.state}
                      onChange={handleAddress}
                    />
                  </label>
                  {errorAddress.state && (
                    <span className={styles.danger}>{errorAddress.state}</span>
                  )}
                </div>
              </div>

              <div className={styles.divValidations}>
                <div className={styles.labelValidations}>
                  <label>
                    Country:
                    <input
                      type="text"
                      name="country"
                      value={address.country}
                      onChange={handleAddress}
                    />
                  </label>
                  {errorAddress.country && (
                    <span className={styles.danger}>
                      {errorAddress.country}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.containerImages}>
                <div className={styles.containerModifydiv}>
                  <div className={styles.containerModifydiv}>
                    <label className={styles.containerSub}>
                      <span> Seleccionar imagenes </span>
                      <input
                        hidden
                        type="file"
                        multiple
                        onChange={handleImages}
                      ></input>
                    </label>
                  </div>
                  <div className={styles.containerSchedule} style={{ gap: 10 }}>
                    {images.length &&
                      images?.map((img, index) => (
                        <div
                          key={`img${index}`}
                          className={styles.containerImagen}
                        >
                          <button
                            onClick={() => deleteImages(img.id)}
                            className={styles.containerButtonImagen}
                            style={{
                              backgroundColor: "red",
                              fontSize: 10,
                              padding: 4,
                            }}
                          >
                            X
                          </button>
                          <img
                            alt="imagen"
                            src={img.url}
                            className={styles.containerImg}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className={styles.divValidations}>
                <div className={styles.labelValidations}>
                  <label>
                    Longitude:
                    <input
                      type="number"
                      name="longitude"
                      value={coordinate.longitude}
                      onChange={handleLongitude}
                    />
                  </label>
                  {errorCoordinate.longitude && (
                    <span className={styles.danger}>
                      {errorCoordinate.longitude}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.divValidations}>
                <div className={styles.labelValidations}>
                  <label>
                    Latitude:
                    <input
                      type="number"
                      name="latitude"
                      value={coordinate.latitude}
                      onChange={handleLatitude}
                    />
                  </label>
                  {errorCoordinate.latitude && (
                    <span className={styles.danger}>
                      {errorCoordinate.latitude}
                    </span>
                  )}
                </div>
              </div>

              <button className={styles.buttons} onClick={handleBack}>
                Back
              </button>
              <button className={styles.buttons} onClick={handleNext}>
                Next
              </button>
            </div>
          )}
          {stage === 3 && (
            <div>
              <h2>Step 3</h2>

              <h3>Schedule</h3>
              <div className={styles.inputSchedule}>
                <label htmlFor="monday">
                  Monday :
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
              </div>

              <div className={styles.inputSchedule}>
                <label htmlFor="Tuesday">
                  {" "}
                  Tuesday
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

              <div className={styles.inputSchedule}>
                <label htmlFor="Wednesday">
                  {" "}
                  Wednesday
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

              <div className={styles.inputSchedule}>
                <label htmlFor="Thursday">
                  {" "}
                  Thursday
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

              <div className={styles.inputSchedule}>
                <label htmlFor="Friday">
                  {" "}
                  Friday
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

              <div className={styles.inputSchedule}>
                <label htmlFor="Saturday">
                  {" "}
                  Saturday
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

              <div className={styles.inputSchedule}>
                <label htmlFor="sunday">
                  {" "}
                  Sunday
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

              <div>
                <div className={styles.containersOptions}>
                  <h3>Select Diets options:</h3>
                  <div className={styles.div}>
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
                  </div>
                </div>

                <div className={styles.containersOptions}>
                  <h3>Select Menu options:</h3>
                  <div className={styles.div}>
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
                </div>

                <button className={styles.buttons} onClick={handleBack}>
                  Back
                </button>
                <button className={styles.buttons} onClick={handleNext}>
                  Next
                </button>
              </div>
            </div>
          )}
          {stage === 4 && (
            <div>
              <h2>Step 4</h2>
              <h3>Mesas</h3>
              <div className={styles.div}></div>
              <label>
                <input
                  type="number"
                  min="1"
                  name="tables"
                  value={tables}
                  onChange={handleTable}
                />
                <span>(min: 1)</span>
              </label>
              <div />

              <div className={styles.containersOptions}>
                <h2>Select your Payment Method:</h2>
                <div className={styles.div}>
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
                </div>
              </div>

              <div className={styles.containersOptions}>
                <h2>Select your Atmosphere:</h2>
                <div className={styles.div}>
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
                </div>
              </div>

              <div className={styles.containersOptions}>
                <h2 className={styles.div}>Select your Extras:</h2>
                <div>
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
                </div>
              </div>

              <div className={styles.containersOptions}>
                <h2>Select your Section:</h2>
                <div className={styles.div}>
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
                </div>
              </div>

              <div>
                <div />
                <div className={styles.terminos}>
                  <label htmlFor="terminos">
                    Acepto términos y condiciones
                  </label>
                  <input
                    type="checkbox"
                    value={terminos}
                    id="terminos"
                    name="terminos"
                    onChange={(e) => setTerminos(e.target.checked)}
                  />
                </div>
              </div>
              <button className={styles.buttons} onClick={handleBack}>
                Back
              </button>
              <button className={styles.buttons} type="submit">
                {" "}
                Restaurant Created
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
