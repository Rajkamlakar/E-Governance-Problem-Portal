// // Indian States and their districts/cities with wards
// export const locationData = {
//   Maharashtra: {
//     districts: {
//       Kolhapur: {
//         cities: {
//           "Kolhapur City": {
//             wards: Array.from({ length: 25 }, (_, i) => `Ward ${i + 1}`),
//           },
//           Ichalkaranji: {
//             wards: Array.from({ length: 15 }, (_, i) => `Ward ${i + 1}`),
//           },
//           Kagal: {
//             wards: Array.from({ length: 10 }, (_, i) => `Ward ${i + 1}`),
//           },
//         },
//       },
//       Pune: {
//         cities: {
//           "Pune City": {
//             wards: Array.from({ length: 41 }, (_, i) => `Ward ${i + 1}`),
//           },
//           Pimpri: {
//             wards: Array.from({ length: 30 }, (_, i) => `Ward ${i + 1}`),
//           },
//           Chinchwad: {
//             wards: Array.from({ length: 20 }, (_, i) => `Ward ${i + 1}`),
//           },
//         },
//       },
//       Mumbai: {
//         cities: {
//           "Mumbai City": {
//             wards: [
//               "A",
//               "B",
//               "C",
//               "D",
//               "E",
//               "F/N",
//               "F/S",
//               "G/N",
//               "G/S",
//               "H/E",
//               "H/W",
//               "K/E",
//               "K/W",
//               "L",
//               "M/E",
//               "M/W",
//               "N",
//               "P/N",
//               "P/S",
//               "R/C",
//               "R/N",
//               "R/S",
//               "S",
//               "T",
//             ],
//           },
//           Thane: {
//             wards: Array.from({ length: 30 }, (_, i) => `Ward ${i + 1}`),
//           },
//         },
//       },
//       Nashik: {
//         cities: {
//           "Nashik City": {
//             wards: Array.from({ length: 30 }, (_, i) => `Ward ${i + 1}`),
//           },
//         },
//       },
//     },
//   },
//   Gujarat: {
//     districts: {
//       Ahmedabad: {
//         cities: {
//           "Ahmedabad City": {
//             wards: Array.from({ length: 48 }, (_, i) => `Ward ${i + 1}`),
//           },
//         },
//       },
//       Surat: {
//         cities: {
//           "Surat City": {
//             wards: Array.from({ length: 21 }, (_, i) => `Zone ${i + 1}`),
//           },
//         },
//       },
//     },
//   },
//   Delhi: {
//     districts: {
//       "Central Delhi": {
//         cities: {
//           "New Delhi": {
//             wards: Array.from({ length: 20 }, (_, i) => `Ward ${i + 1}`),
//           },
//         },
//       },
//       "South Delhi": {
//         cities: {
//           "South Delhi": {
//             wards: Array.from({ length: 25 }, (_, i) => `Ward ${i + 1}`),
//           },
//         },
//       },
//     },
//   },
//   Karnataka: {
//     districts: {
//       Bangalore: {
//         cities: {
//           "Bangalore City": {
//             wards: Array.from({ length: 198 }, (_, i) => `Ward ${i + 1}`),
//           },
//         },
//       },
//     },
//   },
// };

// export const getStates = () => {
//   return Object.keys(locationData);
// };

// export const getDistricts = (state) => {
//   return state && locationData[state]
//     ? Object.keys(locationData[state].districts)
//     : [];
// };

// export const getCities = (state, district) => {
//   return state && district && locationData[state]?.districts[district]
//     ? Object.keys(locationData[state].districts[district].cities)
//     : [];
// };

// export const getWards = (state, district, city) => {
//   return state &&
//     district &&
//     city &&
//     locationData[state]?.districts[district]?.cities[city]
//     ? locationData[state].districts[district].cities[city].wards
//     : [];
// };
// Indian States and their districts/cities with wards
export const locationData = {
  Maharashtra: {
    districts: {
      Kolhapur: {
        cities: {
          "Kolhapur City": {
            wards: Array.from({ length: 25 }, (_, i) => `Ward ${i + 1}`),
          },
          Ichalkaranji: {
            wards: Array.from({ length: 15 }, (_, i) => `Ward ${i + 1}`),
          },
        },
      },
      Pune: {
        cities: {
          "Pune City": {
            wards: Array.from({ length: 41 }, (_, i) => `Ward ${i + 1}`),
          },
          Pimpri: {
            wards: Array.from({ length: 32 }, (_, i) => `Ward ${i + 1}`),
          },
        },
      },
      Mumbai: {
        cities: {
          "Mumbai City": {
            wards: [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F/N",
              "F/S",
              "G/N",
              "G/S",
              "H/E",
              "H/W",
              "K/E",
              "K/W",
              "L",
              "M/E",
              "M/W",
              "N",
              "P/N",
              "P/S",
              "R/C",
              "R/N",
              "R/S",
              "S",
              "T",
            ],
          },
          "Mumbai Suburban": {
            wards: Array.from({ length: 20 }, (_, i) => `Ward ${i + 1}`),
          },
        },
      },
      Nagpur: {
        cities: {
          "Nagpur City": {
            wards: Array.from({ length: 10 }, (_, i) => `Zone ${i + 1}`),
          },
        },
      },
    },
  },
  Gujarat: {
    districts: {
      Ahmedabad: {
        cities: {
          "Ahmedabad City": {
            wards: Array.from({ length: 48 }, (_, i) => `Ward ${i + 1}`),
          },
        },
      },
      Surat: {
        cities: {
          "Surat City": {
            wards: Array.from({ length: 21 }, (_, i) => `Zone ${i + 1}`),
          },
        },
      },
    },
  },
  Karnataka: {
    districts: {
      Bangalore: {
        cities: {
          "Bangalore City": {
            wards: Array.from({ length: 198 }, (_, i) => `Ward ${i + 1}`),
          },
        },
      },
    },
  },
  "Tamil Nadu": {
    districts: {
      Chennai: {
        cities: {
          "Chennai City": {
            wards: Array.from({ length: 200 }, (_, i) => `Ward ${i + 1}`),
          },
        },
      },
    },
  },
  Delhi: {
    districts: {
      "Central Delhi": {
        cities: {
          Delhi: {
            wards: Array.from({ length: 272 }, (_, i) => `Ward ${i + 1}`),
          },
        },
      },
    },
  },
};

// Helper function to get all states
export const getStates = () => Object.keys(locationData);

// Helper function to get districts by state
export const getDistricts = (state) => {
  if (!state || !locationData[state]) return [];
  return Object.keys(locationData[state].districts);
};

// Helper function to get cities by state and district
export const getCities = (state, district) => {
  if (!state || !district || !locationData[state]?.districts[district])
    return [];
  return Object.keys(locationData[state].districts[district].cities);
};

// Helper function to get wards by state, district, and city
export const getWards = (state, district, city) => {
  if (
    !state ||
    !district ||
    !city ||
    !locationData[state]?.districts[district]?.cities[city]
  )
    return [];
  return locationData[state].districts[district].cities[city].wards;
};
