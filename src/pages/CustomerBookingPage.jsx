import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, CheckCircle, Sparkles, Phone, Mail, BookOpen, ChevronDown, Star, Quote, MapPin } from 'lucide-react';
import { publicAPI } from '../services/api';

const TRANSLATIONS = {
  en: {
    shriPitambara: "Shri Pitambara",
    jyotishKaryalaya: "Jyotish Karyalaya",
    welcome: '"Welcome to Shri Pitambara Jyotish Karyalaya!"',
    subtitle: "Consult our esteemed pandit ji to discover cosmic insights and find auspicious paths for your life's journey.",
    welcomeSubtitle: "We are committed to helping you find solutions to your astrological concerns and questions. Step into the light of cosmic awareness.",
    forBookingScrollDown: "For Booking Scroll Down",
    pleaseSelectPurpose: "Please select a purpose first.",
    appointmentsAvailable: "Appointments available for {year} only.",
    availableTimes: "Available Times (IST)",
    selectPoojaPlaceholder: "Select Pooja Type...",
    selectKundaliPlaceholder: "Select Kundali Type...",
    selectVivahPlaceholder: "Select Vivah Pooja Type...",
    step1: "Step 1: Choose Your Consultation Date",
    step2: "Step 2: Select an Available Time Slot",
    noSlots: "No slots available for this date.",
    tryAnother: "Please try selecting another day.",
    contactAstro: "Contact Astrologer",
    chiefAstro: "Chief Astrologer",
    mobileNum: "Mobile Number",
    emailAddr: "Email Address",
    yourInfo: "Your Information",
    fullName: "Full Name",
    purpose: "Purpose of Consultation",
    poojaType: "Type of Pooja",
    samagriPref: "Samagri Preference",
    withSamagri: "With Samagri",
    withoutSamagri: "Without Samagri",
    pleaseNote: "Please Note:",
    contactPandit: "You have chosen to arrange the Samagri yourself. Please contact Pandit ji directly to get the exact list of ingredients required for the Pooja.",
    confirmBooking: "Confirm Booking",
    processing: "Processing Booking...",
    agreeTerms: "By booking, you agree to our terms of consultation.",
    whatClientsSay: "What Our Clients Say",
    trustedBy: "Trusted by Thousands",
    realExperiences: "Real experiences from real seekers",
    destinyUnlocked: "Destiny Unlocked!",
    sessionBooked: "Session Booked Successfully",
    celestialDate: "Celestial Date",
    auspiciousTime: "Auspicious Time",
    confirmationMsg: "You will receive a confirmation email containing further instructions and link to join the virtual guidance session shortly.",
    bookAnother: "Book Another Session",
    selectPurpose: "Select a purpose...",
    kundaliType: "Type of Kundali Booking",
    vivahType: "Type of Vivah Pooja",
    clientAddress: "Location / Address",
    addressPlaceholder: "Please enter the full address/location for the Pooja or consultation...",
    chooseDate: "Choose a Date",
    panditName: "Karmyogi Pandit Priyashankar Pandey",
    language: "English"
  },
  hi: {
    shriPitambara: "श्री पीतांबरा",
    jyotishKaryalaya: "ज्योतिष कार्यालय",
    welcome: '"श्री पीतांबरा ज्योतिष कार्यालय में आपका स्वागत है!"',
    subtitle: "अपने जीवन की यात्रा के लिए शुभ मार्ग खोजने और ब्रह्मांडीय अंतर्दृष्टि प्राप्त करने के लिए हमारे श्रद्धेय पंडित जी से परामर्श लें।",
    welcomeSubtitle: "हम आपकी ज्योतिषीय चिंताओं और प्रश्नों के समाधान खोजने में मदद करने के लिए प्रतिबद्ध हैं। ब्रह्मांडीय जागरूकता के प्रकाश में कदम रखें।",
    forBookingScrollDown: "बुकिंग के लिए नीचे स्क्रॉल करें",
    pleaseSelectPurpose: "कृपया पहले उद्देश्य का चयन करें।",
    appointmentsAvailable: "अपॉइंटमेंट केवल {year} के लिए उपलब्ध हैं।",
    availableTimes: "उपलब्ध समय (IST)",
    selectPoojaPlaceholder: "पूजा का प्रकार चुनें...",
    selectKundaliPlaceholder: "कुंडली का प्रकार चुनें...",
    selectVivahPlaceholder: "विवाह पूजा का प्रकार चुनें...",
    step1: "चरण 1: अपना परामर्श दिनांक चुनें",
    step2: "चरण 2: उपलब्ध समय चुनें",
    noSlots: "इस तिथि के लिए कोई समय उपलब्ध नहीं है।",
    tryAnother: "कृपया कोई अन्य दिन चुनने का प्रयास करें।",
    contactAstro: "ज्योतिषी से संपर्क करें",
    chiefAstro: "मुख्य ज्योतिषी",
    mobileNum: "मोबाइल नंबर",
    emailAddr: "ईमेल पता",
    yourInfo: "आपकी जानकारी",
    fullName: "पूरा नाम",
    purpose: "परामर्श का उद्देश्य",
    poojaType: "पूजा का प्रकार",
    samagriPref: "सामग्री वरीयता",
    withSamagri: "सामग्री के साथ",
    withoutSamagri: "सामग्री के बिना",
    pleaseNote: "कृपया ध्यान दें:",
    contactPandit: "आपने सामग्री की व्यवस्था स्वयं करने का विकल्प चुना है। कृपया पूजा के लिए आवश्यक सामग्री की सटीक सूची प्राप्त करने के लिए पंडित जी से सीधे संपर्क करें।",
    confirmBooking: "बुकिंग की पुष्टि करें",
    processing: "बुकिंग प्रोसेस हो रही है...",
    agreeTerms: "बुकिंग करके, आप हमारे परामर्श की शर्तों से सहमत हैं।",
    whatClientsSay: "हमारे ग्राहक क्या कहते हैं",
    trustedBy: "हजारों लोगों का भरोसा",
    realExperiences: "वास्तविक साधकों के वास्तविक अनुभव",
    destinyUnlocked: "बुकिंग सफल!",
    sessionBooked: "सत्र सफलतापूर्वक बुक किया गया",
    celestialDate: "निर्धारित तिथि",
    auspiciousTime: "शुभ समय",
    confirmationMsg: "आपको जल्द ही एक पुष्टिकरण ईमेल प्राप्त होगा जिसमें आगे के निर्देश और आभासी मार्गदर्शन सत्र में शामिल होने के लिए लिंक होगा।",
    bookAnother: "एक और सत्र बुक करें",
    selectPurpose: "एक उद्देश्य चुनें...",
    kundaliType: "कुंडली बुकिंग का प्रकार",
    vivahType: "विवाह पूजा का प्रकार",
    clientAddress: "स्थान / पता",
    addressPlaceholder: "कृपया पूजा या परामर्श के लिए पूरा पता दर्ज करें...",
    chooseDate: "दिनांक चुनें",
    panditName: "कर्मयोगी पंडित प्रियशंकर पांडेय",
    language: "हिंदी"
  }
};

const POOJA_TYPES = [
  'Shri Satyanarayan Pooja',
  'Griha Pravesh',
  'Navagraha Shanti',
  'Nakshatra Shanti',
  'Vastu Shanti',
  'Durga Saptashati Path',
  'Janana Shanti',
  'Shri Ganesh Yagya',
  'Rudra Abhishek',
  'Rudrayagya',
  'Vishnu Yagya',
  'Suryanarayan Yagya',
  'Navachandi Shatchandi Sahastrchandi',
  'Murti Pran Pratishtha',
  'Vivah',
  'Sakharpooda',
  'Munj',
  'Navagrah Jap',
  'Parthiv Ganesh Sthapana',
];

const KUNDALI_TYPES = [
  'Marriage / Gun Milan',
  'Career & Job',
  'Business',
  'Finance & Wealth',
  'Education',
  'Health',
  'Love & Relationship',
  'Child Birth / Santan',
  'Foreign Travel',
  'Muhurat Consultation',
  'Dosha Analysis',
  'Property & Vehicle',
  'General Life Guidance',
  'Annual Horoscope',
  'Other'
];

const VIVAH_TYPES = [
  'Gun Milan / Kundali Matching',
  'Marriage Muhurat',
  'Manglik Dosha Analysis',
  'Marriage Delay Remedies',
  'Vivah Badha Nivaran Puja',
  'Love Marriage Consultation',
  'Graha Shanti Puja',
  'Navagraha Shanti Puja',
  'Kaal Sarp Dosha Nivaran',
  'Pitra Dosha Nivaran',
  'Shiva-Parvati Vivah Puja',
  'Katyayani Puja',
  'Wedding Ceremony Guidance',
  'Post-Marriage Harmony Puja',
  'Other Marriage Related Service'
];

const PURPOSE_TRANSLATIONS = {
  'Pooja Booking': 'पूजा बुकिंग',
  'kundali booking': 'कुंडली बुकिंग',
  'Vastu Shastra': 'वास्तु शास्त्र',
  'Vivah Pooja booking': 'विवाह पूजा बुकिंग',
};

const POOJA_TRANSLATIONS = {
  'Shri Satyanarayan Pooja': 'श्री सत्यनारायण पूजा',
  'Griha Pravesh': 'गृह प्रवेश',
  'Navagraha Shanti': 'नवग्रह शांति',
  'Nakshatra Shanti': 'नक्षत्र शांति',
  'Vastu Shanti': 'वास्तु शांति',
  'Durga Saptashati Path': 'दुर्गा सप्तशती पाठ',
  'Janana Shanti': 'जनन शांति',
  'Shri Ganesh Yagya': 'श्री गणेश यज्ञ',
  'Rudra Abhishek': 'रुद्राभिषेक',
  'Rudrayagya': 'रुद्रयज्ञ',
  'Vishnu Yagya': 'विष्णु यज्ञ',
  'Suryanarayan Yagya': 'सूर्यनारायण यज्ञ',
  'Navachandi Shatchandi Sahastrchandi': 'नवचंडी शतचंडी सहस्त्रचंडी',
  'Murti Pran Pratishtha': 'मूर्ति प्राण प्रतिष्ठा',
  'Vivah': 'विवाह',
  'Sakharpooda': 'साखरपुडा',
  'Munj': 'मुंज',
  'Navagrah Jap': 'नवग्रह जाप',
  'Parthiv Ganesh Sthapana': 'पार्थिव गणेश स्थापना',
};

const KUNDALI_TRANSLATIONS = {
  'Marriage / Gun Milan': 'विवाह / गुण मिलान',
  'Career & Job': 'करियर और नौकरी',
  'Business': 'व्यवसाय / व्यापार',
  'Finance & Wealth': 'वित्त और संपत्ति',
  'Education': 'शिक्षा',
  'Health': 'स्वास्थ्य',
  'Love & Relationship': 'प्रेम और संबंध',
  'Child Birth / Santan': 'संतान जन्म',
  'Foreign Travel': 'विदेश यात्रा',
  'Muhurat Consultation': 'मुहूर्त परामर्श',
  'Dosha Analysis': 'दोष विश्लेषण',
  'Property & Vehicle': 'संपत्ति और वाहन',
  'General Life Guidance': 'सामान्य जीवन मार्गदर्शन',
  'Annual Horoscope': 'वार्षिक राशिफल',
  'Other': 'अन्य',
};

const VIVAH_TRANSLATIONS = {
  'Gun Milan / Kundali Matching': 'गुण मिलान / कुंडली मिलान',
  'Marriage Muhurat': 'विवाह मुहूर्त',
  'Manglik Dosha Analysis': 'मांगलिक दोष विश्लेषण',
  'Marriage Delay Remedies': 'विवाह में देरी के उपाय',
  'Vivah Badha Nivaran Puja': 'विवाह बाधा निवारण पूजा',
  'Love Marriage Consultation': 'प्रेम विवाह परामर्श',
  'Graha Shanti Puja': 'ग्रह शांति पूजा',
  'Navagraha Shanti Puja': 'नवग्रह शांति पूजा',
  'Kaal Sarp Dosha Nivaran': 'काल सर्प दोष निवारण',
  'Pitra Dosha Nivaran': 'पितृ दोष निवारण',
  'Shiva-Parvati Vivah Puja': 'शिव-पार्वती विवाह पूजा',
  'Katyayani Puja': 'कात्यायनी पूजा',
  'Wedding Ceremony Guidance': 'विवाह समारोह मार्गदर्शन',
  'Post-Marriage Harmony Puja': 'विवाह पश्चात सामंजस्य पूजा',
  'Other Marriage Related Service': 'अन्य विवाह संबंधी सेवा',
};

const REVIEWS = [
  { name: 'Asha Thakur', location: 'a year ago', rating: 5, text: 'Very experienced, and accurate' },
  { name: 'harish jondhale', location: 'a year ago', rating: 5, text: 'It was good experience. Guruji explains each and every rituals thoroughly. Also gives satisfactory answers to your queries. All rituals are properly Guruji in no hurry to complete the rituals.' },
  { name: 'Apurva Enmudi', location: '4 years ago', rating: 5, text: 'He is well versed, explained everything elaboratively. It was a good experience.' },
  { name: 'Rushikesh Waghmare', location: '3 years ago', rating: 5, text: 'worth ur money , 100% recommended' }
];

const CustomerBookingPage = () => {
  const [language, setLanguage] = useState('en');
  const t = (key) => TRANSLATIONS[language][key] || key;

  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [formData, setFormData] = useState({
    customerName: '',
    customerMobile: '',
    customerEmail: '',
    purpose: '',
    poojaType: '',
    samagriPreference: '',
    kundaliType: '',
    vivahType: '',
    clientAddress: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Date Constraints for current year
  const today = new Date();
  const currentYear = today.getFullYear();
  const maxDate = `${currentYear}-12-31`;

  // Format time from 09:00:00 to 09:00 AM
  const formatTime = (timeStr) => {
    const [hour, minute] = timeStr.split(':');
    const d = new Date();
    d.setHours(parseInt(hour, 10), parseInt(minute, 10));
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  // Get minimum date considering time ranges and cutoff for next day booking
  const getMinDate = () => {
    const now = new Date();
    return now.toISOString().split('T')[0];
  };

  // Reset selected date/slot if they become invalid when purpose changes
  useEffect(() => {
    if (formData.purpose && selectedDate) {
      const minD = getMinDate();
      if (selectedDate < minD) {
        setSelectedDate('');
        setSelectedSlot('');
        setAvailableSlots([]);
      }
    }
  }, [formData.purpose, selectedDate]);

  const getDefaultSlots = (purpose) => {
    if (purpose === 'Pooja Booking' || purpose === 'Vivah Pooja booking') {
      return ["09:00:00", "10:00:00", "11:00:00", "12:00:00", "13:00:00", "14:00:00", "14:30:00"];
    } else {
      return [
        "15:00:00", "15:30:00", "16:00:00", "16:30:00", "17:00:00", "17:30:00",
        "18:00:00", "18:30:00", "19:00:00", "19:30:00", "20:00:00", "20:30:00",
        "21:00:00"
      ];
    }
  };

  useEffect(() => {
    if (selectedDate && formData.purpose) {
      // Show default slots instantly to avoid loading delay
      setAvailableSlots(getDefaultSlots(formData.purpose));
      setSelectedSlot('');
      
      // Update with exact availability in background
      publicAPI.getAvailableSlots(selectedDate)
        .then(slots => {
            setAvailableSlots(slots);
        })
        .catch(err => {
            console.warn("Failed to load available slots from server, keeping default slots:", err);
        });
    }
  }, [selectedDate, formData.purpose]);

  // Filter available slots based on purpose and current time (if today)
  const getFilteredSlots = () => {
    if (!formData.purpose || !selectedDate) return [];

    return availableSlots.filter(slot => {
      const [hourStr, minuteStr] = slot.split(':');
      const hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);
      const slotMinutes = hour * 60 + minute;

      // 1. Filter by time range
      if (formData.purpose === 'Pooja Booking' || formData.purpose === 'Vivah Pooja booking') {
        // Allow 9:00 AM (540), 10:00 AM (600), 11:00 AM (660), 12:00 PM (720), 1:00 PM (780), 2:00 PM (840), 2:30 PM (870)
        const allowedPoojaMinutes = [540, 600, 660, 720, 780, 840, 870];
        if (!allowedPoojaMinutes.includes(slotMinutes)) {
          return false;
        }
      } else {
        // 3:00 PM (900 mins) to 9:00 PM (1260 mins)
        if (slotMinutes < 900 || slotMinutes > 1260) {
          return false;
        }
      }

      // 2. Filter by current time if selected date is today
      const todayStr = new Date().toISOString().split('T')[0];
      if (selectedDate === todayStr) {
        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        if (slotMinutes <= currentMinutes) {
          return false;
        }
      }

      return true;
    });
  };

  const filteredSlots = getFilteredSlots();

  // Reset selected slot if it is no longer in the filtered list
  useEffect(() => {
    if (selectedSlot && !filteredSlots.includes(selectedSlot)) {
      setSelectedSlot('');
    }
  }, [filteredSlots, selectedSlot]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedSlot) {
      setError('Please select both a date and an available time slot.');
      return;
    }
    if (!formData.purpose) {
      setError('Please select a purpose for your booking.');
      return;
    }
    
    setLoading(true);
    try {
      let finalPurpose = formData.purpose;
      if (formData.purpose === 'Pooja Booking') {
        if (formData.poojaType) finalPurpose += ` - ${formData.poojaType}`;
        if (formData.samagriPreference) finalPurpose += ` (${formData.samagriPreference})`;
        if (formData.clientAddress) finalPurpose += ` - Address: ${formData.clientAddress}`;
      } else if (formData.purpose === 'kundali booking') {
        if (formData.kundaliType) finalPurpose += ` - ${formData.kundaliType}`;
      } else if (formData.purpose === 'Vastu Shastra') {
        if (formData.clientAddress) finalPurpose += ` - Address: ${formData.clientAddress}`;
      } else if (formData.purpose === 'Vivah Pooja booking') {
        if (formData.vivahType) finalPurpose += ` - ${formData.vivahType}`;
        if (formData.clientAddress) finalPurpose += ` - Address: ${formData.clientAddress}`;
      }

      await publicAPI.bookAppointment({
        customerName: formData.customerName,
        phone: formData.customerMobile,
        email: formData.customerEmail,
        purpose: finalPurpose,
        appointmentDate: selectedDate,
        appointmentTime: selectedSlot
      });
      setSuccess(true);
      setError('');
    } catch (err) {
      setError(err.response?.data || 'Failed to complete booking. Please try again.');
    }
    setLoading(false);
  };

  if (success) {
      return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 relative overflow-hidden flex items-center justify-center p-4 font-sans select-none">
            {/* Celestial Nebulas */}
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse duration-[8000ms]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[650px] h-[650px] bg-rose-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse duration-[10000ms]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Twinkling Stars */}
            <div className="absolute inset-0 pointer-events-none opacity-60">
              <div className="absolute top-[12%] left-[18%] w-1.5 h-1.5 bg-white rounded-full animate-ping duration-[3.5s]"></div>
              <div className="absolute top-[28%] left-[78%] w-1 h-1 bg-yellow-200 rounded-full animate-[pulse_2s_infinite]"></div>
              <div className="absolute top-[42%] left-[8%] w-2.5 h-2.5 bg-white rounded-full opacity-40 blur-[1px]"></div>
              <div className="absolute top-[65%] left-[82%] w-1.5 h-1.5 bg-amber-200 rounded-full animate-pulse duration-[4.5s]"></div>
              <div className="absolute top-[78%] left-[12%] w-1 h-1 bg-white rounded-full animate-ping duration-[5.5s]"></div>
              <div className="absolute top-[88%] left-[48%] w-2 h-2 bg-orange-200 rounded-full animate-[pulse_3s_infinite]"></div>
              <div className="absolute top-[16%] left-[62%] w-2 h-2 bg-white rounded-full opacity-30"></div>
              <div className="absolute top-[52%] left-[42%] w-1 h-1 bg-yellow-100 rounded-full animate-pulse"></div>
            </div>

            {/* Rotating Zodiac Wheel Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <svg className="w-[650px] h-[650px] text-amber-500/10 opacity-30 animate-[spin_160s_linear_infinite]" viewBox="0 0 200 200" fill="none" stroke="currentColor">
                <circle cx="100" cy="100" r="95" strokeWidth="0.5" strokeDasharray="3 3" />
                <circle cx="100" cy="100" r="85" strokeWidth="0.5" />
                <circle cx="100" cy="100" r="60" strokeWidth="0.25" strokeDasharray="1 5" />
                <line x1="15" y1="100" x2="185" y2="100" strokeWidth="0.25" />
                <line x1="100" y1="15" x2="100" y2="185" strokeWidth="0.25" />
                <line x1="40" y1="40" x2="160" y2="160" strokeWidth="0.25" />
                <line x1="40" y1="160" x2="160" y2="40" strokeWidth="0.25" />
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const x1 = 100 + 85 * Math.cos(angle);
                  const y1 = 100 + 85 * Math.sin(angle);
                  const x2 = 100 + 95 * Math.cos(angle);
                  const y2 = 100 + 95 * Math.sin(angle);
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="0.5" />;
                })}
              </svg>
            </div>

            {/* Success Card */}
            <div className="bg-slate-900/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_0_80px_-15px_rgba(249,115,22,0.15)] p-8 sm:p-10 max-w-xl w-full text-center relative z-10 transform transition-all hover:scale-[1.01] duration-500">
                {/* Saffron Glowing Border accents */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>

                {/* Glowing Success Ring */}
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-md animate-ping duration-[3000ms]"></div>
                  <div className="relative w-24 h-24 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-14 h-14 text-emerald-400 filter drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
                  </div>
                </div>

                {/* Use h3 tag with inline styles to override stylesheet h2 color rules */}
                <h3 
                  className="text-2xl sm:text-3xl font-extrabold tracking-wide font-serif mb-6 select-text"
                  style={{
                    color: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundImage: 'linear-gradient(to right, #fde047, #f97316, #fde047)',
                    textShadow: '0 2px 10px rgba(251, 191, 36, 0.15)'
                  }}
                >
                  Your booking has been successfully confirmed.
                </h3>

                {/* Glassmorphic Ticket Capsule */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-500/10 to-orange-500/0 rounded-bl-full pointer-events-none"></div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-500/15 text-amber-400 rounded-xl">
                        <Calendar className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <div className="text-[10px] text-orange-200/50 font-bold uppercase tracking-wider">Celestial Date</div>
                        <div className="text-base font-bold text-white tracking-wide select-text">{selectedDate}</div>
                      </div>
                    </div>

                    <div className="h-[1px] bg-white/5 w-full"></div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-500/15 text-amber-400 rounded-xl">
                        <Clock className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <div className="text-[10px] text-orange-200/50 font-bold uppercase tracking-wider">Auspicious Time</div>
                        <div className="text-base font-bold text-white tracking-wide select-text">{formatTime(selectedSlot)}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-slate-300/90 text-sm leading-relaxed text-left space-y-4 mb-8">
                  <p>
                    We sincerely thank you for placing your trust in us. It is our privilege to support you on your spiritual journey and help you find guidance through the wisdom of astrology.
                  </p>
                  <p>
                    May the blessings of the Divine bring peace, prosperity, and happiness to you and your family. We look forward to serving you and providing thoughtful insights during your consultation.
                  </p>
                  <p className="font-medium text-amber-200/95">
                    Thank you for choosing Shri Pitambara Jyotish Karyalaya.
                  </p>
                  <div className="pt-4 border-t border-white/5 text-right font-serif italic text-amber-400">
                    <p className="text-xs text-orange-200/50">With respect and blessings,</p>
                    <p className="font-bold text-sm">Shri Pitambara Jyotish Karyalaya</p>
                  </div>
                </div>

                <button 
                  onClick={() => window.location.reload()} 
                  className="w-full py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white rounded-xl hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 font-bold text-lg shadow-[0_4px_20px_rgba(249,115,22,0.25)] hover:shadow-[0_4px_30px_rgba(249,115,22,0.45)] hover:scale-[1.01] active:scale-[0.99] transition-all transform duration-200"
                >
                  Book Another Session
                </button>
            </div>
        </div>
      )
  }
  
  return (
    <>
      {/* Floating Language Toggle */}
      <button 
        onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
        className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-md shadow-lg border border-orange-100 px-4 py-2 rounded-full font-bold text-orange-600 hover:bg-orange-50 transition-colors flex items-center gap-2"
      >
        <span className="text-xl">文</span>
        <span className="text-sm">{language === 'en' ? 'हिंदी' : 'English'}</span>
      </button>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50 to-red-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/50">
        
        {/* Header Section */}
        <div className="relative bg-white px-8 py-16 sm:p-20 overflow-hidden text-center border-b border-slate-100 rounded-t-[2.5rem]">
          {/* Saffron & Yellow Ribbon */}
          <div className="absolute top-0 left-0 w-40 h-40 overflow-hidden pointer-events-none z-20">
            <div className="absolute top-0 left-0 w-[150%] h-8 bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg transform -rotate-45 -translate-x-12 translate-y-10"></div>
            <div className="absolute top-0 left-0 w-[150%] h-2 bg-yellow-300 shadow-sm transform -rotate-45 -translate-x-10 translate-y-7"></div>
          </div>

          <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-multiply pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto">
            {/* Logo with Sunburst Animation */}
            <div className="relative mb-16 inline-flex mt-4 items-center justify-center w-56 h-56">
              {/* Sunburst background (glows around and behind the logo) */}
              <div className="absolute inset-0 z-0 flex items-center justify-center animate-[spin_20s_linear_infinite] scale-[1.2]">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute w-2.5 h-[140%] bg-gradient-to-t from-transparent via-yellow-400 to-transparent opacity-90 shadow-[0_0_15px_rgba(250,204,21,0.7)]" 
                    style={{ transform: `rotate(${i * 22.5}deg)` }}
                  ></div>
                ))}
                <div className="absolute w-[80%] h-[80%] rounded-full bg-yellow-200/60 blur-xl scale-[1.5]"></div>
              </div>
              
              {/* Logo container: circular bounding, white background removed via mix-blend */}
              <div className="relative z-10 w-44 h-44 rounded-full flex items-center justify-center overflow-hidden bg-white shadow-xl shadow-orange-500/20 border-4 border-orange-100">
                <img 
                  src="/logo.png" 
                  alt="Shri Pitambara Jyotish Karyalaya Logo" 
                  className="relative z-10 w-full h-full object-cover mix-blend-multiply transform scale-[1.3] translate-x-0.5"
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
            
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 drop-shadow-sm leading-tight">
              <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-orange-600 to-amber-500 mr-3">{t("shriPitambara")}</span>
              <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-500">{t("jyotishKaryalaya")}</span>
            </h1>
            
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mb-8"></div>
            
            <div className="text-lg sm:text-xl text-slate-600 font-light space-y-3 leading-relaxed">
              <p className="text-2xl sm:text-3xl font-medium text-orange-600 italic tracking-wide font-serif drop-shadow-sm">
                {t("welcome")}
              </p>
              <p className="max-w-2xl mx-auto opacity-90 text-slate-500">
                {t("welcomeSubtitle")}
              </p>
              
              <div 
                onClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="pt-6 flex flex-col items-center gap-1 text-orange-500/80 hover:text-orange-600 font-bold animate-bounce cursor-pointer select-none"
              >
                <span className="text-xs uppercase tracking-widest">{t("forBookingScrollDown")}</span>
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
        
        <div id="booking-section" className="p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column: Purpose, Calendar & Slots */}
            <div className="lg:col-span-5 space-y-10">
              {/* Purpose Selection Card */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative z-40">
                <h2 className="text-2xl font-bold mb-6 flex items-center text-slate-800 tracking-tight">
                  <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl mr-4">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  {t("purpose")}
                </h2>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="block w-full text-left rounded-xl border border-slate-200 bg-slate-50 focus:bg-white shadow-sm focus:border-red-500 focus:ring-red-500 p-4 transition-colors"
                  >
                    <span className={formData.purpose ? "text-slate-800" : "text-slate-400"}>
                      {formData.purpose ? (language === 'hi' ? PURPOSE_TRANSLATIONS[formData.purpose] : formData.purpose) : t("selectPurpose")}
                    </span>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                      <ul className="py-2">
                        <li 
                          className="px-4 py-3 hover:bg-rose-50 cursor-pointer text-sm text-slate-700 transition-colors"
                          onClick={() => { setFormData({...formData, purpose: "", poojaType: "", samagriPreference: "", kundaliType: "", vivahType: "", clientAddress: ""}); setIsDropdownOpen(false); }}
                        >
                          {t("selectPurpose")}
                        </li>
                        {[
                          "Pooja Booking",
                          "kundali booking",
                          "Vastu Shastra",
                          "Vivah Pooja booking"
                        ].map((option, idx) => (
                          <li 
                            key={idx}
                            className="px-4 py-3 hover:bg-rose-50 cursor-pointer text-sm text-slate-700 transition-colors border-t border-slate-100 whitespace-normal"
                            onClick={() => { setFormData({...formData, purpose: option, poojaType: "", samagriPreference: "", kundaliType: "", vivahType: "", clientAddress: ""}); setIsDropdownOpen(false); }}
                          >
                            {language === 'hi' ? PURPOSE_TRANSLATIONS[option] : option}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Calendar Card */}
              <div className={`bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 ${formData.purpose ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                <h2 className="text-2xl font-bold mb-6 flex items-center text-slate-800 tracking-tight">
                  <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl mr-4">
                    <Calendar className="w-6 h-6" />
                  </div>
                  {t("chooseDate")}
                </h2>
                <div className="relative">
                  <input 
                    type="date" 
                    disabled={!formData.purpose}
                    className="w-full bg-slate-50 border-2 border-slate-200 text-slate-800 rounded-2xl shadow-sm focus:ring-4 focus:ring-red-500/20 focus:border-red-500 p-4 text-lg font-medium transition-all cursor-pointer hover:bg-slate-100 disabled:cursor-not-allowed"
                    value={selectedDate}
                    min={getMinDate()}
                    max={maxDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                  {!formData.purpose ? (
                    <p className="mt-2 text-sm text-rose-500 font-semibold animate-pulse">
                      {t("pleaseSelectPurpose")}
                    </p>
                  ) : (
                    <p className="mt-3 text-sm text-slate-400 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-rose-400 mr-2"></span>
                      {t("appointmentsAvailable").replace("{year}", currentYear)}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Slots Section */}
              <div className={`transition-all duration-500 transform ${selectedDate && formData.purpose ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4 pointer-events-none'}`}>
                <h2 className="text-2xl font-bold mb-6 flex items-center text-slate-800 tracking-tight">
                  <div className="p-3 bg-red-100 text-red-600 rounded-2xl mr-4">
                    <Clock className="w-6 h-6" />
                  </div>
                  {t("availableTimes")}
                </h2>
                
                {selectedDate && formData.purpose && (
                  <div className="grid grid-cols-2 gap-4">
                    {filteredSlots.length > 0 ? filteredSlots.map((slot) => (
                        <button 
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={`py-4 px-4 border-2 rounded-2xl font-bold text-lg transition-all duration-200 transform hover:-translate-y-1 ${
                                selectedSlot === slot 
                                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white border-transparent shadow-lg shadow-red-500/30' 
                                : 'border-rose-100 text-rose-700 bg-white hover:border-rose-300 hover:bg-rose-50'
                            }`}
                        >
                            {formatTime(slot)}
                        </button>
                    )) : (
                        <div className="col-span-2 p-6 bg-slate-50 border border-dashed border-slate-300 rounded-2xl text-center">
                          <p className="text-slate-500 font-medium">{t("noSlots")}</p>
                          <p className="text-sm text-slate-400 mt-1">{t("tryAnother")}</p>
                        </div>
                    )}
                  </div>
                )}
              </div>

              {/* Astrologer Contact Details Card */}
              <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/40 rounded-3xl p-6 border border-orange-100 hover:shadow-md transition-shadow">
                <h3 className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> {t("contactAstro")}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-orange-100/70 text-orange-600 rounded-xl">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t("chiefAstro")}</div>
                      <div className="text-sm font-bold text-slate-800">{t("panditName")}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-orange-100/70 text-orange-600 rounded-xl">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t("mobileNum")}</div>
                      <a href="tel:+919920597009" className="text-sm font-bold text-slate-800 hover:underline">
                        +91 9920597009
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-orange-100/70 text-orange-600 rounded-xl">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t("emailAddr")}</div>
                      <a href="mailto:priyeshankarpanday@gmail.com" className="text-sm font-bold text-slate-800 hover:underline">
                        priyeshankarpanday@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-slate-100 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-100 rounded-bl-full opacity-50 -mr-10 -mt-10 overflow-hidden pointer-events-none"></div>
                
                <h2 className="text-2xl font-bold mb-8 flex items-center text-slate-800 tracking-tight relative z-10">
                  <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl mr-4">
                    <User className="w-6 h-6" />
                  </div>
                  {t("yourInfo")}
                </h2>
                
                {error && (
                  <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl font-medium animate-pulse">
                    {error}
                  </div>
                )}
                
                <form onSubmit={handleBooking} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-semibold text-slate-700">
                        <User className="w-4 h-4 mr-2 text-slate-400" /> {t("fullName")}
                      </label>
                      <input 
                        required type="text" 
                        value={formData.customerName}
                        onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                        className="block w-full rounded-xl border-slate-200 bg-slate-50 focus:bg-white shadow-sm focus:border-red-500 focus:ring-red-500 p-4 transition-colors" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-semibold text-slate-700">
                        <Phone className="w-4 h-4 mr-2 text-slate-400" /> {t("mobileNum")}
                      </label>
                      <input 
                        required type="tel" 
                        value={formData.customerMobile}
                        onChange={(e) => setFormData({...formData, customerMobile: e.target.value})}
                        className="block w-full rounded-xl border-slate-200 bg-slate-50 focus:bg-white shadow-sm focus:border-red-500 focus:ring-red-500 p-4 transition-colors" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-slate-700">
                      <Mail className="w-4 h-4 mr-2 text-slate-400" /> {t("emailAddr")}
                    </label>
                    <input 
                      required type="email" 
                      value={formData.customerEmail}
                      onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
                      className="block w-full rounded-xl border-slate-200 bg-slate-50 focus:bg-white shadow-sm focus:border-red-500 focus:ring-red-500 p-4 transition-colors" 
                    />
                  </div>

                  {formData.purpose === "Pooja Booking" && (
                    <div className="space-y-4 bg-orange-50/50 p-6 rounded-2xl border border-orange-100 animate-in fade-in slide-in-from-top-2">
                      <div className="space-y-4">
                        <label className="flex items-center text-sm font-semibold text-slate-800">
                          <Sparkles className="w-4 h-4 mr-2 text-orange-500" /> {t("poojaType")}
                        </label>
                        <select 
                          required
                          className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-orange-500 focus:bg-orange-50/30 transition-all hover:border-orange-300 appearance-none text-slate-800"
                          value={formData.poojaType}
                          onChange={(e) => setFormData({...formData, poojaType: e.target.value})}
                        >
                          <option value="" disabled className="text-slate-400">
                            {t("selectPoojaPlaceholder")}
                          </option>
                          {POOJA_TYPES.map((pt, idx) => (
                            <option key={idx} value={pt}>
                              {language === 'hi' ? (POOJA_TRANSLATIONS[pt] || pt) : pt}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-4 mt-6 pt-4 border-t border-orange-100/50">
                        <label className="flex items-center text-sm font-semibold text-slate-800">
                          <Sparkles className="w-4 h-4 mr-2 text-orange-500" /> {t("samagriPref")}
                        </label>
                        <div className="flex gap-4">
                          <label className="flex-1 cursor-pointer">
                            <input 
                              type="radio" 
                              name="samagri" 
                              value="With Samagri" 
                              className="peer sr-only"
                              onChange={(e) => setFormData({...formData, samagriPreference: e.target.value})}
                            />
                            <div className="text-center p-3 rounded-xl border-2 border-slate-200 peer-checked:border-orange-500 peer-checked:bg-orange-100 transition-all">
                              <span className="font-medium text-slate-700 peer-checked:text-orange-700">{t("withSamagri")}</span>
                            </div>
                          </label>
                          <label className="flex-1 cursor-pointer">
                            <input 
                              type="radio" 
                              name="samagri" 
                              value="Without Samagri" 
                              className="peer sr-only"
                              onChange={(e) => setFormData({...formData, samagriPreference: e.target.value})}
                            />
                            <div className="text-center p-3 rounded-xl border-2 border-slate-200 peer-checked:border-orange-500 peer-checked:bg-orange-100 transition-all">
                              <span className="font-medium text-slate-700 peer-checked:text-orange-700">{t("withoutSamagri")}</span>
                            </div>
                          </label>
                        </div>
                        
                        {formData.samagriPreference === "Without Samagri" && (
                          <div className="mt-4 p-4 bg-white rounded-xl border-l-4 border-orange-500 shadow-sm flex items-start">
                             <Phone className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0 mt-0.5" />
                             <p className="text-sm text-slate-700">
                               <strong>{t("pleaseNote")}</strong> {t("contactPandit")}
                             </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {formData.purpose === "kundali booking" && (
                    <div className="space-y-4 bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 animate-in fade-in slide-in-from-top-2">
                      <div className="space-y-2">
                        <label className="flex items-center text-sm font-semibold text-slate-800">
                          <Sparkles className="w-4 h-4 mr-2 text-indigo-500" /> {t("kundaliType")}
                        </label>
                        <select 
                          required
                          className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-indigo-500 focus:bg-indigo-50/30 transition-all hover:border-indigo-300 appearance-none text-slate-800"
                          value={formData.kundaliType}
                          onChange={(e) => setFormData({...formData, kundaliType: e.target.value})}
                        >
                          <option value="" disabled className="text-slate-400">
                            {t("selectKundaliPlaceholder")}
                          </option>
                          {KUNDALI_TYPES.map((kt, idx) => (
                            <option key={idx} value={kt}>
                              {language === 'hi' ? (KUNDALI_TRANSLATIONS[kt] || kt) : kt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {(formData.purpose === "Vastu Shastra" || formData.purpose === "Pooja Booking" || formData.purpose === "Vivah Pooja booking") && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                      <label className="flex items-center text-sm font-semibold text-slate-700">
                        <MapPin className="w-4 h-4 mr-2 text-slate-400" /> {t("clientAddress")}
                      </label>
                      <textarea 
                        required
                        placeholder={t("addressPlaceholder")}
                        rows="3"
                        value={formData.clientAddress}
                        onChange={(e) => setFormData({...formData, clientAddress: e.target.value})}
                        className="block w-full rounded-xl border-slate-200 bg-slate-50 focus:bg-white shadow-sm focus:border-red-500 focus:ring-red-500 p-4 transition-colors text-slate-800"
                      />
                    </div>
                  )}

                  {formData.purpose === "Vivah Pooja booking" && (
                    <div className="space-y-4 bg-rose-50/50 p-6 rounded-2xl border border-rose-100 animate-in fade-in slide-in-from-top-2">
                      <div className="space-y-2">
                        <label className="flex items-center text-sm font-semibold text-slate-800">
                          <Sparkles className="w-4 h-4 mr-2 text-rose-500" /> {t("vivahType")}
                        </label>
                        <select 
                          required
                          className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-rose-500 focus:bg-rose-50/30 transition-all hover:border-rose-300 appearance-none text-slate-800"
                          value={formData.vivahType}
                          onChange={(e) => setFormData({...formData, vivahType: e.target.value})}
                        >
                          <option value="" disabled className="text-slate-400">
                            {t("selectVivahPlaceholder")}
                          </option>
                          {VIVAH_TYPES.map((vt, idx) => (
                            <option key={idx} value={vt}>
                              {language === 'hi' ? (VIVAH_TRANSLATIONS[vt] || vt) : vt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-4">
                    <button 
                        type="submit" 
                        disabled={loading || !selectedDate || !selectedSlot}
                        className="group w-full flex justify-center items-center py-4 px-4 rounded-xl shadow-lg text-lg font-bold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 focus:outline-none focus:ring-4 focus:ring-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-1 disabled:hover:translate-y-0"
                    >
                      {loading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          {t("processing")}
                        </span>
                      ) : (
                        <>
                          {t("confirmBooking")}
                          <Sparkles className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-slate-400 text-sm mt-4">
                      {t("agreeTerms")}
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* 🌟🌟🌟 Reviews Strip 🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟 */}
          <div className="mt-16 pt-10 border-t border-slate-100">
            {/* Section header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 border border-amber-200 rounded-full mb-3">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">{t('whatClientsSay')}</span>
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">{t('trustedBy')}</h2>
              <p className="text-sm text-slate-400 mt-1">{t('realExperiences')}</p>
            </div>

            {/* Scrolling marquee strip */}
            <div className="relative overflow-hidden">
              {/* Fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

              <style>{`
                @keyframes marquee {
                  0%   { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .reviews-track {
                  display: flex;
                  width: max-content;
                  animation: marquee 32s linear infinite;
                }
                .reviews-track:hover {
                  animation-play-state: paused;
                }
              `}</style>

              <div className="reviews-track gap-5 py-3">
                {/* Double the reviews for seamless loop */}
                {[...REVIEWS, ...REVIEWS].map((review, idx) => (
                  <div
                    key={idx}
                    className="flex-shrink-0 w-72 bg-gradient-to-br from-amber-50/60 to-orange-50/40 border border-orange-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 mx-2"
                  >
                    {/* Quote icon */}
                    <Quote className="w-6 h-6 text-orange-200 mb-3" />

                    {/* Review text */}
                    <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-4">
                      &ldquo;{review.text}&rdquo;
                    </p>

                    {/* Stars */}
                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < review.rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-200 fill-slate-200'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Reviewer info */}
                    <div className="flex items-center gap-3 pt-3 border-t border-orange-100">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center text-white text-xs font-extrabold shrink-0">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">{review.name}</div>
                        <div className="text-[10px] text-slate-400">{review.location}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CustomerBookingPage;
