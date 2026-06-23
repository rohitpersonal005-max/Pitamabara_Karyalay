import axios from 'axios';

const getBaseURL = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  const isCapacitor = window.Capacitor || navigator.userAgent.includes('Capacitor');
  const isLocalMobile = isCapacitor || (window.location.protocol === 'file:' || (window.location.hostname === 'localhost' && !window.location.port));
  
  if (isLocalMobile) {
    return 'http://10.0.2.2:8080';
  }
  return '';
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach the JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('astrology_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const authAPI = {
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  }
};

export const publicAPI = {
  getAvailableSlots: async (date) => {
    try {
      const response = await api.get(`/api/public/slots?date=${date}`);
      return response.data;
    } catch (error) {
      console.warn("Backend offline, returning mock slots");
      return [
        "09:00:00", "09:30:00", "10:00:00", "10:30:00", "11:00:00", "11:30:00",
        "12:00:00", "12:30:00", "13:00:00", "13:30:00", "14:00:00", "14:30:00",
        "17:00:00", "17:30:00", "18:00:00", "18:30:00", "19:00:00", "19:30:00",
        "20:00:00", "20:30:00", "21:00:00"
      ];
    }
  },
  bookAppointment: async (bookingData) => {
    try {
      const response = await api.post('/api/public/book', bookingData);
      return response.data;
    } catch (error) {
      console.warn("Backend offline, simulating successful booking");
      return {
        id: Date.now(),
        ...bookingData,
        status: "PENDING",
        createdAt: new Date().toISOString()
      };
    }
  },
  requestKundali: async (kundaliData) => {
    try {
      const response = await api.post('/api/public/kundali/request', kundaliData);
      return response.data;
    } catch (error) {
      console.warn("Backend offline, simulating successful kundali request");
      return {
        id: Date.now(),
        ...kundaliData,
        status: "PENDING",
        createdAt: new Date().toISOString()
      };
    }
  }
};

export const adminAPI = {
  getAppointments: async () => {
    const response = await api.get('/api/admin/appointments');
    return response.data;
  },
  updateAppointmentStatus: async (id, status) => {
    const response = await api.put(`/api/admin/appointments/${id}/status?status=${status}`);
    return response.data;
  },
  saveConsultationNotes: async (id, data) => {
    const response = await api.put(`/api/admin/appointments/${id}/notes`, data);
    return response.data;
  },
  deleteAppointment: async (id) => {
    const response = await api.delete(`/api/admin/appointments/${id}`);
    return response.data;
  },
  getKundaliRequests: async () => {
    const response = await api.get('/api/admin/kundali/requests');
    return response.data;
  },
  generateKundaliPdf: async (id) => {
    const response = await api.post(`/api/admin/kundali/generate/${id}`);
    return response.data;
  },
  deleteKundaliRequest: async (id) => {
    const response = await api.delete(`/api/admin/kundali/requests/${id}`);
    return response.data;
  },
  saveKundaliReport: async (reportData) => {
    const response = await api.post('/api/admin/kundali/report', reportData);
    return response.data;
  },
  getKundaliReports: async () => {
    const response = await api.get('/api/admin/kundali/reports');
    return response.data;
  }
};

export default api;
