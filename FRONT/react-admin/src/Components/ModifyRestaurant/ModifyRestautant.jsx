import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { findDetailRestaurant, modifyRestaurant } from "../../Redux/Actions";
import Validation from "../Validations/Validations";
import style from "./ModifyRestaurant.module.css";
import sweetAlert from "sweetalert";

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
  const [errors, setErrors] = useState({
    name: "",
    latitude: "",
    longitude: "",
    streetName: "",
    streetNumber: 0,
    neighborhood: "",
    city: "",
    state: "",
    country: "",
    images: "",
    email: "",
    phoneNumber: "",
    tables: "",
    mondayOpen: "",
    mondayClose: "",
    tuesdayOpen: "",
    tuesdayClose: "",
    wednesdayOpen: "",
    wednesdayClose: "",
    thursdayOpen: "",
    thursdayClose: "",
    fridayOpen: "",
    fridayClose: "",
    saturdayOpen: "",
    saturdayClose: "",
    sundayOpen: "",
    sundayClose: "",
  });

  const handlerChange = (e) => {
    const { name, value } = e.target;
    if (name === "images") {
      let arrImages = value.split(",");
      setSelectedImages(arrImages);
    }
    setInput({ ...input, [name]: value });
    setErrors(Validation({ ...input, [name]: value }));
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
      dispatch(modifyRestaurant(input));
      let newMessage = message;
      console.log(newMessage);
      if (newMessage) {
        sweetAlert(newMessage.data);
        navigate("/home");
      }
    }
  };

  useEffect(() => {
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
    <div className={style.containerFormModify}>
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
                  style={{ display: "flex", flexGrow: 100 }}
                />
                {errors.name && (
                  <span className={style.danger}>{errors.name}</span>
                )}
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
                      {errors.streetName && (
                        <span className={style.danger}>
                          {errors.streetName}
                        </span>
                      )}
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
                      {errors.streetNumber && (
                        <span className={style.danger}>
                          {errors.streetNumber}
                        </span>
                      )}
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
                      {errors.city && (
                        <span className={style.danger}>{errors.city}</span>
                      )}
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
                      {errors.country && (
                        <span className={style.danger}>{errors.country}</span>
                      )}
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
                      {errors.longitude && (
                        <span className={style.danger}>{errors.longitude}</span>
                      )}
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
                      {errors.latitude && (
                        <span className={style.danger}>{errors.latitude}</span>
                      )}
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
                      {errors.phoneNumber && (
                        <span className={style.danger}>
                          {errors.phoneNumber}
                        </span>
                      )}
                    </div>

                    <div className={style.containerDataSection}>
                      <label htmlFor="email"> Email </label>
                      <input
                        type="text"
                        name="email"
                        value={input.email}
                        onChange={handlerChange}
                      />
                      {errors.email && (
                        <span className={style.danger}>{errors.email}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className={style.container}>
                <label htmlFor="images">Imagenes (url):</label>
                <input
                  type="url"
                  name="images"
                  id="images"
                  value={input?.images?.map((image) => `${image},`)}
                  onChange={handlerChange}
                  style={{ display: "flex", flexGrow: 100 }}
                />

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
                {errors.tables && (
                  <span className={style.danger}>{errors.tables}</span>
                )}
              </div>

              <div className={style.container}>
                <label htmlFor="menu">Menú</label>
                <select name="menu" onChange={handlerChange}>
                  <option defaultValue={input.menu}>{input.menu}</option>
                  {optionsMenu &&
                    optionsMenu.map((opc, index) => {
                      return (
                        <option value={opc} key={`${opc}${index}`}>
                          {opc}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className={style.container}>
                <div className={style.containerSection}>
                  <div>Horarios</div>
                  <span style={{ fontSize: 10 }}>
                    (los días que no atiende al público diligenciar 00:00)
                  </span>

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
                          {errors.mondayOpen && (
                            <span className={style.danger}>
                              {errors.mondayOpen}
                            </span>
                          )}
                        </div>
                        <div>
                          <label htmlFor="mondayClose"> Cierra </label>
                          <input
                            type="text"
                            name="mondayClose"
                            value={input.mondayClose}
                            onChange={handlerChange}
                          />
                          {errors.mondayClose && (
                            <span className={style.danger}>
                              {errors.mondayClose}
                            </span>
                          )}
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
                          {errors.tuesdayOpen && (
                            <span className={style.danger}>
                              {errors.tuesdayOpen}
                            </span>
                          )}
                        </div>
                        <div>
                          <label htmlFor="tuesdayClose"> Cierra </label>
                          <input
                            type="text"
                            name="tuesdayClose"
                            value={input.tuesdayClose}
                            onChange={handlerChange}
                          />
                          {errors.tuesdayClose && (
                            <span className={style.danger}>
                              {errors.tuesdayClose}
                            </span>
                          )}
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
                          {errors.wednesdayOpen && (
                            <span className={style.danger}>
                              {errors.wednesdayOpen}
                            </span>
                          )}
                        </div>
                        <div>
                          <label htmlFor="wednesdayClose"> Cierra </label>
                          <input
                            type="text"
                            name="wednesdayClose"
                            value={input.wednesdayClose}
                            onChange={handlerChange}
                          />
                          {errors.wednesdayClose && (
                            <span className={style.danger}>
                              {errors.wednesdayClose}
                            </span>
                          )}
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
                          {errors.thursdayOpen && (
                            <span className={style.danger}>
                              {errors.thursdayOpen}
                            </span>
                          )}
                        </div>
                        <div>
                          <label htmlFor="thursdayClose"> Cierra </label>
                          <input
                            type="text"
                            name="thursdayClose"
                            value={input.thursdayClose}
                            onChange={handlerChange}
                          />
                          {errors.thursdayClose && (
                            <span className={style.danger}>
                              {errors.thursdayClose}
                            </span>
                          )}
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
                          {errors.fridayOpen && (
                            <span className={style.danger}>
                              {errors.fridayOpen}
                            </span>
                          )}
                        </div>
                        <div>
                          <label htmlFor="fridayClose"> Cierra </label>
                          <input
                            type="text"
                            name="fridayClose"
                            value={input.fridayClose}
                            onChange={handlerChange}
                          />
                          {errors.fridayClose && (
                            <span className={style.danger}>
                              {errors.fridayClose}
                            </span>
                          )}
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
                          {errors.saturdayOpen && (
                            <span className={style.danger}>
                              {errors.saturdayOpen}
                            </span>
                          )}
                        </div>
                        <div>
                          <label htmlFor="saturdayClose"> Cierra </label>
                          <input
                            type="text"
                            name="saturdayClose"
                            value={input.saturdayClose}
                            onChange={handlerChange}
                          />
                          {errors.saturdayClose && (
                            <span className={style.danger}>
                              {errors.saturdayClose}
                            </span>
                          )}
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
                          {errors.sundayOpen && (
                            <span className={style.danger}>
                              {errors.sundayOpen}
                            </span>
                          )}
                        </div>
                        <div>
                          <label htmlFor="sundayClose"> Cierra </label>
                          <input
                            type="text"
                            name="sundayClose"
                            value={input.sundayClose}
                            onChange={handlerChange}
                          />
                          {errors.sundayClose && (
                            <span className={style.danger}>
                              {errors.sundayClose}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={style.containerCheckBox}>
                <div className={style.containerDataSection}>Dietas</div>
                <div className={style.containerDataSection}>
                  {selectedDiets?.map((diet, index) => {
                    return (
                      <div>
                        <input
                          type="checkbox"
                          id="diets"
                          name="diets"
                          value={diet.name}
                          key={`${diet}${index}`}
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
                <div className={style.containerDataSection}>
                  Metodos de Pago
                </div>
                <div className={style.containerDataSection}>
                  {selectedPaymentMethods?.map((paymentMethod, index) => {
                    return (
                      <div>
                        <input
                          key={`${paymentMethod}${index}`}
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
                  {selectedAtmosphere?.map((at, index) => {
                    return (
                      <div>
                        <input
                          key={`${at}${index}`}
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
                  {selectedExtras?.map((extra, index) => {
                    return (
                      <div>
                        <input
                          key={`${extra}${index}`}
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
                  {selectedSection?.map((sect, index) => {
                    return (
                      <div>
                        <input
                          key={`${sect}${index}`}
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
                  style={{ backgroundColor: "#c6c5c5" }}
                />
              </div>

              <button
                type="submit"
                disabled={
                  errors.name ||
                  errors.streetName ||
                  errors.streetNumber ||
                  errors.city ||
                  errors.country ||
                  errors.longitude ||
                  errors.latitude ||
                  errors.email ||
                  errors.tables ||
                  errors.mondayOpen ||
                  errors.mondayClose ||
                  errors.tuesdayOpen ||
                  errors.tuesdayClose ||
                  errors.wednesdayOpen ||
                  errors.wednesdayClose ||
                  errors.thursdayOpen ||
                  errors.thursdayClose ||
                  errors.fridayOpen ||
                  errors.fridayClose ||
                  errors.saturdayOpen ||
                  errors.saturdayClose ||
                  errors.sundayOpen ||
                  errors.sundayClose
                }
              >
                Guardar
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModifyRestaurant;
