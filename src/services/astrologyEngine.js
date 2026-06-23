// High-Precision Vedic Astrology Calculation Engine (Offline-compatible)
// Based on Jean Meeus' Astronomical Algorithms and JPL Keplerian orbital elements

export const NAKSHATRAS_LIST = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashirsha', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
];

// Offline Geocoding Dictionary of major Indian and global cities
const CITIES_DB = [
  { name: 'Delhi', lat: 28.6139, lon: 77.2090, timezone: 5.5 },
  { name: 'New Delhi', lat: 28.6139, lon: 77.2090, timezone: 5.5 },
  { name: 'Mumbai', lat: 19.0760, lon: 72.8777, timezone: 5.5 },
  { name: 'Bombay', lat: 19.0760, lon: 72.8777, timezone: 5.5 },
  { name: 'Kolkata', lat: 22.5726, lon: 88.3639, timezone: 5.5 },
  { name: 'Calcutta', lat: 22.5726, lon: 88.3639, timezone: 5.5 },
  { name: 'Chennai', lat: 13.0827, lon: 80.2707, timezone: 5.5 },
  { name: 'Madras', lat: 13.0827, lon: 80.2707, timezone: 5.5 },
  { name: 'Bangalore', lat: 12.9716, lon: 77.5946, timezone: 5.5 },
  { name: 'Bengaluru', lat: 12.9716, lon: 77.5946, timezone: 5.5 },
  { name: 'Hyderabad', lat: 17.3850, lon: 78.4867, timezone: 5.5 },
  { name: 'Ahmedabad', lat: 23.0225, lon: 72.5714, timezone: 5.5 },
  { name: 'Pune', lat: 18.5204, lon: 73.8567, timezone: 5.5 },
  { name: 'Jaipur', lat: 26.9124, lon: 75.7873, timezone: 5.5 },
  { name: 'Lucknow', lat: 26.8467, lon: 80.9462, timezone: 5.5 },
  { name: 'Kanpur', lat: 26.4499, lon: 80.3319, timezone: 5.5 },
  { name: 'Nagpur', lat: 21.1458, lon: 79.0882, timezone: 5.5 },
  { name: 'Indore', lat: 22.7196, lon: 75.8577, timezone: 5.5 },
  { name: 'Thane', lat: 19.2183, lon: 72.9781, timezone: 5.5 },
  { name: 'Bhopal', lat: 23.2599, lon: 77.4126, timezone: 5.5 },
  { name: 'Patna', lat: 25.5941, lon: 85.1376, timezone: 5.5 },
  { name: 'Vadodara', lat: 22.3072, lon: 73.1812, timezone: 5.5 },
  { name: 'Ghaziabad', lat: 28.6692, lon: 77.4538, timezone: 5.5 },
  { name: 'Ludhiana', lat: 30.9010, lon: 75.8573, timezone: 5.5 },
  { name: 'Agra', lat: 27.1767, lon: 78.0081, timezone: 5.5 },
  { name: 'Nashik', lat: 19.9975, lon: 73.7898, timezone: 5.5 },
  { name: 'Faridabad', lat: 28.4089, lon: 77.3178, timezone: 5.5 },
  { name: 'Meerut', lat: 28.9845, lon: 77.7064, timezone: 5.5 },
  { name: 'Rajkot', lat: 22.3039, lon: 70.8022, timezone: 5.5 },
  { name: 'Varanasi', lat: 25.3176, lon: 82.9739, timezone: 5.5 },
  { name: 'Srinagar', lat: 34.0837, lon: 74.7973, timezone: 5.5 },
  { name: 'Aurangabad', lat: 19.8762, lon: 75.3433, timezone: 5.5 },
  { name: 'Dhanbad', lat: 23.7957, lon: 86.4304, timezone: 5.5 },
  { name: 'Amritsar', lat: 31.6340, lon: 74.8723, timezone: 5.5 },
  { name: 'Navi Mumbai', lat: 19.0330, lon: 73.0297, timezone: 5.5 },
  { name: 'Allahabad', lat: 25.4358, lon: 81.8463, timezone: 5.5 },
  { name: 'Prayagraj', lat: 25.4358, lon: 81.8463, timezone: 5.5 },
  { name: 'Ranchi', lat: 23.3441, lon: 85.3096, timezone: 5.5 },
  { name: 'Howrah', lat: 22.5958, lon: 88.2636, timezone: 5.5 },
  { name: 'Jabalpur', lat: 23.1815, lon: 79.9864, timezone: 5.5 },
  { name: 'Gwalior', lat: 26.2124, lon: 78.1772, timezone: 5.5 },
  { name: 'Coimbatore', lat: 11.0168, lon: 76.9558, timezone: 5.5 },
  { name: 'Vijayawada', lat: 16.5062, lon: 80.6480, timezone: 5.5 },
  { name: 'Jodhpur', lat: 26.2389, lon: 73.0243, timezone: 5.5 },
  { name: 'Madurai', lat: 9.9252, lon: 78.1198, timezone: 5.5 },
  { name: 'Raipur', lat: 21.2514, lon: 81.6296, timezone: 5.5 },
  { name: 'Kota', lat: 25.1805, lon: 75.8369, timezone: 5.5 },
  { name: 'Guwahati', lat: 26.1445, lon: 91.7362, timezone: 5.5 },
  { name: 'Chandigarh', lat: 30.7333, lon: 76.7794, timezone: 5.5 },
  { name: 'Dehradun', lat: 30.3165, lon: 78.0322, timezone: 5.5 },
  { name: 'Shimla', lat: 31.1048, lon: 77.1734, timezone: 5.5 },
  { name: 'Ujjain', lat: 23.1760, lon: 75.7885, timezone: 5.5 },
  { name: 'Haridwar', lat: 29.9457, lon: 78.1642, timezone: 5.5 },
  { name: 'Rishikesh', lat: 30.0869, lon: 78.2676, timezone: 5.5 },
  { name: 'Mathura', lat: 27.4924, lon: 77.6737, timezone: 5.5 },
  { name: 'Kalyan', lat: 19.2344, lon: 73.1389, timezone: 5.5 },
  { name: 'Dombivli', lat: 19.2344, lon: 73.1389, timezone: 5.5 },
  { name: 'Vasai', lat: 19.3913, lon: 72.8397, timezone: 5.5 },
  { name: 'Virar', lat: 19.3913, lon: 72.8397, timezone: 5.5 },
  { name: 'London', lat: 51.5074, lon: -0.1278, timezone: 0 },
  { name: 'New York', lat: 40.7128, lon: -74.0060, timezone: -5 },
  { name: 'Los Angeles', lat: 34.0522, lon: -118.2437, timezone: -8 },
  { name: 'Toronto', lat: 43.6532, lon: -79.3832, timezone: -5 },
  { name: 'Sydney', lat: -33.8688, lon: 151.2093, timezone: 10 },
  { name: 'Dubai', lat: 25.2048, lon: 55.2708, timezone: 4 },
  { name: 'Singapore', lat: 1.3521, lon: 103.8198, timezone: 8 },
  { name: 'Tokyo', lat: 35.6762, lon: 139.6503, timezone: 9 }
];

const PLANETS_ELEMENTS = {
  Mercury: {
    a: 0.38709893, a_dot: 0.00000066,
    e: 0.20563069, e_dot: 0.00002527,
    i: 7.00487,    i_dot: -23.51,
    L: 252.25084,  L_dot: 538101628.29,
    longPeri: 77.45645,  longPeri_dot: 573.57,
    longNode: 48.33167,  longNode_dot: -446.30
  },
  Venus: {
    a: 0.72333199, a_dot: 0.00000092,
    e: 0.00677323, e_dot: -0.00004938,
    i: 3.39471,    i_dot: -2.86,
    L: 181.97973,  L_dot: 210664136.06,
    longPeri: 131.53298, longPeri_dot: -108.80,
    longNode: 76.68069,  longNode_dot: -996.89
  },
  Earth: {
    a: 1.00000011, a_dot: -0.00000005,
    e: 0.01671022, e_dot: -0.00003804,
    i: 0.00005,    i_dot: -46.94,
    L: 100.46435,  L_dot: 129597740.63,
    longPeri: 102.94719, longPeri_dot: 1198.28,
    longNode: -11.26064, longNode_dot: -18228.25
  },
  Mars: {
    a: 1.52366231, a_dot: -0.00007221,
    e: 0.09341233, e_dot: 0.00011902,
    i: 1.85061,    i_dot: -25.47,
    L: 355.45332,  L_dot: 68905103.78,
    longPeri: 336.04084, longPeri_dot: 1560.78,
    longNode: 49.57854,  longNode_dot: -1020.19
  },
  Jupiter: {
    a: 5.20336301, a_dot: 0.00060737,
    e: 0.04839266, e_dot: -0.00012880,
    i: 1.30530,    i_dot: -4.15,
    L: 34.40438,   L_dot: 10925078.35,
    longPeri: 14.75385,  longPeri_dot: 839.93,
    longNode: 100.55615, longNode_dot: 1217.17
  },
  Saturn: {
    a: 9.53707032, a_dot: -0.00301530,
    e: 0.05415060, e_dot: -0.00036762,
    i: 2.48446,    i_dot: 6.11,
    L: 49.94432,   L_dot: 4401052.95,
    longPeri: 92.43194,  longPeri_dot: -1948.89,
    longNode: 113.71504, longNode_dot: -1591.05
  }
};

const normalizeString = (str) => {
  if (!str) return '';
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
};

const geocodeCity = (cityName) => {
  if (!cityName) return { name: 'Default (New Delhi)', lat: 28.6139, lon: 77.2090, timezone: 5.5 };
  
  const normalizedInput = normalizeString(cityName);
  
  // Try coordinates regex: "lat, lon" (e.g. "28.61, 77.20")
  const coordsRegex = /(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)/;
  const match = cityName.match(coordsRegex);
  if (match) {
    const lat = parseFloat(match[1]);
    const lon = parseFloat(match[2]);
    let timezone = 5.5;
    if (lon < 65 || lon > 95) {
      timezone = Math.round((lon / 15.0) * 2) / 2;
    }
    return { name: `Coords (${lat}, ${lon})`, lat, lon, timezone };
  }

  // 1. Try exact match of normalized name
  let bestMatch = CITIES_DB.find(city => normalizeString(city.name) === normalizedInput);
  if (bestMatch) return bestMatch;
  
  // 2. Try substring match (e.g. "Mumbai, Maharashtra" matches "Mumbai")
  bestMatch = CITIES_DB.find(city => {
    const normCity = normalizeString(city.name);
    return normalizedInput.includes(normCity) || normCity.includes(normalizedInput);
  });
  
  if (bestMatch) return bestMatch;
  
  // 3. Fallback to New Delhi
  return { name: 'Default (New Delhi)', lat: 28.6139, lon: 77.2090, timezone: 5.5 };
};

const getHeliocentricPosition = (planetName, T) => {
  const el = PLANETS_ELEMENTS[planetName];
  const a = el.a + el.a_dot * T;
  const e = el.e + el.e_dot * T;
  const i = el.i + (el.i_dot / 3600.0) * T;
  const L = el.L + (el.L_dot / 3600.0) * T;
  const longPeri = el.longPeri + (el.longPeri_dot / 3600.0) * T;
  const longNode = el.longNode + (el.longNode_dot / 3600.0) * T;

  const omega = longPeri - longNode;
  let M = L - longPeri;
  M = M % 360;
  if (M < 0) M += 360;

  const M_rad = M * Math.PI / 180;
  let E = M_rad;
  for (let iter = 0; iter < 10; iter++) {
    E = M_rad + e * Math.sin(E);
  }

  const x_prime = a * (Math.cos(E) - e);
  const y_prime = a * Math.sqrt(1 - e * e) * Math.sin(E);

  const i_rad = i * Math.PI / 180;
  const node_rad = longNode * Math.PI / 180;
  const omega_rad = omega * Math.PI / 180;

  const cos_omega = Math.cos(omega_rad);
  const sin_omega = Math.sin(omega_rad);
  const cos_node = Math.cos(node_rad);
  const sin_node = Math.sin(node_rad);
  const cos_i = Math.cos(i_rad);
  const sin_i = Math.sin(i_rad);

  const x_h = x_prime * (cos_omega * cos_node - sin_omega * sin_node * cos_i) - y_prime * (sin_omega * cos_node + cos_omega * sin_node * cos_i);
  const y_h = x_prime * (cos_omega * sin_node + sin_omega * cos_node * cos_i) - y_prime * (sin_omega * sin_node - cos_omega * cos_node * cos_i);
  const z_h = x_prime * (sin_omega * sin_i) + y_prime * (cos_omega * sin_i);

  return { x: x_h, y: y_h, z: z_h };
};

export const calculateAstrologyData = (dob, birthTime, birthPlace) => {
  if (!dob || !birthTime) return null;

  const city = geocodeCity(birthPlace);
  const { lat, lon, timezone } = city;

  const [year, month, day] = dob.split('-').map(Number);
  const [hour, minute] = birthTime.split(':').map(Number);

  // UTC calculations
  const localMillis = Date.UTC(year, month - 1, day, hour, minute, 0);
  const utcMillis = localMillis - timezone * 60 * 60 * 1000;
  const utcDate = new Date(utcMillis);

  const utcYear = utcDate.getUTCFullYear();
  const utcMonth = utcDate.getUTCMonth() + 1;
  const utcDay = utcDate.getUTCDate();
  const utcHour = utcDate.getUTCHours();
  const utcMin = utcDate.getUTCMinutes();
  const utcSec = utcDate.getUTCSeconds();

  const UT = utcHour + utcMin / 60 + utcSec / 3600;
  
  // Calculate Julian Date
  let Y = utcYear;
  let M = utcMonth;
  if (M <= 2) {
    Y -= 1;
    M += 12;
  }
  const A = Math.floor(Y / 100);
  const B = 2 - A + Math.floor(A / 4);
  const D = utcDay + UT / 24;
  const JD = Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1)) + D + B - 1524.5;

  const d = JD - 2451545.0;
  const T = d / 36525;

  // Ayanamsa
  const ayanamsa = 23.85709222 + 1.39697128 * T;

  const getSidereal = (tropical) => {
    let sidereal = (tropical - ayanamsa) % 360;
    if (sidereal < 0) sidereal += 360;
    return sidereal;
  };

  // 1. Sun
  const earthPos = getHeliocentricPosition('Earth', T);
  const sunLongTropical = (Math.atan2(-earthPos.y, -earthPos.x) * 180 / Math.PI + 360) % 360;
  const sunSidereal = getSidereal(sunLongTropical);

  // 2. Moon
  const Lp = 218.316 + 13.176396 * d;
  const Mp = 134.963 + 13.064993 * d;
  const F = 93.272 + 13.229350 * d;
  const M_sun = 357.529 + 0.9856003 * d;
  const D_elong = 297.850 + 12.190749 * d;

  const D_rad = (D_elong % 360) * Math.PI / 180;
  const M_rad = (M_sun % 360) * Math.PI / 180;
  const Mp_rad = (Mp % 360) * Math.PI / 180;
  const F_rad = (F % 360) * Math.PI / 180;

  const deltaL = 6.289 * Math.sin(Mp_rad)
               + 1.274 * Math.sin(2 * D_rad - Mp_rad)
               + 0.658 * Math.sin(2 * D_rad)
               - 0.186 * Math.sin(M_rad)
               + 0.214 * Math.sin(2 * Mp_rad)
               - 0.114 * Math.sin(2 * F_rad)
               - 0.057 * Math.sin(D_rad);

  const moonLongTropical = (Lp + deltaL + 360) % 360;
  const moonSidereal = getSidereal(moonLongTropical);

  // 3. Lagna
  const eps = 23.4392911 - 0.013004167 * T - 0.000000164 * T * T;
  let GMST = 280.46061837 + 360.98564736629 * d + 0.000387933 * T * T;
  GMST = GMST % 360;
  if (GMST < 0) GMST += 360;

  let LST = GMST + lon;
  LST = LST % 360;
  if (LST < 0) LST += 360;

  const lstRad = LST * Math.PI / 180;
  const epsRad = eps * Math.PI / 180;
  const latRad = lat * Math.PI / 180;

  let lagnaTropical = Math.atan2(Math.cos(lstRad), -Math.sin(epsRad) * Math.tan(latRad) - Math.cos(epsRad) * Math.sin(lstRad)) * 180 / Math.PI;
  if (lagnaTropical < 0) lagnaTropical += 360;
  const lagnaSidereal = getSidereal(lagnaTropical);

  // 4. Other Planets
  const getPlanetSidereal = (planetName) => {
    const pPos = getHeliocentricPosition(planetName, T);
    const x_g = pPos.x - earthPos.x;
    const y_g = pPos.y - earthPos.y;
    const trop = (Math.atan2(y_g, x_g) * 180 / Math.PI + 360) % 360;
    return getSidereal(trop);
  };

  const mercurySidereal = getPlanetSidereal('Mercury');
  const venusSidereal = getPlanetSidereal('Venus');
  const marsSidereal = getPlanetSidereal('Mars');
  const jupiterSidereal = getPlanetSidereal('Jupiter');
  const saturnSidereal = getPlanetSidereal('Saturn');

  // 5. Rahu / Ketu
  const rahuLongTropical = (125.0445550 - 1934.1361849 * T + 0.0020762 * T * T + 360) % 360;
  const rahuSidereal = getSidereal(rahuLongTropical);
  const ketuSidereal = (rahuSidereal + 180) % 360;

  const getSign = (long) => Math.floor(long / 30) + 1;
  const nakIndex = Math.floor(moonSidereal / (360 / 27)) % 27;

  return {
    lagnaSign: getSign(lagnaSidereal),
    nakshatra: NAKSHATRAS_LIST[nakIndex],
    moonSign: getSign(moonSidereal),
    planetSigns: {
      'Su': getSign(sunSidereal),
      'Mo': getSign(moonSidereal),
      'Ma': getSign(marsSidereal),
      'Me': getSign(mercurySidereal),
      'Ju': getSign(jupiterSidereal),
      'Ve': getSign(venusSidereal),
      'Sa': getSign(saturnSidereal),
      'Ra': getSign(rahuSidereal),
      'Ke': getSign(ketuSidereal)
    }
  };
};
