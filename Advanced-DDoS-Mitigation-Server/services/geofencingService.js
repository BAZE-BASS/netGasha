const axios = require('axios');
const { allowedCountries } = require('../config');

const GEO_API_URL = 'http://ip-api.com/json/';

const geofencingCheck = async (ip) => {
  try {
    const response = await axios.get(${GEO_API_URL}${ip});
    const { countryCode } = response.data;
    return allowedCountries.includes(countryCode);
  } catch (err) {
    console.error('Geofencing Error:', err);
    return false; // Block if geolocation fails
  }
};

module.exports = { geofencingCheck };
json
json.json