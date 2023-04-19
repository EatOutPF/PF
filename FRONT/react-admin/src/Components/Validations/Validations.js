export default function Validation(data) {
  const errors = {};
  /*   const regexSpecialCharacters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/; */
  const regexCoordinate = /^([-?\d\d\d+][0-9]{0,3}[.]{1}[0-9]{6,10})$/g;
  const regexCoordinateLatitude = /^([-?\d\d\d+][0-9]{0,2}[.]{1}[0-9]{6,10})$/g;
  const regexNumber = /^[0-9]+$/;
  const regexPhoneNumber =
    /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/g;
  const regexWpp =
    /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/g;
  const regexLetras = /^[a-zA-Z ]*$/;
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const regexHoraMonday = /^(0[0-9]|1\d|2[0-3]):([0-5]\d)$/g;
  const regexHourCloseMonday = /^(0[0-9]|1\d|2[0-3]):([0-5]\d)$/g;
  const regexTuesdayOpen = /^(0[0-9]|1\d|2[0-3]):([0-5]\d)$/g;
  const regexTuesdayClose = /^(0[0-9]|1\d|2[0-3]):([0-5]\d)$/g;
  const regexWednesdayOpen = /^(0[0-9]|1\d|2[0-3]):([0-5]\d)$/g;
  const regexWednesdayClose = /^(0[0-9]|1\d|2[0-3]):([0-5]\d)$/g;
  const regexThursdayOpen = /^(0[0-9]|1\d|2[0-3]):([0-5]\d)$/g;
  const regexThursdayClose = /^(0[0-9]|1\d|2[0-3]):([0-5]\d)$/g;
  const regexFridayOpen = /^(0[0-9]|1\d|2[0-3]):([0-5]\d)$/g;
  const regexFridayClose = /^(0[0-9]|1\d|2[0-3]):([0-5]\d)$/g;
  const regexSaturdayOpen = /^(0[0-9]|1\d|2[0-3]):([0-5]\d)$/g;
  const regexSaturdayClose = /^(0[0-9]|1\d|2[0-3]):([0-5]\d)$/g;
  const regexSundayOpen = /^(0[0-9]|1\d|2[0-3]):([0-5]\d)$/g;
  const regexSundayClose = /^(0[0-9]|1\d|2[0-3]):([0-5]\d)$/g;
  const regexPhone =
    /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/g;
  /*  const regexPassword = /^(?=.*\d)(?=.*[a-zA-Z]).{6,10}$/; */

  !data?.name && (errors.name = "Diligencie el nombre del Restaurante");

  !data?.streetName && (errors.streetName = "Diligencie el nombre de la calle");
  data?.streetName &&
    /*  data?.streetName?.length < 4 &&
    (errors.streetName = "El nombre debe contener mas de 5 caracteres"); */

    !data?.streetNumber &&
    (errors.streetNumber = "Diligencie el numero de la calle");
  if (data?.streetNumber) {
    !regexNumber.test(data?.streetNumber) &&
      (errors.streetNumber = "Debe ser un numero");
  }

  !data?.city && (errors.city = "Diligencie la ciudad");
  if (data?.city) {
    !regexLetras.test(data?.city) &&
      (errors.city = " no debe contener numeros");
  }

  !data?.country && (errors.country = "Diligencie el pais");
  if (data?.country) {
    !regexLetras.test(data?.country) &&
      (errors.country = " no debe contener numeros");
  }

  !data?.longitude && (errors.longitude = "Diligencia la coordenada-longitud");

  if (data?.longitude) {
    if (data?.longitude >= 180 || data?.longitude <= -180)
      errors.longitude = "la longitud debe estar entre 180 y -180";

    if (!regexCoordinate.test(data?.longitude))
      errors.longitude = "la longitud debe tener 6 decimales";
  }

  !data?.latitude && (errors.latitude = "Diligencia la coordenada-latitud");

  if (data?.latitude) {
    if (data?.latitude >= 90 || data?.latitude <= -90)
      errors.latitude = "la latitud debe estar entre 90 y -90";

    if (!regexCoordinateLatitude.test(data?.latitude))
      errors.latitude = "la latitud debe tener 6 decimales";
  }

  !data?.phoneNumber &&
    (errors.phoneNumber = "Diligencie un numero de teléfono");
  if (+data?.phoneNumber <= 1000000000)
    errors.phoneNumber = "Teléfono debe contener minimo 10 numeros";
  if (data?.phoneNumber) {
    console.log(data.phoneNumber);
    !regexPhoneNumber.test(+data?.phoneNumber) &&
      (errors.phoneNumber = "Diligencie un numero de teléfono válido");
  }

  !data?.wpp && (errors.wpp = "Diligencie un numero de whatsapp");
  if (+data?.wpp <= 1000000000)
    errors.wpp = "Whatsapp debe contener minimo 10 numeros";
  if (data?.wpp) {
    !regexWpp.test(+data?.wpp) && (errors.wpp = "Debe ser un numero");
  }

  !data?.email && (errors.email = "Diligenciar un email");
  if (!regexEmail.test(data?.email)) errors.email = "ingresar un email válido";

  !data?.tables && (errors.tables = "Diligenciar numero de mesas");
  if (isNaN(data?.tables)) {
    errors.tables = "debe ser un numero";
  }

  !data?.mondayOpen && (errors.mondayOpen = "Diligenciar la hora de apertura");
  !regexHoraMonday.test(data?.mondayOpen) &&
    (errors.mondayOpen = "Diligenciar en formato 00:00");

  !data?.mondayClose &&
    (errors.mondayClose = "Diligenciar la hora de apertura");
  !regexHourCloseMonday.test(data?.mondayClose) &&
    (errors.mondayClose = "Diligenciar en formato 00:00");

  !data?.tuesdayOpen &&
    (errors.tuesdayOpen = "Diligenciar la hora de apertura");
  !regexTuesdayOpen.test(data?.tuesdayOpen) &&
    (errors.tuesdayOpen = "Diligenciar en formato 00:00");

  !data?.tuesdayClose &&
    (errors.tuesdayClose = "Diligenciar la hora de apertura");
  !regexTuesdayClose.test(data?.tuesdayClose) &&
    (errors.tuesdayClose = "Diligenciar en formato 00:00");

  !data?.wednesdayOpen &&
    (errors.wednesdayOpen = "Diligenciar la hora de apertura");
  !regexWednesdayOpen.test(data?.wednesdayOpen) &&
    (errors.wednesdayOpen = "Diligenciar en formato 00:00");

  !data?.wednesdayClose &&
    (errors.wednesdayClose = "Diligenciar la hora de apertura");
  !regexWednesdayClose.test(data?.wednesdayClose) &&
    (errors.wednesdayClose = "Diligenciar en formato 00:00");

  !data?.thursdayOpen &&
    (errors.thursdayOpen = "Diligenciar la hora de apertura");
  !regexThursdayOpen.test(data?.thursdayOpen) &&
    (errors.thursdayOpen = "Diligenciar en formato 00:00");

  !data?.thursdayClose &&
    (errors.thursdayClose = "Diligenciar la hora de apertura");
  !regexThursdayClose.test(data?.thursdayClose) &&
    (errors.thursdayClose = "Diligenciar en formato 00:00");

  !data?.fridayOpen && (errors.fridayOpen = "Diligenciar la hora de apertura");
  !regexFridayOpen.test(data?.fridayOpen) &&
    (errors.fridayOpen = "Diligenciar en formato 00:00");

  !data?.fridayClose &&
    (errors.fridayClose = "Diligenciar la hora de apertura");
  !regexFridayClose.test(data?.fridayClose) &&
    (errors.fridayClose = "Diligenciar en formato 00:00");

  !data?.saturdayOpen &&
    (errors.saturdayOpen = "Diligenciar la hora de apertura");
  !regexSaturdayOpen.test(data?.saturdayOpen) &&
    (errors.saturdayOpen = "Diligenciar en formato 00:00");

  !data?.saturdayClose &&
    (errors.saturdayClose = "Diligenciar la hora de apertura");
  !regexSaturdayClose.test(data?.saturdayClose) &&
    (errors.saturdayClose = "Diligenciar en formato 00:00");

  !data?.sundayOpen && (errors.sundayOpen = "Diligenciar la hora de apertura");
  !regexSundayOpen.test(data?.sundayOpen) &&
    (errors.sundayOpen = "Diligenciar en formato 00:00");

  !data?.sundayClose &&
    (errors.sundayClose = "Diligenciar la hora de apertura");
  !regexSundayClose.test(data?.sundayClose) &&
    (errors.sundayClose = "Diligenciar en formato 00:00");

  !data?.phone && (errors.phone = "Diligencie un numero de teléfono");
  if (+data?.phone <= 1000000000)
    errors.phone = "Teléfono debe contener minimo 10 numeros";
  if (data?.phone) {
    console.log(data.phone);
    !regexPhone.test(+data?.phone) &&
      (errors.phone = "Diligencie un numero de teléfono válido");
  }

  if (
    /* !regexPassword.test(data.password) || */
    data?.password?.length > 10 ||
    data?.password?.length < 6
  ) {
    errors.password = "Password debe tener entre 6 a 10 caracteres";
  }

  return errors;
}
