import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  findDetailRestaurant,
  getAllRestaurants,
  modifyRestaurant,
} from "../../Redux/Actions";
import style from "./ModifyRestaurant.module.css";

const ModifyRestaurant = (props) => {
  const { id } = useParams();
  console.log();
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
  const [checkedDiets, setCheckedDiets] = useState({});
  const [selectedDiets, setSelectedDiets] = useState();
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState();
  const [selectedAtmosphere, setSelectedAtmosphere] = useState();
  const [selectedExtras, setSelectedExtras] = useState();
  const [selectedSection, setSelectedSection] = useState();

  const handlerChange = (e) => {
    const { name, value } = e.target;
    if (name === "images") {
      let arrImages = value.split(",");
      setSelectedImages(arrImages);
    }
    setInput({ ...input, [name]: value });
  };

  const handlerClick = (e) => {
    const { name, value } = e.target;

    /* if (name === "diets") {
      checkedDiets[name] = !selectedDiets?.find((d) => d === value);
    } */
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (input) {
      dispatch(modifyRestaurant(input));
      dispatch(getAllRestaurants);
      let newMessage = message;
      console.log({ newMessage });
      alert(newMessage);
      navigate("/home");
    }
  };

  useEffect(() => {
    dispatch(findDetailRestaurant(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (detailRestaurant) {
      setInput({
        id: detailRestaurant._id,
        name: detailRestaurant.name,
        latitude: detailRestaurant.address
          ? detailRestaurant.address[0].coordinate.latitude
          : "",
        longitude: detailRestaurant.address
          ? detailRestaurant.address[0].coordinate.longitude
          : "",
        streetName: detailRestaurant.address
          ? detailRestaurant.address[0].streetName
          : "",
        streetNumber: detailRestaurant.address
          ? detailRestaurant.address[0].streetNumber
          : 0,
        neighborhood: detailRestaurant.address
          ? detailRestaurant.address[0].neighborhood
          : "",
        city: detailRestaurant.address ? detailRestaurant.address[0].city : "",
        state: detailRestaurant.address
          ? detailRestaurant.address[0].state
          : "",
        country: detailRestaurant.address
          ? detailRestaurant.address[0].country
          : "",
        idDirection: detailRestaurant.address
          ? detailRestaurant.address[0]._id
          : "",
        images: detailRestaurant.images,
        instagram:
          detailRestaurant.contact &&
          detailRestaurant.contact[0]?.socialMedia?.instagram,
        facebook:
          detailRestaurant.contact &&
          detailRestaurant.contact[0]?.socialMedia?.facebook,
        wpp:
          detailRestaurant.contact &&
          detailRestaurant.contact[0]?.socialMedia?.wpp,
        phoneNumber:
          detailRestaurant.contact && detailRestaurant.contact[0]?.phoneNumber,
        email: detailRestaurant.contact && detailRestaurant.contact[0]?.email,
        tables: detailRestaurant.tables,
        mondayOpen:
          detailRestaurant.schedule &&
          detailRestaurant.schedule[0]?.monday?.open,
        mondayClose:
          detailRestaurant.schedule &&
          detailRestaurant.schedule[0]?.monday?.close,
        tuesdayOpen:
          detailRestaurant.schedule &&
          detailRestaurant.schedule[0]?.tuesday?.open,
        tuesdayClose:
          detailRestaurant.schedule &&
          detailRestaurant.schedule[0]?.tuesday?.close,
        wednesdayOpen:
          detailRestaurant.schedule &&
          detailRestaurant.schedule[0]?.wednesday?.open,
        wednesdayClose:
          detailRestaurant.schedule &&
          detailRestaurant.schedule[0]?.wednesday?.close,
        thursdayOpen:
          detailRestaurant.schedule &&
          detailRestaurant.schedule[0]?.thursday?.open,
        thursdayClose:
          detailRestaurant.schedule &&
          detailRestaurant.schedule[0]?.thursday?.close,
        fridayOpen:
          detailRestaurant.schedule &&
          detailRestaurant.schedule[0]?.friday?.open,
        fridayClose:
          detailRestaurant.schedule &&
          detailRestaurant.schedule[0]?.friday?.close,
        saturdayOpen:
          detailRestaurant.schedule &&
          detailRestaurant.schedule[0]?.saturday?.open,
        saturdayClose:
          detailRestaurant.schedule &&
          detailRestaurant.schedule[0]?.saturday?.close,
        sundayOpen:
          detailRestaurant.schedule &&
          detailRestaurant.schedule[0]?.sunday?.open,
        sundayClose:
          detailRestaurant.schedule &&
          detailRestaurant.schedule[0]?.sunday?.close,
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
      setSelectedDiets(input?.diets);
      setSelectedPaymentMethods(input?.paymentMethods);
      setSelectedAtmosphere(input?.atmosphere);
      setSelectedExtras(input?.extras);
      setSelectedSection(input?.section);
    }

    if (detailRestaurant && optionsDiets) {
      const result = optionsDiets.map((o) => {
        let checked = detailRestaurant.diets?.find((d) => d === o);
        return (checkedDiets[o] = checked);
      });
      setCheckedDiets(result);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailRestaurant, optionsDiets]);

  useEffect(() => {
    console.log(1, input, id);
  }, [id, input]);

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
                          type="time"
                          name="mondayOpen"
                          value={input.mondayOpen}
                          onChange={handlerChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="mondayClose"> Cierra </label>
                        <input
                          type="time"
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
                          type="time"
                          name="tuesdayOpen"
                          value={input.tuesdayOpen}
                          onChange={handlerChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="tuesdayClose"> Cierra </label>
                        <input
                          type="time"
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
                          type="time"
                          name="wednesdayOpen"
                          value={input.wednesdayOpen}
                          onChange={handlerChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="wednesdayClose"> Cierra </label>
                        <input
                          type="time"
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
                          type="time"
                          name="thursdayOpen"
                          value={input.thursdayOpen}
                          onChange={handlerChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="thursdayClose"> Cierra </label>
                        <input
                          type="time"
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
                          type="time"
                          name="fridayOpen"
                          value={input.fridayOpen}
                          onChange={handlerChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="fridayClose"> Cierra </label>
                        <input
                          type="time"
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
                          type="time"
                          name="saturdayOpen"
                          value={input.saturdayOpen}
                          onChange={handlerChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="saturdayClose"> Cierra </label>
                        <input
                          type="time"
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
                          type="time"
                          name="sundayOpen"
                          value={input.sundayOpen}
                          onChange={handlerChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="sundayClose"> Cierra </label>
                        <input
                          type="time"
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
                {optionsDiets &&
                  checkedDiets &&
                  optionsDiets?.map((diet) => {
                    return (
                      <div>
                        <input
                          type="checkbox"
                          id="diets"
                          name="diets"
                          value={diet}
                          checked={checkedDiets[diet]}
                          /* onClick={handlerClick} */
                        ></input>
                        <label htmlFor="diets"> {diet} </label>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className={style.containerCheckBox}>
              <div className={style.containerDataSection}>Metodos de Pago</div>
              <div className={style.containerDataSection}>
                {optionpaymentMethods &&
                  optionpaymentMethods?.map((paymentMethod) => {
                    return (
                      <div>
                        <input
                          type="checkbox"
                          id="paymentMethods"
                          name="paymentMethods"
                          value={paymentMethod}
                          checked={input.paymentMethods?.find(
                            (p) => p === paymentMethod
                          )}
                          onClick={handlerClick}
                        ></input>
                        <label htmlFor="paymentMethods">{paymentMethod}</label>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className={style.containerCheckBox}>
              <div className={style.containerDataSection}>Atmosfera</div>
              <div className={style.containerDataSection}>
                {optionsAtmosphere &&
                  optionsAtmosphere?.map((at) => {
                    return (
                      <div>
                        <input
                          type="checkbox"
                          id="atmosphere"
                          name="atmosphere"
                          value={at}
                          checked={input.atmosphere?.find((a) => a === at)}
                          onClick={handlerClick}
                        ></input>
                        <label htmlFor="atmosphere"> {at} </label>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className={style.containerCheckBox}>
              <div className={style.containerDataSection}>Extras</div>
              <div className={style.containerDataSection}>
                {optionsExtras &&
                  optionsExtras?.map((extra) => {
                    return (
                      <div>
                        <input
                          type="checkbox"
                          id="extras"
                          name="extras"
                          value={extra}
                          checked={input.extra?.find((e) => e === extra)}
                        ></input>
                        <label htmlFor="extras"> {extra} </label>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className={style.containerCheckBox}>
              <div className={style.containerDataSection}>Sección</div>
              <div className={style.containerDataSection}>
                {optionsSection &&
                  optionsSection?.map((sect) => {
                    return (
                      <div>
                        <input
                          type="checkbox"
                          id={sect}
                          name="section"
                          value={sect}
                          checked={input.section?.find((s) => s === sect)}
                          onClick={handlerClick}
                        ></input>
                        <label htmlFor={sect}> {sect} </label>
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
