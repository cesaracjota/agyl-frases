import axios from "axios";
// import { ToastChakra } from "../helpers/toast";

const baseURL = process.env.REACT_APP_API_URL;

// Get random phrase

const getRandomPhrase = async () => {
    const response = await axios.get(`${baseURL}/frases/frase/random`);
    return response.data.frase;
}

const fraseService = {
    getRandomPhrase,
}

export default fraseService;