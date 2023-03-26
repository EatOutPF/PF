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
    schedule: [
      {
        monday: {
          open: dataToUpdate?.open,
          close: dataToUpdate?.close,
        },
      },
      {
        tuesday: {
          open: dataToUpdate?.open,
          close: dataToUpdate?.close,
        },
      },
      {
        wednesday: {
          open: dataToUpdate?.open,
          close: dataToUpdate?.close,
        },
      },
      {
        thursday: {
          open: dataToUpdate?.open,
          close: dataToUpdate?.close,
        },
      },
      {
        friday: {
          open: dataToUpdate?.open,
          close: dataToUpdate?.close,
        },
      },
      {
        saturday: {
          open: dataToUpdate?.open,
          close: dataToUpdate?.close,
        },
      },
      {
        sunday: {
          open: dataToUpdate?.open,
          close: dataToUpdate?.close,
        },
      },
    ],
    menu: dataToUpdate?.menu,
    diets: dataToUpdate?.diets,
    paymentMethods: dataToUpdate?.paymentMethods,
    atmosphere: dataToUpdate?.atmosphere,
    extras: dataToUpdate?.extras,
    section: dataToUpdate?.section,
  };

  return mappedData;
};

export { updateMapper };
