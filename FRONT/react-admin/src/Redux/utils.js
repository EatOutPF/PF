import { useReducer, useEffect } from "react";

const updateMapper = (dataToUpdate) => {
  let mappedData = {
    name: dataToUpdate.name,
    address: {
      coordinate: {
        latitude: dataToUpdate.latitude,
        longitude: dataToUpdate.longitude,
      },
      streetName: dataToUpdate.streetName,
      streetNumber: dataToUpdate.streetNumber,
      neighborhood: dataToUpdate.neighborhood,
      city: dataToUpdate.city,
      state: dataToUpdate.state,
      country: dataToUpdate.country,
    },

    images: dataToUpdate?.images,
    contact: {
      socialMedia: {
        instagram: dataToUpdate.instagram,
        facebook: dataToUpdate.facebook,
        wpp: dataToUpdate.wpp + "",
      },
      phoneNumber: dataToUpdate.phoneNumber,
      email: dataToUpdate.email,
    },

    tables: dataToUpdate.tables + "",
    schedule: {
      monday: {
        open: dataToUpdate?.mondayOpen,
        close: dataToUpdate?.mondayClose,
      },

      tuesday: {
        open: dataToUpdate?.tuesdayOpen,
        close: dataToUpdate?.tuesdayClose,
      },

      wednesday: {
        open: dataToUpdate?.wednesdayOpen,
        close: dataToUpdate?.wednesdayClose,
      },

      thursday: {
        open: dataToUpdate?.thursdayOpen,
        close: dataToUpdate?.thursdayClose,
      },

      friday: {
        open: dataToUpdate?.fridayOpen,
        close: dataToUpdate?.fridayClose,
      },

      saturday: {
        open: dataToUpdate?.saturdayOpen,
        close: dataToUpdate?.saturdayClose,
      },

      sunday: {
        open: dataToUpdate?.sundayOpen,
        close: dataToUpdate?.sundayClose,
      },
    },
    menu: dataToUpdate?.menu,
    diets: dataToUpdate?.diets,
    paymentMethods: dataToUpdate?.paymentMethods,
    atmosphere: dataToUpdate?.atmosphere,
    extras: dataToUpdate?.extras,
    section: dataToUpdate?.section,
    idUser: dataToUpdate?.idUser,
  };

  return mappedData;
};

const saveLocalStorage = (nameLocalStorage, data) => {
  window.localStorage.setItem(nameLocalStorage, JSON.stringify(data));
};

const getLocalStorage = (nameLocalStorage) => {
  return JSON.parse(window.localStorage.getItem(nameLocalStorage));
};

function useLocallyPersistedReducer(
  reducer,
  defaultState,
  storageKey,
  init = null
) {
  const hookVars = useReducer(reducer, defaultState, (defaultState) => {
    const persisted = JSON.parse(localStorage.getItem(storageKey));
    return persisted !== null
      ? persisted
      : init !== null
      ? init(defaultState)
      : defaultState;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(hookVars[0]));
  }, [storageKey, hookVars[0]]);

  return hookVars;
}

const cloudinaryImageUploadMethod = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "EatOut");

  return fetch("https://api.cloudinary.com/v1_1/dkqxubvyj/upload", {
    method: "POST",
    body: formData,
  })
    .then((result) => result.json())
    .then((res) => {
      console.log({ file });
      return {
        id: res.asset_id,
        url: res.secure_url,
      };
    });
};

const readMultifilesUpCloudinary = async (event) => {
  const files = event.target.files;
  const arrayImages = [];
  const filesIds = Object.keys(files);
  console.log(2);

  for (let i = 0; i < filesIds.length; i++) {
    const file = files[i];
    const dataImg = await cloudinaryImageUploadMethod(file);
    arrayImages.push(dataImg);
  }
  console.log(3);
  return arrayImages;
};

export {
  updateMapper,
  saveLocalStorage,
  getLocalStorage,
  useLocallyPersistedReducer,
  readMultifilesUpCloudinary,
};
