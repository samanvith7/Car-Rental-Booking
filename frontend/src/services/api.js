import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { "Content-Type": "application/json" },
});

// =====================
// TOKEN SETUP
// =====================
const token = localStorage.getItem("token");
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// =====================
// ERROR HANDLING
// =====================
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;

// =====================
// CARS (WORKING)
// =====================
export const getCars = () => api.get("/cars");

// ✅ needed for CarDetailPage
export const getCar = (id) => api.get(`/cars/${id}`);

// ✅ frontend expects this → fallback to all cars
export const getFeaturedCars = () => api.get("/cars");

// =====================
// AUTH (WORKING)
// =====================
export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser = (data) => api.post("/auth/login", data);

// =====================
// BOOKINGS (PARTIAL)
// =====================
export const createBooking = (data) => api.post("/bookings", data);

// ⚠️ placeholders (avoid crash)
export const getUserBookings = () => Promise.resolve({ data: [] });
export const getBooking = () => Promise.resolve({ data: {} });
export const cancelBooking = () => Promise.resolve({ data: {} });

// =====================
// PAYMENTS (NOT IMPLEMENTED)
// =====================
export const createPaymentIntent = () => Promise.resolve({ data: {} });
export const confirmPayment = () => Promise.resolve({ data: {} });

// =====================
// REVIEWS (NOT IMPLEMENTED)
// =====================
export const getCarReviews = () => Promise.resolve({ data: [] });
export const createReview = () => Promise.resolve({ data: {} });

// =====================
// ADMIN (NOT IMPLEMENTED)
// =====================
export const getDashboardStats = () => Promise.resolve({ data: {} });
export const getAllUsers = () => Promise.resolve({ data: [] });