import axios from './api';

// Hämta alla produkter
export async function getAll(endpoint = '/products') {
    try {
        const response = await axios.get(endpoint); 
        if (response.status === 200) return response.data;
        return []; 
    } catch (e) {
        e?.response ? console.log(e.response) : console.log(e);
        return [];
    }
}

// Hämta en specifik tröja
export async function getOne(id) {
    try {
        const response = await axios.get(`/products/${id}`);
        if (response.status === 200) return response.data;
        return null; 
    } catch (e) {
        e?.response ? console.log(e.response) : console.log(e);
    }
}

// Skapa en ny produkt
export async function create(product) {
    try {
        const response = await axios.post('/products', product);
        if (response.status === 201) return response.data;
        return null;
    } catch (e) {
        e?.response ? console.log(e.response) : console.log(e);
    }
}

// Uppdatera en produkt
export async function update(product) {
    try {
        const response = await axios.put(`/products/${product.id}`, product);
        if (response.status === 200) return response.data;
        return null;
    } catch (e) {
        e?.response ? console.log(e.response) : console.log(e);
    }
}

// Ta bort en produkt
export async function remove(id) {
    try {
        // Vi använder id i URL:en för delete
        const response = await axios.delete(`/products/${id}`);
        if (response.status === 200) return response.data;
        return null;
    } catch (e) {
        e?.response ? console.log(e.response) : console.log(e);
    }
}

// Betygsätt en tröja 
export async function addRating(productId, ratingData) {
    // ratingData bör vara t.ex. { rating: 5, userId: 1 }
    try {
        const response = await axios.post(`/products/${productId}/addRating`, ratingData);
        if (response.status === 201) return response.data;
        return null;
    } catch (e) {
        e?.response ? console.log(e.response) : console.log(e);
    }
}