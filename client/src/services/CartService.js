import axios from './api';

// Hämtar kundvagnen för en specifik användare

export const getCartByUserId = async (userId) => {
    try {
        const response = await axios.get(`/cart/user/${userId}`);
        return response.data; // Returnerar kundvagnen med alla produkter
    } catch (error) {
        console.error("Kunde inte hämta kundvagn:", error);
        return null;
    }
};

// Lägger till en produkt i kundvagnen för en specifik användare
export const addToCart = async (userId, productId) => {
    try {
        const response = await axios.post(`/cart/add`, { userId, productId });
        return response.data;
    } catch (error) {
        console.error("Kunde inte lägga till i kundvagn:", error);
    }
};