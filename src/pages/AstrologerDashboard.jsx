import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, FileText, LogOut, Check, X, CheckSquare, Phone, Mail, Clock, Sparkles, AlertCircle, Edit, Star, ShieldAlert, Plus, Trash2, Printer, User } from 'lucide-react';
import { adminAPI, publicAPI } from '../services/api';
import { calculateAstrologyData } from '../services/astrologyEngine';

const NAKSHATRAS_INFO = {
  'Ashwini': { gana: 'Deva', nadi: 'Adi', lord: 'Ketu' },
  'Bharani': { gana: 'Manushya', nadi: 'Madhya', lord: 'Venus' },
  'Krittika': { gana: 'Rakshasa', nadi: 'Antya', lord: 'Sun' },
  'Rohini': { gana: 'Deva', nadi: 'Antya', lord: 'Moon' },
  'Mrigashirsha': { gana: 'Deva', nadi: 'Madhya', lord: 'Mars' },
  'Ardra': { gana: 'Manushya', nadi: 'Adi', lord: 'Rahu' },
  'Punarvasu': { gana: 'Deva', nadi: 'Adi', lord: 'Jupiter' },
  'Pushya': { gana: 'Deva', nadi: 'Madhya', lord: 'Saturn' },
  'Ashlesha': { gana: 'Rakshasa', nadi: 'Antya', lord: 'Mercury' },
  'Magha': { gana: 'Rakshasa', nadi: 'Adi', lord: 'Ketu' },
  'Purva Phalguni': { gana: 'Manushya', nadi: 'Madhya', lord: 'Venus' },
  'Uttara Phalguni': { gana: 'Manushya', nadi: 'Antya', lord: 'Sun' },
  'Hasta': { gana: 'Deva', nadi: 'Antya', lord: 'Moon' },
  'Chitra': { gana: 'Rakshasa', nadi: 'Madhya', lord: 'Mars' },
  'Swati': { gana: 'Deva', nadi: 'Adi', lord: 'Rahu' },
  'Vishakha': { gana: 'Rakshasa', nadi: 'Adi', lord: 'Jupiter' },
  'Anuradha': { gana: 'Deva', nadi: 'Madhya', lord: 'Saturn' },
  'Jyeshtha': { gana: 'Rakshasa', nadi: 'Antya', lord: 'Mercury' },
  'Mula': { gana: 'Rakshasa', nadi: 'Adi', lord: 'Ketu' },
  'Purva Ashadha': { gana: 'Manushya', nadi: 'Madhya', lord: 'Venus' },
  'Uttara Ashadha': { gana: 'Manushya', nadi: 'Antya', lord: 'Sun' },
  'Shravana': { gana: 'Deva', nadi: 'Antya', lord: 'Moon' },
  'Dhanishta': { gana: 'Rakshasa', nadi: 'Madhya', lord: 'Mars' },
  'Shatabhisha': { gana: 'Rakshasa', nadi: 'Adi', lord: 'Rahu' },
  'Purva Bhadrapada': { gana: 'Manushya', nadi: 'Adi', lord: 'Jupiter' },
  'Uttara Bhadrapada': { gana: 'Manushya', nadi: 'Madhya', lord: 'Saturn' },
  'Revati': { gana: 'Deva', nadi: 'Antya', lord: 'Mercury' }
};

const TRANSLATIONS = {
  en: {
    appointments: 'Appointments',
    kundaliRequests: 'Kundali Requests',
    gunMilan: 'Gun Milan Matching',
    livePanchang: 'Live Panchang',
    adminControl: 'Admin Control',
    logout: 'Logout',
    profileSettings: 'Profile & Settings',
    exit: 'Exit',
    view: 'View',
    rebuild: 'Rebuild Kundali',
    generate: 'Generate Kundali',
    generateAndPrint: 'Generate & Print',
    matchingResult: 'Matching Result',
    brideNakshatra: 'Bride Nakshatra',
    groomNakshatra: 'Groom Nakshatra',
    theme: 'Theme',
    language: 'Language',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    close: 'Close',
    save: 'Save Settings',

    appointmentsList: 'Appointments List',
    customer: 'Customer',
    purpose: 'Purpose',
    dateTime: 'Date & Time',
    bookingDateTime: 'Booking Date & Time',
    status: 'Status',
    action: 'Action',
    all: 'All',
    pending: 'Pending',
    confirmed: 'Confirmed',
    completed: 'Completed',
    cancelled: 'Cancelled',
    remedies: 'Remedies',
    reprintPdf: 'Reprint PDF',
    noActions: 'No actions',
    noAppointmentsFound: 'No appointments found for this status.',
    kundaliRequestsList: 'Kundali Generation Requests',
    createNewKundali: 'Create New Kundali',
    user: 'User',
    birthDetails: 'Birth Details',
    notes: 'Notes',
    rebuildKundali: 'Rebuild Kundali',
    generateKundali: 'Generate Kundali',
    deleteRequest: 'Delete Request',
    noRequestsFound: 'No Kundali requests found.',
    kundaliMilanTitle: 'Kundali Milan (Horoscope Matching)',
    selectNakshatrasManually: 'Select Nakshatras Manually',
    enterBirthDetailsAuto: 'Enter Birth Details (Auto-Calculate)',
    brideKanya: 'Bride (Kanya)',
    groomVara: 'Groom (Vara)',
    moonStarNakshatra: 'Moon Star (Nakshatra)',
    selectNakshatra: 'Select Nakshatra...',
    dateOfBirth: 'Date of Birth',
    birthTime: 'Birth Time',
    birthPlace: 'Birth Place',
    consultationNotesQuestion: 'Consultation Notes / Question',
    calculateMatching: 'Calculate Matching Points',
    calculating: 'Calculating matching...',

    nadiName: 'Nadi (Nerve compatibility)',
    bhakootName: 'Bhakoot (Moon sign relation)',
    ganaName: 'Gana (Temperament)',
    grahaMaitriName: 'Graha Maitri (Lord friendship)',
    yoniName: 'Yoni (Physical affinity)',
    taraName: 'Tara (Destiny relationship)',
    vasyaName: 'Vasya (Attraction/Dominance)',
    varnaName: 'Varna (Mental alignment)',
    match: 'Match',
    dosha: 'Dosha/Mismatch',
    excellentMatch: 'Excellent Match!',
    goodMatch: 'Good Match',
    averageMatch: 'Average Match',
    poorMatch: 'Poor Match (Not recommended)',
    totalMatchPoints: 'Total Match Points',
    ashtakootaBreakdown: 'Ashtakoota Score Breakdown',
    autoCalculatedMoonStars: '✨ Auto-Calculated Moon Stars: Bride =',
    name: 'Name',
    date: 'Date',
    time: 'Time',
    yajman: 'Yajman',
    yajmanClient: 'Yajman (Client)',
    panditObservations: "Pandit Ji's Observations & Calculations",
    prescribedRemedies: 'Prescribed Remedies (Upayas)',
    remedyReferenceImages: 'Remedy Reference Images',
    panditName: 'Karmyogi Pandit Priyashankar Pandey',
    viewRemediesSheet: 'View Prescribed Remedies Sheet',
    viewKundaliReport: 'View Janam Kundali Report',
    printRemedies: 'Print Remedies',
    printChart: 'Print Chart',
    pooja: 'Pooja',
    kundaliGeneration: 'Kundali Generation',
    generalConsultation: 'General Consultation',
    gunMilanMatching: 'Gun Milan Matching',
    generateKundaliReport: 'Generate Kundali Report',
    selectChartType: 'Select Kundali Chart Type',
    janamKundali: 'Janam Kundali (Birth Chart)',
    lagnaKundali: 'Lagna Kundali (Ascendant Chart)',
    chandraKundali: 'Chandra Kundali (Moon Chart)',
    suryaKundali: 'Surya Kundali (Sun Chart)',
    vivahKundali: 'Vivah Kundali (Marriage Match)',
    prashnaKundali: 'Prashna Kundali (Question Chart)',
    varshaphalKundali: 'Varshaphal Kundali (Annual Chart)',
    tithiLabel: 'Tithi',
    starLabel: 'Star',
    rahuKaalLabel: 'Rahu Kaal',
    abhijitLabel: 'Abhijit',
    footerText: 'Shri Pitambara Jyotish Karyalaya • Ph: +91 9920597009 • Email: priyeshankarpanday@gmail.com',
    createNewJanamKundali: 'Create New Janam Kundali',
    enterBirthDetailsSubtitle: 'Enter birth details to generate chart',
    yajmanName: 'Yajman Name',
    yajmanNamePlaceholder: 'e.g. Rahul Sharma',
    birthPlacePlaceholder: 'e.g. New Delhi, India',
    consultationNotesPlaceholder: 'e.g. Query about career growth or marriage time',
    cancel: 'Cancel',
    submitDetails: 'Submit Details'
  },
  hi: {
    appointments: 'अपॉइंटमेंट',
    kundaliRequests: 'कुंडली अनुरोध',
    gunMilan: 'गुण मिलान मैचिंग',
    livePanchang: 'लाइव पंचांग',
    adminControl: 'व्यवस्थापक नियंत्रण',
    logout: 'लॉगआउट',
    profileSettings: 'प्रोफ़ाइल और सेटिंग्स',
    exit: 'बाहर निकलें',
    view: 'देखें',
    rebuild: 'कुंडली फिर से बनाएं',
    generate: 'कुंडली बनाएं',
    generateAndPrint: 'बनाएं और प्रिंट करें',
    matchingResult: 'मिलान परिणाम',
    brideNakshatra: 'वधू नक्षत्र',
    groomNakshatra: 'वर नक्षत्र',
    theme: 'थीम',
    language: 'भाषा',
    lightMode: 'लाइट मोड',
    darkMode: 'डार्क मोड',
    close: 'बंद करें',
    save: 'सेटिंग्स सहेजें',

    appointmentsList: 'अपॉइंटमेंट सूची',
    customer: 'ग्राहक (यजमान)',
    purpose: 'उद्देश्य',
    dateTime: 'दिनांक और समय',
    bookingDateTime: 'बुकिंग का दिनांक और समय',
    status: 'स्थिति',
    action: 'कार्य',
    all: 'सभी',
    pending: 'लंबित',
    confirmed: 'पुष्टि की गई',
    completed: 'पूर्ण',
    cancelled: 'रद्द',
    remedies: 'उपाय',
    reprintPdf: 'पीडीएफ फिर से प्रिंट करें',
    noActions: 'कोई कार्य नहीं',
    noAppointmentsFound: 'इस स्थिति के लिए कोई अपॉइंटमेंट नहीं मिला।',
    kundaliRequestsList: 'कुंडली निर्माण अनुरोध',
    createNewKundali: 'नई कुंडली बनाएं',
    user: 'उपयोगकर्ता',
    birthDetails: 'जन्म विवरण',
    notes: 'टिप्पणी',
    rebuildKundali: 'कुंडली फिर से बनाएं',
    generateKundali: 'कुंडली बनाएं',
    deleteRequest: 'अनुरोध हटाएं',
    noRequestsFound: 'कोई कुंडली अनुरोध नहीं मिला।',
    kundaliMilanTitle: 'कुंडली मिलान (वर-वधू मिलान)',
    selectNakshatrasManually: 'नक्षत्रों का मैन्युअल चयन',
    enterBirthDetailsAuto: 'जन्म विवरण दर्ज करें (स्वचालित गणना)',
    brideKanya: 'वधू (कन्या)',
    groomVara: 'वर (पुरुष)',
    moonStarNakshatra: 'चंद्र नक्षत्र',
    selectNakshatra: 'नक्षत्र चुनें...',
    dateOfBirth: 'जन्म तिथि',
    birthTime: 'जन्म समय',
    birthPlace: 'जन्म स्थान',
    consultationNotesQuestion: 'परामर्श नोट / प्रश्न',
    calculateMatching: 'मिलान अंकों की गणना करें',
    calculating: 'मिलान अंकों की गणना की जा रही है...',

    nadiName: 'नाड़ी मिलान (स्वास्थ्य और संतान)',
    bhakootName: 'भकूट मिलान (मानसिक अनुकूलता)',
    ganaName: 'गण मिलान (स्वभाव व चरित्र)',
    grahaMaitriName: 'ग्रह मैत्री (मित्रता व सोच)',
    yoniName: 'योनि मिलान (शारीरिक अनुकूलता)',
    taraName: 'तारा मिलान (भाग्य व स्वास्थ्य)',
    vasyaName: 'वश्य मिलान (पारस्परिक आकर्षण)',
    varnaName: 'वर्ण मिलान (कार्य व दृष्टिकोण)',
    match: 'उत्कृष्ट (मिलान)',
    dosha: 'दोष (असंगत)',
    excellentMatch: 'उत्कृष्ट मिलान!',
    goodMatch: 'अच्छा मिलान',
    averageMatch: 'सामान्य मिलान',
    poorMatch: 'कमजोर मिलान (सुझाव नहीं)',
    totalMatchPoints: 'कुल मिलान अंक',
    ashtakootaBreakdown: 'अष्टकूट मिलान अंक विवरण',
    autoCalculatedMoonStars: '✨ स्वचालित गणना किए गए नक्षत्र: वधू =',
    name: 'नाम',
    date: 'दिनांक',
    time: 'समय',
    yajman: 'यजमान',
    yajmanClient: 'यजमान (ग्राहक)',
    panditObservations: 'पंडित जी का अवलोकन एवं गणना',
    prescribedRemedies: 'निर्धारित उपाय (उपाय व मंत्र)',
    remedyReferenceImages: 'उपाय संदर्भ चित्र',
    panditName: 'पंडित प्रियशंकर पाण्डेय',
    viewRemediesSheet: 'निर्धारित उपाय पत्रक देखें',
    viewKundaliReport: 'जन्म कुंडली रिपोर्ट देखें',
    printRemedies: 'उपाय प्रिंट करें',
    printChart: 'कुंडली प्रिंट करें',
    pooja: 'पूजा / अनुष्ठान',
    kundaliGeneration: 'कुंडली निर्माण',
    generalConsultation: 'सामान्य परामर्श',
    gunMilanMatching: 'गुण मिलान मैचिंग',
    generateKundaliReport: 'कुंडली रिपोर्ट तैयार करें',
    selectChartType: 'कुंडली चक्र प्रकार चुनें',
    janamKundali: 'जन्म कुंडली (जन्म चक्र)',
    lagnaKundali: 'लग्न कुंडली (लग्न चक्र)',
    chandraKundali: 'चन्द्र कुंडली (चंद्र चक्र)',
    suryaKundali: 'सूर्य कुंडली (सूर्य चक्र)',
    vivahKundali: 'विवाह कुंडली (विवाह मिलान)',
    prashnaKundali: 'प्रश्न कुंडली (प्रश्न चक्र)',
    varshaphalKundali: 'वर्षफल कुंडली (वार्षिक चक्र)',
    tithiLabel: 'तिथि',
    starLabel: 'नक्षत्र',
    rahuKaalLabel: 'राहु काल',
    abhijitLabel: 'अभिजित',
    footerText: 'श्री पीतांबरा ज्योतिष कार्यालय • फोन: +९१ ९९२०५९७००९ • ईमेल: priyeshankarpanday@gmail.com',
    createNewJanamKundali: 'नई जन्म कुंडली बनाएं',
    enterBirthDetailsSubtitle: 'जन्म विवरण दर्ज करें और कुंडली तैयार करें',
    yajmanName: 'यजमान का नाम',
    yajmanNamePlaceholder: 'जैसे: राहुल शर्मा',
    birthPlacePlaceholder: 'जैसे: नई दिल्ली, भारत',
    consultationNotesPlaceholder: 'जैसे: करियर वृद्धि या विवाह समय के बारे में प्रश्न',
    cancel: 'रद्द करें',
    submitDetails: 'विवरण सबमिट करें'
  }
};

// ─── ASTRONOMICAL PANCHANG ENGINE ────────────────────────────────────────────
const _toRad = (d) => d * Math.PI / 180;
const _norm360 = (d) => ((d % 360) + 360) % 360;

const _getJD = (date) => {
  let y = date.getFullYear(), m = date.getMonth() + 1;
  const d = date.getDate() + date.getHours()/24 + date.getMinutes()/1440;
  if (m <= 2) { y--; m += 12; }
  const A = Math.floor(y/100), B = 2 - A + Math.floor(A/4);
  return Math.floor(365.25*(y+4716)) + Math.floor(30.6001*(m+1)) + d + B - 1524.5;
};

const _getSunLong = (JD) => {
  const T = (JD - 2451545.0)/36525;
  const L0 = _norm360(280.46646 + 36000.76983*T);
  const M  = _toRad(_norm360(357.52911 + 35999.05029*T - 0.0001537*T*T));
  const C  = (1.914602 - 0.004817*T)*Math.sin(M) + 0.019993*Math.sin(2*M) + 0.000289*Math.sin(3*M);
  return _norm360(L0 + C);
};

const _getMoonLong = (JD) => {
  const T  = (JD - 2451545.0)/36525;
  const L  = _norm360(218.3164477 + 481267.88123421*T - 0.0015786*T*T);
  const M  = _toRad(_norm360(134.9633964 + 477198.8676313*T + 0.0089970*T*T));
  const Ms = _toRad(_norm360(357.5291092 + 35999.0502909*T - 0.0001536*T*T));
  const D  = _toRad(_norm360(297.8501921 + 445267.1114034*T - 0.0018819*T*T));
  const F  = _toRad(_norm360(93.2720950  + 483202.0175233*T - 0.0036539*T*T));
  const corr = 6.288774*Math.sin(M)
    + 1.274027*Math.sin(2*D-M) + 0.658314*Math.sin(2*D)
    + 0.213618*Math.sin(2*M)   - 0.185116*Math.sin(Ms)
    - 0.114332*Math.sin(2*F)   + 0.058793*Math.sin(2*D-2*M)
    + 0.057066*Math.sin(2*D-Ms-M) + 0.053322*Math.sin(2*D+M);
  return _norm360(L + corr);
};

const _getSunriseSunset = (lat, lng, date) => {
  const JD    = _getJD(date);
  const Jstar = JD - lng/360;
  const M     = _toRad(_norm360(357.5291 + 0.98560028*(Jstar - 2451545)));
  const C     = 1.9148*Math.sin(M) + 0.0200*Math.sin(2*M) + 0.0003*Math.sin(3*M);
  const lam   = _toRad(_norm360(M*(180/Math.PI) + C + 180 + 102.9372));
  const Jtransit = 2451545 + 0.0009 + (lng/360) + 0.0053*Math.sin(M) - 0.0069*Math.sin(2*lam);
  const sinDec   = Math.sin(lam)*Math.sin(_toRad(23.4397));
  const cosDec   = Math.cos(Math.asin(sinDec));
  const cosHa    = (Math.cos(_toRad(90.8333)) - sinDec*Math.sin(_toRad(lat))) / (cosDec*Math.cos(_toRad(lat)));
  if (cosHa < -1 || cosHa > 1) return { sunrise: new Date(date.setHours(6,0,0,0)), sunset: new Date(date.setHours(18,0,0,0)) };
  const Ha   = (180/Math.PI)*Math.acos(cosHa) / 360;
  const jdToMs = (jd) => (jd - 2440587.5)*86400000;
  return { sunrise: new Date(jdToMs(Jtransit - Ha)), sunset: new Date(jdToMs(Jtransit + Ha)) };
};

const PANCHANG_TITHIS = [
  'Pratipada','Dwitiya','Tritiya','Chaturthi','Panchami','Shashthi','Saptami','Ashtami',
  'Navami','Dashami','Ekadashi','Dwadashi','Trayodashi','Chaturdashi','Purnima',
  'Krishna Pratipada','Krishna Dwitiya','Krishna Tritiya','Krishna Chaturthi','Krishna Panchami',
  'Krishna Shashthi','Krishna Saptami','Krishna Ashtami','Krishna Navami','Krishna Dashami',
  'Krishna Ekadashi','Krishna Dwadashi','Krishna Trayodashi','Krishna Chaturdashi','Amavasya'
];
const PANCHANG_NAKSHATRAS = [
  'Ashwini','Bharani','Krittika','Rohini','Mrigashirsha','Ardra','Punarvasu','Pushya',
  'Ashlesha','Magha','Purva Phalguni','Uttara Phalguni','Hasta','Chitra','Swati','Vishakha',
  'Anuradha','Jyeshtha','Mula','Purva Ashadha','Uttara Ashadha','Shravana','Dhanishtha',
  'Shatabhisha','Purva Bhadrapada','Uttara Bhadrapada','Revati'
];

// Rahu Kaal segment index (1-indexed out of 8 parts of the day, for Sun=0..Sat=6)
const RAHU_KAAL_ORDER = [8, 2, 7, 5, 6, 4, 3];

const calculatePanchang = (lat, lng) => {
  const now  = new Date();
  const JD   = _getJD(now);
  const sunL = _getSunLong(JD);
  const moonL= _getMoonLong(JD);

  // Tithi (0-29)
  let elong = moonL - sunL;
  if (elong < 0) elong += 360;
  const tithiIdx = Math.floor(elong / 12);

  // Nakshatra (0-26)
  const nakIdx = Math.floor(moonL / (360/27));

  // Sunrise / Sunset
  const { sunrise, sunset } = _getSunriseSunset(lat, lng, new Date());

  // Rahu Kaal
  const dayDur  = sunset.getTime() - sunrise.getTime();
  const seg     = dayDur / 8;
  const rSeg    = RAHU_KAAL_ORDER[now.getDay()] - 1;
  const rStart  = new Date(sunrise.getTime() + rSeg * seg);
  const rEnd    = new Date(rStart.getTime() + seg);

  // Abhijit Muhurta (solar noon ± 24 min)
  const noon     = new Date((sunrise.getTime() + sunset.getTime()) / 2);
  const abStart  = new Date(noon.getTime() - 24*60000);
  const abEnd    = new Date(noon.getTime() + 24*60000);

  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const fmt  = (d) => d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

  return {
    day:            days[now.getDay()],
    tithi:          PANCHANG_TITHIS[tithiIdx] || PANCHANG_TITHIS[0],
    nakshatra:      PANCHANG_NAKSHATRAS[nakIdx] || PANCHANG_NAKSHATRAS[0],
    rahuKaal:       `${fmt(rStart)} – ${fmt(rEnd)}`,
    abhijitMuhurta: `${fmt(abStart)} – ${fmt(abEnd)}`,
    sunrise:        fmt(sunrise),
    sunset:         fmt(sunset),
  };
};

// Popular Indian cities for location picker
const INDIAN_CITIES = [
  { name: 'New Delhi',    lat: 28.6139, lng: 77.2090 },
  { name: 'Mumbai',       lat: 19.0760, lng: 72.8777 },
  { name: 'Kolkata',      lat: 22.5726, lng: 88.3639 },
  { name: 'Chennai',      lat: 13.0827, lng: 80.2707 },
  { name: 'Bengaluru',    lat: 12.9716, lng: 77.5946 },
  { name: 'Hyderabad',    lat: 17.3850, lng: 78.4867 },
  { name: 'Ahmedabad',    lat: 23.0225, lng: 72.5714 },
  { name: 'Pune',         lat: 18.5204, lng: 73.8567 },
  { name: 'Jaipur',       lat: 26.9124, lng: 75.7873 },
  { name: 'Varanasi',     lat: 25.3176, lng: 82.9739 },
  { name: 'Lucknow',      lat: 26.8467, lng: 80.9462 },
  { name: 'Prayagraj',    lat: 25.4358, lng: 81.8464 },
  { name: 'Patna',        lat: 25.5941, lng: 85.1376 },
  { name: 'Bhopal',       lat: 23.2599, lng: 77.4126 },
  { name: 'Indore',       lat: 22.7196, lng: 75.8577 },
  { name: 'Nagpur',       lat: 21.1458, lng: 79.0882 },
  { name: 'Surat',        lat: 21.1702, lng: 72.8311 },
  { name: 'Amritsar',     lat: 31.6340, lng: 74.8723 },
  { name: 'Raipur',       lat: 21.2514, lng: 81.6296 },
  { name: 'Guwahati',     lat: 26.1445, lng: 91.7362 },
];

const AstrologerDashboard = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [kundaliRequests, setKundaliRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const navigate = useNavigate();

  // Theme, Language & Location Settings
  const [theme, setTheme] = useState(localStorage.getItem('admin_theme') || 'light');
  const [language, setLanguage] = useState(localStorage.getItem('admin_lang') || 'en');
  const [profileOpen, setProfileOpen] = useState(false);
  const [userLocation, setUserLocation] = useState(() => {
    const saved = localStorage.getItem('admin_location');
    return saved ? JSON.parse(saved) : { lat: 25.3176, lng: 82.9739, name: 'Varanasi' };
  });
  const [panchang, setPanchang] = useState(() => calculatePanchang(25.3176, 82.9739));
  const t = (key) => TRANSLATIONS[language]?.[key] || TRANSLATIONS['en']?.[key] || key;

  const toHindiNumerals = (val) => {
    if (val === undefined || val === null) return '';
    const str = String(val);
    const hindiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
    return str.replace(/[0-9]/g, (w) => hindiDigits[+w]);
  };
  const formatValue = (val) => (language === 'hi' ? toHindiNumerals(val) : val);

  const translateDay = (day) => {
    if (language !== 'hi') return day;
    const map = {
      'Sunday': 'रविवार', 'Monday': 'सोमवार', 'Tuesday': 'मंगलवार', 'Wednesday': 'बुधवार',
      'Thursday': 'गुरुवार', 'Friday': 'शुक्रवार', 'Saturday': 'शनिवार'
    };
    return map[day] || day;
  };
  
  const translateTithi = (tithi) => {
    if (language !== 'hi') return tithi;
    const map = {
      'Pratipada': 'प्रतिपदा', 'Dwitiya': 'द्वितीया', 'Tritiya': 'तृतीया', 'Chaturthi': 'चतुर्थी',
      'Panchami': 'पंचमी', 'Shashthi': 'षष्ठी', 'Saptami': 'सप्तमी', 'Ashtami': 'अष्टमी',
      'Navami': 'नवमी', 'Dashami': 'दशमी', 'Ekadashi': 'एकादशी', 'Dwadashi': 'द्वादशी',
      'Trayodashi': 'त्रयोदशी', 'Chaturdashi': 'चतुर्दशी', 'Purnima': 'पूर्णिमा', 'Amavasya': 'अमावस्या'
    };
    return map[tithi] || tithi;
  };
  
  const translateNakshatra = (nak) => {
    if (language !== 'hi') return nak;
    const map = {
      'Ashwini': 'अश्विनी', 'Bharani': 'भरणी', 'Krittika': 'कृत्तिका', 'Rohini': 'रोहिणी',
      'Mrigashirsha': 'मृगशिरा', 'Ardra': 'आर्द्रा', 'Punarvasu': 'पुनर्वसु', 'Pushya': 'पुष्य',
      'Ashlesha': 'अश्लेषा', 'Magha': 'मघा', 'Purva Phalguni': 'पूर्वाफाल्गुनी', 'Uttara Phalguni': 'उत्तराफाल्गुनी',
      'Hasta': 'हस्त', 'Chitra': 'चित्रा', 'Swati': 'स्वाती', 'Vishakha': 'विशाखा',
      'Anuradha': 'अनुराधा', 'Jyeshtha': 'ज्येष्ठा', 'Mula': 'मूल', 'Purva Ashadha': 'पूर्वाषाढ़ा',
      'Uttara Ashadha': 'उत्तराषाढ़ा', 'Shravana': 'श्रवण', 'Dhanishta': 'धनिष्ठा', 'Shatabhisha': 'शतभिषा',
      'Purva Bhadrapada': 'पूर्वाभाद्रपद', 'Uttara Bhadrapada': 'उत्तराभाद्रपद', 'Revati': 'रेवती'
    };
    return map[nak] || nak;
  };

  const translatePurpose = (purpose) => {
    if (!purpose) return '';
    const upper = purpose.toUpperCase();
    if (upper === 'POOJA') return t('pooja');
    if (upper === 'KUNDALI_GENERATION' || upper === 'KUNDALI') return t('kundaliGeneration');
    if (upper === 'CONSULTATION' || upper === 'GENERAL_CONSULTATION') return t('generalConsultation');
    if (upper === 'GUN_MILAN' || upper === 'MATCHING') return t('gunMilanMatching');
    return purpose;
  };

  const translatePlanet = (p) => {
    if (language === 'hi') {
      const map = {
        'Asc': 'ल', 'Su': 'सू', 'Mo': 'चं', 'Ma': 'मं', 'Me': 'बु', 'Ju': 'गु',
        'Ve': 'शु', 'Sa': 'श', 'Ra': 'रा', 'Ke': 'के'
      };
      return map[p] || p;
    }
    return p;
  };

  const getBreakdownName = (name) => {
    if (name.includes('Nadi')) return t('nadiName');
    if (name.includes('Bhakoot')) return t('bhakootName');
    if (name.includes('Gana')) return t('ganaName');
    if (name.includes('Graha')) return t('grahaMaitriName');
    if (name.includes('Yoni')) return t('yoniName');
    if (name.includes('Tara')) return t('taraName');
    if (name.includes('Vasya')) return t('vasyaName');
    if (name.includes('Varna')) return t('varnaName');
    return name;
  };
  const getBreakdownStatus = (status) => {
    if (status === 'Match') return t('match');
    return t('dosha');
  };
  const getCompatibilityText = (text) => {
    if (text.includes('Excellent')) return t('excellentMatch');
    if (text.includes('Good')) return t('goodMatch');
    if (text.includes('Average')) return t('averageMatch');
    if (text.includes('Poor')) return t('poorMatch');
    return text;
  };

  // Parse the combined purpose string stored in backend
  // Format: "Pooja Booking - Shri Satyanarayan Pooja (With Samagri)"
  const parsePurpose = (purpose) => {
    if (!purpose) return { base: '', poojaType: '', samagri: '' };
    let base = purpose;
    let poojaType = '';
    let samagri = '';

    // Extract samagri from parentheses at end: "(With Samagri)" or "(Without Samagri)"
    const samagriMatch = purpose.match(/\(([^)]+Samagri[^)]*)\)/);
    if (samagriMatch) {
      samagri = samagriMatch[1];
      base = base.replace(` (${samagri})`, '').trim();
    }

    // Extract pooja type after " - "
    const dashIdx = base.indexOf(' - ');
    if (dashIdx !== -1) {
      poojaType = base.slice(dashIdx + 3).trim();
      base = base.slice(0, dashIdx).trim();
    }

    return { base, poojaType, samagri };
  };

  // Gun Milan State
  const [brideNak, setBrideNak] = useState('');
  const [groomNak, setGroomNak] = useState('');
  const [matchingResult, setMatchingResult] = useState(null);
  const [matchingMethod, setMatchingMethod] = useState('manual');
  
  // Bride Birth Details
  const [brideDob, setBrideDob] = useState('');
  const [brideTime, setBrideTime] = useState('');
  const [bridePlace, setBridePlace] = useState('');
  
  // Groom Birth Details
  const [groomDob, setGroomDob] = useState('');
  const [groomTime, setGroomTime] = useState('');
  const [groomPlace, setGroomPlace] = useState('');

  // Consultation Notes Modal State
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [notesData, setNotesData] = useState({ observations: '', remedies: '', images: [] });

  // Kundali Chart Builder State
  const [selectedReq, setSelectedReq] = useState(null);
  const [chartHouses, setChartHouses] = useState(
    Array.from({ length: 12 }, (_, i) => ({ sign: ((i + 1) % 12) || 12, planets: [] }))
  );
  const [chartType, setChartType] = useState('Janam Kundali');

  // Create Kundali Modal State
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newKundaliData, setNewKundaliData] = useState({ name: '', dob: '', birthTime: '', birthPlace: '', notes: '' });

  // Print/View Modal State
  const [printModalData, setPrintModalData] = useState(null);

  // ── Geolocation: auto-detect on mount ──
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          // Find nearest city or store raw coords
          const { latitude: lat, longitude: lng } = pos.coords;
          const nearest = INDIAN_CITIES.reduce((prev, city) => {
            const d = Math.hypot(city.lat - lat, city.lng - lng);
            return d < Math.hypot(prev.lat - lat, prev.lng - lng) ? city : prev;
          });
          const loc = { lat: nearest.lat, lng: nearest.lng, name: nearest.name };
          setUserLocation(loc);
          localStorage.setItem('admin_location', JSON.stringify(loc));
          setPanchang(calculatePanchang(loc.lat, loc.lng));
        },
        () => {} // silently use default (Varanasi)
      );
    }
  }, []);

  // ── Refresh Panchang every minute ──
  useEffect(() => {
    setPanchang(calculatePanchang(userLocation.lat, userLocation.lng));
    const interval = setInterval(() => {
      setPanchang(calculatePanchang(userLocation.lat, userLocation.lng));
    }, 60000);
    return () => clearInterval(interval);
  }, [userLocation]);

  const handleCreateKundali = async (e) => {
    e.preventDefault();
    try {
      const saved = await publicAPI.requestKundali(newKundaliData);
      setCreateModalOpen(false);
      setNewKundaliData({ name: '', dob: '', birthTime: '', birthPlace: '', notes: '' });
      setKundaliRequests([saved, ...kundaliRequests]);
    } catch (err) {
      alert('Failed to submit Kundali request. Please check inputs and try again.');
    }
  };

  const handleDeleteRequest = async (id) => {
    if (!window.confirm('Are you sure you want to delete this Kundali request?')) return;
    try {
      await adminAPI.deleteKundaliRequest(id);
      setKundaliRequests(kundaliRequests.filter(req => req.id !== id));
    } catch (err) {
      alert('Failed to delete request. Please try again.');
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const promises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(promises).then(base64Images => {
      setNotesData(prev => ({ ...prev, images: [...(prev.images || []), ...base64Images] }));
    });
  };

  const handleRemoveImage = (idx) => {
    setNotesData(prev => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== idx)
    }));
  };

  const fetchData = async (silent = false) => {
    if (!silent) setLoading(true);
    setError('');
    try {
      const appts = await adminAPI.getAppointments();
      const requests = await adminAPI.getKundaliRequests();

      const sorted = appts.sort((a, b) =>
        new Date(b.appointmentDate + 'T' + b.appointmentTime) -
        new Date(a.appointmentDate + 'T' + a.appointmentTime)
      );

      // Auto-cancel any PENDING appointments whose date+time has already passed
      // Auto-complete any CONFIRMED appointments whose date+time has already passed
      const now = new Date();
      const toAutoUpdate = sorted.filter(appt => {
        if (appt.status !== 'PENDING' && appt.status !== 'CONFIRMED') return false;
        const apptDateTime = new Date(appt.appointmentDate + 'T' + appt.appointmentTime);
        return apptDateTime < now;
      });

      if (toAutoUpdate.length > 0) {
        // Fire update requests silently in background
        await Promise.allSettled(
          toAutoUpdate.map(appt => {
            const newStatus = appt.status === 'PENDING' ? 'CANCELLED' : 'COMPLETED';
            return adminAPI.updateAppointmentStatus(appt.id, newStatus);
          })
        );
        // Update local state: mark them CANCELLED/COMPLETED
        sorted.forEach(appt => {
          const match = toAutoUpdate.find(a => a.id === appt.id);
          if (match) {
            appt.status = match.status === 'PENDING' ? 'CANCELLED' : 'COMPLETED';
          }
        });
      }

      setAppointments(sorted);
      setKundaliRequests(requests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        handleLogout();
      } else {
        setError('Failed to load dashboard data. Please reload the page.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData(true);
    }, 5000); // silent refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Re-check every minute: if any PENDING appointment's time has just passed, cancel it live
  useEffect(() => {
    const interval = setInterval(() => {
      setAppointments(prev => {
        const now = new Date();
        const updated = prev.map(appt => {
          if (appt.status !== 'PENDING' && appt.status !== 'CONFIRMED') return appt;
          const apptDateTime = new Date(appt.appointmentDate + 'T' + appt.appointmentTime);
          if (apptDateTime < now) {
            const newStatus = appt.status === 'PENDING' ? 'CANCELLED' : 'COMPLETED';
            // Fire silent update to backend
            adminAPI.updateAppointmentStatus(appt.id, newStatus).catch(() => {});
            return { ...appt, status: newStatus };
          }
          return appt;
        });
        return updated;
      });
    }, 60000); // every minute
    return () => clearInterval(interval);
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await adminAPI.updateAppointmentStatus(id, status);
      setAppointments(appointments.map(appt => 
        appt.id === id ? { ...appt, status } : appt
      ));
    } catch (err) {
      alert('Failed to update status. Please try again.');
    }
  };

  const handleDeleteAppointment = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this appointment?')) return;
    try {
      await adminAPI.deleteAppointment(id);
      setAppointments(appointments.filter(appt => appt.id !== id));
    } catch (err) {
      alert('Failed to delete appointment. Please try again.');
    }
  };

  const handleSaveNotes = async (e) => {
    e.preventDefault();
    if (!selectedAppt) return;
    try {
      const formattedNotes = `Observations:\n${notesData.observations}\n\nSuggested Remedies:\n${notesData.remedies}`;
      const payload = { notes: formattedNotes, images: notesData.images || [] };
      await adminAPI.saveConsultationNotes(selectedAppt.id, payload);
      
      setAppointments(appointments.map(appt => 
        appt.id === selectedAppt.id ? { 
          ...appt, 
          consultationNotes: formattedNotes, 
          remedyImages: JSON.stringify(notesData.images || []), 
          status: 'COMPLETED' 
        } : appt
      ));
      
      // Auto-trigger printable remedy sheet
      generatePrintableRemedy(selectedAppt, { ...notesData, remedyImages: JSON.stringify(notesData.images || []) });
      setSelectedAppt(null);
    } catch (err) {
      alert('Failed to save consultation remedies. Please try again.');
    }
  };

  const generatePrintableRemedy = (appt, notes) => {
    const remedyImages = notes.images || (appt.remedyImages ? JSON.parse(appt.remedyImages) : []);
    setPrintModalData({
      isRemedies: true,
      req: {
        name: appt.customerName,
        dob: appt.appointmentDate,
        birthTime: appt.appointmentTime,
        birthPlace: appt.purpose,
      },
      appt,
      notes,
      remedyImages,
      type: 'Prescribed Remedies'
    });
  };

  const handleChartTypeChange = (type) => {
    setChartType(type);
    if (!selectedReq) return;
    const astroData = calculateAstrologyData(selectedReq.dob, selectedReq.birthTime, selectedReq.birthPlace);
    if (!astroData) return;

    const { lagnaSign, moonSign, planetSigns } = astroData;
    const sunSign = planetSigns['Su'];

    let startSign = lagnaSign;
    if (type === 'Chandra Kundali') {
      startSign = moonSign;
    } else if (type === 'Surya Kundali') {
      startSign = sunSign;
    }

    const newHouses = Array.from({ length: 12 }, (_, i) => {
      const sign = ((startSign + i - 1) % 12) + 1;
      return { sign, planets: [] };
    });

    if (type === 'Chandra Kundali' || type === 'Surya Kundali') {
      newHouses[0].planets.push(type === 'Chandra Kundali' ? 'Mo' : 'Su');
    } else {
      newHouses[0].planets.push('Asc');
    }

    Object.entries(planetSigns).forEach(([planet, sign]) => {
      if (type === 'Chandra Kundali' && planet === 'Mo') return;
      if (type === 'Surya Kundali' && planet === 'Su') return;
      const houseIdx = (sign - startSign + 12) % 12;
      newHouses[houseIdx].planets.push(planet);
    });

    if (type === 'Chandra Kundali' || type === 'Surya Kundali') {
      const ascIdx = (lagnaSign - startSign + 12) % 12;
      if (!newHouses[ascIdx].planets.includes('Asc')) {
        newHouses[ascIdx].planets.push('Asc');
      }
    }

    setChartHouses(newHouses);
  };

  const handlePrintKundali = async () => {
    if (!selectedReq) return;
    try {
      await adminAPI.generateKundaliPdf(selectedReq.id);
      setKundaliRequests(kundaliRequests.map(req => 
        req.id === selectedReq.id ? { ...req, generated: true } : req
      ));
      
      // Open printable Kundali report window
      generatePrintableChart(selectedReq, chartHouses, null, chartType);
      setSelectedReq(null);
    } catch (err) {
      alert('Failed to generate Kundali report. Please try again.');
    }
  };

  const generatePrintableChart = (req, houses, customSvg, type = 'Janam Kundali') => {
    const chartSvg = customSvg || document.getElementById('kundali-svg-preview').outerHTML;
    setPrintModalData({ req, houses, svgString: chartSvg, type });
  };

  const generateSvgString = (houses) => {
    const outerFrame = '<rect x="10" y="10" width="280" height="280" stroke="currentColor" fill="none" stroke-width="2" />';
    const diagonals = '<line x1="10" y1="10" x2="290" y2="290" stroke="currentColor" stroke-width="1.5" /><line x1="10" y1="290" x2="290" y2="10" stroke="currentColor" stroke-width="1.5" />';
    const innerDiamond = '<line x1="150" y1="10" x2="10" y2="150" stroke="currentColor" stroke-width="1.5" /><line x1="10" y1="150" x2="150" y2="290" stroke="currentColor" stroke-width="1.5" /><line x1="150" y1="290" x2="290" y2="150" stroke="currentColor" stroke-width="1.5" /><line x1="290" y1="150" x2="150" y2="10" stroke="currentColor" stroke-width="1.5" />';
    
    let signsText = '';
    signCoords.forEach((coord, idx) => {
      const signVal = isNaN(houses[idx].sign) || houses[idx].sign === '' ? '' : houses[idx].sign;
      signsText += `<text x="${coord.x}" y="${coord.y}" text-anchor="middle" class="font-bold text-[10px]" fill="#b45309" style="font-weight: bold; font-size: 10px; fill: #b45309;">${formatValue(signVal)}</text>`;
    });

    let planetsText = '';
    textCoords.forEach((coord, idx) => {
      const mappedPlanets = houses[idx].planets.map(p => translatePlanet(p));
      const planetsVal = mappedPlanets.join(', ');
      planetsText += `<text x="${coord.x}" y="${coord.y}" text-anchor="middle" class="font-bold text-[9px]" fill="#1e293b" style="font-weight: bold; font-size: 9px; fill: #1e293b;">${planetsVal}</text>`;
    });

    return `
      <svg viewBox="0 0 300 300" class="w-72 h-72 text-orange-600 bg-white border-2 border-orange-200 rounded-2xl shadow-md" style="color: #ea580c; background-color: #fff; border: 2px solid #fed7aa; border-radius: 1rem; width: 100%; height: 100%;">
        ${outerFrame}
        ${diagonals}
        ${innerDiamond}
        ${signsText}
        ${planetsText}
      </svg>
    `;
  };

  const handleGunMilan = (e) => {
    e.preventDefault();
    const result = calculateGunMilan(brideNak, groomNak);
    setMatchingResult(result);
  };

  const handleAutoGunMilan = (e) => {
    e.preventDefault();
    const brideData = calculateAstrologyData(brideDob, brideTime, bridePlace);
    const groomData = calculateAstrologyData(groomDob, groomTime, groomPlace);
    
    if (!brideData || !groomData) {
      alert('Failed to calculate birth details. Please check the date and time values.');
      return;
    }
    
    setBrideNak(brideData.nakshatra);
    setGroomNak(groomData.nakshatra);
    
    const result = calculateGunMilan(brideData.nakshatra, groomData.nakshatra);
    if (result) {
      setMatchingResult({
        ...result,
        autoCalculated: true,
        brideNak: brideData.nakshatra,
        groomNak: groomData.nakshatra
      });
    }
  };

  const calculateGunMilan = (brideN, groomN) => {
    if (!brideN || !groomN) return null;
    const b = NAKSHATRAS_INFO[brideN];
    const g = NAKSHATRAS_INFO[groomN];
    if (!b || !g) return null;

    let score = 0;
    const breakdown = [];

    // Nadi (8 pts)
    if (b.nadi !== g.nadi) {
      score += 8;
      breakdown.push({ name: 'Nadi (Nerve compatibility)', max: 8, obtained: 8, status: 'Match' });
    } else {
      breakdown.push({ name: 'Nadi (Nerve compatibility)', max: 8, obtained: 0, status: 'Nadi Dosha!' });
    }

    // Bhakoot (7 pts)
    const friendlyLordsGroup = ['Sun', 'Moon', 'Jupiter', 'Mars'].includes(b.lord) === ['Sun', 'Moon', 'Jupiter', 'Mars'].includes(g.lord);
    if (friendlyLordsGroup || b.lord === g.lord) {
      score += 7;
      breakdown.push({ name: 'Bhakoot (Moon sign relation)', max: 7, obtained: 7, status: 'Match' });
    } else {
      breakdown.push({ name: 'Bhakoot (Moon sign relation)', max: 7, obtained: 0, status: 'Bhakoot Dosha!' });
    }

    // Gana (6 pts)
    if (b.gana === g.gana) {
      score += 6;
      breakdown.push({ name: 'Gana (Temperament)', max: 6, obtained: 6, status: 'Match' });
    } else if ((b.gana === 'Deva' && g.gana === 'Manushya') || (b.gana === 'Manushya' && g.gana === 'Deva')) {
      score += 5;
      breakdown.push({ name: 'Gana (Temperament)', max: 6, obtained: 5, status: 'Average' });
    } else {
      score += 1;
      breakdown.push({ name: 'Gana (Temperament)', max: 6, obtained: 1, status: 'Conflict' });
    }

    // Graha Maitri (5 pts)
    if (b.lord === g.lord || friendlyLordsGroup) {
      score += 5;
      breakdown.push({ name: 'Graha Maitri (Lord friendship)', max: 5, obtained: 5, status: 'Friendly' });
    } else {
      score += 2;
      breakdown.push({ name: 'Graha Maitri (Lord friendship)', max: 5, obtained: 2, status: 'Neutral' });
    }

    // Yoni (4 pts)
    const yoniMap = { 'Ashwini': 'Horse', 'Bharani': 'Elephant', 'Krittika': 'Sheep', 'Rohini': 'Serpent' };
    if (yoniMap[brideN] === yoniMap[groomN] && yoniMap[brideN]) {
      score += 4;
      breakdown.push({ name: 'Yoni (Physical affinity)', max: 4, obtained: 4, status: 'Excellent' });
    } else {
      score += 2;
      breakdown.push({ name: 'Yoni (Physical affinity)', max: 4, obtained: 2, status: 'Neutral' });
    }

    // Tara (3 pts), Vashya (2 pts), Varna (1 pt) - Standard Approximations
    score += 6;
    breakdown.push({ name: 'Tara, Vashya & Varna', max: 6, obtained: 6, status: 'Friendly Match' });

    let compatibility = 'Average Match';
    if (score >= 25) compatibility = 'Highly Compatible (Good Match)';
    else if (score < 18) compatibility = 'Low Compatibility (Dosha Warning)';

    return { score, breakdown, compatibility };
  };

  const handleHouseSignChange = (idx, signVal) => {
    const updated = [...chartHouses];
    const parsed = parseInt(signVal, 10);
    updated[idx].sign = isNaN(parsed) ? '' : parsed;
    setChartHouses(updated);
  };

  const handleHousePlanetsChange = (idx, planet, checked) => {
    const updated = [...chartHouses];
    if (checked) {
      updated[idx].planets = [...updated[idx].planets, planet];
    } else {
      updated[idx].planets = updated[idx].planets.filter(p => p !== planet);
    }
    setChartHouses(updated);
  };

  const handleLogout = () => {
    localStorage.removeItem('astrology_token');
    navigate('/admin/login');
  };

  // Helper: is appointment's date+time in the past?
  const isApptPast = (appt) => {
    const dt = new Date(appt.appointmentDate + 'T' + appt.appointmentTime);
    return dt < new Date();
  };

  const filteredAppointments = appointments
    .filter(appt => {
      // Hide PENDING appointments whose date+time has passed (they are auto-cancelled)
      if (appt.status === 'PENDING' && isApptPast(appt)) return false;
      if (filterStatus === 'ALL') return true;
      return appt.status === filterStatus;
    });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING':
        return <span className="px-2.5 py-1 inline-flex text-[11px] leading-4 font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-200">{t('pending')}</span>;
      case 'CONFIRMED':
        return <span className="px-2.5 py-1 inline-flex text-[11px] leading-4 font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">{t('confirmed')}</span>;
      case 'COMPLETED':
        return <span className="px-2.5 py-1 inline-flex text-[11px] leading-4 font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-200">{t('completed')}</span>;
      case 'CANCELLED':
        return <span className="px-2.5 py-1 inline-flex text-[11px] leading-4 font-semibold rounded-full bg-rose-50 text-rose-700 border border-rose-200">{t('cancelled')}</span>;
      default:
        return <span className="px-2.5 py-1 inline-flex text-[11px] leading-4 font-semibold rounded-full bg-slate-50 text-slate-700 border border-slate-200">{status}</span>;
    }
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [hour, minute] = timeStr.split(':');
    const d = new Date();
    d.setHours(parseInt(hour, 10), parseInt(minute, 10));
    return formatValue(d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
  };

  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return 'N/A';
    try {
      const d = new Date(dateTimeStr);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      let hours = d.getHours();
      const minutes = String(d.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      return formatValue(`${year}-${month}-${day} ${hours}:${minutes} ${ampm}`);
    } catch (e) {
      return dateTimeStr;
    }
  };

  // Lagna Kundali coordinate calculations for text placement
  const textCoords = [
    { x: 150, y: 80 },   // H1
    { x: 95, y: 55 },    // H2
    { x: 55, y: 95 },    // H3
    { x: 80, y: 150 },   // H4
    { x: 55, y: 205 },   // H5
    { x: 95, y: 245 },   // H6
    { x: 150, y: 220 },  // H7
    { x: 205, y: 245 },  // H8
    { x: 245, y: 205 },  // H9
    { x: 220, y: 150 },  // H10
    { x: 245, y: 95 },   // H11
    { x: 205, y: 55 }    // H12
  ];

  const signCoords = [
    { x: 150, y: 98 },   // H1
    { x: 90, y: 70 },    // H2
    { x: 70, y: 105 },   // H3
    { x: 98, y: 150 },   // H4
    { x: 70, y: 195 },   // H5
    { x: 90, y: 230 },   // H6
    { x: 150, y: 202 },  // H7
    { x: 210, y: 230 },  // H8
    { x: 230, y: 195 },  // H9
    { x: 202, y: 150 },  // H10
    { x: 230, y: 105 },  // H11
    { x: 210, y: 70 }    // H12
  ];

  return (
    <div className={`min-h-screen flex font-sans dashboard-container ${theme === 'dark' ? 'dark-dashboard' : 'bg-slate-50 text-slate-800'}`}>
      <style dangerouslySetInnerHTML={{__html: `
        .sidebar-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .sidebar-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
      {theme === 'dark' && (
        <style dangerouslySetInnerHTML={{__html: `
          .dark-dashboard {
            background-color: #0b0f19 !important;
            color: #f1f5f9 !important;
          }
          .dark-dashboard .bg-white {
            background-color: #0f172a !important;
            border-color: #1e293b !important;
          }
          .dark-dashboard .text-slate-800,
          .dark-dashboard .text-slate-700,
          .dark-dashboard .text-slate-600 {
            color: #cbd5e1 !important;
          }
          .dark-dashboard .text-slate-900 {
            color: #f1f5f9 !important;
          }
          .dark-dashboard .bg-slate-50,
          .dark-dashboard .bg-slate-100 {
            background-color: #1e293b !important;
          }
          .dark-dashboard .bg-slate-50\\/50 {
            background-color: rgba(30, 41, 59, 0.5) !important;
          }
          .dark-dashboard .border-slate-100,
          .dark-dashboard .border-slate-200 {
            border-color: #1e293b !important;
          }
          .dark-dashboard input,
          .dark-dashboard select,
          .dark-dashboard textarea {
            background-color: #1e293b !important;
            color: #f1f5f9 !important;
            border-color: #334155 !important;
          }
          .dark-dashboard table thead th {
            background-color: #1e293b !important;
            color: #cbd5e1 !important;
            border-bottom-color: #334155 !important;
          }
          .dark-dashboard table tbody tr {
            border-bottom-color: #1e293b !important;
          }
          .dark-dashboard table tbody tr:hover {
            background-color: #1e293b !important;
          }
          .dark-dashboard .text-slate-500 {
            color: #94a3b8 !important;
          }
          .dark-dashboard .text-slate-400 {
            color: #cbd5e1 !important;
          }
          .dark-dashboard .border-slate-100 {
            border-color: #1e293b !important;
          }
          .dark-dashboard .bg-emerald-50, .dark-dashboard .bg-emerald-50\\/50 {
            background-color: rgba(16, 185, 129, 0.1) !important;
            color: #34d399 !important;
            border-color: rgba(16, 185, 129, 0.2) !important;
          }
          .dark-dashboard .bg-orange-50 {
            background-color: rgba(249, 115, 22, 0.1) !important;
            color: #fb923c !important;
            border-color: rgba(249, 115, 22, 0.2) !important;
          }
          .dark-dashboard .bg-rose-50 {
            background-color: rgba(244, 63, 94, 0.1) !important;
            color: #fb7185 !important;
            border-color: rgba(244, 63, 94, 0.2) !important;
          }
          .dark-dashboard .bg-amber-50, .dark-dashboard .bg-amber-50\\/50 {
            background-color: rgba(245, 158, 11, 0.1) !important;
            color: #fbbf24 !important;
            border-color: rgba(245, 158, 11, 0.2) !important;
          }
          .dark-dashboard .bg-indigo-50 {
            background-color: rgba(99, 102, 241, 0.1) !important;
            color: #818cf8 !important;
            border-color: rgba(99, 102, 241, 0.2) !important;
          }
          /* Custom overrides for specific elements */
          .dark-dashboard .shadow-md, .dark-dashboard .shadow-xl {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.5) !important;
          }
        `}} />
      )}
      {/* Invisible hover trigger zone at the left edge of the screen */}
      <div 
        className="fixed left-0 top-0 bottom-0 w-3 z-40" 
        onMouseEnter={() => setIsSidebarOpen(true)}
      />

      {/* Backdrop overlay when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Floating Menu Button (Top Left Corner) */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-4 left-4 z-30 p-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white rounded-xl shadow-lg hover:shadow-orange-500/20 transform hover:scale-[1.05] active:scale-[0.98] transition-all flex items-center justify-center border border-white/10 cursor-pointer"
          title="Open Admin Sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Sidebar */}
      <div 
        onMouseLeave={() => setIsSidebarOpen(false)}
        className={`fixed top-0 bottom-0 left-0 w-64 bg-slate-900 text-white flex flex-col border-r border-slate-800 z-50 transition-transform duration-300 ease-in-out overflow-y-auto sidebar-scrollbar ${
          isSidebarOpen ? 'transform translate-x-0 shadow-[5px_0_30px_rgba(0,0,0,0.5)]' : 'transform -translate-x-full'
        }`}
      >
        <div className="p-5 text-center border-b border-slate-800 relative">
          {/* Close button inside sidebar */}
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Hide Sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative mx-auto mb-8 w-20 h-20">
            {/* Sun Spikes Animation around circle */}
            <div className="absolute inset-0 z-0 flex items-center justify-center animate-[spin_15s_linear_infinite] scale-[1.3]">
              {Array.from({ length: 8 }).map((_, i) => (
                <div 
                  key={i} 
                  className="absolute w-1 h-full bg-gradient-to-t from-transparent via-yellow-400 to-transparent opacity-80 shadow-[0_0_8px_rgba(250,204,21,0.8)]" 
                  style={{ transform: `rotate(${i * 22.5}deg)` }}
                ></div>
              ))}
              <div className="absolute w-full h-full rounded-full bg-yellow-400/30 blur-sm scale-90"></div>
            </div>
            
            <div className="relative z-10 w-full h-full bg-white rounded-full shadow-lg shadow-orange-500/20 flex items-center justify-center overflow-hidden border-2 border-orange-100">
              <img 
                src="/logo.png" 
                alt="Shri Pitambara Jyotish Karyalaya Logo" 
                className="relative z-10 w-full h-full object-cover mix-blend-multiply transform scale-[1.3] translate-x-1"
                onError={(e) => {
                  if (e.target.src.endsWith('/logo.png')) {
                    e.target.src = '/logo.png.png';
                  } else {
                    e.target.onerror = null; 
                    e.target.src = "https://via.placeholder.com/150?text=Logo";
                  }
                }}
              />
            </div>
          </div>
          <div className="text-lg font-bold tracking-tight">श्री पीतांबरा ज्योतिष</div>
          <div className="text-xs text-amber-500 font-semibold mt-1 uppercase tracking-widest">{t('adminControl')}</div>
        </div>
        
        {/* Panchang Widget inside Sidebar */}
        <div className="p-4 mx-4 my-3 bg-slate-800/50 border border-slate-700/50 rounded-xl space-y-2">
          <div className="text-[11px] font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> {t('livePanchang')}
          </div>
          {/* Location badge */}
          <div className="flex items-center gap-1 text-[10px] text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span className="text-orange-300 font-semibold">{userLocation.name}</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-300">
            <div><strong>{t('tithiLabel')}:</strong> {translateTithi(panchang.tithi)}</div>
            <div><strong>{t('starLabel')}:</strong> {translateNakshatra(panchang.nakshatra)}</div>
            <div className="col-span-2 flex gap-3 border-t border-slate-700/50 my-1 pt-1">
              <span>🌅 <strong className="text-amber-400">{language === 'hi' ? 'उदय' : 'Rise'}:</strong> {formatValue(panchang.sunrise)}</span>
              <span>🌇 <strong className="text-indigo-400">{language === 'hi' ? 'अस्त' : 'Set'}:</strong> {formatValue(panchang.sunset)}</span>
            </div>
            <div className="col-span-2 border-t border-slate-700/50 pt-1">
              <strong className="text-rose-400">{t('rahuKaalLabel')}:</strong> {formatValue(panchang.rahuKaal)}
            </div>
            <div className="col-span-2">
              <strong className="text-emerald-400">{t('abhijitLabel')}:</strong> {formatValue(panchang.abhijitMuhurta)}
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => { setActiveTab('appointments'); setMatchingResult(null); }}
            className={`w-full flex items-center p-3 rounded-lg font-semibold transition-all text-sm ${
              activeTab === 'appointments' 
              ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-md' 
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Calendar className="mr-3 w-4 h-4" /> {t('appointments')}
          </button>
          <button
            onClick={() => { setActiveTab('kundali'); setMatchingResult(null); }}
            className={`w-full flex items-center p-3 rounded-lg font-semibold transition-all text-sm ${
              activeTab === 'kundali' 
              ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-md' 
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <FileText className="mr-3 w-4 h-4" /> {t('kundaliRequests')}
          </button>
          <button
            onClick={() => { setActiveTab('gun_milan'); setMatchingResult(null); }}
            className={`w-full flex items-center p-3 rounded-lg font-semibold transition-all text-sm ${
              activeTab === 'gun_milan' 
              ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-md' 
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Star className="mr-3 w-4 h-4" /> {t('gunMilan')}
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-1">
          {/* Profile button — icon + short label, stacked above Logout */}
          <button
            onClick={() => setProfileOpen(true)}
            className="flex items-center gap-2 text-slate-400 hover:text-white font-semibold transition-colors w-full p-2.5 hover:bg-slate-700/50 rounded-lg text-sm"
          >
            <User className="w-4 h-4 shrink-0" />
            <span className="text-xs font-bold tracking-wide">Profile</span>
          </button>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-rose-400 hover:text-rose-300 font-semibold transition-colors w-full p-2.5 hover:bg-rose-500/10 rounded-lg text-sm"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>{t('logout')}</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 pl-16 sm:pl-20 overflow-y-auto transition-all duration-300">
        {error && (
          <div className="mb-6 p-4 bg-rose-50 border-l-4 border-rose-500 text-rose-700 rounded-r-xl font-medium">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <svg className="animate-spin h-10 w-10 text-orange-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <span className="text-slate-500 font-medium">Fetching celestial bookings...</span>
          </div>
        ) : (
          <div>
            {activeTab === 'appointments' && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                  <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">{t('appointmentsList')}</h1>
                  
                  {/* Status Filters */}
                  <div className="flex flex-wrap gap-1.5">
                    {['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                          filterStatus === status
                          ? 'bg-slate-800 text-white border-transparent'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {t(status.toLowerCase())}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100">
                      <thead className="bg-slate-50/50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">{t('customer')}</th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">{t('purpose')}</th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">{t('dateTime')}</th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">{t('bookingDateTime')}</th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">{t('status')}</th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">{t('action')}</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-100">
                        {filteredAppointments.length > 0 ? filteredAppointments.map((appt) => (
                          <tr key={appt.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-4 py-3">
                              <div className="text-xs font-bold text-slate-800">{appt.customerName}</div>
                              <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                                <Phone className="w-3 h-3 text-slate-400" /> {appt.phone}
                              </div>
                              <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                                <Mail className="w-3 h-3 text-slate-400" /> {appt.email}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              {(() => {
                                const { base, poojaType, samagri } = parsePurpose(appt.purpose);
                                return (
                                  <div className="space-y-1">
                                    {/* Base purpose */}
                                    <div className="text-xs font-bold text-slate-700">
                                      {translatePurpose(base || appt.purpose)}
                                    </div>
                                    {/* Pooja type badge */}
                                    {poojaType && (
                                      <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-50 border border-orange-200 rounded-full">
                                        <span className="text-[10px] text-orange-600 font-semibold">🪔 {poojaType}</span>
                                      </div>
                                    )}
                                    {/* Samagri badge */}
                                    {samagri && (
                                      <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border ${
                                        samagri.includes('Without')
                                          ? 'bg-rose-50 border-rose-200'
                                          : 'bg-emerald-50 border-emerald-200'
                                      }`}>
                                        <span className={`text-[10px] font-semibold ${
                                          samagri.includes('Without') ? 'text-rose-600' : 'text-emerald-600'
                                        }`}>
                                          {samagri.includes('Without') ? '🧺 ' : '✅ '}{samagri}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                );
                              })()}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="text-xs font-bold text-slate-700">{appt.appointmentDate}</div>
                              <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-slate-400" /> {formatTime(appt.appointmentTime)}
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="text-xs font-medium text-slate-600">
                                {appt.createdAt ? formatDateTime(appt.createdAt) : 'N/A'}
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              {getStatusBadge(appt.status)}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                              <div className="flex gap-1.5 items-center">
                                {appt.status === 'PENDING' && (
                                  <>
                                    <button 
                                      onClick={() => handleStatusUpdate(appt.id, 'CONFIRMED')}
                                      className="p-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
                                      title="Confirm Booking"
                                    >
                                      <Check className="w-3.5 h-3.5" />
                                    </button>
                                    <button 
                                      onClick={() => handleStatusUpdate(appt.id, 'CANCELLED')}
                                      className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors"
                                      title="Cancel Booking"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </>
                                )}
                                {appt.status === 'CONFIRMED' && (
                                  <>
                                    <button 
                                      onClick={() => {
                                        setSelectedAppt(appt);
                                        setNotesData({ observations: '', remedies: '', images: [] });
                                      }}
                                      className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors flex items-center gap-1"
                                      title="Write Remedies & Complete"
                                    >
                                      <Edit className="w-3.5 h-3.5" /> <span className="text-[10px]">{t('remedies')}</span>
                                    </button>
                                    <button 
                                      onClick={() => handleStatusUpdate(appt.id, 'CANCELLED')}
                                      className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors"
                                      title="Cancel Booking"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </>
                                )}
                                {(appt.status === 'COMPLETED' || appt.status === 'CANCELLED') && (
                                  <div className="flex items-center gap-2">
                                    {appt.consultationNotes && (
                                      <button 
                                        onClick={() => {
                                          const lines = appt.consultationNotes.split('\n\n');
                                          const obs = lines[0]?.replace('Observations:\n', '') || '';
                                          const rem = lines[1]?.replace('Suggested Remedies:\n', '') || '';
                                          generatePrintableRemedy(appt, { observations: obs, remedies: rem, images: appt.remedyImages ? JSON.parse(appt.remedyImages) : [] });
                                        }}
                                        className="text-[11px] font-bold text-amber-600 hover:underline"
                                      >
                                        {t('reprintPdf')}
                                      </button>
                                    )}
                                  </div>
                                )}
                                <button 
                                  onClick={() => handleDeleteAppointment(appt.id)}
                                  className="p-1.5 bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-600 border border-slate-200 hover:border-rose-200 rounded-lg transition-colors ml-2"
                                  title="Delete Appointment"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )) : (
                          <tr>
                            <td colSpan="6" className="px-4 py-8 text-center text-slate-400 font-medium text-xs">
                              {t('noAppointmentsFound')}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'kundali' && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                  <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">{t('kundaliRequestsList')}</h1>
                  <button
                    onClick={() => {
                      setCreateModalOpen(true);
                      setNewKundaliData({ name: '', dob: '', birthTime: '', birthPlace: '', notes: '' });
                    }}
                    className="py-2 px-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-xl transition-all shadow-md hover:-translate-y-0.5 active:translate-y-0 text-xs flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> {t('createNewKundali')}
                  </button>
                </div>
                
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100">
                      <thead className="bg-slate-50/50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">{t('user')}</th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">{t('birthDetails')}</th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">{t('notes')}</th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">{t('status')}</th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">{t('action')}</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-100">
                        {kundaliRequests.length > 0 ? kundaliRequests.map((req) => (
                          <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="text-xs font-bold text-slate-800">{req.name}</div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="text-xs text-slate-700">
                                <strong>{t('dateOfBirth')}:</strong> {req.dob}
                              </div>
                              <div className="text-[11px] text-slate-500 mt-1">
                                <strong>{t('birthTime')}:</strong> {formatTime(req.birthTime)}
                              </div>
                              <div className="text-[11px] text-slate-500 mt-0.5">
                                <strong>{t('birthPlace')}:</strong> {req.birthPlace}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="text-xs text-slate-600 max-w-xs truncate" title={req.notes}>
                                {req.notes || <span className="italic text-slate-400">No notes</span>}
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              {req.generated ? (
                                <span className="px-2.5 py-1 inline-flex text-[11px] leading-4 font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">{t('completed')}</span>
                              ) : (
                                <span className="px-2.5 py-1 inline-flex text-[11px] leading-4 font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-200">{t('pending')}</span>
                              )}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                              <div className="flex gap-2 items-center">
                                <button 
                                  onClick={() => {
                                    setSelectedReq(req);
                                    setChartType('Janam Kundali');
                                    const astroData = calculateAstrologyData(req.dob, req.birthTime, req.birthPlace);
                                    if (astroData) {
                                      const { lagnaSign, planetSigns } = astroData;
                                      const newHouses = Array.from({ length: 12 }, (_, i) => {
                                        const sign = ((lagnaSign + i - 1) % 12) + 1;
                                        return { sign, planets: [] };
                                      });
                                      newHouses[0].planets.push('Asc');
                                      Object.entries(planetSigns).forEach(([planet, sign]) => {
                                        const houseIdx = (sign - lagnaSign + 12) % 12;
                                        newHouses[houseIdx].planets.push(planet);
                                      });
                                      setChartHouses(newHouses);
                                    } else {
                                      setChartHouses(Array.from({ length: 12 }, (_, i) => ({ sign: ((i + 1) % 12) || 12, planets: [] })));
                                    }
                                  }}
                                  className="py-1.5 px-3 bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-700 font-bold rounded-xl transition-all shadow-sm hover:shadow text-xs"
                                >
                                  {req.generated ? t('rebuildKundali') : t('generateKundali')}
                                </button>
                                {req.generated && (
                                  <button 
                                    onClick={() => {
                                      const astroData = calculateAstrologyData(req.dob, req.birthTime, req.birthPlace);
                                      if (astroData) {
                                        const { lagnaSign, planetSigns } = astroData;
                                        const newHouses = Array.from({ length: 12 }, (_, i) => {
                                          const sign = ((lagnaSign + i - 1) % 12) + 1;
                                          return { sign, planets: [] };
                                        });
                                        newHouses[0].planets.push('Asc');
                                        Object.entries(planetSigns).forEach(([planet, sign]) => {
                                          const houseIdx = (sign - lagnaSign + 12) % 12;
                                          newHouses[houseIdx].planets.push(planet);
                                        });
                                        const svgString = generateSvgString(newHouses);
                                        generatePrintableChart(req, newHouses, svgString);
                                      }
                                    }}
                                    className="py-1.5 px-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-bold rounded-xl transition-all shadow-sm hover:shadow text-xs"
                                  >
                                    {t('view')}
                                  </button>
                                )}
                                <button 
                                  onClick={() => handleDeleteRequest(req.id)}
                                  className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors"
                                  title={t('deleteRequest')}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )) : (
                          <tr>
                            <td colSpan="5" className="px-4 py-8 text-center text-slate-400 font-medium text-xs">
                              {t('noRequestsFound')}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Gun Milan Matching Tab UI */}
            {activeTab === 'gun_milan' && (
              <div className="max-w-4xl mx-auto animate-in fade-in duration-300">
                <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight mb-6">{t('kundaliMilanTitle')}</h1>
                
                {/* Method Toggles */}
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => { setMatchingMethod('manual'); setMatchingResult(null); }}
                    className={`py-2 px-4 rounded-xl text-xs font-bold transition-all border ${
                      matchingMethod === 'manual'
                      ? 'bg-slate-800 text-white border-transparent'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {t('selectNakshatrasManually')}
                  </button>
                  <button
                    onClick={() => { setMatchingMethod('auto'); setMatchingResult(null); }}
                    className={`py-2 px-4 rounded-xl text-xs font-bold transition-all border ${
                      matchingMethod === 'auto'
                      ? 'bg-slate-800 text-white border-transparent'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {t('enterBirthDetailsAuto')}
                  </button>
                </div>

                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
                  {matchingMethod === 'manual' ? (
                    <form onSubmit={handleGunMilan} className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-3">
                        <h3 className="text-sm font-bold text-rose-500 uppercase tracking-wider">{t('brideKanya')}</h3>
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1">{t('moonStarNakshatra')}</label>
                          <select 
                            required 
                            value={brideNak} 
                            onChange={(e) => setBrideNak(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-500/20"
                          >
                            <option value="">{t('selectNakshatra')}</option>
                            {Object.keys(NAKSHATRAS_INFO).map(nak => (
                              <option key={nak} value={nak}>{translateNakshatra(nak)}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-sm font-bold text-blue-500 uppercase tracking-wider">{t('groomVara')}</h3>
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1">{t('moonStarNakshatra')}</label>
                          <select 
                            required 
                            value={groomNak} 
                            onChange={(e) => setGroomNak(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-500/20"
                          >
                            <option value="">{t('selectNakshatra')}</option>
                            {Object.keys(NAKSHATRAS_INFO).map(nak => (
                              <option key={nak} value={nak}>{translateNakshatra(nak)}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="sm:col-span-2 pt-2">
                        <button 
                          type="submit"
                          className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold text-sm rounded-xl shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0"
                        >
                          {t('calculateMatching')}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <form onSubmit={handleAutoGunMilan} className="space-y-6 mb-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Bride Birth Details Form */}
                        <div className="space-y-4 p-5 bg-rose-50/20 border border-rose-100 rounded-2xl">
                          <h3 className="text-sm font-bold text-rose-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Star className="w-4 h-4 text-rose-500" /> {t('brideKanya')} Details
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="block text-xs font-semibold text-slate-600">{t('dateOfBirth')}</label>
                              <input 
                                required 
                                type="date" 
                                value={brideDob} 
                                onChange={(e) => setBrideDob(e.target.value)}
                                className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-rose-500/20"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-xs font-semibold text-slate-600">{t('birthTime')}</label>
                              <input 
                                required 
                                type="time" 
                                value={brideTime} 
                                onChange={(e) => setBrideTime(e.target.value)}
                                className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-rose-500/20"
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="block text-xs font-semibold text-slate-600">{t('birthPlace')}</label>
                            <input 
                              required 
                              type="text" 
                              value={bridePlace} 
                              onChange={(e) => setBridePlace(e.target.value)}
                              placeholder="e.g. Mumbai, India"
                              className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-rose-500/20"
                            />
                          </div>
                        </div>

                        {/* Groom Birth Details Form */}
                        <div className="space-y-4 p-5 bg-blue-50/20 border border-blue-100 rounded-2xl">
                          <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Star className="w-4 h-4 text-blue-500" /> {t('groomVara')} Details
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="block text-xs font-semibold text-slate-600">{t('dateOfBirth')}</label>
                              <input 
                                required 
                                type="date" 
                                value={groomDob} 
                                onChange={(e) => setGroomDob(e.target.value)}
                                className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-blue-500/20"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-xs font-semibold text-slate-600">{t('birthTime')}</label>
                              <input 
                                required 
                                type="time" 
                                value={groomTime} 
                                onChange={(e) => setGroomTime(e.target.value)}
                                className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-blue-500/20"
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="block text-xs font-semibold text-slate-600">{t('birthPlace')}</label>
                            <input 
                              required 
                              type="text" 
                              value={groomPlace} 
                              onChange={(e) => setGroomPlace(e.target.value)}
                              placeholder="e.g. New Delhi, India"
                              className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-blue-500/20"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button 
                          type="submit"
                          className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold text-sm rounded-xl shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0"
                        >
                          {t('calculateMatching')}
                        </button>
                      </div>
                    </form>
                  )}

                  {matchingResult && (
                    <div className="border-t border-slate-100 pt-6 animate-in fade-in slide-in-from-top-2 duration-300">
                      {matchingResult.autoCalculated && (
                        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-800 font-semibold text-center flex items-center justify-center gap-1">
                          {t('autoCalculatedMoonStars')} <strong>{matchingResult.brideNak}</strong> | {t('groomVara')} = <strong>{matchingResult.groomNak}</strong>
                        </div>
                      )}
                      <div className="text-center mb-6">
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t('totalMatchPoints')}</div>
                        <div className="text-5xl font-black text-orange-600 mt-2">{formatValue(matchingResult.score)} <span className="text-2xl text-slate-400">/ {formatValue(36)}</span></div>
                        <div className="mt-3 text-sm font-bold text-slate-800">{getCompatibilityText(matchingResult.compatibility)}</div>
                      </div>

                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">{t('ashtakootaBreakdown')}</h4>
                        <div className="space-y-3">
                          {matchingResult.breakdown.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center text-xs">
                              <div className="font-medium text-slate-700">{getBreakdownName(item.name)}</div>
                              <div className="flex items-center gap-3">
                                <span className={item.obtained === 0 ? "text-rose-500 font-bold" : "text-emerald-600"}>
                                  {getBreakdownStatus(item.status)}
                                </span>
                                <span className="font-bold text-slate-600">{formatValue(item.obtained)} / {formatValue(item.max)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 1. Consultation Notes Modal */}
      {selectedAppt && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="bg-slate-950 p-6 text-white flex justify-between items-center border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold">Write Consultation Remedies</h3>
                <p className="text-xs text-slate-400 mt-1">Yajman: {selectedAppt.customerName}</p>
              </div>
              <button onClick={() => setSelectedAppt(null)} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSaveNotes} className="p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Planetary Observations</label>
                <textarea
                  required
                  rows="4"
                  value={notesData.observations}
                  onChange={(e) => setNotesData({ ...notesData, observations: e.target.value })}
                  placeholder="Enter planetary combinations (e.g., Mahadasha, Ascendant observations)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-500/20"
                ></textarea>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Suggested Remedies & Mantras</label>
                <textarea
                  required
                  rows="4"
                  value={notesData.remedies}
                  onChange={(e) => setNotesData({ ...notesData, remedies: e.target.value })}
                  placeholder="Enter remedies (e.g., Fasting, Mantras, Pujas, Gemstones)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-500/20"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Attach Remedy Photos (Yantras, Gemstones, Pooja setups)</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer"
                />
                
                {notesData.images && notesData.images.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-3 border border-slate-100 p-3 rounded-2xl bg-slate-50/50 animate-in fade-in duration-200">
                    {notesData.images.map((img, idx) => (
                      <div key={idx} className="relative w-16 h-16 rounded-xl border border-slate-200 overflow-hidden group">
                        <img src={img} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedAppt(null)}
                  className="py-2.5 px-5 border border-slate-200 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-xl text-sm shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                  Save, Print & Email Remedies
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Streamlined Lagna Kundali Chart Type Selection & Generator Modal */}
      {selectedReq && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-100 p-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-md font-bold text-slate-800">Generate Kundali Report</h3>
                <p className="text-xs text-slate-400 mt-0.5">Yajman: {selectedReq.name}</p>
              </div>
              <button onClick={() => setSelectedReq(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Select Kundali Chart Type</label>
                <select 
                  value={chartType}
                  onChange={(e) => setChartType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all cursor-pointer"
                >
                  <option value="Janam Kundali">Janam Kundali (Birth Chart)</option>
                  <option value="Lagna Kundali">Lagna Kundali (Ascendant Chart)</option>
                  <option value="Chandra Kundali">Chandra Kundali (Moon Chart)</option>
                  <option value="Surya Kundali">Surya Kundali (Sun Chart)</option>
                  <option value="Vivah Kundali">Vivah Kundali (Marriage Match)</option>
                  <option value="Prashna Kundali">Prashna Kundali (Question Chart)</option>
                  <option value="Varshaphal Kundali">Varshaphal Kundali (Annual Chart)</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setSelectedReq(null)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-2xl transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    const req = selectedReq;
                    const type = chartType;
                    const astroData = calculateAstrologyData(req.dob, req.birthTime, req.birthPlace);
                    if (!astroData) {
                      alert('Failed to calculate birth details. Please check values.');
                      return;
                    }
                    
                    const { lagnaSign, moonSign, planetSigns } = astroData;
                    const sunSign = planetSigns['Su'];
                    
                    let startSign = lagnaSign;
                    if (type === 'Chandra Kundali') {
                      startSign = moonSign;
                    } else if (type === 'Surya Kundali') {
                      startSign = sunSign;
                    }

                    const newHouses = Array.from({ length: 12 }, (_, i) => {
                      const sign = ((startSign + i - 1) % 12) + 1;
                      return { sign, planets: [] };
                    });

                    if (type === 'Chandra Kundali' || type === 'Surya Kundali') {
                      newHouses[0].planets.push(type === 'Chandra Kundali' ? 'Mo' : 'Su');
                    } else {
                      newHouses[0].planets.push('Asc');
                    }

                    Object.entries(planetSigns).forEach(([planet, sign]) => {
                      if (type === 'Chandra Kundali' && planet === 'Mo') return;
                      if (type === 'Surya Kundali' && planet === 'Su') return;
                      const houseIdx = (sign - startSign + 12) % 12;
                      newHouses[houseIdx].planets.push(planet);
                    });

                    try {
                      await adminAPI.generateKundaliPdf(req.id);
                      setKundaliRequests(kundaliRequests.map(r => 
                        r.id === req.id ? { ...r, generated: true } : r
                      ));
                      
                      const svgString = generateSvgString(newHouses);
                      generatePrintableChart(req, newHouses, svgString, type);
                      setSelectedReq(null);
                    } catch (err) {
                      alert('Failed to generate Kundali. Please try again.');
                    }
                  }}
                  className="flex-1 py-3 bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold rounded-2xl transition-all shadow-md hover:shadow-lg"
                >
                  Generate & Print
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Create New Kundali Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border animate-in zoom-in-95 duration-200 ${
            theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
          }`}>
            <div className={`p-6 text-white flex justify-between items-center border-b ${
              theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-950 border-slate-800'
            }`}>
              <div>
                <h3 className="text-lg font-bold text-white">{t('createNewJanamKundali')}</h3>
                <p className="text-xs text-slate-400 mt-1">{t('enterBirthDetailsSubtitle')}</p>
              </div>
              <button onClick={() => setCreateModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleCreateKundali} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className={`text-xs font-bold uppercase tracking-wider block ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>{t('yajmanName')}</label>
                <input
                  type="text"
                  required
                  value={newKundaliData.name}
                  onChange={(e) => setNewKundaliData({ ...newKundaliData, name: e.target.value })}
                  placeholder={t('yajmanNamePlaceholder')}
                  className={`w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-500/20 ${
                    theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={`text-xs font-bold uppercase tracking-wider block ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>{t('dateOfBirth')}</label>
                  <input
                    type="date"
                    required
                    value={newKundaliData.dob}
                    onChange={(e) => setNewKundaliData({ ...newKundaliData, dob: e.target.value })}
                    className={`w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-500/20 ${
                      theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className={`text-xs font-bold uppercase tracking-wider block ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>{t('birthTime')}</label>
                  <input
                    type="time"
                    required
                    value={newKundaliData.birthTime}
                    onChange={(e) => setNewKundaliData({ ...newKundaliData, birthTime: e.target.value })}
                    className={`w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-500/20 ${
                      theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className={`text-xs font-bold uppercase tracking-wider block ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>{t('birthPlace')}</label>
                <input
                  type="text"
                  required
                  value={newKundaliData.birthPlace}
                  onChange={(e) => setNewKundaliData({ ...newKundaliData, birthPlace: e.target.value })}
                  placeholder={t('birthPlacePlaceholder')}
                  className={`w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-500/20 ${
                    theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className={`text-xs font-bold uppercase tracking-wider block ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>{t('consultationNotesQuestion')}</label>
                <textarea
                  rows="3"
                  value={newKundaliData.notes}
                  onChange={(e) => setNewKundaliData({ ...newKundaliData, notes: e.target.value })}
                  placeholder={t('consultationNotesPlaceholder')}
                  className={`w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-500/20 ${
                    theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className={`py-2.5 px-5 border font-bold rounded-xl text-sm hover:bg-slate-50 transition-all ${
                    theme === 'dark' ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-xl text-sm shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                  {t('submitDetails')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Print / View Modal (On-Page Same Window View) */}
      {printModalData && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 overflow-y-auto">
          <style dangerouslySetInnerHTML={{__html: `
            @media print {
              .dashboard-container {
                display: none !important;
              }
              .no-print {
                display: none !important;
              }
              body {
                background: white !important;
                margin: 0 !important;
                padding: 0 !important;
              }
              .print-modal-box {
                box-shadow: none !important;
                border: none !important;
                width: 100% !important;
                max-width: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
              }
            }
          `}} />
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-100 my-8 p-6 print-modal-box flex flex-col">
            {/* Modal Header (No Print) */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6 no-print">
              <div>
                <h3 className="text-md font-bold text-slate-800">
                  {printModalData.isRemedies ? t('viewRemediesSheet') : t('viewKundaliReport')}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{t('yajman')}: {printModalData.req.name}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="py-1.5 px-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" /> {printModalData.isRemedies ? t('printRemedies') : t('printChart')}
                </button>
                <button 
                  onClick={() => setPrintModalData(null)} 
                  className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-all flex items-center gap-1.5"
                >
                  <X className="w-3.5 h-3.5" /> Exit
                </button>
              </div>
            </div>

            {/* Printable Area */}
            <div className="flex-1 overflow-y-auto flex flex-col items-center text-center p-4">
              <div className="w-full border-b-2 border-double border-orange-500 pb-4 mb-6 text-center">
                <h2 className="text-2xl font-bold text-orange-600">श्री पीतांबरा ज्योतिष कार्यालय</h2>
                <p className="text-xs font-semibold text-amber-600 uppercase tracking-widest mt-1">{printModalData.type} Report</p>
              </div>

              <div className="w-full max-w-lg bg-amber-50/50 border border-amber-200 rounded-2xl p-4 grid grid-cols-2 gap-3 text-left mb-6 text-slate-700 text-xs font-medium">
                <div><strong>{printModalData.isRemedies ? t('yajmanClient') : t('name')}:</strong> {printModalData.req.name}</div>
                <div><strong>{printModalData.isRemedies ? t('date') : t('dateOfBirth')}:</strong> {formatValue(printModalData.req.dob)}</div>
                <div><strong>{t('time')}:</strong> {formatTime(printModalData.req.birthTime)}</div>
                <div><strong>{printModalData.isRemedies ? t('purpose') : t('birthPlace')}:</strong> {translatePurpose(printModalData.req.birthPlace)}</div>
              </div>

              {printModalData.isRemedies ? (
                <div className="w-full text-left flex flex-col gap-6">
                  <div>
                    <h4 className="text-sm font-bold text-orange-600 border-l-4 border-orange-500 pl-2 mb-2 uppercase tracking-wider">
                      {t('panditObservations')}
                    </h4>
                    <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 whitespace-pre-wrap">
                      {printModalData.notes.observations || 'N/A'}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-orange-600 border-l-4 border-orange-500 pl-2 mb-2 uppercase tracking-wider">
                      {t('prescribedRemedies')}
                    </h4>
                    <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 whitespace-pre-wrap">
                      {printModalData.notes.remedies || 'N/A'}
                    </div>
                  </div>

                  {printModalData.remedyImages && printModalData.remedyImages.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold text-orange-600 border-l-4 border-orange-500 pl-2 mb-2 uppercase tracking-wider">
                        {t('remedyReferenceImages')}
                      </h4>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        {printModalData.remedyImages.map((img, idx) => (
                          <img 
                            key={idx} 
                            src={img} 
                            alt={`Remedy Reference ${idx + 1}`}
                            className="w-full h-36 object-cover rounded-xl border border-slate-200 shadow-sm"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-8 text-right font-bold text-orange-600 text-sm">
                    {t('panditName')}<br/>
                    <span className="text-slate-300 font-normal">__________________</span>
                  </div>
                </div>
              ) : (
                <>
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">{t('lagnaKundali')}</h4>

                  <div 
                    className="w-80 h-80 text-orange-600 mb-6 flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: printModalData.svgString }}
                  />
                </>
              )}

              <div className="w-full border-t border-slate-100 pt-4 mt-6 text-center text-[10px] text-slate-400">
                {t('footerText')}
              </div>
            </div>

            {/* Modal Footer (No Print) */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 no-print mt-2">
              <button
                onClick={() => setPrintModalData(null)}
                className="py-2 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-all flex items-center gap-1.5"
              >
                <X className="w-4 h-4" /> {t('close')}
              </button>
              <button
                onClick={() => window.print()}
                className="py-2 px-5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" /> {printModalData.isRemedies ? t('printRemedies') : t('printChart')}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* 5. Profile & Settings Modal */}
      {profileOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
          <div className={`rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border transition-all ${
            theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
          }`}>
            {/* Modal Header */}
            <div className={`p-6 flex justify-between items-center border-b ${
              theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'
            }`}>
              <div>
                <h3 className="text-lg font-bold">{t('profileSettings')}</h3>
                <p className="text-xs text-slate-400 mt-1">Manage your dashboard preferences</p>
              </div>
              <button 
                onClick={() => setProfileOpen(false)} 
                className="p-1.5 hover:bg-slate-200/20 rounded-xl transition-colors text-slate-400 hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Profile Details Card */}
              <div className={`flex items-center gap-4 p-4 rounded-2xl border ${
                theme === 'dark' ? 'bg-slate-950/40 border-slate-800' : 'bg-amber-50/50 border-amber-100'
              }`}>
                <div className="w-14 h-14 bg-gradient-to-tr from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  PP
                </div>
                <div>
                  <h4 className="font-bold text-sm">Karmyogi Pandit Priyashankar Pandey</h4>
                  <p className="text-xs text-amber-600 font-semibold uppercase tracking-wider mt-0.5">Head Astrologer</p>
                  <p className="text-[10px] text-slate-400 mt-1">priyeshankarpanday@gmail.com</p>
                </div>
              </div>

              {/* Preferences Settings */}
              <div className="space-y-4">
                {/* Location Picker */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {language === 'hi' ? 'पंचांग स्थान' : 'Panchang Location'}
                  </label>
                  <select
                    value={userLocation.name}
                    onChange={(e) => {
                      const city = INDIAN_CITIES.find(c => c.name === e.target.value);
                      if (city) {
                        const loc = { lat: city.lat, lng: city.lng, name: city.name };
                        setUserLocation(loc);
                        localStorage.setItem('admin_location', JSON.stringify(loc));
                      }
                    }}
                    className={`w-full border rounded-xl p-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all cursor-pointer ${
                      theme === 'dark'
                        ? 'bg-slate-800 border-slate-700 text-slate-200'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    {INDIAN_CITIES.map(city => (
                      <option key={city.name} value={city.name}>{city.name}</option>
                    ))}
                  </select>
                  <p className="text-[10px] text-slate-500">{language === 'hi' ? 'राहु काल और अभिजित मुहूर्त इस स्थान के अनुसार बदलेंगे' : 'Rahu Kaal & Abhijit Muhurta adjust to this city'}</p>
                </div>
                {/* Language Select */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">{t('language')}</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setLanguage('en');
                        localStorage.setItem('admin_lang', 'en');
                      }}
                      className={`py-2 px-4 rounded-xl border text-xs font-bold transition-all ${
                        language === 'en'
                          ? 'bg-orange-600 border-orange-600 text-white shadow-md'
                          : theme === 'dark'
                            ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('hi');
                        localStorage.setItem('admin_lang', 'hi');
                      }}
                      className={`py-2 px-4 rounded-xl border text-xs font-bold transition-all ${
                        language === 'hi'
                          ? 'bg-orange-600 border-orange-600 text-white shadow-md'
                          : theme === 'dark'
                            ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      हिन्दी (Hindi)
                    </button>
                  </div>
                </div>

                {/* Theme Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">{t('theme')}</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setTheme('light');
                        localStorage.setItem('admin_theme', 'light');
                      }}
                      className={`py-2 px-4 rounded-xl border text-xs font-bold transition-all ${
                        theme === 'light'
                          ? 'bg-orange-600 border-orange-600 text-white shadow-md'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {t('lightMode')}
                    </button>
                    <button
                      onClick={() => {
                        setTheme('dark');
                        localStorage.setItem('admin_theme', 'dark');
                      }}
                      className={`py-2 px-4 rounded-xl border text-xs font-bold transition-all ${
                        theme === 'dark'
                          ? 'bg-orange-600 border-orange-600 text-white shadow-md'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {t('darkMode')}
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AstrologerDashboard;
