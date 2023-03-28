import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { findDetailRestaurant, modifyRestaurant } from "../../Redux/Actions";
import style from "./ModifyRestaurant.module.css";

const ModifyRestaurant = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    detailRestaurant,
    message,
    optionsMenu,
    optionsAtmosphere,
    optionsDiets,
    optionpaymentMethods,
    optionsExtras,
    optionsSection,
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [input, setInput] = useState();
  const [selectedImages, setSelectedImages] = useState();
  const [selectedMenu, setSelectedMenu] = useState();
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState([]);
  const [selectedAtmosphere, setSelectedAtmosphere] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [selectedSection, setSelectedSection] = useState([]);

  const handlerChange = (e) => {
    const { name, value } = e.target;
    if (name === "images") {
      let arrImages = value.split(",");
      setSelectedImages(arrImages);
    }
    setInput({ ...input, [name]: value });
  };

  const handlerCheckBox = (value, array, setArray) => {
    const newSelect = array.map((d) => {
      if (d.name === value) return { ...d, checked: !d.checked };
      else {
        return d;
      }
    });
    setArray(newSelect);
  };

  useEffect(() => {
    console.log({ detailRestaurant });
  }, []);

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (input) {
      input.diets = selectedDiets.filter((d) => d.checked).map((d) => d.name);
      input.atmosphere = selectedAtmosphere
        .filter((a) => a.checked)
        .map((a) => a.name);
      input.extras = selectedExtras.filter((e) => e.checked).map((e) => e.name);
      input.section = selectedSection
        .filter((s) => s.checked)
        .map((s) => s.name);

      input.paymentMethods = selectedPaymentMethods
        .filter((p) => p.checked)
        .map((p) => p.name);
      console.log(input);
      dispatch(modifyRestaurant(input));
      let newMessage = message;
      if (newMessage) {
        alert(newMessage.error);
        navigate("/home");
      }
    }
  };

  useEffect(() => {
    console.log("id que llega", id);
    dispatch(findDetailRestaurant(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const initCheckbox = (options, name, setSelected) => {
    if (detailRestaurant && options) {
      const result = options.map((o) => ({
        name: o,
        checked: !!detailRestaurant[name]?.includes(o),
      }));
      setSelected(result);
    }
  };

  useEffect(() => {
    if (detailRestaurant) {
      console.log(detailRestaurant);
      setInput({
        id: detailRestaurant._id,
        name: detailRestaurant.name,
        latitude: detailRestaurant.address
          ? detailRestaurant.address.coordinate.latitude
          : "",
        longitude: detailRestaurant.address
          ? detailRestaurant.address.coordinate.longitude
          : "",
        streetName: detailRestaurant.address
          ? detailRestaurant.address.streetName
          : "",
        streetNumber: detailRestaurant.address
          ? detailRestaurant.address.streetNumber
          : 0,
        neighborhood: detailRestaurant.address
          ? detailRestaurant.address.neighborhood
          : "",
        city: detailRestaurant.address ? detailRestaurant.address.city : "",
        state: detailRestaurant.address ? detailRestaurant.address.state : "",
        country: detailRestaurant.address
          ? detailRestaurant.address.country
          : "",
        idDirection: detailRestaurant.address
          ? detailRestaurant.address._id
          : "",
        images: detailRestaurant.images,
        instagram:
          detailRestaurant.contact &&
          detailRestaurant.contact?.socialMedia?.instagram,
        facebook:
          detailRestaurant.contact &&
          detailRestaurant.contact?.socialMedia?.facebook,
        wpp:
          detailRestaurant.contact &&
          detailRestaurant.contact?.socialMedia?.wpp,
        phoneNumber:
          detailRestaurant.contact && detailRestaurant.contact?.phoneNumber,
        email: detailRestaurant.contact && detailRestaurant.contact?.email,
        tables: detailRestaurant.tables,
        mondayOpen:
          detailRestaurant.schedule && detailRestaurant.schedule.monday?.open,
        mondayClose:
          detailRestaurant.schedule && detailRestaurant.schedule.monday?.close,
        tuesdayOpen:
          detailRestaurant.schedule && detailRestaurant.schedule.tuesday?.open,
        tuesdayClose:
          detailRestaurant.schedule && detailRestaurant.schedule.tuesday?.close,
        wednesdayOpen:
          detailRestaurant.schedule &&
          detailRestaurant.schedule.wednesday?.open,
        wednesdayClose:
          detailRestaurant.schedule &&
          detailRestaurant.schedule.wednesday?.close,
        thursdayOpen:
          detailRestaurant.schedule && detailRestaurant.schedule.thursday?.open,
        thursdayClose:
          detailRestaurant.schedule &&
          detailRestaurant.schedule.thursday?.close,
        fridayOpen:
          detailRestaurant.schedule && detailRestaurant.schedule.friday?.open,
        fridayClose:
          detailRestaurant.schedule && detailRestaurant.schedule.friday?.close,
        saturdayOpen:
          detailRestaurant.schedule && detailRestaurant.schedule.saturday?.open,
        saturdayClose:
          detailRestaurant.schedule &&
          detailRestaurant.schedule.saturday?.close,
        sundayOpen:
          detailRestaurant.schedule && detailRestaurant.schedule.sunday?.open,
        sundayClose:
          detailRestaurant.schedule && detailRestaurant.schedule.sunday?.close,
        menu: detailRestaurant.menu,
        diets: detailRestaurant.diets,
        paymentMethods: detailRestaurant.paymentMethods,
        atmosphere: detailRestaurant.atmosphere,
        extras: detailRestaurant.extras,
        section: detailRestaurant.section,
        ranking: detailRestaurant.ranking,
        active: detailRestaurant.active,
      });
      setSelectedImages(input?.images);
      setSelectedMenu(input?.menu);
    }
    initCheckbox(optionsDiets, "diets", setSelectedDiets);
    initCheckbox(optionsAtmosphere, "atmosphere", setSelectedAtmosphere);
    initCheckbox(
      optionpaymentMethods,
      "paymentMethods",
      setSelectedPaymentMethods
    );
    initCheckbox(optionsExtras, "section", setSelectedSection);
    initCheckbox(optionsSection, "extras", setSelectedExtras);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailRestaurant]);

  return (
    <div className={style.containerModify}>
      {input && (
        <div className={style.containerModifydiv}>
          <div className={style.containerButton}>
            <h1>Modificar Restaurante</h1>
            <NavLink to="/home">
              <button>Cerrar</button>
            </NavLink>
          </div>

          <form onSubmit={handlerSubmit}>
            <div className={style.container}>
              <label htmlFor="name">Restaurante</label>
              <input
                type="text"
                id="name"
                name="name"
                value={input.name}
                onChange={handlerChange}
              />
            </div>

            <div className={style.container}>
              <div>Direccion</div>

              <div className={style.containerSection}>
                <div className={style.containerDataSection}>
                  <div>
                    <label htmlFor="streetName">Calle</label>
                    <input
                      type="text"
                      id="streetName"
                      name="streetName"
                      value={input.streetName}
                      onChange={handlerChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="streetNumber">#</label>
                    <input
                      type="number"
                      id="streetNumber"
                      name="streetNumber"
                      value={input.streetNumber}
                      onChange={handlerChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="city">Ciudad</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={input.city}
                      onChange={handlerChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="country">Pais</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={input.country}
                      onChange={handlerChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="longitude">Coordenadas -longitud</label>
                    <input
                      type="text"
                      id="longitude"
                      name="longitude"
                      value={input.longitude}
                      onChange={handlerChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="latitude">Coordenadas - latitud</label>
                    <input
                      type="text"
                      id="latitude"
                      name="latitude"
                      value={input.latitude}
                      onChange={handlerChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={style.container}>
              <div className={style.containerSection}>
                <div>Contacto</div>
                <div className={style.containerDataSection}>
                  <div className={style.containerDataSection}>
                    <label htmlFor="instagram"> Instagram </label>
                    <input
                      type="text"
                      name="instagram"
                      value={input.instagram}
                      onChange={handlerChange}
                    />
                  </div>
                  <div className={style.containerDataSection}>
                    <label htmlFor="facebook"> facebook </label>
                    <input
                      type="text"
                      name="facebook"
                      value={input.facebook}
                      onChange={handlerChange}
                    />
                  </div>
                  <div className={style.containerDataSection}>
                    <label htmlFor="wpp"> wpp </label>
                    <input
                      type="number"
                      name="wpp"
                      value={input.wpp}
                      onChange={handlerChange}
                    />
                  </div>

                  <div className={style.containerDataSection}>
                    <label htmlFor="phoneNumber"> Telefono </label>
                    <input
                      type="number"
                      name="phoneNumber"
                      value={input.phoneNumber}
                      onChange={handlerChange}
                    />
                  </div>

                  <div className={style.containerDataSection}>
                    <label htmlFor="email"> Email </label>
                    <input
                      type="text"
                      name="email"
                      value={input.email}
                      onChange={handlerChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={style.container}>
              <div>
                <label htmlFor="images">Imagenes (url):</label>
                <input
                  type="url"
                  name="images"
                  id="images"
                  value={input?.images?.map((image) => `${image},`)}
                  onChange={handlerChange}
                />
              </div>
              {/* {errors.images && <p>*{errors.images}</p>} */}
            </div>

            <div className={style.container}>
              <label htmlFor="tables"># Mesas</label>
              <input
                type="number"
                id="tables"
                name="tables"
                value={input.tables}
                onChange={handlerChange}
              />
            </div>

            <div className={style.container}>
              <label htmlFor="menu">Menú</label>
              <select name="menu" onChange={handlerChange}>
                <option defaultValue={input.menu}>{input.menu}</option>
                {optionsMenu &&
                  optionsMenu.map((opc) => {
                    return <option value={opc}>{opc}</option>;
                  })}
              </select>
            </div>

            <div className={style.container}>
              <div className={style.containerSection}>
                <div>Horarios</div>

                <div>
                  <div>
                    <div>Lunes</div>
                    <div>
                      <div>
                        <label htmlFor="mondayOpen"> Abre </label>
                        <input
                          type="text"
                          name="mondayOpen"
                          value={input.mondayOpen}
                          onChange={handlerChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="mondayClose"> Cierra </label>
                        <input
                          type="text"
                          name="mondayClose"
                          value={input.mondayClose}
                          onChange={handlerChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div>Martes</div>
                    <div>
                      <div>
                        <label htmlFor="tuesdayOpen"> Abre </label>
                        <input
                          type="text"
                          name="tuesdayOpen"
                          value={input.tuesdayOpen}
                          onChange={handlerChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="tuesdayClose"> Cierra </label>
                        <input
                          type="text"
                          name="tuesdayClose"
                          value={input.tuesdayClose}
                          onChange={handlerChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div>Miercoles</div>
                    <div>
                      <div>
                        <label htmlFor="wednesdayOpen"> Abre </label>
                        <input
                          type="text"
                          name="wednesdayOpen"
                          value={input.wednesdayOpen}
                          onChange={handlerChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="wednesdayClose"> Cierra </label>
                        <input
                          type="text"
                          name="wednesdayClose"
                          value={input.wednesdayClose}
                          onChange={handlerChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div>Jueves</div>
                    <div>
                      <div>
                        <label htmlFor="thursdayOpen"> Abre </label>
                        <input
                          type="text"
                          name="thursdayOpen"
                          value={input.thursdayOpen}
                          onChange={handlerChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="thursdayClose"> Cierra </label>
                        <input
                          type="text"
                          name="thursdayClose"
                          value={input.thursdayClose}
                          onChange={handlerChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div>Viernes</div>
                    <div>
                      <div>
                        <label htmlFor="fridayOpen"> Abre </label>
                        <input
                          type="text"
                          name="fridayOpen"
                          value={input.fridayOpen}
                          onChange={handlerChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="fridayClose"> Cierra </label>
                        <input
                          type="text"
                          name="fridayClose"
                          value={input.fridayClose}
                          onChange={handlerChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div>Sabado</div>
                    <div>
                      <div>
                        <label htmlFor="saturdayOpen"> Abre </label>
                        <input
                          type="text"
                          name="saturdayOpen"
                          value={input.saturdayOpen}
                          onChange={handlerChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="saturdayClose"> Cierra </label>
                        <input
                          type="text"
                          name="saturdayClose"
                          value={input.saturdayClose}
                          onChange={handlerChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div>Domingo</div>
                    <div>
                      <div>
                        <label htmlFor="sundayOpen"> Abre </label>
                        <input
                          type="text"
                          name="sundayOpen"
                          value={input.sundayOpen}
                          onChange={handlerChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="sundayClose"> Cierra </label>
                        <input
                          type="text"
                          name="sundayClose"
                          value={input.sundayClose}
                          onChange={handlerChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={style.containerCheckBox}>
              <div className={style.containerDataSection}>Dietas</div>
              <div className={style.containerDataSection}>
                {selectedDiets?.map((diet) => {
                  return (
                    <div>
                      <input
                        type="checkbox"
                        id="diets"
                        name="diets"
                        value={diet.name}
                        checked={diet.checked}
                        onChange={(e) =>
                          handlerCheckBox(
                            e.target.value,
                            selectedDiets,
                            setSelectedDiets
                          )
                        }
                      ></input>
                      <label htmlFor="diets"> {diet.name} </label>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={style.containerCheckBox}>
              <div className={style.containerDataSection}>Metodos de Pago</div>
              <div className={style.containerDataSection}>
                {selectedPaymentMethods?.map((paymentMethod) => {
                  return (
                    <div>
                      <input
                        type="checkbox"
                        id="paymentMethods"
                        name="paymentMethods"
                        value={paymentMethod.name}
                        checked={paymentMethod.checked}
                        onChange={(e) =>
                          handlerCheckBox(
                            e.target.value,
                            selectedPaymentMethods,
                            setSelectedPaymentMethods
                          )
                        }
                      ></input>
                      <label htmlFor="paymentMethods">
                        {paymentMethod.name}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={style.containerCheckBox}>
              <div className={style.containerDataSection}>Atmosfera</div>
              <div className={style.containerDataSection}>
                {selectedAtmosphere?.map((at) => {
                  return (
                    <div>
                      <input
                        type="checkbox"
                        id="atmosphere"
                        name="atmosphere"
                        value={at.name}
                        checked={at.checked}
                        onChange={(e) =>
                          handlerCheckBox(
                            e.target.value,
                            selectedAtmosphere,
                            setSelectedAtmosphere
                          )
                        }
                      ></input>
                      <label htmlFor="atmosphere"> {at.name} </label>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={style.containerCheckBox}>
              <div className={style.containerDataSection}>Extras</div>
              <div className={style.containerDataSection}>
                {selectedExtras?.map((extra) => {
                  return (
                    <div>
                      <input
                        type="checkbox"
                        id="extras"
                        name="extras"
                        value={extra.name}
                        checked={extra.checked}
                        onChange={(e) =>
                          handlerCheckBox(
                            e.target.value,
                            selectedExtras,
                            setSelectedExtras
                          )
                        }
                      ></input>
                      <label htmlFor="extras"> {extra.name} </label>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={style.containerCheckBox}>
              <div className={style.containerDataSection}>Sección</div>
              <div className={style.containerDataSection}>
                {selectedSection?.map((sect) => {
                  return (
                    <div>
                      <input
                        type="checkbox"
                        id="section"
                        name="section"
                        value={sect.name}
                        checked={sect.checked}
                        onChange={(e) =>
                          handlerCheckBox(
                            e.target.value,
                            selectedSection,
                            setSelectedSection
                          )
                        }
                      ></input>
                      <label htmlFor="section"> {sect.name} </label>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={style.container}>
              <label htmlFor="ranking"> Puntaje </label>
              <input
                type="text"
                id="ranking"
                name="ranking"
                value={input.ranking}
                onChange={handlerChange}
              />
            </div>

            <button>Guardar</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ModifyRestaurant;
