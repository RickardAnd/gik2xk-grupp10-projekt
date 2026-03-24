
// Importerar axios för att hantera HTTP-förfrågningar

import axios from 'axios';

// Sätter bas-URL för alla axios-förfrågningar till vår backend-server
axios.defaults.baseURL = "http://localhost:4000";

export default axios;