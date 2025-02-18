// src/api/apiClient.js
import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://localhost:7242", // Definir el baseURL para que no tengas que repetirlo
    headers: {
        "Content-Type": "application/json"
    }
});

export default apiClient;
