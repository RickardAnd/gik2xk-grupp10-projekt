import axios from './api';

export const getCartByUserId = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:4000/cart/user/${userId}`);
        return response.data; // Returnerar kundvagnen med alla produkter
    } catch (error) {
        console.error("Kunde inte hämta kundvagn:", error);
        return null;
    }
};

export const addToCart = async (userId, productId) => {
    try {
        const response = await axios.post(`http://localhost:4000/cart/add`, { userId, productId });
        return response.data;
    } catch (error) {
        console.error("Kunde inte lägga till i kundvagn:", error);
    }
};