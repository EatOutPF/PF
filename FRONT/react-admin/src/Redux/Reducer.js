import { GET_ALL_RESTAURANTS } from "./Actions";

const initialState = {
  allRestaurants: [],
  detailRestaurant: {},
  currentListRestaurants: [
    {
      _id: "bd8356c8-69a0-48e2-a058-dbb057128e07",
      name: "Sierra Skullcap",
      address: {
        streetName: "9 Tony Road",
        streetNumber: "0135",
        neighborhood: "Arrowood",
        city: "Mar de Plata",
        state: "buenos aires",
        country: "Argentina",
        coordinate: { latitude: -37.997614, longitude: -57.554817 },
      },
      images: [
        "http://dummyimage.com/204x100.png/cc0000/ffffff",
        "http://dummyimage.com/117x100.png/dddddd/000000",
      ],
      contact: {
        phoneNumber: "562-234-9183",
        email: "ahalliwell0@microsoft.com",
        socialMedia: {
          instagram: "tmckoy0@prlog.org",
          facebook: "eocrowley0@imageshack.us",
          wpp: "fsteane0@paypal.com",
        },
      },
      tables: 41,
      schedule: [
        {
          monday: { open: "11:00", close: "23:57" },
          tuesday: { open: "11:00", close: "22:13" },
          wednesday: { open: "11:00", close: "23:01" },
          thursday: { open: "11:00", close: "23:30" },
          friday: { open: "11:00", close: "23:13" },
          saturday: { open: "11:00", close: "22:40" },
          sunday: { open: "11:00", close: "20:30" },
        },
      ],
      menu: ["italiana"],
      diets: ["vegano", "celiaco"],
      paymentMethods: ["credito", "debito", "mercadopago"],
      atmosphere: ["musica en vivo"],
      extras: ["petfriendly", "bar"],
      section: ["terraza", "barra", "salón principal"],
      ranking: 4.6,
      active: true,
    },
    {
      _id: "ae64d5b9-93b2-4029-930c-222194ea3a4a",
      name: "Grisebach's Tribisee",
      address: {
        streetName: "93904 Golf View Terrace",
        streetNumber: "3",
        neighborhood: "Prairieview",
        city: "Mar de Plata",
        state: "buenos aires",
        country: "Argentina",
        coordinate: { latitude: -37.985515, longitude: -57.559481 },
      },
      images: [
        "http://dummyimage.com/114x100.png/dddddd/000000",
        "http://dummyimage.com/102x100.png/5fa2dd/ffffff",
      ],
      contact: {
        phoneNumber: "962-459-6442",
        email: "hscalera1@chicagotribune.com",
        socialMedia: {
          instagram: "wcohr1@purevolume.com",
          facebook: "aphilipet1@seattletimes.com",
          wpp: "senderle1@dyndns.org",
        },
      },
      tables: 34,
      schedule: [
        {
          monday: { open: "11:00", close: "22:03" },
          tuesday: { open: "11:00", close: "22:26" },
          wednesday: { open: "11:00", close: "23:35" },
          thursday: { open: "11:00", close: "22:39" },
          friday: { open: "11:00", close: "22:12" },
          saturday: { open: "11:00", close: "22:33" },
          sunday: { open: "11:00", close: "18:58" },
        },
      ],
      menu: ["internacional"],
      diets: ["vegetariano", "celiaco"],
      paymentMethods: ["mercadopago", "transferencia", "credito"],
      atmosphere: ["musica en vivo"],
      extras: ["wi-fi", "menú para niño"],
      section: ["salón principal", "terraza", "barra"],
      ranking: 4.4,
      active: false,
    },
    {
      _id: "f6f24439-92d5-4b36-ab3c-9143a000bc4b",
      name: "Openground Draba",
      address: {
        streetName: "12 Manley Road",
        streetNumber: "52320",
        neighborhood: "Shoshone",
        city: "Mar de Plata",
        state: "buenos aires",
        country: "Argentina",
        coordinate: { latitude: -37.984425, longitude: -57.561599 },
      },
      images: [
        "http://dummyimage.com/192x100.png/5fa2dd/ffffff",
        "http://dummyimage.com/194x100.png/cc0000/ffffff",
      ],
      contact: {
        phoneNumber: "571-837-6403",
        email: "mbullock2@auda.org.au",
        socialMedia: {
          instagram: "wwythe2@army.mil",
          facebook: "jrumbellow2@sina.com.cn",
          wpp: "sputman2@is.gd",
        },
      },
      tables: 34,
      schedule: [
        {
          monday: { open: "11:00", close: "23:38" },
          tuesday: { open: "11:00", close: "22:28" },
          wednesday: { open: "11:00", close: "22:22" },
          thursday: { open: "11:00", close: "22:13" },
          friday: { open: "11:00", close: "23:21" },
          saturday: { open: "11:00", close: "22:50" },
          sunday: { open: "11:00", close: "18:50" },
        },
      ],
      menu: ["italiana"],
      diets: ["vegano", "celiaco"],
      paymentMethods: ["transferencia", "efectivo", "debito"],
      atmosphere: ["musica en vivo"],
      extras: ["bar", "menú para niño"],
      section: ["terraza", "salón principal", "barra"],
      ranking: 4.7,
      active: false,
    },
  ],
};

const Reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_RESTAURANTS:
      return { ...state, currentListRestaurants: payload };
    default:
      return { ...state };
  }
};

export default Reducer;
