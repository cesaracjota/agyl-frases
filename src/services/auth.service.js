import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

// Register user
const register = async (userData) => {

    const response = await axios.post(`${baseURL}/usuarios`, userData);
    if(response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
}

// Login user
const login = async (userData) => {
    
        const response = await axios.post(`${baseURL}/login`, userData);

        if(response.data) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
    
        return response.data;
}

// Logout user

const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("chakra-ui-color-mode");
    // window.location.reload();
}

const authService = {
    register,
    login,
    logout
}

export default authService;